---
schema: 1
id: run-roadmap-mid-quarter-check
kind: prompt
title: Run a mid-quarter roadmap check
description: Runs a mid-quarter roadmap check that marks each item on track, at risk or off track with evidence and causes, and sets out the decisions needed now while there is still time to act.
category: roadmapping
version: 1.0.0
status: incubating
stage: [review, operate]
role: [product-manager, engineering-manager, project-manager, executive]
requires: [none]
inputs: [text, dataset, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [status-check, at-risk-items, rag-status, course-correction, quarterly-plan]
pairs_with:
  prompts: [run-quarterly-planning, set-roadmap-change-rules, write-roadmap-update, forecast-roadmap-dates-with-ranges]
args:
  - name: plan
    description: The quarter's committed items and outcomes, with their original targets or dates.
    type: text
    required: true
  - name: progress
    description: Where each item stands now - work done and remaining, blockers, scope changes, unplanned work that came in, and any early outcome data.
    type: text
    required: true
  - name: weeks_left
    description: Weeks remaining in the quarter.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Item status, Causes, Decisions needed now, Outcome check, Message for stakeholders]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run the check halfway through a quarter, when there is still time to change course. Retrospectives at the end only explain what went wrong; the middle is where a slipping item can be cut, re-scoped or given help. Status reports usually fail by being optimistic: everything is green until the last two weeks. Honest status needs a rule, not a feeling: compare remaining work with remaining capacity, look at whether the rate of progress so far would finish in time, and count unplanned work that has already eaten into capacity. "At risk" is only useful when it comes with a decision: cut scope, move people, drop another item, or accept the slip and tell people now.
</context>

<task>
Quarter plan:

<plan>
{{plan}}
</plan>

Progress:

<progress>
{{progress}}
</progress>

Weeks left: {{weeks_left}}

1. Give each item a status by rule: on track (remaining work fits remaining capacity with some slack at the current rate), at risk (it fits only if nothing else goes wrong), or off track (it does not fit at the current rate). Show the evidence for each.
2. Identify causes across items: scope growth, unplanned work, dependencies, estimates that were too low, people moved. Note patterns that affect several items.
3. Set out the decisions needed now for each at-risk or off-track item, with two or three options (re-scope to a smaller slice, add help, swap with another item, accept the slip) and a recommendation, naming who decides.
4. Check outcomes: for shipped items, is there early evidence they are working? For outcomes with no data yet, say when data will exist.
5. Draft a short message to stakeholders with the honest status and the decisions, written so nobody is surprised at quarter end.
</task>

<constraints>
- Use only the progress the user gave. If an item has no progress information, mark its status unknown rather than on track.
- Do not soften the status; an item that cannot finish at the current rate is off track.
- Do not blame individuals; describe causes in terms of work and decisions.
- Keep the stakeholder message under 150 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Two or three sentences: overall state and the key decisions.

## Item status
Table: item | status | evidence | main cause.

## Causes
Bullets, with patterns across items.

## Decisions needed now
Table: item | options | recommendation | decider | by when.

## Outcome check
Bullets.

## Message for stakeholders
Under 150 words.
</output_format>
