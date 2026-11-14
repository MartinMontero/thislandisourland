# "White House for Sale" (House Oversight Democratic staff, Jan 4 2024): claim check against the primary document

## Method and access (read first)
- Primary document READ: the report PDF (156 pp.), https://oversightdemocrats.house.gov/imo/media/doc/2024-01-04.COA%20DEMS%20-%20Mazars%20Report.pdf , via the WebFetch text-extraction tool (498,359 characters; I read chunks 0-100k, 100-200k, 200-300k, 300-400k, 400k-end). WebFetch returns a model-written extract, not raw text. Page numbers and quotes below are as the extractor reported them; treat page numbers as approximate (+/- 1-2) and quotes as near-verbatim, worth a spot check in the PDF before publication.
- Primary press release READ: https://oversightdemocrats.house.gov/news/press-releases/oversight-democrats-release-report-proving-trump-pocketed-millions-from-at-least
- Secondary READ: Axios (2024-01-04), CBS News (2024-01-04), Roll Call, CBS News Nov 2022 (amp), CNBC Nov 14 2022, bespacific.com post.
- NOT opened: docs.house.gov Judiciary copy (the guessed URL returned "Not Found"; the real folder ID was not found); the other oversightdemocrats PDF paths (HTTP 403 via curl proxy); web.archive.org (blocked by tool); the Nov 2022 Oversight Democrats release itself (only its press coverage was read); NYT/WaPo originals. No raw-bytes PDF was obtained (curl to house.gov hosts was blocked by the proxy), so no pdftotext check was possible.
- Not used: anything in the "Saudi Trump financial ties check" folder or any research report.

## Claim 1: January 4, 2024 minority report, at least $7.8M, at least 20 governments, four properties, roughly two years, not a committee finding

### Takeaway
CONFIRMED (primary read). The wording "roughly two years of the presidency" is supported; the report itself says the records cover "just two years" of the term. The report is a staff report by the Democratic minority, not a finding of the full committee.

### Cited Findings
- Total and count: "at a minimum, $7.8 million in foreign payments from at least 20 countries during his presidency" (report p. 9) — [report PDF](https://oversightdemocrats.house.gov/imo/media/doc/2024-01-04.COA%20DEMS%20-%20Mazars%20Report.pdf)
- Period and scope: records cover "just two years of his presidency from just 20 of the more than 190 nations... through just four of his more than 500 businesses" (p. 3) — same PDF
- The four properties: Trump International Hotel Washington DC, Trump International Hotel Las Vegas, Trump Tower (Fifth Avenue), Trump World Tower (p. 9) — same PDF; press release says the same: "at least $7.8 million from 20 governments"... "four of his more than 500 entities" — [press release](https://oversightdemocrats.house.gov/news/press-releases/oversight-democrats-release-report-proving-trump-pocketed-millions-from-at-least)
- Authorship: a staff report of the Committee on Oversight and Accountability prepared by Democratic staff under Ranking Member Jamie Raskin — same PDF (front matter). The press release is on the Oversight Democrats site.
- The report itself says the total is "likely only a small fraction" (pp. 3, 9, 11); conclusion (p. 156) "likely but a small fraction". Cause given: committee records came from the Mazars production, which the new Republican chairman (Comer) halted (press release).
- Secondary: Axios "at least $7.8 million", four properties; CBS says 20 countries, four businesses — [Axios](https://www.axios.com/2024/01/04/report-trump-received-at-least-78m-in-foreign-payments-during-presidency), [CBS](https://www.cbsnews.com/news/trump-foreign-payments-emoluments-clause-house-democrats)

### Inferences
- "At least 20 foreign governments" is a slight softening/rounding issue: the report's chart lists 21 entries, one being the "Self-Declared Turkish Republic of Northern Cyprus", so "at least 20" is the report's own wording and is fine. The report says "countries"; the press release says "governments"; the report body also says "governments or government-owned entities".
- The report was issued by the minority; the block's "not a finding of the committee" is accurate and fair.
- Minor: the block says "over roughly two years". The report says "just two years of his presidency" (not that the four-year term is covered in full for each property; periods vary by property, e.g., ICBC rent Feb 2017 to Oct 2019, Saudi Trump World Tower projected over four years).

### Gaps
- docs.house.gov hearing copy not opened. Not needed given the primary PDF was read.

## Claim 2: About 71% ($5,572,548) is China, mostly an estimate of ICBC rent for Trump Tower

### Takeaway
CONFIRMED on the dollar figure and ICBC estimate (primary read). The 71% is the block's own arithmetic, not the report's; it holds (about 70.7% to 71.4% depending on the denominator). Suggest saying so.

### Cited Findings
- China total $5,572,548 (chart pp. 14-15), largest of all countries; "China made the largest total payment to President Trump's private business interests" (p. 10) — report PDF; press release gives "$5,572,548" for the PRC and companies it owns or substantially controls.
- ICBC: "estimates that ICBC paid Trump Tower at least $5,357,495 between February 2017 and October 31, 2019" (p. 56; also fn. 23 p. 14: "This report estimates the total rent payments"); based on base annual rent from a debt prospectus, no variable adjustments, 33 months (fn. 178) — report PDF; press release repeats the $5,357,495 estimate and the no-variable-rent-adjustment assumption.
- ICBC share of China total: 5,357,495 / 5,572,548 = 96%, so "mostly" is accurate.
- The report does not state a percentage (extractor found none).
- Denominator: the chart prints no grand total. My sum of the 21 listed country amounts is $7,886,072. China = 70.7% of that, 71.4% of $7.8M. Both round to about 71%.

### Inferences
- The block's "71%" is derived, not quoted. Corrected wording: "About 71% (by our arithmetic from the report's table; $5,572,548) is China, mostly an estimate (at least $5,357,495) of rent paid by the state-owned Industrial and Commercial Bank of China for Trump Tower space."

### Gaps
- None material.

## Claim 3: Saudi + Qatar + UAE = $1,146,391 (about 15%); Saudi $615,422 is an estimate (Qatar $465,744, UAE $65,225)

### Takeaway
CONFIRMED (primary read) for the figures and the sum; "about 15%" is derived (14.5% of $7.886M; 14.7% of $7.8M). The Saudi figure is an estimate in the report's own words, but mostly an estimate: only $78,342 of it is a documented hotel bill. Qatar is also described as an estimate (base charges); UAE is documented ledger spending, not an estimate.

### Cited Findings
- Chart: Saudi Arabia $615,422; Qatar $465,744; UAE $65,225 (pp. 14-15) — report PDF. 615,422 + 465,744 + 65,225 = 1,146,391 (my arithmetic; matches the block).
- Saudi estimate: "this report estimates that Saudi Arabia paid at least $615,422 in prohibited emoluments" (p. 69); table header "ESTIMATED EMOLUMENTS PAID BY SAUDI ARABIA" (p. 70); assumes charges "did not change during the four years of the Trump presidency" (p. 69) — report PDF. Component: Trump World Tower floor 45, "an estimated total emolument of $537,080" (p. 40), built from a 2018 monthly base charge of $11,189 times four years; remainder $78,342 = documented hotel stay (March 7-15 2018). 615,422 - 537,080 = 78,342 (my arithmetic; ties exactly).
- Caution on the exec summary: p. 11 states "spent at least $615,422" without the word estimate; the p. 69-70 section is where it is called an estimate. A reader of only p. 11 would not see the caveat.
- Qatar: $465,744 at Trump World Tower; press release: "estimates Qatar paid $465,744 in base charges" — [press release](https://oversightdemocrats.house.gov/news/press-releases/oversight-democrats-release-report-proving-trump-pocketed-millions-from-at-least)
- UAE: $65,225, four bookings at the DC hotel, October 2017 to May 2018 (p. 94/99) — report PDF; press release: ledgers record "$65,225".
- Secondary agreement: CBS: Saudi "more than $615,000", Qatar $465,744 — [CBS](https://www.cbsnews.com/news/trump-foreign-payments-emoluments-clause-house-democrats); Axios: $615,000 / $466,000 / $65,000.

### Inferences
- Block's "the Saudi figure is itself an estimate" is accurate but could mislead in the other direction; better: "Most of the Saudi figure ($537,080 of $615,422) is an estimate of Trump World Tower charges; Qatar's is also an estimate of base charges."

### Gaps
- Page numbers for the UAE total vary in extractor output (p. 94 vs 99); not material.

## Claim 4: The report does not say UAE stays caused a policy outcome; for China it says only that the payments created conflicts of interest

### Takeaway
UAE half: CONFIRMED with a caveat (primary read; the report implies and frames but does not state causation). China half: OVERSTATED; the report says more than "conflicts of interest" and the phrase attached to China is not where the block puts it. Recommend rewording.

### Cited Findings
- UAE: the report links timing and lobbying but hedges. Quoted framing: "Over a seven-month period in 2017 and 2018, while the United Arab Emirates (U.A.E.) lobbied Trump Administration officials to support a blockade of Qatar," the UAE "spent tens of thousands of dollars at the Trump International Hotel" (p. 11); "both the U.A.E. and Saudi delegations were staying at the Trump International Hotel... the day that Secretary of State Tillerson was fired" (p. 99); "It is unclear whether Mr. Broidy stayed at the hotel as part of lobbying efforts" (p. 100); and the report asks, rather than asserts, "the persistent question of whether he conducted American foreign policy in the Middle East to further his business interests" (p. 100-101). No sentence found stating a UAE stay caused any decision — report PDF. The exec summary frames payments as occurring "while these governments were promoting specific foreign policy goals" but "does not claim that the payments caused any specific decision" (p. 9; extractor's characterization).
- China: the report does more than say "conflicts of interest": "In 2017, President Trump did not impose sanctions on ICBC—his well-paying tenant in Trump Tower" (p. 10); quotes Trump "I love China! The biggest bank in the world is from China." (p. 10); and says "President Trump repeatedly placed his personal financial interest and the interests of foreign wealth and power above the public interest" (p. 10), and speaks of "precisely the split loyalty between foreign power and the American people" and "conflicts between the President's personal financial interests and the public interest" (p. 13) — report PDF.
- The exact phrase "created conflicts of interest" appears at p. 46 and "raised potential conflicts of interest" at p. 60, in the section on state-linked entities (e.g., CEFC), not as the report's summary of China/ICBC. The extractor found the phrase "conflicts of interest" absent from the pp. 9-13 China passages.

### Inferences
- The sanctions sentence (juxtaposing ICBC rent with Trump not sanctioning ICBC) is a pointed implication of a policy link, though it does not use causal language. The block's "says only that" is too strong.
- Proposed wording: "The Democratic report does not state that UAE hotel stays caused any policy outcome; it notes the stays occurred while the UAE lobbied on Qatar and asks whether Trump's business ties shaped Middle East policy. For China it notes that Trump did not sanction ICBC, his Trump Tower tenant, and describes the payments as creating conflicts between his financial interests and the public interest; it does not say the rent caused that decision."

### Gaps
- Quotes come via a summarizing extractor; verify exact phrasing at p. 10 and p. 13 in the PDF before quoting.

## Claim 5: In March 2018, most documented Saudi hotel spending came before the Crown Prince's March 20 visit

### Takeaway
CONFIRMED-SECONDARY plus primary on the dates, but "most" is imprecise: the report documents exactly one Saudi March 2018 hotel bill, and it came wholly before the visit. The only Saudi spending after the visit (the Crown Prince's entourage in New York) is not documented in the totals.

### Cited Findings
- Dates: Saudi government booked rooms at the DC Trump hotel "from March 7 to March 15, 2018"; "Royal Saudi Embassy Ministerial Visit" $78,342 (pp. 77-78) — report PDF. The report's own timing sentence: booked "just before M.B.S.'s second visit to the White House to meet with President Trump on March 20, 2018" (p. 77, per extractor).
- Visit: "On March 20, 2018, then-President Trump again welcomed M.B.S. to the White House." (p. 73) — report PDF.
- Amount discrepancy: the committee's Nov 2022 letter cited $85,961 for this stay; the 2024 report uses $78,342 after removing $9,619 in "Mission tax Exempt" taxes (fn. 309) — report PDF; [CBS Nov 2022](https://www.cbsnews.com/amp/news/trump-hotel-dc-foreign-countries-payments-mazars-usa-house-oversight) and [CNBC](https://www.cnbc.com/2022/11/14/trump-dc-hotel-receipts-reveal-10500-a-night-rooms-for-foreign-officials-seeking-to-influence-us-policy.html) both cite "$85,961 ... one-week stay in March 2018".
- After the visit: the Crown Prince's entourage reportedly stayed at the Trump International Hotel in New York in late March 2018, boosting hotel revenue by 13% for the quarter (Washington Post cited by the report); the committee received no records for this stay and excluded it (p. 79) — report PDF.
- The report does not say the March payment caused or influenced a policy decision (p. 77-80).

### Inferences
- The block's claim is right in effect (the one documented stay preceded the visit). Corrected wording: "The only documented Saudi hotel bill in March 2018 ($78,342, March 7-15) came before the Crown Prince's March 20 visit; a reported later New York stay by his entourage is not documented in the report's totals." If the block keeps $85,961, note that it includes tax later removed.
- Check the block's arms-sale dates (April 5; March 22-23) separately; they are not in this report.

### Gaps
- Whether other Saudi-linked spending occurred in March 2018 outside the committee's records cannot be determined from this report.

## Claim 6: Report/committee context: "four properties" and the period covered

### Takeaway
CONFIRMED (primary read). Four properties named; period is "just two years" of the presidency within the records produced; the totals use projected four-year charges for some items.

### Cited Findings
- Four properties: DC hotel, Las Vegas hotel, Trump Tower, Trump World Tower (p. 9) — report PDF; press release agrees.
- Period: "just two years of his presidency" (p. 3) — report PDF; some line items extend the whole term by assumption (Saudi/Qatar TWT charges projected over four years, p. 69; ICBC rent Feb 2017 to Oct 31 2019, p. 56).
- Committee context: staff report of the Committee on Oversight and Accountability, Democratic staff, Ranking Member Raskin; Chairman Comer halted further document production (press release).
- Roll Call and CBS describe it consistently, e.g., CBS: Chinese bank's Trump Tower rent ran from February 2017 to October 2019.

### Inferences
- "Roughly two years" is slightly loose because the estimated components assume four years of constant charges; the block's wording is acceptable but "two years of records, with some figures projected across the term" is more exact.

### Gaps
- None.

## Verdict table
| # | Verdict | Fix needed |
|---|---|---|
| 1 | CONFIRMED (primary) | None. |
| 2 | CONFIRMED (primary) | Say 71% is derived arithmetic; ICBC is "at least $5,357,495" estimate, ~96% of China total. |
| 3 | CONFIRMED (primary) | "About 15%" is derived; add that Qatar is also an estimate and Saudi is mostly an estimate ($537,080 of $615,422). |
| 4 | UAE half CONFIRMED with caveat; China half OVERSTATED | Reword per above; "conflicts of interest" phrasing is not the report's China summary; the report also points to the ICBC sanctions decision. |
| 5 | CONFIRMED on dates (primary); "most" imprecise | State it as the single documented $78,342 stay (March 7-15) before the March 20 visit. Nov 2022 figure was $85,961. |
| 6 | CONFIRMED (primary) | Optional: "two years of records". |
