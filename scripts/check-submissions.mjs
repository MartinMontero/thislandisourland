// CI check for pull requests that carry a reader's suggestion (job name: submission-check).
// Runs on `pull_request` only; it never executes anything from the PR and never uses secrets.
//
//   BASE_SHA, HEAD_SHA, HEAD_REF come from the workflow (passed through env, not interpolated into the shell).
//   node scripts/check-submissions.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { hasBlockedToken, validateAgainstSchema } from '../functions/_lib/submission.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const schema = JSON.parse(fs.readFileSync(path.join(root, 'schema', 'submission.schema.json'), 'utf8'));
const blocked = JSON.parse(fs.readFileSync(path.join(root, 'data', 'blocked-token-hashes.json'), 'utf8')).hashes;
const base = JSON.parse(fs.readFileSync(path.join(root, 'data', 'buildpower.base.json'), 'utf8'));

const { BASE_SHA, HEAD_SHA, HEAD_REF = '' } = process.env;
const summary = [];
const errors = [];
const warnings = [];
const out = (line) => summary.push(line);

function changedFiles() {
  if (!BASE_SHA || !HEAD_SHA) return [];
  const raw = execFileSync('git', ['diff', '--name-only', '-z', `${BASE_SHA}...${HEAD_SHA}`], { cwd: root, encoding: 'utf8' });
  return raw.split('\0').filter(Boolean);
}
const norm = (u) => String(u).toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/[#?].*$/, '').replace(/\/+$/, '');

async function probe(url) {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 10000);
    const r = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctl.signal, headers: { 'User-Agent': 'thislandisourland-submission-check' } });
    clearTimeout(t);
    return r.status;
  } catch (e) { return 'unreachable'; }
}

async function main() {
  const isSubmission = HEAD_REF.startsWith('submission/');
  out('## submission-check');
  if (!isSubmission) {
    out('This pull request is not from a `submission/*` branch, so there is nothing to check.');
    return finish();
  }
  const files = changedFiles();
  out(`Changed files: ${files.length}`);
  const outside = files.filter((f) => !/^submissions\/[a-z0-9-]+\.json$/.test(f));
  if (outside.length) errors.push('A submission may only add or change files under `submissions/*.json`. Also changed: ' + outside.map((f) => '`' + f + '`').join(', '));
  const known = new Set(base.records.flatMap((r) => [r.url, ...Object.values(r.links || {})].filter(Boolean).map(norm)));
  fs.readdirSync(path.join(root, 'submissions')).filter((f) => f.endsWith('.json')).forEach((f) => {
    if (files.includes('submissions/' + f)) return;
    try { const r = JSON.parse(fs.readFileSync(path.join(root, 'submissions', f), 'utf8')); if (r.url) known.add(norm(r.url)); } catch { /* ignore */ }
  });

  for (const f of files.filter((x) => /^submissions\/[a-z0-9-]+\.json$/.test(x))) {
    const p = path.join(root, f);
    if (!fs.existsSync(p)) { out(`- \`${f}\`: removed`); continue; }
    let rec;
    try { rec = JSON.parse(fs.readFileSync(p, 'utf8')); } catch { errors.push(`\`${f}\` is not valid JSON.`); continue; }
    const problems = validateAgainstSchema(schema, rec);
    if (problems.length) errors.push(`\`${f}\` does not match the schema: ${problems.slice(0, 8).join('; ')}`);
    if (rec.id && f !== `submissions/${rec.id}.json`) errors.push(`\`${f}\`: the file name must be the record id.`);
    if (await hasBlockedToken(JSON.stringify(rec), blocked)) errors.push(`\`${f}\` contains text that cannot be published.`);
    if (rec.status === 'accepted' && !rec.date_verified) errors.push(`\`${f}\` is accepted but has no date_verified.`);
    if (rec.url && known.has(norm(rec.url))) warnings.push(`\`${f}\`: this link is already in the directory or in another submission.`);
    for (const [label, u] of [['link', rec.url], ['proof link', (rec.sources || [])[0]]]) {
      if (!u) continue;
      const s = await probe(u);
      (s === 200 || (typeof s === 'number' && s < 400) ? out : (x) => warnings.push(x))(`- \`${f}\` ${label} ${u} → ${s}`);
    }
  }
  finish();
}

function finish() {
  if (warnings.length) { out('\n### Warnings (do not fail the check)'); warnings.forEach((w) => out('- ' + w)); }
  if (errors.length) { out('\n### Failures'); errors.forEach((e) => out('- ' + e)); }
  else out('\nAll checks passed.');
  const text = summary.join('\n') + '\n';
  console.log(text);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
  process.exit(errors.length ? 1 : 0);
}
main();
