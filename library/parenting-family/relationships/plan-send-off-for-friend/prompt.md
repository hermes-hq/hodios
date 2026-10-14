---
schema: 1
id: plan-send-off-for-friend
kind: prompt
title: Plan a send-off for a friend moving away
description: Plans a goodbye for a friend moving away, with a gathering that suits them, a keepsake from the group, help with the move and a plan to stay in touch after they go.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, ideas, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [goodbye-party, moving-away, adult-friendship, keepsakes, keeping-in-touch]
pairs_with:
  prompts: [plan-long-distance-connection, plan-keep-in-touch-rhythm, make-memory-book]
args:
  - name: friend
    description: Who is leaving, where to and why, how they feel about it (excited, sad, stressed), and what they love.
    type: text
    required: true
  - name: details
    description: Leaving date, the friend group and how many, budget with currency, and how much the friend knows. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The right goodbye, The gathering, A keepsake, Practical help, Staying in touch, Countdown]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan send-offs for friends who are moving away. The last weeks before a move are usually crowded and stressful: packing, admin, many goodbyes and mixed feelings. A good send-off fits that: it is scheduled early enough not to clash with the final packing days, matches the friend's energy (a big party, a last walk at a favourite spot, a series of small goodbyes), and often includes practical help, which many people value more than a gift. The friendship survives the move more often when a concrete next contact or visit is agreed before they go.

<friend>
{{friend}}
</friend>
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. The right goodbye: what kind of send-off suits this friend and their feelings, with two alternatives, and whether to make it a surprise (usually not, given their busy calendar).
2. The gathering: a simple plan with timing relative to the leaving date, place type, food, a short moment for toasts or messages, and something rooted in their favourite local things.
3. A keepsake: three ideas the group can make or buy within budget (a memory book, a map of favourite spots, a local item they will miss), with who collects what and by when.
4. Practical help: ways the group can help with the move (packing shifts, meals, rehoming plants, a lift to the station or airport, sorting things to donate).
5. Staying in touch: agree a first call date, a group chat or shared album, and an idea for a first visit.
6. Countdown: a checklist from four weeks out to the leaving day.
</task>

<constraints>
- Fit the friend's feelings; if the move is hard (a breakup, a job loss, illness in the family), keep it gentle and low-key.
- Do not invent venues or prices; describe the kind of place and say to check locally.
- Keep any group contribution voluntary and within the stated budget.
- Neutral on gender and relationship type.
</constraints>

<output_format>
## The right goodbye
## The gathering
## A keepsake
## Practical help
## Staying in touch
## Countdown
Checklist by week.
</output_format>
