---
schema: 1
id: set-roadmap-change-rules
kind: prompt
title: Set roadmap change rules
description: Writes the rules for changing a committed roadmap mid-period - what counts as a change, who can approve it, the swap rule, an emergency lane and how changes are logged and announced.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [product-manager, engineering-manager, executive, manager]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [change-control, scope-swaps, mid-quarter-changes, interrupt-budget, decision-rights, planning-discipline]
pairs_with:
  prompts: [push-back-on-roadmap-request, run-quarterly-planning, write-roadmap-update, set-up-roadmap-cadence]
args:
  - name: situation
    description: How changes happen today (who asks, how often, through which channels), what the churn has cost, and one or two recent examples.
    type: text
    required: true
  - name: organisation
    description: Teams, planning period, who sets priorities, and any work that truly cannot wait (security, outages, legal deadlines, key customers).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is going wrong, What counts as a change, Decision rights, The swap rule, Emergency lane, Logging and announcing, Rollout, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write a short, enforceable policy for changing a roadmap after it has been committed. Two extremes fail: a plan that never changes ignores new information, and a plan that changes whenever a senior person asks becomes meaningless while context-switching eats the team's capacity. The rules that work are simple: changes below a size threshold are the team's call; larger ones need a named decider; anything added must name what comes out (the swap rule); true emergencies use a small reserved lane with a strict definition; and every change is logged and announced so nobody discovers it by accident. The policy protects the decider too: saying "this needs a swap, which item comes out?" is easier than saying no.
</context>

<task>
<situation>
{{situation}}
</situation>

<organisation>
{{organisation}}
</organisation>

1. What is going wrong: the pattern of changes today and its cost, from the situation given.
2. What counts as a change: adding, removing or swapping an item, a scope change above a size threshold, a target date moving past a set margin. State what does not count (small scope adjustments inside an item, re-ordering within the team's own work).
3. Decision rights: who decides at each size of change (team, product lead, leadership forum), with a response time for decisions.
4. The swap rule: any addition names what is removed or delayed, sized in the same units, and the requester sees the trade-off before the decision.
5. Emergency lane: a strict definition (for example security issue, outage, legal deadline, contractual breach risk), a reserved share of capacity sized from the history given, and what happens when the lane is used up.
6. Logging and announcing: a change log with date, change, requester, decider, trade-off and reason; who is told, through which channel, within what time.
7. Rollout: how to introduce the rules, who sponsors them, and a review after one period using the log (count of changes, share via emergency lane, outcomes).
</task>

<constraints>
- Keep the whole policy to about one page; the reader is a busy leader.
- Do not invent a reserved capacity share without basis; derive it from the frequency given or propose a starting figure clearly marked as a guess to revisit.
- Name roles, not people. Leadership must sponsor the policy; say so if the situation shows the main source of change is leadership itself.
- If the situation lacks how changes happen today, ask and stop.
</constraints>

<output_format>
## What is going wrong
Two to four bullets.

## What counts as a change
Counts and does not count, as two short lists.

## Decision rights
Table: size of change | who decides | response time.

## The swap rule
The rule in two or three sentences and a worked example.

## Emergency lane
Definition, reserved share with basis, what happens when exhausted.

## Logging and announcing
Log fields and the announcement routine.

## Rollout
Steps and the review after one period.

## Questions
What to confirm.
</output_format>
