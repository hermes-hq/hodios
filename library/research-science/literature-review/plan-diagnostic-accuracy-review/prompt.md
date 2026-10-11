---
schema: 1
id: plan-diagnostic-accuracy-review
kind: prompt
title: Plan a diagnostic test accuracy review
description: Plans a systematic review of diagnostic test accuracy with the index test, reference standard and target condition, search without filters, QUADAS-2 tailoring and bivariate or HSROC meta-analysis.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [diagnostic-accuracy, quadas-2, sensitivity-specificity, systematic-review, bivariate-model]
subject: [medicine, statistics]
pairs_with:
  prompts: [write-systematic-review-protocol, build-search-string, appraise-study-quality, write-summary-of-findings-table]
  personas: [research-methodologist, statistician]
args:
  - name: question
    description: The test you want to evaluate, the condition it should detect, the patients and setting, and where the test sits in the care pathway (replacement, triage or add-on).
    type: text
    required: true
  - name: context
    description: Optional. The team, deadline, and any known studies, reference standards in use or thresholds of interest.
    type: text
output_contract:
  format: markdown
  sections: [Review question, Eligibility, Search, Risk of bias and applicability, Analysis, Interpreting and reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Diagnostic test accuracy (DTA) reviews ask how well a test identifies a target condition compared with a reference standard. They differ from intervention reviews at every step. The question needs the index test, target condition, reference standard, population and the test's role in the pathway (replacement, triage or add-on), because accuracy depends on spectrum and setting. Methodological search filters for diagnostic studies miss studies and are not recommended for sensitive searches. Risk of bias is assessed with QUADAS-2 (patient selection, index test, reference standard, flow and timing), with signalling questions tailored to the review; case-control ("two-gate") designs and partial or differential verification inflate accuracy. Sensitivity and specificity are correlated through the threshold, so meta-analysis uses the bivariate model (one threshold, summary point) or the HSROC model (varying thresholds, summary curve), not separate univariate pooling. Heterogeneity is expected and explored by covariates. Results should be turned into numbers per 1,000 tested at a realistic prevalence, and certainty is rated with GRADE for DTA. Reporting follows PRISMA-DTA.
</context>

<task>
Plan a diagnostic test accuracy review for:
<question>
{{question}}
</question>
{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}

1. Structure the question: population and setting, index test (version, threshold, who reads it), target condition (with its definition), reference standard (and its own accuracy limits), and role in the pathway with comparator tests if it is a comparative review.
2. Write eligibility criteria including acceptable designs (single-gate cohort preferred; how two-gate studies are handled), minimum data (a 2x2 table derivable), and threshold handling.
3. Plan the search without diagnostic filters, with concepts for the test and the condition only, sources and grey literature.
4. Tailor QUADAS-2: signalling questions to add or drop, review-specific rules (for example acceptable interval between tests), and applicability judgements; plan duplicate assessment.
5. Plan extraction of 2x2 data per threshold, and of covariates for heterogeneity.
6. Plan the analysis: paired forest plots and ROC space plot, bivariate or HSROC model chosen by threshold reporting, handling of zero cells and few studies, pre-specified heterogeneity investigations, sensitivity analyses excluding high-risk studies, and comparative accuracy restricted to direct comparisons where possible.
7. Plan interpretation: true and false positives and negatives per 1,000 at two or three plausible prevalences (to be sourced, not assumed), GRADE for DTA, and PRISMA-DTA reporting.
</task>

<constraints>
- Do not pool sensitivity and specificity separately or recommend Youden-based pooling as the main analysis.
- Do not recommend diagnostic search filters for the main search.
- Do not invent accuracy values or prevalences; leave placeholders and say where to source them.
- Note when the reference standard is imperfect and what that does to estimates.
</constraints>

<output_format>
## Review question
A table: element | definition.
## Eligibility
Criteria list with design rules.
## Search
Concept blocks and sources.
## Risk of bias and applicability
QUADAS-2 domains with tailored questions and rules.
## Analysis
Numbered analysis plan.
## Interpreting and reporting
The per-1,000 table template, GRADE and PRISMA-DTA.
</output_format>
