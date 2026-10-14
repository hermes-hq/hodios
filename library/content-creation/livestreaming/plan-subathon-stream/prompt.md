---
schema: 1
id: plan-subathon-stream
kind: prompt
title: Plan a subathon stream
description: Plans a subathon or extended marathon stream with timer rules and a hard cap, worst-case length maths, sleep and shift plans, segments for each block, mod rotas and the conditions for stopping early.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [subathon, marathon-stream, stream-timer, mod-rota, streamer-wellbeing]
pairs_with:
  prompts: [plan-livestream-run-of-show, write-chat-mod-handbook]
  workflows: [charity-stream-track]
  personas: [stream-producer]
args:
  - name: idea
    description: Why you want a subathon (anniversary, milestone, event), your platform, typical viewers and subs or memberships per stream, and dates.
    type: text
    required: true
  - name: support
    description: Who can help - mods and their time zones, co-hosts, someone at home - and anything that limits you (work, health, family, housemates).
    type: text
    required: true
  - name: timer_idea
    description: Optional. How you want the timer to work (time added per sub, gift, bits or donation, starting time).
    type: text
output_contract:
  format: markdown
  sections: [Timer rules, Length maths, Sleep and shifts, Blocks and segments, Crew and mods, Before day one, Stop conditions, Announcement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a subathon, each sub, gift or donation adds time to a countdown, so the audience decides how long the stream runs. Without a cap, a single large gift can commit the streamer to days they cannot do. Experienced streamers set a maximum length, reduce time added as the stream goes on (or after a threshold), decide in advance what happens during sleep (an offline-but-live sleep stream, a co-host shift, or the timer pausing), and plan content in blocks so the stream does not become ten hours of the same game. Exhaustion is the real risk: long streams with no real sleep harm health and judgement, and chats can push streamers past their limits. Viewers trust the event more when the rules are written down and public before it starts. Some platforms have rules on sleeping or leaving the stream unattended, and on what can be promised for money; these change and differ.
</context>

<task>
<idea>
{{idea}}
</idea>

<support>
{{support}}
</support>

{{#timer_idea}}
<timer_idea>
{{timer_idea}}
</timer_idea>
{{/timer_idea}}

1. **Timer rules:** starting time, time added per type of support, a hard cap on total length, and whether added time shrinks after a threshold. Write the public rules in five lines or fewer.
2. **Length maths:** using their typical support numbers, a low, likely and high case for total length, and the worst case if the cap is hit. Show the arithmetic and label assumptions.
3. **Sleep and shifts:** how sleep works (timer pauses, sleep stream, or co-hosts take over), with at least seven hours of real sleep per day for anything longer than a day, meal times and breaks every few hours.
4. **Blocks and segments:** content per block, rotating between high-energy and low-effort segments, and milestone moments that do not require the streamer to stay awake longer.
5. **Crew and mods:** a rota table covering every hour the stream is live, with handovers and who can end the stream.
6. **Before day one:** tech for long runs (stable connection, a BRB scene, timer tool tested, backup plan), food, a check-in person, and platform rules to confirm.
7. **Stop conditions:** written conditions that end or pause the stream regardless of the timer (illness, no sleep, safety issue, mods unavailable), and a line to say if it happens.
8. **Announcement:** a short post with the rules and the cap.
</task>

<constraints>
- Always include a hard cap and stop conditions; refuse to plan an uncapped or sleepless stream and say why.
- Do not invent platform rules or payout figures; mark them as checks.
- Do not promise viewers anything the streamer cannot safely do, such as staying awake for a goal.
- Do not use language that pressures viewers to spend more ("only you can keep me awake").
</constraints>

<output_format>
## Timer rules
Public rules, then notes.

## Length maths
Table: case | assumptions | total length.

## Sleep and shifts
## Blocks and segments
Table: block | content | energy level.

## Crew and mods
Table: time | on screen | mods | handover.

## Before day one
Checkbox list.

## Stop conditions
## Announcement
</output_format>
