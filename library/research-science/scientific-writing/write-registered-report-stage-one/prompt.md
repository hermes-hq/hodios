---
schema: 1
id: write-registered-report-stage-one
kind: prompt
title: Write a Registered Report Stage 1 manuscript
description: Drafts a Registered Report Stage 1 manuscript with the introduction, hypotheses, a design table, sampling plan, analysis plan and outcome-neutral checks reviewers judge before data exist.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [design, ship]
role: [researcher, student]
requires: [none]
inputs: [text, notes]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [registered-report, open-science, preregistration, study-protocol, journal-submission]
pairs_with:
  prompts: [write-preregistration, plan-replication-study, calculate-sample-size, write-introduction-section]
  personas: [research-methodologist, statistician]
args:
  - name: study
    description: Your research questions, theory and key prior findings (with citations you have), hypotheses, design, measures, sampling plan and analysis ideas, and any pilot data.
    type: text
    required: true
  - name: journal
    description: Optional. The target journal or platform and its Stage 1 guidelines if you have them.
    type: text
output_contract:
  format: markdown
  sections: [Introduction, Methods, Analysis plan, Design table, Outcome-neutral checks, Gaps for the authors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Registered Report is reviewed in two stages. At Stage 1, the introduction, hypotheses, methods and analysis plan are peer reviewed before data collection; if accepted in principle, the journal commits to publish regardless of results, provided the authors follow the protocol and pass pre-specified quality checks. Stage 1 reviewers look for: hypotheses that are precise and falsifiable, each linked to a specific test; a sampling plan with high power (many journals require 90% or more) or Bayesian sampling with a stated stopping rule; a smallest effect of interest justified in advance; exclusion rules and data quality checks fixed in advance; outcome-neutral criteria (manipulation checks, positive controls, floor and ceiling checks) that show the test was capable of detecting an effect; and a study design table mapping each question to its hypothesis, sampling plan, analysis, interpretation of each outcome, and the theory that could be shown wrong. The Peer Community In Registered Reports platform and many journals use this format. Stage 1 manuscripts fail when hypotheses are vague, analysis options are left open, or interpretation rules are absent.
</context>

<task>
Draft a Stage 1 manuscript from:
<study>
{{study}}
</study>
{{#journal}}
Journal and guidelines: {{journal}}
{{/journal}}

1. Draft a concise introduction that builds from the supplied literature to the gap and the hypotheses, citing only supplied sources and leaving [CITATION NEEDED] where support is missing.
2. Write each hypothesis precisely, with its direction and the test that would confirm or disconfirm it.
3. Write methods in future tense: participants and recruitment, inclusion and exclusion criteria, procedure, materials and measures, randomisation and blinding, and timeline.
4. Write the sampling plan: smallest effect of interest and its justification, power analysis with all inputs (or Bayesian design with priors and stopping rule), and the maximum sample with the reason.
5. Write the analysis plan: data preprocessing and exclusions decided now, each confirmatory test, correction for multiple tests, inference criteria, and what will be labelled exploratory.
6. Build the study design table.
7. Specify outcome-neutral checks and positive controls with thresholds.
8. List gaps the authors must fill or decide.
</task>

<constraints>
- Do not invent citations, prior effect sizes or pilot results; use placeholders and list them in the gaps.
- Every hypothesis must map to exactly one or more pre-specified tests, and every test to an interpretation rule; leave no analysis choice open without flagging it.
- Do not set power below the user's stated journal requirement; if none is given, flag that many Registered Report journals require at least 90% and ask the user to confirm.
- Keep claims proportionate; the introduction should not presuppose the results.
</constraints>

<output_format>
## Introduction
The draft introduction.
## Methods
Subsections for participants, procedure, measures and sampling plan.
## Analysis plan
Numbered confirmatory analyses and the exploratory label.
## Design table
Columns: question | hypothesis | sampling plan | analysis | interpretation given different outcomes | theory that could be shown wrong.
## Outcome-neutral checks
Checks with thresholds.
## Gaps for the authors
Bullets.
</output_format>
