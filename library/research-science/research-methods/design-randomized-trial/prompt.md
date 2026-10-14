---
schema: 1
id: design-randomized-trial
kind: prompt
title: Design a randomised controlled trial
description: Designs a randomised controlled trial with arms and comparator, allocation and concealment, blinding, primary outcome, sample size, analysis population and CONSORT and SPIRIT reporting.
category: research-methods
version: 1.0.0
status: incubating
stage: [design]
role: [researcher]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [rct, clinical-trials, randomisation, blinding, consort, spirit, intention-to-treat]
pairs_with:
  prompts: [plan-pilot-study, calculate-sample-size, write-statistical-analysis-plan, plan-process-evaluation]
  personas: [research-methodologist]
args:
  - name: trial
    description: The intervention, comparison, population, setting, the outcome you care about and practical limits (sites, budget, years).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Trial question, Design choices, Outcomes, Sample size, Analysis, Conduct and oversight, Reporting and registration]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most decisions that make a trial credible are taken before the first participant: a precise question in PICO form with an estimand (what effect, in whom, handling which intercurrent events), a comparator that answers the real decision (usual care, placebo, active control), the unit of randomisation (individuals, or clusters when contamination is likely), allocation sequence generation and concealment held by someone independent of recruiters, blinding of whoever can be blinded (participants, providers, outcome assessors, analysts), a single primary outcome with its time point, a sample size from a minimal clinically important difference rather than a hoped-for effect, and an analysis population fixed in advance. SPIRIT guides the protocol and CONSORT the report, with extensions for cluster, pragmatic, non-inferiority and other designs. Common failures: unconcealed allocation, multiple primary outcomes, switching outcomes later, per-protocol analysis presented as the main result, and ignoring clustering.
</context>

<task>
Design a randomised controlled trial for:
<trial>
{{trial}}
</trial>

1. Write the trial question in PICO form and a short estimand statement. State whether the trial is explanatory or pragmatic, and superiority, non-inferiority or equivalence, with reasons.
2. Choose the design: parallel, crossover, factorial or cluster; the unit of randomisation; arms and the comparator. Justify against the main alternative.
3. Specify randomisation: sequence generation (simple, block with varied sizes, stratified, minimisation), allocation concealment method, and who holds the sequence.
4. Specify blinding for each party, and how outcome assessment is protected where participants cannot be blinded.
5. Define one primary outcome with measure and time point, secondary outcomes, and harms collection.
6. Give the sample size inputs: the minimal important difference and its source, variability, alpha, power, attrition, and design effect for clusters; show the formula or calculation and mark assumptions.
7. Pre-specify the analysis: intention-to-treat as primary, handling of missing data, adjustment for stratification factors, planned subgroups (few, with interaction tests), and any interim analysis with stopping rules.
8. Cover conduct: eligibility, recruitment and retention, adherence monitoring, data monitoring committee if needed, ethics approval, consent and registration before enrolment.
9. Note the reporting guidelines and extensions that apply.
</task>

<constraints>
- Do not invent effect sizes, MCIDs or variability estimates; mark each as an assumption to source from literature or pilot data.
- One primary outcome; others are secondary.
- Registration must happen before the first participant is enrolled; say so.
- This is a design aid, not ethics approval or regulatory advice; trials of medicines or devices need a regulatory route the user must confirm locally.
</constraints>

<output_format>
## Trial question
PICO, estimand and trial type.
## Design choices
A table: decision | choice | why | alternative rejected.
## Outcomes
Primary, secondary and harms with measures and time points.
## Sample size
Inputs and calculation in a code block.
## Analysis
Pre-specified analysis bullets.
## Conduct and oversight
Recruitment, retention, monitoring and ethics.
## Reporting and registration
Guidelines, extensions and registry.
</output_format>
