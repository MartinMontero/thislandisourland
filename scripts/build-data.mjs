// Regenerates dist/js/data-buildpower.js from data/buildpower.base.json plus every
// submissions/*.json whose status is "accepted". Pending and rejected records are never published.
//
//   node scripts/build-data.mjs            # write dist/js/data-buildpower.js
//   node scripts/build-data.mjs --init     # one-time: write data/buildpower.base.json from the current dist file
//   node scripts/build-data.mjs --check    # exit 1 if dist/js/data-buildpower.js is out of date
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { validateAgainstSchema } from '../functions/_lib/submission.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distFile = path.join(root, 'dist', 'js', 'data-buildpower.js');
const baseFile = path.join(root, 'data', 'buildpower.base.json');
const subDir = path.join(root, 'submissions');
const schema = JSON.parse(fs.readFileSync(path.join(root, 'schema', 'submission.schema.json'), 'utf8'));

const HEAD = (n, verified) => `/* Build power directory: ${n} checked groups, trainings and tools, with the guides around them. Verified ${verified}. Loaded as a script (not fetched) so the content security policy stays unchanged. */\n(function (M) {\n  M.buildpower = `;
const TAIL = ';\n})(window.MOSAIC);\n';

export function loadAccepted(dir = subDir, ids = new Set()) {
  const out = [], notes = [];
  if (!fs.existsSync(dir)) return { records: out, notes };
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
    let rec;
    try { rec = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) { throw new Error(`${f}: not valid JSON`); }
    const problems = validateAgainstSchema(schema, rec);
    if (problems.length) throw new Error(`${f}: ${problems.join('; ')}`);
    if (rec.id + '.json' !== f) throw new Error(`${f}: id must match the file name`);
    if (rec.status !== 'accepted') { notes.push(`${f}: status ${rec.status}, not published`); continue; }
    if (!rec.date_verified) throw new Error(`${f}: accepted records need date_verified`);
    if (ids.has(rec.id)) throw new Error(`${f}: id already used in the directory`);
    ids.add(rec.id);
    const { status, date_submitted, submission, ...pub } = rec;
    out.push({ ...pub, community: true, credit: submission.credit || null });
  }
  return { records: out, notes };
}

export function compose(base, accepted) {
  const b = JSON.parse(JSON.stringify(base));
  b.records = b.records.concat(accepted);
  return b;
}

export function render(b, baseCount) {
  // The header counts the reviewed directory; community records are shown with their own tag.
  return HEAD(baseCount, b.verified) + JSON.stringify(b) + TAIL;
}

function main() {
  const arg = process.argv[2];
  if (arg === '--init') {
    const ctx = { window: { MOSAIC: {} } };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(distFile, 'utf8'), ctx);
    fs.mkdirSync(path.dirname(baseFile), { recursive: true });
    fs.writeFileSync(baseFile, JSON.stringify(ctx.window.MOSAIC.buildpower, null, 1) + '\n');
    console.log('wrote data/buildpower.base.json with', ctx.window.MOSAIC.buildpower.records.length, 'records');
    return;
  }
  const base = JSON.parse(fs.readFileSync(baseFile, 'utf8'));
  const ids = new Set(base.records.map((r) => r.id));
  const { records, notes } = loadAccepted(subDir, ids);
  const out = render(compose(base, records), base.records.length);
  if (arg === '--check') {
    const cur = fs.existsSync(distFile) ? fs.readFileSync(distFile, 'utf8') : '';
    if (cur !== out) { console.error('dist/js/data-buildpower.js is out of date. Run: npm run build'); process.exit(1); }
    console.log('data-buildpower.js is up to date');
    return;
  }
  fs.writeFileSync(distFile, out);
  console.log(`data-buildpower.js: ${base.records.length} reviewed + ${records.length} accepted community record(s)` + (notes.length ? '\n  ' + notes.join('\n  ') : ''));
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
