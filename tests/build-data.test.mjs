import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAccepted, compose, render } from '../scripts/build-data.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = JSON.parse(fs.readFileSync(path.join(root, 'data/buildpower.base.json'), 'utf8'));
const rec = (id, status, extra = {}) => ({
  id, section: 'civic_tools', name: 'Test ' + id, url: 'https://example.org/' + id, what: 'A plain description of a test record that is long enough to pass the schema checks.',
  engage: ['read'], scope: 'National', legal_status: 'Not confirmed', partisanship: 'Not stated', tax_deductible: 'Not confirmed', cost: 'Free', links: {},
  status_2026: 'Not yet reviewed.', verification: 'unverified', date_verified: null, date_submitted: '2026-11-09', sources: ['https://example.org/proof'], notes: null, status,
  submission: { type: 'tool', language: ['en'], credit: 'A reader', source: 'web-form' }, ...extra
});
function withDir(files, fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'subs-'));
  for (const [name, r] of Object.entries(files)) fs.writeFileSync(path.join(dir, name + '.json'), JSON.stringify(r));
  try { return fn(dir); } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}

test('a pending record is excluded and an accepted one is included', () => {
  withDir({
    'pending-one': rec('pending-one', 'pending'),
    'accepted-one': rec('accepted-one', 'accepted', { verification: 'confirmed', date_verified: '2026-11-10' }),
    'rejected-one': rec('rejected-one', 'rejected')
  }, (dir) => {
    const { records } = loadAccepted(dir, new Set(base.records.map((r) => r.id)));
    assert.deepEqual(records.map((r) => r.id), ['accepted-one']);
    const out = compose(base, records);
    assert.equal(out.records.length, base.records.length + 1);
    const added = out.records.at(-1);
    assert.equal(added.community, true); assert.equal(added.credit, 'A reader'); assert.equal(added.verification, 'confirmed');
    assert.equal('status' in added, false); assert.equal('submission' in added, false);
    const js = render(out, base.records.length);
    assert.ok(js.includes('accepted-one')); assert.ok(!js.includes('pending-one')); assert.ok(!js.includes('rejected-one'));
  });
});

test('an accepted record needs date_verified, a valid shape and an unused id', () => {
  withDir({ 'acc-a': rec('acc-a', 'accepted') }, (dir) => assert.throws(() => loadAccepted(dir, new Set()), /date_verified/));
  withDir({ 'acc-b': rec('acc-b', 'accepted', { date_verified: '2026-11-10', extra: 1 }) }, (dir) => assert.throws(() => loadAccepted(dir, new Set()), /unexpected field/));
  withDir({ [base.records[0].id]: rec(base.records[0].id, 'accepted', { date_verified: '2026-11-10' }) }, (dir) => assert.throws(() => loadAccepted(dir, new Set(base.records.map((r) => r.id))), /already used/));
  withDir({ 'mismatch': rec('other-id', 'pending') }, (dir) => assert.throws(() => loadAccepted(dir, new Set()), /file name/));
});

test('with no submissions the generated file is exactly the committed one', () => {
  const out = render(compose(base, []), base.records.length);
  assert.equal(out, fs.readFileSync(path.join(root, 'dist/js/data-buildpower.js'), 'utf8'));
});

test('the committed submissions folder holds no accepted record yet', () => {
  const { records } = loadAccepted(path.join(root, 'submissions'), new Set(base.records.map((r) => r.id)));
  assert.equal(records.length, 0);
});
