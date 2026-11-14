# Block check: id="aipac-fara" (money / FARA items). Checked 2026-11-14

Method: WebFetch/WebSearch only. OpenSecrets and politico.com are blocked in this environment. api.open.fec.gov is robots-blocked. FEC committee pages on www.fec.gov opened (one at a time; parallel fetches were rate-limited).

## 1. UDP 2024 independent expenditures, "$34.8M to $41.4M by outlet"
Block wording: "For 2024, UDP's independent expenditures run from $34.8 million to $41.4 million depending on the outlet; for 2026 the range is wider because the reports have different cutoff dates."
VERDICT: PARTLY
- FEC (own figure), opened https://www.fec.gov/data/committee/C00799031/?cycle=2024 : 2023-24 independent expenditures $37,859,810.12; total disbursements $61,373,652.54; coverage 1/1/2023-12/31/2024. This falls inside the block's range.
- FactCheck.org, opened https://www.factcheck.org/2026/08/united-democracy-project-3/ (posted Aug 7, 2026): "2024 Spending: $61.4 million" total; about $34.8M of that was independent expenditures promoting/opposing Democratic House candidates only. So $34.8M is a subset (Democratic House candidates), not UDP's total IE. The $61.4M matches the FEC disbursement total.
- The Intercept, opened https://theintercept.com/2026/10/29/aipac-israel-midterms-spending-elections-congress/ : UDP spent $41.4M in the 2024 cycle (AIPAC directly $53.7M); $3.5M routed via other groups. 2026: AIPAC $53.3M, UDP $66.7M, $13.1M via other committees.
- Other: ProPublica Itemizer (https://projects.propublica.org/itemizer/committee/C00799031/2024) shows $31,434,510 IE / $54,880,548 spent for 2024 (appears stale/partial; page header says through Aug 3, 2023). FactCheck 2024 piece (https://www.factcheck.org/2024/09/united-democracy-project-2/, Sept 26, 2024) gave $35.6M IE as of Sept 22 per OpenSecrets.
- 2026 FEC: https://www.fec.gov/data/committee/C00799031/?cycle=2026 : IE $53,603,927.44 (IE section coverage only to 8/31/2026, excludes 24/48-hour reports); disbursements $85,057,423.26 through 10/14/2026. FactCheck: >$27.9M IE as of June 30. Intercept: $66.7M. The "wider range" statement holds.
Correction wording: "For 2024, the FEC's figure for UDP independent expenditures is $37.9 million (total disbursements $61.4 million). Outlets differ: FactCheck.org's $34.8 million counts only spending on Democratic House races; The Intercept reports $41.4 million."

## 2. Largest country-focused election spender; no other country/diaspora committee came near
Block wording: "the largest country-focused election spender in the Federal Election Commission data we read, and no other country- or diaspora-focused committee outside the pro-Israel space came near it."
VERDICT: CONFIRMED for the committees I could open (but "largest in all FEC data" cannot be proven from a handful of committees; the block's "we read" hedge covers this).
FEC pages opened (2023-24 unless stated), independent expenditures / disbursements:
- Pakistani American Public Affairs Committee (Pak-PAC) C00238204: IE $0 / disb $277,321.60
- Hindu American Political Action Committee C00536615: IE $0 / disb $104,904.37
- Turkish American Coalition PAC (TAC-PAC) C00530865: IE $0 / disb $30,328.10
- Iranian American PAC (PAAIA) C00382028: IE $0 / disb $94,537.18
- USINPAC C00381699: IE $0 / disb $23,316.34
- Pak American Coalition Super PAC C00826669 (ProPublica Itemizer, FEC page errored): IE $0 / spent $63,483
- The Impact Fund C00876391 (Indian American-linked; 4/1-12/31/2024; spending is on US candidates, no foreign country named): IE $2,844,506.12 / disb $3,160,688.38. Largest non-Israel diaspora-type figure found; about 7.5% of UDP's FEC IE.
- American Priorities C00932723 (pro-Palestinian, formed Jan 2026, 2026 cycle through 10/14/2026): IE $7,892,205.80 / disb $7,987,548.55. About 15% of UDP's 2026 IE ($53.6M). Note: it is a counter-AIPAC committee, so arguably "inside the Israel-Palestine space", and the block does not mention it. Suggest adding it by name if the block lists comparators.
Not opened: FEC page for C00840454 (Pakistani American Republican PAC) errored; no other US-Israel committee besides UDP was checked.

## 3. OpenSecrets FARA ranking
Block wording: "OpenSecrets' figures for 2016 to 2025 put Israel about tenth of 185 countries, behind China, Japan, Saudi Arabia and Qatar."
VERDICT: PARTLY (tenth CONFIRMED via secondary; "185" NOT confirmed; list of "behind" countries incomplete)
- opensecrets.org blocked (SITE_BLOCKED) for all pages tried. Best accessible: https://everything-pr.com/foreign-influence-pr-study-2026 , which cites OpenSecrets Foreign Lobby Watch, "totals since 2016 through 2025, retrieved October 8, 2026". Cumulative 2016-2025: 1 China $562.7M; 2 Japan $504.1M; 3 Liberia $433.0M; 4 Saudi Arabia $421.9M; 5 Marshall Islands $382.0M; 6 South Korea $363.2M; 7 Bahamas $293.2M; 8 UAE $269.5M; 9 Qatar $269.3M; 10 Israel $214.6M.
- Count of 185 countries not found in any source I opened.
- Washington Examiner via https://gazette.com/?p=1047519 : in 2024 Saudi Arabia, Japan, China and South Korea outspent Israel; consistent.
Correction wording: "OpenSecrets' cumulative FARA figures for 2016 to 2025 (as reproduced by Everything PR) put Israel tenth, at about $214.6 million, behind China, Japan, Liberia, Saudi Arabia, the Marshall Islands, South Korea, the Bahamas, the United Arab Emirates and Qatar." Drop "of 185 countries" unless OpenSecrets itself is opened.

## 4. POLITICO / Howard Center travel database
Block wording: "Israel was the top destination for privately sponsored congressional trips, and about 75% of those were sponsored by AIPAC's affiliated foundation. REPORTED."
VERDICT: PARTLY (substance confirmed; wording slightly off; Yahoo/POLITICO original not opened)
- Could not open the Yahoo/POLITICO text (politico.com blocked; yahoo URL not found in search). Opened Howard Center/CNS Maryland partner piece https://cnsmaryland.org/2024/11/01/members-of-congress-have-taken-hundreds-of-aipac-funded-trips-to-israel-in-the-past-decade and Al-Quds repost https://alquds.com/en/posts/140212 (dated Oct 31, 2024, says POLITICO investigation ran the previous Wednesday, i.e. Oct 30). Both say Israel got over a quarter of roughly 4,100 privately sponsored foreign trips since 2012, and about 75% of the Israel trips were sponsored by the American Israel Education Foundation (AIEF), AIPAC's affiliate.
- Wording fix: the 75% is of the trips to Israel, not of "privately sponsored trips" generally. The block's "about 75% of those" refers to Israel trips, which is right; keep "of the trips to Israel". The database covers House trips only (about 17,000 House trips over a decade), which the block omits.
Correction wording: "Among privately sponsored foreign trips by House members and staff since 2012, Israel was the top destination (over a quarter of about 4,100), and about 75% of the Israel trips were sponsored by AIEF." 

## 5. Clock Tower X FARA 7649
Block wording: "Contracts through the German agency Havas, such as Clock Tower X (FARA registration 7649), are on the public FARA register." (The block does not itself state a date or principal; the brief's items are checked against the register anyway.)
VERDICT: CONFIRMED
- https://efile.fara.gov/api/v1/RegDocs/html/7649 : registrant Clock Tower X LLC; reg. no. 7649; foreign principal "State of Israel, via Havas Media Germany GmbH"; country Israel. The page did not show a registration date.
- Registration statement opened https://efile.fara.gov/docs/7649-Registration-Statement-20250918-1.pdf : signed and dated 09/18/2025 by Bradley Parscale; principals listed as State of Israel (Jerusalem) and HAVAS Media Network (Frankfurt). Date Sept 18, 2025 CONFIRMED.
- Caveats: the original statement names "HAVAS Media Network", not "Havas Media Germany GmbH"; the GmbH naming comes from later filings and the register's summary. PowerBase (secondary, https://powerbase.info/index.php/Clock_Tower_X) says the separate State of Israel principal listing was called an error and terminated Oct 13, 2025, and reports a Havas Media Germany contract dated Sept 8, 2025; I did not verify the termination in a primary document. A later Exhibit AB (https://efile.fara.gov/docs/7649-Exhibit-AB-20260607-4.pdf) was received 06/07/2026; this is an amendment, not the registration date. Do not confuse the two.
- Odd data point: the register's HTML page lists document stamps through Nov 26, 2026, after today's date (Nov 14, 2026). Possibly a mis-keyed date; not relevant to the block.
- Mediaite (https://www.mediaite.com/politics/former-trump-campaign-manager-registers-as-foreign-agent-for-israel/) describes the principal as Israel's Ministry of Foreign Affairs.

## 6. "No source links Israeli-government influence work (STOIC, Havas-routed contracts) to AIPAC"
Block wording: "no source we read links it to AIPAC."
VERDICT: CONFIRMED as a statement of what I found; no direct link to contracts found. Related, non-contract reporting exists that the block does not mention.
- No link found in: Quincy Institute, The Eighth Front, https://quincyinst.org/research/the-eighth-front-inside-israels-1-billion-influence-campaign/ (July 24, 2026; places AIPAC outside the government-directed campaigns); Al-Quds/Quincy summary (https://alquds.com/en/posts/251281-israel-redraws-influence-strategy-in-the-united-states-from-aipac-to-lobbying, July 25, 2026; says Israel is moving away from AIPAC-style lobbying toward foreign agents); Shomrim (Aug 30, 2026; no AIPAC mention); NPR on STOIC (https://www.npr.org/2024/07/09/nx-s1-4994027/israel-us-online-influence-campaign; no AIPAC mention; reports Diaspora Affairs Ministry paid STOIC $2M per NYT); Yahoo/Forward-type church-outreach story (no AIPAC mention).
- Adjacent reporting a reader might cite as "contrary": DAWN's May 20, 2026 dataset of 3,000+ AIPAC staff careers, claiming a "revolving door" with U.S. and Israeli government bodies (via Ground News https://ground.news/article/us-rights-group-maps-aipacs-ties-to-us-israeli-governments and Al Jazeera https://www.aljazeera.com/news/2026/5/20/as-aipac-becomes-toxic-it-is-trying-to-conceal-spending-in-us-elections: 66 former AIPAC staff in U.S. government). These are personnel ties, not contracts or direction. Al Jazeera also reports UDP money passing through pop-up PACs (Elect Chicago Women $4M+). Not evidence of Israeli-government direction.
- Suggest the block add: "A May 2026 DAWN analysis argues AIPAC staff have a 'revolving door' with U.S. and Israeli government bodies; that is about personnel, not contracts or control." Optional.

## Discrepancies summary
1. UDP 2024 IE: FEC figure is $37.86M (disbursements $61.37M). The block's $34.8M low end is FactCheck's Democratic-House-only subset, not a comparable total; $41.4M is The Intercept's figure.
2. OpenSecrets: could not open (blocked). Secondary source confirms Israel 10th at $214.6M but lists nine countries ahead, not four; "185 countries" unverified.
3. POLITICO via Yahoo not opened; substance confirmed via Howard Center/CNS and Al-Quds. The 75% is of Israel trips, and the database covers House trips.
4. American Priorities (C00932723) had $7.89M IE in 2026 (FEC), a counter-AIPAC committee; the "outside the pro-Israel space" wording leaves it unaddressed.
5. Clock Tower X: date Sept 18, 2025 confirmed; original statement lists "HAVAS Media Network" and a separate "State of Israel" principal; "Havas Media Germany GmbH" is from later filings. The block's "German agency Havas" is acceptable but Havas is a France-based group per Quincy.
6. Item 6 stands; no AIPAC-contract link found.
