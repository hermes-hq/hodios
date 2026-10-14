---
schema: 1
id: check-outcome-switching
kind: prompt
title: Check a paper against its registration
description: Compares a trial or study manuscript with its registry entry or preregistration, line by line, to find switched outcomes, changed analyses, dropped hypotheses and undeclared deviations.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [document, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [outcome-switching, preregistration, trial-registration, selective-reporting, manuscript]
pairs_with:
  prompts: [write-peer-review, review-statistical-methods, write-preregistration]
  personas: [peer-reviewer]
args:
  - name: registration
    description: The registry entry or preregistration text, with its registration date and any amendment history.
    type: text
    required: true
  - name: manuscript
    description: The manuscript's abstract, methods and results, or the full text.
    type: text
    required: true
  - name: study_dates
    description: When recruitment or data collection started, if known, to judge whether registration was prospective.
    type: string
output_contract:
  format: markdown
  sections: [Registration timing, Comparison table, Discrepancies, Questions for the authors, Overall judgement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Selective outcome reporting is one of the most common and least visible sources of bias: audits of trials in major journals found that a large share reported outcomes that differed from their registered ones, often without saying so. The typical pattern is a non-significant registered primary outcome demoted to secondary or dropped, and a significant secondary or new outcome promoted. Subtler switches change the time point, the measurement instrument, the way an outcome is scored or dichotomised, the analysis population, covariates, or the sample size. Registration only protects against this when it happened before data collection, so the timing matters. Deviations are legitimate when declared and justified; the problem is silence.
</context>

<task>
Compare this registration with the manuscript.
<registration>
{{registration}}
</registration>
<manuscript>
{{manuscript}}
</manuscript>
{{#study_dates}}
Study dates: {{study_dates}}
{{/study_dates}}

1. Establish registration timing: prospective, retrospective or unclear, using the registration date, amendments and the study dates. Note any amendments made after data collection started.
2. Extract from the registration: hypotheses, primary and secondary outcomes (with measure, time point and metric), target sample size, analysis population, main analysis and planned subgroups.
3. Extract the same items from the manuscript.
4. Compare them item by item and classify each as matches, changed and declared, changed and not declared, added, or dropped.
5. For each undeclared change, say whether it could favour the reported conclusion, for example whether the promoted outcome is the significant one.
6. Write neutral questions the reviewer or editor can put to the authors.
</task>

<constraints>
- Describe discrepancies, not motives. Undeclared changes may be innocent; the request is for disclosure and justification.
- Quote the registration and the manuscript for every discrepancy.
- If the registration lacks detail (for example no time point), say that the item cannot be checked rather than counting it as a switch.
- Do not invent registry numbers, dates or amendment history.
- If the registration was retrospective, say that it gives limited protection and why.
</constraints>

<output_format>
## Registration timing
Two or three sentences.
## Comparison table
Item | registered | reported | classification.
## Discrepancies
Numbered, with quotes and whether the change could favour the conclusion.
## Questions for the authors
Numbered, neutral wording.
## Overall judgement
Two or three sentences on the risk of selective reporting.
</output_format>
