// Shared by the Pages Function (functions/api/submit.js), the CI check (scripts/check-submissions.mjs),
// the build step (scripts/build-data.mjs) and the tests. Plain ES module, no dependencies.

export const ENUMS = {
  type: ['organization', 'toolkit', 'training', 'tool', 'policy', 'other'],
  section: ['anti_corruption', 'economic_power', 'run_for_office', 'civic_tools', 'rights_and_services', 'good_trouble', 'beautiful_trouble'],
  engage: ['volunteer', 'donate', 'train', 'run', 'start', 'use_tool', 'get_help', 'serve', 'read'],
  legal: ['unknown', 'c3', 'c4', 'c6', '527', 'pac', 'government', 'forprofit', 'informal'],
  party: ['unknown', 'nonpartisan', 'partisan', 'issue'],
  cost: ['unknown', 'free', 'paid', 'sliding'],
  scope: ['national', 'state', 'city', 'online'],
  languages: ['en', 'es', 'ar', 'other'],
  lang: ['en', 'es', 'ar']
};

const LEGAL = {
  unknown: 'Not confirmed',
  c3: '501(c)(3), as reported by the submitter (not confirmed)',
  c4: '501(c)(4), as reported by the submitter (not confirmed)',
  c6: '501(c)(6), as reported by the submitter (not confirmed)',
  527: '527 organization, as reported by the submitter (not confirmed)',
  pac: 'PAC or campaign committee, as reported by the submitter (not confirmed)',
  government: 'Government body, as reported by the submitter (not confirmed)',
  forprofit: 'For-profit business, as reported by the submitter (not confirmed)',
  informal: 'Informal or mutual-aid group, as reported by the submitter (not confirmed)'
};
const PARTY = {
  unknown: 'Not stated',
  nonpartisan: 'Described by the submitter as nonpartisan (not confirmed)',
  partisan: 'Described by the submitter as partisan (not confirmed)',
  issue: 'Described by the submitter as issue advocacy (not confirmed)'
};
const COST = { unknown: 'Not stated', free: 'Free', paid: 'Paid', sliding: 'Sliding scale' };

export const LIMITS = { body: 16 * 1024 };

// Control and invisible characters: C0 controls, DEL, zero-width and bidi marks, line/paragraph separators, BOM.
// Built from code points so the source file stays plain ASCII.
const INVISIBLE = [[0, 31], [127, 127], [0x200b, 0x200f], [0x2028, 0x202e], [0x2066, 0x2069], [0xfeff, 0xfeff]];
const INVISIBLE_RE = new RegExp('[' + INVISIBLE.map(([a, b]) => String.fromCharCode(a) + (b > a ? '-' + String.fromCharCode(b) : '')).join('') + ']', 'g');

/** Strip control characters and HTML, collapse whitespace. */
export function clean(s) {
  return String(s == null ? '' : s)
    .replace(INVISIBLE_RE, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** https only; no IP literals, no localhost or private/internal names. Returns the normalised URL or null. */
export function publicHttpsUrl(input) {
  let u;
  try { u = new URL(String(input).trim()); } catch { return null; }
  if (u.protocol !== 'https:' || u.username || u.password) return null;
  const h = u.hostname.toLowerCase();
  if (!h || h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal') || h.endsWith('.lan')) return null;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h) || /^0x[0-9a-f]+$/i.test(h) || /^\d+$/.test(h)) return null; // IPv4 forms
  if (h.includes(':') || h.startsWith('[')) return null; // IPv6 literal
  if (!h.includes('.') || h.endsWith('.')) return null;
  const href = u.href.length > 300 ? null : u.href;
  return href;
}

export function slug(name) {
  return clean(name).toLowerCase().normalize('NFKD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48).replace(/-+$/g, '') || 'resource';
}

export async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** True when any letter-only token of `text` hashes into `hashes` (a Set or array of hex strings). */
export async function hasBlockedToken(text, hashes) {
  const set = hashes instanceof Set ? hashes : new Set(hashes);
  if (!set.size) return false;
  const tokens = new Set(String(text).toLowerCase().normalize('NFKC').split(/[^\p{L}]+/u).filter(Boolean));
  for (const t of tokens) if (set.has(await sha256Hex(t))) return true;
  return false;
}

/** Validate and normalise the client payload. Unknown fields are dropped. */
export function parsePayload(raw) {
  const errors = [];
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { ok: false, errors: ['body'] };
  const pickEnum = (v, list, field, dflt) => { if (v === undefined || v === '') { if (dflt !== undefined) return dflt; errors.push(field); return null; } if (!list.includes(v)) { errors.push(field); return null; } return v; };
  const pickMany = (v, list, field) => { if (v === undefined) return []; if (!Array.isArray(v) || v.length > list.length) { errors.push(field); return []; } const out = [...new Set(v)]; if (!out.every((x) => list.includes(x))) { errors.push(field); return []; } return out; };
  const text = (v, min, max, field, optional) => {
    if (v === undefined || v === null || v === '') { if (optional) return ''; errors.push(field); return ''; }
    if (typeof v !== 'string') { errors.push(field); return ''; }
    const c = clean(v);
    if (optional && !c) return '';
    if (c.length < min || c.length > max) errors.push(field);
    return c;
  };

  const value = {
    type: pickEnum(raw.type, ENUMS.type, 'type', 'organization'),
    name: text(raw.name, 3, 120, 'name'),
    url: null,
    what: text(raw.what, 40, 600, 'what'),
    engage: pickMany(raw.engage, ENUMS.engage, 'engage'),
    section: pickEnum(raw.section, ENUMS.section, 'section', 'civic_tools'),
    legal: pickEnum(raw.legal, ENUMS.legal, 'legal', 'unknown'),
    party: pickEnum(raw.party, ENUMS.party, 'party', 'unknown'),
    cost: pickEnum(raw.cost, ENUMS.cost, 'cost', 'unknown'),
    scope: pickEnum(raw.scope, ENUMS.scope, 'scope', 'national'),
    place: text(raw.place, 0, 80, 'place', true),
    proof: null,
    languages: pickMany(raw.languages, ENUMS.languages, 'languages'),
    credit: text(raw.credit, 0, 60, 'credit', true),
    lang: pickEnum(raw.lang, ENUMS.lang, 'lang', 'en')
  };
  const url = publicHttpsUrl(raw.url); if (!url || typeof raw.url !== 'string' || raw.url.length < 8 || raw.url.length > 300) errors.push('url'); else value.url = url;
  const proof = publicHttpsUrl(raw.proof); if (!proof || typeof raw.proof !== 'string' || raw.proof.length < 8 || raw.proof.length > 300) errors.push('proof'); else value.proof = proof;
  if (raw.consent !== true) errors.push('consent');
  if (raw.turnstile !== undefined && (typeof raw.turnstile !== 'string' || raw.turnstile.length > 2048)) errors.push('turnstile');
  value.honeypot = typeof raw.website === 'string' ? raw.website : '';
  value.turnstile = typeof raw.turnstile === 'string' ? raw.turnstile : '';
  return errors.length ? { ok: false, errors } : { ok: true, value };
}

export function scopeText(v) {
  if (v.scope === 'state') return v.place ? 'State: ' + v.place : 'A state';
  if (v.scope === 'city') return v.place ? 'City: ' + v.place : 'A city';
  if (v.scope === 'online') return 'Online only';
  return v.place ? 'National (' + v.place + ')' : 'National';
}

export function utcDate(d) { return d.toISOString().slice(0, 10); }

/** The record the server writes. The client cannot influence status, verification or tax treatment. */
export function buildRecord(v, now, randomHex) {
  const id = slug(v.name) + '-' + randomHex;
  return {
    id,
    section: v.section,
    name: v.name,
    url: v.url,
    what: v.what,
    engage: v.engage,
    scope: scopeText(v),
    legal_status: LEGAL[v.legal],
    partisanship: PARTY[v.party],
    tax_deductible: 'Not confirmed',
    cost: COST[v.cost],
    links: {},
    status_2026: 'Not yet reviewed.',
    verification: 'unverified',
    date_verified: null,
    date_submitted: utcDate(now),
    sources: [v.proof],
    notes: null,
    status: 'pending',
    submission: { type: v.type, language: v.languages, credit: v.credit || null, source: 'web-form' }
  };
}

/** Keep GitHub from notifying people or linking issues because of text a stranger typed. */
export function defuse(s) { const zw = String.fromCharCode(0x200b); return String(s).replace(/@/g, '@' + zw).replace(/#(\d)/g, '#' + zw + '$1'); }

export function prTitle(record) { return defuse(`[submission] ${record.submission.type}: ${record.name}`).slice(0, 200); }

export function prBody(record) {
  const row = (k, v) => `| ${k} | ${defuse(String(v)).replace(/\|/g, '/')} |`;
  return [
    'A reader suggested this resource through the form on the site. Nothing here is verified yet.',
    '',
    '| Field | Value |',
    '|---|---|',
    row('Name', record.name),
    row('Type', record.submission.type),
    row('Section', record.section),
    row('Link', record.url),
    row('Proof link', record.sources[0]),
    row('What it is', record.what),
    row('How people can use it', record.engage.join(', ') || 'not stated'),
    row('Scope', record.scope),
    row('Legal form (submitter says)', record.legal_status),
    row('Where it sits (submitter says)', record.partisanship),
    row('Cost', record.cost),
    row('Languages', record.submission.language.join(', ') || 'not stated'),
    row('Credit', record.submission.credit || 'none'),
    row('Submitted', record.date_submitted),
    '',
    '### Reviewer checklist',
    '',
    '- [ ] Legal status confirmed against an IRS record or the state registry',
    '- [ ] The link is live and matches the description',
    '- [ ] No personal information in any field',
    '- [ ] The nonpartisan or partisan label is correct and sourced',
    '- [ ] The section is correct',
    '- [ ] `status` set to `accepted` and `verification` set to the right level before merging. Records with `status: "pending"` are never published.',
    '',
    `File: \`submissions/${record.id}.json\``
  ].join('\n');
}

/* ---------------- minimal JSON Schema checker (the subset schema/submission.schema.json uses) ---------------- */
export function validateAgainstSchema(schema, data, path = '$') {
  const errs = [];
  const t = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v);
  const types = schema.type ? [].concat(schema.type) : null;
  if (types && !types.includes(t(data)) && !(types.includes('integer') && Number.isInteger(data))) { errs.push(`${path}: expected ${types.join('|')}, got ${t(data)}`); return errs; }
  if (schema.enum && !schema.enum.includes(data)) errs.push(`${path}: must be one of ${schema.enum.join(', ')}`);
  if (typeof data === 'string') {
    if (schema.minLength != null && data.length < schema.minLength) errs.push(`${path}: shorter than ${schema.minLength}`);
    if (schema.maxLength != null && data.length > schema.maxLength) errs.push(`${path}: longer than ${schema.maxLength}`);
    if (schema.pattern && !new RegExp(schema.pattern).test(data)) errs.push(`${path}: does not match ${schema.pattern}`);
  }
  if (Array.isArray(data)) {
    if (schema.minItems != null && data.length < schema.minItems) errs.push(`${path}: fewer than ${schema.minItems} items`);
    if (schema.maxItems != null && data.length > schema.maxItems) errs.push(`${path}: more than ${schema.maxItems} items`);
    if (schema.uniqueItems && new Set(data.map((x) => JSON.stringify(x))).size !== data.length) errs.push(`${path}: items must be unique`);
    if (schema.items) data.forEach((x, i) => errs.push(...validateAgainstSchema(schema.items, x, `${path}[${i}]`)));
  }
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    (schema.required || []).forEach((k) => { if (!(k in data)) errs.push(`${path}: missing ${k}`); });
    const props = schema.properties || {};
    for (const [k, v] of Object.entries(data)) {
      if (props[k]) errs.push(...validateAgainstSchema(props[k], v, `${path}.${k}`));
      else if (schema.additionalProperties === false) errs.push(`${path}: unexpected field ${k}`);
      else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') errs.push(...validateAgainstSchema(schema.additionalProperties, v, `${path}.${k}`));
    }
  }
  return errs;
}
