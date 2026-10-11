---
schema: 1
id: synthesize-without-meta-analysis
kind: prompt
title: Synthesise studies without meta-analysis
description: Writes a SWiM-compliant synthesis of quantitative studies that cannot be pooled, with grouping, a standard metric, a stated method, tabulation, heterogeneity and certainty.
category: literature-review
version: 1.0.0
status: incubating
stage: [review, design]
role: [researcher, student]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [swim-guideline, narrative-synthesis, vote-counting, evidence-synthesis, systematic-review, effect-direction]
pairs_with:
  prompts: [build-literature-matrix, plan-meta-analysis, write-summary-of-findings-table, appraise-study-quality]
  personas: [research-methodologist, statistician]
args:
  - name: question
    description: The review question and the outcomes to synthesise.
    type: text
    required: true
  - name: studies
    description: The extracted data per study (design, sample, intervention or exposure, outcome measure, result as reported, risk of bias), ideally as a table.
    type: text
    required: true
  - name: why_not_pooled
    description: Optional. Why meta-analysis was not done (too few studies, different measures, missing variance, clinical diversity).
    type: text
output_contract:
  format: markdown
  sections: [Synthesis approach, Study grouping, Results by group, Heterogeneity and certainty, Reporting checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many reviews cannot pool effects, yet their "narrative synthesis" often means study-by-study description and an unstated, informal vote count of significant results. The SWiM (Synthesis Without Meta-analysis) reporting guideline asks reviewers to state how studies were grouped and why; which standardised metric was used (for example a standardised mean difference, odds ratio, or simply direction of effect); which synthesis method was used and why (combining P values, summarising effect estimates with median and range, or vote counting based on direction of effect, never on statistical significance); how studies were prioritised (for example by risk of bias); how heterogeneity was explored; how certainty was assessed; how data are presented (tables, effect direction plots, harvest or albatross plots); and the limits of the method. Vote counting by significance is misleading because small underpowered studies produce "no effect" results that are absence of evidence.
</context>

<task>
Synthesise without meta-analysis:
<question>
{{question}}
</question>
<studies>
{{studies}}
</studies>
{{#why_not_pooled}}
Reason pooling was not done: {{why_not_pooled}}
{{/why_not_pooled}}

1. Check the reason pooling was not done. If the data look poolable (same outcome type, effect estimates with variance available), say so and suggest plan-meta-analysis, then continue with the structured synthesis.
2. Group studies by a stated, pre-specifiable logic (intervention type, outcome domain, population) and justify the groups.
3. Choose a standardised metric per group and convert reported results where the data allow, showing each conversion; where they do not, fall back to direction of effect and say so.
4. Choose and justify a synthesis method per group: summary of effect estimates (median, interquartile range, range), combining P values, or vote counting on direction of effect with a sign test and its binomial probability and a 95% CI for the proportion favouring the intervention.
5. Present a results table per group with each study's design, n, metric, direction, risk of bias, and an effect direction plot in text form (study | outcome | direction arrow | sample size symbol | risk of bias).
6. Describe heterogeneity informally (by setting, dose, risk of bias, measure) and report a sensitivity check that drops high-risk-of-bias studies.
7. State certainty per outcome with GRADE domains in brief, noting that imprecision is harder to judge without a pooled CI.
8. Fill a SWiM checklist with where each item is addressed.
</task>

<constraints>
- Never count studies by statistical significance; vote count only on direction of effect, and explain why.
- Use only supplied data; do not invent effect sizes, variances or study details. Show any conversion formula you use.
- Do not describe the synthesis as a meta-analysis or report a pooled effect.
- Keep study-level description short; the synthesis is organised by group, not by paper.
</constraints>

<output_format>
## Synthesis approach
Grouping logic, metric, method and why pooling was not done.
## Study grouping
A table: group | studies | reason.
## Results by group
Per group: a results table, the effect direction plot and two to four sentences of synthesis.
## Heterogeneity and certainty
Heterogeneity, sensitivity check and a certainty line per outcome.
## Reporting checklist
A table: SWiM item | where addressed | note.
</output_format>
