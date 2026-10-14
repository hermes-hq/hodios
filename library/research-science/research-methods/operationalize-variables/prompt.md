---
schema: 1
id: operationalize-variables
kind: prompt
title: Operationalise research variables
description: Turns abstract constructs into measurable variables with conceptual and operational definitions, indicators, level of measurement, coding and known measurement weaknesses.
category: research-methods
version: 1.0.0
status: incubating
stage: [design]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [operational-definitions, constructs, measurement, levels-of-measurement, codebook, quantitative-research]
pairs_with:
  prompts: [write-testable-hypotheses, find-validated-scale, write-survey-questionnaire, design-research-study]
  personas: [research-methodologist]
args:
  - name: constructs
    description: The research question and the concepts you need to measure, with the population and how data will be collected (survey, records, observation, experiment).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Variable roles, Operationalisation table, Coding plan, Measurement risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Operationalisation is where many studies quietly fail. A construct like "job satisfaction" or "socioeconomic status" has several dimensions, and choosing one indicator without saying so changes what the study measures. Good practice moves from a conceptual definition (what the construct means, ideally anchored in the literature) to dimensions, to indicators, to the exact question, record or observation that yields a value, with its level of measurement (nominal, ordinal, interval, ratio) and coding. Experts also decide early whether a construct is better measured with an existing validated instrument than with home-made items, whether a single item is defensible, how "don't know" and missing values are coded, whether continuous variables will be kept continuous instead of split at arbitrary cut-offs, and whether the measure fits the population (reading level, culture, recall period).
</context>

<task>
Operationalise the constructs in:
<constructs>
{{constructs}}
</constructs>

1. List each construct and its role in the study (outcome, predictor or exposure, mediator, moderator, confounder, descriptor).
2. Give a conceptual definition for each, noting where definitions in the field differ and which one this study adopts. Flag where the user must confirm the definition from their literature.
3. Break each construct into dimensions, then indicators, then the operational definition: the exact question, item, record field, observation rule or manipulation, with the recall period or time frame.
4. Say whether an existing validated instrument is likely to exist for the construct and recommend using one rather than writing new items where it does; do not name an instrument unless confident it exists.
5. Give the level of measurement, the response format or unit, the coding scheme (including missing, not applicable and "don't know"), and any derived variable and how it is computed.
6. Identify measurement risks: single-item measures, social desirability, recall bias, ceiling or floor effects, arbitrary dichotomisation, mismatch with the population.
</task>

<constraints>
- Every operational definition must be specific enough that two researchers would record the same value.
- Do not invent psychometric figures or claim an instrument is validated for a population without the user confirming it.
- Keep continuous measures continuous unless there is a stated reason to categorise.
- State assumptions where the data source or population is unclear.
</constraints>

<output_format>
## Variable roles
A short table: construct | role.
## Operationalisation table
A table: construct | conceptual definition | dimension | indicator | operational definition | level | response format or unit.
## Coding plan
Codes for each variable, missing value codes and derived variables, in a code block if helpful.
## Measurement risks
Bullets per variable with a mitigation.
</output_format>
