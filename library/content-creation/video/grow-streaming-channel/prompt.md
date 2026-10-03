---
schema: 1
id: grow-streaming-channel
kind: prompt
title: Grow a live streaming channel
description: Plans growth for a Twitch, YouTube Live or Kick channel with a schedule, category choice, clips, raids and collaborations, and community, as a 90-day plan. Use when a live channel has stalled.
category: video
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [content-creator, gamer]
stack: [youtube]
inputs: [notes, preferences]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [live-streaming, twitch, raids, stream-clips, discoverability]
pairs_with:
  prompts: [plan-livestream-run-of-show, write-short-form-script, plan-online-community-launch]
  personas: [community-manager]
args:
  - name: channel
    description: What you stream, your schedule and hours, average viewers and followers, how long you have streamed, what clips or social accounts you have, and what you enjoy most about streaming.
    type: text
    required: true
  - name: platform
    description: The main platform, such as twitch, youtube or kick.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Positioning, Schedule and categories, Off-stream discovery, Networking, Community and retention, 90-day plan, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach live streamers on growth. Live platforms reward what keeps viewers in a stream and brings them back, but most small streamers are invisible in the directory: in a large category a new stream sits below hundreds of others. Growth therefore usually comes from outside the live directory (short clips on vertical-video platforms, highlights on YouTube, collaborations, raids and community) and from turning one-time viewers into regulars with a predictable schedule, a recognisable show, and a chat where people feel known. Category choice is a trade-off: huge categories have the most viewers and the least visibility; tiny ones are visible but empty. The best are categories where the ratio of viewers to live channels is favourable and the streamer can be distinctive. Burnout is the most common reason streams stop growing; a plan that needs 50 hours a week fails.
</context>

<task>
<channel>
{{channel}}
</channel>

Main platform: {{platform}}

1. **Diagnose** the current state from what is given: the likely bottleneck (discovery, conversion from viewer to follower, retention of regulars, or consistency), with the evidence. If the key numbers are missing (average concurrent viewers, follower count, hours per week, how long they have streamed), ask for them at the end and state the assumptions you made.
2. **Positioning:** what the stream is known for in one line (the hook a new viewer gets in the first 30 seconds), and two recurring segments or rituals that make the show recognisable.
3. **Schedule and categories:** a schedule that fits the hours available, with fixed days and start times, stream length, and which categories to use on which days, explaining how to judge a category's viewer-to-channel ratio and when to stream outside peak competition. Stream titles that say what is happening now.
4. **Off-stream discovery:** a clip pipeline (how to mark moments live, who cuts them, how many short clips a week, which platforms), YouTube highlights or VODs if they fit, and how each clip points back to the live schedule.
5. **Networking:** how to find peers of similar size, raid etiquette (raid with intent, introduce the incoming community), collaboration formats, and community events in the category.
6. **Community and retention:** greeting habits, regular-viewer recognition, chat engagement that does not need high numbers, moderation from day one, a community space off-stream, and how to welcome raids.
7. **90-day plan:** weekly actions in three phases (foundation, consistency, scaling what works).
8. **What to measure:** average concurrent viewers, unique chatters, returning viewers, follower conversion per stream hour, and clip views to follows, with how to read each against the streamer's own baseline.
</task>

<constraints>
- Fit the plan to the stated hours and to what the streamer enjoys; growth that requires streaming something they dislike does not last.
- Never suggest view bots, follow-for-follow schemes, fake chatters or buying followers; say they risk the account and wreck the numbers that matter.
- Platform features, payout programmes and thresholds differ and change. Tell the streamer to check current requirements instead of quoting numbers you are unsure of.
- Do not promise viewer or follower counts.
- If the streamer's notes suggest exhaustion (very long hours, no days off), build rest days into the schedule and say why.
</constraints>

<output_format>
## Diagnosis
The bottleneck, the evidence and stated assumptions.

## Positioning
## Schedule and categories
A weekly schedule table, then category guidance and title examples.

## Off-stream discovery
## Networking
## Community and retention

## 90-day plan
A table: weeks | focus | actions.

## What to measure
A table: metric | what it tells you | how to use it. Then any questions for missing numbers.
</output_format>
