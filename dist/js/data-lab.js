/* Insights and Lab: data behind the interactive exercises and the source list.
   Facts here were re-read at the cited pages on November 16 to 19, 2026 (see research/insights-lab.md).
   Ratings in the evidence grid are our own reading and are labelled that way on the page. */
(function (M) {
  M.insightsLab = {
    asOf: 'November 19, 2026',

    /* Lab 1: claims that circulated and what the sources show. verdict: holds | qualify | wrong | unproven */
    claims: [
      { id: 'c-flips', claim: 'All nine Senate seats that flipped were in states Trump won in 2024.', verdict: 'wrong',
        finding: 'Eight of the nine are. Maine is the exception: it flipped, and Harris carried it in 2024.',
        check: 'Open a list of the nine flips, then look up each state’s 2024 presidential result.',
        url: 'https://en.wikipedia.org/wiki/2026_United_States_Senate_elections', src: 'Wikipedia: 2026 Senate elections' },
      { id: 'c-immig', claim: 'Immigration enforcement was the issue that decided the House vote.', verdict: 'unproven',
        finding: 'In the one model we could check, immigration enforcement pushed voters in both directions and netted about zero (R+0.1, not statistically significant). Corruption (D+6.9) and the Iran war (D+3.2) were the two measurable effects.',
        check: 'Find the survey’s final model, not the headline, and read the range around each number.',
        url: 'https://americancompass.org/post-midterm-survey/', src: 'American Compass post-midterm survey' },
      { id: 'c-margin', claim: 'Democrats won the House popular vote by about 13 points, the biggest midterm margin since 1974.', verdict: 'holds',
        finding: 'Brookings reports a 13-point margin, and the Council on Foreign Relations ranks it second-largest among midterms since 1942, behind 1974. Counts were still moving: Wikipedia’s running tally showed 13.9 points on November 19.',
        check: 'Look for the same figure at two independent sources, and note which one is still being updated.',
        url: 'https://www.cfr.org/articles/2026-election-by-the-numbers', src: 'CFR: 2026 election by the numbers' },
      { id: 'c-ads', claim: 'Political advertising reached $12 billion, according to AdImpact.', verdict: 'qualify',
        finding: 'AdImpact’s own page projects $11.6 billion for 2025 to 2026, above $11.2 billion in 2024. We did not find a $12 billion figure on its pages. Other trackers use other definitions; OpenSecrets’ figure on the Money page is $11.9 billion.',
        check: 'Go to the named organization’s own page and search for the number. If it is not there, treat the claim as unconfirmed.',
        url: 'https://adimpact.com/political-projections-26-updated', src: 'AdImpact: 2026 projections' },
      { id: 'c-split', claim: 'Of 164 statewide ballot measures, 53 were citizen initiatives and 111 were legislative referrals.', verdict: 'unproven',
        finding: 'Ballotpedia confirms 164 measures certified in 40 states. The 53 and 111 split does not appear for 2026: 53 and 108 are long-run averages for even-numbered years, which is probably where the claim came from.',
        check: 'Check whether a number is a count for this year or an average across many years.',
        url: 'https://ballotpedia.org/2026_ballot_measures', src: 'Ballotpedia: 2026 ballot measures' },
      { id: 'c-trifecta', claim: 'Democrats now hold 20 state trifectas and Republicans 16.', verdict: 'qualify',
        finding: 'That was a November 12 snapshot. On November 19 Ballotpedia’s current table shows 16 Democratic, 23 Republican and 11 divided governments, and says that as a result of the 2026 elections Democrats gain six trifectas and Republicans lose five (40 in all), with North Carolina undetermined as of November 18. Which number is right depends on whether you mean today or after new officials take office.',
        check: 'Find the date on the table, and ask whether it describes before or after the election.',
        url: 'https://ballotpedia.org/State_government_trifectas', src: 'Ballotpedia: State government trifectas' },
      { id: 'c-georgia', claim: 'The Supreme Court’s Callais ruling caused Black turnout in Georgia to surge.', verdict: 'unproven',
        finding: 'The Brennan Center’s preliminary Georgia analysis found the white-Black turnout gap was the lowest of any midterm in 20 years. It does not say why. Some advocates connect it to the ruling; that is an argument, not a measured cause.',
        check: 'Separate what the data measured (a gap) from what the writer inferred (a cause).',
        url: 'https://www.brennancenter.org/our-work/analysis-opinion/surprising-turnout-rates-2026-midterms', src: 'Brennan Center: turnout in the 2026 midterms' }
    ],
    verdictLabels: { holds: 'Holds up', qualify: 'Needs a qualifier', wrong: 'Wrong', unproven: 'Not shown by the evidence' },

    /* Lab 2: turnout or persuasion. Eligible voters split 50/50 between a Democratic-leaning and a Republican-leaning group.
       A fixed 5% of the Democratic-leaning group votes Republican. Three dials: each group’s turnout, and the Republican-leaning group’s crossover. */
    turnout: {
      baseline: { td: 60, tr: 64, cross: 4 },
      defect: 5,
      presets: [
        { id: 'base', label: 'Start: a 2024-like electorate', td: 60, tr: 64, cross: 4, note: 'Republican-leaning voters turn out a little more than Democratic-leaning ones, and 4 in 100 of them cross over.' },
        { id: 'persuade', label: 'Persuasion story', td: 60, tr: 64, cross: 12, note: 'Nobody’s turnout changes, but 12 in 100 Republican-leaning voters cross over. Nothing like this showed up: Brookings found only 6% of Republicans voted Democratic in House races.' },
        { id: 'stay', label: 'Staying-home story', td: 60, tr: 52, cross: 4, note: 'No one changes their mind, but Republican-leaning turnout drops 12 points. This is the pattern the 2026 governor numbers fit better.' },
        { id: 'both', label: 'Both at once', td: 62, tr: 54, cross: 6, note: 'A smaller turnout gap plus Brookings’ 6% crossover. Close to the pattern the 2026 data fit.' }
      ],
      reality: 'Real figures for comparison: only 6% of Republicans voted for a Democratic House candidate; Republican candidates for governor got 30%, 36% and 32% fewer votes than Trump in Texas, Ohio and Florida (Brookings).'
    },

    /* Lab 3: analysis of competing hypotheses. rating: C consistent, I inconsistent, N not diagnostic. */
    hypotheses: [
      { id: 'h-prices', label: 'Prices and the Iran war' },
      { id: 'h-corrupt', label: 'Corruption and accountability' },
      { id: 'h-immig', label: 'Immigration enforcement' },
      { id: 'h-rights', label: 'The voting-rights fight raised Black turnout' },
      { id: 'h-midterm', label: 'An ordinary midterm penalty' },
      { id: 'h-cand', label: 'Better, more moderate candidates' }
    ],
    evidence: [
      { id: 'e1', text: 'In American Compass’s model, corruption moved the House vote about 6.9 points toward Democrats, a statistically clear effect.', src: 'American Compass', url: 'https://americancompass.org/post-midterm-survey/', ours: { 'h-prices': 'N', 'h-corrupt': 'C', 'h-immig': 'N', 'h-rights': 'N', 'h-midterm': 'N', 'h-cand': 'N' } },
      { id: 'e2', text: 'In the same model, the Iran war moved the vote about 3.2 points toward Democrats, also clear.', src: 'American Compass', url: 'https://americancompass.org/post-midterm-survey/', ours: { 'h-prices': 'C', 'h-corrupt': 'N', 'h-immig': 'N', 'h-rights': 'N', 'h-midterm': 'N', 'h-cand': 'N' } },
      { id: 'e3', text: 'Tariffs, one route to higher prices, had no clear independent effect (D+0.5, not statistically different from zero).', src: 'American Compass', url: 'https://americancompass.org/post-midterm-survey/', ours: { 'h-prices': 'I', 'h-corrupt': 'N', 'h-immig': 'N', 'h-rights': 'N', 'h-midterm': 'N', 'h-cand': 'N' } },
      { id: 'e4', text: 'Immigration enforcement pushed voters in both directions and netted about zero (R+0.1, not clear).', src: 'American Compass', url: 'https://americancompass.org/post-midterm-survey/', ours: { 'h-prices': 'N', 'h-corrupt': 'N', 'h-immig': 'I', 'h-rights': 'N', 'h-midterm': 'N', 'h-cand': 'N' } },
      { id: 'e5', text: 'Only 6% of Republicans voted for a Democratic House candidate.', src: 'Brookings', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/', ours: { 'h-prices': 'N', 'h-corrupt': 'N', 'h-immig': 'I', 'h-rights': 'N', 'h-midterm': 'N', 'h-cand': 'I' } },
      { id: 'e6', text: 'Republican candidates for governor got 30% to 36% fewer votes than Trump in Texas, Ohio and Florida, while Democrats’ totals moved +8%, −5% and −14%.', src: 'Brookings', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/', ours: { 'h-prices': 'N', 'h-corrupt': 'N', 'h-immig': 'N', 'h-rights': 'N', 'h-midterm': 'C', 'h-cand': 'N' } },
      { id: 'e7', text: 'In Georgia’s preliminary voter file, the white-Black turnout gap was the lowest of any midterm in 20 years.', src: 'Brennan Center', url: 'https://www.brennancenter.org/our-work/analysis-opinion/surprising-turnout-rates-2026-midterms', ours: { 'h-prices': 'N', 'h-corrupt': 'N', 'h-immig': 'N', 'h-rights': 'C', 'h-midterm': 'N', 'h-cand': 'N' } },
      { id: 'e8', text: 'The House margin of about 13 points is the second-largest in a midterm since 1942.', src: 'CFR', url: 'https://www.cfr.org/articles/2026-election-by-the-numbers', ours: { 'h-prices': 'N', 'h-corrupt': 'N', 'h-immig': 'N', 'h-rights': 'N', 'h-midterm': 'I', 'h-cand': 'N' } },
      { id: 'e9', text: 'Republican support among Hispanic voters fell sharply: from 48% to 29% (Brookings) or from about four in ten to about one-third (AP Voter Poll).', src: 'Brookings and AP', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/', ours: { 'h-prices': 'N', 'h-corrupt': 'N', 'h-immig': 'C', 'h-rights': 'N', 'h-midterm': 'N', 'h-cand': 'N' } },
      { id: 'e10', text: 'Red-state center-left Senate winners ran about 21 points ahead of Harris’s 2024 margin.', src: 'Third Way', url: 'https://www.thirdway.org/memo/center-left-democrats-overperformed-and-delivered-the-majority', ours: { 'h-prices': 'N', 'h-corrupt': 'N', 'h-immig': 'N', 'h-rights': 'N', 'h-midterm': 'N', 'h-cand': 'C' } },
      { id: 'e11', text: 'Three other Senate nominees ran 2, 3 and 10 points behind that same benchmark.', src: 'Third Way', url: 'https://www.thirdway.org/memo/center-left-democrats-overperformed-and-delivered-the-majority', ours: { 'h-prices': 'N', 'h-corrupt': 'N', 'h-immig': 'N', 'h-rights': 'N', 'h-midterm': 'N', 'h-cand': 'I' } },
      { id: 'e12', text: 'Gas prices on Election Day were the highest on record for an Election Day, after the Iran war began in February.', src: 'AP Voter Poll coverage', url: 'https://www.news4jax.com/news/politics/2026/11/04/how-america-voted-in-the-2026-midterms-early-takeaways-from-the-ap-voter-poll/', ours: { 'h-prices': 'C', 'h-corrupt': 'N', 'h-immig': 'N', 'h-rights': 'N', 'h-midterm': 'N', 'h-cand': 'N' } }
    ],

    /* Lab 4: power map. A worked example the reader can replace. */
    mapLevels: ['Neighborhood or school', 'City', 'County', 'Regional or special district', 'State', 'Federal', 'Private company'],
    mapSelected: ['Elected', 'Appointed', 'Not elected'],
    mapExample: {
      issue: 'Example: who decides whether a data center near me gets cheap electricity',
      rows: [
        { name: 'City or county zoning board', level: 'City', how: 'Appointed', power: 4, reach: 4, listens: 'Neighbors who show up in person; the planning staff' },
        { name: 'County commission or council', level: 'County', how: 'Elected', power: 4, reach: 4, listens: 'Voters, local business owners, other officials' },
        { name: 'State utility commission', level: 'State', how: 'Elected', power: 5, reach: 2, listens: 'The utility’s lawyers, consumer advocates, formal public comments' },
        { name: 'State legislature', level: 'State', how: 'Elected', power: 5, reach: 3, listens: 'Lobbyists, party leaders, constituents with a specific bill' },
        { name: 'The power company', level: 'Private company', how: 'Not elected', power: 4, reach: 1, listens: 'Regulators, large customers, investors' }
      ],
      note: 'Whether your state elects or appoints its utility commissioners varies: ten states elect them and forty appoint (Ballotpedia). Check yours. The ratings above are illustrative, not measured.'
    },

    /* Lab 5: five conversations */
    snowStatus: ['Not asked yet', 'Asked', 'Said yes', 'Said no', 'Maybe: follow up'],

    /* Lab 6: calendar. Dated anchors we confirmed; the rest is the reader’s. */
    calendar: [
      { when: 'January 2027', what: 'The new Congress takes office. The 20th Amendment ends members’ terms, and starts their successors’, at noon on January 3.', url: 'https://www.archives.gov/founding-docs/amendments-11-27', src: 'National Archives: Amendments 11-27' },
      { when: 'Fall 2027', what: 'Three governorships are on the ballot: Kentucky, Louisiana and Mississippi. Republicans hold two, a Democrat one; Beshear and Reeves are term-limited.', url: 'https://ballotpedia.org/Gubernatorial_elections,_2027', src: 'Ballotpedia: 2027 governors' },
      { when: 'November 7, 2028', what: 'The next presidential election. Eleven governorships are also on the ballot in 2028.', url: 'https://ballotpedia.org/Gubernatorial_elections,_2028', src: 'Ballotpedia: 2028 governors' }
    ],
    calWindows: [
      { id: 'w30', label: 'In the next 30 days' },
      { id: 'w2027', label: 'By the time the new Congress takes office (January 2027)' },
      { id: 'w2027f', label: 'Before fall 2027' },
      { id: 'w2028', label: 'Before November 2028' }
    ],

    /* Source list for [data-sources="insightsLab"] */
    sources: [
      { label: 'Wikipedia: 2026 U.S. Senate elections (running tally)', url: 'https://en.wikipedia.org/wiki/2026_United_States_Senate_elections' },
      { label: 'Wikipedia: 2026 U.S. House elections (running tally)', url: 'https://en.wikipedia.org/wiki/2026_United_States_House_of_Representatives_elections' },
      { label: 'Alaska Beacon: Peltola elected, the Senate’s 56th Democrat', url: 'https://alaskabeacon.com/2026/11/17/peltola-elected-to-fill-alaska-u-s-senate-seat-becomes-senates-56th-democrat-nationally/' },
      { label: 'StockAnalysis: Democrats win 30 governorships', url: 'https://stockanalysis.com/news/democrats-30-governors-attorneys-general-business-midterms-2026/' },
      { label: 'Ballotpedia: State legislative elections, 2026', url: 'https://ballotpedia.org/State_legislative_elections,_2026' },
      { label: 'Ballotpedia: State government trifectas', url: 'https://ballotpedia.org/State_government_trifectas' },
      { label: 'Ballotpedia: 2026 ballot measures', url: 'https://ballotpedia.org/2026_ballot_measures' },
      { label: 'Ballotpedia: Data center-related ballot measures, 2026', url: 'https://ballotpedia.org/Data_center-related_ballot_measures,_2026' },
      { label: 'Ballotpedia News: Public service commission elections, 2026', url: 'https://news.ballotpedia.org/2026/10/26/nine-states-are-holding-public-service-commission-elections-in-2026-with-two-expected-to-be-battlegrounds/' },
      { label: 'Ballotpedia: Gubernatorial elections, 2027', url: 'https://ballotpedia.org/Gubernatorial_elections,_2027' },
      { label: 'Ballotpedia: Gubernatorial elections, 2028', url: 'https://ballotpedia.org/Gubernatorial_elections,_2028' },
      { label: 'Brookings (Kamarck and Galston): How Democrats won big', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
      { label: 'Council on Foreign Relations: 2026 election by the numbers', url: 'https://www.cfr.org/articles/2026-election-by-the-numbers' },
      { label: 'AP Voter Poll, early takeaways (via News4Jax)', url: 'https://www.news4jax.com/news/politics/2026/11/04/how-america-voted-in-the-2026-midterms-early-takeaways-from-the-ap-voter-poll/' },
      { label: 'American Compass: Post-midterm survey', url: 'https://americancompass.org/post-midterm-survey/' },
      { label: 'Third Way: Center-left Democrats overperformed', url: 'https://www.thirdway.org/memo/center-left-democrats-overperformed-and-delivered-the-majority' },
      { label: 'The New Republic: Bonica and Grumbach transcript', url: 'https://newrepublic.com/article/217672/transcript-democratic-moderation-isnt-produced-wave' },
      { label: 'Brennan Center: Surprising turnout rates in the 2026 midterms', url: 'https://www.brennancenter.org/our-work/analysis-opinion/surprising-turnout-rates-2026-midterms' },
      { label: 'National Constitution Center: the Callais decision', url: 'https://constitutioncenter.org/blog/the-supreme-courts-callais-decision-sets-new-framework-for-racial-gerrymandering' },
      { label: 'Pew Research Center: polling performance in 2026', url: 'https://www.pewresearch.org/short-reads/2026/11/12/a-first-look-at-polling-performance-in-2026/' },
      { label: 'Public Citizen: Corporate political spending hits $737 million', url: 'https://www.citizen.org/news/corporate-political-spending-hits-737-million-in-2026-midterms-60-higher-than-2024-presidential-election/' },
      { label: 'AdImpact: 2026 political advertising projections', url: 'https://adimpact.com/political-projections-26-updated' },
      { label: 'Senate.gov: Filibusters and cloture', url: 'https://www.senate.gov/about/powers-procedures/filibusters-cloture.htm' },
      { label: 'National Archives: The Constitution, Article I, Section 7 (veto override)', url: 'https://www.archives.gov/founding-docs/constitution-transcript' },
      { label: 'National Archives: Amendments 11-27 (20th Amendment)', url: 'https://www.archives.gov/founding-docs/amendments-11-27' },
      { label: 'Mansbridge, “Rethinking Representation” (APSR, 2003)', url: 'https://doi.org/10.1017/S0003055403000856' },
      { label: 'Hall and Deardorff, “Lobbying as Legislative Subsidy” (APSR, 2006)', url: 'https://doi.org/10.1017/S0003055406062010' },
      { label: 'Kalla and Broockman, “Minimal Persuasive Effects of Campaign Contact” (APSR, 2018)', url: 'https://doi.org/10.1017/S0003055417000363' },
      { label: 'Broockman and Kalla, “Durably reducing transphobia” (Science, 2016)', url: 'https://doi.org/10.1126/science.aad9713' },
      { label: 'Wineburg and McGrew, “Lateral Reading and the Nature of Expertise” (2019)', url: 'https://doi.org/10.1177/016146811912101102' },
      { label: 'Princeton University Press: Tsebelis, Veto Players', url: 'https://press.princeton.edu/books/paperback/9780691099897/veto-players' }
    ],

    exportText: '## The wave in one page\n\nCounts as of November 19, 2026, unofficial until certified. Senate 56 to 44 (54 Democrats plus two independents who vote with them). House: Democrats 258, Republicans 173, four races undecided. Governors 30 to 20. State legislative chambers on the ballot: Democrats 46, Republicans 39, one tie or coalition, two uncalled; twelve changed hands, all to Democrats. Trifectas: Democrats gain six and Republicans lose five after the election (Ballotpedia; North Carolina undetermined on November 18). Voters favored limiting data centers in 52 of 53 decided local measures (Ballotpedia).\n\n## Why it happened, as far as the evidence goes\n\nOnly 6% of Republicans voted for a Democratic House candidate (Brookings), while Republican candidates for governor drew 30% to 36% fewer votes than Trump did in 2024 in Texas, Ohio and Florida. In American Compass’s post-midterm model, corruption (D+6.9) and the Iran war (D+3.2) had clear effects; tariffs (D+0.5), the 2025 tax-and-Medicaid law (D+0.1) and immigration enforcement (R+0.1) did not. Pew found polls understated the Democratic margin by about four points on average across 27 races. Turnout was 49.1% of eligible voters, second-highest for a midterm since 1914 (CFR, preliminary).\n\n## What we could not confirm\n\nThat immigration enforcement decided the House vote; that the Callais ruling caused Georgia’s turnout pattern; vendor figures for friend-to-friend outreach; a $12 billion AdImpact figure; a 53/111 split of 2026 ballot measures; figures on young men and caregiving.'
  };
})(window.MOSAIC);
