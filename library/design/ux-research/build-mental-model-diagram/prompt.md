---
schema: 1
id: build-mental-model-diagram
kind: prompt
title: Build a mental model diagram
description: Builds a mental model diagram from interview notes, grouping people's thinking and guiding principles into towers and spaces, then mapping where the product supports them and where it leaves gaps.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [transcript, notes]
output: [diagram, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [mental-models, problem-space, interview-analysis, opportunity-mapping, support-gaps]
pairs_with:
  prompts: [synthesize-customer-interviews, build-user-journey-map, define-jobs-to-be-done]
  personas: [ux-researcher]
args:
  - name: purpose
    description: The person's larger purpose being studied, independent of any product, for example "managing a household's money" or "preparing for a court hearing".
    type: text
    required: true
  - name: notes
    description: Interview transcripts or detailed notes, ideally from listening sessions where people described their own reasoning.
    type: text
    required: true
  - name: offering
    description: What your product or service currently offers for this purpose, so support can be mapped under the towers. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Mental spaces and towers, Diagram, Support mapping, Gaps and opportunities, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A mental model diagram, as described by Indi Young, lays out the problem space from the person's point of view rather than the product's. Atomic units are short summaries of inner thinking: reactions, reasoning and guiding principles, each starting with a verb ("worry that the deposit will not come back"), drawn from what people said about what went through their mind. Similar units group into towers, towers into mental spaces, arranged left to right in rough order. Below a horizontal line, the organisation's features and services are mapped under the towers they support. The diagram's value comes from what it reveals: towers with no support beneath them, support with no tower above it, and areas the team never knew mattered. It fails when units describe product use ("clicks export"), opinions about the product, or preferences rather than thinking, and when it is built from interviews that asked about the product instead of the purpose.
</context>

<task>
<purpose>
{{purpose}}
</purpose>

<notes>
{{notes}}
</notes>
{{#offering}}

<offering>
{{offering}}
</offering>
{{/offering}}

1. Data check: say how many participants and how much of the notes describe inner reasoning versus product opinions or facts. Flag if the data is too thin or product-focused for this method.
2. Extract atomic units: verb-first summaries of thinking, feeling or guiding principle, each tagged with participant IDs. Exclude product feedback and hypothetical wishes.
3. Group units into towers (shared intent) and towers into mental spaces, ordered roughly as the purpose unfolds. Name each with a verb phrase in the person's terms.
4. Draw the diagram as a text layout: spaces as columns, towers listed beneath with unit counts.
5. Support mapping: under each tower, list the offering's features or services that support it, or "none".
6. Gaps and opportunities: unsupported towers, support with no matching tower, and thin towers worth more research.
7. Limits: sample coverage, segments missing, and what the diagram cannot say.
</task>

<constraints>
- Every unit must come from the notes and carry participant IDs; do not invent thinking.
- Units describe inner thinking, not product features or interface actions.
- Do not attach statistics to the towers; counts show coverage, not prevalence.
- Leave the support mapping empty if no offering is given, and say so.
</constraints>

<output_format>
## Data check
## Mental spaces and towers
| Mental space | Tower | Atomic units (participants) |
## Diagram
A text layout with spaces as columns and towers beneath, and the support line below.
## Support mapping
| Tower | Supporting features | Strength |
## Gaps and opportunities
## Limits
</output_format>
