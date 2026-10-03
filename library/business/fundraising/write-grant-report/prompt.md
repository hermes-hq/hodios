---
schema: 1
id: write-grant-report
kind: prompt
title: Write a grant report
description: Writes a grant progress or final report to a funder - outcomes against agreed indicators, stories shared with consent, spending against budget, challenges and learning - in the funder's format.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [manager, founder, writer]
subject: [nonprofit]
inputs: [document, dataset, text]
output: [report, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [grant-reporting, funder-relations, outcome-indicators, budget-variance, programme-officer]
pairs_with:
  prompts: [write-grant-application, write-impact-report, write-donor-appeal]
  personas: [grant-writer, nonprofit-advisor]
args:
  - name: grant_agreement_summary
    description: What was agreed - the funder, the period, the amount, the purpose, the outcomes and indicators with targets, the approved budget lines, and any reporting conditions.
    type: text
    required: true
  - name: results_and_data
    description: What happened - activities delivered, numbers against each indicator, spending by budget line, case stories (anonymised or with consent noted), changes, delays and what you learned.
    type: text
    required: true
  - name: funder_template
    description: The funder's report questions, headings and word limits, if any. Leave empty for a standard structure.
    type: text
output_contract:
  format: markdown
  sections: [Report, Data gaps and checks, Note to the programme officer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write grant reports that build trust with funders. Programme officers read reports to check that the money was used as agreed, to see what changed for people, and to learn whether to fund again; many share what they learn with their boards. They value honesty about underperformance more than polished success stories, provided the organisation explains why and what it is doing about it. Good reports answer the funder's questions in the funder's order, report every agreed indicator against its target, explain variances in budget and results, and use a story only to illustrate what the numbers show.
</context>

<task>
Write the grant report.

<grant_agreement_summary>
{{grant_agreement_summary}}
</grant_agreement_summary>

<results_and_data>
{{results_and_data}}
</results_and_data>
{{#funder_template}}
<funder_template>
{{funder_template}}
</funder_template>
{{/funder_template}}

1. Structure: follow the funder template exactly - headings, order and word limits, with a margin under each limit. If there is no template, use: Summary; Activities delivered; Outcomes against indicators; Stories of change; Finance; Challenges and changes; Learning; Next steps (or sustainability for a final report).
2. Outcomes against indicators: report every agreed indicator with target, actual, percentage of target, and data source. Distinguish outputs (activities, people reached) from outcomes (changes for people). For each indicator above or below target by more than about 10%, explain why in one or two sentences.
3. Stories of change: one or two short stories that illustrate a reported outcome, using only stories supplied; keep identifying details out unless consent is noted, and say "name changed" where relevant.
4. Finance: a table of each budget line - budget, actual, variance, and a reason for any material variance. Note any underspend and whether you will request to carry it forward or reallocate, as an ask, not an assumption.
5. Challenges and changes: what did not go to plan, the effect, and the response. Flag any change that needed or needs the funder's approval.
6. Learning: what the organisation now does differently because of this grant.
7. Data gaps and checks: a list for the author of missing data, numbers that do not reconcile, and statements to verify before submission.
8. Note to the programme officer: a short covering email that summarises the headline results and any request (carry-forward, extension, change).
</task>

<constraints>
- Use only the data supplied. Never invent numbers, quotes, stories or outcomes. Where data is missing, insert `[DATA NEEDED: ...]` and list it under Data gaps and checks.
- Report shortfalls plainly; never hide or bury an indicator that missed its target.
- Check the arithmetic: percentages of target, totals and variances must be correct.
- Protect people's privacy: no names, photos or identifying details without recorded consent; nothing that could identify a child or a person in a vulnerable situation.
- Do not claim the grant alone caused an outcome when other factors or funders contributed; use "contributed to" where appropriate.
- Match the funder's terminology for outcomes and budget lines.
</constraints>

<output_format>
## Report
The full report under the funder's headings, with an indicator table (Indicator | Target | Actual | % of target | Source | Note) and a finance table (Budget line | Budget | Actual | Variance | Reason).
## Data gaps and checks
## Note to the programme officer
</output_format>
