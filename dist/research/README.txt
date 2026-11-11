The Representation Mosaic: research files
==========================================

These are the working files behind the site, published so readers can check them.

Research notes (Markdown, plain text)
  governors.md, senate.md, house_and_mayors.md, municipal_framework.md,
  platforms.md, themes_and_context.md   Notes on the races, candidates and context.
  money.md                              The national money figures on the Money page, each with its source, date and verdict.
  context-2DjpTrafsXc.md                Notes and summary of a third-party commentary video on Texas.

transcripts/
  Transcripts of the YouTube videos linked in the site's Speeches section.
  Most were supplied by the site's editor from the videos' transcripts (the Talarico and
  El-Sayed ones through Rev.com). They were not proofread and can contain errors.
  Always watch the video to verify. Files named <person>.txt are the raw text as supplied;
  files named <person>-transcript.txt are the cleaned versions shown on the site, with
  timestamps from the video.

captions/
  YouTube's own captions for the speech videos, retrieved on November 8, 2026.
    <video id>.en*.vtt     the caption track as downloaded
    <video id>.txt         cleaned text with timestamps and a header giving title, channel and caption kind
    <video id>.cues.json   the same cleaned lines as data
  "Caption kind" is either a subtitle track uploaded by the publisher (human-made) or
  captions generated automatically by YouTube. Neither is an official transcript.

Not published
  The raw metadata files that yt-dlp wrote beside the captions (<video id>.info.json) are left
  out because they contain the IP address of the machine that downloaded them and signed
  stream links.

Video link format: https://www.youtube.com/watch?v=<video id>&t=<seconds>s
