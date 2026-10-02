---
schema: 1
id: estimate-with-ranges
kind: prompt
title: Estimate work as a range
description: Breaks engineering work into tasks and produces a range estimate with a confidence level, stated assumptions and the unknowns that need a spike. Use when asked "how long will this take?".
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, tech-lead, engineering-manager, project-manager]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [estimation, three-point-estimate, spikes, uncertainty]
args:
  - name: work
    description: The work to estimate, a spec, ticket or description, plus what "done" includes (tests, review, rollout, docs).
    type: text
    required: true
  - name: team_context
    description: Who does the work and their familiarity with the code, availability (meetings, on-call, other projects), and how long similar work took before.
    type: text
output_contract:
  format: markdown
  sections: [Estimate, Breakdown, Unknowns and spikes, Assumptions, What would change it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Single-number estimates are heard as promises and are almost always optimistic: they leave out review, testing, rollout and interruptions, and they hide the parts nobody understands yet. A useful estimate is a range with a stated confidence, built bottom-up from tasks small enough to reason about, and explicit about the assumptions and unknowns that drive the spread. The unknowns that matter most are better resolved with a short, time-boxed spike than argued about.
</context>

<task>
Estimate this work:
{{work}}
{{#team_context}}Team context: {{team_context}}{{/team_context}}
If you do not know who will do the work, how familiar they are with the code, or their real availability, ask once; if the user wants an answer anyway, use the assumptions "one engineer familiar with the codebase, about 60% of their time on this work" and say so.

1. Clarify scope: list what is in and out, including the parts people forget (tests, code review rounds, migrations, feature flags, monitoring, docs, deployment, coordination with other teams). Ask about anything that changes the size by more than about 20%.
2. Break the work into tasks of no more than about two ideal days each. For each task give optimistic, most-likely and pessimistic effort in ideal engineer-days, and mark its uncertainty (low, medium, high) with the reason.
3. For each high-uncertainty task, define a spike: the question it answers, a time box (normally half a day to two days), and how its answer changes the estimate.
4. Roll up: compute the expected value and spread per task with the three-point (PERT) formula, mean = (O + 4M + P) / 6 and standard deviation = (P − O) / 6, sum the means, and combine spreads (root-sum-square if tasks are independent; note when they are correlated, which widens the range). Give a 50% and an 85% confidence figure. Show the arithmetic.
5. Convert effort to calendar time using availability and parallelism, and add waiting time that is not effort (review latency, other teams, release windows).
6. List the assumptions the estimate depends on, and what would move it most.
</task>

<constraints>
- Never give a single number without its range and confidence.
- Do not pad silently. Every buffer appears as a named line with its reason.
- Do not use velocity, story points or historical figures that were not given; if they would help, ask for them.
- Label every assumption as such.
{{> output/uncertainty}}
</constraints>

<output_format>
## Estimate
One sentence: "50% likely by X, 85% likely by Y (calendar), assuming Z", then the effort range in ideal days.
## Breakdown
Table: Task | O | M | P | Mean | Uncertainty and reason. Totals row, then the roll-up arithmetic.
## Unknowns and spikes
Table: Unknown | Spike question | Time box | Effect on the estimate.
## Assumptions
Bullets.
## What would change it
The three factors that would move the estimate most, and in which direction.
</output_format>
