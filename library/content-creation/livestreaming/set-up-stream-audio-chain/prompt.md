---
schema: 1
id: set-up-stream-audio-chain
kind: prompt
title: Set up a stream's audio chain
description: Sets up a streamer's audio from mic to stream - placement, gain, filters in the right order, levels for voice, game and music, separate VOD tracks and a test routine - for the gear and room they have.
category: livestreaming
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, gamer]
inputs: [notes, config]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stream-audio, mic-setup, noise-suppression, audio-levels, obs-filters]
pairs_with:
  prompts: [choose-first-streaming-setup, diagnose-stream-quality-issues, plan-stream-scenes]
  personas: [stream-producer]
args:
  - name: gear
    description: "Your microphone (model and type: USB or XLR, dynamic or condenser), interface or mixer if any, headphones, and streaming software (OBS, Streamlabs, Twitch Studio, other)."
    type: text
    required: true
  - name: room
    description: "The room and noise: size, hard surfaces, keyboard type, fans, pets, street noise, other people at home, and where the mic sits now."
    type: text
    required: true
  - name: problems
    description: "Optional. What viewers complain about or what you hear on VODs (too quiet, echo, keyboard, game drowns voice, clipping, robotic sound)."
    type: text
output_contract:
  format: markdown
  sections: [Placement and gain, Signal chain, Levels for each source, Separate tracks, Test routine, If it still sounds wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most stream audio problems are fixed before any plugin: the mic too far away, gain set too high or too low, or a condenser mic picking up the whole room. A dynamic mic a hand's width from the mouth and slightly off-axis rejects keyboard and room noise better than any software; a condenser across the desk will hear everything. Gain should leave headroom so loud moments (laughing, shouting) do not clip, because clipping cannot be undone later. Filters run in an order that matters: noise suppression and a noise gate first, then EQ, then a compressor to even out volume, then a limiter as a safety net at the end. Heavy noise suppression makes voices sound robotic, and a gate with a fast close chops word endings. Viewers mostly complain about balance: game or music louder than the voice. Voice should sit clearly above everything else, with music well below. Separating voice, game and music onto different recording tracks lets a streamer mute copyrighted music in the VOD and fix balance later. Exact dB targets are starting points, not rules; ears and a recorded test decide.
</context>

<task>
<gear>
{{gear}}
</gear>

<room>
{{room}}
</room>

{{#problems}}
<problems>
{{problems}}
</problems>
{{/problems}}

1. **Placement and gain:** where the mic goes for their mic type and room, distance and angle, and how to set gain with headroom for loud moments. If the mic type fights the room (condenser in a noisy room), say so and give the cheapest fix.
2. **Signal chain:** the filter order in their software, with each filter's job and conservative starting settings: noise suppression, noise gate, EQ, compressor, limiter. Mark which filters they may not need and settings that differ by software version as checks.
3. **Levels for each source:** a table for voice, game, music, alerts and guests with a starting peak level and how they relate to each other, so the voice stays on top.
4. **Separate tracks:** how to put voice, game and music on separate recording or VOD tracks in their software, and why (muting music in VODs, fixing mixes in edits).
5. **Test routine:** a five-minute recorded test before going live: quiet talk, loud laugh, typing, game peak, alert, music, then listen back on headphones and on a phone speaker.
6. **If it still sounds wrong:** a symptom-to-cause list for their reported problems, one change at a time.
</task>

<constraints>
- Do not recommend buying gear before fixing placement and gain; if a purchase is needed, name the type, not a brand price.
- Mark software menu names and plugin settings as starting points to check in their version.
- Do not suggest heavy noise suppression as the main fix; explain its cost.
- Keep advice to the gear and software they named.
</constraints>

<output_format>
## Placement and gain
## Signal chain
Table: order | filter | job | starting setting.

## Levels for each source
Table: source | starting peak | note.

## Separate tracks
## Test routine
Checkbox list.

## If it still sounds wrong
Table: symptom | likely cause | change to test.
</output_format>
