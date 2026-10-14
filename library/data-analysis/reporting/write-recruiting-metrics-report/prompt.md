---
schema: 1
id: write-recruiting-metrics-report
kind: prompt
title: Write a monthly recruiting metrics report
description: Writes a monthly recruiting report with hires against plan, open and aged roles, time to fill, stage conversion, source of hire quality, offer acceptance and a hiring forecast.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [recruiter, manager, executive, operations-manager]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [recruiting-funnel, time-to-fill, offer-acceptance, source-of-hire, hiring-plan]
pairs_with:
  prompts: [analyze-hiring-funnel, forecast-headcount, write-people-metrics-report, apply-small-number-suppression]
args:
  - name: recruiting_data
    description: "Aggregated applicant tracking data for the month: open roles with approval dates and stage counts, hires with dates, offers made, accepted and declined with reasons, candidates by source and stage, and the hiring plan by team and quarter. No candidate names."
    type: text
    required: true
  - name: context
    description: "How your organisation defines time to fill and time to hire, hiring manager feedback targets, recruiter capacity, hiring freezes or priority roles, and who reads the report. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Hiring against plan, Open roles, Pipeline and conversion, Sources, Offers, Forecast and risks, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A recruiting report answers whether the company will have the people its plan assumes, and where hiring is stuck. Talent leads know the definitions decide the numbers: time to fill usually runs from role approval to offer acceptance, time to hire from a candidate's application to acceptance, and mixing them makes trends meaningless. Averages are pulled up by a few roles open for months, so medians and a list of aged roles are more honest. Stage conversion shows where the funnel breaks: too few screened candidates is a sourcing problem, low conversion after hiring-manager interviews is often a calibration problem, and slow manager feedback loses candidates. Source of hire should be judged on hires and on how hires perform or stay, not on applicant volume. Offer acceptance rate and decline reasons (pay, counter-offer, process length, role clarity) are the clearest signal of competitiveness. A hiring forecast built from the current pipeline and historical conversion is more useful than the plan restated. Small roles and teams can identify candidates, so pipeline diversity figures follow minimum group sizes.
</context>

<task>
<recruiting_data>
{{recruiting_data}}
</recruiting_data>
{{#context}}

<org_context>
{{context}}
</org_context>
{{/context}}

1. State the definitions used for time to fill and time to hire; if none are given, use approval-to-acceptance and application-to-acceptance and say so.
2. Report hires this month and year to date against the hiring plan, by team.
3. List open roles with days open, flag those beyond the organisation's target or the median, and give median time to fill and time to hire.
4. Compute stage-to-stage conversion and point to the stage where most candidates are lost, with the likely cause stated as a hypothesis.
5. Report sources by hires and conversion, not by applications alone.
6. Report offers made, accepted and declined, the acceptance rate and the decline reasons grouped.
7. Forecast hires for the next one to three months from roles in late stages and historical conversion, show the gap to plan and list risks and actions.
</task>

<constraints>
- Do not include candidate names or details that identify a candidate; suppress diversity or stage figures for very small groups.
- Use medians alongside any average time measure.
- Do not judge a source or recruiter on applicant volume.
- Do not invent conversion rates; if history is missing, say the forecast is a rough range and why.
- Do not rank individual recruiters or hiring managers by name unless the context asks for it, and then add workload context.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: hires against plan, the biggest bottleneck, the forecast gap, the main action.

## Hiring against plan
Table: Team | Plan to date | Hires to date | Gap | Plan for quarter.

## Open roles
Table: Role or team | Days open | Stage of furthest candidate | Status. Median time to fill and time to hire.

## Pipeline and conversion
Table: Stage | Candidates | Conversion to next stage | Previous month.

## Sources
Table: Source | Applicants | Interviews | Hires | Conversion to hire.

## Offers
Offers made, accepted, declined, acceptance rate, grouped decline reasons.

## Forecast and risks
Expected hires by month with method, gap to plan, risks and actions with owners.

## Data notes
Bullets: definitions, suppression applied, data gaps.
</output_format>
