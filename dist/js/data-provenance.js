/* Provenance guide: how to read, trace and weigh the sources on this site.
   Every example below points at a claim check or source already used elsewhere on the site. */
(function (M) {
  'use strict';
  M.provenance = {
    lede: 'Every statement on this site either links to the report it came from or is marked as analysis. This page explains the kinds of sources used, what each can and cannot prove, how to check a claim yourself, which claims are still open, and where careful readers should expect mistakes.',

    reading: [
      { title: 'A link names its outlet', body: 'Link text says who published the item, such as KSAT, Brookings or Census Bureau. “AP” links go to the copy a member outlet published, so the outlet that carried the story is the one you can open and check.' },
      { title: 'Quotation marks mean exact words', body: 'Quotes are kept under fifteen words and always link to the report or video they come from. The words around a quote are paraphrase, so the meaning is checkable but the sentence structure is ours.' },
      { title: '“Via” means second-hand', body: 'When a figure reached us through another outlet, the label says so: “Gallup via Brookings,” “NYT via TNW,” “Redbud Consulting via AP.” The original dataset was not opened. Treat these as one step further from the record.' },
      { title: 'Analysis is labelled as analysis', body: 'The “critical lens” on each profile, the playbook and the “where the frame breaks” section are interpretation built on the reporting. They are arguments to weigh, not facts to cite.' }
    ],

    tiers: [
      { id: 'official', name: 'Official records and government sites',
        shows: 'Counts, dates, filings, legal text and survey totals, from bodies that hold the original record.',
        limits: 'Election-night pages are unofficial until a state certifies. Some figures describe one year only; the Census of Governments count of special districts is for 2022, with a 2025 update.' },
      { id: 'primary', name: 'Candidates’ own words',
        shows: 'What a candidate said or promised, taken from speech videos and campaign sites.',
        limits: 'A speech shows intent and framing, not whether a claim is true or why people voted. Speech quotes were checked against transcripts of the videos, which were not proofread and can contain errors.' },
      { id: 'national', name: 'National newsrooms and public media',
        shows: 'Race calls, quotes, scene-setting and the first draft of what happened.',
        limits: 'A call is a projection, not certification. Wire stories are republished with edits, so two copies of one AP story can differ in length and detail.' },
      { id: 'research', name: 'Research, fact-checking and reference',
        shows: 'Analysis built from data: Brookings on the coalition shift, PolitiFact on a biography, Ballotpedia on how states choose judges, ICMA on local government forms.',
        limits: 'Analysis reflects the method and the date of its data. Read what was measured before treating a headline number as general.' },
      { id: 'advocacy', name: 'Advocacy and issue organizations',
        shows: 'Original data and detailed argument, such as FairVote on ranked-choice voting, Common Cause on campaign money, and the Goldwater Institute on special taxing districts.',
        limits: 'These organizations hold a position. Their figures are cited by name and used for what they measured; their conclusions about their own cause are theirs.' },
      { id: 'news', name: 'Local, regional, specialist and international news',
        shows: 'Local detail that national outlets skip: who ran, how a count moved, what a candidate said at a rally.',
        limits: 'Quality varies. Where a local report is the only source for a claim, the claim is worded no more strongly than that report.' },
      { id: 'video', name: 'Third-party video commentary',
        shows: 'One explainer on Texas, included as an example of how outsiders framed the result.',
        limits: 'Its claims are its own and were not fact-checked here. It is labelled wherever it appears.' }
    ],

    /* Domain classification. Anything not listed falls into the 'news' tier. */
    domainTier: {
      official: ['census.gov', 'chandleraz.gov', 'missoulacounty.gov', 'elections.hawaii.gov', 'sacgrandjury.org',
        'congress.gov', 'eac.gov', 'fec.gov', 'house.gov', 'newtonma.gov', 'seattle.gov', 'sunnyvale.ca.gov', 'usa.gov', 'vote.gov', 'workelections.azurewebsites.net'],
      primary: ['debhaaland.com', 'deniseforcongress.org', 'ad75.asmrc.org'],
      national: ['pbs.org', 'npr.org', 'cbsnews.com', 'abcnews.com', 'time.com', 'newsweek.com', 'fortune.com', 'rollcall.com', 'thefp.com', 'washingtonexaminer.com', 'spglobal.com', 'propublica.org', 'publicintegrity.org', 'votebeat.org'],
      research: ['brookings.edu', 'politifact.com', 'ballotpedia.org', 'news.ballotpedia.org', 'icma.org', 'brennancenter.org', 'followthemoney.org', 'electionlawblog.org', 'neomed.edu', 'law.cornell.edu',
        'projects.propublica.org', 'opensecrets.org', 'ncsl.org', 'guidestar.org', 'ivmf.syracuse.edu', 'ca-ilg.org'],
      advocacy: ['fairvote.org', 'commoncause.org', 'campaignlegal.org', 'prisonpolicy.org', 'everytown.org', 'goldwaterinstitute.org', 'commondreams.org', 'nationofchange.org', 'demlist.substack.com',
        'actionnetwork.org', 'advancenativepl.org', 'americanmajority.org', 'apaics.org', 'arena.run', 'ballot.org', 'beautifulsolutions.info', 'beautifultrouble.org', 'bigdoorbrigade.com', 'biscfoundation.org',
        'civilrighttocounsel.org', 'collectivepac.org', 'collectivepac.substack.com', 'disabilityvictory.org', 'emergeamerica.org', 'emgagepac.org', 'emgageusa.org', 'every.org', 'firstnations.org', 'freedomtrainers.net',
        'give.benevity.org', 'goodtroubleliveson.org', 'grassroots-democracy-initiative.solidarity.tech', 'higherheightsforamerica.org', 'higherheightsforamericapac.org', 'idealist.org', 'ignitenational.org',
        'immigrationadvocates.org', 'immigrationlawhelp.org', 'indivisible.org', 'institute.coop', 'issueone.org', 'latinovictory.org', 'lawhelp.org', 'leadershipinstitute.org', 'lwv.org', 'mobilize.us',
        'mutualaidhub.org', 'naccho.org', 'nalaf.org', 'narf.org', 'nativeorganizing.org', 'nativevote.org', 'ndlon.org', 'networkforpubliceducation.org', 'newamericanleaders.org', 'nlihc.org',
        'participatorybudgeting.org', 'phennd.org', 'potluckasianamerica.org', 'powerthepolls.org', 'repower.applytojob.com', 'repower.org', 'represent.us', 'runforoffice.org', 'runforofficeday.com', 'runforsomething.net',
        'runningstart.org', 'secure.actblue.com', 'sharenm.org', 'sheshouldrun.org', 'siliconvalleyathome.org', 'tenantfederation.org', 'tenantstogether.org', 'traindemocrats.org', 'traindems.org',
        'turtle-alligator-f6hr.squarespace.com', 'unitedwedream.org', 'usworker.coop', 'victoryfund.org', 'victoryinstitute.org', 'voterunlead.org', 'voterunleadaction.org', 'welcometocup.org', 'workerorganizing.org']
    },

    steps: [
      { title: 'Open the link and check the date', body: 'Most links are dated in the address or at the top of the page. A pre-election preview cannot confirm a result, and election-night counts move.' },
      { title: 'Ask what kind of source it is', body: 'Match it against the kinds of source above. A candidate’s website can prove what she promised, not that the promise worked.' },
      { title: 'Compare counts with the official results', body: 'For any vote share, open the state or county election office’s results page. Differences between a news count and the official page are normal until certification.' },
      { title: 'Look the claim up in the checks below', body: 'The claim checks list {n} statements that are easy to get wrong, each with a status and the source that settles it.' },
      { title: 'Take it into your own notebook', body: 'Use “Export for notes” to download everything as Markdown with its links. Load it into NotebookLM or any notes tool and ask it to compare sources claim by claim.' }
    ],

    modes: [
      { title: 'A “first” loses its qualifier',
        body: 'Firsts are the easiest claims to overstate. Deb Haaland is the first Native American woman elected governor, not the first Native American governor, since Oklahoma has elected two tribal citizens. Gina Hinojosa is reported as Texas’s first Latina governor, and no source addresses earlier Hispanic men. James Talarico is the first Democrat elected to the Senate from Texas since 1988, not 1993.',
        links: [['Haaland: WLOX', 'https://www.wlox.com/2026/11/04/democrat-deb-haaland-become-first-native-american-female-governor-us-history/?outputType=amp'], ['Hinojosa: KSAT', 'https://www.ksat.com/news/texas/2026/11/04/democrat-gina-hinojosa-topples-greg-abbott-to-become-first-latina-governor-of-texas/'], ['Talarico: SAN', 'https://san.com/cc/james-talarico-defeats-ken-paxton-flips-texas-senate-seat-for-first-time-since-1988/']] },
      { title: 'The date is assumed',
        body: 'It is natural to treat every result as a November 3 result. Boca Raton voted March 10, Waukesha April 7, Fargo June 9 and Knox County August 6. Reading a primary or an off-cycle result as a midterm result changes what it can tell you about the national mood.',
        links: [['Boca Raton: WLRN', 'https://www.wlrn.org/light/government-politics/2026-03-16/mayor-boca-raton-recount-andy-thomson'], ['Fargo: KFGO', 'https://kfgo.com/2026/06/10/josh-boschee-elected-mayor-of-fargo/'], ['Knox County: Farragut Press', 'https://farragutpress.com/articles/2026/08/15975']] },
      { title: 'A title is rounded up or left to age',
        body: 'Keisha Lance Bottoms was director of public engagement in the Biden White House, not “senior adviser.” Peggy Flanagan is the sitting lieutenant governor, not a former one. Abdul El-Sayed holds an MD but never held a license, which PolitiFact summarizes as a doctor, not a licensed physician.',
        links: [['Bottoms: WTOC', 'https://www.wtoc.com/2026/11/04/keisha-lance-bottoms-makes-history-nations-first-black-female-governor/'], ['Flanagan: KTTC', 'https://www.kttc.com/2026/11/04/democrat-peggy-flanagan-wins-election-us-senate-minnesota/?outputType=amp'], ['El-Sayed: PolitiFact', 'https://politifact.com/article/2026/oct/14/abdul-el-sayed-doctor-physician-michigan-senate/']] },
      { title: 'A number loses its context',
        body: 'Honolulu’s 40.6% counts blank ballots; it is 44.6% of votes cast. The claim that council-manager cities are nearly 10% more efficient traces to a 2011 benchmarking study of 100 cities and shows association, not cause. A figure about five-member boards comes from a grand jury survey of 31 Sacramento County districts, not a national count.',
        links: [['FairVote on RCV results', 'https://fairvote.org/longmont-co-votes-to-adopt-ranked-choice-voting/'], ['ICMA on efficiency', 'https://icma.org/blog-posts/professional-management-drives-localgov-efficiency-effectiveness'], ['Sacramento grand jury', 'https://www.sacgrandjury.org/docs/reports/09-10/report-5-survey-independent-special-districts.pdf']] },
      { title: 'A platform is described from memory',
        body: 'It is easy to assign a candidate the platform people expect. Reporting on Hinojosa’s data-center plan describes forcing lawmakers to regulate and blocking permits without resident input; “caps” on utilities and water do not appear. Coverage of Chris Pappas describes a campaign on the economy, the Iran war and casting Sununu as out of touch; a description centered on bipartisanship and LGBTQ+ rights was not found in that coverage.',
        links: [['Hinojosa: ABC News/AP', 'https://abcnews.com/Technology/wireStory/data-centers-beating-midterm-elections-reckoning-ahead-tech-137902293'], ['Pappas: NHPR', 'https://www.nhpr.org/nh-news/2026-11-03/pappas-wins-u-s-senate-race-defeating-sununu-in-marquee-matchup']] }
    ],

    open: [
      { title: 'Vote shares are unofficial', body: 'Percentages are election-night or partial counts unless stated. State certification comes later, and final numbers can move by tenths of a point or more in close races.' },
      { title: 'Some races were still uncalled', body: 'As of November 6, the Alaska and Mississippi Senate races, the Alaska and Kansas governor races and an Irvine, California ranked-choice measure had no call. Seat counts on the site are the AP tally as reported on November 6.' },
      { title: 'Speech videos come with transcripts, and quotes were checked against them', body: 'Every video in the speech vault has a transcript of its YouTube video on its card. Fifteen were supplied by the site’s editor from the videos (the Talarico and El-Sayed ones through Rev.com), and ten are YouTube’s own captions retrieved on November 8: 3 uploaded by the publishers and 7 generated automatically. None was proofread, so they can contain errors; anyone can watch the video to verify. For the Talarico, El-Sayed and Ossoff transcripts, each paragraph was matched to the video by its opening words, and paragraphs that did not match carry no timestamp. Seventeen quotes and claims about the main 18 speeches were compared with the transcripts: 7 matched word for word, 4 differed slightly and now use the words spoken, and 6 were not in the video. Of those six, two were replaced with quotes that are in the video (Ossoff and Andrews), and four stay because they credit a news report or a different speech: an Ossoff line about Republican supporters, an El-Sayed line, Becerra’s campaign statement and Kiros’s primary-night line. Six videos are not election-night speeches, and their cards say so. The transcripts supplied for the additional videos (Sand, Pingree, James, Omar, three on Kiros) and for the More Perfect Union video were each compared with that video’s own YouTube captions and match them 92% to 100% word for word, so each belongs to its video. The Pappas and Raman transcripts match their linked videos’ captions less closely (90% and 77%), because YouTube’s automatic captions differ between versions of the same speech. The site quotes nothing from the additional videos beyond their titles. Kiros’s statements that she is the delegation’s youngest member, wants to abolish ICE and refuses corporate PAC money are in her speeches; the site’s claim that she also refuses pro-Israel lobby money is not in any transcript here.' },
      { title: 'Some figures came through an intermediary', body: 'Gallup, Redbud Consulting and the New York Times figures are cited through Brookings, AP and TNW. The original datasets were not opened.' },
      { title: 'AP reporting is linked through partner outlets', body: 'The apnews.com site could not be opened during checking. Items credited to AP link to copies published by OPB, ABC News, PBS, the AJC and others.' }
    ],

    groups: {
      firsts: 'Firsts and biographies',
      platforms: 'Platforms and campaigns',
      results: 'Results, dates and elections',
      local: 'Local government',
      money: 'Money, voting and justice'
    },

    status: {
      holds: { label: 'Holds up', cls: 'verdict-confirmed', gloss: 'A source retrieved for this site supports it as stated.' },
      qualified: { label: 'Needs a qualifier', cls: 'verdict-corrected', gloss: 'Partly right. The accurate version is the one used on the site.' },
      wrong: { label: 'Does not hold up', cls: 'verdict-false', gloss: 'Contradicted by the record.' },
      open: { label: 'Not established', cls: 'verdict-unverified', gloss: 'No source found. The site does not state it as fact.' }
    }
  };
})(window.MOSAIC);
