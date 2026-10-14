---
schema: 1
id: reduce-noise-in-repeated-judgments
kind: prompt
title: Reduce noise in repeated judgments
description: Designs a structured process for judgments made again and again - hiring, grants, loans, admissions, grading, approvals - so different deciders reach consistent, fairer calls.
category: decision-making
version: 1.0.0
status: incubating
stage: [design]
role: [manager, operations-manager, recruiter, teacher]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [consistency, structured-judgment, rubrics, fairness, inter-rater-agreement]
pairs_with:
  prompts: [check-decision-for-biases, write-personal-decision-rules, run-calibration-session]
args:
  - name: judgment
    description: The repeated judgment, who makes it, how many per month, and how it is done today (for example "three managers each screen grant applications alone and give a yes/no").
    type: text
    required: true
  - name: problems
    description: What goes wrong now - inconsistent outcomes, complaints, appeals, decisions depending on who reviews or when.
    type: text
    required: true
  - name: constraints
    description: Optional - time per case, legal or policy rules you must follow, and anything that cannot change.
    type: text
output_contract:
  format: markdown
  sections: [Where the noise comes from, Criteria and scale, Process, Calibration, Measuring consistency, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design decision processes for judgments that are made many times by different people. When the same case would get a different answer depending on who reviews it, what mood they are in, what they saw just before, or the time of day, that variability is noise. It is separate from bias (a consistent lean in one direction) and is often larger, and it is unfair to the people being judged. The proven remedies, sometimes called decision hygiene, are: break the judgment into a few independent criteria and score each separately before forming an overall view; anchor each scale with concrete descriptions or examples; have reviewers judge independently before any discussion so the first or loudest voice does not set the answer; use relative or comparative judgments where possible; delay the overall intuition until the parts are scored; use several independent reviewers and combine their scores for high-stakes cases; and run regular calibration where reviewers score the same cases and discuss differences. Simple rules or checklists often beat unaided expert judgment on consistency, while leaving room for a documented override.

Judgment:
<judgment>
{{judgment}}
</judgment>

Current problems:
<problems>
{{problems}}
</problems>
{{#constraints}}Constraints:
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Diagnose where the noise likely comes from in the current process: unclear criteria, holistic gut scoring, order and fatigue effects, group discussion before independent views, different standards between reviewers, missing information.
2. Propose four to seven independent criteria that reflect what the judgment is for, each with a 1-4 or 1-5 anchored scale (what each level looks like, with an example). Flag any criterion that could act as a proxy for a protected characteristic.
3. Write the process step by step: information each reviewer gets, independent scoring before discussion, how scores are combined, when a second or third reviewer is used, how overrides are allowed and recorded, how ties and borderline cases are handled.
4. Design calibration: a set of shared test cases, how often reviewers score them, how differences are discussed, and how anchors are updated.
5. Explain how to measure consistency: a periodic check where two reviewers score the same cases, the share of cases with agreement within one point, and outcome tracking where possible.
6. Plan a rollout: a pilot, what to communicate to reviewers, and the time cost per case compared with now.
</task>

<constraints>
- Keep the process proportionate to the volume and stakes; do not design a 20-step process for a five-minute decision.
- Do not invent legal requirements; where the judgment affects employment, credit, housing, education or benefits, say that anti-discrimination and appeal rules apply and should be checked with the relevant specialist.
- Criteria must relate to the purpose of the judgment and be explainable to the person being judged.
- Leave room for documented human judgment; the aim is consistency, not removing discretion entirely.
</constraints>

<output_format>
## Where the noise comes from
Bullets tied to the described process.

## Criteria and scale
Table: Criterion | What it measures | 1 | 3 | 5 (or the chosen levels) | Example.

## Process
Numbered steps.

## Calibration
How, how often, with what cases.

## Measuring consistency
The check and the target.

## Rollout
Pilot, communication, time cost.
</output_format>
