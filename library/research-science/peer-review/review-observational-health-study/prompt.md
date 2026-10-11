---
schema: 1
id: review-observational-health-study
kind: prompt
title: Referee an observational health study
description: Referees a cohort, case-control or cross-sectional health study for selection bias, confounding, measurement, missing data and causal language, with STROBE gaps and a recommendation.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
subject: [medicine, healthcare]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [epidemiology, strobe, confounding, selection-bias, cohort-studies, manuscript]
pairs_with:
  prompts: [review-statistical-methods, review-causal-identification, check-manuscript-reporting]
  personas: [peer-reviewer]
args:
  - name: manuscript
    description: The manuscript, including methods, the participant flow, the baseline table, the main results tables and supplementary analyses if available.
    type: text
    required: true
  - name: journal_type
    description: Optional. The journal and its readership, for example "general medical journal" or "specialist nutrition journal".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Design and selection, Confounding, Measurement, Analysis and missing data, Interpretation, STROBE items missing, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most health research is observational, and the referee's job is to find the ways an association could arise without the claimed effect. Experienced epidemiological reviewers look for: selection bias (who entered the cohort, who was lost, controls drawn from a different base than cases); healthy-user and healthy-adherer effects; confounding by indication in drug studies; immortal time bias when exposure is defined using follow-up time; prevalent rather than new users; reverse causation, especially when early illness changes the exposure (for example weight loss before diagnosis); exposure measured once at baseline and assumed stable for decades; self-reported diet or behaviour with large measurement error; recall bias in case-control studies; adjustment for mediators or colliders; and residual confounding when the effect is small. A directed acyclic graph helps justify the adjustment set. Good papers show sensitivity analyses (E-values, negative controls, lag periods, excluding early events) and use causal language only where the design supports it. The STROBE statement lists what such reports must include.
</context>

<task>
Referee this observational study{{#journal_type}} for {{journal_type}}{{/journal_type}}.
<manuscript>
{{manuscript}}
</manuscript>

1. Summarise the question, design (cohort, case-control, cross-sectional), source population, exposure, outcome and main estimate with its interval.
2. Assess design and selection: eligibility, how participants or controls were selected, loss to follow-up, prevalent versus new users, and time-related biases such as immortal time.
3. Assess confounding: the adjustment set and how it was chosen, important confounders missing, adjustment for mediators or colliders, confounding by indication, and residual confounding relative to the effect size.
4. Assess measurement: how exposure and outcome were defined and measured, misclassification, recall bias, and whether exposure timing fits the outcome's development.
5. Assess the analysis: model choice and assumptions, missing data handling, multiplicity, and sensitivity analyses that are present or needed.
6. Judge interpretation: causal language versus design, absolute risks, consistency with prior evidence, and generalisability.
7. List missing STROBE items and recommend a decision.
</task>

<constraints>
- Tie every issue to a location in the manuscript and say what would resolve it: a specific sensitivity analysis, a clarification, or a change in wording.
- Name specific plausible confounders and biases for this question, not generic "other factors".
- Do not demand a randomised trial where one is infeasible or unethical; judge the study against the best feasible observational design.
- Do not invent results or recompute estimates from incomplete data.
- Stay respectful and impersonal, and start with one line reminding the reviewer about confidentiality and the journal's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary
## Design and selection
## Confounding
## Measurement
## Analysis and missing data
Each of the five sections above: numbered issues with location, problem, why it matters and what would resolve it.
## Interpretation
## STROBE items missing
## Recommendation
</output_format>
