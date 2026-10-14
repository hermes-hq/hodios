---
schema: 1
id: analyze-pay-equity
kind: prompt
title: Analyse pay equity
description: Analyses pay data for unexplained gaps between groups doing comparable work, separating the headline pay gap from like-for-like gaps, and lists cases to review and the remediation cost.
category: hr-operations
version: 1.0.0
status: incubating
stage: [review]
role: [operations-manager, executive, data-analyst, founder]
requires: [none]
inputs: [dataset]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [pay-equity, gender-pay-gap, equal-pay, pay-audit, remediation]
pairs_with:
  prompts: [design-salary-bands, allocate-merit-increases, evaluate-job-for-grading]
args:
  - name: pay_data
    description: One row per employee with an ID (no names), job family, level or grade, location, full-time equivalent, base salary, bonus or variable pay paid, tenure, performance rating if used, and the group variable(s) to compare (for example gender), only where lawfully held.
    type: text
    required: true
  - name: scope
    description: The purpose (an internal audit, a statutory gender pay gap report, or a check before a pay review), the country or state, and the groups to compare. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Headline gap, Like-for-like comparison, Cases to review, Remediation options, Reporting and next steps, Questions for an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse pay equity the way a reward analyst preparing for an equal-pay review does. Two different numbers get confused. The headline pay gap (mean and median pay of one group against another across the whole organisation) mostly reflects who holds which jobs; it matters for representation and is what many statutory reports require. Equal pay is narrower: people doing the same or comparable work should be paid the same unless a legitimate, documented factor explains the difference (level, location, market premium for a specific skill, performance under a consistent system). Experts compare within job family and level, use full-time-equivalent pay, look at bonus separately, treat small groups with care (a gap between two people is a case to review, not a statistic) and remember that "explained" factors can themselves be biased (starting-salary negotiation, ratings). Analyses like this are often run under legal privilege, so the wording and who sees it matter.

<pay_data>
{{pay_data}}
</pay_data>
{{#scope}}
<scope>
{{scope}}
</scope>
{{/scope}}
</context>

<task>
1. Data check: confirm fields, convert pay to full-time equivalent, flag missing or inconsistent levels, outliers, rows with names or extra personal data to remove, and groups too small to report. If the country or purpose is not stated, ask and mark statutory points as [LOCATION].
2. Headline gap: mean and median base pay gap, and bonus gap, between the compared groups, with the formula ((group A − group B) / group A) and the distribution of each group across levels to show how much is driven by representation.
3. Like-for-like comparison: within each job family and level (and location where pay differs by location), compare groups' average and median FTE pay and compa-ratio if ranges exist. Where data allows, describe a regression of pay on level, location, tenure and performance with and without the group variable, and report the remaining adjusted gap; if the data is too small for regression, say so and use pairwise comparisons.
4. Cases to review: list individuals (by ID) whose pay is notably below comparable peers with no documented factor in the data, with the gap and the factor HR needs to check.
5. Remediation options: the cost to close unexplained gaps (to the peer median or a set compa-ratio), phasing, and process fixes (starting-salary rules, ratings calibration, promotion criteria).
6. Reporting and next steps: what a statutory report would need if one applies (to confirm locally), how to communicate internally, and when to repeat.
7. Questions for an employment lawyer, including whether to run the review under privilege.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show every calculation; state the rounding.
- An unexplained gap is a prompt to review, not proof of discrimination; a small gap can still matter for one person. Say both.
- Never suggest lowering anyone's pay to close a gap, or dropping data to make results look better.
- Do not report results for groups small enough to identify individuals outside the HR audience; mark them.
- Use IDs, never names. Use protected data only for this analysis.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data check
## Headline gap
Table: Measure | Group A | Group B | Gap %. Then the level distribution.
## Like-for-like comparison
Table: Job family | Level | n per group | Median FTE pay per group | Gap % | Comment.
## Cases to review
Table: ID | Comparator group | Gap | Factor to check.
## Remediation options
## Reporting and next steps
## Questions for an employment lawyer
Numbered.
</output_format>
