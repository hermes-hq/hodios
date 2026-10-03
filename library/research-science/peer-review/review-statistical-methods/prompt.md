---
schema: 1
id: review-statistical-methods
kind: prompt
title: Review the statistics in a manuscript
description: Reviews a manuscript's statistics as a statistical referee would, checking design fit, assumptions, multiplicity, effect sizes, missing data and whether the conclusions follow from the analysis.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, data-scientist, editor]
requires: [none]
inputs: [document, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [statistical-review, multiplicity, missing-data, pseudoreplication, effect-size, manuscript]
pairs_with:
  prompts: [write-peer-review, assess-reproducibility, check-manuscript-reporting, write-results-section]
  personas: [statistician, peer-reviewer]
args:
  - name: manuscript_methods_and_results
    description: The methods (especially design, sample size and statistical analysis) and the results with tables, plus the abstract or conclusions so claims can be checked against the analysis.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary of design and analysis, Major statistical issues, Minor statistical issues, Checks performed, Do the conclusions follow, Recommendation on the statistics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Journals send papers to statistical reviewers because the errors that change conclusions are often statistical: an analysis that does not match the design (ignoring clustering, pairing or repeated measures), pseudoreplication, many outcomes or subgroups tested without a plan, p values without effect sizes or intervals, dichotomised continuous variables, complete-case analysis with substantial missing data, models with too many parameters for the events, selective reporting, and conclusions that go beyond what was estimated (causal claims from observational data, "no effect" from a non-significant test). A good statistical review is specific, explains why each issue matters for the conclusion, and asks for something the authors can do. It also says when the statistics are sound.
</context>

<task>
Review the statistics in this manuscript.
<manuscript>
{{manuscript_methods_and_results}}
</manuscript>

1. Summarise the design, the unit of analysis, the primary outcome, the estimand or main comparison, and the analysis, as you understand them. Note anything you had to infer.
2. Check the fit between design and analysis: independence of observations (clusters, repeated measures, multiple measurements per animal or participant), paired versus unpaired tests, correct model family for the outcome type, and adjustment for design factors such as stratification.
3. Check the sample size justification and whether the study was powered for the primary outcome; do not recommend post hoc power calculations.
4. Check assumptions and their diagnostics, model specification (covariate selection, overfitting relative to events or sample size, collinearity), and handling of outliers and transformations.
5. Check multiplicity: number of outcomes, time points, subgroups and models; whether a primary outcome was pre-specified (and matches any registration); and whether exploratory analyses are labelled.
6. Check reporting of estimates: effect sizes with confidence intervals, exact p values, consistency between text, tables and abstract. Recompute what can be recomputed from the given numbers (for example a p value from a test statistic and degrees of freedom, percentages from counts, whether reported means are possible for integer-scale data with the given n) and show the working.
7. Check missing data: amount by group, mechanism assumed, method used, and sensitivity analyses.
8. Judge whether the conclusions follow, especially causal language, generalisation and claims of "no difference" from non-significant results.
</task>

<constraints>
- Distinguish errors that could change the conclusions from matters of preference or presentation. Do not present a defensible alternative choice as an error.
- Every issue gives its location, the problem, why it matters for the conclusion, and a specific request (an analysis, a sensitivity check, a clarification or a change of wording).
- Ask for information rather than assuming the worst when the methods are unclear.
- Do not invent numbers. Recalculations use only reported values and show the formula and inputs.
- If the statistics are sound, say so plainly and keep the list of minor issues short.
- Start with one line reminding the reviewer that manuscripts under review are confidential and to check that the journal allows AI assistance.
</constraints>

<output_format>
One reminder line, then:
## Summary of design and analysis
One paragraph.
## Major statistical issues
Numbered: location - problem - why it matters - request.
## Minor statistical issues
Numbered, one or two lines each.
## Checks performed
A table: check | result | note (including any recalculations).
## Do the conclusions follow
Claim by claim, short.
## Recommendation on the statistics
Acceptable as is, minor revision, major revision, or requires re-analysis, with the deciding reasons.
</output_format>
