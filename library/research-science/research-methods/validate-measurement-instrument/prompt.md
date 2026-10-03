---
schema: 1
id: validate-measurement-instrument
kind: prompt
title: Plan validation of a survey scale or test
description: Plans the validation of a survey scale or test, covering content and construct validity, reliability, factor analysis, invariance, sample sizes and reporting. For researchers building measures.
category: research-methods
version: 1.0.0
status: incubating
stage: [design, verify]
role: [researcher, student, ux-researcher, data-scientist]
requires: [none]
inputs: [spec, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
subject: [psychology, social-sciences]
tags: [psychometrics, reliability, construct-validity, factor-analysis, measurement-invariance, cosmin]
pairs_with:
  prompts: [write-survey-questionnaire, design-research-study, write-preregistration]
  personas: [research-methodologist, statistician]
args:
  - name: instrument_description
    description: The scale or test - construct and its definition, items (paste them if you can), response format, intended use and decisions it will inform, and whether it is new, adapted or translated.
    type: text
    required: true
  - name: population
    description: Who it will be used with, for example "adolescents in Brazil" or "remote employees in the UK", including languages and subgroups you need to compare.
    type: string
output_contract:
  format: markdown
  sections: [Intended use and claims, Validation plan, Sample size plan, Analysis plan, Reporting checklist, Risks and open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Validity is not a property of an instrument but of the interpretation and use of its scores in a given population (Standards for Educational and Psychological Testing; COSMIN for health measures). A validation plan therefore starts from the intended use and builds an argument from several kinds of evidence: content (do items cover the construct, judged by experts and the target group), response process (cognitive interviews), internal structure (factor analysis, dimensionality, measurement invariance), relations to other variables (convergent, discriminant, known-groups, criterion), and consequences. Reliability (internal consistency, test-retest, inter-rater) is necessary but not sufficient. Common mistakes: treating a high Cronbach's alpha as proof of validity, running exploratory and confirmatory factor analysis on the same sample, using fit-index cut-offs as strict rules, skipping invariance before comparing groups, and translating a scale without cultural adaptation.
</context>

<task>
Plan the validation of this instrument.
<instrument>
{{instrument_description}}
</instrument>
{{#population}}Population: {{population}}{{/population}}

1. State the intended use and the score interpretations to be supported (for example "rank individuals", "compare groups", "detect change over time", "screen against a cut-off"). Each claim determines the evidence needed.
2. Design the validation in phases with the evidence each provides: construct definition and item review; content validity with an expert panel (for example item and scale content validity indices) and target-group review; cognitive interviews; pilot and item analysis; structural validation; reliability; relations to other variables; invariance across the subgroups that will be compared; and responsiveness or cut-off derivation if the use requires them. Skip phases that do not apply and say why.
3. For an adapted or translated instrument, add forward and back translation, reconciliation, harmonisation and cognitive testing, and plan invariance testing against the original language version where data allow.
4. Give a sample size plan per phase with reasoning, not a single rule of thumb: for factor analysis, account for the number of items and factors, expected communalities and the need for separate samples (or a split sample) for exploratory and confirmatory analysis; for test-retest, the precision of the intraclass correlation and a retest interval matched to how stable the construct is; for known-groups and convergent analyses, the expected effect or correlation.
5. Specify the analyses: item distributions, floor and ceiling effects, item-total correlations; estimator choice for ordinal items (for example WLSMV or polychoric-based estimation); fit indices reported together with their conventional benchmarks and the caveat that they are guides, not pass marks; reliability with McDonald's omega alongside alpha and their confidence intervals; ICC model and type for test-retest; standard error of measurement and smallest detectable change if change will be measured; configural, metric and scalar invariance; and where item response theory would add value.
6. List what to report and which guideline or checklist to follow.
</task>

<constraints>
- Name convergent and discriminant measures only as types ("an established measure of loneliness"), unless the user named them; never invent a validated instrument or its psychometric properties.
- Say plainly when the intended use is not supportable by the plan (for example clinical screening without a reference standard).
- Treat numeric benchmarks as conventions with a source tradition, not laws, and say how to proceed if the data miss them (re-specify with theory, not with modification indices alone).
- If the construct definition or items are missing or unclear, list exactly what is needed and give the plan with stated assumptions rather than guessing the items.
</constraints>

<output_format>
## Intended use and claims
The use, the score interpretations, and the evidence each needs.
## Validation plan
A table: phase | purpose | method | participants | output | evidence type.
## Sample size plan
Per phase, with reasoning.
## Analysis plan
Bulleted by phase, with the decision rules.
## Reporting checklist
The items to report and the guideline that applies.
## Risks and open questions
What could undermine validity and what you need from the user.
</output_format>
