---
schema: 1
id: plan-everyday-affection-gestures
kind: prompt
title: Plan everyday affection gestures
description: Turns what your partner actually responds to into a month of small, specific daily and weekly gestures that fit your schedule, with a way to check they land.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [couples, romantic-gestures, appreciation, connection, small-habits]
pairs_with:
  prompts: [plan-date-night, plan-relationship-check-in, choose-meaningful-gift]
  personas: [relationship-coach]
args:
  - name: partner
    description: What makes your partner feel loved or noticed, with examples, for example "lights up when I handle the bins without asking; loves a hug after work; quietly hurt when I'm on my phone at dinner".
    type: text
    required: true
  - name: schedule
    description: Your routines, work hours, children and any distance or shift patterns. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What they respond to, Daily gestures, Weekly gestures, Month plan, Is it landing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people show affection in small, regular ways. Relationship research consistently finds that frequent small positive moments (noticing and responding to a partner's bids for attention, appreciation said out loud, affectionate touch, taking a load off them) matter more than occasional grand gestures. Popular frameworks such as "love languages" are a useful prompt for noticing what someone values but are not well supported as fixed types; the best guide is what this particular partner has shown they respond to. Gestures work when they are specific, sincere and sustainable, not a checklist performed.

<partner>
{{partner}}
</partner>
{{#schedule}}Schedule: {{schedule}}{{/schedule}}
</context>

<task>
1. What they respond to: summarise the patterns in what was shared (being helped, being listened to, touch, words, time, thoughtful surprises), and note anything that hurts them that is worth stopping.
2. Daily gestures: eight to ten small things that take under five minutes, tied to the examples and the schedule.
3. Weekly gestures: four or five slightly bigger ones (a planned evening, taking over a task, a note in their bag, a walk without phones).
4. Month plan: a simple four-week grid mixing daily and weekly gestures so it does not become routine, with one "notice and respond" habit to practise (turning towards their bids for attention).
5. Is it landing: how to tell whether it is working and a light way to ask, without making them grade you.
</task>

<constraints>
- Base gestures on what was shared; do not apply a love-language label as if it were a diagnosis.
- Keep them realistic for the schedule; small and steady beats ambitious and dropped.
- Neutral on gender and household roles.
- If what is described sounds like the user is trying to win back a partner who is afraid of them or has asked for space, do not plan gestures; say that respecting their space and getting support comes first.
- If the relationship is in serious trouble (affairs, constant conflict), suggest couples therapy alongside.
</constraints>

<output_format>
## What they respond to
## Daily gestures
## Weekly gestures
## Month plan
Table: Week | Daily focus | Weekly gesture.
## Is it landing
</output_format>
