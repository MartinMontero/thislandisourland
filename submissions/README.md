# Submissions

Each file here, `submissions/<id>.json`, is one resource that a reader suggested through the "Suggest a resource" form on the site. The form opens a public pull request that adds the file. The file format is `schema/submission.schema.json`.

Nothing in this folder is published until a reviewer sets `"status": "accepted"` and merges the pull request. `npm run build` (through `scripts/build-data.mjs`) adds only accepted records to the directory. Records marked `pending` or `rejected` are never published.

## Review steps

1. Open the pull request. The `submission-check` check must pass. It confirms that the pull request changes only `submissions/*.json`, that the file matches the schema, that no blocked text is present, and it reports whether the link and the proof link load.
2. Open the proof link and confirm the legal form against an IRS record, ProPublica Nonprofit Explorer or the state registry. Fix `legal_status` and `tax_deductible` to what the record shows. The server writes `Not confirmed` for both.
3. Confirm the link is live and matches the description. Edit `what` for clarity if needed, keeping it plain.
4. Confirm there is no personal information in any field, including `credit`.
5. Check the political label in `partisanship` against the group's own words and a source. Add the source to `sources`.
6. Set `verification` to `confirmed` (an official page or record was read), `indexed` (dated reports or a secondary source) or `unverified`, and set `date_verified` to today.
7. Set `"status": "accepted"` and merge. To decline, close the pull request without merging, or set `"status": "rejected"`.

The site shows accepted records with a "Suggested by the community" tag and the credit name, if one was given.
