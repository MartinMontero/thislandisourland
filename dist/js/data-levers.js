/* Build power: "Pick your lever" guide and the winners scorecard.
   Facts were re-read at the cited pages on November 19, 2026 (see research/build-power-levers.md).
   Directory tools are referenced by id and resolved from D.buildpower.records at run time. */
(function (M) {
  var BP = 'https://news.ballotpedia.org/2026/10/26/nine-states-are-holding-public-service-commission-elections-in-2026-with-two-expected-to-be-battlegrounds/';
  var MN = 'https://mn.gov/puc/activities/financial-analysis/general-rate-case/';
  var AR = 'https://apsc.arkansas.gov/consumer-services/the-rate-case-process/';
  var ABA = 'https://www.americanbar.org/groups/state_local_government/resources/urban-lawyer/50-2/home-rule-state-preemption-local-land-use-control/';
  var NGA = 'https://www.nga.org/governors/powers-and-authority/';
  var SNOM = 'https://www.senate.gov/about/powers-procedures/nominations.htm';
  var SINV = 'https://www.senate.gov/about/powers-procedures/investigations.htm';
  var SFIL = 'https://www.senate.gov/about/powers-procedures/filibusters-cloture.htm';
  var CONST = 'https://www.archives.gov/founding-docs/constitution-transcript';
  var RCFP = 'https://www.rcfp.org/open-government-guide/';
  var USA1 = 'https://www.usa.gov/state-local-governments';
  var USA2 = 'https://www.usa.gov/elected-officials';

  M.levers = {
    asOf: 'November 19, 2026',

    /* The ten states whose voters elect the utility commission (Ballotpedia). */
    elected: {
      'Alabama': { name: 'Alabama Public Service Commission', url: 'https://psc.alabama.gov/' },
      'Arizona': { name: 'Arizona Corporation Commission', url: 'https://azcc.gov/' },
      'Georgia': { name: 'Georgia Public Service Commission', url: 'https://psc.ga.gov/' },
      'Louisiana': { name: 'Louisiana Public Service Commission', url: 'https://www.lpsc.louisiana.gov/' },
      'Mississippi': { name: 'Mississippi Public Service Commission', url: 'https://www.psc.ms.gov/' },
      'Montana': { name: 'Montana Public Service Commission', url: 'https://psc.mt.gov/' },
      'Nebraska': { name: 'Nebraska Public Service Commission', url: 'https://psc.nebraska.gov/' },
      'North Dakota': { name: 'North Dakota Public Service Commission', url: 'https://www.psc.nd.gov/' },
      'Oklahoma': { name: 'Oklahoma Corporation Commission', url: 'https://oklahoma.gov/occ.html' },
      'South Dakota': { name: 'South Dakota Public Utilities Commission', url: 'https://puc.sd.gov/' }
    },
    states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],

    issues: [
      { id: 'power', label: 'My electric bill or a data center nearby', kw: 'public comment',
        rows: [
          { q: 'Who has the vote?', a: 'Every state has a utility commission. It is the main regulator of utilities, including energy, telecommunications and water. It sets what regulated utilities may charge through a proceeding called a rate case.', src: [['Ballotpedia News', BP]] },
          { q: 'How do they get the job?', a: '', state: true },
          { q: 'How a rate case works', a: 'In Arkansas, if the commission does not act within 30 days of a filing, the proposed increase takes effect automatically unless the commission suspends it (for up to nine months). The utility asks to raise its rates. The commission reviews the request, often for about 10 months (Minnesota and Arkansas both say so; other states differ). Public hearings take comment. The commission then decides. A utility may collect temporary rates that are refunded if the final rates come in lower (Minnesota).', src: [['Minnesota PUC', MN], ['Arkansas PSC', AR]] },
          { q: 'Not every utility is covered', a: 'In Minnesota the commission does not regulate city-owned utilities or cooperatives unless a cooperative opts in. Check on your bill who your utility is, then ask which body regulates it.', src: [['Minnesota PUC', MN]] },
          { q: 'Where the data center itself is decided', a: 'Where it may be built is usually a local land-use decision, but a state can override local rules. Use the housing and zoning path for that part.', src: [['Stahl, The Urban Lawyer (ABA)', ABA]] },
          { q: 'How to get a seat', a: 'You can comment at hearings without becoming a formal party. “Intervenors” are formal parties who can testify and question witnesses; that takes more time and usually a lawyer or an experienced group.', src: [['Minnesota PUC', MN]] }
        ],
        first: 'Find your utility’s name on your bill, find the commission that regulates it, and look on its website for open rate cases and hearing dates.',
        tools: ['public-comment', 'cci-cba-toolkit', 'ballotpedia-datacenters'],
        gap: 'The Build power directory has no group or tool built for rate-case work, so we do not point to one. If you know a good one, suggest it.' },

      { id: 'land', label: 'Housing, zoning or a development near me', kw: 'tenant',
        rows: [
          { q: 'Who has the vote?', a: 'Local governments have historically made most land-use decisions: a city or county council, often advised by a planning or zoning board. Whether those board members are elected or appointed varies, so check your city charter or the board’s page.', src: [['Stahl, The Urban Lawyer (ABA)', ABA]] },
          { q: 'Who can say no?', a: 'The state. One legal scholar concludes that home rule does not protect local land-use decisions from state preemption, meaning a state can override them. That is his argument about the law, not a settled ruling in every state. He is a Chapman University land-use law professor who also works for developers, and most of his examples come from California. He is arguing for state override of local housing rules.', src: [['Stahl, The Urban Lawyer (ABA)', ABA]] },
          { q: 'Where it is written down', a: 'Meeting agendas, minutes and staff reports. State open-meetings laws govern notice and public access, and the details differ by state. Rules vary a lot. Texas requires a meeting notice to be posted at least 72 hours ahead, in a place the public can reach. Wyoming requires no notice of regular meetings beyond a published schedule (eight hours for special meetings). North Carolina requires a published schedule for regular meetings and 48 hours’ notice for special meetings. Arkansas sets no time limit for regular-meeting notice. The Reporters Committee’s guide has a section for each of the 50 states and D.C.', src: [['Reporters Committee', RCFP]] },
          { q: 'How to get a seat', a: 'Public comment at the meeting where the vote happens, written comment before it, a seat on a board or commission, or a tenants’ or neighbors’ group that shows up every time.' }
        ],
        first: 'Find the next meeting agenda of the board that would decide it and read the item before the meeting. Sign up to comment.',
        tools: ['public-comment', 'boards-commissions', 'local-budget'],
        page: ['local', 'How local government is built (Local power)'] },

      { id: 'district', label: 'Water, fire, parks or another special district', kw: 'local government',
        rows: [
          { q: 'Who has the vote?', a: 'A board for the district. The Census Bureau counted 39,555 special districts among 90,837 local governments in 2022.', src: [['Census of Governments, as summarized on the Shadow districts page', '#districts']] },
          { q: 'How do they get the job?', a: 'It varies by district: some boards are elected, some appointed. Some water districts may limit voting to landowners (the Supreme Court upheld this in 1973 and 1981). In February 2026 Missoula County, Montana declared 12 district boards elected by acclamation because no one challenged them, and cancelled 15 more races where no one filed.' },
          { q: 'How to find yours', a: 'Ask your county elections office which districts appear on your ballot, and check your property-tax bill and the county assessor for the districts that tax your address.' },
          { q: 'How to get a seat', a: 'Attend the board’s meetings, ask for the budget, and consider filing for a seat: some of these races have no candidates.' }
        ],
        first: 'Ask your county elections office for the list of districts on your ballot, then pick one and read its last budget.',
        tools: ['boards-commissions', 'local-budget', 'public-comment'],
        page: ['districts', 'The full map of special districts (Shadow districts)'] },

      { id: 'state', label: 'A state law or the state budget', kw: 'bill',
        rows: [
          { q: 'Who has the vote?', a: 'The state legislature writes laws and the budget. The governor proposes a budget, can propose bills, and can veto. In a number of states the governor can also veto single items in an appropriations bill (line-item veto).', src: [['National Governors Association', NGA]] },
          { q: 'Who can say no?', a: 'The governor, by veto. The legislature can usually override a veto by a supermajority. Many gubernatorial appointments need legislative confirmation. The scope of a governor’s powers varies by state.', src: [['National Governors Association', NGA]] },
          { q: 'How to find your officials', a: 'USAGov lists state governments, governors and state legislators.', src: [['USAGov: state and local governments', USA1], ['USAGov: elected officials', USA2]] },
          { q: 'How to get a seat', a: 'Track the bill, testify at the committee hearing, and send short, specific messages to the committee members who decide.' },
          { q: 'Check before you count on it', a: 'A governor who shares a party with both legislative chambers has fewer people able to say no. The 2026 results changed that map in several states. Ballotpedia’s trifectas page tracks it, and North Carolina was still undetermined on November 18.', src: [['Ballotpedia: State government trifectas', 'https://ballotpedia.org/State_government_trifectas']] }
        ],
        first: 'Pick one bill. Sign up for alerts on it, find its committee, and note the hearing date.',
        tools: ['open_states_plural', 'legiscan', 'billtrack50'],
        page: ['insights/i-power', 'Who can say no, in more detail (Insights)'] },

      { id: 'federal', label: 'A federal law, a nominee or an investigation', kw: 'Regulations.gov',
        rows: [
          { q: 'Who has the vote?', a: 'Congress writes laws. All bills for raising revenue start in the House, and no money leaves the Treasury except through appropriations passed by law.', src: [['The Constitution (National Archives)', CONST]] },
          { q: 'Nominees', a: 'The president nominates federal judges and many officers. They need the Senate’s advice and consent.', src: [['Senate.gov: Nominations', SNOM]] },
          { q: 'Investigations', a: 'Congress’s power to investigate is an implied constitutional power that the Supreme Court has treated as essential to lawmaking. The House alone has the power of impeachment.', src: [['Senate.gov: Investigations', SINV], ['The Constitution (National Archives)', CONST]] },
          { q: 'Who can say no?', a: 'Ending debate on most Senate bills takes 60 of 100 votes, so a 56-seat majority still needs help. A presidential veto takes two-thirds of each chamber to override.', src: [['Senate.gov: Filibusters and cloture', SFIL], ['The Constitution (National Archives)', CONST]] },
          { q: 'How to get a seat', a: 'Track the bill, contact your members, and comment on proposed federal rules; Regulations.gov is where agencies post them.' }
        ],
        first: 'Set up an alert for one bill, or find a proposed rule on your issue and read the comment instructions.',
        tools: ['congress-alerts', 'govtrack', 'regulations_gov'],
        page: ['insights/i-power', 'The ceilings that limit a landslide (Insights)'] }
    ],

    /* Scorecard */
    statuses: [
      { v: '', label: 'Not checked yet' },
      { v: 'not-started', label: 'Nothing yet' },
      { v: 'moving', label: 'In motion' },
      { v: 'done', label: 'Done' },
      { v: 'reversed', label: 'Went the other way' },
      { v: 'unclear', label: 'Can’t tell' }
    ],
    blocks: [
      { v: '', label: 'Why? (optional)' },
      { v: 'no-try', label: 'They have not tried' },
      { v: 'blocked', label: 'Someone else can block it' },
      { v: 'outside', label: 'It is outside their power' },
      { v: 'slow', label: 'It is slow, not stopped' }
    ],
    levers: {
      governor: { title: 'What a governor can use', body: 'Executive orders, a budget proposal, bills they ask the legislature to pass, vetoes (and in a number of states, line-item vetoes), and appointments, many of which need legislative confirmation. A legislature can usually override a veto with a supermajority. The scope varies by state.', look: 'Look for: a line in the budget, an executive order, a bill signed or vetoed, an agency head appointed.', src: [['National Governors Association', NGA]] },
      senate: { title: 'What a senator can use', body: 'A vote on laws and on the president’s nominees, work in committees, and the power of Congress to investigate. Laws need a majority of the Senate, and ending debate on most bills needs 60 votes.', look: 'Look for: a bill introduced and who co-sponsored it, a committee vote, a floor vote, a nominee confirmed or rejected, a hearing held.', src: [['Senate.gov: Filibusters and cloture', SFIL], ['Senate.gov: Nominations', SNOM], ['Senate.gov: Investigations', SINV]] },
      house: { title: 'What a House member can use', body: 'A vote on laws, work in committees, and the House’s sole power of impeachment. All revenue bills start in the House. Laws need a majority of the House, so one member rarely decides alone.', look: 'Look for: a bill introduced and its co-sponsors, a committee vote or hearing, a floor vote, an amendment added to a larger bill.', src: [['The Constitution (National Archives)', CONST], ['Senate.gov: Investigations', SINV]] },
      municipal: { title: 'What a mayor can use', body: 'A mayor’s powers depend on the form of government in the city: some mayors run the city day to day, others are one member of a council that hires a manager. Check the city charter.', look: 'Look for: a line in the city budget, an item on a council agenda, an ordinance passed, a department head appointed.', src: [['The Local power page on this site', '#local']] }
    },

    sources: [
      { label: 'Ballotpedia News: Nine states hold public service commission elections in 2026', url: BP },
      { label: 'Ballotpedia: Public service commission elections, 2026', url: 'https://ballotpedia.org/Public_service_commission_elections,_2026' },
      { label: 'Minnesota Public Utilities Commission: General rate cases', url: MN },
      { label: 'Arkansas Public Service Commission: The rate case process', url: AR },
      { label: 'Stahl, “Home Rule and State Preemption of Local Land Use Control,” The Urban Lawyer (ABA, 2020)', url: ABA },
      { label: 'National Governors Association: Governors’ powers and authority', url: NGA },
      { label: 'Senate.gov: About nominations', url: SNOM },
      { label: 'Senate.gov: About investigations', url: SINV },
      { label: 'Senate.gov: About filibusters and cloture', url: SFIL },
      { label: 'National Archives: The Constitution (transcription)', url: CONST },
      { label: 'Reporters Committee: Open Government Guide (state open-meetings laws)', url: RCFP },
      { label: 'USAGov: State and local governments', url: USA1 },
      { label: 'USAGov: Find and contact elected officials', url: USA2 },
      { label: 'Ballotpedia: State government trifectas', url: 'https://ballotpedia.org/State_government_trifectas' }
    ]
  };
})(window.MOSAIC);
