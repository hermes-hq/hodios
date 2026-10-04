---
schema: 1
id: plan-farm-volunteer-days
kind: prompt
title: Plan farm volunteer days
description: Plans regular volunteer days on a community, care or small farm, with tasks matched to skills, tools and supervision, a briefing, a weather fallback and ways to keep volunteers coming back.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, manager, individual]
subject: [agriculture, nonprofit]
requires: [none]
inputs: [notes, text]
output: [plan, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [farm-volunteers, community-farm, care-farming, volunteer-retention, task-planning]
pairs_with:
  prompts: [recruit-volunteers, write-volunteer-policy, write-farm-safety-induction, plan-farm-open-day]
args:
  - name: farm
    description: The farm - type, size, animals and growing areas, facilities (shelter, toilets, kitchen, tool store), and who leads on the day.
    type: text
    required: true
  - name: tasks
    description: The jobs that need doing over the coming weeks or season, with any that need skill, tools or machines.
    type: text
    required: true
  - name: volunteers
    description: Optional. Who comes - numbers, ages, experience, any support needs (care-farm participants, people with disabilities, young people), and what they say they want from it.
    type: text
  - name: frequency
    description: How often volunteer days run.
    type: enum
    enum: [weekly, fortnightly, monthly]
    default: weekly
output_contract:
  format: markdown
  sections: [Day shape, Task menu, Tools and supervision, Morning briefing, Weather fallback, Keeping volunteers, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a community, care or small farm run volunteer days that get real work done and keep people coming back. Volunteer days fail when the lead spends the morning finding tools and deciding jobs, when tasks are too dull or too risky for the people who turn up, when nobody explains why a job matters, and when a wet day sends everyone home. People stay when they feel useful, learn something, belong to a group and are thanked. Safety on farms is serious: volunteers should not use machinery, chemicals or work with large animals without training and supervision, and anyone with support needs is supported according to their own plan.

Frequency: {{frequency}}
</context>

<task>
<farm>
{{farm}}
</farm>

<tasks>
{{tasks}}
</tasks>

{{#volunteers}}
<volunteers>
{{volunteers}}
</volunteers>
{{/volunteers}}

1. Day shape: arrival and sign-in, briefing, two work blocks, a shared break, a short round-up, with times for a half day and a full day.
2. Task menu: sort the tasks into (a) anyone after a briefing, (b) after a demonstration with a skilled volunteer nearby, (c) trained or experienced people only, (d) staff only (machinery, chemicals, chainsaws, bulls and cows with calves, work at height). Show each task with group size, time, tools and the "why it matters" line to tell volunteers.
3. Tools and supervision: a tool list per task, a tool count-out and count-in routine, gloves and footwear, and supervision ratios to set with the farm (as a planning rule, one experienced lead per 6-8 adults on general tasks, closer for tools or for people with support needs; follow any care or safeguarding plan for participants and young people).
4. Write a two-minute morning briefing script: welcome, today's jobs and why, safety rules for today, hand washing after animals and before food, where toilets and first aid are, who to ask.
5. Weather fallback: indoor or covered jobs (seed sowing, tool maintenance, sorting, cleaning, propagation), heat and cold limits, and a call-off rule.
6. Keeping volunteers: rotating roles, skill-building tracks, recognition, a sense of what the farm achieved with their help (harvest weights, trees planted), social time, feedback, and a gentle way to handle no-shows.
</task>

<constraints>
- Use only the farm, tasks and volunteers described; mark gaps `[CONFIRM]`.
- Never assign machinery, chemical, chainsaw or large-animal handling to untrained volunteers.
- Safeguarding, insurance, background checks and induction duties vary by country and organisation; list them as `[CHECK locally]` and point to a volunteer policy.
- Do not ask about or record volunteers' health or personal details beyond what is needed to keep them safe, with their consent.
- If farm or tasks are missing, ask and stop.
</constraints>

<output_format>
## Day shape
Timed list for a half day and a full day.

## Task menu
Table: task | level (a-d) | group size | time | tools | why it matters.

## Tools and supervision
Bullets and the count-out routine.

## Morning briefing
The script, under 250 words.

## Weather fallback
Bullets with the call-off rule.

## Keeping volunteers
Five to eight bullets.

## Questions
Every `[CONFIRM]` and `[CHECK locally]` item.
</output_format>
