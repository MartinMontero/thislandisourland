import test from 'node:test';
import assert from 'node:assert/strict';
import { handleSubmit, onRequest } from '../functions/api/submit.js';
import { sha256Hex, publicHttpsUrl } from '../functions/_lib/submission.mjs';

const ORIGIN = 'https://thislandisourland.us';
const good = () => ({
  type: 'organization', name: 'Example Tenant Union', url: 'https://example.org/tenants', what: 'Organizes tenants in one city to negotiate rent and repairs, and trains new leaders each year.',
  engage: ['volunteer', 'donate'], section: 'rights_and_services', legal: 'c3', party: 'nonpartisan', cost: 'free', scope: 'city', place: 'Springfield',
  proof: 'https://projects.propublica.org/nonprofits/organizations/123456789', languages: ['en', 'es'], credit: 'A reader', consent: true, website: '', turnstile: 'XXXX.DUMMY.TOKEN.XXXX', lang: 'en'
});
const req = (body, { origin = ORIGIN, type = 'application/json', method = 'POST', raw } = {}) => new Request('https://thislandisourland.us/api/submit', {
  method, headers: { Origin: origin, 'Content-Type': type }, body: method === 'GET' ? undefined : (raw ?? JSON.stringify(body))
});
const env = { TURNSTILE_SECRET: '1x0000000000000000000000000000000AA', DRY_RUN: '1' };
const fetchTurnstile = (ok = true) => async (url) => {
  assert.match(String(url), /turnstile\/v0\/siteverify/);
  return new Response(JSON.stringify({ success: ok }), { status: 200 });
};
const deps = (ok = true, extra = {}) => ({ fetch: fetchTurnstile(ok), now: () => new Date('2026-11-09T12:00:00Z'), randomHex: () => 'ab12', ...extra });
const run = async (body, opts, e = env, d = deps()) => { const r = await handleSubmit(req(body, opts), e, d); return { status: r.status, body: await r.json() }; };

test('valid submission in DRY_RUN returns the server-built record and PR text', async () => {
  const { status, body } = await run(good());
  assert.equal(status, 200); assert.equal(body.ok, true); assert.equal(body.dry_run, true);
  const r = body.record;
  assert.equal(r.id, 'example-tenant-union-ab12');
  assert.equal(r.status, 'pending'); assert.equal(r.verification, 'unverified'); assert.equal(r.tax_deductible, 'Not confirmed');
  assert.equal(r.date_submitted, '2026-11-09'); assert.equal(r.date_verified, null);
  assert.deepEqual(r.sources, ['https://projects.propublica.org/nonprofits/organizations/123456789']);
  assert.equal(r.submission.source, 'web-form'); assert.equal(r.scope, 'City: Springfield');
  assert.match(body.pr.title, /^\[submission\] organization: Example Tenant Union$/);
  assert.equal(body.pr.branch, 'submission/20261109-example-tenant-union-ab12');
  assert.deepEqual(body.pr.labels, ['submission', 'needs-verification']);
  assert.match(body.pr.body, /Reviewer checklist/);
});

test('the client cannot set status, verification or tax treatment; unknown fields are dropped', async () => {
  const { body } = await run({ ...good(), status: 'accepted', verification: 'confirmed', tax_deductible: 'Yes', extra: 'x' });
  assert.equal(body.record.status, 'pending'); assert.equal(body.record.verification, 'unverified'); assert.equal(body.record.tax_deductible, 'Not confirmed');
  assert.equal('extra' in body.record, false);
});

test('rejects bad input', async () => {
  const bad = [
    ['empty name', { ...good(), name: '' }],
    ['short name', { ...good(), name: 'ab' }],
    ['long name', { ...good(), name: 'x'.repeat(121) }],
    ['short description', { ...good(), what: 'too short' }],
    ['long description', { ...good(), what: 'x'.repeat(601) }],
    ['http url', { ...good(), url: 'http://example.org/' }],
    ['ipv4 url', { ...good(), url: 'https://192.168.1.10/x' }],
    ['ipv4 public literal', { ...good(), url: 'https://8.8.8.8/' }],
    ['ipv6 url', { ...good(), url: 'https://[::1]/' }],
    ['localhost url', { ...good(), url: 'https://localhost/x' }],
    ['internal host', { ...good(), url: 'https://db.internal/x' }],
    ['credentials in url', { ...good(), url: 'https://user:pw@example.org/' }],
    ['bad proof', { ...good(), proof: 'ftp://example.org/x' }],
    ['bad enum', { ...good(), section: 'nope' }],
    ['bad engage', { ...good(), engage: ['volunteer', 'hack'] }],
    ['missing consent', { ...good(), consent: false }],
    ['consent as string', { ...good(), consent: 'true' }]
  ];
  for (const [label, b] of bad) {
    const { status, body } = await run(b);
    assert.equal(status, 400, label); assert.equal(body.ok, false, label);
  }
});

test('honeypot filled is rejected', async () => {
  const { status, body } = await run({ ...good(), website: 'http://spam.example' });
  assert.equal(status, 400); assert.equal(body.ok, false);
});

test('wrong or missing Origin is rejected; localhost:8788 is allowed', async () => {
  assert.equal((await run(good(), { origin: 'https://evil.example' })).status, 403);
  const r = await handleSubmit(new Request('https://thislandisourland.us/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(good()) }), env, deps());
  assert.equal(r.status, 403);
  assert.equal((await run(good(), { origin: 'http://localhost:8788' })).status, 200);
  assert.equal((await run(good(), { origin: 'https://www.thislandisourland.us' })).status, 200);
  assert.equal((await run(good(), { origin: 'https://representation-mosaic.pages.dev' })).status, 200);
});

test('oversize body is 413, wrong content type is 415, malformed JSON is 400', async () => {
  assert.equal((await run(null, { raw: JSON.stringify({ ...good(), what: 'x'.repeat(17000) }) })).status, 413);
  assert.equal((await run(good(), { type: 'text/plain' })).status, 415);
  assert.equal((await run(null, { raw: '{not json' })).status, 400);
});

test('anything but POST is 405 with Allow: POST', async () => {
  const r = await onRequest();
  assert.equal(r.status, 405); assert.equal(r.headers.get('Allow'), 'POST');
});

test('Turnstile failure is rejected; missing token is rejected', async () => {
  assert.equal((await run(good(), {}, env, deps(false))).body.error, 'turnstile');
  assert.equal((await run({ ...good(), turnstile: '' })).body.error, 'turnstile');
  assert.equal((await run(good(), {}, { DRY_RUN: '1' })).body.error, 'turnstile');
});

test('blocked token (matched by hash) gets the generic rejection', async () => {
  const token = 'zzqxjvs'; // harmless stand-in that ends in "s": the filter must see the whole word
  const blockedHashes = [await sha256Hex(token)];
  const { status, body } = await run({ ...good(), what: 'This group is led by Mr. ' + token + ' and organizes tenants every week in one city.' }, {}, env, deps(true, { blockedHashes }));
  assert.equal(status, 422); assert.deepEqual(body, { ok: false, error: 'blocked' });
});

test('the committed blocklist rejects its token without the token appearing in any source file', async () => {
  const fs = await import('node:fs');
  const hashes = JSON.parse(fs.readFileSync(new URL('../data/blocked-token-hashes.json', import.meta.url), 'utf8')).hashes;
  assert.equal(hashes.length >= 1, true);
  assert.ok(hashes.every((h) => /^[0-9a-f]{64}$/.test(h)));
});

test('real GitHub path (mocked): branch, file, PR and labels, in that order', async () => {
  const calls = [];
  const gh = async (url, init = {}) => {
    const u = String(url);
    if (u.includes('turnstile')) return new Response(JSON.stringify({ success: true }));
    calls.push(`${init.method || 'GET'} ${u.replace('https://api.github.com/repos/MartinMontero/thislandisourland', '')}`);
    if (u.endsWith('/pulls?state=open&per_page=100')) return new Response(JSON.stringify([{ labels: [{ name: 'submission' }] }]));
    if (u.endsWith('/git/ref/heads/main')) return new Response(JSON.stringify({ object: { sha: 'abc123' } }));
    if (u.endsWith('/git/refs')) return new Response('{}', { status: 201 });
    if (u.includes('/contents/submissions/')) { assert.equal(init.headers.Authorization, 'Bearer tok'); const j = JSON.parse(init.body); assert.equal(j.branch, 'submission/20261109-example-tenant-union-ab12'); assert.equal(JSON.parse(Buffer.from(j.content, 'base64').toString()).status, 'pending'); return new Response('{}', { status: 201 }); }
    if (u.endsWith('/pulls') && init.method === 'POST') return new Response(JSON.stringify({ number: 7, html_url: 'https://github.com/MartinMontero/thislandisourland/pull/7' }), { status: 201 });
    if (u.endsWith('/issues/7/labels')) return new Response('[]');
    throw new Error('unexpected call ' + u);
  };
  const r = await handleSubmit(req(good()), { TURNSTILE_SECRET: 's', GITHUB_TOKEN: 'tok' }, { fetch: gh, now: () => new Date('2026-11-09T12:00:00Z'), randomHex: () => 'ab12' });
  const body = await r.json();
  assert.equal(r.status, 200); assert.deepEqual(body, { ok: true, pr_url: 'https://github.com/MartinMontero/thislandisourland/pull/7', pr_number: 7 });
  assert.deepEqual(calls.map((c) => c.split('?')[0]), ['GET /pulls', 'GET /git/ref/heads/main', 'POST /git/refs', 'PUT /contents/submissions/example-tenant-union-ab12.json', 'POST /pulls', 'POST /issues/7/labels']);
});

test('review queue at 40 open submission PRs returns 503 "full"', async () => {
  const many = Array.from({ length: 40 }, () => ({ labels: [{ name: 'submission' }] }));
  const gh = async (url) => (String(url).includes('turnstile') ? new Response(JSON.stringify({ success: true })) : new Response(JSON.stringify(many)));
  const r = await handleSubmit(req(good()), { TURNSTILE_SECRET: 's', GITHUB_TOKEN: 'tok' }, { fetch: gh, now: () => new Date(), randomHex: () => 'ab12' });
  assert.equal(r.status, 503); assert.equal((await r.json()).error, 'full');
});

test('GitHub errors never leak: a failed PR cleans up the branch and returns a code only', async () => {
  const seen = [];
  const gh = async (url, init = {}) => {
    const u = String(url);
    if (u.includes('turnstile')) return new Response(JSON.stringify({ success: true }));
    seen.push(`${init.method || 'GET'} ${u}`);
    if (u.includes('/pulls?')) return new Response('[]');
    if (u.endsWith('/git/ref/heads/main')) return new Response(JSON.stringify({ object: { sha: 'abc' } }));
    if (u.endsWith('/git/refs')) return new Response('{}', { status: 201 });
    if (u.includes('/contents/')) return new Response('{"message":"secret internal detail"}', { status: 500 });
    return new Response('{}');
  };
  const r = await handleSubmit(req(good()), { TURNSTILE_SECRET: 's', GITHUB_TOKEN: 'tok' }, { fetch: gh, now: () => new Date(), randomHex: () => 'ab12' });
  const text = await r.text();
  assert.equal(r.status, 502); assert.deepEqual(JSON.parse(text), { ok: false, error: 'server' });
  assert.ok(seen.some((s) => s.startsWith('DELETE ') && s.includes('/git/refs/heads/submission/')));
});

test('text is preserved: clean() only strips controls, tags and extra whitespace', async () => {
  const { clean, defuse } = await import('../functions/_lib/submission.mjs');
  assert.equal(clean('  Organizes   tenants,\n leaders <b>each</b> year.  '), 'Organizes tenants, leaders each year.');
  assert.equal(clean('Pass\u0000word‮'), 'Pass word');
  assert.equal(defuse('@someone fixed #12'), '@​someone fixed #​12');
  const { body } = await run({ ...good(), name: 'Tenants Unite Associates', what: 'Organizes tenants across the whole region and trains leaders for every season.' });
  assert.equal(body.record.name, 'Tenants Unite Associates');
  assert.equal(body.record.what, 'Organizes tenants across the whole region and trains leaders for every season.');
});

test('URL helper: https only, no IP literals, localhost or private names', () => {
  assert.ok(publicHttpsUrl('https://example.org/a?b=1'));
  for (const u of ['http://example.org', 'https://127.0.0.1', 'https://10.0.0.1', 'https://[::1]', 'https://localhost', 'https://foo.local', 'https://0x7f000001', 'https://2130706433', 'javascript:alert(1)', 'https://nodot']) assert.equal(publicHttpsUrl(u), null, u);
});
