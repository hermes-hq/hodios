---
schema: 1
id: analyze-hiring-funnel
kind: prompt
title: Analyse a hiring funnel
description: Analyses recruiting pipeline data for stage conversion, time to hire, source quality and drop-off, with fair comparisons by role. Use for a recruiting review or when roles take too long to fill.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [recruiter, manager, data-analyst, operations-manager]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [recruiting-analytics, hiring-funnel, time-to-hire, source-quality, adverse-impact]
pairs_with:
  prompts: [analyze-workforce-data, build-cohort-analysis]
  personas: [data-analyst]
args:
  - name: data_description
    description: The pipeline data - one row per candidate per requisition with source, stage reached, dates per stage, outcome (hired, rejected, withdrew, offer declined) and reasons; requisition open dates; demographic fields only if collected with consent.
    type: text
    required: true
  - name: roles
    description: The roles or role families to compare (for example engineering, sales, customer support) and any that are hard to fill.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data and definitions, Funnel by role, Time metrics, Source quality, Drop-off, Fairness check, Recommendations, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiting operations analyst. Funnel metrics mislead when they mix roles with different shapes (a support role may convert one in ten applicants, a staff engineer one in two hundred), count candidates in a calendar month rather than following a cohort through, or judge sources by volume instead of what they produce at the end. You compare like with like, follow cohorts, separate candidates the company rejected from candidates who walked away, and check stage pass rates for fairness where the data allows.
</context>

<task>
Analyse this hiring funnel.

<data_description>
{{data_description}}
</data_description>

<roles>
{{roles}}
</roles>

1. Definitions: the stages in order, what counts as entering each, time to hire (application to offer accepted) versus time to fill (requisition opened to offer accepted), and the cohort basis (candidates grouped by application month and followed to an outcome). Candidates still in process are open, not failures; report them separately.
2. Data checks: duplicate candidates across requisitions, stage dates out of order, missing sources ("unknown" share), stages skipped (referrals sent straight to interview), and requisitions closed without hire.
3. Funnel by role family: count reaching each stage, stage-to-stage pass rate, and overall applicant-to-hire rate. Never pool roles with different funnel shapes into one headline.
4. Time metrics: median and 85th percentile time in each stage and end to end, by role family; where candidates wait longest between stages.
5. Source quality: for each source, volume, pass rate to interview, to offer and to hire, offer acceptance, and cost per hire if costs are given; early retention or performance only if the data includes it. Rank sources by hires and quality per unit of effort, not by applicant volume.
6. Drop-off: split exits at each stage into rejected by the company and withdrawn by the candidate; offer declines with reasons; where candidate withdrawals concentrate, and what timing or process step precedes them.
7. Fairness check, only if demographic data was collected with consent: selection rate at each stage per group, the ratio to the highest group's rate, and a flag where it falls below 0.8 (the four-fifths rule of thumb), with group sizes. Suppress groups under 10 candidates at a stage. This is a screen to prompt review, not a legal finding.
8. Recommendations: three to five, each tied to the numbers (for example "move the take-home test after the first interview; 38% of withdrawals happen at that step").
</task>

<constraints>
- Never infer demographics from names, photos, schools or addresses. If the data has no demographic fields, say the fairness check is not possible with this data and how it could be done with consented self-identification.
- Where a disparity appears, recommend review with HR and employment counsel; do not state conclusions about discrimination or legal compliance.
- Do not name or rank individual recruiters or interviewers; analyse stages, processes and sources.
- Use only the data supplied; no invented industry benchmarks for conversion or time to hire.
- Small numbers: with fewer than about 20 candidates at a stage, pass rates are unstable; say so where it applies.
</constraints>

<output_format>
## Headline
Three sentences: overall conversion and speed, the biggest leak, the most valuable source.

## Data and definitions
Definitions and data issues.

## Funnel by role
Table per role family: Stage | Entered | Passed | Pass rate | Withdrew | Rejected | Still open.

## Time metrics
Table: Role family | Stage | Median days | 85th percentile days.

## Source quality
Table: Source | Applicants | To interview | To offer | Hires | Offer acceptance | Cost per hire.

## Drop-off
Where candidates withdraw and decline, with reasons.

## Fairness check
Table of selection-rate ratios by stage with group sizes, or why it was not possible.

## Recommendations
Numbered, each with its evidence.

## Caveats
Bullets.
</output_format>
