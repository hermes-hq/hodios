---
schema: 1
id: plan-holiday-visits-between-families
kind: prompt
title: Plan holiday visits between families
description: Plans how a couple or blended family shares holidays between relatives, with rotation options, travel limits, a fair script for telling relatives and a way to keep one tradition of their own.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [preferences, text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [holidays, in-laws, blended-families, christmas, rotation-schedule, boundaries, family-traditions]
pairs_with:
  prompts: [plan-co-parenting, create-family-tradition, coordinate-family-calendar]
args:
  - name: families
    description: Who expects visits and where they live, for example "my parents 2 hours away expect Christmas Day; his mum abroad wants us every other year; my dad and stepmum live in another city".
    type: text
    required: true
  - name: holidays
    description: The holidays or occasions to plan, for example "Christmas Eve, Christmas Day, New Year", "Eid al-Fitr and Eid al-Adha", "Thanksgiving and Lunar New Year".
    type: text
    required: true
  - name: constraints
    description: Anything that limits options, for example children's ages, a co-parenting schedule, budget, work rotas, health, pets, travel time limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The map, Options, Recommendation, Travel limits, Telling relatives, A tradition of your own, When someone pushes back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help couples and blended families share holidays between relatives without spending every December negotiating. The pattern that works: the couple agrees a plan between themselves first, chooses a system that relatives can predict (a rotation, a split, or hosting), protects limits on travel and children's wellbeing, and each partner tells their own family. A fair system rarely gives everyone what they want each year, but it is fair over several years and spares everyone the annual fight.

<families>
{{families}}
</families>
<holidays>
{{holidays}}
</holidays>
{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}
</context>

<task>
1. The map: summarise who expects what, where, and the travel time between places.
2. Options: four or five systems that could work here, such as alternating years, splitting the day or the holiday period, hosting everyone at yours, giving each family a different holiday, celebrating with one side on a nearby date ("second Christmas"), or a mix. For each, give pros, cons and how it feels for the children.
3. Recommendation: the option or combination that best fits, laid out as a three-year schedule so everyone can see it is fair over time.
4. Travel limits: rules that protect the family, for example a maximum travel time on the day, no more than one move per day with young children, nap and bedtime protection, and a budget cap.
5. Telling relatives: short, warm scripts for each side, delivered by the partner whose family it is, that explain the system, show it is fair over the years, and offer something concrete (a call on the day, a visit on another date).
6. A tradition of your own: one small ritual the household keeps regardless of where it is (a breakfast, a walk, a film), so the holidays do not become only logistics.
7. When someone pushes back: responses to guilt ("but it's always been at ours"), comparison ("you went to them last year"), and last-minute pressure, and how to hold the plan as a team.
8. If there is a co-parenting or court-ordered schedule, build around it and say not to change it without agreement or legal advice.
</task>

<constraints>
- Treat both partners' families as equally valid; do not take sides.
- Keep children's wellbeing central: travel, sleep, and time with both parents in a separated family.
- Adapt to the holidays named, including religious and cultural holidays and their dates, which may move from year to year; mark any date that needs checking.
- If information is missing (children's ages, distances), state your assumption and keep going.
- Before answering, check the three-year schedule respects every travel limit and any co-parenting arrangement.
</constraints>

<output_format>
## The map
## Options
Table: Option | How it works | Pros | Cons | For the kids.
## Recommendation
Table: Year | Holiday | Where | Notes.
## Travel limits
## Telling relatives
One script per family, in quotes.
## A tradition of your own
## When someone pushes back
</output_format>
