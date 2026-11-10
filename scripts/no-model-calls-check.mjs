// Fails if anything in the project could send text to a hosted model or translation service, or run on a paid runner.
// Translation on this site happens inside the visitor's browser and costs the owner nothing.
//
//   node scripts/no-model-calls-check.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SELF = path.relative(root, fileURLToPath(import.meta.url)).split(path.sep).join('/');

export const HOSTS = [
  'api.anthropic.com', 'api.openai.com', 'generativelanguage.googleapis.com', 'translation.googleapis.com',
  'api.cognitive.microsofttranslator.com', 'api-free.deepl.com', 'api.deepl.com', 'libretranslate.com',
  'api.x.ai', 'openrouter.ai', 'api.mistral.ai', 'api.cohere.com', 'api.together.xyz', 'api.groq.com'
];
export const KEY_NAMES = /\b(?:ANTHROPIC|OPENAI|GEMINI|GOOGLE_AI|GOOGLE_TRANSLATE|DEEPL|XAI|OPENROUTER|MISTRAL|COHERE|TOGETHER|GROQ|LIBRETRANSLATE|AZURE_TRANSLATOR|MICROSOFT_TRANSLATOR)_API_KEY\b/;
const OK_RUNNERS = new Set(['ubuntu-latest', 'ubuntu-24.04']);
const DIRS = ['dist', 'functions', 'scripts', '.github'];
const SKIP_DIRS = new Set(['node_modules', '.git', '.wrangler', '.cache']);
const MAX_BYTES = 8 * 1024 * 1024;

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

/** @returns {{file:string, problem:string}[]} */
export function scan(rootDir = root, self = SELF) {
  const out = [];
  for (const d of DIRS) {
    const base = path.join(rootDir, d);
    if (!fs.existsSync(base)) continue;
    for (const file of walk(base)) {
      const rel = path.relative(rootDir, file).split(path.sep).join('/');
      if (rel === self) continue;
      const st = fs.statSync(file);
      if (st.size > MAX_BYTES) continue;
      const buf = fs.readFileSync(file);
      if (buf.includes(0)) continue; // binary
      const text = buf.toString('utf8');
      const lower = text.toLowerCase();
      for (const h of HOSTS) if (lower.includes(h)) out.push({ file: rel, problem: 'hosted model or translation host: ' + h });
      const k = KEY_NAMES.exec(text);
      if (k) out.push({ file: rel, problem: 'API key name: ' + k[0] });
      if (/^\.github\/workflows\/.+\.ya?ml$/.test(rel)) {
        for (const m of text.matchAll(/^\s*runs-on:\s*(.+?)\s*$/gm)) {
          if (!OK_RUNNERS.has(m[1].replace(/['"]/g, ''))) out.push({ file: rel, problem: 'runs-on is not ubuntu-latest or ubuntu-24.04: ' + m[1] });
        }
      }
    }
  }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const problems = scan();
  if (problems.length) {
    console.error('no-model-calls-check: ' + problems.length + ' problem(s)');
    problems.forEach((p) => console.error('  ' + p.file + ': ' + p.problem));
    process.exit(1);
  }
  console.log('no-model-calls-check: clean (' + DIRS.join(', ') + ')');
}
