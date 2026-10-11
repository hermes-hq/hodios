---
schema: 1
id: plan-process-evaluation
kind: prompt
title: Plan a process evaluation
description: Plans a process evaluation of a complex intervention or trial, covering a logic model, fidelity, dose and reach, mechanisms of impact, context and links to outcomes.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, consultant]
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
tags: [process-evaluation, implementation-fidelity, complex-interventions, logic-model, mixed-methods]
pairs_with:
  prompts: [design-mixed-methods-study, plan-pilot-study, plan-realist-review, write-research-interview-protocol]
  personas: [research-methodologist]
args:
  - name: intervention
    description: The intervention, its components, who delivers it to whom and where, and the outcome study it sits alongside (for example a cluster trial in 20 schools).
    type: text
    required: true
  - name: resources
    description: Optional. Budget, staff, timeline and any data already collected routinely.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and questions, Logic model, Implementation, Mechanisms of impact, Context, Data and timing, Analysis and integration]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An outcome evaluation says whether a complex intervention worked; a process evaluation explains why, by examining implementation, mechanisms and context. The UK Medical Research Council guidance on process evaluation frames it around three themes: implementation (what was delivered and how, including fidelity, dose, adaptations and reach), mechanisms of impact (how participants responded and what mediated change), and context (what in the setting helped or hindered). A good one starts from a logic model, asks a few focused questions, and mixes quantitative measures (delivery logs, attendance, fidelity checklists) with qualitative data (interviews, observation). Two pitfalls dominate. First, analysing process data after seeing trial outcomes can bias interpretation, so the guidance recommends analysing process data before outcomes are known, or at least separately. Second, process evaluators often become part of the intervention by giving feedback that changes delivery, which must be planned and declared. Equally common is collecting far more qualitative data than the team can analyse.
</context>

<task>
Plan a process evaluation for:
<intervention>
{{intervention}}
</intervention>
{{#resources}}
Resources: {{resources}}
{{/resources}}

1. State the purpose and three to six process questions, tied to decisions users of the evaluation will make (scale-up, adaptation, interpreting a null result).
2. Draft a logic model in text form: inputs, activities, outputs, mechanisms, short- and long-term outcomes, and assumptions. Mark which links are the intervention designers' and which need checking.
3. Plan implementation measures: fidelity (core components versus adaptable form), dose delivered and received, reach (who took part versus who was eligible), adaptations and why they happened, with the tools and who collects them.
4. Plan mechanism measures: mediators that can be measured quantitatively, and qualitative exploration of how participants engaged and responded.
5. Plan context: setting characteristics, contextual factors expected to moderate delivery or effect, and how they are captured.
6. Set data sources and timing, with sampling for qualitative work (for example purposive sampling of sites by high and low fidelity) that is realistic for the resources.
7. Plan analysis and integration: analyse process data before trial outcomes are known where possible, then integrate (for example fidelity as a moderator, qualitative explanation of variation), and decide in advance how feedback to deliverers is handled.
</task>

<constraints>
- Keep data collection proportionate to resources; say what to cut first if resources are tight.
- Do not invent the intervention's components or theory; mark assumptions.
- Keep process evaluation findings explanatory; do not present them as evidence of effectiveness.
- Address burden on deliverers and participants and consent for observation or recording.
</constraints>

<output_format>
## Purpose and questions
Purpose and numbered questions.
## Logic model
A table: element | content | source (designer / to check).
## Implementation
A table: dimension | measure | tool | who | when.
## Mechanisms of impact
Quantitative mediators and qualitative exploration.
## Context
Factors and how captured.
## Data and timing
Timeline and qualitative sampling.
## Analysis and integration
Ordered plan, including blinding to outcomes and feedback rules.
</output_format>
