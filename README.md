# The Representation Mosaic

A fact-checked civic-education site about how the November 3, 2026 U.S. midterms became a wave: who won, why, and how, framed as top versus bottom rather than left versus right. It profiles the historic firsts and the wave-makers, tests the explanation against its counter-evidence, and then turns to the local power structures beneath it. It is a static site with no server code, built to host on Cloudflare Pages.

Facts were checked as of November 8, 2026. Vote shares are unofficial counts unless stated otherwise.

## What's in this folder

| Path | What it is |
|---|---|
| `dist/` | The finished site. This folder is what gets deployed. |
| `dist/js/data.js` | Themes, insights, lab prompts, municipal data, charts, and sources. |
| `dist/js/data-officials.js` | The 26 profiles (historic firsts and wave-makers) and the 50 claim checks. |
| `dist/js/data-provenance.js` | The sources and provenance guide: kinds of source, how to trace a claim, where claims go wrong, open items, and the domain-to-kind classification. |
| `dist/js/data-wave.js` | The wave: scale, voter shifts, six forces, playbook, speech map, counter-evidence, Texas case study. |
| `dist/js/data-buildpower.js` | The "Build power" section: 67 checked groups, trainings and tools (each with legal form, partisanship, tax-deductibility, cost, links, sources and a verification label), the start-here routine, the data-center power-bill guide, the Beautiful Trouble tables, the "start something" table, the routine for holding winners to their word, and the list of what could not be confirmed. It is loaded as a script, not fetched. |
| `dist/downloads/build-power-directory.md` | The same directory as one Markdown file, linked from the Build power page. |
| `dist/js/app.js` | All interactive behaviour: filters, matrix, simulators, ranked-choice count, export. |
| `dist/js/i18n.js`, `dist/js/lang-boot.js`, `dist/js/content.*.js` | Language switcher, tables, glossary and the Spanish and Arabic overlays. |
| `dist/js/suggest.js`, `functions/`, `schema/`, `submissions/`, `data/` | The "Suggest a resource" form, its Pages Function, the record schema, the submissions folder and the base directory data. |
| `dist/_headers` | Cloudflare Pages security headers (CSP) and caching rules. |
| `src/input.css`, `tailwind.config.js` | Source for the compiled stylesheet `dist/css/site.css`. |
| `research/` | The verification notes every fact on the site was checked against. |
| `design/` | Design philosophy ("Tessera Civica") and reference plate. |
| `wrangler.toml` | Cloudflare Pages project config (`pages_build_output_dir = "./dist"`). |

## Technical constraints met

- Tailwind CSS (compiled, not the CDN script), Chart.js 4 (bundled locally), vanilla JavaScript, plain HTML.
- No SVG and no Mermaid anywhere. Icons are text characters; charts draw on `<canvas>`.
- No third-party requests on page load. Fonts are self-hosted. YouTube loads only when a reader presses play, through `youtube-nocookie.com`.
- No cookies or analytics. Notes written in the Civic Wisdom Lab stay in the reader's browser (`localStorage`).
- Every chart has a "View data as a table" fallback. Keyboard navigation, focus trapping in dialogs, and `prefers-reduced-motion` are all supported.

## The Build power section

`#build` is a directory for readers who want to act on the results. Its 67 records can be searched and filtered by section, way to help, tax treatment and verification. Every card shows the group's legal form and where it sits politically. A record marked "Confirmed" was checked against an official page or IRS record on November 9, 2026; "Reported in 2026 sources" rests on dated search results or a secondary source; "Not confirmed" means current activity or a key fact could not be established. Records with a date-limited offer carry an `expires` date, and the card shows "Date has passed" afterwards without being hidden. The directory can be exported from the Export dialog ("Build power directory") or downloaded from `dist/downloads/`.

## Design system

Colour, spacing, radius and motion are CSS custom properties in `src/input.css` (`--md-sys-color-*`, light set and a `prefers-color-scheme: dark` set). The Tailwind palette in `tailwind.config.js` points at those variables, and no component carries a raw colour value. `scripts/contrast.py` checks every text and surface pair used against WCAG 2.2 AA (4.5:1 text, 3:1 interface and focus) in both sets.

Navigation follows the window size: a bottom bar with a "More" sheet under 600px, a navigation rail with labels beneath icons from 600px, and an expanded rail with labels beside icons from 840px. Controls are at least 44px tall, focus rings are 3px, and `scroll-padding` keeps the focused element clear of the sticky top bar and the bottom bar. Multi-column layouts use raised breakpoints (`lg` = 1152px) so they engage only when the content area beside the rail is wide enough.

Text uses the device's system font; Instrument Serif (display) and IBM Plex Mono (labels) are self-hosted.

## Updating content

Edit `dist/js/data.js`, `dist/js/data-officials.js` or `dist/js/data-provenance.js`. If you add Tailwind classes that aren't already used anywhere, run `npm run build` to regenerate the CSS. When results are certified, update the `result` fields and `meta.asOf`.

## Domain

`dist/index.html` sets `og:image`, the canonical link and the language alternates to `https://thislandisourland.us`, and `data.js` sets `meta.url` to that same domain. If the Pages project name or custom domain is different, change both.

## Languages: English, Español, العربية

The interface and part of the content are available in Spanish and Arabic. The toggle is in the app bar (a single "Language" button under 420px). The language comes from `?lang=es|ar|en`, then from the saved choice, otherwise English. A reader whose browser prefers Spanish or Arabic is offered the switch once and is never switched automatically.

- `dist/js/lang-boot.js` sets `<html lang dir>` before first paint. `dist/js/i18n.js` holds the interface tables (`ui`), the glossary for legal, tax and verification terms, plural handling (Arabic's six forms through `Intl.PluralRules`) and the switcher.
- Static text in `index.html` carries `data-i18n` ids (`node scripts/i18n-annotate.mjs` adds them). Text drawn from the data files is translated after it is drawn, by exact string or `{variable}` pattern.
- Overlays `dist/js/content.es.js` and `content.ar.js` load only when that language is chosen and are generated by `npm run build` from `i18n/es.json` and `i18n/ar.json`. Text with no translation stays in English and is marked `lang="en"`. Quotations, names, URLs, numbers and legal designations are never translated.
- Every translation is machine-generated and says so in a banner until `reviewed_by` is set in the overlay's `meta`.
- `scripts/translate-content.mjs` (and the `translate-content` workflow, which needs the `ANTHROPIC_API_KEY` repository secret) produces the next wave. `scripts/lib/validate-translation.mjs` checks every URL, number, proper noun, legal designation, HTML tag and glossary term before anything is written.
- Arabic uses Readex Pro (headings, 10 KB) and Noto Sans Arabic (body, 162 KB), both SIL OFL, loaded only when Arabic characters are drawn.

Content is rendered by JavaScript, so search engines may index only the English text. The `hreflang` links point at the `?lang=` URLs.

## Suggest a resource

`#suggest` is a form that opens a public pull request. `functions/api/submit.js` (a Pages Function, `POST /api/submit`) checks the origin and a Cloudflare Turnstile token, validates the input against `schema/submission.schema.json`, and uses the GitHub REST API to create a branch, add `submissions/<id>.json`, open a pull request and add the labels `submission` and `needs-verification`. `submissions/README.md` describes review. `.github/workflows/submission-check.yml` runs on every pull request. Only records whose `status` is `accepted` reach the directory (`scripts/build-data.mjs`, run by `npm run build`, reads `data/buildpower.base.json` plus the accepted submissions).

Secrets are never in files. Local development uses `.dev.vars` (ignored by git) with Cloudflare's published always-pass Turnstile test secret and `DRY_RUN=1`, so the function validates and returns the record without touching GitHub. The owner sets the production secrets with `npx wrangler pages secret put TURNSTILE_SECRET --project-name representation-mosaic` and `npx wrangler pages secret put GITHUB_TOKEN --project-name representation-mosaic`, and puts the production Turnstile site key in the `turnstile-sitekey` meta tag in `dist/index.html`.

## Tests

`npm test` runs the Node test runner over `tests/`: language-table parity, plural forms, glossary coverage, the translation validator, the form function (with a mocked GitHub), and the rule that pending submissions are never published.
