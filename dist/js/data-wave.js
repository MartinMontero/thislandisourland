/* The wave: who, why and how the 2026 midterms broke the way they did.
   Checked against sources retrieved Nov 8, 2026. Quotes are kept under 15 words, one per source article. */
(function (M) {
  M.wave = {
    stats: [
      { value: '+13', label: 'Democratic margin in the national House popular vote', source: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/', src: 'Brookings' },
      { value: '7+', label: 'Senate seats flipped, including Kansas for the first time since 1932 and Texas for the first time since 1988', source: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/', src: 'Brookings' },
      { value: '28+', label: 'Democratic governors, the party’s first majority of governorships since 2006', source: 'https://www.clickondetroit.com/news/politics/2026/11/02/democrats-press-to-win-a-majority-of-governors-offices-in-midterms-after-power-struggles-with-trump/', src: 'AP' },
      { value: '$4.15', label: 'Average price of gas on Election Day, the highest on any Election Day', source: 'https://fortune.com/2026/11/06/gas-prices-midterm-election-iran-war-incumbents', src: 'Fortune' },
      { value: '89%', label: 'Americans who say corruption in government is widespread, up from 73% in 2024', source: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/', src: 'Gallup via Brookings' },
      { value: '$474M', label: 'Elon Musk’s political giving this cycle, a record for anyone not funding their own campaign. His biggest bet lost.', source: 'https://thenextweb.com/news/musk-midterm-donations-474m-record-new-york-times', src: 'NYT via TNW' }
    ],

    shiftChart: {
      labels: ['Hispanic voters', 'Independents', 'Voters under 30', 'Black voters', 'White voters without a degree'],
      y2024: [48, 48, 39, 15, 64],
      y2026: [29, 38, 28, 8, 60],
      source: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/'
    },

    forces: [
      { id: 'kitchen', title: 'The kitchen table', kicker: 'Prices, tariffs and a war at the pump',
        body: 'The most consistent thread in the coverage is money people could feel. Trump’s approval averaged about 39%, and voters tied high prices to tariffs, which hurt farm exports, and to the Iran war, which pushed up gas and diesel. In Kansas, diesel and beef prices hit the farm economy, and Sen. Roger Marshall was quoted saying national security was “even more important than your pocketbook.” He lost a state Trump carried by 16 points.',
        evidence: ['Gas averaged $4.15 on Election Day, the highest on any Election Day (Fortune).', 'About half of voters called cost of living crucial to their vote (AP Voter Poll).', 'Kansas, Iowa and Ohio all elected Democrats statewide (Brookings).'],
        voice: { who: 'Dr. Annie Andrews, South Carolina, on a farmer she met', quote: 'it cost $1900 to fill up her tractor with diesel', source: 'https://www.youtube.com/watch?v=YVzSkj62cXM' },
        sources: [
          { label: 'Brookings: How Democrats won big', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
          { label: 'NBC News: Hamilton unseats Marshall in Kansas', url: 'https://www.nbcmiami.com/elections/kansas-senate-race-2026-adam-hamilton-roger-marshall/3883286/' },
          { label: 'Fortune: Gas prices and the midterms', url: 'https://fortune.com/2026/11/06/gas-prices-midterm-election-iran-war-incumbents' }
        ] },
      { id: 'corruption', title: 'Corruption', kicker: 'The issue that cut across party',
        body: 'Gallup found 89% of Americans now call government corruption widespread, up from 73% in 2024, and 36% of respondents in a CNBC poll named it their top issue. Brookings points to the president’s reported $2.2 billion in 2025 income, more than half from crypto. Jon Ossoff built his re-election in Georgia around it: a ban on members of Congress trading stocks, a constitutional amendment to limit corporate money in campaigns, and attacks on the First Family’s rising wealth.',
        evidence: ['About half of voters called corruption crucial to their vote, tied with cost of living (AP Voter Poll).', 'Roy Cooper opened his North Carolina victory speech on corruption.', 'Ossoff outraised his opponent more than 10 to 1 (WSB-TV).'],
        voice: { who: 'Sen. Jon Ossoff, Georgia', quote: 'It is a moral corruption, the cynical indifference of powerful people.', source: 'https://newschannel9.com/news/local/georgia-sen-jon-ossoff-wins-reelection-defeating-rep-mike-collins-to-hold-a-key-seat' },
        sources: [
          { label: 'Brookings: How Democrats won big', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
          { label: 'OPB/AP: Ossoff wins re-election', url: 'https://www.opb.org/article/2026/11/03/georgia-sen-jon-ossoff-wins-reelection-defeating-rep-mike-collins-to-hold-a-key-democratic-seat/' },
          { label: 'WSB-TV: Ossoff’s campaign on corruption', url: 'https://www.wsbtv.com/news/local/atlanta/georgia-election-2026-jon-ossoff-wins-reelection-hold-senate-seat/HQ4YM7U3V5GURNJ7SEZOYEUTZM/?outputType=amp' },
          { label: 'PBS/AP Voter Poll', url: 'https://www.pbs.org/newshour/politics/how-trump-and-republicans-lost-the-2026-midterm-elections-according-to-ap-voter-poll' }
        ] },
      { id: 'oligarchy', title: 'Oligarchy', kicker: 'Billionaire money against the voters',
        body: 'Elon Musk gave $474 million this cycle, more than any donor in history who was not funding their own campaign. About $212 million went behind Ken Paxton in Texas, who lost by about 12 points. Outside Texas, Musk’s America PAC put its largest Senate sums into Ohio, Michigan, Iowa and Maine; Democrats won all four. Winners named the target directly. Troy Jackson told Maine voters Susan Collins had fought for “the billionaire class.” Annie Andrews described politics dominated by billionaires and special interests.',
        evidence: ['Musk’s Texas total was about $224 million (New York Times count).', 'Spending does not prove cause: these races also had weak opponents and a national wave.', 'California’s billionaire tax was losing despite the anti-billionaire mood (see “Where the frame breaks”).'],
        voice: { who: 'James Talarico, Texas', quote: 'All the money in the world is no match for the people of Texas.', source: 'https://www.aljazeera.com/news/2026/11/4/talarico-wins-texas-senate-race-ending-decades-of-republican-dominance' },
        sources: [
          { label: 'TNW / New York Times: Musk’s record $474M', url: 'https://thenextweb.com/news/musk-midterm-donations-474m-record-new-york-times' },
          { label: 'El Cronista: Races Musk’s money lost', url: 'https://www.cronista.com/en/today/worst-investment-ever-elon-musk-spent-474-million-to-keep-congress-republican-here-are-all-the-races-he-lost-including-texas/' },
          { label: 'NBC News: Jackson defeats Collins', url: 'https://www.nbcchicago.com/elections/maine-senate-race-2026-troy-jackson-susan-collins-2/4012117/?amp=1' },
          { label: 'News 5 Cleveland: Andrews’ victory remarks', url: 'https://www.news5cleveland.com/politics/america-votes/democrat-annie-andrews-notches-upset-win-in-south-carolina-senate-race' }
        ] },
      { id: 'tech', title: 'The tech broligarchy', kicker: 'Silicon Valley money, AI and the data center revolt',
        body: 'The San Francisco Standard called the result a repudiation of Silicon Valley as well as the administration: Musk and venture capitalists Marc Andreessen and Ben Horowitz spent historic sums and watched their candidates lose, while AI-safety candidates and data center critics won. In Ohio, Sherrod Brown called Sen. Jon Husted “the face of data centers” and beat him. A leaked Republican memo described the issue as the anchor around Husted’s neck. About three-quarters of voters oppose a data center in their own community, including majorities in red states.',
        evidence: ['More than $380 million in TV ads mentioned data centers (AP).', 'Local data center restrictions passed in 44 of 45 completed votes (Redbud Consulting via AP).', 'In Georgia, Democrats took control of the utility commission that sets power rates.'],
        sources: [
          { label: 'SF Standard: Silicon Valley’s spending spree meets a blue wave', url: 'https://sfstandard.com/2026/11/04/silicon-valley-s-political-spending-spree-meets-blue-wave-data-center-revolt/' },
          { label: 'WUNC/NPR: Brown wins Ohio', url: 'https://www.wunc.org/2026-11-03/democrat-sherrod-brown-wins-ohio-senate-race' },
          { label: 'ABC News/AP: Data centers took a beating', url: 'https://abcnews.com/Technology/wireStory/data-centers-beating-midterm-elections-reckoning-ahead-tech-137902293' }
        ] },
      { id: 'health', title: 'Health care', kicker: 'The Medicaid cuts came due',
        body: 'The 2025 Republican tax and spending law cut Medicaid, and 2026 campaigns made it concrete. Adam Hamilton hit Sen. Marshall over the cuts in Kansas; Troy Jackson attacked Collins for voting to advance the bill. Four winners with medical degrees ran partly on it. After the election, members from every Democratic faction named reversing the Medicaid cuts and extending Affordable Care Act subsidies as common ground.',
        evidence: ['Sen. Marshall, a physician, faced reporting that he had sued hundreds of patients over unpaid bills (NBC News).', 'California’s Prop 40 was written to backfill about $100 billion in federal health cuts.', 'See the Healer Caucus insight for the medical-degree winners.'],
        voice: { who: 'Rep.-elect Randy Villegas, California', quote: 'move forward aggressively to reverse the Medicaid cuts', source: 'https://www.ajc.com/news/2026/11/democrats-victory-was-clear-the-partys-future-is-not/' },
        sources: [
          { label: 'NBC News: Hamilton unseats Marshall', url: 'https://www.nbcwashington.com/elections/kansas-senate-race-2026-adam-hamilton-roger-marshall/4176978/?amp=1' },
          { label: 'AP via AJC: Democrats’ victory was clear; the party’s future is not', url: 'https://www.ajc.com/news/2026/11/democrats-victory-was-clear-the-partys-future-is-not/' },
          { label: 'ABC7: What Prop 40 would fund', url: 'https://abc7news.com/post/live-election-results-california-voters-decide-proposition-40-billionaire-tax/20012875/' }
        ] },
      { id: 'power', title: 'Power without checks', kicker: 'War, ICE and a Congress that would not push back',
        body: 'About 7 in 10 voters said Congress was not doing enough to check the president, including about 4 in 10 Republicans. Brookings reports that voters credited Trump on border security, but a majority said ICE conduct, especially big-city raids, had gone too far. Senate challengers attacked incumbents who would not use their power: Kansas Democrats noted Marshall repeatedly voted against resolutions to halt the Iran war without congressional authorization.',
        evidence: ['All four Senate candidates Trump backed in contested primaries, in Texas, Georgia, North Carolina and South Carolina, lost in November (Brookings).', 'In her victory speech Peggy Flanagan said “we will rip ICE apart” and “have the opportunity to replace it with an immigration system that is grounded in public safety for everybody.”'],
        sources: [
          { label: 'PBS/AP Voter Poll: how key groups voted', url: 'https://www.pbs.org/newshour/politics/ap-voter-poll-how-key-demographic-groups-voted-in-the-2026-midterms' },
          { label: 'Brookings: How Democrats won big', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
          { label: 'NBC News: Kansas Senate race', url: 'https://www.nbcmiami.com/elections/kansas-senate-race-2026-adam-hamilton-roger-marshall/3883286/' }
        ] }
    ],

    who: [
      { title: 'Most Republicans who left stayed home', body: 'Only about 6% of Republicans crossed over to vote Democratic in House races. In Texas, Greg Abbott’s vote fell about 30% from Trump’s 2024 total while Gina Hinojosa beat Kamala Harris’s 2024 Texas vote by about 8%. The wave was built more from discontented Republicans not voting than from Republicans switching.', src: 'Brookings', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
      { title: 'Some conservatives did switch, visibly', body: 'Kansas elected Adam Hamilton, a Methodist pastor who was a registered Republican until this year, with endorsements from former Republican Govs. Bill Graves and Mike Hayden. Maine elected Troy Jackson, a logger who first ran for office as a Republican in 2000. Ossoff described his coalition as including “an ever-growing number of Republicans.”', src: 'NBC News, AJC', url: 'https://www.nbcboston.com/elections/kansas-senate-race-2026-adam-hamilton-roger-marshall/4043176/?amp=1' },
      { title: 'Independents and the young swung hardest', body: 'Republicans won 48% of independents in 2024 and 38% in 2026; 39% of voters under 30 in 2024 and 28% in 2026. The AP Voter Poll found about 7 in 10 under-30 voters backed Democrats.', src: 'Brookings, AP', url: 'https://www.pbs.org/newshour/politics/ap-voter-poll-how-key-demographic-groups-voted-in-the-2026-midterms' },
      { title: 'Hispanic voters reversed 2024', body: 'Trump won 48% of Hispanic voters in 2024; Republican House candidates won 29% in 2026. Democrats won 30 heavily Hispanic House districts, a net gain of 12.', src: 'Brookings', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
      { title: 'Rural America moved, if not all the way', body: 'Democrats netted at least seven of 20 swing rural House seats and won statewide in Iowa, Ohio and Kansas. Among white voters without a college degree the shift was small: 64% Republican in 2024, 60% in 2026.', src: 'Brookings', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
      { title: 'Moderates and socialists both grew', body: 'About half of Democratic House voters called themselves moderate, up from about 4 in 10 in 2018 through 2024. At the same time, about a third of Democratic voters identified as democratic socialists, including just under half of those under 30. The coalition widened in both directions at once.', src: 'AP Voter Poll', url: 'https://www.ksat.com/news/politics/2026/11/05/democrats-victory-was-clear-the-partys-future-is-not/' }
    ],

    playbook: [
      { title: 'Name who is at the top', body: 'Winners named an adversary above the voter rather than across the aisle: billionaires, corrupt insiders, “the billionaire class.” Talarico framed the whole election as top versus bottom, told the people at the top “We will not be conquered,” and ended his speech with “Texas, it’s time to start flipping tables.”' },
      { title: 'Make it something you can touch', body: 'Water in Corpus Christi, where the reservoir fell to 8% and Talarico won by 12 points. Power bills in Ohio. Grocery taxes in Georgia. Insulin caps in Omaha. Abstract fights became household costs.' },
      { title: 'Run people from ordinary working lives', body: 'A fifth-generation logger in Maine, a pastor in Kansas, two pediatricians, a former schoolteacher, a combat surgeon, a social worker. The résumés themselves argued that these candidates came from the bottom of the ladder, not the top.' },
      { title: 'Beat your own establishment first', body: 'El-Sayed beat a primary rival backed by Senate Democratic leader Chuck Schumer and was outspent in both rounds. Kiros ousted a 29-year incumbent. California’s Randy Villegas also beat the party’s preferred candidate in his primary.' },
      { title: 'Turn the opponent’s ties into the issue', body: 'Husted became “the face of data centers.” Marshall’s lawsuits against patients and his “pocketbook” remark. Paxton’s character, which about two-thirds of Texas voters doubted. Collins’ votes with Trump.' },
      { title: 'Refuse the money that taints', body: 'Kiros refused corporate PAC and pro-Israel lobby money. Ossoff campaigned for a constitutional amendment to limit corporate campaign money. The pitch: you cannot fight the top while funded by it.' }
    ],

    speechmap: [
      { theme: 'Not left or right', quotes: [
        { who: 'James Talarico, Texas Senate', text: 'top versus bottom', note: 'His framing of the central divide', source: 'https://www.ksat.com/news/local/2026/11/04/full-speech-talarico-vows-a-politics-of-love-in-speech-after-historic-senate-win/' },
        { who: 'Amy Klobuchar, Minnesota governor', text: 'I am committed as ever to moving our state forward, not moving our state to the left or to the right', source: 'https://www.youtube.com/watch?v=n6gHRJiIZR0&t=56s' },
        { who: 'David Crowley, Wisconsin governor', text: 'In a state this close, nobody gets to govern alone.', source: 'https://mprnews.org/story/2026/11/03/republican-tom-tiffany-concedes-defeat-in-wisconsin-governors-race' },
        { who: 'Keisha Lance Bottoms, Georgia governor', text: 'Yeah, I’m a governor for all of Georgia.', note: 'Said in a press conference the morning after the election', source: 'https://www.youtube.com/watch?v=RUUu_rfqx9o&t=478s' }
      ] },
      { theme: 'The money', quotes: [
        { who: 'James Talarico, Texas Senate', text: 'All the money in the world is no match for the people of Texas.', source: 'https://www.aljazeera.com/news/2026/11/4/talarico-wins-texas-senate-race-ending-decades-of-republican-dominance' },
        { who: 'Gina Hinojosa, Texas governor', text: 'the people who write the biggest check', note: 'Asking whether Texas belongs to working families or to them', source: 'https://www.commondreams.org/news/texas-elon-musk' },
        { who: 'Dr. Annie Andrews, South Carolina Senate', text: 'dominated by billionaires and special interest groups', note: 'Describing current politics', source: 'https://www.news5cleveland.com/politics/america-votes/democrat-annie-andrews-notches-upset-win-in-south-carolina-senate-race' },
        { who: 'Troy Jackson, Maine Senate (debate)', text: 'The billionaire class is who she’s been fighting for', source: 'https://www.nbcchicago.com/elections/maine-senate-race-2026-troy-jackson-susan-collins-2/4012117/?amp=1' }
      ] },
      { theme: 'Corruption', quotes: [
        { who: 'Roy Cooper, North Carolina Senate', text: 'Chaos and corruption in Washington were hurting our people.', source: 'https://www.aljazeera.com/news/2026/11/4/democrat-roy-cooper-flips-north-carolina-us-senate-seat' },
        { who: 'Sen. Jon Ossoff, Georgia', text: 'It is a moral corruption, the cynical indifference of powerful people.', note: 'As reported by the linked outlet; not in his election-night video', source: 'https://newschannel9.com/news/local/georgia-sen-jon-ossoff-wins-reelection-defeating-rep-mike-collins-to-hold-a-key-seat' },
        { who: 'Gina Hinojosa, Texas governor', text: 'We did not end one era of single party rule just to usher in another.', source: 'https://www.youtube.com/watch?v=8TqBTWHLZlc&t=824s' }
      ] },
      { theme: 'Who sent us', quotes: [
        { who: 'Troy Jackson, Maine Senate', text: 'More importantly, I am going to remember who sent me there.', source: 'https://www.wsbtv.com/news/trending/election-2026-troy-jackson-topples-longtime-sen-susan-collins-maine/S5YR2UVCCJCBBLA3NXFMVYG44Q/?outputType=amp' },
        { who: 'Dr. Abdul El-Sayed, Michigan Senate', text: 'force the conversation about who we are and who we want to be', note: 'As reported by the linked outlet; not in his election-night video', source: 'https://www.click2houston.com/news/politics/2026/11/05/democrats-victory-was-clear-the-partys-future-is-not/' },
        { who: 'Deb Haaland, New Mexico governor', text: 'I stand before you as the first Native American woman elected governor', source: 'https://www.atlantanewsfirst.com/2026/11/04/democrat-deb-haaland-become-first-native-american-female-governor-us-history/' }
      ] }
    ],

    breaks: [
      { title: 'It was a referendum first', body: 'Brookings’ verdict is blunt: the result was “a devastating referendum on President Donald Trump and his party.” Many voters were voting against something. Whether they voted for a top-versus-bottom program is a separate question the exit data cannot fully answer.', src: 'Brookings', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
      { title: 'The billionaire tax was losing', body: 'In the same election, California’s Prop 40, a one-time 5% tax on billionaires’ wealth, was trailing. It was opposed by Gov. Newsom, Xavier Becerra and the state teachers union as well as by tech billionaires, whose side raised about ten times as much. Anger at the top did not automatically become a vote for this policy.', src: 'AP, EdSource', url: 'https://edsource.org/2026/billionaire-wealth-tax-vote-status/769708?amp=1' },
      { title: 'Moderates won the hardest seats', body: 'The most surprising flips, Kansas and South Carolina, and the North Carolina pickup were won by candidates running as moderates, and about half of their voters called themselves moderate. Rahm Emanuel argues the candidates who flip red seats are the “majority makers.”', src: 'AP', url: 'https://ktar.com/?p=5926061' },
      { title: 'Abstention is not conversion', body: 'If the wave was mostly Republicans staying home, it may not last when Trump is not the reference point. Only about 6% of Republicans crossed over.', src: 'Brookings', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
      { title: 'Anti-billionaire candidates took big money too', body: 'Talarico criticised Texas oil billionaires while drawing criticism for donations from Republican megadonor Miriam Adelson. The Free Press reported a similar gap between rhetoric and fundraising among several Senate Democrats, including Ossoff.', src: 'San Antonio Current, The Free Press', url: 'https://www.sacurrent.com/?p=403518' },
      { title: 'Midterms predict little', body: 'Clinton won easily in 1996 after losing more than 50 House seats in 1994; Obama won in 2012 after losing more than 60 in 2010. The 2028 field, and its argument over what this election meant, is only starting.', src: 'Brookings', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' }
    ],

    texas: {
      title: 'Case study: how Texas flipped',
      body: [
        'Texas had not elected a Democrat statewide in more than three decades. On November 3 it elected Gina Hinojosa governor and James Talarico senator. Abbott’s vote fell about 30% from Trump’s 2024 total, while Hinojosa beat Kamala Harris’s 2024 Texas vote by about 8%. Republicans’ mid-decade redistricting, designed to gain five House seats, won them one.',
        'The Republican Senate nominee was Ken Paxton, who had ousted Sen. John Cornyn in a May runoff. About two-thirds of Texas voters told the AP Voter Poll he lacked the character to serve. Musk put about $212 million behind him. Talarico, a former schoolteacher and seminarian, ran on water, data center regulation and the billionaires he said had bought Texas politics. Hinojosa described her politics as economic populism.'
      ],
      video: { id: '2DjpTrafsXc', title: 'How Texas Flipped Blue? The Real Reason Is Bigger!', channel: 'Ruby 3D Files' },
      sources: [
        { label: 'Brookings: Texas turnout figures', url: 'https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/' },
        { label: 'KSAT: Talarico’s victory speech', url: 'https://www.ksat.com/news/local/2026/11/04/full-speech-talarico-vows-a-politics-of-love-in-speech-after-historic-senate-win/' },
        { label: 'Al Jazeera: Talarico ends decades of Republican dominance', url: 'https://www.aljazeera.com/news/2026/11/4/talarico-wins-texas-senate-race-ending-decades-of-republican-dominance' },
        { label: 'Common Dreams: Hinojosa and economic populism (advocacy outlet)', url: 'https://www.commondreams.org/news/economic-populism-2026-midterms' }
      ]
    }
  };
})(window.MOSAIC);
