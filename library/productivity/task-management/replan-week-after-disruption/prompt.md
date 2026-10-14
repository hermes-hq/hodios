---
schema: 1
id: replan-week-after-disruption
kind: prompt
title: Replan the week after a disruption
description: Re-plans the rest of a week after illness, an emergency or a lost day - what must still happen, what moves, what to renegotiate or drop - with messages to send and a lighter load.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, student, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [replanning, lost-days, sick-days, emergencies, renegotiate, recovery]
pairs_with:
  prompts: [plan-my-week, juggle-competing-deadlines, push-back-on-deadline-by-email]
args:
  - name: what_happened
    description: What disrupted the week and how much time it cost (for example "flu Monday to Wednesday, still tired").
    type: text
    required: true
  - name: plan
    description: What was planned for the week, with deadlines and who is waiting on each.
    type: text
    required: true
  - name: remaining_time
    description: The days and hours you realistically have left this week, given how you feel. Optional; the model will ask or assume a reduced load.
    type: string
output_contract:
  format: markdown
  sections: [What is left, Must still happen, Move renegotiate or drop, Rest of the week, Messages to send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone rebuild a week after it has been knocked off course. The instinct is to cram the lost days into the remaining ones with late nights, which fails twice: the work is worse, and recovery from illness or stress takes longer. People who recover well do a quick triage instead. They separate what truly must happen this week (hard external deadlines, things others are blocked on) from what was only planned for this week; they tell people early and specifically about anything moving, which almost everyone accepts; and they plan the remaining days at reduced capacity, especially after illness.

What happened: {{what_happened}}

Original plan:
<plan>
{{plan}}
</plan>
{{#remaining_time}}Time left: {{remaining_time}}{{/remaining_time}}
</context>

<task>
1. Estimate the time left this week. If the user is recovering from illness or stress, plan at around 60 to 70 percent of normal capacity and say so.
2. List what is left from the original plan with rough hours (marked as estimates), who is waiting, and whether the deadline is hard or self-set.
3. Pick what must still happen this week: hard external deadlines and items others are blocked on, shrunk to the minimum acceptable version where possible.
4. For everything else, decide move (to a named day next week), renegotiate (with whom), hand over (to whom, to be agreed) or drop, with a reason.
5. Lay out the remaining days with the must-do items placed first and a buffer, ending each day at a reasonable time.
6. Draft short messages for every item being moved or renegotiated: what happened in one line, the new date or option, no over-apologising and no medical detail unless the user wants it.
</task>

<constraints>
- Do not schedule evenings, nights or weekends to catch up unless the user explicitly offers them, and even then not after illness without saying the risk.
- If the must-do list still does not fit, say so and identify the item to escalate today.
- Do not invent deadlines or people; use the plan as given.
- If the disruption involves someone's health or safety and the user sounds overwhelmed, keep the plan short and point to basic support before work.
</constraints>

<output_format>
## What is left
Table: Item | Hours (est.) | Waiting | Hard or self-set deadline.

## Must still happen
Bullets with the minimum version of each.

## Move renegotiate or drop
Table: Item | Decision | New date or person | Reason.

## Rest of the week
Day by day with blocks and buffer.

## Messages to send
One per affected person, ready to send.
</output_format>
