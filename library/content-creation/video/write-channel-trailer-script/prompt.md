---
schema: 1
id: write-channel-trailer-script
kind: prompt
title: Write a channel trailer script
description: Scripts a channel trailer under 60 seconds that tells first-time visitors who it is for, what they get and how often, proved with clips from real videos and a reason to subscribe.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, teacher]
stack: [youtube]
requires: [none]
inputs: [text, notes]
output: [script, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [channel-trailer, value-proposition, subscriber-conversion, clip-selection]
pairs_with:
  prompts: [write-video-hooks, organize-channel-playlists]
  personas: [youtube-strategist]
args:
  - name: channel_summary
    description: What the channel covers, who it is for, how often you upload, your format and your personality on camera. Include what makes it different from similar channels.
    type: text
    required: true
  - name: best_videos
    description: Optional. Your best or most typical videos with titles and the moment in each worth showing (timecodes help).
    type: text
  - name: length_seconds
    description: Target length in seconds; trailers work best under 60.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Promise, Script, Clip pull list, Alternative first lines, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write channel trailers: the video a first-time visitor sees on the channel home page. Unlike a launch teaser or a podcast trailer, its only job is to turn a curious visitor into a subscriber by answering four questions fast: is this for me, what will I get, how often, and do I like this person? Weak trailers open with "Hey guys, welcome to my channel", list topics in the abstract, promise an upload schedule the creator cannot keep, and show nothing from real videos.

Length: about {{length_seconds}} seconds, at about 2.5 spoken words a second.
</context>

<task>
<channel_summary>
{{channel_summary}}
</channel_summary>
{{#best_videos}}
<best_videos>
{{best_videos}}
</best_videos>
{{/best_videos}}

1. Promise: write one sentence in the form "If you are [viewer] who wants [result], this channel gives you [format] every [cadence]." Use only the cadence stated.
2. Script beats:
   - 0-3 s: the first sentence names the viewer or their problem, over the most striking real clip. No greeting, no channel name first.
   - 3-15 s: what they get, shown through 3-4 fast clips from real videos with on-screen text naming each benefit.
   - 15-35 s: the creator to camera, one line on why they make this and one detail that shows personality or credibility.
   - Final 8-10 s: how often, a specific reason to subscribe ("so you don't miss the monthly build"), and a pointer to a start-here video or playlist.
3. Keep captions on screen for every spoken line so it works muted.
4. Clip pull list: which moments to cut from which videos and why each one sells the channel. If no videos are listed, describe the kind of moment to look for.
5. Write three alternative first lines with different angles (problem, result, curiosity).
</task>

<constraints>
- Use only facts in the summary. Do not invent subscriber counts, credentials, upload schedules or video titles; mark gaps as [X].
- Total spoken words must fit the length; count them and show the count.
- No clickbait promises the channel does not deliver.
- If the summary does not say who the channel is for, ask and stop.
</constraints>

<output_format>
## Promise
The one-sentence promise.

## Script
Table: seconds | visual (clip or to camera) | spoken line | on-screen text. Word count below.

## Clip pull list
Table: video | moment or timecode | benefit it shows.

## Alternative first lines
Three bullets labelled problem, result, curiosity.

## Questions
Missing facts.
</output_format>
