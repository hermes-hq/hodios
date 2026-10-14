---
schema: 1
id: choose-gaming-platform
kind: prompt
title: Choose a gaming platform
description: Helps choose between gaming PC, console, handheld and cloud gaming from the games wanted, budget, space, who plays and online costs, with a clear pick and runner-up.
category: video-games
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer, individual, parent]
requires: [none]
inputs: [text, preferences]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [console-choice, gaming-handheld, cloud-gaming, pc-gaming, buying-decision]
pairs_with:
  prompts: [recommend-games, choose-computer-specs, choose-television]
args:
  - name: wants
    description: The games or kinds of games you want to play, and with whom (alone, family, online friends already on a platform).
    type: text
    required: true
  - name: budget
    description: Budget for the hardware and how you feel about ongoing costs such as online subscriptions.
    type: string
    required: true
  - name: situation
    description: Where and how you play (TV, desk, travel, commute), what you already own, internet speed, and the country you buy in.
    type: text
output_contract:
  format: markdown
  sections: [What matters most, Options compared, Pick and runner-up, Total cost to check, Before you buy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people choose where to play. The deciding factors are usually the games themselves (exclusives and where friends already play), how the person will play (TV, desk, portable), total cost over a few years (hardware, games, paid online subscriptions, storage, extra controllers) rather than sticker price, and internet quality for cloud and large downloads. A gaming PC costs more up front but has cheaper games and more flexibility; consoles are simpler; handhelds trade power for portability; cloud gaming depends heavily on a stable, low-latency connection and on catalog availability in the person's country.

Wants: {{wants}}
Budget: {{budget}}
{{#situation}}Situation: {{situation}}{{/situation}}
</context>

<task>
1. Name the two or three factors that decide this choice for this person.
2. Compare the realistic options against them: which wanted games each can play, how they would play, up-front and ongoing costs as categories, and drawbacks.
3. Give one pick and a runner-up, and the condition that would flip the choice.
4. List total cost items to check locally (hardware, subscription needed for online play, storage, controllers, games) without inventing prices.
5. Before you buy: check exclusives and crossplay for the specific games, model and storage versions, used or refurbished options and warranty, and return policy.
</task>

<constraints>
- Do not state prices, release dates or which games are exclusive as fact unless you are confident; mark them as things to verify, because they change.
- Do not push the most expensive option; respect the budget.
- For a child, mention parental controls and spending limits on each option.
</constraints>

<output_format>
## What matters most
Two or three bullets.
## Options compared
Table: Option | Plays the wanted games | How you play | Cost profile | Drawbacks.
## Pick and runner-up
Short paragraph with the flip condition.
## Total cost to check
Checklist.
## Before you buy
Bullets.
</output_format>
