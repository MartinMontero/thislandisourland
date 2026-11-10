/* The Representation Mosaic — content and data.
   Every factual statement here was checked against sources retrieved Nov 8, 2026.
   Election-night figures are unofficial; certified results may differ. */
window.MOSAIC = {
  meta: {
    title: 'The Representation Mosaic',
    url: 'https://representation-mosaic.pages.dev',
    asOf: 'November 8, 2026',
    exportNote: 'Vote shares are unofficial election-night or partial counts unless stated. Verify against certified results before citing.'
  },

  /* ---------- Policy fault lines (used by the grid chips and the crosscurrent matrix) ---------- */
  themes: [
    { id: 'cost', short: 'Cost of living', label: 'Cost of living, prices & the war at the pump', swatch: 'bg-stone-600',
      explain: 'Affordability pitches: groceries, housing, insulin, power bills, gas. About half of voters in the AP Voter Poll called cost of living crucial to their vote, and many tied prices to tariffs and the Iran war.',
      question: 'Which of these promises can this office actually deliver, and which depend on another level of government?' },
    { id: 'corruption', short: 'Corruption', label: 'Corruption & accountability', swatch: 'bg-gold',
      explain: 'Anti-corruption and accountability planks: stock-trading bans, public-records access, limits on corporate money, oversight of the executive. Gallup found 89% of Americans call government corruption widespread.',
      question: 'Who enforces ethics rules on the people who write them?' },
    { id: 'oligarchy', short: 'Top vs. bottom', label: 'Billionaire power & big money', swatch: 'bg-terra-700',
      explain: 'Campaigns that named billionaires, mega-donors or “the billionaire class” as the adversary, or that refused that money. Musk alone gave a record $474 million this cycle.',
      question: 'Can a candidate fight concentrated wealth while being funded by it?' },
    { id: 'tech', short: 'Big Tech & data centers', label: 'Big Tech, AI & data centers', swatch: 'bg-ochre',
      explain: 'Positions on AI data centers (power bills, water, tax breaks, local consent) and on Silicon Valley’s political spending. Voters opposed local data centers by about three to one.',
      question: 'If most voters oppose a data center nearby but only a quarter call it crucial, how much did the issue move votes?' },
    { id: 'health', short: 'Health care', label: 'Health care & the Medicaid cuts', swatch: 'bg-verd',
      explain: 'Medicaid, Medicare for All, insulin caps, public options and public-health experience, sharpened by the 2025 federal Medicaid cuts.',
      question: 'Does a medical background predict how someone votes on health spending, or only how credibly they talk about it?' },
    { id: 'immigration', short: 'ICE & immigration', label: 'Immigration enforcement', swatch: 'bg-terra',
      explain: 'Documented positions on federal immigration enforcement. Most voters credited the administration on the border but said ICE conduct in big-city raids had gone too far.',
      question: 'Which level of government should decide how immigration law is enforced inside a city?' },
    { id: 'federalism', short: 'States vs. federal', label: 'State power vs. federal power', swatch: 'bg-lapis',
      explain: 'Officials who ran on using state offices to check federal policy: lawsuits, National Guard disputes, control of election rules.',
      question: 'Would you support the same state resistance if the other party held the White House?' },
    { id: 'schools', short: 'Schools', label: 'Public schools', swatch: 'bg-lapis-700',
      explain: 'School funding, vouchers, testing and teacher pay as documented campaign planks.',
      question: 'How much of school policy is set by the state versus the local school board you also elect?' },
    { id: 'left', short: 'Progressive wing', label: 'Progressive or democratic-socialist wing', swatch: 'bg-ink',
      explain: 'Winners identified in coverage as from the progressive or democratic-socialist wing, several of whom beat establishment Democrats in primaries.',
      question: 'Did these candidates win because voters moved left, or because they named the top as the problem?' },
    { id: 'process', short: 'How we vote', label: 'Election rules & process', swatch: 'bg-verd-700',
      explain: 'Races where the voting method itself, such as ranked choice voting or a nonpartisan top-two system, shaped the outcome.',
      question: 'Would the same person have won under a different counting rule?' }
  ],

  /* ---------- Structural insights ---------- */
  insights: [
    {
      title: 'The Healer Caucus', kicker: 'Medical credentials as a campaign asset',
      body: [
        'Four Democrats with medical degrees won major races: Amy Acton (Ohio governor), Annie Andrews (South Carolina Senate), Abdul El-Sayed (Michigan Senate) and Adam Hamawy (NJ-12). Acton is a pediatrician and was Ohio’s health director during the first months of COVID. Andrews is a pediatrician. Hamawy is a surgeon who served in the Army during the Iraq war.',
        'El-Sayed is the instructive edge case. He holds an MD from Columbia and a doctorate in public health from Oxford, but he did not do a residency and has never been licensed to practise. His opponents called him a fake doctor; PolitiFact and Bridge Michigan concluded he is a doctor but not a licensed physician. How you count him depends on which definition you use, and that is worth noticing before repeating the phrase “four physicians.”',
        'The outgoing Congress had 20 physicians, which tied the record. Reporting after the election says the next Congress will have more, but no final count had been published by November 8. The new arrivals named in coverage are mostly Democrats, while at least one Republican physician senator, Roger Marshall of Kansas, lost.'
      ],
      evidence: [
        'Acton won 52.3% to 44.4% over Vivek Ramaswamy at 97.7% counted (NBC).',
        'Andrews beat interim Sen. Darline Graham 50.6% to 47.2% at the time of the AP call.',
        'El-Sayed beat Mike Rogers about 53% to 45% on partial returns (AP projection).',
        'Hamawy was projected at 74% in a safely Democratic district.',
        '314 Action recruits Democratic candidates with science and medical backgrounds; coverage linked these campaigns to reversing federal Medicaid cuts.'
      ],
      limits: 'Four winners do not make a trend on their own. Three of the four won in a strong Democratic year, and NJ-12 was safe for any Democrat. Whether medical training changed votes, rather than simply describing who ran, is not something the available data can show.',
      sources: [
        { label: 'Chief Healthcare Executive: Doctors who won and lost in 2026', url: 'https://www.chiefhealthcareexecutive.com/view/election-2026-doctors-who-won-and-lost-bids-for-congress' },
        { label: 'TIME: Doctors and scientists who won the 2026 midterms', url: 'https://time.com/article/2026/11/04/doctors-scientists-won-2026-midterm-elections/' },
        { label: 'PolitiFact: Is Abdul El-Sayed a physician?', url: 'https://politifact.com/article/2026/oct/14/abdul-el-sayed-doctor-physician-michigan-senate/' },
        { label: 'Bridge Michigan fact check on El-Sayed', url: 'https://bridgemi.com/michigan-politics/fact-check-abdul-el-sayed-not-a-fake-doctor-or-licensed-physician/' },
        { label: 'NBC: Acton vs. Ramaswamy results', url: 'https://www.nbcboston.com/elections/amy-acton-vivek-ramaswamy-ohio-governor-results/4040325/' }
      ]
    },
    {
      title: 'Data Centers vs. the Grid', kicker: 'The tech broligarchy meets the power bill',
      body: [
        'Large AI data centers became a campaign issue because voters connected them to electricity bills and water. More than $380 million in TV ads mentioned data centers, and Democrats outspent Republicans on the topic more than three to one. Local restrictions passed in 44 of 45 completed ballot measures tracked by one consultancy.',
        'The positions were more varied than a party label suggests. In Ohio, Amy Acton proposed a conditional moratorium: projects would have to pay for their own power, water and gas and show no rate increase for other customers. In Texas, Gina Hinojosa said she would block permits that are not a good deal or lack resident input. In Ohio’s Senate race, Sherrod Brown called Republican Sen. Jon Husted, a champion of data centers as lieutenant governor, “the face of data centers,” and beat him.',
        'In Georgia, the issue arrived through an office most voters ignore. Democrats won two seats on the Public Service Commission, which sets utility rates, in 2025, and two more in 2026, taking control of the commission.'
      ],
      evidence: [
        'About three-quarters of voters oppose a new data center in their community, with majorities in both red and blue states (AP Voter Poll).',
        'Only about a quarter called data centers crucial to their vote, well below corruption and cost of living (about half each).',
        'A 2026 Dallas Fed working paper estimated data centers raised wholesale electricity prices 6.9%; FactCheck.org cautioned the link to household bills is not simple.',
        'Of 34 called governor races, 32 winners back stronger regulation (Data Center Watch, via AP).'
      ],
      limits: 'High opposition with low salience suggests data centers shaped local referendums and campaign framing more than they decided statewide races. Tracker counts of local measures differ (44 of 45 versus 40 of 41), so treat any single number as approximate.',
      sources: [
        { label: 'ABC News/AP: Data centers took a beating in the midterms', url: 'https://abcnews.com/Technology/wireStory/data-centers-beating-midterm-elections-reckoning-ahead-tech-137902293' },
        { label: 'Al Jazeera: How the midterms reflected resistance to data centres', url: 'https://www.aljazeera.com/economy/2026/11/7/how-the-us-midterm-elections-reflected-resistance-to-data-centres' },
        { label: 'Brookings: Why data centers are a top issue (Aug 2026)', url: 'https://www.brookings.edu/articles/why-data-centers-are-a-top-issue-in-the-2026-midterms/' },
        { label: 'Signal Cleveland: Acton’s data center plan', url: 'https://signalcleveland.org/amy-acton-ohio-data-center-plan-november-election-2026/' },
        { label: 'WUNC/NPR: Brown wins Ohio on data centers', url: 'https://www.wunc.org/2026-11-03/democrat-sherrod-brown-wins-ohio-senate-race' },
        { label: 'S&P Global: Democrats flip Georgia PSC', url: 'https://www.spglobal.com/energy/en/news-research/latest-news/electric-power/110426-democrats-flip-georgia-psc-as-power-bills-data-center-costs-loom' }
      ]
    },
    {
      title: 'Sub-national Federalism', kicker: 'Statehouses as a check on Washington',
      body: [
        'The United States splits power between federal and state governments, and governors and state attorneys general can sue the federal government, refuse to cooperate with some federal programs, and control how elections are run. In 2025 that tension became concrete: the administration federalised California’s National Guard over the governor’s objection, Oregon and Illinois sued over deployments, and the Supreme Court upheld a block on the Illinois deployment.',
        'AP framed the 2026 governor races as a test of that resistance. Democrats will hold at least 28 governorships in 2027, their first majority since 2006. Aaron Ford ran in Nevada on his record of suing the administration as attorney general and unseated Republican Gov. Joe Lombardo.',
        'With Democrats also winning both chambers of Congress, the counterweight role may now shift from states to congressional oversight. The governors’ majority matters most for how elections are run before 2028.'
      ],
      evidence: [
        'About 7 in 10 voters said Congress is not doing enough to check the president, including about 4 in 10 Republicans (AP Voter Poll).',
        'Ford unseated Lombardo; Democrats swept all six Nevada statewide offices for the first time since 1962.',
        'After winning, Xavier Becerra declined to commit to reversing Medi-Cal cuts for undocumented immigrants until he reviews the budget, a sign of the fiscal limits on state counter-policy.'
      ],
      limits: 'Federalism arguments change sides with the White House. Republican attorneys general sued the Biden administration on the same constitutional grounds. A useful test is whether you would accept the same state power used against a federal government you support.',
      sources: [
        { label: 'AP: Democrats press to win a majority of governors (via ClickOnDetroit)', url: 'https://www.clickondetroit.com/news/politics/2026/11/02/democrats-press-to-win-a-majority-of-governors-offices-in-midterms-after-power-struggles-with-trump/' },
        { label: 'NPR: National Guard deployments and state attorneys general (Jan 2026)', url: 'https://www.npr.org/2026/01/15/nx-s1-5672596/national-guard-trump-attorney-general' },
        { label: 'NHPR/NPR: Ford beats incumbent Lombardo', url: 'https://www.nhpr.org/2026-11-04/nevada-attorney-general-aaron-ford-beats-republican-incumbent-for-governor' },
        { label: 'PBS/AP Voter Poll: how key groups voted', url: 'https://www.pbs.org/newshour/politics/ap-voter-poll-how-key-demographic-groups-voted-in-the-2026-midterms' }
      ]
    }
  ],

  /* ---------- Civic Wisdom Lab ---------- */
  lab: [
    { id: 'descriptive', title: 'Descriptive vs. substantive representation',
      body: 'Descriptive representation means a legislature that looks like the population: its share of women, of Black or Native or Muslim members. Substantive representation means policies that serve a group’s interests, whoever proposes them. Political scientists have long argued about how strongly the first produces the second. A “first” is a fact about who holds office; it is not, by itself, evidence about what they will do.',
      example: 'Kansas elected Adam Hamilton, a Methodist pastor who was a registered Republican until this year. Denver elected Melat Kiros, a 29-year-old democratic socialist. Both won as Democrats, and they would represent very different voters very differently. A party label, like an identity, tells you less than a record.',
      questions: ['If two leaders share an identity but disagree on policy, which one represents that community?', 'Can a legislator substantively represent a group they do not belong to? Name an example.', 'What would you need to observe in 2027 to judge whether these firsts changed outcomes?'] },
    { id: 'reading', title: 'Reading a “first” carefully',
      body: 'Historic-first claims are easy to state loosely and hard to state precisely. The qualifiers carry the meaning: first elected versus first to serve, first in a state versus first in the nation, first woman versus first person. Checking this archive found several claims that were wrong only because a qualifier was missing.',
      example: 'Deb Haaland is the first Native American woman elected governor, not the first Native American governor: Oklahoma has elected two tribal citizens. Xavier Becerra is California’s first Latino governor elected by voters, because Romualdo Pacheco took office by succession in 1875. Amy Acton is the first woman elected governor of Ohio; Nancy Hollister served 11 days as an interim in 1999.',
      questions: ['Why do campaigns and outlets tend to drop the qualifier?', 'Does a precise version of the claim make the achievement smaller, or just accurate?', 'Find one “first” in this site and try to break it. What would count as a counter-example?'] },
    { id: 'coalitions', title: 'The mathematics of coalitions',
      body: 'A candidate wins by adding groups until they pass half the vote (or the most votes, in a plurality race). That means a win can come from a shift in a small group, higher turnout in a loyal group, or the other side’s voters staying home. Exit surveys tell you who voted for whom; they are weaker at telling you why turnout changed.',
      example: 'The AP Voter Poll found about 7 in 10 voters under 30 backed Democratic House candidates, against a roughly even split in 2024, and the Republican share of Hispanic voters fell from about 4 in 10 to about a third. Gas prices on Election Day were the highest on record for an Election Day, after the Iran war began in February.',
      questions: ['Did voters change their minds, or did different voters show up? What data would separate the two?', 'If 2024’s shift toward Republicans reversed in two years, was it ever a realignment?', 'How much of a wave is about the winners, and how much about conditions they did not control?'] },
    { id: 'federalist', title: 'Who holds which power',
      body: 'The Constitution leaves most day-to-day governing to states and localities: policing, schools, zoning, elections, water. Federal power rests mainly on taxing, spending, and specific listed powers, plus the supremacy of valid federal law. Many 2026 fights were really arguments about which level gets to decide.',
      example: 'The Election Assistance Commission, the federal agency that certifies voting-system standards, has had no commissioners since July 9, 2026, when the president fired two and a third resigned. It cannot adopt new standards without a quorum, so states and counties are running elections with no functioning federal partner.',
      questions: ['List three things in your daily life governed mostly by your city or county. Did you vote for the people who run them?', 'When a federal agency stops functioning, who picks up the work, and who pays?', 'Which decisions do you think should be made as close to you as possible, and which should be uniform nationally?'] },
    { id: 'lowballot', title: 'The bottom of the ballot',
      body: 'The offices with the lowest turnout often control the most direct services: water boards, fire districts, utility commissions, judges. Low attention means small, organised groups have outsized influence, and sometimes there is no election at all because nobody files.',
      example: 'In February 2026, Missoula County, Montana declared 12 special-district boards elected by acclamation because candidates were unopposed, and cancelled 15 more because no one filed at all. In Georgia, the obscure Public Service Commission became a referendum on power bills.',
      questions: ['Name every board that can tax your property. If you cannot, where would you find out?', 'Is an uncontested election a sign of satisfaction or of disengagement?', 'What would it take for you to run for one of these seats?'] }
  ],

  /* ---------- Municipal power matrix ---------- */
  local: {
    models: {
      cm: {
        name: 'Council-Manager', share: '40.0% of U.S. municipalities over 2,500 (ICMA 2018)',
        summary: 'Voters elect a council that sets policy and the budget. The council hires a professional city manager to run departments day to day. The mayor, if there is one, usually sits on the council with an equal vote and no veto.',
        flow: [
          { role: 'Voters', does: 'Elect the city council (and sometimes a mayor who sits on it).', elected: true },
          { role: 'City council', does: 'Passes laws, adopts the budget, hires and can fire the manager.', elected: true },
          { role: 'City manager', does: 'Runs departments, hires staff, prepares the budget proposal. Not elected.', elected: false },
          { role: 'Department heads', does: 'Police, public works, planning, finance. Report to the manager.', elected: false }
        ],
        forYou: 'The person running daily operations was not on your ballot. Your leverage is the council: if services fail, the council is who answers for the manager. A mayor in this system often has one vote among several.',
        examples: 'Phoenix, Dallas, San Antonio, San Jose, and Chandler, Arizona.'
      },
      mc: {
        name: 'Mayor-Council', share: '38.0% of U.S. municipalities over 2,500 (ICMA 2018)',
        summary: 'Voters elect a mayor and a council separately. In a “strong mayor” city the mayor is the chief executive, appoints department heads, proposes the budget and can veto council decisions. The council legislates and approves.',
        flow: [
          { role: 'Voters', does: 'Elect the mayor and the council in separate races.', elected: true, arrow: '↓ ↓' },
          { role: 'Mayor', does: 'Chief executive: appoints department heads, proposes the budget, can veto.', elected: true },
          { role: 'City council', does: 'Passes laws, approves the budget and appointments, can override vetoes.', elected: true },
          { role: 'Department heads', does: 'Appointed by and answer to the mayor.', elected: false }
        ],
        forYou: 'The mayor is directly accountable for how the city runs, which makes mayoral races high-stakes. Separation of powers also means budget fights between mayor and council are built into the system.',
        examples: 'New York, Los Angeles, Houston, Chicago, and Washington, D.C.'
      }
    },
    mayors: [
      { city: 'Los Angeles, CA', date: 'Jun / Nov 3', incumbent: 'Karen Bass (D)', winner: 'Nithya Raman (DSA member; nonpartisan race)', note: 'Bass led the June primary with 34% to Raman’s 29%, forcing a runoff. NBC projected Raman Nov 5 with 53.9% at 86% of expected vote; Bass conceded. First LA incumbent mayor to lose re-election since 2005.', source: 'https://www.nbclosangeles.com/elections/los-angeles-mayor-election-results-bass-raman/3965846/' },
      { city: 'Washington, D.C.', date: 'Jun 16 / Nov 3', incumbent: 'Muriel Bowser (D), not running', winner: 'Janeese Lewis George (D)', note: 'The city’s first ranked-choice election, under Initiative 83. Won a seven-way primary; AP projected her general-election win. First D.C. mayor associated with democratic-socialist politics.', source: 'https://www.fox5dc.com/news/janeese-lewis-george-elected-dc-mayor-citys-first-democratic-socialist-leader-ap' },
      { city: 'Chandler, AZ', date: 'Jul 21', incumbent: 'Kevin Hartke, term-limited', winner: 'Matt Orlando', note: '58.46% over Republican state Rep. Jeff Weninger in an officially nonpartisan race. One headline described Orlando as “Democrat-backed”; party labels are not on the ballot.', source: 'https://www.chandleraz.gov/news-center/city-chandler-final-primary-election-results' },
      { city: 'Irving, TX', date: 'May 2', incumbent: 'Rick Stopfer, term-limited', winner: 'Albert Zapanta', note: '67.2% on a nonpartisan ballot.', source: 'https://ballotpedia.org/Mayoral_election_in_Irving,_Texas_(2026)' },
      { city: 'Knox County, TN (county mayor)', date: 'Aug 6', incumbent: 'Glenn Jacobs (R), term-limited', winner: 'Betsy Henderson (R)', note: 'A former county school board chair beat Beau Hawk (D), 52.5% to 47.5%.', source: 'https://farragutpress.com/articles/2026/08/15975' },
      { city: 'Boca Raton, FL', date: 'Mar 10', incumbent: 'Scott Singer (R), term-limited', winner: 'Andy Thomson (D)', note: 'Won by five votes over Mike Liebelson (R); a recount confirmed it on March 13.', source: 'https://www.wlrn.org/light/government-politics/2026-03-16/mayor-boca-raton-recount-andy-thomson' },
      { city: 'Waukesha, WI', date: 'Apr 7', incumbent: 'Shawn Reilly (I), not running', winner: 'Alicia Halvensleben', note: '51.15% over Republican Assemblymember Scott Allen in the spring election.', source: 'https://civicmedia.us/news/2026/04/08/halvensleben-edges-gop-lawmaker-in-waukesha-mayoral-upset' },
      { city: 'Fargo, ND', date: 'Jun 9', incumbent: 'Tim Mahoney, not running', winner: 'Josh Boschee', note: 'About 47% in a five-way race; sworn in as Fargo’s first full-time mayor.', source: 'https://kfgo.com/2026/06/10/josh-boschee-elected-mayor-of-fargo/' },
      { city: 'Long Beach, CA', date: 'Jun 2', incumbent: 'Rex Richardson', winner: 'Rex Richardson', note: 'Re-elected outright in the June 2 primary, so no November runoff was needed.', source: 'https://spectrumlocalnews.com/ca/california/in-focus/2026/06/11/long-beach-mayor-rex-richardson' },
      { city: 'Newark, NJ', date: 'May 12', incumbent: 'Ras Baraka', winner: 'Ras Baraka', note: 'Fourth term.', source: 'https://newjerseyglobe.com/campaigns/baraka-wins-fourth-term-as-newark-mayor/' },
      { city: 'Lubbock, TX', date: 'May 2', incumbent: 'Mark McBrayer', winner: 'Mark McBrayer', note: 'Re-elected with 70.3%.', source: 'https://www.fox34.com/2026/05/03/mcbrayer-wins-re-election-lubbock-mayor/' },
      { city: 'Arlington, TX', date: 'May 2', incumbent: 'Jim Ross', winner: 'Jim Ross', note: 'Re-elected, narrowly avoiding a runoff.', source: 'https://news.ballotpedia.org/2026/05/05/incumbent-jim-ross-defeated-steve-cavender-hunter-crow-and-shaun-mallory-in-the-nonpartisan-general-election-for-mayor-of-arlington-texas-on-may-2-2026/' }
    ],
    exportText: '## How local power works\n\nICMA’s 2018 survey covers 10,969 U.S. municipalities with 2,500 or more residents. Council-manager is used by 40.0%, mayor-council by 38.0%, commission by 11.9%, town meeting by 9.6% and representative town meeting by 0.5%. 32% elect some or all council members by ward or district. Women held 27.2% of council seats. 85.9% of municipalities compensate elected officials; full-time mayors average $61,723 a year and part-time mayors $9,286.\n\nCouncil-manager efficiency claims trace to a 2011 IBM benchmarking study of 100 large cities, and ICMA reports that 66% of Moody’s Aaa-rated cities had a professional manager in 2016. Both show association, not cause.\n\nOf the 100 largest cities, Ballotpedia’s November 2026 count is 67 Democratic mayors, 21 Republican, 3 independent, 1 Libertarian, 6 nonpartisan, 1 unaffiliated and 1 unknown; 81% of the top-100 population lived under Democratic mayors at the start of 2026. Twenty-two of those mayoralties were on the ballot in 2026.',
    sources: [
      { label: 'ICMA: Municipal Form of Government by the Numbers', url: 'https://icma.org/blog-posts/municipal-form-government-numbers' },
      { label: 'ICMA: 2018 Municipal Form of Government Survey snapshot', url: 'https://icma.org/sites/default/files/Survey%20Research%20Snapshot_MFOG.pdf' },
      { label: 'ICMA: Professional management and efficiency', url: 'https://icma.org/blog-posts/professional-management-drives-localgov-efficiency-effectiveness' },
      { label: 'ICMA: Bond ratings and professional management', url: 'https://icma.org/blog-posts/bond-ratings-better-cities-where-life-well-run' },
      { label: 'Ballotpedia: Party affiliation of mayors of the 100 largest cities', url: 'https://ballotpedia.org/Party_affiliation_of_the_mayors_of_the_100_largest_cities' }
    ]
  },

  /* ---------- Special districts ---------- */
  districts: {
    stack: {
      assessmentRatio: 1,
      layers: [
        { id: 'county', name: 'County', kind: 'General-purpose government', mills: 5.0, seats: 5, swatch: 'bg-stone', fixed: true },
        { id: 'city', name: 'City', kind: 'General-purpose government', mills: 6.0, seats: 7, swatch: 'bg-lapis', fixed: true },
        { id: 'school', name: 'School district', kind: 'Independent school board', mills: 12.0, seats: 7, swatch: 'bg-lapis-700', on: true },
        { id: 'fire', name: 'Fire protection district', kind: 'Special district · property tax', mills: 2.0, seats: 5, swatch: 'bg-terra', on: true },
        { id: 'water', name: 'Water & sewer district', kind: 'Special district · tax plus user fees', mills: 1.5, seats: 5, swatch: 'bg-verd', on: true },
        { id: 'library', name: 'Library district', kind: 'Special district · property tax', mills: 0.8, seats: 5, swatch: 'bg-ochre', on: false },
        { id: 'hospital', name: 'Hospital district', kind: 'Special district · property tax', mills: 1.2, seats: 5, swatch: 'bg-terra-700', on: false },
        { id: 'mosquito', name: 'Mosquito abatement district', kind: 'Special district · property tax', mills: 0.2, seats: 5, swatch: 'bg-stone-600', on: false }
      ]
    },
    exportText: '## Special districts\n\nThe Census Bureau counted 39,555 special districts among 90,837 local governments in 2022; its 2025 update counts 40,199 of 91,438. The oft-quoted “38,000” is the 2017 figure. By function (2022): fire protection about 6,000 (15.2%); water, sewer and irrigation about 7,700 (19.5%); drainage, flood control and soil conservation about 5,560 (14.1%); other multifunction 5,181 (13.1%); cemeteries, libraries and parks about 4,800 (12.1%); housing and community development 3,304 (8.4%); transportation about 2,140 (5.4%); health and hospitals about 1,580 (4.0%); all other about 3,270 (8.3%). Groupings are this site’s, built from Census function counts.\n\nSome water districts may restrict voting to landowners: the Supreme Court upheld this in Salyer Land Co. v. Tulare Lake Basin (1973) and Ball v. James (1981).\n\nIn February 2026 Missoula County, Montana commissioners declared 12 special-district boards elected by acclamation because candidates were unopposed, and cancelled elections in 15 more where no one filed, leaving those seats to appointment.',
    sources: [
      { label: 'U.S. Census Bureau: 2022 Census of Governments', url: 'https://www.census.gov/library/stories/2023/08/2022-census-of-governments.html' },
      { label: 'Census: Special district governments by function (2022)', url: 'https://www.census.gov/content/dam/Census/library/visualizations/2023/econ/special-district-governments-by-function.pdf' },
      { label: 'Census: Government Units 2025 update', url: 'https://www.census.gov/library/publications/2026/econ/govtorg2225.html' },
      { label: 'Missoula County: Commissioners cancel some special district elections', url: 'https://www.missoulacounty.gov/news/commissioners-cancel-some-special-district-elections-elect-unopposed-candidates-by-acclamation/' },
      { label: 'Cornell LII: Ball v. James (1981)', url: 'https://www.law.cornell.edu/supremecourt/text/451/355' },
      { label: 'Goldwater Institute: How special taxing districts circumvent spending limits', url: 'https://www.goldwaterinstitute.org/out-of-sight-how-special-taxing-districts-circumve/' }
    ]
  },

  /* ---------- Money ---------- */
  money: {
    exportText: '## Following the money\n\nNo national dataset breaks down who funds municipal campaigns by sector; claims of a single national share for real estate or unions in local races have no published basis. The best available evidence is city-level. A MapLight / Common Cause California analysis of San Diego’s 2022 city council races found real estate and construction interests gave about 17% of council campaign funding, and 796 maximum-amount donors, 30% of all donors, gave about 67% of individual contributions.\n\nNationally, the 2026 cycle cost about $12 billion, a record (OpenSecrets estimate as reported). An AFP analysis of federal data found more than $1 billion in outside spending from just five groups by late October. OpenSecrets was formed in 2021 by the merger of the Center for Responsive Politics and the National Institute on Money in Politics (FollowTheMoney.org).',
    sources: [
      { label: 'Common Cause California / MapLight: Big Donor Dominance in San Diego (2024)', url: 'https://www.commoncause.org/california/wp-content/uploads/2024/10/Big-Donor-Dominance-Campaign-Finance-in-San-Diego.pdf' },
      { label: 'Al Jazeera: Midterms cost a record $12bn', url: 'https://www.aljazeera.com/news/2026/11/3/how-us-midterms-have-cost-a-record-12bn-as-cost-of-living-soars' },
      { label: 'Yeni Şafak (AFP): Dark-money super PACs pour $1B into midterm races', url: 'https://en.yenisafak.com/world/dark-money-super-pacs-pour-1b-into-us-midterm-races-3724861' },
      { label: 'Election Law Blog: OpenSecrets merger (2021)', url: 'https://electionlawblog.org/2021/leading-money-in-politics-data-nonprofits-merge-to-form-opensecrets-a-state-of-the-art-democratic-accountability-organization/' },
      { label: 'FollowTheMoney.org (state campaign finance data)', url: 'https://www.followthemoney.org/' },
      { label: 'ProPublica: How to identify suspicious campaign finance records', url: 'https://www.propublica.org/article/reporting-recipe-how-to-identify-suspicious-campaign-finance-records' }
    ]
  },

  /* ---------- Justice ---------- */
  justice: {
    exportText: '## The justice ecosystem\n\nSheriffs are elected county officials who usually run the county jail, patrol unincorporated areas and serve warrants; city police chiefs are appointed by a mayor or manager. State supreme court justices are chosen by assisted appointment (21 states), nonpartisan election (13), partisan election (8), gubernatorial appointment (5), legislative election (2) or Michigan’s hybrid (1), per Ballotpedia. Kansas voters rejected a switch to elections on August 4, 2026.\n\nAbout 78% of people held in U.S. jails in 2024 had not been convicted (Prison Policy Initiative, using federal data); unconvicted is not the same as eligible, but most pretrial detainees keep the right to vote. No national jail turnout figure exists. A court-ordered Massachusetts report found 1% turnout among eligible people in jail in the 2024 primary and 5% in the general. Harris County, Texas opened the state’s first jail polling place on November 2, 2021.',
    sources: [
      { label: 'Ballotpedia: Judicial selection in the states', url: 'https://ballotpedia.org/Judicial_selection' },
      { label: 'Kansas Reflector: Kansans reject supreme court amendment (Aug 2026)', url: 'https://kansasreflector.com/2026/08/04/early-results-show-kansans-rejecting-constitutional-amendment-by-wide-margin/' },
      { label: 'Prison Policy Initiative: Mass Incarceration: The Whole Pie 2026', url: 'https://www.prisonpolicy.org/reports/pie2026.html' },
      { label: 'Campaign Legal Center: Court-ordered report on low voting rates in jails', url: 'https://campaignlegal.org/index%2ephp/press-releases/court-ordered-report-reveals-low-voting-rates-jails-highlights-need-more-voter' },
      { label: 'Texas Public Radio: Harris County jail used as polling place (2021)', url: 'https://www.tpr.org/government-politics/2021-11-02/the-harris-county-jail-was-used-as-a-polling-place-for-eligible-incarcerated-voters-on-tuesday' },
      { label: 'Center for Public Integrity: Voters in jail face de facto disenfranchisement', url: 'https://publicintegrity.org/politics/elections/who-counts/voters-in-jail-face-de-facto-disenfranchisement/' }
    ]
  },

  /* ---------- RCV ---------- */
  rcv: {
    candidates: [
      { id: 'A', name: 'Alvarez', swatch: 'bg-verd' },
      { id: 'B', name: 'Brooks', swatch: 'bg-lapis' },
      { id: 'C', name: 'Chen', swatch: 'bg-ochre' },
      { id: 'D', name: 'Diallo', swatch: 'bg-terra' }
    ],
    scenarios: {
      spoiler: { label: 'Split field', note: 'Brooks leads on first choices, but most voters who prefer someone else rank Alvarez above Brooks. Watch where the eliminated ballots go.',
        blocs: [
          { label: 'Brooks supporters', size: 40, ranking: ['B', 'C', 'D', 'A'] },
          { label: 'Alvarez supporters', size: 31, ranking: ['A', 'C', 'D', 'B'] },
          { label: 'Chen supporters', size: 19, ranking: ['C', 'A', 'D', 'B'] },
          { label: 'Diallo supporters', size: 10, ranking: ['D', 'C', 'A', 'B'] }
        ] },
      squeeze: { label: 'Center squeeze', note: 'Chen is almost everyone’s second choice, yet has the fewest first choices and is eliminated first. Ranked choice is not a cure-all; this is the standard critique.',
        blocs: [
          { label: 'Alvarez supporters', size: 36, ranking: ['A', 'C', 'B', 'D'] },
          { label: 'Brooks supporters', size: 34, ranking: ['B', 'C', 'A', 'D'] },
          { label: 'Chen supporters (lean Alvarez)', size: 16, ranking: ['C', 'A', 'B', 'D'] },
          { label: 'Chen supporters (lean Brooks)', size: 14, ranking: ['C', 'B', 'A', 'D'] }
        ] },
      exhaust: { label: 'Exhausted ballots', note: 'Many Diallo voters rank only one candidate. When Diallo is eliminated those ballots stop counting, so the winner can finish with a majority of continuing ballots but not of all ballots.',
        blocs: [
          { label: 'Brooks supporters', size: 38, ranking: ['B', 'A', null, null] },
          { label: 'Alvarez supporters', size: 35, ranking: ['A', 'C', null, null] },
          { label: 'Diallo bullet voters', size: 15, ranking: ['D', null, null, null] },
          { label: 'Chen supporters', size: 12, ranking: ['C', 'A', 'B', null] }
        ] },
      majority: { label: 'First-round majority', note: 'When one candidate wins more than half of first choices, ranked choice ends in round one, exactly like a normal election.',
        blocs: [
          { label: 'Alvarez supporters', size: 55, ranking: ['A', 'C', 'B', 'D'] },
          { label: 'Brooks supporters', size: 25, ranking: ['B', 'C', 'A', 'D'] },
          { label: 'Chen supporters', size: 12, ranking: ['C', 'A', 'B', 'D'] },
          { label: 'Diallo supporters', size: 8, ranking: ['D', 'B', 'C', 'A'] }
        ] }
    },
    exportText: '## Ranked choice voting\n\nVoters rank candidates. If no one has more than half of first choices, the last-place candidate is eliminated and those ballots move to each voter’s next choice still in the race; this repeats until someone has a majority of the ballots still counting. FairVote counts 16 jurisdictions using it in 2026, including Alaska, Maine, New York City and San Francisco. Washington, D.C. used it for the first time in its June 16, 2026 primary under Initiative 83.\n\nNovember 2026 measures: Longmont, Colorado adopted it with about 56%. Irvine, California’s measure was leading but uncalled. Honolulu rejected it: 40.6% yes, 50.5% no, 8.8% blank, which is 44.6% yes among votes cast on the question. Alaska’s repeal measure was losing with about 52% voting no on election night; absentee ballots count for 15 days. FairVote reports 79% of jurisdictions (31 of 39) release round-by-round results within 24 hours.',
    sources: [
      { label: 'FairVote: Where RCV is used in 2026', url: 'https://fairvote.org/where-will-ranked-choice-voting-be-used-in-the-2026-elections/' },
      { label: 'FairVote: Longmont votes to adopt RCV', url: 'https://fairvote.org/longmont-co-votes-to-adopt-ranked-choice-voting/' },
      { label: 'Hawaii Office of Elections: Honolulu results (PDF)', url: 'https://elections.hawaii.gov/wp-content/results/2026%20General/cch.pdf' },
      { label: 'Alaska Public Media: Early results reject RCV repeal', url: 'https://alaskapublic.org/news/politics/elections/2026-11-03/early-results-show-alaskans-rejecting-ranked-choice-voting-repeal' },
      { label: 'FairVote: 79% of jurisdictions release results within 24 hours', url: 'https://fairvote.org/79-of-jurisdictions-release-rcv-results-within-24-hours/' },
      { label: 'WTOP: Understanding RCV ahead of D.C.’s debut', url: 'https://wtop.com/dc-election/2026/06/understanding-ranked-choice-voting-ahead-of-its-dc-debut-in-june-primary/' }
    ]
  },

  /* ---------- Charts (all values sourced; see each panel's source list) ---------- */
  charts: [
    { panel: 'insights', canvas: 'chart-wave', horizontal: true, stacked: true, unit: 'seats',
      labels: ['Senate before', 'Senate after', 'Governors before', 'Governors after'],
      series: [
        { label: 'Democratic', data: [47, 54, 24, 28], color: 'primary' },
        { label: 'Republican', data: [53, 44, 26, 20], color: 'error' },
        { label: 'Uncalled (Nov 6)', data: [0, 2, 0, 2], color: 'stone' }
      ] },
    { panel: 'local', canvas: 'chart-forms', horizontal: true, unit: '%',
      labels: ['Council-manager', 'Mayor-council', 'Commission', 'Town meeting', 'Representative town meeting'],
      series: [{ label: 'Share of municipalities over 2,500', data: [40.0, 38.0, 11.9, 9.6, 0.5], color: 'primary' }] },
    { panel: 'local', canvas: 'chart-mayors', horizontal: true, unit: 'mayors',
      labels: ['Democratic', 'Republican', 'Nonpartisan', 'Independent', 'Libertarian', 'Unaffiliated', 'Unknown'],
      series: [{ label: 'Mayors of the 100 largest cities', data: [67, 21, 6, 3, 1, 1, 1], color: 'secondary' }] },
    { panel: 'districts', canvas: 'chart-districts', horizontal: true, unit: 'districts',
      labels: ['Water, sewer & irrigation', 'Fire protection', 'Drainage, flood & soil conservation', 'Other multifunction', 'Cemeteries, libraries & parks', 'Housing & community development', 'Transportation', 'Health & hospitals', 'All other'],
      series: [{ label: 'Special districts, 2022', data: [7714, 6003, 5559, 5181, 4799, 3304, 2144, 1583, 3268], color: 'tertiary' }] },
    { panel: 'money', canvas: 'chart-sandiego', horizontal: true, stacked: true, unit: '%',
      labels: ['Share of donors', 'Share of individual dollars'],
      series: [
        { label: 'Maximum-amount donors (796)', data: [30, 67], color: 'error' },
        { label: 'All other donors', data: [70, 33], color: 'stone' }
      ] },
    { panel: 'justice', canvas: 'chart-courts', horizontal: true, unit: 'states',
      labels: ['Assisted appointment (merit selection)', 'Nonpartisan election', 'Partisan election', 'Governor appointment', 'Legislative election', 'Michigan hybrid'],
      series: [{ label: 'States, by how supreme court justices are chosen', data: [21, 13, 8, 5, 2, 1], color: 'on-surface' }] }
  ]
};
