---
schema: 1
id: assess-validity-threats
kind: prompt
title: Assess threats to validity
description: Lists the specific internal, external, construct and statistical conclusion validity threats in your study design, rates each and gives a design-level mitigation or a limitation to report.
category: research-methods
version: 1.0.0
status: incubating
stage: [review, design]
role: [researcher, student]
requires: [none]
inputs: [text, document]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [validity, internal-validity, external-validity, construct-validity, bias, limitations]
pairs_with:
  prompts: [design-research-study, check-research-alignment, write-methods-section, write-discussion-section]
  personas: [research-methodologist]
args:
  - name: design
    description: Your study's question, design, sample and recruitment, measures, procedure and analysis.
    type: text
    required: true
  - name: stage
    description: Whether the study is still being planned or data are already collected.
    type: enum
    enum: [planning, data-collected]
    default: planning
output_contract:
  format: markdown
  sections: [Study summary, Threat table, Top threats, Limitations text]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The Shadish, Cook and Campbell typology names four kinds of validity: internal (is the relationship causal), external (to whom and where does it generalise), construct (do the measures and manipulations capture the intended concepts) and statistical conclusion (is the relationship real and estimated correctly). Generic lists of threats are easy to produce and useless; reviewers want the threats that actually apply to this design, how likely and serious they are, and what was done about them. Specific threats include selection, history, maturation, regression to the mean, testing, instrumentation, attrition, contamination, confounding by indication, mono-method bias, demand effects, reactivity, low power, fishing and multiple comparisons, violated assumptions, unreliable measures, and restriction of range. At planning stage most threats can still be designed out; after data collection they can only be analysed, bounded or reported honestly.
</context>

<task>
Assess the validity threats in:
<design>
{{design}}
</design>
Stage: {{stage}}

1. Summarise the design in three or four lines, noting the type of claim it aims to make (descriptive, associational, causal, generalising).
2. Go through internal, external, construct and statistical conclusion validity and list only the threats that plausibly apply here, explaining the specific mechanism in this study.
3. Rate each threat for likelihood and impact on the main conclusion.
4. For each, give a mitigation that fits the stage: a design change if planning, or an analysis, sensitivity check or reporting step if data are collected.
5. Name the three threats that most limit the conclusion and say how the conclusion should be worded given them.
6. Draft a limitations paragraph that is specific and honest, and notes the direction of likely bias where possible.
</task>

<constraints>
- No generic threats that do not fit this design; each threat must name its mechanism here.
- Do not overclaim mitigation: a covariate does not remove unmeasured confounding.
- Match the claim wording to the design (no causal wording for observational designs without a credible identification strategy).
- If key design information is missing, list it rather than assuming the worst or best.
</constraints>

<output_format>
## Study summary
Three or four lines and the type of claim.
## Threat table
A table: validity type | threat | mechanism here | likelihood | impact | mitigation.
## Top threats
The three most limiting threats and the conclusion wording they imply.
## Limitations text
A ready-to-edit paragraph.
</output_format>
