---
schema: 1
id: practise-organic-mechanism-questions
kind: prompt
title: Practise organic mechanism questions
description: Drills organic chemistry reaction mechanisms in words for exam questions, with curly arrows, intermediates and conditions, checking each step and naming the common mark-losing errors.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [chemistry]
requires: [none]
inputs: [topic, preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [organic-chemistry, reaction-mechanisms, curly-arrows, nucleophiles, electrophiles, a-level]
pairs_with:
  prompts: [create-memory-aids]
  personas: [science-tutor]
args:
  - name: reaction_types
    description: Mechanisms to drill, such as "nucleophilic substitution, elimination", "electrophilic addition to alkenes", "nucleophilic addition to carbonyls", "electrophilic substitution of benzene".
    type: string
    required: true
  - name: level
    description: Course level, which sets the expected detail (for example SN1 vs SN2 and stereochemistry at university).
    type: enum
    enum: [a-level, ib, university]
    default: a-level
  - name: questions
    description: Number of mechanisms in the session.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Mechanism review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mechanism marks are awarded per arrow and per structure: each curly arrow must start from a lone pair or a bond and end at an atom or a bond; dipoles (δ+, δ−) and lone pairs must be shown where the scheme expects them; intermediates (carbocation, tetrahedral intermediate, Wheland intermediate) need correct charges; and the conditions (reagent, solvent, temperature, catalyst) must match the pathway. Common lost marks: arrows starting from an atom or a charge instead of the lone pair, arrows pointing the wrong way, a missing lone pair on the nucleophile, a carbocation with the wrong carbon, forgetting the H+ regenerated in a catalytic step, and confusing substitution and elimination conditions (aqueous versus ethanolic hydroxide).

Mechanisms: {{reaction_types}}. Level: {{level}}. Questions: {{questions}}.
</context>

<task>
1. Explain the text notation once: describe each arrow as "arrow from [lone pair on O of OH−] to [C of C–Br]" and each structure in words or condensed formula, with charges and dipoles stated.
2. Set {{questions}} original questions one at a time, labelled "Question k of {{questions}}", each naming the starting material, reagent and conditions (or asking the student to choose them), and asking for: the mechanism name, every arrow, the intermediate with its charge, the product and by-product.
3. Mark step by step against the expected scheme for {{level}}: arrow by arrow ✓ or ✗, intermediate, product, conditions. Name each error with its usual mark consequence.
4. Give the model mechanism in the same notation, then one "why" line (for example why the tertiary carbocation forms, or why the major product follows Markovnikov's rule).
5. Mix in one "which conditions" or "which mechanism" question so the student practises choosing as well as drawing.
6. After the last question, give the review.
</task>

<constraints>
- Use standard mechanisms as taught at {{level}}; if the student's syllabus expects a convention you are not sure of, say so.
- Original questions only; do not claim they are past paper items.
- Do not give the mechanism before the student attempts it, unless they ask to skip.
- Only examples you are confident about: common substrates such as bromoethane, 2-bromo-2-methylpropane, propene, ethanal, benzene.
- Do not help with practical synthesis of hazardous or controlled substances; exam mechanisms only.
</constraints>

<output_format>
Marking: a table Step | Expected | Yours | ✓ / ✗, then the model mechanism as numbered arrows and structures, then the why line.

At the end:
## Mechanism review
Table: Question | Mechanism | Arrows correct | Main error. Then two habits to fix.
</output_format>
