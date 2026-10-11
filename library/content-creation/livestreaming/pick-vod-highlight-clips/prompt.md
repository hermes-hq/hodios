---
schema: 1
id: pick-vod-highlight-clips
kind: prompt
title: Pick highlight clips from a stream VOD
description: Picks the moments worth clipping from a past stream's transcript, chat log or marked timestamps, with start and end, hook, title and format for vertical clips or a highlights video.
category: livestreaming
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, gamer, editor]
inputs: [transcript, logs, notes]
output: [table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vod, stream-clips, highlights, vertical-video, clip-titles]
pairs_with:
  prompts: [write-short-form-script, write-video-chapters, grow-streaming-channel]
  personas: [short-form-clip-coach]
args:
  - name: vod
    description: A timestamped transcript of the stream, a chat log with timestamps, or your own list of marked moments with notes. Longer streams can be pasted in parts.
    type: text
    required: true
  - name: stream_info
    description: What the stream was (game, topic, guests), the platform and its date, and where the clips will go (vertical short platforms, a highlights video, both).
    type: text
    required: true
  - name: count
    description: How many clips you want.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Picks, Highlights video order, Clips to skip, Before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hours of stream contain a handful of moments that work out of context. The best short clips have a clear setup and payoff within under a minute, make sense to someone who never watched the streamer, and start as close to the payoff as possible: the first second must show or say why to keep watching. Chat is a good detector: spikes in message rate, repeated emotes or "clip it" mark moments the audience reacted to. Inside jokes, long silences and moments that need ten minutes of context do not travel. A highlights video is different: it can keep some story across the stream and runs in order. Clips of other people, guests, chatters' names or copyrighted music need care before posting.
</context>

<task>
<vod>
{{vod}}
</vod>

<stream_info>
{{stream_info}}
</stream_info>

Number of clips: {{count}}

1. Scan the VOD for candidate moments: chat spikes and reactions, funny or surprising lines, skill moments, emotional moments, useful explanations, and clear wins or fails. Use only what is in the material.
2. **Picks:** choose the best {{count}}, ranked. For each: start and end timestamps (start as close to the payoff as the setup allows), why it works out of context, the first-second hook (what is seen or said), an on-screen caption line, a title under 60 characters, and whether it suits a vertical short, the highlights video or both.
3. Flag for each pick anything to check before posting: other people on screen or voice (guests need to agree), chatters' usernames visible, copyrighted music in the background, spoilers, or a line that reads badly out of context.
4. **Highlights video order:** if wanted, an order with short bridging notes so the story makes sense.
5. **Clips to skip:** moments that look tempting but will not travel, with the reason.
6. **Before posting:** a short checklist.
</task>

<constraints>
- Use only timestamps and content in the material; never invent moments or quotes. If timestamps are missing, say so and describe moments by quote.
- Titles must describe what happens; no misleading clickbait.
- Do not suggest clipping a viewer's or guest's embarrassing moment without their agreement.
- If the transcript is partial, say which part you covered.
</constraints>

<output_format>
## Picks
Table: rank | start-end | moment | hook | caption | title | format | check before posting.

## Highlights video order
## Clips to skip
## Before posting
Checkbox list.
</output_format>
