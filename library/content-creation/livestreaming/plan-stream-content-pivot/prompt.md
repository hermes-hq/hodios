---
schema: 1
id: plan-stream-content-pivot
kind: prompt
title: Plan a stream content pivot
description: Plans moving a live channel to a new game, category or format without losing the core audience - overlap check, bridge streams, schedule split, what to tell chat, measures and a rollback point.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [notes, dataset]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [content-pivot, variety-streaming, category-switch, audience-retention, stream-schedule]
pairs_with:
  prompts: [grow-streaming-channel, read-stream-analytics, write-go-live-announcements]
  personas: [stream-producer]
args:
  - name: current
    description: "What you stream now, platform, schedule, average viewers and chatters, and how long you have streamed it."
    type: text
    required: true
  - name: change
    description: "What you want to move to (new game, variety, Just Chatting, creative, IRL) and why (bored, game dying, growth ceiling, new interest)."
    type: text
    required: true
  - name: numbers
    description: "Optional. Recent per-stream numbers, especially any streams where you already tried the new content."
    type: text
output_contract:
  format: markdown
  sections: [Why and what, Audience overlap, Bridge plan, Schedule split, What to tell chat, Measures, Rollback point]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Streamers who switch content often see viewer numbers drop, because many viewers came for the game or category rather than the person, and the platform's discovery stops showing the channel to the old category's browsers. The drop is not proof the pivot failed; what matters is whether the community that knows the streamer stays (chatters, returning viewers) and whether the new category brings its own discovery. Experienced streamers reduce the shock with overlap: pick a new game or format that shares something with the old one (genre, mechanics, the streamer's role as teacher or comic), run bridge streams that mix both, keep a familiar day for the old content for a while, and tell chat early and honestly. A streamer who is burned out on the old content should not be talked into staying for the numbers; the cost of streaming something they hate shows on stream. A pivot needs a fixed review date and measures chosen in advance.
</context>

<task>
<current>
{{current}}
</current>

<change>
{{change}}
</change>

{{#numbers}}
<numbers>
{{numbers}}
</numbers>
{{/numbers}}

1. **Why and what:** restate the reason and the target, and whether it is a full switch, a variety mix, or a second show.
2. **Audience overlap:** what the old and new content share and what will not carry over, and the likely kind of drop.
3. **Bridge plan:** two to four bridge stream ideas that mix old and new content.
4. **Schedule split:** a week-by-week schedule for the next six to eight weeks moving from old to new, with a familiar anchor slot if useful.
5. **What to tell chat:** a short announcement for stream and socials that explains the change honestly and invites regulars along.
6. **Measures:** which numbers to watch against their own baseline (returning chatters, average viewers per category, follows, how they feel streaming it), using their numbers if given.
7. **Rollback point:** a review date and the result that would make them adjust or go back, and what that would look like.
</task>

<constraints>
- Do not predict viewer numbers; describe likely direction and what to measure.
- Do not push them to stay with content they say they are burned out on.
- Use only numbers they gave; label any assumption.
- Mark platform discovery behaviour as general, not exact.
</constraints>

<output_format>
## Why and what
## Audience overlap
## Bridge plan
## Schedule split
Table: week | days | content.

## What to tell chat
## Measures
Table: measure | baseline | check date.

## Rollback point
</output_format>
