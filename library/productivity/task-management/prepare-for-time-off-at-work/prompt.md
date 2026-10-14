---
schema: 1
id: prepare-for-time-off-at-work
kind: prompt
title: Prepare for time off at work
description: Plans the two weeks before a holiday or leave from a job - what to finish, hand over or park, who covers what, the out-of-office and a calm first day back.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, software-engineer, project-manager]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [time-off, annual-leave, coverage, handover, out-of-office, pre-leave]
pairs_with:
  prompts: [write-out-of-office-message, write-handover-document, catch-up-after-leave]
args:
  - name: leave_dates
    description: First and last day off, and how many working days remain before you go (for example "off 14-25 July, 8 working days left").
    type: string
    required: true
  - name: open_work
    description: Everything currently on your plate - projects, deadlines inside or near your absence, recurring duties, things only you know how to do.
    type: text
    required: true
  - name: team
    description: Who could cover what (names or roles), your manager, and anyone external who will expect replies. Optional.
    type: text
  - name: reachability
    description: Whether you want to be fully offline or reachable for real emergencies, and how. Optional; fully offline is assumed.
    type: string
output_contract:
  format: markdown
  sections: [Sort of open work, Countdown, Coverage table, Messages to send, Out-of-office text, First day back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an employee leave for a holiday or leave without a frantic last day and without being pulled back in. People who prepare well decide early, not on the last afternoon, what will be finished, what moves to a named colleague and what simply waits. Unclear coverage is what produces "quick question" messages on day two of a holiday. Deadlines that fall during the absence must be moved or handed over explicitly; nobody silently picks them up. The last day should be light, and the first day back should be blocked for catching up, not for meetings.

Leave dates: {{leave_dates}}

Open work:
<open_work>
{{open_work}}
</open_work>
{{#team}}Team and contacts: {{team}}{{/team}}
{{#reachability}}Reachability while away: {{reachability}}{{/reachability}}
</context>

<task>
1. Sort every item into: finish before leaving, hand over (to a named person or role), pause and tell people it waits, or drop. Flag every deadline that falls during the absence or in the first three working days after it. If the leave spans the end of the calendar or financial year, also list what may expire or reset with it (unused leave, expense and timesheet cut-offs, budgets to commit, appraisal or goal deadlines) as items to check with HR, finance or the manager.
2. Check capacity: compare the "finish" pile, as estimated hours, against the working days left minus normal meetings. If it does not fit, move items to hand over or pause and say which.
3. Build a countdown from today to the last day: handover notes written by about three working days out, coverage confirmed with each person, no new commitments in the final two days, the last afternoon kept for tidying and the out-of-office.
4. Build a coverage table: item, who covers, what they may decide alone, where the information lives, and what waits for your return.
5. Draft the short messages: to the manager (dates, coverage, what is paused), to each cover person (their items and limits), and to external contacts who need advance notice.
6. Write an out-of-office text that names who to contact for what and does not promise replies you will not give.
7. Plan the first day back: no meetings in the morning, catch-up order (coverage people first, then flagged threads, then inbox), and calendar holds to book now.
</task>

<constraints>
- Do not assign cover to someone without saying the user must confirm with that person first.
- If a deadline during the absence has no realistic cover, say so and propose moving it now, not "someone will handle it".
- Respect the reachability preference: if fully offline, do not include "I'll check email occasionally" anywhere; if reachable, define what counts as an emergency and the one channel to use.
- Do not invent colleagues, clients or dates. Use roles like "[colleague who knows billing]" when names are missing.
- Keep the plan inside the working days given; never schedule work on the days off.
- Do not state an employer's or country's rules on leave carry-over, budgets or cut-offs; list them as checks unless the user gave the rule.
</constraints>

<output_format>
## Sort of open work
Table: Item | Decision (finish / hand over / pause / drop) | Deadline | Note.

## Countdown
Day by day from today to the last day, a few bullets each.

## Coverage table
Table: Item | Cover | Can decide alone | Info lives in | Waits for me.

## Messages to send
Each message under a small heading, ready to paste.

## Out-of-office text
Short text block.

## First day back
Ordered checklist and calendar holds to book now.
</output_format>
