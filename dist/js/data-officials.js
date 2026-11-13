/* Official profiles and verification ledger. Checked against sources retrieved Nov 8, 2026. */
(function (M) {
  M.officials = [
    /* ---------------- GOVERNORS ---------------- */
    { id: 'bottoms', name: 'Keisha Lance Bottoms', party: 'D', officeType: 'governor', jurisdiction: 'Georgia', jurisdictionShort: 'GA', status: 'called', nationalFirst: true,
      background: 'Mayor of Atlanta 2018–2022; director of public engagement in the Biden White House, 2022–23.',
      firsts: [
        { scope: 'national', text: 'First Black woman elected governor in U.S. history' },
        { scope: 'state', text: 'Georgia’s first Black governor and first woman governor' }
      ],
      platform: ['Expand Medicaid', 'Fully fund public schools; end state income tax for public-school teachers', 'Let local governments drop the grocery sales tax', 'Back a data center moratorium'],
      result: 'Beat Trump-endorsed Republican Rick Jackson, about 54% to 46% at 95% counted (AP call). Final polls had shown a near tie, so check the certified margin.',
      themes: ['health', 'schools', 'cost', 'tech'],
      lens: 'The available post-election analysis credits strong turnout in Fulton County and metro Atlanta. Claims that rural Black turnout or suburban swing decided it are plausible but were not supported by any exit data found. Trump endorsed Jackson after Jackson beat Trump’s first pick in the Republican primary.',
      lensCaveat: 'The wide margin against close final polls is itself worth explaining once certified results and turnout data are published.',
      speech: { youtubeId: 'RUUu_rfqx9o', title: 'FULL: Keisha Lance Bottoms Delivers Victory Speech After Winning Georgia Governor’s Race', channel: 'DRM News',
        highlights: [{ quote: 'Yeah, I’m a governor for all of Georgia.', source: 'https://www.youtube.com/watch?v=RUUu_rfqx9o&t=478s' }] },
      keywords: ['Black', 'woman', 'Atlanta', 'Medicaid'],
      sources: [
        { label: 'WTOC: Bottoms makes history', url: 'https://www.wtoc.com/2026/11/04/keisha-lance-bottoms-makes-history-nations-first-black-female-governor/' },
        { label: 'WFAE/NPR: Georgia elects first Black female governor', url: 'https://www.wfae.org/united-states-world/2026-11-03/georgia-elects-the-nations-first-black-female-governor' },
        { label: 'Newsweek: Bottoms beats Jackson', url: 'https://www.newsweek.com/keisha-lance-bottoms-beats-rick-jackson-becomes-first-black-woman-governor-12656636' },
        { label: 'FOX 5 Atlanta: Fulton County results map', url: 'https://www.fox5atlanta.com/news/map-fulton-county-election-results-how-your-neighbors-voted-nt-ap' }
      ] },

    { id: 'hinojosa', name: 'Gina Hinojosa', party: 'D', officeType: 'governor', jurisdiction: 'Texas', jurisdictionShort: 'TX', status: 'called', nationalFirst: false,
      background: 'State representative from Austin since 2017; former Austin school board president. Age 52.',
      firsts: [
        { scope: 'state', text: 'First Latina governor of Texas' },
        { scope: 'state', text: 'Third woman to govern Texas, after Miriam Ferguson and Ann Richards' },
        { scope: 'state', text: 'First Democrat elected governor since Ann Richards in 1990' }
      ],
      platform: ['More school funding; end vouchers; overhaul the STAAR testing system', 'Force lawmakers to regulate data centers', 'Block data center permits that are not a good deal or lack resident input'],
      result: 'Unseated three-term Gov. Greg Abbott, 57% to 41.7% with counting continuing (AP call); Abbott conceded.',
      themes: ['schools', 'tech', 'oligarchy'],
      lens: 'Republicans will have held the office for 32 years when she takes office in January 2027. Morgan Stanley called her win the most important result of the night for data center development, which shows how a governor’s permitting stance now moves markets. Texas also elected Democrat James Talarico to the Senate and a Democratic agriculture commissioner who campaigned on ranchers’ water, so her win was part of a statewide pattern rather than a one-off.',
      speech: { youtubeId: '8TqBTWHLZlc', title: 'Gina Hinojosa delivers victory speech after winning Texas governor’s race', channel: 'KVUE',
        highlights: [{ quote: 'We did not end one era of single party rule just to usher in another.', source: 'https://www.youtube.com/watch?v=8TqBTWHLZlc&t=824s' }] },
      keywords: ['Latina', 'Hispanic', 'Abbott', 'water'],
      sources: [
        { label: 'KSAT/Texas Tribune: Hinojosa topples Abbott', url: 'https://www.ksat.com/news/texas/2026/11/04/democrat-gina-hinojosa-topples-greg-abbott-to-become-first-latina-governor-of-texas/' },
        { label: 'WJLA: Texas results', url: 'https://wjla.com/news/nation-world/gov-greg-abbott-to-watch-election-day-results-in-austin' },
        { label: 'ABC News/AP: Data centers took a beating', url: 'https://abcnews.com/Technology/wireStory/data-centers-beating-midterm-elections-reckoning-ahead-tech-137902293' }
      ] },

    { id: 'haaland', name: 'Deb Haaland', party: 'D', officeType: 'governor', jurisdiction: 'New Mexico', jurisdictionShort: 'NM', status: 'called', nationalFirst: true,
      background: 'Former U.S. Secretary of the Interior, the first Native American Cabinet secretary; former congresswoman. Citizen of Laguna Pueblo.',
      firsts: [
        { scope: 'national', text: 'First Native American woman elected governor in U.S. history', note: 'not the first Native American governor: Oklahoma has elected two tribal citizens' }
      ],
      platform: ['Grow universal childcare', 'Create a low-cost public health option', 'Lower utility costs with more renewable energy', 'Raise the minimum wage; ban rent-fixing and build more housing'],
      result: 'Won the open seat over Republican Gregg Hull, former mayor of Rio Rancho; 57% in early unofficial returns (AP call, 10:40 p.m. EST).',
      themes: ['cost', 'health'],
      lens: 'AP noted before the election that the odds favoured her given New Mexico’s leftward tilt, so the historic first is more remarkable than the partisan result. On energy she has said oil and gas revenue will help fund her affordability agenda, a notable position for a former Interior Secretary criticised by the industry. “Clean energy transition” overstates her platform.',
      speech: { youtubeId: 'XaWZvtvuU1I', title: 'Deb Haaland’s Election Night Victory Speech', channel: 'Deb Haaland',
        highlights: [{ quote: 'I stand before you as the first Native American woman elected governor', source: 'https://www.atlantanewsfirst.com/2026/11/04/democrat-deb-haaland-become-first-native-american-female-governor-us-history/' }] },
      keywords: ['Native American', 'Indigenous', 'Laguna Pueblo', 'woman'],
      sources: [
        { label: 'WLOX/Gray: Haaland becomes first Native American female governor', url: 'https://www.wlox.com/2026/11/04/democrat-deb-haaland-become-first-native-american-female-governor-us-history/?outputType=amp' },
        { label: 'Haaland campaign: Deb’s plan', url: 'https://debhaaland.com/2026/05/debs-plan-works-for-new-mexicans/' },
        { label: 'AP via MyNorthwest: Haaland’s rise and scrutiny', url: 'https://mynorthwest.com/national/decades-in-the-making-deb-haalands-political-rise-spurs-both-inspiration-and-scrutiny/4245049' }
      ] },

    { id: 'acton', name: 'Dr. Amy Acton', party: 'D', officeType: 'governor', jurisdiction: 'Ohio', jurisdictionShort: 'OH', status: 'called', nationalFirst: false,
      background: 'Physician (MD, MPH) and former pediatrician; Ohio Department of Health director 2019–2020, appointed by Republican Gov. Mike DeWine.',
      firsts: [
        { scope: 'state', text: 'First woman elected governor of Ohio', note: 'Nancy Hollister served 11 days as interim in 1999' },
        { scope: 'state', text: 'First Democrat to win the office since Ted Strickland in 2006' }
      ],
      platform: ['Conditional data center moratorium: operators pay for their own power, water and gas, with no rate increase for others', 'Union labor, brownfield siting, and incentive clawbacks for data centers', 'Ban non-disclosure agreements between developers and local officials'],
      result: 'Beat Vivek Ramaswamy 52.3% to 44.4% at 97.7% counted (NBC projection).',
      themes: ['health', 'tech'],
      lens: 'Acton became widely known for televised COVID briefings, which made her both popular and polarising. Her data center plan was the most detailed on this list and was cited by Morgan Stanley as a risk of project delays. Ohio held 21 of the 47 local data center referendums tracked nationally this year. Sherrod Brown’s Senate win in Ohio, built partly on attacking his opponent as the “face of data centers,” suggests the issue had real traction in the state.',
      speech: { youtubeId: 'ZRS2DGKD1_k', title: 'FULL SPEECH | Amy Acton remarks after winning Ohio governor race, defeating Vivek Ramaswamy', channel: 'WKYC Channel 3', highlights: [] },
      keywords: ['doctor', 'physician', 'pediatrician', 'COVID', 'woman'],
      sources: [
        { label: 'NBC: Acton vs. Ramaswamy results', url: 'https://www.nbcboston.com/elections/amy-acton-vivek-ramaswamy-ohio-governor-results/4040325/' },
        { label: 'Signal Cleveland: Acton’s data center plan', url: 'https://signalcleveland.org/amy-acton-ohio-data-center-plan-november-election-2026/' },
        { label: 'NEOMED: Acton appointed to lead Ohio Department of Health (2019)', url: 'https://www.neomed.edu/news/ohio-dept-of-health-to-be-led-by-neomed-grad/' }
      ] },

    { id: 'becerra', name: 'Xavier Becerra', party: 'D', officeType: 'governor', jurisdiction: 'California', jurisdictionShort: 'CA', status: 'called', nationalFirst: false,
      background: 'Former U.S. Secretary of Health and Human Services, California Attorney General and congressman.',
      firsts: [
        { scope: 'state', text: 'California’s first Latino governor elected by voters', note: 'Romualdo Pacheco took office by succession in 1875' }
      ],
      platform: ['Position California as a counterweight to the Trump administration', 'Defers decisions on restoring Medi-Cal for undocumented immigrants until budget review'],
      result: 'Beat Republican Steve Hilton in the top-two general election (AP projection); about 65% to 35% in a later partial count. California counts for weeks.',
      themes: ['federalism', 'process'],
      lens: 'Under California’s top-two system, the two leading primary candidates advance regardless of party. In a state this Democratic that made the general election less competitive than the primary. His campaign framed California as “the answer to Donald Trump’s chaos,” but his caution on Medi-Cal after winning shows the fiscal limits a state faces after federal Medicaid cuts.',
      speech: { youtubeId: 'gCSPpr_4G5Y', title: 'Xavier Becerra gives victory speech after winning California governor’s race', channel: 'Diya TV',
        highlights: [{ theme: 'Campaign statement: California is “the answer to Donald Trump’s chaos.”', source: 'https://www.ktvu.com/news/xavier-becerra-will-be-californias-next-governor' }] },
      keywords: ['Latino', 'Hispanic', 'top-two'],
      sources: [
        { label: 'KTVU: Becerra will be California’s next governor', url: 'https://www.ktvu.com/news/xavier-becerra-will-be-californias-next-governor' },
        { label: 'OPB/AP: Becerra defeats Hilton', url: 'https://www.opb.org/article/2026/11/03/democrat-xavier-becerra-wins-california-governors-race-defeating-republican-steve-hilton/' },
        { label: 'Asian Journal: Becerra, Ford make history', url: 'https://asianjournal.com/usa/lasvegas/becerra-ford-make-history-in-california-and-nevada/' }
      ] },

    { id: 'crowley', name: 'David Crowley', party: 'D', officeType: 'governor', jurisdiction: 'Wisconsin', jurisdictionShort: 'WI', status: 'called', nationalFirst: false,
      background: 'Milwaukee County Executive; endorsed in the primary by outgoing Gov. Tony Evers.',
      firsts: [{ scope: 'state', text: 'Wisconsin’s first Black governor in the state’s 178-year history' }],
      platform: ['Moved from opposing to supporting a data center moratorium', 'End the sales-tax exemption for data centers'],
      result: 'Beat Trump-backed Republican Tom Tiffany about 54% to 45%, an unofficial lead of about 217,000 votes; Tiffany conceded on election night.',
      themes: ['tech'],
      lens: 'Wisconsin is one of the closest states in the country: Trump won it in 2024 by just over 29,000 votes, under one percentage point. A nine-point margin two years later is a large swing. Crowley first beat the more progressive Francesca Hong in the August primary.',
      speech: { youtubeId: 'xgXbobtgdcY', title: 'David Crowley Victory Speech', channel: 'WFRV Local 5',
        highlights: [{ quote: 'In a state this close, nobody gets to govern alone.', source: 'https://mprnews.org/story/2026/11/03/republican-tom-tiffany-concedes-defeat-in-wisconsin-governors-race' }] },
      keywords: ['Black', 'Milwaukee', 'swing state'],
      sources: [
        { label: 'MPR News: Tiffany concedes', url: 'https://mprnews.org/story/2026/11/03/republican-tom-tiffany-concedes-defeat-in-wisconsin-governors-race' },
        { label: 'Isthmus: Turnout drives decisive Crowley victory', url: 'https://isthmus.com/news/news/strong-democratic-turnout-drives-decisive-crowley-victory/' },
        { label: 'WUWM: Crowley upsets Hong in primary', url: 'https://www.wuwm.com/government-politics/2026-08-12/crowley-upsets-hong-to-face-trump-backed-tiffany-in-race-for-wisconsin-governor' }
      ] },

    { id: 'ford', name: 'Aaron Ford', party: 'D', officeType: 'governor', jurisdiction: 'Nevada', jurisdictionShort: 'NV', status: 'called', nationalFirst: false,
      background: 'Nevada Attorney General since 2019.',
      firsts: [
        { scope: 'state', text: 'Nevada’s first Black governor' },
        { scope: 'state', text: 'First Black governor of any state west of the Mississippi' }
      ],
      platform: ['Ran on his record of suing the Trump administration', 'Declare an “affordability emergency”', 'Review data center tax breaks and pause new incentives'],
      result: 'Unseated incumbent Republican Gov. Joe Lombardo, leading by about 7 points at 85% counted (AP call). Not an open seat.',
      themes: ['federalism', 'cost', 'tech'],
      lens: 'Ford is the most direct example of the federalism theme: his campaign was built on litigation against the federal government. Democrats swept all six Nevada statewide offices for the first time since 1962. Nevada will vote second in the Democrats’ 2028 presidential primary calendar, which raises the profile of whoever runs its elections.',
      speech: { youtubeId: '_zAesbDnTRo', title: 'Aaron Ford delivers a victory speech, the first black governor of Nevada', channel: 'News 4 Reno', highlights: [] },
      keywords: ['Black', 'attorney general', 'lawsuits'],
      sources: [
        { label: 'NHPR/NPR: Ford beats Republican incumbent', url: 'https://www.nhpr.org/2026-11-04/nevada-attorney-general-aaron-ford-beats-republican-incumbent-for-governor' },
        { label: 'KTNV: Ford projected to unseat Lombardo', url: 'https://www.ktnv.com/news/political/elections-local/attorney-general-aaron-ford-projected-to-unseat-joe-lombardo-in-nevada-governors-race' },
        { label: 'Nevada Independent: 2028 primary calendar', url: 'https://thenevadaindependent.com/article/nevada-democrats-wont-vote-for-president-first-in-2028-heres-what-it-means' },
        { label: 'AP via ClickOnDetroit: Democrats press for governors’ majority', url: 'https://www.clickondetroit.com/news/politics/2026/11/02/democrats-press-to-win-a-majority-of-governors-offices-in-midterms-after-power-struggles-with-trump/' }
      ] },

    { id: 'klobuchar', name: 'Amy Klobuchar', party: 'D', officeType: 'governor', jurisdiction: 'Minnesota', jurisdictionShort: 'MN', status: 'called', nationalFirst: false,
      background: 'Three-term U.S. Senator; entered the race in January after Gov. Tim Walz dropped his bid for a third term.',
      firsts: [{ scope: 'state', text: 'Minnesota’s first woman governor' }],
      platform: ['Lower costs for Minnesotans', 'Crack down on crime', 'Root out waste and fraud in state programs'],
      result: 'Beat Republican House Speaker Lisa Demuth about 55% to 42% (unofficial).',
      themes: ['cost', 'corruption'],
      lens: 'Her move from the Senate opens a seat. No appointee had been named by November 8; MPR reports either Walz or Klobuchar herself may choose, with a special election in November 2027. She distanced herself from Walz during the campaign and positioned herself as neither left nor right. Pre-election polls had her ahead by 7 to 8 points, so the result was expected.',
      speech: { youtubeId: 'n6gHRJiIZR0', title: 'Klobuchar speaks following gubernatorial win', channel: 'KARE 11',
        highlights: [{ quote: 'I am committed as ever to moving our state forward, not moving our state to the left or to the right', source: 'https://www.youtube.com/watch?v=n6gHRJiIZR0&t=56s' }] },
      keywords: ['woman', 'Senate vacancy'],
      sources: [
        { label: 'Valley News Live: Klobuchar elected first woman governor', url: 'https://www.valleynewslive.com/2026/11/04/klobuchar-elected-minnesota-governor-first-woman-hold-office/' },
        { label: 'WLOX/Gray: Klobuchar wins', url: 'https://www.wlox.com/2026/11/04/democrat-amy-klobuchar-wins-election-governor-minnesota/' },
        { label: 'MPR News: What happens to her Senate seat', url: 'https://mprnews.org/story/2026/11/03/when-amy-klobuchar-becomes-minnesota-governor-what-happens-to-her-us-senate-seat' },
        { label: 'TMJ4: Klobuchar’s campaign themes', url: 'https://www.tmj4.com/politics/midterm-elections/democrat-amy-klobuchar-wins-minnesota-governors-race-becoming-states-first-woman-governor' }
      ] },

    /* ---------------- SENATE ---------------- */
    { id: 'el-sayed', name: 'Dr. Abdul El-Sayed', party: 'D', officeType: 'senate', jurisdiction: 'Michigan', jurisdictionShort: 'MI', status: 'called', nationalFirst: true,
      background: 'Epidemiologist with an MD (Columbia) and a doctorate in public health (Oxford); never did a residency or held a medical license. Former Detroit health director.',
      firsts: [{ scope: 'national', text: 'First Muslim elected to the U.S. Senate' }],
      platform: ['Medicare for All', 'Reverse federal Medicaid cuts', 'Reduce corporate influence in Washington'],
      result: 'Beat Republican Mike Rogers about 53% to 45% at 89% reporting (AP projection). Won the August primary over Rep. Haley Stevens 49% to 47%.',
      themes: ['health', 'left', 'corruption'],
      lens: 'The primary, not the general, was the real contest, with heavy outside spending, including by AIPAC in support of Stevens. Rogers and Trump attacked him as a “fake doctor.” PolitiFact’s verdict was that he is a doctor but not a licensed physician. His win shows a progressive candidate can carry a swing state in a favourable year; whether it travels to a neutral year is untested.',
      speech: { youtubeId: 'Ah-DuMrYvz0', title: 'Abdul El-Sayed’s full victory speech | November 3, 2026', channel: 'Abdul El-Sayed', highlights: [] },
      keywords: ['Muslim', 'doctor', 'epidemiologist', 'progressive', 'AIPAC'],
      sources: [
        { label: 'WDIV: El-Sayed wins, AP projects', url: 'https://www.clickondetroit.com/news/local/2026/11/04/abdul-el-sayed-wins-michigan-us-senate-race-ap-projects/' },
        { label: 'Al Jazeera: How El-Sayed made history', url: 'https://www.aljazeera.com/amp/news/2026/11/4/call-me-senator-how-abdul-el-sayed-beat-trumps-hate-to-create-history' },
        { label: 'WDIV: Primary results', url: 'https://www.clickondetroit.com/news/local/2026/08/05/abdul-el-sayed-wins-2026-michigan-us-senate-democratic-primary-election-ap-projects/' },
        { label: 'PolitiFact: Is El-Sayed a physician?', url: 'https://politifact.com/article/2026/oct/14/abdul-el-sayed-doctor-physician-michigan-senate/' }
      ] },

    { id: 'flanagan', name: 'Peggy Flanagan', party: 'D', officeType: 'senate', jurisdiction: 'Minnesota', jurisdictionShort: 'MN', status: 'called', nationalFirst: true,
      background: 'Lieutenant Governor of Minnesota since 2019; citizen of the White Earth Nation of Ojibwe.',
      firsts: [
        { scope: 'national', text: 'First Native American woman elected to the U.S. Senate' },
        { scope: 'state', text: 'First person of color to win a U.S. Senate seat from Minnesota' }
      ],
      platform: ['Overhaul, then dismantle and replace, ICE after an agent killed Renée Good in Minneapolis', 'Medicare for All'],
      result: 'Beat Republican Michele Tafoya, about 53.8% (NBC); AP call 12:07 a.m. EST. Won the August primary over Rep. Angie Craig 59% to 39%.',
      themes: ['immigration', 'left', 'health'],
      lens: 'Endorsed by Bernie Sanders and Elizabeth Warren, Flanagan beat a sitting congresswoman in the primary by 20 points. Her win also carries a structural point: Minnesota’s new governor, Amy Klobuchar, vacates the state’s other Senate seat, so both Minnesota seats will have changed hands within a year.',
      speech: { youtubeId: 'dgbqL21JhAw', title: 'Full speech: Democratic Lt. Gov. Peggy Flanagan wins Minnesota Senate race', channel: 'NBC News',
        highlights: [{ quote: 'we will rip ICE apart', source: 'https://www.youtube.com/watch?v=dgbqL21JhAw&t=744s' }] },
      keywords: ['Native American', 'Ojibwe', 'Indigenous', 'ICE', 'woman'],
      sources: [
        { label: 'MPR News: 10 things to know about Flanagan', url: 'https://www.mprnews.org/story/2026/11/03/10-things-to-know-about-minnesotas-next-us-senator-peggy-flanagan' },
        { label: 'CBS News: Flanagan wins, CBS projects', url: 'https://cbsnews.com/news/minnesota-2026-senate-flanagan-tafoya' },
        { label: 'KTTC/AP: Flanagan wins', url: 'https://www.kttc.com/2026/11/04/democrat-peggy-flanagan-wins-election-us-senate-minnesota/?outputType=amp' },
      ] },

    { id: 'pappas', name: 'Chris Pappas', party: 'D', officeType: 'senate', jurisdiction: 'New Hampshire', jurisdictionShort: 'NH', status: 'called', nationalFirst: true,
      background: 'Four-term U.S. Representative for New Hampshire’s 1st District since 2019.',
      firsts: [{ scope: 'national', text: 'First openly gay man elected to the U.S. Senate' }],
      platform: ['Cost of living and the economy', 'Opposition to the Iran war', 'Criticised big business’s influence in Washington'],
      result: 'Beat former Republican Sen. John E. Sununu for the seat left open by Jeanne Shaheen’s retirement (CBS projection). Vote shares not yet reported in sources reviewed.',
      themes: ['cost'],
      lens: 'Sununu, a former senator from a prominent New Hampshire political family, was considered a strong recruit for a seat Republicans targeted, so the result says as much about the national climate as about Pappas. Precision matters here: Tammy Baldwin of Wisconsin became the first openly gay senator in 2012; Pappas is the first openly gay man.',
      speech: { youtubeId: 'Zq4VEhMyiLA', title: 'Full speech: Chris Pappas projected winner in New Hampshire Senate race', channel: 'NBC News',
        highlights: [{ quote: 'a wake-up call for corporate special interests and billionaires who have been rigging the economy', source: 'https://www.youtube.com/watch?v=Zq4VEhMyiLA&t=121s' },
          { quote: 'it’s nice to know that love and truth prevailed tonight', source: 'https://www.youtube.com/watch?v=Zq4VEhMyiLA&t=451s' }] },
      keywords: ['gay', 'LGBTQ', 'Sununu'],
      sources: [
        { label: 'WPTV: Pappas becomes first openly gay male senator', url: 'https://www.wptv.com/politics/america-votes/chris-pappas-wins-new-hampshire-senate-race-becoming-first-openly-gay-male-senator' },
        { label: 'NHPR: Pappas defeats Sununu', url: 'https://www.nhpr.org/nh-news/2026-11-03/pappas-wins-u-s-senate-race-defeating-sununu-in-marquee-matchup' },
        { label: 'CBS News: New Hampshire Senate projection', url: 'https://cbsnews.com/news/new-hampshire-2026-senate-pappas-sununu' }
      ] },

    { id: 'andrews', name: 'Dr. Annie Andrews', party: 'D', officeType: 'senate', jurisdiction: 'South Carolina', jurisdictionShort: 'SC', status: 'called', nationalFirst: false,
      background: 'Pediatrician; 14 years at MUSC Children’s Hospital; former Moms Demand Action volunteer.',
      firsts: [
        { scope: 'state', text: 'First woman elected to the U.S. Senate from South Carolina' },
        { scope: 'state', text: 'First Democrat elected to the Senate from South Carolina since Fritz Hollings in 1998' }
      ],
      platform: ['Lower housing, child care, energy and grocery costs', 'Health care access', 'End tax breaks for the wealthy; raise wages', 'Gun violence prevention (Everytown-endorsed)'],
      result: 'Beat appointed Sen. Darline Graham 50.6% to 47.2% at the time of the AP call (10:39 p.m. EST).',
      themes: ['health', 'cost', 'oligarchy'],
      lens: 'Sen. Lindsey Graham died in July 2026. Gov. Henry McMaster, not the president, appointed his sister Darline Graham; Trump approved of the pick, backed her in the special primary, and rallied for her. In the AP Voter Poll about 6 in 10 South Carolina voters said she lacked the experience to serve. NPR’s analysis credits Trump’s record-low approval, driven by the Iran war, tariffs and energy prices, more than any single state factor.',
      speech: { youtubeId: 'UKe4TxEoTzk', title: '‘I think we just made some history’: Democrat Annie Andrews’ full victory speech for US Senate in SC', channel: 'WCNC',
        highlights: [{ quote: 'in a politics dominated by billionaires and special interest groups', source: 'https://www.news5cleveland.com/politics/america-votes/democrat-annie-andrews-notches-upset-win-in-south-carolina-senate-race' }] },
      keywords: ['doctor', 'pediatrician', 'woman', 'gun', 'Graham'],
      sources: [
        { label: 'WBTV/AP: Andrews wins, AP projects', url: 'https://www.wbtv.com/2026/11/04/democrat-annie-andrews-wins-us-senate-seat-south-carolina-ap-projects/' },
        { label: 'HPPR/NPR: McMaster appoints Graham’s sister', url: 'https://www.hppr.org/2026-07-14/south-carolinas-governor-appoints-lindsey-grahams-sister-to-serve-out-his-term' },
        { label: 'WUNC/NPR: Andrews wins in major upset', url: 'https://www.wunc.org/2026-11-03/democrat-annie-andrews-wins-south-carolina-senate-race-in-major-upset' },
        { label: 'WLOS: First Democrat since 1998', url: 'https://wlos.com/news/local/south-carolina-elects-democrat-annie-andrews-to-us-senate-first-since-1998-wciv-abc-news-4-election-day-polls-donald-trump-senate-house-election-results-washington-dc' },
        { label: 'Everytown endorsement', url: 'https://www.everytown.org/press/everytown-for-gun-safety-action-fund-endorses-former-moms-demand-action-volunteer-dr-annie-andrews-for-u-s-senate-in-south-carolina/' }
      ] },

    { id: 'talarico', name: 'James Talarico', party: 'D', officeType: 'senate', jurisdiction: 'Texas', jurisdictionShort: 'TX', status: 'called', nationalFirst: false,
      background: 'Texas state representative and former public school teacher; won the March Democratic primary over Rep. Jasmine Crockett.',
      firsts: [{ scope: 'state', text: 'First Democrat elected to the U.S. Senate from Texas since 1988' }],
      platform: ['Stronger data center regulation, including closed-loop water systems', 'Make billionaires pay their fair share; named Texas oil billionaires as top Republican donors', 'Framed the race as the people against a “corrupt system”'],
      result: 'Beat Republican Ken Paxton, who had ousted Sen. John Cornyn in the May runoff, 55% to 43% at 99% of precincts (AP call 10:03 p.m. CT).',
      themes: ['oligarchy', 'corruption', 'tech'],
      lens: 'In his victory speech Talarico said the central divide in American life is not left versus right but “top versus bottom,” and blamed billionaires who own social media, cable news and politicians for keeping Americans angry at each other. Texas Republicans nominated Paxton over the incumbent, and in the AP Voter Poll about two-thirds of Texas voters said Paxton lacked the character to serve. That makes this a case where the opposition’s nominee may matter as much as the winner’s coalition. Talarico won Corpus Christi by 12 points, where the reservoir had fallen to 8% of capacity earlier in the year.',
      speech: { youtubeId: 'ezPKVpfjMGE', title: 'James Talarico Delivers Election Night Victory Speech', channel: 'James Talarico',
        highlights: [{ quote: 'It is top versus bottom.', source: 'https://www.youtube.com/watch?v=ezPKVpfjMGE&t=920s' },
          { quote: 'We will not be conquered.', source: 'https://www.youtube.com/watch?v=ezPKVpfjMGE&t=981s' },
          { quote: 'Texas, it’s time to start flipping tables.', source: 'https://www.youtube.com/watch?v=ezPKVpfjMGE&t=1440s' }] },
      keywords: ['Paxton', 'teacher', 'water', 'Corpus Christi'],
      sources: [
        { label: 'KPRC: Texas Senate results', url: 'https://www.click2houston.com/decision-2026/2026/11/02/texas-us-senate-election-results-ken-paxton-vs-james-talarico/' },
        { label: 'KSAT: Talarico’s victory speech, “top versus bottom”', url: 'https://www.ksat.com/news/local/2026/11/04/full-speech-talarico-vows-a-politics-of-love-in-speech-after-historic-senate-win/' },
        { label: 'CBS News: Paxton defeats Cornyn in runoff', url: 'https://www.cbsnews.com/news/texas-senate-gop-runoff-results-paxton-cornyn-trump-talarico/' },
        { label: 'Al Jazeera: Data centres and the midterms', url: 'https://www.aljazeera.com/economy/2026/11/7/how-the-us-midterm-elections-reflected-resistance-to-data-centres' },
        { label: 'San Antonio Current: Talarico on billionaires', url: 'https://www.sacurrent.com/?p=403518' },
        { label: 'FOX 5: Talarico’s primary speech on a “corrupt system”', url: 'https://www.fox5dc.com/election/james-talarico-warns-billionaires-senate-primary-victory-speech' },
        { label: 'PBS/AP Voter Poll: How Republicans lost', url: 'https://www.pbs.org/newshour/politics/how-trump-and-republicans-lost-the-2026-midterm-elections-according-to-ap-voter-poll' }
      ] },


    /* ---------------- WAVE-MAKERS (no identity-first claim; profiled for how the wave was built) ---------------- */
    { id: 'ossoff', name: 'Jon Ossoff', party: 'D', officeType: 'senate', jurisdiction: 'Georgia', jurisdictionShort: 'GA', status: 'called', nationalFirst: false, wave: true,
      background: 'U.S. Senator since 2021; former investigative documentary producer on corruption and war crimes; mentored by Rep. John Lewis. Age 39.',
      firsts: [
        { scope: 'milestone', text: 'Re-elected as the only Senate Democrat on the ballot in a state Trump carried in 2024' },
        { scope: 'state', text: 'Georgia’s first Jewish senator (elected 2021)' }
      ],
      platform: ['Ban members of Congress from trading individual stocks', 'Constitutional amendment to limit corporate money in campaigns', 'Repeal tariffs raising costs for Georgia families', 'Lower costs and protect health coverage; continue oversight of abuses of power'],
      result: 'Beat Trump-endorsed Rep. Mike Collins (AP call, 7:55 p.m. EST). Began the cycle as Republicans’ top target; outraised Collins more than 10 to 1.',
      themes: ['corruption', 'oligarchy', 'cost', 'health'],
      lens: 'Ossoff ran the purest anti-corruption campaign of the cycle, built on the president’s and his family’s rising wealth, and his aggressive style became a model other Democrats copied. He claimed a coalition including “an ever-growing number of Republicans.” The critical lens cuts both ways: his opponent accused him of folding on a stock-trading bill, a charge the AJC called complicated, and The Free Press noted he attacks billionaire influence while raising large sums himself.',
      speech: { youtubeId: 'fsoikoGhJW0', title: 'Election Night with Jon Ossoff, 11.03.2026, Georgia', channel: 'Jon Ossoff',
        highlights: [{ quote: 'the American people have rebuked the depravity, corruption, and incompetence of the failed lame duck President Donald J. Trump.', source: 'https://www.youtube.com/watch?v=fsoikoGhJW0&t=162s' }] },
      keywords: ['corruption', 'stock trading', 'Jewish', 'Collins'],
      sources: [
        { label: 'OPB/AP: Ossoff wins re-election', url: 'https://www.opb.org/article/2026/11/03/georgia-sen-jon-ossoff-wins-reelection-defeating-rep-mike-collins-to-hold-a-key-democratic-seat/' },
        { label: 'WSB-TV: Ossoff’s anti-corruption campaign', url: 'https://www.wsbtv.com/news/local/atlanta/georgia-election-2026-jon-ossoff-wins-reelection-hold-senate-seat/HQ4YM7U3V5GURNJ7SEZOYEUTZM/?outputType=amp' },
        { label: 'AJC: Ossoff and the stock trading fight', url: 'https://www.ajc.com/politics/2026/10/why-did-ossoff-oppose-a-congressional-stock-trading-ban-its-complicated/' },
        { label: 'Atlanta News First: Ossoff and Collins lay out visions', url: 'https://www.atlantanewsfirst.com/2026/10/28/georgias-us-senate-showdown-ossoff-collins-lay-out-visions-2026/?outputType=amp' },
        { label: 'The Free Press: Democrats who attack billionaires but take their money', url: 'https://www.thefp.com/p/the-democrats-who-attack-billionaires-but-take-their-money' }
      ] },

    { id: 'hamilton', name: 'Rev. Adam Hamilton', party: 'D', officeType: 'senate', jurisdiction: 'Kansas', jurisdictionShort: 'KS', status: 'called', nationalFirst: false, wave: true,
      background: 'Minister of the largest Methodist congregation in the U.S.; never held office; registered Republican until earlier in 2026. Age 62.',
      firsts: [{ scope: 'milestone', text: 'First Democrat to win a U.S. Senate seat in Kansas since 1932' }],
      platform: ['High prices from the Iran war and tariffs', 'Health care cuts in the 2025 Republican spending law', 'Ran as a moderate, aiming at Marshall and congressional Republicans more than at Trump'],
      result: 'Unseated Sen. Roger Marshall, 52.1% to 44.9% at 89% counted (NBC). Trump carried Kansas by 16 points in 2024.',
      themes: ['cost', 'health'],
      lens: 'The clearest case of conservatives switching rather than staying home: a former Republican, endorsed by former Republican Govs. Bill Graves and Mike Hayden, winning a state Trump visited the week before. Marshall’s own record became the issue: his remark that national security was more important than voters’ pocketbooks, and reporting that the physician had sued hundreds of patients over unpaid bills at 18% interest.',
      speech: null,
      keywords: ['pastor', 'Methodist', 'former Republican', 'Kansas', 'rural'],
      sources: [
        { label: 'NBC News: Hamilton unseats Marshall', url: 'https://www.nbcwashington.com/elections/kansas-senate-race-2026-adam-hamilton-roger-marshall/4176978/?amp=1' },
        { label: 'NBC News: Hamilton’s bipartisan support', url: 'https://www.nbcnewyork.com/elections/kansas-senate-race-2026-adam-hamilton-roger-marshall' },
        { label: 'SBS/NBC: Kansas vote count', url: 'https://news.sbs.co.kr/english/endPagePrintPopup.do?news_id=N1008830306' },
        { label: 'AFP via ARY: Trump rallied in Kansas', url: 'https://arynews.tv/kansas-sends-democrat-to-us-senate-for-first-time-since-1932' }
      ] },

    { id: 'jackson', name: 'Troy Jackson', party: 'D', officeType: 'senate', jurisdiction: 'Maine', jurisdictionShort: 'ME', status: 'called', nationalFirst: false, wave: true,
      background: 'Fifth-generation logger from Aroostook County; former president of the Maine Senate. Became the nominee in July, about 100 days before the election. Age 58.',
      firsts: [{ scope: 'milestone', text: 'First challenger to oust a sitting Maine senator since 1978' }],
      platform: ['Populist, labor-focused message for working-class Mainers', 'Medicare for All', 'Abolish ICE', 'Collins as a “rubber stamp” for Trump on tariffs, the Iran war and the 2025 spending bill'],
      result: 'Defeated five-term Sen. Susan Collins, who conceded early Wednesday (AP call).',
      themes: ['oligarchy', 'cost', 'health', 'immigration', 'left'],
      lens: 'Jackson’s politics do not fit a left-right line: he first ran for office as a Republican in 2000, won as an independent in 2002, held conservative positions on abortion as a rural legislator, and now campaigns with Bernie Sanders for Medicare for All. What stayed constant was class. He entered politics after leading a 1998 logger blockade over the hiring of Canadian workers, and he ran against “the billionaire class.”',
      speech: null,
      keywords: ['logger', 'labor', 'union', 'Collins', 'rural', 'billionaire class'],
      sources: [
        { label: 'NBC News: Jackson defeats Collins', url: 'https://www.nbcchicago.com/elections/maine-senate-race-2026-troy-jackson-susan-collins-2/4012117/?amp=1' },
        { label: 'NBC News: Jackson’s political evolution', url: 'https://www.nbcmiami.com/elections/maine-senate-race-2026-troy-jackson-susan-collins-2/3883431/?amp=1' },
        { label: 'FOX 35/AP: Jackson’s 100-day campaign', url: 'https://www.fox35orlando.com/news/troy-jackson-defeats-susan-collins-maine-election-2026' },
        { label: 'WSB-TV: First ousted Maine senator since 1978', url: 'https://www.wsbtv.com/news/trending/election-2026-troy-jackson-topples-longtime-sen-susan-collins-maine/S5YR2UVCCJCBBLA3NXFMVYG44Q/?outputType=amp' }
      ] },

    { id: 'cooper', name: 'Roy Cooper', party: 'D', officeType: 'senate', jurisdiction: 'North Carolina', jurisdictionShort: 'NC', status: 'called', nationalFirst: false, wave: true,
      background: 'Two-term former Governor of North Carolina; ran as a moderate.',
      firsts: [{ scope: 'milestone', text: 'First Democrat elected to the Senate from North Carolina since 2008' }],
      platform: ['End “chaos and corruption in Washington”', 'Make health care, housing and groceries more affordable', 'End the Iran war and “stop the pain at the pump”'],
      result: 'Beat Michael Whatley, former Republican National Committee chair and Trump’s pick, for the seat of retiring Sen. Thom Tillis (NBC projection).',
      themes: ['corruption', 'cost', 'health'],
      lens: 'Cooper led throughout the race, and Republicans pulled funding from Whatley. His win shows the anti-corruption frame worked for a mainstream moderate as well as for insurgents: his victory speech opened on corruption before it reached prices or the war.',
      speech: null,
      keywords: ['moderate', 'governor', 'corruption', 'North Carolina'],
      sources: [
        { label: 'Al Jazeera: Cooper flips North Carolina', url: 'https://www.aljazeera.com/news/2026/11/4/democrat-roy-cooper-flips-north-carolina-us-senate-seat' }
      ] },

    { id: 'brown', name: 'Sherrod Brown', party: 'D', officeType: 'senate', jurisdiction: 'Ohio', jurisdictionShort: 'OH', status: 'called', nationalFirst: false, wave: true,
      background: 'Three-term former U.S. Senator who lost in 2024; former top Democrat on the Senate Banking Committee. Age 73.',
      firsts: [{ scope: 'milestone', text: 'Seventh former senator since 1946 to lose a seat and later return' }],
      platform: ['Called Husted “the face of data centers” over rising energy costs', 'Promised to stand up to Big Tech', 'Affordability, the Iran war and health care costs'],
      result: 'Unseated appointed Sen. Jon Husted, 48.6% to 46.5% at 87% counted (AP call, 11:10 p.m.). A special election: Brown must run again in 2028.',
      themes: ['tech', 'cost'],
      lens: 'The race that made Big Tech a Senate issue. Husted had championed data centers as lieutenant governor, and a leaked Republican memo, which NPR could not confirm, called them the anchor around his neck. The crypto industry spent heavily to stop Brown. Ohio has the fifth-most data centers in the country.',
      speech: null,
      keywords: ['data centers', 'Big Tech', 'crypto', 'Ohio', 'populist'],
      sources: [
        { label: 'WUNC/NPR: Brown wins Ohio', url: 'https://www.wunc.org/2026-11-03/democrat-sherrod-brown-wins-ohio-senate-race' },
        { label: 'Washington Examiner: Brown reclaims seat', url: 'https://www.washingtonexaminer.com/?p=4783122' },
        { label: 'SF Standard: Silicon Valley meets a blue wave', url: 'https://sfstandard.com/2026/11/04/silicon-valley-s-political-spending-spree-meets-blue-wave-data-center-revolt/' },
        { label: 'E&E News: Data centers heat up Ohio Senate race', url: 'https://www.eenews.net/articles/data-centers-heat-up-ohio-senate-race/' }
      ] },

    { id: 'colom', name: 'Scott Colom', party: 'D', officeType: 'senate', jurisdiction: 'Mississippi', jurisdictionShort: 'MS', status: 'called', nationalFirst: false, wave: true,
      background: 'District attorney in northeast Mississippi since 2015 election. In 2023 Sen. Cindy Hyde-Smith blocked his nomination to a federal judgeship by withholding her “blue slip.”',
      firsts: [
        { scope: 'state', text: 'First Black person elected to the U.S. Senate from Mississippi since Reconstruction (Hiram Revels and Blanche Bruce were chosen by the Legislature in 1870 and 1875)' },
        { scope: 'milestone', text: 'First Democrat elected to the Senate from Mississippi since John Stennis in 1982' }
      ],
      platform: ['Higher minimum wage, lower costs and protections for rural hospitals (Axios)', 'Attacked Hyde-Smith’s vote for the 2025 budget law with Medicaid cuts (AP)', 'Cost of living as the centerpiece, under the line “Cindy High-Prices” (NPR)'],
      result: 'Beat Republican Sen. Cindy Hyde-Smith, 49.2% to 48.7% with 99% of the expected vote reported, a lead of about 4,700 votes. AP called the race on November 11 on uncertified results, and Hyde-Smith conceded.',
      themes: ['health', 'cost'],
      lens: 'Most forecasters had rated the race safely Republican (Mississippi Today). The margin is under one point and the count is uncertified, so the number can still move. Hyde-Smith’s campaign called Colom a stooge of Chuck Schumer and George Soros; Colom had said he did not request the Soros-linked PAC money.',
      speech: null,
      keywords: ['Mississippi', 'Medicaid', 'district attorney', 'cost of living', 'Hyde-Smith'],
      sources: [
        { label: 'Mississippi Today: Colom wins', url: 'https://mississippitoday.org/2026/11/11/scott-colom-wins-senate-mississippi-hyde-smith/' },
        { label: 'NPR: Colom wins Mississippi Senate race', url: 'https://www.npr.org/2026/11/11/g-s1-151688/mississippi-senate-race-scott-colom' },
        { label: 'CNBC: Colom wins over Hyde-Smith', url: 'https://www.cnbc.com/2026/11/11/democrat-scott-colom-projected-to-win-mississippi-senate-election-over-incumbent-hyde-smith.html' },
        { label: 'ABC News: Colom flips Mississippi', url: 'https://abcnews.com/Politics/democrat-colom-mississippis-black-senator-100-years-ap/story?id=137984057' },
        { label: 'Axios: Who is Scott Colom', url: 'https://www.axios.com/2026/11/05/scott-colom-democrat-mississippi-senate-race' },
        { label: 'AP via Yahoo: Colom announces Senate run', url: 'https://www.yahoo.com/news/articles/democratic-prosecutor-scott-colom-announces-171701846.html' }
      ] },

    /* ---------------- HOUSE ---------------- */
    { id: 'kiros', name: 'Melat Kiros', party: 'D', officeType: 'house', jurisdiction: 'Colorado · CO-01 (Denver)', jurisdictionShort: 'CO-01', status: 'called', nationalFirst: true,
      background: 'Former lawyer and Ph.D. student; democratic socialist; Ethiopian-born. Age 29.',
      firsts: [
        { scope: 'national', text: 'First Gen Z woman elected to Congress' },
        { scope: 'state', text: 'First Black woman elected to Congress from Colorado' }
      ],
      platform: ['Housing First, federal money for housing construction, and zoning and permitting reform', 'Medicare for All; cancel medical debt', 'Abolish ICE; expand federal child care', 'Refuse corporate PAC and pro-Israel lobby money'],
      result: 'About 78% over Republican Christy Peterson (AP call). Ousted Rep. Diana DeGette, in office since 1997, in the June 30 primary, 48.6% to 44.2%.',
      themes: ['left', 'health', 'immigration', 'cost', 'tech', 'corruption'],
      lens: 'The decisive race was the primary. Late-counted younger voters leaned to Kiros, and some voters cited U.S. support for Israel’s war in Gaza. University of Denver political scientist Seth Masket said DeGette was spending “like she’s in trouble.” In a seat this Democratic the general election is a formality, so a few thousand primary voters chose Denver’s member of Congress.',
      speech: { youtubeId: 'z2eeF9dUctg', title: 'HISTORY MADE! Watch Ethiopian-American Melat Kiros’s Epic Victory Speech!', channel: 'VOEA Amharic',
        highlights: [{ theme: 'Primary night, June 30: “We will not wait!”', source: 'https://www.cpr.org/2026/06/30/colorado-district-1-primary-election-2026-results/' }] },
      keywords: ['Black', 'Gen Z', 'youngest', 'democratic socialist', 'housing', 'Ethiopian'],
      sources: [
        { label: 'KUNC: Kiros wins CO-01', url: 'https://www.kunc.org/news/2026-11-04/democratic-socialist-melat-kiros-wins-colorados-1st-congressional-district' },
        { label: 'NPR via KUNC: First Gen Z woman elected to Congress', url: 'https://www.kunc.org/npr-news/2026-11-03/melat-kiros-becomes-the-first-gen-z-woman-elected-to-congress' },
        { label: 'CPR: Primary results and analysis', url: 'https://www.cpr.org/2026/06/30/colorado-district-1-primary-election-2026-results/' },
        { label: 'Colorado Politics: Candidate positions', url: 'https://www.coloradopolitics.com/2026/10/02/kiros-blau-peterson-congressional-district-1/' }
      ] },

    { id: 'hamawy', name: 'Dr. Adam Hamawy', party: 'D', officeType: 'house', jurisdiction: 'New Jersey · NJ-12', jurisdictionShort: 'NJ-12', status: 'called', nationalFirst: false,
      background: 'Plastic and reconstructive surgeon; former Army combat surgeon in the Iraq war; volunteered at a Gaza hospital in 2024.',
      firsts: [{ scope: 'state', text: 'First Muslim member of Congress from New Jersey' }],
      platform: ['“Healthcare, not bombs”', 'End U.S. military aid to Israel', 'Abolish ICE'],
      result: '74.1% over Republican Gregg Mele for the seat of retiring Rep. Bonnie Watson Coleman.',
      themes: ['health', 'left', 'immigration'],
      lens: 'Like Kiros, Hamawy’s real test was the June 2 primary in a safely Democratic seat. His campaign tied foreign policy directly to domestic spending. Sanders endorsed him as a Medicare for All supporter, though no source found quotes Hamawy using that phrase himself.',
      speech: { youtubeId: '1tGUD7JciGk', title: 'Adam Hamawy celebrates “historic” victory of US House seat in New Jersey', channel: 'Middle East Eye', highlights: [] },
      keywords: ['Muslim', 'doctor', 'surgeon', 'Gaza', 'veteran'],
      sources: [
        { label: 'The National: Hamawy wins NJ-12', url: 'https://www.thenationalnews.com/news/us/2026/11/04/adam-hamawy-new-jersey-gaza-egypt/' },
        { label: 'Siasat: New Jersey’s first Muslim congressman', url: 'https://www.siasat.com/adam-hamawy-becomes-new-jerseys-first-muslim-congressman-3569418/' },
        { label: 'Nation of Change: “Healthcare, not bombs” primary win', url: 'https://www.nationofchange.org/2026/06/04/gaza-surgeon-wins-new-jersey-house-primary-on-healthcare-not-bombs-campaign/' },
        { label: 'Roll Call: Watson Coleman to retire', url: 'https://rollcall.com/2025/11/10/bonnie-watson-coleman-retire-new-jersey/' }
      ] },

    { id: 'valdez', name: 'Claire Valdez', party: 'D', officeType: 'house', jurisdiction: 'New York · NY-07', jurisdictionShort: 'NY-07', status: 'called', nationalFirst: false,
      background: 'New York State Assembly member; union organizer with UAW Local 2110; citizen of Ysleta del Sur Pueblo and Mexican-American.',
      firsts: [{ scope: 'state', text: 'New York’s first known Indigenous member of Congress' }],
      platform: ['Pass the PRO Act (labor organizing rights)', 'Tenant protections and a public housing option', 'Fully fund and retrofit NYCHA public housing; repeal the Faircloth Amendment', 'Medicare for All'],
      result: '83.0% to 15.3% over Republican Melvin Rivera. Beat Antonio Reynoso, the retiring Rep. Nydia Velázquez’s preferred successor, by 21 points in the primary.',
      themes: ['left', 'cost', 'health'],
      lens: 'Valdez was endorsed by NYC Mayor Zohran Mamdani and was part of a citywide sweep by DSA-endorsed candidates. Some summaries call her New York’s first Native American congresswoman; Indian Country Today’s reporting supports the stronger claim that she is the state’s first known Indigenous member of Congress of any gender.',
      speech: null,
      keywords: ['Native American', 'Indigenous', 'labor', 'union', 'Mamdani', 'housing'],
      sources: [
        { label: 'Ballotpedia: NY-07 election 2026', url: 'https://ballotpedia.org/New_York%27s_7th_Congressional_District_election,_2026' },
        { label: 'ICT News: Is another Indigenous woman headed to Congress?', url: 'https://ictnews.org/politics/election-2026/is-another-indigenous-woman-headed-to-congress/' },
        { label: 'Queens Eagle: Valdez on her primary victory', url: 'https://queenseagle.com/all/2026/8/7/not-going-to-compromise-claire-valdez-on-her-primary-victory-and-hopes-for-the-house' },
        { label: 'Ballotpedia: Claire Valdez', url: 'https://ballotpedia.org/Claire_Valdez' }
      ] },

    { id: 'moss', name: 'Jeremy Moss', party: 'D', officeType: 'house', jurisdiction: 'Michigan · MI-11', jurisdictionShort: 'MI-11', status: 'called', nationalFirst: false,
      background: 'Michigan state senator; succeeds Rep. Haley Stevens, who ran for the Senate.',
      firsts: [{ scope: 'state', text: 'Michigan’s first openly LGBTQ+ member of Congress' }],
      platform: ['Support the federal Equality Act; sponsored Michigan’s 2023 civil rights expansion for sexual orientation and gender identity', 'Widen public-records access for government', 'Concern over tariff instability for Michigan manufacturing'],
      result: 'Beat Republican Ethan Baker for the seat Haley Stevens vacated to run for the Senate.',
      themes: ['corruption'],
      lens: 'Moss’s legislative record in Lansing gives a concrete basis for judging him: he led the expansion of the Elliott-Larsen Civil Rights Act and long pushed to open the governor’s office and legislature to Michigan’s FOIA law. That is substantive representation with a paper trail.',
      speech: null,
      keywords: ['gay', 'LGBTQ', 'FOIA', 'Oakland County'],
      sources: [
        { label: 'Advocate: Moss elected to Congress', url: 'https://www.advocate.com/politics/election/jeremy-moss-michigan-elected-congress' },
        { label: 'WXYZ: MI-11 results', url: 'https://www.wxyz.com/news/national-politics/america-votes/democrat-jeremy-moss-wins-election-in-michigans-11th-congressional-district' },
        { label: 'Michigan Advance: Moss announces candidacy (2025)', url: 'https://michiganadvance.com/2025/05/08/jeremy-moss-announces-candidacy-for-congress-says-democrats-need-a-bold-voice-in-trump-era/' }
      ] },

    { id: 'powell', name: 'Denise Powell', party: 'D', officeType: 'house', jurisdiction: 'Nebraska · NE-02 (Omaha)', jurisdictionShort: 'NE-02', status: 'called', nationalFirst: false,
      background: 'Small business owner and former corporate executive; daughter of Cuban and Chilean immigrants.',
      firsts: [{ scope: 'state', text: 'Nebraska’s first Latina member of Congress' }],
      platform: ['End tariffs to lower everyday costs', 'Medicare-like public option and a $35 insulin cap', 'Restore a $3,600 Child Tax Credit and make it permanent', 'Path to citizenship for long-term immigrants'],
      result: 'Flipped the seat 57.7% to 40% over Republican Omaha councilman Brinker Harding after Rep. Don Bacon retired (AP call 11:57 p.m.).',
      themes: ['cost', 'health', 'immigration'],
      lens: 'NE-02 is a genuine swing district that elected a moderate Republican for a decade. Bacon’s retirement removed the incumbency advantage, and a 17-point Democratic margin in an open seat is one of the clearer measures of the wave.',
      speech: { youtubeId: '4iNIoBXcFrw', title: 'Denise Powell makes history in Nebraska Dist. 2 race', channel: 'First Alert 6', highlights: [] },
      keywords: ['Hispanic', 'Latina', 'Omaha', 'swing district'],
      sources: [
        { label: 'Washington Examiner: Powell flips NE-02', url: 'https://www.washingtonexaminer.com/?p=4776536' },
        { label: 'NBC Palm Springs: Latino representation in Nebraska (Oct 2026)', url: 'https://www.nbcpalmsprings.com/ca-us-and-world/2026/10/14/linmanuel-miranda-hits-campaign-trail-in-nebraska-to-boost-latino-representation' },
        { label: 'Powell campaign: Economy', url: 'https://deniseforcongress.org/working-to-strengthen-our-local-and-national-economy/' }
      ] },

    { id: 'benitez-thompson', name: 'Teresa Benitez-Thompson', party: 'D', officeType: 'house', jurisdiction: 'Nevada · NV-02 (Reno)', jurisdictionShort: 'NV-02', status: 'called', nationalFirst: false,
      background: 'Former three-term Nevada Assembly Majority Leader; licensed social worker.',
      firsts: [{ scope: 'state', text: 'First Democrat ever to win Nevada’s 2nd District' }],
      platform: ['Restore federal grant funding cut by the administration', 'Defend the Medicaid expansion', 'Affordability and anti-corruption'],
      result: 'Beat Trump-endorsed Republican David Flippo for the seat left open when Rep. Mark Amodei retired in February.',
      themes: ['health', 'cost', 'corruption'],
      lens: 'No Democrat had ever won this district, which makes it one of the larger partisan reversals among the profiles here. Reporting points to the national wave, a contested Republican primary in which Flippo beat Amodei’s preferred successor, and criticism of Flippo over his recent move to Reno and a missing financial disclosure. She campaigned even in the district’s most conservative counties.',
      speech: null,
      keywords: ['Hispanic', 'Reno', 'social worker'],
      sources: [
        { label: 'Nevada Independent: Benitez-Thompson flips NV-02', url: 'https://thenevadaindependent.com/article/teresa-benitez-thompson-flips-northern-nevada-house-seat-for-first-time-in-blue-wave/' },
        { label: 'Nevada Independent (Spanish): analysis', url: 'https://thenevadaindependent.com/article/teresa-benitez-thompson-consigue-para-democratas-escano-del-norte-de-nevada-por-primera-vez-durante-ola-azul/' },
        { label: 'Fallon Post: Her platform', url: 'https://www.thefallonpost.org/article/9149,democrat-benitez-thompson-sees-her-shot-in-nevada-s-2nd-u-s-house-district-race-and-takes-it' }
      ] },

    { id: 'laubacher', name: 'Rear Adm. Eileen Laubacher (Ret.)', party: 'D', officeType: 'house', jurisdiction: 'Colorado · CO-04', jurisdictionShort: 'CO-04', status: 'called', nationalFirst: false,
      background: 'Retired Navy rear admiral; Naval Academy class of 1990. Intelligence officer; defense attaché in New Delhi, 2019–2022; senior director for South Asia on the National Security Council, 2022–2024. Campaign says she retired from the Navy in October 2024 after 34 years of service.',
      firsts: [],
      platform: ['Campaign describes its goal as “service before self”, and as serious, honest representation of constituents’ concerns', 'Government that delivers for residents rather than “corporate donors and billionaires”'],
      result: 'Beat Republican incumbent Lauren Boebert. AP count as of Nov. 13, 2026, 1:36 p.m. MT: 48.8% (187,518 votes) to 47.9% (184,066); Libertarian Douglas Mangeris 3.3%. AP has called the race with 99% of estimated votes counted. Counts may have changed since.',
      themes: ['oligarchy'],
      speech: null,
      keywords: ['Navy', 'admiral', 'intelligence', 'veteran', 'Naval Academy', 'Boebert'],
      sources: [
        { label: 'Navy.mil: Rear Adm. Eileen Laubacher biography', url: 'https://www.navy.mil/Leadership/Flag-Officer-Biographies/Search/Article/2236454/rear-admiral-eileen-laubacher/' },
        { label: 'Eileen for Colorado: About', url: 'https://www.eileenforcolorado.com/about' },
        { label: 'Wikipedia: Eileen Laubacher', url: 'https://en.wikipedia.org/wiki/Eileen_Laubacher' },
        { label: 'NYT: Laubacher defeats Boebert (Nov. 13, 2026)', url: 'https://www.nytimes.com/2026/11/13/us/elections/eileen-laubacher-defeated-lauren-boebert.html' }
      ] },

    /* ---------------- MUNICIPAL ---------------- */
    { id: 'raman', name: 'Nithya Raman', party: 'N', officeType: 'municipal', jurisdiction: 'Los Angeles', jurisdictionShort: 'LA', status: 'called', nationalFirst: false,
      background: 'Los Angeles City Councilmember and urban planner; member of the Democratic Socialists of America. The mayoral race is officially nonpartisan.',
      firsts: [{ scope: 'state', text: 'Defeated a sitting LA mayor for the first time since 2005' }],
      platform: ['Cut homeless encampments at least in half by 2028 with street medical teams and housing', 'Replace the police chief', 'Fix basic services: potholes, sidewalks, streetlights'],
      result: 'Defeated Mayor Karen Bass: 53.9% at 86% of expected vote when NBC projected the race on November 5 and Bass conceded. Bass led the June primary 34% to 29%.',
      themes: ['cost', 'left', 'process'],
      lens: 'LAist’s reporting credits Bass’s falling popularity after the Palisades Fire, which began while she was abroad, rising homelessness, younger voters, a field operation of 11,000 volunteers, and labor backing, plus more than $8.5 million from one outside donor. Bass had the endorsements of Newsom, Harris and Pelosi. It is a case study in incumbency becoming a liability.',
      speech: { youtubeId: 'vquC7apsR90', title: '“An Immigrant as Your Mayor!” Nithya Raman Gets Emotional After Historic LA Win | WORLD NEWS | US', channel: 'The Financial Express',
        highlights: [{ quote: 'I’m an immigrant to this country.', source: 'https://www.youtube.com/watch?v=vquC7apsR90&t=215s' }] },
      keywords: ['mayor', 'housing', 'homelessness', 'DSA', 'Palisades'],
      sources: [
        { label: 'LAist: Raman defeats Bass', url: 'https://laist.com/news/politics/raman-defeats-bass-in-race-for-la-mayor-ushering-in-new-era-of-progressive-politics' },
        { label: 'NBC LA: Mayoral results', url: 'https://www.nbclosangeles.com/elections/los-angeles-mayor-election-results-bass-raman/3965846/' },
        { label: 'AP via Your Valley: Raman ousts Bass', url: 'https://www.yourvalley.net/stories/los-angeles-city-council-member-nithya-raman-ousts-embattled-mayor-karen-bass,738182' }
      ] },

    { id: 'lewis-george', name: 'Janeese Lewis George', party: 'D', officeType: 'municipal', jurisdiction: 'Washington, D.C.', jurisdictionShort: 'DC', status: 'called', nationalFirst: false,
      background: 'D.C. Councilmember for Ward 4.',
      firsts: [
        { scope: 'state', text: 'First D.C. mayor elected under ranked choice voting (Initiative 83)' },
        { scope: 'state', text: 'First D.C. mayor associated with democratic-socialist politics' }
      ],
      platform: ['Universal affordable child care', 'Build 72,000 housing units; lower utility costs', 'New police chief and rebuilt community trust', 'End local police coordination with ICE'],
      result: 'Won a majority of first choices in the seven-way June 16 primary, so no ranked-choice rounds were needed (IVN). AP projected her November win.',
      themes: ['process', 'left', 'cost', 'immigration'],
      lens: 'One tempting reading is that ranked choice helped a consensus candidate win a fractured field. Reporting shows she cleared 50% of first choices, so the new system did not change the outcome. That is a useful reminder that a new voting rule existing is not evidence it decided a race.',
      speech: null,
      keywords: ['mayor', 'ranked choice', 'RCV', 'Black', 'woman', 'DC'],
      sources: [
        { label: 'FOX 5 DC: Lewis George elected mayor', url: 'https://www.fox5dc.com/news/janeese-lewis-george-elected-dc-mayor-citys-first-democratic-socialist-leader-ap' },
        { label: 'IVN: D.C.’s first ranked choice election', url: 'https://ivn.us/dcs-first-ranked-choice-election-just-exposed-how-many-votes-the-old-system-left-behind' },
        { label: 'theGrio: Lewis George wins', url: 'https://thegrio.com/2026/11/04/janeese-lewis-george-wins-dc-mayor-race/' },
        { label: 'PBS: Primary win', url: 'https://www.pbs.org/newshour/politics/janeese-lewis-george-wins-the-democratic-primary-for-mayor-of-washington-d-c' }
      ] }
  ];

  /* ---------------- Claim checks ----------------
     Statements about the 2026 results and local government that are easy to get wrong.
     status: holds | qualified (partly right; the accurate version is stated) | wrong | open (no source found) */
  M.ledger = [
    { group: "firsts", status: "holds", claim: "Keisha Lance Bottoms is the first Black woman governor in U.S. history", finding: "First Black woman elected governor; also Georgia’s first Black and first woman governor.", source: "https://www.wtoc.com/2026/11/04/keisha-lance-bottoms-makes-history-nations-first-black-female-governor/" },
    { group: "firsts", status: "qualified", claim: "Bottoms was a Biden administration “senior adviser”", finding: "Her title was director of public engagement (2022–23).", source: "https://www.wtoc.com/2026/11/04/keisha-lance-bottoms-makes-history-nations-first-black-female-governor/" },
    { group: "platforms", status: "open", claim: "Bottoms’ speech focused on homeowner property-tax relief", finding: "Reported platform was Medicaid expansion, school funding, dropping the grocery tax and a data center moratorium.", source: "https://www.wfae.org/united-states-world/2026-11-03/georgia-elects-the-nations-first-black-female-governor" },
    { group: "platforms", status: "open", claim: "Bottoms won by pairing suburban Atlanta turnout with rural Black mobilization", finding: "Only analysis found credits Fulton County and metro Atlanta turnout; no exit data on rural turnout.", source: "https://www.fox5atlanta.com/news/map-fulton-county-election-results-how-your-neighbors-voted-nt-ap" },
    { group: "firsts", status: "qualified", claim: "Gina Hinojosa is Texas’s first Hispanic governor", finding: "Sources say first Latina governor; no source addresses earlier Hispanic men.", source: "https://www.ksat.com/news/texas/2026/11/04/democrat-gina-hinojosa-topples-greg-abbott-to-become-first-latina-governor-of-texas/" },
    { group: "platforms", status: "qualified", claim: "Hinojosa pledged utility and water caps on AI data centers", finding: "She pledged to force lawmakers to regulate data centers and to block permits that lack resident input; “caps” not found.", source: "https://abcnews.com/Technology/wireStory/data-centers-beating-midterm-elections-reckoning-ahead-tech-137902293" },
    { group: "firsts", status: "wrong", claim: "Deb Haaland is the nation’s first Native American governor", finding: "Oklahoma has elected two tribal citizens as governor. She is the first Native American woman elected governor.", source: "https://www.wlox.com/2026/11/04/democrat-deb-haaland-become-first-native-american-female-governor-us-history/?outputType=amp" },
    { group: "platforms", status: "qualified", claim: "Haaland emphasized clean energy transition, tribal sovereignty and land conservation", finding: "Platform: universal childcare, a public health option, renewable energy to lower utility costs; she also said oil and gas revenue would fund priorities.", source: "https://debhaaland.com/2026/05/debs-plan-works-for-new-mexicans/" },
    { group: "platforms", status: "holds", claim: "Amy Acton campaigned on a data center moratorium unless operators self-fund utilities", finding: "A conditional moratorium, plus union labor, brownfield siting, NDA bans and incentive clawbacks.", source: "https://signalcleveland.org/amy-acton-ohio-data-center-plan-november-election-2026/" },
    { group: "firsts", status: "holds", claim: "Xavier Becerra is California’s first elected Latino governor", finding: "First elected by voters; Romualdo Pacheco succeeded to the office in 1875.", source: "https://www.ktvu.com/news/xavier-becerra-will-be-californias-next-governor" },
    { group: "results", status: "holds", claim: "Trump won Wisconsin by 0.9% in 2024", finding: "Just over 29,000 votes, under one point; exact percentage not stated in sources retrieved.", source: "https://isthmus.com/news/news/strong-democratic-turnout-drives-decisive-crowley-victory/" },
    { group: "results", status: "wrong", claim: "Aaron Ford won an open seat", finding: "He unseated incumbent Republican Gov. Joe Lombardo.", source: "https://www.nhpr.org/2026-11-04/nevada-attorney-general-aaron-ford-beats-republican-incumbent-for-governor" },
    { group: "results", status: "holds", claim: "Nevada holds the No. 2 slot on the 2028 Democratic primary calendar", finding: "February 1, 2028, after South Carolina; approved by the DNC in August 2026.", source: "https://thenevadaindependent.com/article/nevada-democrats-wont-vote-for-president-first-in-2028-heres-what-it-means" },
    { group: "firsts", status: "holds", claim: "Amy Klobuchar elected Minnesota’s first woman governor", finding: "Beat Lisa Demuth about 55% to 42%.", source: "https://www.valleynewslive.com/2026/11/04/klobuchar-elected-minnesota-governor-first-woman-hold-office/" },
    { group: "firsts", status: "holds", claim: "Abdul El-Sayed is the nation’s first Muslim U.S. senator", finding: "First Muslim elected to the Senate.", source: "https://aa.com.tr/en/world/abdul-el-sayed-becomes-1st-muslim-elected-to-us-senate-in-michigan-win/4110982" },
    { group: "firsts", status: "qualified", claim: "El-Sayed is a physician", finding: "He holds an MD but never did a residency or held a license. PolitiFact: a doctor, not a licensed physician.", source: "https://politifact.com/article/2026/oct/14/abdul-el-sayed-doctor-physician-michigan-senate/" },
    { group: "platforms", status: "open", claim: "El-Sayed championed manufacturing jobs and called out corporate PACs", finding: "Coverage describes opposition to corporate influence generally; manufacturing jobs not found.", source: "https://www.aljazeera.com/amp/news/2026/11/4/call-me-senator-how-abdul-el-sayed-beat-trumps-hate-to-create-history" },
    { group: "firsts", status: "holds", claim: "Peggy Flanagan is the first Native American woman U.S. senator", finding: "First Native American woman elected to the Senate (MPR, CBS).", source: "https://www.mprnews.org/story/2026/11/03/10-things-to-know-about-minnesotas-next-us-senator-peggy-flanagan" },
    { group: "firsts", status: "qualified", claim: "Flanagan is a former lieutenant governor", finding: "She is the sitting lieutenant governor.", source: "https://www.kttc.com/2026/11/04/democrat-peggy-flanagan-wins-election-us-senate-minnesota/?outputType=amp" },
    { group: "firsts", status: "holds", claim: "Chris Pappas is the first openly gay male U.S. senator", finding: "Beat former Sen. John E. Sununu.", source: "https://www.wptv.com/politics/america-votes/chris-pappas-wins-new-hampshire-senate-race-becoming-first-openly-gay-male-senator" },
    { group: "platforms", status: "open", claim: "Pappas campaigned on bipartisanship, LGBTQ+ rights and small business", finding: "Coverage describes a campaign on the economy, the Iran war, and casting Sununu as out of touch.", source: "https://www.nhpr.org/nh-news/2026-11-03/pappas-wins-u-s-senate-race-defeating-sununu-in-marquee-matchup" },
    { group: "results", status: "qualified", claim: "Annie Andrews beat “Trump-appointed” interim Sen. Darline Graham after Lindsey Graham’s death", finding: "Lindsey Graham died July 11, 2026. Gov. Henry McMaster appointed Darline Graham; Trump approved and endorsed her.", source: "https://www.hppr.org/2026-07-14/south-carolinas-governor-appoints-lindsey-grahams-sister-to-serve-out-his-term" },
    { group: "results", status: "qualified", claim: "Andrews flipped a seat held by the GOP for nearly 30 years", finding: "She is the first Democrat elected to the Senate from South Carolina since 1998; the seat itself had been Republican far longer.", source: "https://wlos.com/news/local/south-carolina-elects-democrat-annie-andrews-to-us-senate-first-since-1998-wciv-abc-news-4-election-day-polls-donald-trump-senate-house-election-results-washington-dc" },
    { group: "results", status: "wrong", claim: "James Talarico defeated John Cornyn", finding: "Ken Paxton ousted Cornyn in the May runoff; Talarico beat Paxton.", source: "https://www.cbsnews.com/news/texas-senate-gop-runoff-results-paxton-cornyn-trump-talarico/" },
    { group: "firsts", status: "qualified", claim: "Talarico is the first Democratic senator from Texas since 1993", finding: "First Democrat elected to the Senate from Texas since 1988.", source: "https://san.com/cc/james-talarico-defeats-ken-paxton-flips-texas-senate-seat-for-first-time-since-1988/" },
    { group: "firsts", status: "open", claim: "Jon Ossoff is the first Jewish senator from Georgia to win re-election", finding: "No source states the re-election claim. Confirmed instead: he was Georgia’s first Jewish senator when elected in 2021, and won re-election over Rep. Mike Collins on an anti-corruption campaign.", source: "https://www.atlantanewsfirst.com/2026/10/28/georgias-us-senate-showdown-ossoff-collins-lay-out-visions-2026/?outputType=amp" },
    { group: "firsts", status: "qualified", claim: "Melat Kiros is Colorado’s first Black woman in Congress and among the youngest members", finding: "First Black Colorado woman elected to Congress is confirmed; the verifiable age claim is “first Gen Z woman elected to Congress.”", source: "https://www.kunc.org/npr-news/2026-11-03/melat-kiros-becomes-the-first-gen-z-woman-elected-to-congress" },
    { group: "platforms", status: "qualified", claim: "Kiros is an attorney campaigning on affordable housing guarantees", finding: "A former lawyer and Ph.D. student; housing plank is Housing First, federal construction money, and zoning reform.", source: "https://www.coloradopolitics.com/2026/10/02/kiros-blau-peterson-congressional-district-1/" },
    { group: "firsts", status: "qualified", claim: "Adam Hamawy is a retired U.S. Army combat surgeon", finding: "Described as a former Army combat surgeon who served in Iraq; formal retirement not established.", source: "https://www.thenationalnews.com/news/us/2026/11/04/adam-hamawy-new-jersey-gaza-egypt/" },
    { group: "firsts", status: "holds", claim: "Claire Valdez is New York’s first female Native American representative", finding: "Stronger: New York’s first known Indigenous member of Congress of any gender.", source: "https://ictnews.org/politics/election-2026/is-another-indigenous-woman-headed-to-congress/" },
    { group: "platforms", status: "open", claim: "Jeremy Moss campaigned on automotive clean-tech investment", finding: "Documented record is civil rights expansion and public-records access.", source: "https://www.advocate.com/politics/election/jeremy-moss-michigan-elected-congress" },
    { group: "firsts", status: "holds", claim: "Denise Powell is Nebraska’s first Hispanic member of Congress", finding: "Reported before the election as set to be Nebraska’s first Latino member; she won.", source: "https://www.nbcpalmsprings.com/ca-us-and-world/2026/10/14/linmanuel-miranda-hits-campaign-trail-in-nebraska-to-boost-latino-representation" },
    { group: "results", status: "qualified", claim: "Teresa Benitez-Thompson won NV-02, held by Mark Amodei", finding: "Amodei retired in February; she beat David Flippo and is the first Democrat ever to win the district.", source: "https://thenevadaindependent.com/article/teresa-benitez-thompson-flips-northern-nevada-house-seat-for-first-time-in-blue-wave/" },
    { group: "results", status: "qualified", claim: "Janeese Lewis George won a fractured field through ranked-choice transfers", finding: "She won a majority of first choices; no ranked-choice rounds were needed.", source: "https://ivn.us/dcs-first-ranked-choice-election-just-exposed-how-many-votes-the-old-system-left-behind" },
    { group: "results", status: "wrong", claim: "Boca Raton: Andy Thomson defeated Scott Singer on Nov. 3", finding: "The election was March 10. Singer was term-limited; Thomson beat Mike Liebelson by five votes.", source: "https://www.wlrn.org/light/government-politics/2026-03-16/mayor-boca-raton-recount-andy-thomson" },
    { group: "results", status: "qualified", claim: "Fargo and Waukesha mayoral elections were held Nov. 3", finding: "Fargo voted June 9; Waukesha voted April 7.", source: "https://kfgo.com/2026/06/10/josh-boschee-elected-mayor-of-fargo/" },
    { group: "results", status: "qualified", claim: "Irving’s Albert Zapanta is “Unaffiliated”; Chandler’s Matt Orlando is a Democrat", finding: "Both races are officially nonpartisan; party labels not on the ballot.", source: "https://ballotpedia.org/Mayoral_election_in_Irving,_Texas_(2026)" },
    { group: "local", status: "open", claim: "Council-manager is used by 54% of cities over 10,000 and 59% over 100,000", finding: "No ICMA source found for these figures. ICMA 2018: 40.0% of municipalities over 2,500.", source: "https://icma.org/sites/default/files/Survey%20Research%20Snapshot_MFOG.pdf" },
    { group: "local", status: "qualified", claim: "Council-manager cities are nearly 10% more efficient", finding: "Traces to a 2011 IBM benchmarking study of 100 cities; association, not proven cause.", source: "https://icma.org/blog-posts/professional-management-drives-localgov-efficiency-effectiveness" },
    { group: "local", status: "qualified", claim: "More than 38,000 special districts", finding: "39,555 in 2022; 40,199 in the 2025 update. 38,542 was the 2017 count.", source: "https://www.census.gov/library/stories/2023/08/2022-census-of-governments.html" },
    { group: "local", status: "qualified", claim: "Most independent special districts have five-member boards", finding: "From a 2009–10 Sacramento County grand jury survey of 31 districts; not a national figure.", source: "https://www.sacgrandjury.org/docs/reports/09-10/report-5-survey-independent-special-districts.pdf" },
    { group: "local", status: "qualified", claim: "Missoula County canceled the Irrigation, Rural Fire and Turah Meadows elections and appointed unopposed incumbents", finding: "Irrigation District candidates were elected by acclamation; Rural Fire and Turah Meadows had no filers, so seats went to appointment.", source: "https://www.missoulacounty.gov/news/commissioners-cancel-some-special-district-elections-elect-unopposed-candidates-by-acclamation/" },
    { group: "money", status: "qualified", claim: "80% of people in jail are eligible to vote", finding: "About 78% were unconvicted in 2024. Unconvicted is not the same as eligible.", source: "https://www.prisonpolicy.org/reports/pie2026.html" },
    { group: "money", status: "open", claim: "Jail voter turnout is under 2% nationwide", finding: "No national figure exists. Massachusetts: 1% in the 2024 primary, 5% in the general.", source: "https://campaignlegal.org/index%2ephp/press-releases/court-ordered-report-reveals-low-voting-rates-jails-highlights-need-more-voter" },
    { group: "results", status: "holds", claim: "In July 2026 Trump dismissed EAC commissioners Hicks and Hovland; McCormick resigned", finding: "July 9, 2026. The commission has had no commissioners and no quorum since.", source: "https://www.votebeat.org/national/2026/07/09/trump-fires-election-assistance-commission-members-hicks-hovland-mccormick/" },
    { group: "money", status: "qualified", claim: "RCV results: Longmont 56.1%, Irvine 51.6%, Honolulu 40.6%, Alaska 51.9% keep", finding: "Longmont about 56%; Irvine leading, uncalled; Honolulu 40.6% includes blanks (44.6% of votes cast); Alaska about 52% on election night, not final.", source: "https://fairvote.org/longmont-co-votes-to-adopt-ranked-choice-voting/" },
    { group: "money", status: "qualified", claim: "80% of RCV jurisdictions post results within 24 hours", finding: "79% (31 of 39), per FairVote.", source: "https://fairvote.org/79-of-jurisdictions-release-rcv-results-within-24-hours/" },
    { group: "money", status: "qualified", claim: "Independent spending in congressional races exceeded $1 billion", finding: "True but understated: five groups alone passed $1 billion by late October.", source: "https://en.yenisafak.com/world/dark-money-super-pacs-pour-1b-into-us-midterm-races-3724861" },
    { group: "money", status: "qualified", claim: "Princeton’s Bridging Divides Initiative tracked threats against election workers", finding: "BDI surveys local elected officials. The Brennan Center’s 2026 survey of election officials found 32% had faced threats, harassment or abuse.", source: "https://www.brennancenter.org/media/15483/download/2026_local_election_officials_final_0.pdf?inline=1" },
    { group: "results", status: "holds", claim: "The 2026 Iran war drove fuel prices", finding: "U.S. strikes began February 28, 2026; gas averaged $4.15 on Election Day, the highest on any Election Day.", source: "https://fortune.com/2026/11/06/gas-prices-midterm-election-iran-war-incumbents" }
  ];
})(window.MOSAIC);
