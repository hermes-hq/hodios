---
schema: 1
id: review-registered-report
kind: prompt
title: Review a Registered Report at Stage 1 or Stage 2
description: Reviews a Registered Report against the format's own criteria, judging the question, hypotheses, power and outcome-neutral checks at Stage 1, or adherence to the accepted protocol at Stage 2.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [document]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [registered-reports, preregistration, open-science, statistical-power, manuscript]
pairs_with:
  prompts: [write-preregistration, check-outcome-switching, review-statistical-methods]
  personas: [peer-reviewer, research-methodologist]
args:
  - name: stage
    description: Which stage you are reviewing, "Stage 1" (protocol before data) or "Stage 2" (completed study).
    type: string
    required: true
  - name: manuscript
    description: The Stage 1 protocol, or for Stage 2 the full manuscript. Include the design table if there is one.
    type: text
    required: true
  - name: accepted_protocol
    description: For Stage 2, the in-principle accepted Stage 1 protocol, so adherence can be checked.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Assessment against stage criteria, Major issues, Minor issues, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Registered Reports split review into two stages so that publication does not depend on the results. At Stage 1, reviewers judge the importance of the question, the logic and plausibility of the hypotheses, the soundness and feasibility of the methods and analysis, whether the analysis is precise enough to be reproduced exactly (each hypothesis tied to a test, an inference criterion and an interpretation of every outcome), whether the sample is justified by a power analysis or a Bayesian stopping rule against a defensible smallest effect of interest, and whether outcome-neutral quality checks (manipulation checks, floor and ceiling checks, positive controls) are planned. At Stage 2, reviewers must not reject because the results are null or unexpected; they check that the authors followed the accepted protocol, that the outcome-neutral checks passed, that any deviations are declared and justified, that exploratory analyses are labelled as such, and that conclusions follow from the registered tests. Reviewers used to standard review often slip into judging Stage 2 on results.
</context>

<task>
Review this {{stage}} Registered Report.
<manuscript>
{{manuscript}}
</manuscript>
{{#accepted_protocol}}
<accepted_protocol>
{{accepted_protocol}}
</accepted_protocol>
{{/accepted_protocol}}

1. Summarise the question, hypotheses, design and planned or completed analysis.
2. If Stage 1: assess the importance of the question; the rationale and specificity of each hypothesis; the sampling plan and its justification, including the smallest effect of interest; whether every hypothesis maps to an exact test, an inference criterion and a stated interpretation of each possible outcome; outcome-neutral quality checks; exclusion rules fixed in advance; and feasibility.
3. If Stage 2: compare the completed study with the accepted protocol item by item; check that outcome-neutral checks passed; check declared and undeclared deviations; check that exploratory analyses are separated; and check that the conclusions follow from the registered tests. If the accepted protocol is missing, say what cannot be checked.
4. Sort issues into major and minor, each with a concrete request.
5. Recommend, using the format's terms: for Stage 1, in-principle acceptance, revise, or reject; for Stage 2, accept, revise, or reject only on protocol grounds.
</task>

<constraints>
- At Stage 2, never treat null, small or unexpected results as a reason to reject or to request additional confirmatory studies.
- At Stage 1, do not demand a different question; judge the proposed one on importance and rigour.
- Every issue names a location and a request.
- Do not invent effect sizes for the power analysis; ask the authors to justify the one they chose.
- Remind the reviewer that the submission is confidential and to check the journal's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary
## Assessment against stage criteria
A table: criterion | met, partly or not | note.
## Major issues
Numbered: location, problem, request.
## Minor issues
Numbered.
## Recommendation
One line, then the deciding reasons.
</output_format>
