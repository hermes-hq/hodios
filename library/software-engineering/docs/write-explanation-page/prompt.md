---
schema: 1
id: write-explanation-page
kind: prompt
title: Write a concept explanation page
description: Writes a docs explanation page that builds a mental model of one concept in a system - why it exists, how it works, trade-offs and common misreadings - with no step-by-step instructions.
category: docs
version: 1.0.0
status: incubating
stage: [build]
role: [technical-writer, software-engineer, architect, developer-advocate]
stack: []
requires: [none]
inputs: [text, document]
output: [docs, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [explanation, diataxis, mental-model, concept-docs]
pairs_with:
  prompts: [write-how-to-guide, reorganize-docs-by-diataxis, write-project-glossary]
  personas: [technical-writer]
args:
  - name: concept
    description: The concept to explain in the context of your product or codebase, for example "how our eventual consistency between regions works" or "why jobs are idempotent and what that means for you".
    type: string
    required: true
  - name: source_material
    description: Design docs, ADRs, code comments, engineer notes or support questions that show how the concept really works and what readers get wrong.
    type: text
    required: true
  - name: reader
    description: Who reads it and what they already know.
    type: string
---
<context>
You write an explanation page: the part of documentation that helps a reader understand rather than do. Readers come to it after a how-to guide surprised them or before designing something on top of the system. Good explanations start from the problem the concept solves, give a model the reader can reason with (often a diagram or a concrete scenario followed through), state the trade-offs and limits the designers accepted, and correct the misreadings that cause support tickets. They fail when they turn into reference tables, repeat marketing language, or hide the limits.

Concept: {{concept}}
{{#reader}}Reader: {{reader}}{{/reader}}

<source_material>
{{source_material}}
</source_material>
</context>

<task>
1. Identify from the source material what the concept is, the problem it solves, how it works at the level the reader needs, the trade-offs and limits, and the misreadings (from support questions or the notes).
2. Write a title that names the concept, and an opening that states the problem and the one-sentence model.
3. Explain how it works with one concrete scenario followed from start to end, using the system's real names. Add a simple diagram as a Mermaid block or an ASCII sketch if it helps.
4. Write a section on trade-offs and limits: what the design gives up, the boundaries (timing, size, consistency, guarantees), and what is out of scope.
5. Write a section on common misunderstandings, each as the wrong belief followed by what actually happens.
6. Link out, by description, to the how-to guides and reference pages that put the concept to use, rather than including steps.
7. List claims you could not confirm from the source material.
</task>

<constraints>
- Every behavioural claim must come from the source material; mark inferences with [verify]. Do not invent numbers such as timeouts, limits or guarantees.
- No step-by-step instructions or option tables; point to how-to and reference pages.
- State limits plainly; do not soften them into marketing language.
- Keep it readable in under ten minutes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Page
The explanation page in Markdown: title, opening, how it works with scenario and diagram, trade-offs and limits, common misunderstandings, related pages.
## Unconfirmed claims
Bullets, or "None".
</output_format>
