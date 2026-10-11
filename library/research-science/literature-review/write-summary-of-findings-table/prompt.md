---
schema: 1
id: write-summary-of-findings-table
kind: prompt
title: Write a GRADE summary of findings table
description: Rates certainty of evidence per outcome with GRADE and builds a summary of findings table with absolute effects, footnoted downgrades and plain-language statements. For review and guideline teams.
category: literature-review
version: 1.0.0
status: incubating
stage: [review, ship]
role: [researcher]
requires: [none]
inputs: [text, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [grade, certainty-of-evidence, summary-of-findings, systematic-review, guideline-development]
subject: [medicine, healthcare]
pairs_with:
  prompts: [plan-meta-analysis, appraise-study-quality, extract-data-for-meta-analysis, synthesize-without-meta-analysis]
  personas: [research-methodologist, statistician]
args:
  - name: question
    description: The review question in PICO form (population, intervention, comparator, outcomes), and the setting.
    type: text
    required: true
  - name: results
    description: Per outcome, the pooled or summary results (effect estimate and 95% CI, number of studies and participants, study designs), heterogeneity, risk-of-bias summaries and any publication-bias checks.
    type: text
    required: true
  - name: baseline_risk
    description: Optional. The assumed comparator risk for each dichotomous outcome and where it comes from (control arms, a cohort, registry data).
    type: text
output_contract:
  format: markdown
  sections: [Outcomes and thresholds, Certainty assessment, Summary of findings table, Plain-language statements, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A GRADE summary of findings (SoF) table tells decision-makers, per important outcome, what the effect is and how sure we can be. Evidence from randomised trials starts at high certainty and from observational studies at low; it is rated down for risk of bias, inconsistency, indirectness, imprecision and publication bias (one or two levels each), and observational evidence may be rated up for a large effect, a dose-response gradient or when plausible confounding would reduce the effect. Experts rate imprecision against a threshold (minimal important difference or a decision threshold), not only on whether the CI crosses no effect, and avoid double-penalising one problem in two domains. They give absolute effects per 1,000 alongside relative effects, because a relative risk without a baseline risk misleads. They write plain-language statements with standard GRADE wording ("probably reduces" for moderate, "may reduce" for low, "very uncertain" for very low). Typical mistakes: rating whole reviews instead of outcomes, leaving downgrades unexplained, and inventing baseline risks.
</context>

<task>
Build a summary of findings for:
<question>
{{question}}
</question>
<results>
{{results}}
</results>
{{#baseline_risk}}
<baseline_risk>
{{baseline_risk}}
</baseline_risk>
{{/baseline_risk}}

1. List the outcomes (at most seven, critical first) and, for each, the threshold used to judge imprecision and importance. If no threshold is given, propose one, label it as an assumption for the team to confirm, and say what would change if it were different.
2. For each outcome, assess the five downgrading domains and, for observational evidence, the three upgrading domains. Give the judgement (not serious, serious, very serious) and a one-line reason that cites the supplied data.
3. Assign the overall certainty: high, moderate, low or very low.
4. Calculate absolute effects for dichotomous outcomes from the supplied baseline risk: risk with comparator per 1,000, risk with intervention per 1,000 and the difference with its CI. Show the arithmetic once. If no baseline risk is supplied, leave the cells as "baseline risk needed" and say where to get one.
5. Build the SoF table with footnote letters explaining every downgrade or upgrade.
6. Write one plain-language statement per outcome using GRADE's standard wording for its certainty level.
7. List decisions the team must confirm and data that are missing.
</task>

<constraints>
- Use only the supplied numbers. Never invent effect estimates, participant counts, baseline risks or risk-of-bias judgements.
- Do not rate the same limitation in two domains; if you considered it, note where it was counted.
- Keep relative and absolute effects consistent with each other; round absolute effects to whole numbers per 1,000 and show their CI.
- If results are missing for an outcome, keep the row and state "no studies" or "not reported" rather than dropping it.
- Ratings are provisional judgements for the review team, not final; say so once.
</constraints>

<output_format>
## Outcomes and thresholds
A table: outcome | importance | threshold | source of threshold.
## Certainty assessment
A table per outcome: domain | judgement | reason.
## Summary of findings table
Columns: outcome | relative effect (95% CI) | risk with comparator | risk with intervention | difference (95% CI) | participants (studies) | certainty | comments. Footnotes below.
## Plain-language statements
One sentence per outcome.
## Open questions
Bullets for the team.
</output_format>
