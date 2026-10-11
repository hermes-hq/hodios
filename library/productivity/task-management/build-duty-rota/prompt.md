---
schema: 1
id: build-duty-rota
kind: prompt
title: Build a duty rota
description: Builds a fair rota for shared duties at work, a club, a church or a volunteer group from people's availability, with even load, swap and cover rules, a fairness check and a message announcing it.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager, teacher, individual]
requires: [none]
inputs: [text, preferences]
output: [table, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [duty-rota, fairness, availability, swaps, cover, shared-duties]
pairs_with:
  prompts: [set-up-shared-task-board, build-reusable-checklist]
args:
  - name: duties
    description: Each duty, how often it happens, how long it takes, and how many people it needs (for example "kitchen clean-up, daily, 15 min, 1 person"; "Sunday welcome team, weekly, 2 people").
    type: text
    required: true
  - name: people
    description: Everyone on the rota with their availability, days they cannot do, and any skills a duty requires.
    type: text
    required: true
  - name: period
    description: The period to cover and its start date (for example "8 weeks from Monday 5 January"). Optional; 4 weeks is assumed.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Rota, Load per person, Swap and cover rules, Announcement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build rotas for shared duties that people accept as fair. Rotas break down when the load is uneven (the same willing people end up with the unpopular slots), when availability is ignored so people swap privately and the rota stops reflecting reality, when nobody knows what to do if they cannot make their slot, and when duties are vague so they are done badly. A good rota balances load in minutes, not number of turns, spreads the unpopular slots (early, late, weekend, the dirty job) separately, respects stated unavailability, pairs new people with experienced ones where a skill is needed, and comes with simple swap rules and a one-line description of each duty.

Duties:
<duties>
{{duties}}
</duties>

People:
<people>
{{people}}
</people>
{{#period}}Period: {{period}}{{/period}}
</context>

<task>
1. List assumptions: period and start date, what counts as an unpopular slot, and anything missing from availability.
2. Calculate the total load in minutes over the period and the fair share per person, adjusted for availability (part-timers get a proportional share).
3. Build the rota by date, respecting unavailability and skill needs, spreading unpopular slots evenly, and avoiding the same person on consecutive heavy duties where possible.
4. Show load per person in minutes and the count of unpopular slots, and flag any imbalance you could not avoid with the reason.
5. Write swap and cover rules: how to swap, who must be told, what happens if someone cannot attend at short notice, and who keeps the rota updated.
6. Write a short announcement message with a one-line description of each duty and the swap rule.
</task>

<constraints>
- Never schedule anyone on a day they said they cannot do; if coverage is impossible, show the gap rather than forcing it.
- Do not single anyone out in the announcement; keep the tone neutral.
- Use only the names given; do not invent people.
- For paid work, do not state employment rules on hours or rest breaks; if shifts are long or back to back, flag it for the user to check local rules.
- If the period is long, show the first cycle in full and the rotation pattern for the rest.
</constraints>

<output_format>
## Assumptions
Bullets.

## Rota
Table: Date | Duty | Person or people.

## Load per person
Table: Person | Minutes | Unpopular slots | Note.

## Swap and cover rules
Numbered rules.

## Announcement
Ready to send.
</output_format>
