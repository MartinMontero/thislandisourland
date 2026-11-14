# Election and lobbying spending, 2022–2026, by U.S. country-focused and diaspora lobbies other than AIPAC (as of November 13, 2026)

Method and access notes (read first):
- FEC committee pages (fec.gov/data/committee/...) were reachable with WebFetch and are the main source here. They are rate-limited: several fetched at once returned "rate limited," and one at a time worked. Figures are the FEC two-year totals shown on each page. "Receipts" means money raised; "disbursements" means all money spent (contributions, ads, overhead, transfers). "IE" means independent expenditures, i.e. outside spending such as ads.
- Raw FEC API calls (api.open.fec.gov) from the shell were blocked by the session's network proxy (HTTP 403). NOT VERIFIED via API.
- The Senate lobbying database API (lda.senate.gov) refused the fetch (robots_disallowed). ProPublica's lobbying database ("Represent") says it is no longer available. **As a result, most annual lobbying figures below are NOT VERIFIED.** OpenSecrets was not attempted after the earlier failure.
- ProPublica's FEC Itemizer summaries sometimes disagreed with the FEC's own pages. Examples: U.S.-Cuba Democracy PAC 2024 shows $0 raised on Itemizer and $60,000 on FEC; J Street PAC 2024 shows $10.98M on Itemizer and $14.58M on FEC; DMFI PAC 2024 shows $4.80M on Itemizer and $6.75M on FEC. **Where both exist, the FEC page figure is used.** Itemizer-only figures are labelled REPORTED, not CONFIRMED.
- Labels used: CONFIRMED = read directly from an FEC committee page. REPORTED = a press or organisation figure not checked against FEC. CONTESTED = sources disagree. NOT VERIFIED = not found or not reachable.
- FARA = Foreign Agents Registration Act. No FARA registration was found for any domestic organisation listed. A "not found" here is not the same as confirmed non-registration, because the FARA database (efile.fara.gov) was not searched directly. Each FARA status is therefore NOT VERIFIED unless stated otherwise.

AIPAC benchmark, for scale (REPORTED):
- AIPAC and United Democracy Project (UDP) spent $95.1M in the 2024 cycle and $44M in 2022, per FEC filings as reported by JNS (Jonathan D. Salant, Feb. 6, 2025) — [JNS](https://www.jns.org/u.s.-news/campaign-spending-at-pro-israel-political-action-committees-up-in-2024)
- AIPAC plus UDP had spent $104.3M in the 2026 cycle as of Aug. 3, 2026. That total excludes DMFI and the pop-up super PACs seeded by UDP or DMFI — [Sludge, David Moore, Aug. 3, 2026](https://readsludge.com/2026/08/03/aipac-tops-100-million-in-election-spending-for-second-straight-cycle/)
- The Intercept (Akela Lacy, Oct. 29, 2026) reports, for 2026: AIPAC direct contributions of $53.3M, UDP independent expenditures of $66.7M, and $13.1M in UDP pass-through money to other committees. The article also gives a separate $53.6M figure for UDP spending "directly on races" and does not reconcile the two — [The Intercept](https://theintercept.com/2026/10/29/aipac-israel-midterms-spending-elections-congress/)

## Q1. Armenian lobby: ANCA and ANCA PAC

### Takeaway
No active federal PAC tied to ANCA or the wider Armenian lobby was found. Both Armenian PACs located on FEC are terminated, and ANCA's election activity found here takes the form of endorsements. Armenian-lobby election spending in 2022–2026 is effectively zero at the federal PAC level, as far as could be found.

### Cited Findings
- "Armenian National Committee PAC" (C00146969) is listed by FEC as an "administratively terminated" trade association PAC, registered Nov. 19, 1981. Its last summary covers 2011–2012: receipts $14,400 and disbursements $14,987.42. CONFIRMED — [FEC C00146969](https://www.fec.gov/data/committee/C00146969/?cycle=2024)
- "Armenian American PAC (ArmenPAC)" (C00352054) is listed as a "Terminated PAC," registered Jan. 3, 2000. Its last data covers 2011: receipts $0 and disbursements $1,807.32. CONFIRMED — [FEC C00352054](https://www.fec.gov/data/committee/C00352054/)
- In 2024, ANCA published candidate endorsements and declined to endorse either Harris or Trump. These are endorsement activities, not PAC spending — [ANCA endorsements 2024](https://anca.org/anca-congressional-endorsements-2024/); [ANCA on presidential non-endorsement](https://anca.org/press-release/hamparian-ancas-harris-trump-non-endorsement-in-the-2024-presidential-elections-explained/)

### Inferences
- Any Armenian-American giving in these cycles most likely went through individual donations or candidate fundraisers rather than a dedicated PAC. This is inferred, not verified.

### Gaps
- ANCA's annual federal lobbying spending for 2022–2026: NOT VERIFIED (lobbying database unreachable).
- Whether ANCA's regional bodies (for example ANCA Western Region) run state-level PACs: not researched.
- FARA status: NOT VERIFIED. No FARA registration was found in sources read.

## Q2. Greek lobby: American Hellenic Institute and Hellenic American Leadership Council

### Takeaway
Every Greek-American federal PAC found on FEC is terminated, and the last activity found dates from 2004 or 2013. No active Greek-lobby PAC or super PAC was found for 2022–2026.

### Cited Findings
- Hellenic American Political Action Committee (C00240051) is "Administratively terminated," registered Dec. 14, 1989. Its last displayed period is 2003–2004, with $0 raised and $0 spent. CONFIRMED — [FEC C00240051](https://www.fec.gov/data/committee/C00240051/?cycle=2024)
- AHEPA PAC (C00490151) is "Terminated." Its last displayed period is 2013, with receipts of $500 and disbursements of $2,659.91. CONFIRMED — [FEC C00490151](https://www.fec.gov/data/committee/C00490151/?cycle=2024)
- Search results also listed a "Greek American Political Action Committee (GreekPAC)" (C00408393) and "Dynamis A Hellenic Association Federal PAC" (C00185637). Their 2022–2026 status was not checked — [ProPublica Itemizer GreekPAC 2006](https://projects.propublica.org/itemizer/committee/C00408393/2006)

### Inferences
- No PAC affiliated with the American Hellenic Institute (AHI) or the Hellenic American Leadership Council (HALC) surfaced in searches. Both appear to operate as advocacy groups without an active federal PAC. This is inferred.

### Gaps
- Current status of GreekPAC (C00408393) and Dynamis PAC: not checked.
- Lobbying spending by AHI and HALC: NOT VERIFIED.
- FARA status: NOT VERIFIED.

## Q3. Cuban-American lobby: Cuban American National Foundation and U.S.-Cuba Democracy PAC

### Takeaway
U.S.-Cuba Democracy PAC is active but small. It raised $63,000 in 2022 and $60,000 in 2024, and nothing in 2026 through Oct. 14. It made no independent expenditures in any cycle.

### Cited Findings
- U.S.-Cuba Democracy PAC (C00387720) is an active quarterly PAC, registered June 18, 2003. CONFIRMED — [FEC C00387720 2026](https://www.fec.gov/data/committee/C00387720/?cycle=2026)
  - 2021–22: raised $63,000; spent $61,283.90, of which $60,600 went to other committees; IE $0. CONFIRMED — [FEC 2022](https://www.fec.gov/data/committee/C00387720/?cycle=2022)
  - 2023–24: raised $60,000; spent $21,650, of which $15,000 went to other committees; IE $0; cash on hand at end of 2024 $96,593. CONFIRMED — [FEC 2024](https://www.fec.gov/data/committee/C00387720/?cycle=2024)
  - 2025–26 through Oct. 14, 2026: raised $0; spent $195; cash on hand $96,398. CONFIRMED — [FEC 2026](https://www.fec.gov/data/committee/C00387720/?cycle=2026)
  - CONTESTED, data-quality note: ProPublica Itemizer shows $0 raised and $180 spent for 2024, which conflicts with the FEC page — [Itemizer 2024](https://projects.propublica.org/itemizer/committee/C00387720/2024)
- A Quincy Institute piece (William LeoGrande, Oct. 29, 2024) calls the Cuba lobby "well organized and amply funded" but gives no dollar figures — [Responsible Statecraft](https://responsiblestatecraft.org/cuba-lobby-united-states/)

### Inferences
- Cuban-American political influence in this period appears to run mainly through elected Cuban-American members of Congress and individual donors, not through PAC dollars. This is inferred.

### Gaps
- Lobbying figures for CANF and Cuba Democracy Advocates: NOT VERIFIED. A ProPublica lobbying page exists ([link](https://projects.propublica.org/represent/lobbying/r/300972715)), but the service has been discontinued.
- No CANF-affiliated PAC was identified.
- FARA status: NOT VERIFIED.

## Q4. Indian-American lobby: USINPAC, Hindu American Foundation, and Indian American Impact / The Impact Fund

### Takeaway
USINPAC and the Hindu American PAC are now small, with tens of thousands of dollars per cycle. The one sizeable committee is The Impact Fund, a hybrid PAC that also runs a super-PAC account (C00876391). It raised $3.38M and made $2.84M in independent expenditures in 2024, and raised $2.0M and made $1.43M in IEs in 2026 through Oct. 14. That is about 3% of AIPAC/UDP's scale. It is also an Indian-American identity and voter-mobilisation group, not a lobby focused on India's foreign policy.

### Cited Findings
- USINPAC (C00381699), active, 2023–24: raised $18,135; spent $23,316.34; IE $0; cash on hand at end of 2024 $412.66. CONFIRMED — [FEC C00381699 2024](https://www.fec.gov/data/committee/C00381699/?cycle=2024)
- Hindu American Political Action Committee (C00536615), active, 2023–24: raised $72,290.73; spent $104,904.37, of which $95,000 went to other committees; IE $0. CONFIRMED — [FEC C00536615](https://www.fec.gov/data/committee/C00536615/?cycle=2024). Its affiliation with the Hindu American Foundation was NOT VERIFIED. HAF is a 501(c)(3) charity.
- Indian American Impact Fund (C00674127), a monthly PAC: in 2023–24 it raised $218,583.80 and spent $370,986.52; IE $0. CONFIRMED — [FEC C00674127 2024](https://www.fec.gov/data/committee/C00674127/?cycle=2024)
- The Impact Fund (C00876391), a hybrid PAC with a non-contribution (super-PAC) account, registered Apr. 17, 2024. CONFIRMED:
  - 2024 (Apr.–Dec. 2024): raised $3,379,109.96, of which "other receipts" were $3.26M; spent $3,160,688.38; IE $2,844,506.12 — [FEC C00876391 2024](https://www.fec.gov/data/committee/C00876391/?cycle=2024)
  - 2026 (through Oct. 14, 2026): raised $2,000,562.08; spent $1,873,768.87; IE $1,431,458.58 — [FEC C00876391 2026](https://www.fec.gov/data/committee/C00876391/?cycle=2026)
- An IANS wire story (Oct. 19, 2026) reports the Impact Fund raised about $1.92M this cycle. Its largest gift was $500,000 from Sumir Chadha, and it reported no general-election IEs. REPORTED, and roughly consistent with FEC — [Morung Express/IANS](https://morungexpress.com/indian-american-big-money-runs-3-to-1-republican-as-community-votes-democratic)
- The Impact Fund announced a $3.5M ad campaign with Future Forward in 2024 to reach South Asian and AAPI voters for Harris. REPORTED. The total is the campaign size, and part of it may be Future Forward's money — [PR Newswire](https://prnewswire.com/news-releases/the-impact-fund-with-future-forward-launches-largest-ever-3-5m-ad-campaign-to-reach-south-asian-and-aapi-voters-for-kamala-harris-302273592.html)

### Inferences
- The Impact Fund is the only non-Israel diaspora committee found with IEs in the millions. Even so, it stays well under the $5M-per-cycle threshold in both 2024 and 2026.

### Gaps
- 2022 figures for these committees: not fetched.
- Lobbying spending by HAF and USINPAC: NOT VERIFIED.
- FARA status: NOT VERIFIED. Al Jazeera (Oct. 15, 2024) covers FARA-registered lobbyists working for India's government, which is a separate matter from the diaspora groups — [Al Jazeera](https://www.aljazeera.com/features/2024/10/15/who-is-lobbying-for-indias-modi-government-on-capitol-hill)

## Q5. Taiwanese-American lobby: Formosan Association for Public Affairs (FAPA)

### Takeaway
No FAPA-affiliated federal PAC was found, and no FAPA lobbying dollar figures could be verified.

### Cited Findings
- FAPA's own site and its Wikipedia entry describe it as a Taiwanese-American advocacy group. Searches returned no FEC committee for it — [FAPA](https://fapa.org/); [Wikipedia](https://en.Wikipedia.com/wiki/Formosan_Association_for_Public_Affairs)

### Gaps
- FAPA's annual lobbying (LD-2) totals: NOT VERIFIED (lobbying database unreachable).
- FAPA PAC existence: NOT VERIFIED. None found in searches.
- FARA status: NOT VERIFIED.

## Q6. Ukrainian-American lobby: Ukrainian Congress Committee of America (UCCA)

### Takeaway
No UCCA-affiliated PAC was found. The only Ukrainian-American federal PAC located, American Ukraine PAC (registered 2024), raised $76,654.71 in the 2026 cycle through Sept. 30, 2026, and made no independent expenditures.

### Cited Findings
- American Ukraine PAC (C00872325), active, registered Mar. 6, 2024. For Jan. 1, 2025–Sept. 30, 2026: raised $76,654.71; spent $47,918.62, of which $43,050 went to other committees; IE $0. CONFIRMED — [FEC C00872325](https://www.fec.gov/data/committee/C00872325/?cycle=2026)
- UCCA is described as an umbrella organisation of Ukrainian Americans. No PAC is noted — [Wikipedia](https://www.Wikipedia.org/wiki/Ukrainian_Congress_Committee_of_America)

### Gaps
- American Ukraine PAC 2024 figures: not fetched. Its affiliation with UCCA: NOT VERIFIED.
- UCCA lobbying spending: NOT VERIFIED.
- FARA status: NOT VERIFIED.

## Q7. Iranian-American lobby: NIAC and NIAC Action

### Takeaway
NIAC Action's PAC is essentially dormant. A separate Iranian American PAC raised under $100K in 2024. No Iranian-American super-PAC spending was found.

### Cited Findings
- "NIAC Action PAC" (C00710764): for the 2024 cycle, Itemizer shows receipts of $130 and disbursements of $153, with totals current only through June 30, 2023. REPORTED, and stale — [ProPublica Itemizer](https://projects.propublica.org/itemizer/committee/C00710764/2024)
- Iranian American Political Action Committee – Public Affairs Alliance of Iranian Americans (C00382028), active, 2023–24: raised $94,900.58; spent $94,537.18, of which $74,500 went to other committees; IE $0. CONFIRMED — [FEC C00382028](https://www.fec.gov/data/committee/C00382028/?cycle=2024). This is IAPAC, not NIAC.
- NIAC Action PAC solicits donations through ActBlue. Its site describes it as the "political home" of champions of the Iranian-American community — [NIAC Action PAC](https://niacactionpac.org)

### Gaps
- NIAC Action's federal lobbying totals: NOT VERIFIED. Search results returned individual LD-2 filing pages (for example [lda.senate.gov filing](https://lda.senate.gov/filings/public/filing/eb51612a-f04e-43fd-af2a-fe50ab9c565b/print/)), but the client in those filings was not confirmed and they were not read.
- The 2026 FEC page for the committee on niacactionpac.org: not fetched.
- FARA status: NOT VERIFIED. Critics such as the Middle East Forum allege ties to Iran's government. NIAC disputes this. No FARA registration was found in sources read.

## Q8. Turkish-American lobby: Turkish Coalition of America and Turkish American PACs

### Takeaway
Turkish-American PACs are small: TC-USA PAC and the National Coalition of Turkish American Women's PAC each raised about $40K in 2024. The FARA question concerns Turkey's government-paid lobbyists rather than the PACs, and the claims about links between the two come from an advocacy source.

### Cited Findings
- Turkish Coalition USA PAC (TC-USA PAC) (C00432526), active, 2023–24: raised $40,110.69; spent $41,044.60, of which $38,151 went to other committees; IE $0. CONFIRMED — [FEC C00432526](https://www.fec.gov/data/committee/C00432526/?cycle=2024)
- National Coalition of Turkish American Women's PAC (C00487181), active, 2023–24: raised $40,341; spent $43,232.76; IE $0. CONFIRMED — [FEC C00487181](https://www.fec.gov/data/committee/C00487181/?cycle=2024)
- Middle East Forum (Benjamin Baird, undated, about 2020–21) says the "10K Turks" coalition spent over $200,000 in 2019–2020. It also alleges that donors linked to the Saltzman & Evinch law firm, which it says registered under FARA in 2020, gave to these PACs. REPORTED by an advocacy source and not checked against FEC or FARA — [MEF](https://www.meforum.org/foreign-agents-use-turkish-american-pacs)

### Gaps
- 2022 and 2026 figures for these PACs, and for Turkish American Heritage PAC (C00454140) and TAC PAC (C00530865): not fetched.
- Turkish Coalition of America's lobbying spending: NOT VERIFIED.

## Q9. J Street: J Street PAC and J Street Action Fund (2022, 2024, 2026)

### Takeaway
J Street PAC is a conduit PAC: nearly all of its receipts pass straight to candidates. It raised $6.74M in 2022, $14.58M in 2024 and $9.36M in 2026 (through Oct. 14). Its super PAC, J Street Action Fund, spent about $205K in 2024 and, by J Street's own account, more than $3M in 2026. J Street says it raised $13.2M in total for 2026.

### Cited Findings
- JSTREETPAC (C00441949), a membership-organisation PAC that is also a lobbyist/registrant PAC. CONFIRMED:
  - 2021–22: raised $6,736,834.51; spent $6,780,170.93, of which $6,675,634.72 went to other committees; IE $0 — [FEC 2022](https://www.fec.gov/data/committee/C00441949/?cycle=2022)
  - 2023–24: raised $14,581,366.79; spent $14,487,287.18, of which $14,398,383.78 went to other committees; IE $0 — [FEC 2024](https://www.fec.gov/data/committee/C00441949/?cycle=2024)
  - 2025–26 through Oct. 14, 2026: raised $9,361,922.75; spent $9,130,831.60 — [FEC 2026](https://www.fec.gov/data/committee/C00441949/?cycle=2026)
- J Street Action Fund (C00815753), the super PAC, 2024 cycle: raised $212,864; spent $220,571; IE $204,995. REPORTED via Itemizer and not checked on FEC — [Itemizer](https://projects.propublica.org/itemizer/committee/C00815753/2024)
- J Street's own release (Nov. 4, 2026) says it raised "over $13 million" for the 2026 midterms, about $10M of it in direct candidate support through its conduit. It says the Action Fund spent more than $3M: over $300K in primaries and over $2.9M in general elections against five AIPAC-backed candidates. REPORTED (self-reported) — [J Street](https://jstreet.org/press/midterm-results-are-resounding-victory-new-politics-israel-and-palestine)
- JNS (Mar. 4, 2026) reported $717,957 in combined J Street PAC and super PAC cash at the end of 2025, and a $3M super PAC fund announcement. REPORTED — [JNS](https://www.jns.org/u.s.-news/aipac-other-pro-israel-groups-enter-midterms-with-100-million-to-spend)
- JNS (Feb. 6, 2025) reported J Street PAC spending of $14.6M in 2024 and $8.6M in 2022. The 2024 figure matches FEC. The 2022 figure is CONTESTED: FEC shows $6.78M in 2022 disbursements. The fetch tool's extraction of this article may also have mixed in UDP race figures, since UDP is widely reported to have spent about $14.6M against Bowman and $8.6M against Bush. Treat both JNS numbers with caution — [JNS](https://www.jns.org/u.s.-news/campaign-spending-at-pro-israel-political-action-committees-up-in-2024)
- J Street's federal lobbying: $595,000 in 2024 and $520,000 in 2023. REPORTED — [JNS, Jan. 22, 2025](https://www.jns.org/us-jewish-groups-spent-more-some-exponentially-so-lobbying-in-2024-than-prior-year/)

### Inferences
- J Street PAC's money is mostly bundled individual contributions passed through to candidates. It is not super-PAC advertising, so it is not directly comparable to UDP's independent expenditures.

### Gaps
- J Street Action Fund's FEC-page totals for 2024 and 2026: not fetched.
- J Street lobbying for 2022, 2025 and 2026: NOT VERIFIED.

## Q10. Other pro-Israel groups: DMFI / DMFI PAC, Republican Jewish Coalition / RJC Victory Fund, and CUFI Action Fund

### Takeaway
These are the largest non-AIPAC country-focused electoral spenders found. RJC Victory Fund raised $17.0M in 2024, including $13.3M in IEs, and $7.4M in 2026. DMFI PAC raised $9.1M in 2022, $6.7M in 2024 and $7.5M in 2026. CUFI Action Fund's only FEC-reported IE found is $100,000, in late 2020.

### Cited Findings
- DMFI PAC (C00710848), a hybrid PAC with a non-contribution account. CONFIRMED:
  - 2021–22: raised $9,063,923.63; spent $8,895,773.65; IE $7,448,431.06 — [FEC 2022](https://www.fec.gov/data/committee/C00710848/?cycle=2022)
  - 2023–24: raised $6,745,510.39; spent $6,209,662.64; IE $4,155,904.10 — [FEC 2024](https://www.fec.gov/data/committee/C00710848/?cycle=2024)
  - 2025–26 through Oct. 14, 2026: raised $7,481,099.60, of which $7.19M was "other receipts"; spent $7,776,455.12; IE $3,659,734.13; "other disbursements" $3,785,322.76 — [FEC 2026](https://www.fec.gov/data/committee/C00710848/?cycle=2026)
  - CONTESTED: ProPublica Itemizer shows $4.80M raised and $5.69M spent for 2024, versus FEC's $6.75M and $6.21M — [Itemizer](https://projects.propublica.org/itemizer/committee/C00710848/2024). JNS (Feb. 2025) reported $4.8M for 2023–24 and $7.7M for 2021–22 — [JNS](https://www.jns.org/u.s.-news/campaign-spending-at-pro-israel-political-action-committees-up-in-2024)
  - The American Prospect (David Dayen, June 22, 2026) reported DMFI's direct spending at $2.7M as of May 31, plus transfers to partner PACs: $500K to Women Vote, $200K to United for Progress, and smaller amounts to others. REPORTED — [Prospect](https://prospect.org/2026/06/22/pro-israel-super-pac-cinematic-universe/)
- RJC Victory Fund (C00528554), a super PAC. CONFIRMED:
  - 2021–22: raised $3,090,753.90; spent $3,083,523.53; IE $2,952,174.85 — [FEC 2022](https://www.fec.gov/data/committee/C00528554/?cycle=2022)
  - 2023–24: raised $17,018,627.15; spent $16,679,067.31; IE $13,344,390.75; contributions to other committees $3,121,500 — [FEC 2024](https://www.fec.gov/data/committee/C00528554/?cycle=2024)
  - 2025–26 through Oct. 14, 2026: raised $7,366,720; spent $6,615,989.16; IE $5,091,547.67 — [FEC 2026](https://www.fec.gov/data/committee/C00528554/?cycle=2026)
  - Kentucky Public Radio (Joe Sonka, July 17, 2026) reported $3.9M from RJC Victory Fund in the Massie–Gallrein primary, funded partly by a $5M gift from Kua Ventures LLC, whose donors are unclear. REPORTED — [WVXU](https://www.wvxu.org/2026-07-17/a-record-shattering-37m-was-spent-on-kentuckys-massie-gallrein-race-heres-who-funded-it)
- RJC PAC (C00345132), the separate traditional PAC, 2024 cycle: about $3.12M raised and $3.06M spent. REPORTED. These are the fetch tool's own sums of Itemizer report pages, which may double-count — [Itemizer](https://projects.propublica.org/itemizer/committee/C00345132/2024)
- JNS (Feb. 2025) reported RJC plus its super PAC spending of $19.7M in 2024 and $4.5M in 2022. REPORTED, and broadly consistent with FEC — [JNS](https://www.jns.org/u.s.-news/campaign-spending-at-pro-israel-political-action-committees-up-in-2024)
- RJC's federal lobbying: $400,000 in 2024 and $90,000 in 2023. REPORTED — [JNS, Jan. 22, 2025](https://www.jns.org/us-jewish-groups-spent-more-some-exponentially-so-lobbying-in-2024-than-prior-year/)
- CUFI Action Fund (C90020926) is an IE filer, not a committee. Its only figure found is $100,000 in IEs for Oct.–Dec. 2020. Pages for 2021–22 show no totals. CONFIRMED — [FEC C90020926](https://www.fec.gov/data/committee/C90020926/?cycle=2024)
- For comparison: AIPAC's federal lobbying was $3.3M in 2024 and $3.1M in 2023; ADL's was $1.4M in 2024. REPORTED — [JNS, Jan. 22, 2025](https://www.jns.org/us-jewish-groups-spent-more-some-exponentially-so-lobbying-in-2024-than-prior-year/)
- NORPAC spent $2.7M in 2024 and $1.6M in 2022. REPORTED — [JNS](https://www.jns.org/u.s.-news/campaign-spending-at-pro-israel-political-action-committees-up-in-2024)

### Inferences
- In each cycle, RJC Victory Fund plus DMFI PAC come to roughly 10–25% of AIPAC/UDP's spending. In 2024, about $23.8M combined receipts compares with $95.1M.
- DMFI's large "other receipts" and "other disbursements" lines are consistent with its hybrid structure and with transfers to partner super PACs, as the Prospect describes. This is inferred, and the exact transfers were not itemised here.

### Gaps
- CUFI Action Fund's 2024 and 2026 spending, and any CUFI lobbying figures: NOT VERIFIED.
- DMFI lobbying: NOT VERIFIED.
- The donors behind Kua Ventures LLC: unknown per WVXU.

## Q11. Any non-Israel country-focused super PAC that spent over $5M in a cycle

### Takeaway
None was found. The largest non-Israel diaspora committee confirmed on FEC is The Impact Fund, with $2.84M in IEs in 2024. The closest to $5M is American Priorities, a pro-Palestinian, Arab-American-funded super PAC, which had raised about $5.4M by June 2026 and pledged $10M or more. Its total spending was not verified.

### Cited Findings
- American Priorities raised about $5.4M, "mostly from a small network of Arab American donors." It had $1.2M on hand entering June 2026, pledged at least $10M, and spent over $1.5M for Adam Hamawy in a New Jersey primary. REPORTED — [Jewish Insider, Matthew Kassel, June 12, 2026](https://jewishinsider.com/2026/06/anti-israel-left-takes-a-page-from-aipac-in-spending-big-in-primaries/)
- The Intercept (Oct. 29, 2026) says new pro-Palestine groups' "pockets aren't nearly as deep" as AIPAC's. REPORTED — [The Intercept](https://theintercept.com/2026/10/29/aipac-israel-midterms-spending-elections-congress/)
- A Chicago Council on Global Affairs analysis (AJ Caughey, Oct. 25, 2024) of large Chicago-area donors found about 93% of their foreign-policy PAC giving went to Israel-focused groups. Of 14 foreign- or defense-policy PACs they gave to, 9 were pro-Israel. This is a regional sample, not national — [Chicago Council](https://globalaffairs.org/commentary-and-analysis/blogs/chicagoglobal/where-does-foreign-policy-pac-money-go)

### Inferences
- From the FEC pages checked, every diaspora lobby other than the Israel-focused ones raised under about $100K per cycle through its PAC, with The Impact Fund as the one exception. That is two to three orders of magnitude below AIPAC/UDP.
- Whether American Priorities counts as "country-focused" is a framing choice. It is organised around Israel/Palestine policy, not a single homeland.

### Gaps
- American Priorities' FEC committee ID and FEC totals through October 2026: not fetched. NOT VERIFIED.
- A systematic national scan of all diaspora super PACs was not possible without FEC API or OpenSecrets access. There may be committees this search did not surface. The absence here is not proof of absence.
- Annual lobbying totals for ANCA, AHI, HALC, CANF, HAF, USINPAC, FAPA, UCCA, NIAC Action, TCA and CUFI: all NOT VERIFIED because the lobbying databases were unreachable.
