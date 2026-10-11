---
schema: 1
id: adapt-sport-for-mixed-ability
kind: prompt
title: Adapt a sport for mixed-ability players
description: Adapts a sport's rules, space, equipment and scoring so players of very different ability, age, fitness or disability can play together, with STEP changes, safety checks and real competition.
category: sports
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual, teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [inclusive-sport, adapted-rules, mixed-ability, disability-sport, step-model, walking-sports]
pairs_with:
  prompts: [plan-youth-sports-practice, pick-fair-pickup-teams]
args:
  - name: sport
    description: The sport to adapt and the usual format.
    type: string
    required: true
  - name: group
    description: Who will play - ages, ability range, fitness, and any disabilities or conditions that affect how they play (described in general terms, with consent). Include numbers.
    type: text
    required: true
  - name: setting
    description: Space, equipment, session length and helpers available. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What needs to change, Adapted rules, STEP adjustments, Safety checks, Keeping it a real game, Ask the players]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help coaches, teachers and organisers adapt sport so everyone can take part: a family game with grandparents and teenagers, a club session with disabled and non-disabled players, a walking version for older adults, or a mixed-age community game. Inclusive coaches use the STEP model: change the Space, the Task, the Equipment or the People (numbers, roles, zones) one at a time and check the effect. Good adaptations keep the essence of the sport, make success possible for the least experienced without boring the most experienced, and are agreed with the players themselves, who usually know best what they need. Established adapted formats (walking football and netball, wheelchair basketball, sitting volleyball, blind football) are worth borrowing from.

Sport: {{sport}}

Group:
{{group}}
{{#setting}}

Setting: {{setting}}
{{/setting}}
</context>

<task>
1. Identify what in the standard game excludes or endangers members of this group (pace, contact, ball speed, court size, the need to run, sight or hearing cues).
2. Write adapted rules: a short, complete rule set for this group, borrowing from established adapted formats where relevant and naming them.
3. List STEP adjustments as a menu (Space, Task, Equipment, People), each with when to use it, so the coach can tune difficulty during the session.
4. Safety checks: contact and speed limits, rest and hydration, accessible surfaces and exits, and any health questions to ask the players or carers beforehand.
5. Keeping it a real game: scoring tweaks, zones or roles that let the strongest players be challenged without dominating, and ways everyone touches the ball.
6. Ask the players: the questions to ask participants about what works for them before and after the session.
</task>

<constraints>
- Describe disabilities and conditions only as the user did; do not diagnose or assume capabilities from a label.
- Do not give medical clearance advice; where a condition may affect safety, say to check with the player and, where appropriate, their health professional.
- Prefer adaptations that include over ones that sideline (such as a permanent referee role for the person who cannot run).
- Keep adaptations simple enough to explain in under two minutes at the start.
</constraints>

<output_format>
## What needs to change
## Adapted rules
## STEP adjustments
Table: Area | Adjustment | Use when.
## Safety checks
## Keeping it a real game
## Ask the players
</output_format>
