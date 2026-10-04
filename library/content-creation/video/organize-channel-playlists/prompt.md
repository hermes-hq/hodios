---
schema: 1
id: organize-channel-playlists
kind: prompt
title: Organise channel playlists
description: Organises a channel's video library into playlists and viewing paths, with a start-here list, problem or level paths, naming and order, end-of-path videos, end-screen links and gaps to fill.
category: video
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [content-creator, teacher]
stack: [youtube]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [playlists, binge-paths, end-screens, content-library, session-time]
pairs_with:
  prompts: [plan-video-series, write-video-chapters, write-channel-trailer-script]
  personas: [youtube-strategist]
args:
  - name: video_list
    description: Your videos, one per line - title, publish date, length, and any stats you have (views, average view duration or percentage viewed, returning viewers). An export from your analytics works.
    type: text
    required: true
  - name: channel_goal
    description: Optional. What the channel is for, for example "teach beginners to sew their own clothes" or "drive bookings for my guitar lessons".
    type: string
output_contract:
  format: markdown
  sections: [Library map, Playlists, Start here, End-screen links, Gaps to fill, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You organise video libraries so a viewer who finishes one video has an obvious next one. Libraries grow by upload date, but viewers arrive with a problem or a level, so a channel with good videos can still lose them after one view. Common mistakes: playlists named by internal categories nobody searches for, too many playlists of one or two videos, the weakest or oldest video first in a path, and end screens that point to "latest upload" instead of the next step.

{{#channel_goal}}Channel goal: {{channel_goal}}{{/channel_goal}}
</context>

<task>
<video_list>
{{video_list}}
</video_list>

1. Library map: group the videos by the viewer's problem, level or series. Mark each video as evergreen, dated (news, trend, old version of software or rules) or one-off.
2. Playlists: propose a small set, usually 4-8 for a library under 100 videos, each with 4-25 videos. For each: a plain, searchable name that says what the viewer gets, a one-line description, who it is for, the order (beginner to advanced for learning paths, story order for series, best first for compilations), and the video that ends the path and where it sends the viewer next. A video may sit in more than one playlist.
3. Where stats exist, start each playlist with a video that holds attention well (high average percentage viewed for its length), and use weak or dated videos late or not at all. Say which stats you used; if none, say the order is based on content.
4. Start here: one playlist of 3-5 videos for new visitors, with the reason for each.
5. End-screen links: for each video, the next video in its main path and the playlist to show.
6. Gaps: missing steps in a path (a beginner video that does not exist yet), with a working title for each.
</task>

<constraints>
- Use only the videos listed. Never invent videos or stats; gaps go in Gaps to fill as suggestions.
- Flag dated videos that could mislead (old prices, outdated software, changed rules) and suggest a pinned comment, card or retirement.
- Keep playlist names honest and specific; no clickbait.
- If the list is under 8 videos, say playlists add little yet and give a start-here list and a next-video plan instead.
- If the video list is missing, ask for it and stop.
</constraints>

<output_format>
## Library map
Table: video | group | evergreen, dated or one-off | stat used.

## Playlists
For each: name, description, audience, ordered video list, end-of-path video and where it sends viewers.

## Start here
Numbered list with reasons.

## End-screen links
Table: video | next video | playlist to show.

## Gaps to fill
Bullets with working titles.

## Questions
Anything to confirm.
</output_format>
