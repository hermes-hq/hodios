---
schema: 1
id: play-school-principal
kind: prompt
title: Play a school principal for a year
description: Makes the player head of a fictional school for a year, deciding staffing, budget, behaviour, timetables and parent issues term by term, with consequences for pupils, staff wellbeing and results.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [teacher, student, individual]
subject: [education-sector]
requires: [none]
inputs: [preferences]
output: [conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [school-leadership, headteacher, education-policy, decision-game, career-taster]
pairs_with:
  prompts: [play-city-mayor-game, try-career-for-a-day]
args:
  - name: school_type
    description: The kind of school, for example "rural primary of 180 pupils", "urban secondary of 1,200", "international school". Fictional.
    type: string
    default: urban secondary of 1,200
  - name: starting_situation
    description: struggling = poor inspection and low morale; steady = average; outstanding = high expectations to keep up.
    type: enum
    enum: [struggling, steady, outstanding]
    default: struggling
  - name: turns
    description: Number of turns; each turn is half a term.
    type: number
    default: 6
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a school leadership simulation. Heads juggle competing goods with a fixed budget: staff are most of the spending, and recruitment and retention depend on workload and culture; behaviour policy affects learning time and exclusions; timetable and curriculum choices trade breadth against depth; support for pupils with additional needs costs money and matters a great deal; parents, governors or the board, inspectors and the local community all pull in different directions. Changes take time to show in results, and the effect of any one decision is uncertain. Rules and structures differ by country, so the game uses a generic fictional system.

School: {{school_type}}
Situation: {{starting_situation}}
Turns: {{turns}} half-terms
</context>

<task>
1. Before play, set the fictional school: pupils, staff and vacancies, budget, attendance, behaviour incidents, a results measure, staff morale and parent confidence (each 0 to 100), and three underlying issues the player may or may not discover (for example a weak department, a bullying problem, a leaking roof).
2. Open with the governors' or board's briefing, the dashboard and the head's diary for the first half-term with three or four items needing decisions.
3. Each turn, present three or four decisions (hiring, a behaviour policy change, a budget cut or investment, a parent complaint, a safeguarding referral to handle by process, a timetable change, a staff wellbeing request). The player decides; apply plausible, sometimes delayed effects to the dashboard and explain them.
4. Reveal an underlying issue only when the player's choices would surface it (listening to staff, a learning walk, data analysis), or when it escalates.
5. At the end, show the year's dashboard trend, an inspection-style summary in plain words, the decisions with the biggest effects, and what the head would do in year two.
</task>

<constraints>
- The school, people and system are fictional and generic; do not claim any country's specific laws, inspection grades or funding rules.
- Safeguarding items are handled by following the designated process (record, refer to the designated lead and relevant services), never by the head investigating alone; describe them without graphic detail.
- Effects are plausible, uncertain and sometimes delayed; no decision has only upsides.
- Keep the dashboard arithmetic consistent.
- If the player is a real school leader asking for advice on a real situation, step out, say this is a game, and suggest professional and local guidance.
</constraints>

<output_format>
Each turn: diary items and outcomes, then
| Measure | Value | Change |
and [Half-term n of N | Budget: … | Vacancies: n].
End: trend table, summary, biggest decisions, year-two priorities.
</output_format>
