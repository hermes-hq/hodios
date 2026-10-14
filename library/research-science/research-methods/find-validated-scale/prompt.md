---
schema: 1
id: find-validated-scale
kind: prompt
title: Find a validated scale
description: Finds candidate validated scales for a construct and compares them on psychometric evidence, length, population, language versions, scoring and licensing, with what to verify before use.
category: research-methods
version: 1.0.0
status: incubating
stage: [design]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [validated-instruments, psychometrics, questionnaire, measurement, scale-selection, cosmin]
pairs_with:
  prompts: [operationalize-variables, validate-measurement-instrument, translate-and-adapt-questionnaire, write-survey-questionnaire]
  personas: [research-methodologist]
args:
  - name: construct
    description: The construct you want to measure and how it is defined in your study, plus the population, language, mode (online, paper, interview) and any length or budget limits.
    type: text
    required: true
  - name: known_scales
    description: Any scales you have already found or that are used in your field.
    type: text
output_contract:
  format: markdown
  sections: [Construct fit, Candidates, Recommendation, Verify before use]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Using an existing validated scale usually beats writing new items: results are comparable with other studies and reviewers trust the measurement. But "validated" is not a property of a scale in general; it is evidence for a use in a population. Experts judge a scale on construct fit (does its definition match yours, and which dimensions does it cover), the quality of evidence for structural validity, internal consistency, test-retest reliability, convergent validity and responsiveness (the COSMIN framework sets standards for this), the populations and languages where it was tested, length and respondent burden, the recall period, scoring rules and norms, and licensing. Many widely used scales are free for research; others require permission or a fee, or forbid modifying items. Common mistakes: shortening or rewording items and still calling the scale validated, using a clinical screening tool as a diagnosis, mixing up the scale name with a similar one, and citing alpha alone as proof of validity.
</context>

<task>
Find validated scales for:
<construct>
{{construct}}
</construct>
{{#known_scales}}
Scales already found: {{known_scales}}
{{/known_scales}}

1. Restate the construct definition and its dimensions, and note if the definition is ambiguous enough to change which scale fits.
2. Propose candidate scales you are confident exist, including any the user named. For each give: what it measures and its dimensions, number of items, response format, recall period, populations it is commonly used with, known language versions if confident, scoring, and the licensing situation as far as you know.
3. Summarise the kind of validity and reliability evidence typically reported for each, without giving specific coefficients unless the user supplied them.
4. Recommend one, with reasons tied to this study, and a runner-up.
5. List what the user must verify in the original development paper and later validation studies: the exact item wording, scoring manual, evidence in their population and language, licence terms and whether short forms are separately validated.
6. Say how to search for more candidates (databases and search terms) and how to report the chosen scale.
</task>

<constraints>
- Name only scales you are confident exist. If unsure, say "verify this exists" rather than presenting it as fact.
- Never invent reliability coefficients, factor structures, author names, years or licence terms; mark uncertain details as to verify.
- Do not reproduce copyrighted item text in full.
- Warn when a candidate is a screening tool and must not be used to diagnose.
- Modifying items, dropping items or translating breaks the validation claim; say so.
</constraints>

<output_format>
## Construct fit
The definition and dimensions this study needs.
## Candidates
A table: scale | dimensions | items | format and recall | populations | languages | licence | fit.
## Recommendation
Choice, runner-up and reasons.
## Verify before use
A checklist, plus search terms and how to report the scale.
</output_format>
