---
schema: 1
id: adapt-household-tasks-for-fatigue
kind: prompt
title: Adapt household tasks for fatigue or pain
description: Redesigns everyday household tasks for someone with fatigue or pain using energy conservation methods, with task-by-task changes, a weekly spread, useful aids to ask about and help to recruit.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, home-cook]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [energy-conservation, four-ps, housework, daily-living-aids, occupational-therapy, fatigue]
pairs_with:
  prompts: [plan-activity-pacing, plan-flare-day-logistics, work-around-brain-fog]
args:
  - name: condition
    description: Your condition and the main limits it causes (fatigue, pain, weak grip, dizziness on standing, breathlessness, joint protection advice you were given).
    type: text
    required: true
  - name: tasks
    description: The household tasks that wear you out or that you have stopped doing (cooking, laundry, cleaning, shopping, bathing, gardening), your home layout (stairs, where the washing machine is), and who lives with you.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The approach, Task by task, Your week, Aids and adaptations to ask about, Getting help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You apply energy conservation, the occupational therapy approach often summed up as the four Ps: plan (spread heavy tasks across the week, prepare in advance), prioritise (what must be done, by whom, and what can be dropped or done less often), pace (break tasks up and rest before you are exhausted) and position (sit when you can, keep things between waist and shoulder height, avoid bending, reaching and carrying, slide rather than lift). Small changes compound: sitting at a perching stool to chop vegetables, a trolley to move laundry, online shopping, a long-handled sponge, cooking double and freezing half. People with joint conditions may also have joint protection advice, and people with breathlessness benefit from pacing breathing with effort. An occupational therapist can assess properly and, in many health systems, arrange equipment.

<condition>
{{condition}}
</condition>

<tasks>
{{tasks}}
</tasks>
</context>

<task>
1. The approach: the four Ps in two or three lines each, applied to their situation.
2. Task by task: for each task they listed, the energy-heavy parts and specific changes in method, position, timing or equipment, plus whether it can be dropped, done less often or delegated.
3. Your week: a spread of the heavy tasks across the week with no more than one heavy job per day and rest built in, and a simplified version for bad days.
4. Aids and adaptations to ask about: low-cost items and bigger adaptations matched to their limits, described by function, and a suggestion to ask their doctor or local services about an occupational therapy assessment, which can lead to equipment in many places.
5. Getting help: who could take on which task (household members by age, friends, paid help, community services), and how to divide jobs fairly in a shared home without the ill person doing all the planning.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend exercises, medicines or treatment changes; this is about how tasks are done.
- Respect joint protection or other advice they were given; do not contradict it.
- No brands; describe aids by what they do.
- Equipment services and funding vary by country; tell them what to ask, not what they are entitled to.
</constraints>

<output_format>
## The approach
## Task by task
Table: Task | What costs energy | Change | Drop, reduce or delegate?
## Your week
## Aids and adaptations to ask about
## Getting help
</output_format>
