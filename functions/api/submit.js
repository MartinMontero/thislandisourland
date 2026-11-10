// POST /api/submit: turns a reader's suggestion into a pull request.
// Secrets (set by the owner, never in files): TURNSTILE_SECRET, GITHUB_TOKEN. Optional: GITHUB_REPO
// (default MartinMontero/thislandisourland), DRY_RUN=1 (validate and return the record without touching GitHub).
// Nothing is logged: no IP addresses, no request bodies.
import schema from '../../schema/submission.schema.json' with { type: 'json' };
import blocked from '../../data/blocked-token-hashes.json' with { type: 'json' };
import { LIMITS, parsePayload, buildRecord, prTitle, prBody, hasBlockedToken, validateAgainstSchema, utcDate } from '../_lib/submission.mjs';

const ALLOWED_ORIGINS = new Set([
  'https://thislandisourland.us',
  'https://www.thislandisourland.us',
  'https://representation-mosaic.pages.dev',
  'http://localhost:8788'
]);
const QUEUE_LIMIT = 40;
const DEFAULT_REPO = 'MartinMontero/thislandisourland';

function json(status, body, extra) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...(extra || {}) }
  });
}
const fail = (status, error, extra) => json(status, { ok: false, error }, extra);

function randomHex(n) {
  const b = new Uint8Array(Math.ceil(n / 2));
  crypto.getRandomValues(b);
  return [...b].map((x) => x.toString(16).padStart(2, '0')).join('').slice(0, n);
}

async function verifyTurnstile(token, env, doFetch) {
  if (!env.TURNSTILE_SECRET || !token) return false;
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
  try {
    const r = await doFetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const j = await r.json();
    return j && j.success === true;
  } catch { return false; }
}

function gh(env, doFetch) {
  const repo = env.GITHUB_REPO || DEFAULT_REPO;
  const call = (method, path, body) => doFetch(`https://api.github.com/repos/${repo}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'thislandisourland-submit',
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  return { call, repo };
}

export async function handleSubmit(request, env, deps = {}) {
  const doFetch = deps.fetch || fetch;
  const now = deps.now ? deps.now() : new Date();
  const rand = deps.randomHex || randomHex;

  // 1. Origin
  const origin = request.headers.get('Origin');
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return fail(403, 'origin');

  // 2. Content type and size
  const ct = (request.headers.get('Content-Type') || '').toLowerCase();
  if (!ct.startsWith('application/json')) return fail(415, 'bad_type');
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > LIMITS.body) return fail(413, 'too_large');
  const text = await request.text();
  if (new TextEncoder().encode(text).length > LIMITS.body) return fail(413, 'too_large');
  let raw;
  try { raw = JSON.parse(text); } catch { return fail(400, 'invalid'); }

  // 3. Validate
  const parsed = parsePayload(raw);
  if (!parsed.ok) return json(400, { ok: false, error: 'invalid', fields: parsed.errors });
  const v = parsed.value;
  if (v.honeypot) return fail(400, 'invalid');

  // 4. Banned tokens (hashes only)
  const haystack = [v.name, v.what, v.place, v.credit, v.url, v.proof].join(' ');
  if (await hasBlockedToken(haystack, deps.blockedHashes || blocked.hashes)) return fail(422, 'blocked');

  // 5. Turnstile
  if (!(await verifyTurnstile(v.turnstile, env, doFetch))) return fail(400, 'turnstile');

  // 6. Build and re-check the record against the shared schema
  const record = buildRecord(v, now, rand(4));
  const problems = validateAgainstSchema(schema, record);
  if (problems.length) return fail(400, 'invalid');
  const branch = `submission/${utcDate(now).replace(/-/g, '')}-${record.id}`;
  const title = prTitle(record), body = prBody(record), labels = ['submission', 'needs-verification'];

  if (String(env.DRY_RUN) === '1') return json(200, { ok: true, dry_run: true, record, pr: { title, body, branch, labels } });

  // 7. GitHub
  if (!env.GITHUB_TOKEN) return fail(503, 'server');
  const { call } = gh(env, doFetch);
  const rateLimited = (r) => r.status === 429 || (r.status === 403 && r.headers.get('x-ratelimit-remaining') === '0');
  let created = false;
  try {
    // (1) queue length
    const open = await call('GET', '/pulls?state=open&per_page=100');
    if (rateLimited(open)) return fail(429, 'rate');
    if (!open.ok) return fail(502, 'server');
    const list = await open.json();
    if (list.filter((p) => (p.labels || []).some((l) => l.name === 'submission')).length >= QUEUE_LIMIT) return fail(503, 'full');
    // (2) main's SHA
    const ref = await call('GET', '/git/ref/heads/main');
    if (rateLimited(ref)) return fail(429, 'rate');
    if (!ref.ok) return fail(502, 'server');
    const sha = (await ref.json()).object.sha;
    // (3) branch
    const br = await call('POST', '/git/refs', { ref: `refs/heads/${branch}`, sha });
    if (rateLimited(br)) return fail(429, 'rate');
    if (!br.ok) return fail(502, 'server');
    created = true;
    // (4) file
    const content = btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(record, null, 2) + '\n')));
    const put = await call('PUT', `/contents/submissions/${record.id}.json`, { message: `Add submission: ${record.id}`, content, branch });
    if (!put.ok) throw new Error('put');
    // (5) pull request
    const pr = await call('POST', '/pulls', { title, head: branch, base: 'main', body });
    if (!pr.ok) throw new Error('pr');
    const prj = await pr.json();
    // (6) labels
    const lab = await call('POST', `/issues/${prj.number}/labels`, { labels });
    // A missing label does not undo the pull request: reviewers can add it by hand.
    return json(200, { ok: true, pr_url: prj.html_url, pr_number: prj.number });
  } catch {
    if (created) { try { await call('DELETE', `/git/refs/heads/${branch}`); } catch { /* best effort */ } }
    return fail(502, 'server');
  }
}

export const onRequestPost = ({ request, env }) => handleSubmit(request, env);
export const onRequest = () => fail(405, 'method', { Allow: 'POST' });
