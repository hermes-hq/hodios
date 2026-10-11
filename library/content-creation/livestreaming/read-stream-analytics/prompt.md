---
schema: 1
id: read-stream-analytics
kind: prompt
title: Read stream analytics
description: Reads a streamer's per-stream numbers - average and peak viewers, chatters, follows, watch time - against their own baseline, and turns them into what worked, what to test and what to ignore.
category: livestreaming
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, gamer]
inputs: [dataset, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stream-analytics, average-viewers, retention, chatters, experiments]
pairs_with:
  prompts: [grow-streaming-channel, pick-vod-highlight-clips]
  personas: [stream-producer]
args:
  - name: stats
    description: Per-stream figures copied from your platform's analytics, ideally several weeks - date, start time, length, category or game, average and peak viewers, unique viewers, chatters, new follows or subs, and anything unusual (raids in, collabs, outages).
    type: text
    required: true
  - name: question
    description: Optional. What you want to know, for example "which day is best", "why did last week drop", "is the new segment working".
    type: text
output_contract:
  format: markdown
  sections: [Baseline, What stands out, What the numbers cannot tell you, Tests for the next four weeks, Numbers to stop watching]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small streams have noisy numbers: one raid, a holiday or a category trend can double or halve a night. The useful comparisons are a stream against the streamer's own median for similar streams, not against other channels, and trends over several weeks, not one night. Average concurrent viewers reflects how long people stay as much as how many arrive; peak viewers is often one raid. Unique chatters per stream and returning chatters say more about community than follower totals. Follows per hour streamed shows conversion. Length interacts with averages: very long streams often lower the average while raising total watch time. Changing several things at once (day, game, title, length) makes it impossible to know what worked. Platforms define metrics differently and change them.
</context>

<task>
<stats>
{{stats}}
</stats>

{{#question}}Question: {{question}}{{/question}}

1. **Baseline:** compute the median and range of the main metrics across the streams given, and group streams by what differs (day, start time, category, length, with or without raids or collabs). Show the figures you used.
2. **What stands out:** streams or groups that sit clearly above or below the baseline, with the likely reasons from the data and the notes, flagged as likely, not proven. Separate one-off effects (raids in, outages) from patterns.
3. If a question was asked, answer it directly with the evidence and how confident the data allows you to be.
4. **What the numbers cannot tell you:** limits such as too few streams, mixed changes, or missing metrics, and what to record from now on.
5. **Tests for the next four weeks:** two or three tests, one variable each, with what to measure and what result would count as a real difference given the noise.
6. **Numbers to stop watching:** metrics that are distracting at this size, and why.
</task>

<constraints>
- Use only the numbers given; never invent figures or benchmarks from other channels.
- Do not call a difference real when it rests on one or two streams; say so.
- Note where a platform's metric definitions may differ and tell the user to check how their platform defines it.
- If the user asks how to inflate numbers (view bots, fake chatters, follow-for-follow), say no and why.
</constraints>

<output_format>
## Baseline
Table: metric | median | range | streams counted.

## What stands out
Bullets with evidence.

## What the numbers cannot tell you
## Tests for the next four weeks
Table: test | change | measure | what counts as a result.

## Numbers to stop watching
</output_format>
