---
schema: 1
id: define-internal-tool-metrics
kind: prompt
title: Define metrics for an internal tool
description: Defines a small metric set for an internal tool or process change - adoption, time on task, rework, time saved as capacity, staff ease - with baselines and ways to measure without analytics.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, operations-manager, business-analyst, manager]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [internal-tools, time-on-task, rework-rate, capacity-planning, baseline-measurement, process-change]
pairs_with:
  prompts: [run-internal-tool-feedback-pulse, define-feature-success-metrics, check-kpi-for-perverse-incentives]
args:
  - name: tool_and_goal
    description: The tool or process change (new claims system, automated report, admin panel, spreadsheet replacement), what it replaces, and the problem it should solve.
    type: text
    required: true
  - name: users_and_volume
    description: Who uses it (roles, number of people), how many times the task happens per week or month, whether use is mandatory, and what data the tool or current process records.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Goal, Metric set, Baseline plan, Measuring without analytics, Capacity calculation, Counter-metrics, Review schedule, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define how to tell whether an internal tool or process change is worth it. Internal tools are judged badly in two ways. Adoption is counted as success even when use is mandatory, so it only proves people were told to use it. And "time saved" is claimed from a demo estimate with no baseline, then multiplied by headcount into hours nobody can find.

A credible set measures the task before launch, compares like with like after, counts errors and rework as well as speed, converts time saved into capacity honestly, and asks staff whether it helps.
</context>

<task>
<tool_and_goal>
{{tool_and_goal}}
</tool_and_goal>

<users_and_volume>
{{users_and_volume}}
</users_and_volume>

1. Goal: the task, the problem, and what would make this a success in three months, in one or two sentences.
2. Metric set of four to six:
   - Adoption that means something: if use is optional, share of eligible tasks done in the tool; if mandatory, share done without falling back to old routes or side spreadsheets.
   - Time on task: median and 90th percentile minutes per task, end to end (including waiting and hand-offs if they matter).
   - Error and rework rate: share of tasks corrected, returned or redone within a set window.
   - Throughput or backlog, if the goal is speed of service.
   - Staff ease: a single 1-7 rating that the tool makes the task easy, plus one open question.
   - Downstream outcome where it applies (customer wait time, payment accuracy).
3. Baseline plan: measure the current task for two to four weeks before launch, with the same definitions. If launch has happened, use historical records or a team still on the old process as a comparison, and say how this weakens the result.
4. Measuring without analytics: timed observation of 15-30 tasks per task type spread across people and days; self-logging for a week on a simple sheet; sampling records for rework; timestamps already in email, tickets or files.
5. Capacity: minutes saved per task x tasks per month / 60 = hours per month; then apply a realisation factor of about 50-70% because saved minutes come in fragments; then say what the freed capacity will be used for. Show the arithmetic with the numbers given or [X].
6. Counter-metrics: pair speed with error rate and staff ease, and adoption with workaround use.
7. Review schedule: check at 2, 6 and 12 weeks; allow for a learning dip in the first weeks before judging.
</task>

<constraints>
- Do not invent times, volumes or savings; use only the figures given and mark the rest [X].
- Do not count logins or page views as success for a mandatory tool.
- Do not propose measuring individuals' speed for performance management; report by team or task type.
- If the task or its volume is not described, ask for them and stop.
</constraints>

<output_format>
## Goal
One or two sentences.

## Metric set
Table: metric | definition | formula | source | target direction.

## Baseline plan
Bullets with dates or durations.

## Measuring without analytics
Table: metric | method | sample size | who does it.

## Capacity calculation
The worked calculation in three to five lines.

## Counter-metrics
Bullets.

## Review schedule
Table: checkpoint | what is checked | decision possible.

## Questions
What to confirm.
</output_format>
