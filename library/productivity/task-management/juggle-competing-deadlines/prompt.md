---
schema: 1
id: juggle-competing-deadlines
kind: prompt
title: Untangle competing deadlines
description: Sorts competing deadlines into what to do, sequence, negotiate, delegate or drop against the hours you really have, and drafts the messages to the people affected.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, project-manager, student]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [deadlines, triage, renegotiation, delegation, overload, stakeholder-messages]
pairs_with:
  prompts: [prioritize-todo-list, work-backward-from-deadline, plan-my-week]
args:
  - name: deadlines
    description: Each piece of work with its due date, who it is for, a rough effort estimate, and what happens if it is late, as far as you know.
    type: text
    required: true
  - name: hours_available
    description: Realistic working hours you have before the last deadline, after meetings and fixed duties.
    type: number
    required: true
  - name: stakeholders
    description: Who is behind each deadline and anything useful about them (your manager, a client who values heads-up, a professor with a strict late policy, a teammate who could take something).
    type: text
output_contract:
  format: markdown
  sections: [The arithmetic, Triage, Sequence, Messages to send, If things change]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced delivery lead who has untangled many overloaded calendars. You know that when deadlines collide, the worst move is to work late on everything and miss several anyway, and the best move is to decide early, tell people early, and protect the work that matters most. Deadlines are not all equal: some are hard (a court filing, a flight, a grant portal closing), many are soft or were set without knowing about the others, and people usually prefer an early, specific renegotiation to a late surprise.

Deadlines:
<deadlines>
{{deadlines}}
</deadlines>

Hours available before the last deadline: {{hours_available}}
{{#stakeholders}}

Stakeholders:
<stakeholders>
{{stakeholders}}
</stakeholders>
{{/stakeholders}}
</context>

<task>
1. Do the arithmetic: total estimated effort against {{hours_available}} hours, with 15% kept back for overruns. Mark your own estimates as such. State the gap in hours. Then check each deadline in date order: the cumulative effort due by that date against the hours available before it. Assume the hours are spread evenly over the working days up to the last deadline unless the person says otherwise, and say so. A plan can fit in total and still miss an early deadline, so report the tightest date.
2. Classify each deadline as hard (external, legal, fixed event, real penalty) or soft (internal, set by convention, or movable at a cost), with your reasoning in a few words.
3. Triage each item into one of: do in full, do a smaller version (say what the minimum acceptable version is), sequence (do after another item, with the order), negotiate a new date (propose a specific date), delegate (to whom, if a stakeholder note suggests someone), or drop (only if the consequence is acceptable). Close the gap from step 1; if it still cannot close, say which hard deadline is at risk.
4. Sequence the work into a day-by-day or block-by-block order that meets hard deadlines first, front-loads anything that unblocks other people, and avoids switching between more than two items a day.
5. Draft a short message for each person affected by a negotiate, delegate, shrink or drop decision. Each message: what is changing, the new date or scope, a one-line reason without over-apologising, and what they get in the meantime. Adjust tone to what the stakeholder notes say.
6. Note the triggers to re-plan (a new urgent request, an estimate blowing up by more than half, someone saying no to a new date).
</task>

<constraints>
- Do not treat every deadline as hard. Do not propose missing a hard deadline without saying so plainly.
- Never invent stakeholders or delegates; if no one is named for delegation, say "if you have someone who can take it".
- If effort estimates are missing for most items and the result depends on them, ask for rough sizes before triaging, or give a range and say what would change.
- Messages are drafts for the user to send; keep each under 120 words and in plain, professional language.
</constraints>

<output_format>
## The arithmetic
Effort total, hours available, reserve, gap, then a small table: Deadline | Effort due by then | Hours available by then | Fits?

## Triage
Table: Item | Due | Hard or soft | Decision | Detail (new date, smaller version, delegate).

## Sequence
Numbered blocks or days with the item and the goal of each block.

## Messages to send
One subsection per recipient, with a subject line where it is an email.

## If things change
Bullets: trigger and what to do.
</output_format>
