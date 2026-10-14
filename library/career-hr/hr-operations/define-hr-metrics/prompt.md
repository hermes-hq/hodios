---
schema: 1
id: define-hr-metrics
kind: prompt
title: Define HR metrics
description: Defines a short list of HR metrics tied to leadership's people questions, each with an exact formula, data source, reporting cuts, a privacy threshold and the decision it informs.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [operations-manager, data-analyst, executive, founder]
requires: [none]
inputs: [text]
output: [table, report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hr-metrics, people-analytics, turnover-rate, absence-rate, kpi-definitions]
pairs_with:
  prompts: [select-hr-system, plan-hr-annual-calendar, analyze-pay-equity]
args:
  - name: questions
    description: What leadership wants to know about people, for example "are we losing good people", "is hiring keeping up with growth", "is absence rising in the warehouse".
    type: text
    required: true
  - name: data_available
    description: The systems and fields you have (HR system, payroll, applicant tracking, time and attendance), headcount, and team sizes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Question to metric map, Metric definitions, Data gaps, Privacy and small numbers, Reporting rhythm, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
HR dashboards fail when the same word means different things: "turnover" calculated on starting headcount one month and average headcount the next, contractors counted in one report and not another, regrettable leavers defined by whoever is asked. Experts keep a short list of metrics that answer real questions, write each formula exactly (numerator, denominator, period, inclusions and exclusions), split voluntary from involuntary and regretted from non-regretted turnover, look at early turnover (leavers in the first year) separately because it points to hiring and onboarding, annualise monthly rates the same way every time, and never show cuts small enough to identify a person.

<questions>
{{questions}}
</questions>
{{#data_available}}
<data_available>
{{data_available}}
</data_available>
{{/data_available}}
</context>

<task>
1. Question to metric map: for each leadership question, the one or two metrics that answer it and the decision they inform. Push back on questions that no metric can answer and suggest what would.
2. Metric definitions: for each metric, the exact formula, period, inclusions and exclusions (contractors, interns, internal transfers, fixed-term ends), the cuts (team, location, tenure band), a worked example with invented round numbers clearly labelled as an illustration, and how to read it (direction, what a change usually signals, common misreadings).
3. Data gaps: fields the metrics need that the data does not have, and how to start capturing them (for example a leaver reason and regretted flag at exit).
4. Privacy and small numbers: the minimum group size for any cut, how to handle small teams, and who may see individual-level data.
5. Reporting rhythm: monthly versus quarterly, rolling twelve months where volatile, and who owns each metric.
6. Questions that need a decision.
</task>

<constraints>
- Keep the list short: no more than about eight metrics unless the questions require more.
- Do not invent benchmarks for what a "good" rate is; if the user wants benchmarks, say to source them from a named survey or industry body with matching sector and location.
- Illustrations use round invented numbers and are labelled as such.
{{> output/uncertainty}}
</constraints>

<output_format>
## Question to metric map
Table: Question | Metric | Decision it informs.
## Metric definitions
One block per metric: Formula, Period, Includes, Excludes, Cuts, Illustration, How to read it.
## Data gaps
## Privacy and small numbers
## Reporting rhythm
## Questions
</output_format>
