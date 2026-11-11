// Renders dist/og.png (1200 x 630, the link-preview image) from:
//   - dist/img/lady-liberty-logo.png   (the logo, drawn at left)
//   - scripts/og-copy.json             (title, subtitle and one smaller line, drawn at right)
//   - dist/fonts/InstrumentSerif-Regular.woff2 (the site's serif)
// Run it with:  npm run og
// Free and offline: no network calls, no secrets, no paid service. It uses @napi-rs/canvas
// (a prebuilt binary that npm installs with the other dev dependencies).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const W = 1200, H = 630, SAFE = 60;
const CREAM = '#F3EDE0', INK = '#1C2130', INK2 = '#2D3345';
const FONT = 'InstrumentSerif';

// ---- the copy
const copy = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'og-copy.json'), 'utf8'));
for (const key of ['title', 'subtitle', 'line']) {
  if (typeof copy[key] !== 'string' || !copy[key].trim()) throw new Error('scripts/og-copy.json needs a non-empty "' + key + '"');
}

// ---- the font
GlobalFonts.registerFromPath(path.join(root, 'dist', 'fonts', 'InstrumentSerif-Regular.woff2'), FONT);
if (!GlobalFonts.families.some((f) => f.family === FONT)) throw new Error('Could not load dist/fonts/InstrumentSerif-Regular.woff2');

// ---- the logo, trimmed of its empty transparent margin
const logoImg = await loadImage(fs.readFileSync(path.join(root, 'dist', 'img', 'lady-liberty-logo.png')));
function trim(img) {
  const c = createCanvas(img.width, img.height), x = c.getContext('2d');
  x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height).data;
  let x0 = c.width, x1 = -1, y0 = c.height, y1 = -1;
  for (let j = 0; j < c.height; j++) for (let i = 0; i < c.width; i++) {
    if (d[(j * c.width + i) * 4 + 3] > 10) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; }
  }
  const w = x1 - x0 + 1, h = y1 - y0 + 1, out = createCanvas(w, h);
  out.getContext('2d').drawImage(c, x0, y0, w, h, 0, 0, w, h);
  return out;
}
const logo = trim(logoImg);

// ---- drawing
const canvas = createCanvas(W, H), ctx = canvas.getContext('2d');
ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);

// Logo at left, at its natural size (never enlarged, so it stays sharp), vertically centred.
const lh = Math.min(logo.height, H - 2 * SAFE), lw = Math.round(logo.width * lh / logo.height);
ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
ctx.drawImage(logo, 300 - Math.round(lw / 2), Math.round((H - lh) / 2), lw, lh);

// Text column at right. Words wrap to the column; the type steps down until the block fits the safe area.
const colX = 590, colW = 540;
function greedy(text, width) {
  const lines = []; let line = '';
  for (const word of text.split(/\s+/)) {
    const t = line ? line + ' ' + word : word;
    if (ctx.measureText(t).width <= width || !line) line = t; else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
}
// Wrap to the column, then pull the line width in as far as it can go without adding a line.
// That balances the lines, so a short last word is not left alone on its own line.
function wrap(text, size) {
  ctx.font = size + 'px ' + FONT;
  const n = greedy(text, colW).length;
  let lo = 0, hi = colW;
  for (let k = 0; k < 24; k++) { const mid = (lo + hi) / 2; if (greedy(text, mid).length === n) hi = mid; else lo = mid; }
  return greedy(text, hi);
}
let layout;
for (let size = 104; size >= 56; size -= 2) {
  const t = { size, lh: Math.round(size * 0.95) };
  const s = { size: Math.round(size * 0.42), lh: Math.round(size * 0.42 * 1.22) };
  const l = { size: Math.round(size * 0.29), lh: Math.round(size * 0.29 * 1.3) };
  t.lines = wrap(copy.title, t.size); s.lines = wrap(copy.subtitle, s.size); l.lines = wrap(copy.line, l.size);
  const gap1 = Math.round(size * 0.3), gap2 = Math.round(size * 0.22);
  const height = t.lines.length * t.lh + gap1 + s.lines.length * s.lh + gap2 + l.lines.length * l.lh;
  layout = { t, s, l, gap1, gap2, height };
  if (height <= H - 2 * SAFE) break;
}
ctx.textBaseline = 'alphabetic';
let y = Math.round((H - layout.height) / 2);
const put = (block, color) => {
  ctx.font = block.size + 'px ' + FONT; ctx.fillStyle = color;
  block.lines.forEach((text, i) => ctx.fillText(text, colX, y + Math.round(block.size * 0.8) + i * block.lh));
  y += block.lines.length * block.lh;
};
put(layout.t, INK); y += layout.gap1;
put(layout.s, INK); y += layout.gap2;
put(layout.l, INK2);

// ---- save, then check nothing sits outside the safe area (this catches cut-off text)
const outPath = path.join(root, 'dist', 'og.png');
fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
const px = ctx.getImageData(0, 0, W, H).data;
let x0 = W, x1 = -1, y0 = H, y1 = -1;
for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
  const k = (j * W + i) * 4;
  if (Math.abs(px[k] - 243) > 6 || Math.abs(px[k + 1] - 237) > 6 || Math.abs(px[k + 2] - 224) > 6) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; }
}
const margins = { left: x0, right: W - 1 - x1, top: y0, bottom: H - 1 - y1 };
console.log('wrote dist/og.png  ' + W + 'x' + H + '  title ' + layout.t.size + 'px, ' + layout.t.lines.length + ' lines');
console.log('margins to the edge (px): left ' + margins.left + ', right ' + margins.right + ', top ' + margins.top + ', bottom ' + margins.bottom);
if (Math.min(...Object.values(margins)) < SAFE - 10) {
  console.error('Something is closer than ' + (SAFE - 10) + 'px to the edge. Shorten the text in scripts/og-copy.json.');
  process.exit(1);
}
