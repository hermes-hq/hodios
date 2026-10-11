---
schema: 1
id: choose-first-streaming-setup
kind: prompt
title: Choose a first streaming setup
description: Chooses a beginner's first livestreaming setup from what they already own and a budget, spending first on audio and connection, with what to buy now, what to wait on and a first-stream checklist.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [preferences, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [streaming-gear, microphones, webcams, beginner-streamer, room-acoustics]
pairs_with:
  prompts: [plan-stream-scenes, diagnose-stream-quality-issues, grow-streaming-channel]
args:
  - name: plan
    description: What you want to stream (PC games, console games, art, music, talk, IRL), on which platform, and how often.
    type: text
    required: true
  - name: have
    description: What you already own - computer or console, phone, headset or microphone, camera, internet type and upload speed if known, the room.
    type: text
    required: true
  - name: budget
    description: What you can spend now, with currency, and your country if prices or availability matter.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What you can stream with today, Spend in this order, Shopping list, Software, Room and sound, First stream checklist, Wait on these]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Beginners overspend on cameras and lights and underspend on what viewers notice: sound and a stable connection. A clear voice with no echo or keyboard clatter keeps people; a slightly soft image rarely loses them. The cheapest real upgrades are usually a decent microphone placed close to the mouth, a wired internet connection, and soft furnishings to cut room echo. A phone can be a good webcam. Upload speed, not download, decides how good the stream can look. Console streamers can often start with the console's built-in streaming before buying a capture card. Most free streaming software is enough to begin. The aim is to stream this week with what they have, then upgrade where the first streams show weakness.
</context>

<task>
Plan: {{plan}}

<have>
{{have}}
</have>

Budget: {{budget}}

1. **What you can stream with today:** what their current gear can already do, and the minimum needed to go live this week.
2. **Spend in this order:** a priority list for this kind of stream, usually audio, connection, then light, then camera, with why. Adjust for the type of stream (IRL needs mobile data and battery; music needs better audio; art needs an overhead view).
3. **Shopping list:** a table of item types with what to look for and a rough price band stated as a range the user should check locally, totalling within the budget. Describe types and features, not specific brands or models.
4. **Software:** free options by category (streaming software, chat overlay, alerts) and what to set first.
5. **Room and sound:** placement of microphone and camera, cutting echo cheaply, light from in front, and what should never be visible on camera (address, mail, windows showing the street).
6. **First stream checklist:** test recording, audio check, title and category, a short plan for the first hour.
7. **Wait on these:** things to postpone until they know they will keep streaming.
</task>

<constraints>
- Never exceed the stated budget; if it cannot cover the minimum, say what to do with what they own.
- No brand or model recommendations and no affiliate-style lists; describe features and specs to look for.
- Prices vary by country and time; give ranges as rough guides to check, not facts.
- Do not assume a gaming PC; if their computer is weak, suggest lighter settings or the console's own streaming before buying hardware.
</constraints>

<output_format>
## What you can stream with today
## Spend in this order
Numbered with reasons.

## Shopping list
Table: item type | what to look for | rough price band | priority.

## Software
## Room and sound
## First stream checklist
Checkbox list.

## Wait on these
Bullets.
</output_format>
