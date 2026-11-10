import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { scan, HOSTS } from '../scripts/no-model-calls-check.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('the project has no hosted model or translation host, API key name or paid runner', () => {
  execFileSync(process.execPath, [path.join(root, 'scripts/no-model-calls-check.mjs')], { cwd: root, stdio: 'pipe' });
  assert.deepEqual(scan(), []);
});

test('the check catches each kind of problem (fixtures are built at run time)', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nmc-'));
  try {
    const put = (rel, body) => { fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); fs.writeFileSync(path.join(dir, rel), body); };
    put('dist/js/a.js', 'fetch("https://' + HOSTS[1] + '/v1/chat")');
    put('functions/b.js', 'const k = env.' + 'DEEPL' + '_API_' + 'KEY');
    put('.github/workflows/c.yml', 'jobs:\n  x:\n    runs-on: macos-latest\n');
    put('.github/workflows/d.yml', 'jobs:\n  x:\n    runs-on: ubuntu-24.04\n');
    put('scripts/e.mjs', 'console.log("fine")');
    const found = scan(dir, 'none');
    const files = found.map((f) => f.file).sort();
    assert.deepEqual(files, ['.github/workflows/c.yml', 'dist/js/a.js', 'functions/b.js']);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('every host the owner listed is in the check', () => {
  for (const h of ['api.anthropic.com', 'api.openai.com', 'generativelanguage.googleapis.com', 'translation.googleapis.com', 'api.cognitive.microsofttranslator.com', 'api-free.deepl.com', 'api.deepl.com', 'libretranslate.com', 'api.x.ai', 'openrouter.ai', 'api.mistral.ai', 'api.cohere.com', 'api.together.xyz', 'api.groq.com']) assert.ok(HOSTS.includes(h), h);
});
