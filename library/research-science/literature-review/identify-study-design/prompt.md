---
schema: 1
id: identify-study-design
kind: prompt
title: Identify a paper's study design
description: Identifies a paper's actual study design from its methods, such as RCT, cohort, case-control or quasi-experiment, and explains what that design can and cannot show.
category: literature-review
version: 1.0.0
status: incubating
stage: [review, learn]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [design-classification, critical-appraisal, causal-inference, evidence-hierarchy]
pairs_with:
  prompts: [appraise-study-quality, summarize-paper, assess-study-applicability]
  personas: [research-methodologist]
args:
  - name: methods
    description: The paper's methods section, or at least the parts describing who was studied, how they were selected or allocated, what was measured and when.
    type: text
    required: true
  - name: stated_design
    description: What the authors call the design, if they say, for example "prospective study" or "pilot RCT".
    type: string
output_contract:
  format: markdown
  sections: [Design, How I got there, What this design can show, What it cannot show, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Before anyone can appraise, rate or cite a study, they need to know what kind of study it really is, and the label in the title is often wrong or vague. "Prospective" gets used for retrospective analyses of routinely collected data, "case-control" for any comparison of two groups, "longitudinal" for two surveys of different people, and "pilot RCT" for a feasibility study that was never meant to test effect. Methodologists classify from a few questions: did the investigators assign the exposure or intervention; if so, was assignment random; is there a comparison group; were participants selected by exposure or by outcome; is there follow-up over time, and in which direction relative to data collection; what is the unit of analysis. The design then sets the ceiling on the claim: what kinds of bias are likely and whether a causal conclusion is ever possible.
</context>

<task>
Identify the study design from these methods.
{{#stated_design}}The authors call it: {{stated_design}}{{/stated_design}}
<methods>
{{methods}}
</methods>

1. Answer the classification questions in order, quoting the methods text for each: Was the exposure or intervention assigned by the investigators? Randomly? Is there a comparison group? Were participants selected by exposure, by outcome, or neither? Was there follow-up over time, and was data collected forward or looked back on from existing records? What is the unit of allocation and analysis (person, cluster, area, time period)?
2. Name the design as precisely as the text allows, for example parallel-group RCT, cluster RCT, crossover trial, non-randomised controlled study, interrupted time series, difference-in-differences, regression discontinuity, prospective or retrospective cohort, nested case-control, case-control, cross-sectional, ecological, case series, case report, diagnostic accuracy study, qualitative interview study, mixed methods, or systematic review.
3. If the authors' label differs from what the methods describe, say so plainly and explain why it matters.
4. Say what this design can show: the type of question it answers well and the strongest claim it supports (causal effect, association, prevalence, accuracy, experience, feasibility).
5. Say what it cannot show and which biases it is most exposed to (for example confounding, selection bias, recall bias, reverse causation, contamination, regression to the mean).
6. List the details to check in the full paper that would refine the classification or the limits.
</task>

<constraints>
- Classify from what the methods describe, not from the title, the abstract's label or the journal.
- Quote the text for each classification answer. Where the text does not say, write "not stated" and give the most likely reading with the alternative.
- Do not rate risk of bias or quality here; name the bias types the design is prone to and point to a formal appraisal for ratings.
- If the text is only an abstract or a title, classify provisionally and say what would confirm it.
- Avoid evidence-pyramid shortcuts: say that a well-done observational study can be more informative than a poor trial, and that the right design depends on the question.
</constraints>

<output_format>
## Design
One line with the design, and a second line if it differs from the authors' label.
## How I got there
Table: question | answer | quote or "not stated".
## What this design can show
Two to four sentences.
## What it cannot show
Bullets naming each bias and how it could affect this study.
## Questions to check
Bullets.
</output_format>
