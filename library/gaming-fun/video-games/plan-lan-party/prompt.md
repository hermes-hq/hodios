---
schema: 1
id: plan-lan-party
kind: prompt
title: Plan a LAN party
description: Plans a LAN party or couch co-op night with a game list everyone can run, power and network layout, seating, a schedule, food and a pre-event checklist for guests.
category: video-games
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lan-party, couch-co-op, local-multiplayer, game-night, hosting]
pairs_with:
  prompts: [recommend-games, plan-watch-party]
args:
  - name: guests
    description: How many people, what each brings (PC, laptop, console, controllers), and how experienced they are.
    type: text
    required: true
  - name: space
    description: The room or venue, tables, power sockets you know of, and the internet and router you have.
    type: text
    required: true
  - name: length
    description: How long it runs, for example "Saturday 2pm to midnight" or "overnight".
    type: string
    required: true
  - name: games
    description: Games people want to play, if any.
    type: text
output_contract:
  format: markdown
  sections: [Game list, Power and network, Room layout, Schedule, Guest message, Host checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan LAN parties like someone who has hosted many. What goes wrong is predictable: an hour lost to downloads and updates, a game that one guest does not own or cannot run, breakers tripping when six gaming PCs and a kettle share a circuit, Wi-Fi collapsing under load, and a schedule with no breaks or food. Good LAN games support local or LAN play, scale to the group size and suit mixed skill.

Guests: {{guests}}
Space: {{space}}
Length: {{length}}
{{#games}}Requested games: {{games}}{{/games}}
</context>

<task>
1. Build a game list that fits the group: for each game, player count, whether it needs everyone to own a copy, local or online play, rough skill floor, and session length. Include a few low-skill options for mixed groups. Mark any detail you are unsure of to check.
2. Plan power and network: spread high-draw machines across circuits, power strips rated for the load, a wired switch with enough ports and cables (ask guests to bring their own), avoiding relying on Wi-Fi for PCs, and a backup if the internet fails.
3. Sketch the room layout: tables, screens facing to reduce glare, cable runs taped down, space for food away from keyboards.
4. Write a schedule with a pre-install deadline, a warm-up game, main blocks, a tournament or team game if wanted, food and stretch breaks, and a wind-down.
5. Draft the guest message: what to bring, games to install and update before arriving, the time, and any cost-sharing for food.
6. Give a host checklist for the day before and the day.
</task>

<constraints>
- Do not invent electrical ratings for the user's home; tell them to check circuit and power strip ratings and spread the load, and to avoid daisy-chaining strips.
- Do not assume everyone owns paid games; flag ownership needs.
- If minors attend overnight, include parent contact and pickup details in the message.
</constraints>

<output_format>
## Game list
Table: Game | Players | Copies needed | Local or online | Skill floor | Notes.
## Power and network
Bullets.
## Room layout
Short description.
## Schedule
Time | Block.
## Guest message
Message block.
## Host checklist
Checklist.
</output_format>
