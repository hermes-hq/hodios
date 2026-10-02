---
schema: 1
id: design-research-study
kind: prompt
title: Design a research study
description: Designs a study from a research question to hypotheses, design, variables, sampling and sample size, a pre-specified analysis plan and threats to validity. Use before collecting any data.
category: research-methods
version: 1.0.0
status: experimental
stage: [design]
role: [researcher, student, ux-researcher, data-scientist]
requires: [none]
inputs: [topic, text]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hypotheses, power-analysis, validity, preregistration]
pairs_with:
  prompts: [write-survey-questionnaire, write-research-proposal]
  personas: [research-methodologist, statistician]
args:
  - name: research_question
    description: The question you want to answer, as precisely as you can state it.
    type: text
    required: true
  - name: constraints
    description: Practical limits, for example budget, time, access to participants, ethics rules, data you already have.
    type: text
  - name: field
    description: Your discipline, so the design follows its conventions (for example "public health", "HCI", "economics").
    type: string
output_contract:
  format: markdown
  sections: [Question and hypotheses, Design, Variables and measures, Sampling, Procedure, Analysis plan, Threats to validity, Ethics and preregistration, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most study flaws are fixed at design time or never: a question that the design cannot answer, a sample too small to detect a plausible effect, an outcome measured badly, a confounder nobody planned for, or an analysis chosen after seeing the data. A useful design document makes each choice explicit, gives the reason, names the alternative that was rejected, and states what the study will and will not be able to conclude.
</context>

<task>
Design a study to answer:
<research_question>
{{research_question}}
</research_question>
{{#field}}
Field: {{field}}
{{/field}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Classify the question (descriptive, comparative, causal, predictive, exploratory or interpretive) and sharpen it until it names the population, the exposure or phenomenon, the comparison and the outcome.
2. Write hypotheses for confirmatory questions (each with its null and the expected direction); for exploratory or qualitative questions, write aims instead and say why.
3. Choose the design that gives the strongest answer the constraints allow (for example randomised experiment, quasi-experiment, cohort, case-control, cross-sectional, longitudinal, qualitative or mixed methods). Explain the choice against the next-best alternative.
4. Define every variable: role (outcome, exposure, covariate, confounder, mediator, moderator), operational definition, measure or instrument, and level of measurement.
5. Plan sampling: population, sampling frame, method, inclusion and exclusion criteria, and sample size. For confirmatory designs, show the power calculation inputs (test, alpha, power, smallest effect worth detecting and where it comes from) and the result, or the formula if you cannot compute it exactly. For qualitative designs, justify the sample by saturation or information power.
6. Write the procedure step by step, including randomisation, blinding and how data are collected and stored.
7. Pre-specify the analysis: primary analysis for each hypothesis, handling of missing data, covariates, multiple comparisons, and the sensitivity analyses.
8. List threats to internal, external, construct and statistical-conclusion validity, each with the mitigation built into the design.
</task>

<constraints>
- Do not invent effect sizes, prevalence figures or citations. When a number is needed and not given, use a clearly labelled assumption (for example "assuming a standardised effect of d = 0.3; replace with an estimate from prior studies or a pilot") and list it under Open decisions.
- Match the design to the question: never propose a causal claim from a design that cannot support it; say what the design can conclude instead.
- Respect the constraints. If the question cannot be answered well within them, say so and give the best feasible design plus what more resources would buy.
- If the question is too vague to design for, ask up to three questions whose answers would change the design, give the design under your stated best guess, and mark it provisional.
- Flag ethics issues (consent, vulnerable groups, deception, data protection) without giving legal advice; point to the relevant review board.
</constraints>

<output_format>
## Question and hypotheses
The sharpened question, its type, and the hypotheses or aims.
## Design
The design, why, and the rejected alternative.
## Variables and measures
A table: variable | role | operational definition | measure | level.
## Sampling
Population, frame, method, criteria, sample size with the calculation or justification.
## Procedure
Numbered steps.
## Analysis plan
Per hypothesis or aim: the analysis and the decision rule; then missing data, multiplicity and sensitivity analyses.
## Threats to validity
A table: threat | type | how the design mitigates it | residual risk.
## Ethics and preregistration
Bullets; say whether and where to preregister.
## Open decisions
Every assumption and choice the researcher must confirm.
</output_format>
