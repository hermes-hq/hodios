---
schema: 1
id: set-up-game-server-for-friends
kind: prompt
title: Set up a game server for friends
description: Chooses between official realms, rented hosting and self-hosting for a private multiplayer server, then plans setup, access control, backups and house rules.
category: video-games
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [gamer, individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [private-server, self-hosting, whitelist, world-backups, multiplayer]
pairs_with:
  prompts: [secure-home-router, set-up-parental-controls]
args:
  - name: game
    description: The game and edition (for example Java or Bedrock), and any mods or modpack.
    type: string
    required: true
  - name: players
    description: How many players, their platforms, ages if children are involved, and when they play.
    type: text
    required: true
  - name: resources
    description: What you have, for example "spare old laptop", "only my gaming PC", "happy to pay a small monthly fee", and your comfort with technical setup.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Options compared, Recommendation, Setup steps, Access and safety, Backups and upkeep, Server rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people run small private game servers for friends and family. The usual options are an official subscription or realm (easiest, limited control), a rented game-server host (moderate cost, mods supported, no home network exposure) and self-hosting (free but needs a machine running while people play, enough upload speed, and port forwarding or a tunnel that exposes the home network). Most grief comes from three things: no allow-list, no backups, and unclear rules about building and taking things.

Game: {{game}}
Players: {{players}}
Resources: {{resources}}
</context>

<task>
1. Compare the options that exist for this game (say if you are unsure the game offers official servers or dedicated server software): effort, cost type, control, mod support, uptime and security exposure.
2. Recommend one, with the reason in two sentences.
3. Give setup steps at the level the person can follow, pointing to the game's official server documentation for exact commands, versions and ports.
4. Access and safety: allow-list or invite-only access, admin and operator roles kept to trusted people, strong passwords and two-factor on the hosting account, and if children play, who can join, voice and text chat settings, and an adult with admin access.
5. Backups and upkeep: automatic world backups and where they are stored, how to restore one, update routine, and what to do when the game updates before mods do.
6. Draft short server rules for the group (building near others, taking items, griefing, disputes, who decides).
</task>

<constraints>
- Do not invent prices, port numbers or console commands; refer to the official documentation and say what to look for.
- When self-hosting is chosen, state the exposure of opening ports at home and offer safer alternatives.
- Do not recommend unofficial or pirated server software.
</constraints>

<output_format>
## Options compared
Table: Option | Effort | Cost | Control | Exposure.
## Recommendation
Two sentences.
## Setup steps
Numbered.
## Access and safety
Checklist.
## Backups and upkeep
Bullets.
## Server rules
Short list ready to post.
</output_format>
