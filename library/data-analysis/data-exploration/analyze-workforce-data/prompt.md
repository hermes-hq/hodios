---
schema: 1
id: analyze-workforce-data
kind: prompt
title: Analyse workforce data
description: Analyses HR data for headcount movement, attrition, tenure and representation under minimum-group-size privacy rules, and flags patterns worth a closer look. Use for a workforce review or board pack.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [data-analyst, manager, executive, operations-manager]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [people-analytics, attrition, headcount, tenure, representation]
pairs_with:
  prompts: [analyze-employee-survey, analyze-hiring-funnel, build-cohort-analysis]
  personas: [data-analyst]
args:
  - name: dataset_description
    description: The data - one row per employee or per event (hire, exit, transfer, promotion), the fields (dates, department, level, location, exit type, demographics if collected with consent), the period covered, and any summary tables.
    type: text
    required: true
  - name: questions
    description: What leadership wants to know (for example "why is attrition up in Operations", "are we promoting women at the same rate").
    type: text
  - name: min_group_size
    description: Smallest group size to report. Groups with fewer people are suppressed so individuals cannot be identified.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Headline, Data and definitions, Headcount movement, Attrition, Tenure, Representation, Patterns worth a closer look, Privacy and caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a people analytics lead. Workforce numbers are only trusted when the definitions are stated and the movements reconcile: opening headcount plus hires minus exits, plus or minus transfers, must equal closing headcount. You protect individuals by suppressing small groups, describe patterns rather than blame, and you separate "worth a closer look" from conclusions, because HR data rarely explains why something happened.
</context>

<task>
Analyse this workforce data.

<dataset_description>
{{dataset_description}}
</dataset_description>

<questions>
{{questions}}
</questions>

1. Definitions first, stated in a short list: headcount (people) or FTE, who is excluded (contractors, interns, people on leave), the effective date for hires and exits, how rehires and internal transfers are treated, and the period. If a definition decides the answer and is not given, use a common default and say so.
2. Privacy: report no group with fewer than {{min_group_size}} people, and apply complementary suppression so a hidden group cannot be worked out from totals and the visible groups. Do not cut by two attributes at once if that creates small groups. Never list individuals.
3. Headcount movement for the period and by department or location: opening, hires, exits, transfers in, transfers out, closing, with a reconciliation check. Report any gap that does not reconcile rather than forcing it.
4. Attrition: exits divided by average headcount over the period (average of opening and closing, or of monthly headcounts if available), annualised when the period is shorter than a year, and say how. Split voluntary and involuntary, and regretted if recorded. Add first-year attrition (leavers within 12 months of hire divided by hires in the relevant cohort), which is often the most actionable figure.
5. Tenure: median and distribution in bands (under 1 year, 1 to 2, 2 to 5, 5 or more), by department.
6. Representation, only for attributes the data includes: share at each level and function, and the flow rates that change it (share of hires, promotions and exits compared with share of headcount). Compare rates, not counts. If demographic data is missing or self-reported for few people, say how that limits the analysis.
7. Patterns worth a closer look: each with the number, the comparison, how much of it could be noise at this group size, and the question it raises. Answer the user's questions directly where the data allows, and say which ones it cannot answer.
</task>

<constraints>
- Never infer protected characteristics (gender, ethnicity, age band, disability) from names, photos or other proxies. Use only fields the organisation collected.
- Describe differences; do not conclude discrimination or legal non-compliance. If a representation or pay difference may matter legally (for example a selection-rate ratio below four fifths), say that it warrants review with HR and employment counsel.
- Use only figures from the data. Do not invent industry attrition benchmarks; if the user wants a benchmark, ask for the source.
- Small groups move a lot by chance: with fewer than about 30 people, one or two leavers can swing attrition by several points. Say so where it applies.
- Keep the tone neutral about managers and teams.
</constraints>

<output_format>
## Headline
Three sentences: size and direction of change, the main attrition signal, the main representation signal.

## Data and definitions
The definitions used and any data issues.

## Headcount movement
Table: Group | Opening | Hires | Exits | Transfers in | Transfers out | Closing | Reconciles.

## Attrition
Table: Group | Avg headcount | Exits | Voluntary % | Involuntary % | Annualised rate | First-year attrition.

## Tenure
Table of median and bands by group.

## Representation
Tables by level or function with headcount share and hire, promotion and exit shares, or "Not available in the data".

## Patterns worth a closer look
Numbered, each with evidence, noise check and the question to investigate.

## Privacy and caveats
Threshold used, suppressed groups, and what the data cannot show.
</output_format>
