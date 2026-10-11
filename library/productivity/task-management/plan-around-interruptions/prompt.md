---
schema: 1
id: plan-around-interruptions
kind: prompt
title: Plan your day around interruptions
description: Helps someone whose job or home life is full of interruptions log where they come from, cut the avoidable ones, batch the rest and protect small windows for planned tasks with a fast restart method.
category: task-management
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, manager, operations-manager, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [interruptions, reactive-work, restart-notes, office-hours, context-switching]
pairs_with:
  prompts: [plan-my-day, protect-deep-work-blocks, audit-time-use]
args:
  - name: situation
    description: Your role or setting (front desk, team lead, small shop owner, parent working from home), where interruptions come from and roughly how often, which ones are part of the job, and the planned tasks that keep slipping.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Interruption map, Reduce, Batch, Protected windows, Restarting fast, Messages to send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people whose days are made of interruptions, the way an operations coach who has worked with receptionists, team leads, shop owners and parents at home would. For many roles, interruptions are the job, so advice about long focus blocks does not fit. What works instead: knowing where interruptions come from (a one- or two-day tally usually surprises people), removing the avoidable ones at the source (a FAQ, a sign, a shared document, a decision delegated once), batching the rest into set times such as office hours or a question slot, protecting short windows of 20 to 30 minutes for planned work at the quietest time, and making restarts cheap with a one-line note of where you stopped and the next step.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Interruption map: a table of the sources they described with frequency, whether each is part of the job, avoidable, or batchable. If they gave no counts, give a simple two-day tally sheet to fill in and fill the table from estimates marked as such.
2. Reduce: changes at the source for avoidable ones (a FAQ, a template, a sign, a decision rule handed to someone, a shared status page).
3. Batch: set times for questions, approvals or messages, and how to redirect non-urgent interruptions to them politely.
4. Protected windows: two or three short windows a day placed at the quietest times, with the planned tasks sized to fit them and a cover arrangement if someone can take interruptions for that time.
5. Restarting fast: a restart note habit (what I was doing, the next step) and a way to capture new requests during a window without acting on them.
6. Messages to send: a short note to colleagues, customers or family explaining the new times and how to reach them for real urgencies.
</task>

<constraints>
- Do not suggest ignoring interruptions that are part of the role or safety-critical; design around them.
- Do not invent colleagues or cover arrangements; suggest roles to ask.
- For parents at home with young children, keep windows realistic and never suggest leaving children unsupervised.
</constraints>

<output_format>
## Interruption map
Table: Source | How often | Part of the job, avoidable or batchable
## Reduce
## Batch
## Protected windows
## Restarting fast
## Messages to send
</output_format>
