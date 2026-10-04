---
schema: 1
id: plan-concrete-pictorial-abstract-lesson
kind: prompt
title: Plan a concrete-pictorial-abstract maths lesson
description: Plans a maths lesson that moves through concrete, pictorial and abstract representations, with manipulatives, models, stem sentences and a check at each stage.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [mathematics, education-sector]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cpa, manipulatives, bar-model, mastery-maths, stem-sentences, representations]
pairs_with:
  prompts: [plan-number-talk, diagnose-student-misconceptions, design-formative-assessment]
args:
  - name: concept
    description: The maths concept or objective, e.g. "adding fractions with the same denominator" or "dividing a 2-digit number by a 1-digit number with remainders".
    type: string
    required: true
  - name: year_group
    description: Year group or age, e.g. "Year 3" or "Grade 6".
    type: string
    required: true
  - name: prior_knowledge_and_resources
    description: Optional. What pupils already know, common mistakes you see, the manipulatives you have (base 10, counters, fraction tiles, Cuisenaire rods) and lesson length.
    type: text
output_contract:
  format: markdown
  sections: [Learning point, Concrete, Pictorial, Abstract, Checks and misconceptions, Practice and depth]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A primary or lower-secondary maths teacher wants a lesson on {{concept}} for {{year_group}} using the concrete-pictorial-abstract approach. Done well, pupils handle a structure, see it drawn, and then connect it to symbols, so the symbols mean something. Common failures: treating it as a strict one-way ladder (only weaker pupils get objects; everyone else jumps to symbols); using a manipulative that does not show the structure of the concept; and never making the link between representations explicit, so pupils learn three separate procedures.
</context>

<task>
{{#prior_knowledge_and_resources}}
<prior_knowledge_and_resources>
{{prior_knowledge_and_resources}}
</prior_knowledge_and_resources>
{{/prior_knowledge_and_resources}}

1. Learning point: the one key idea in pupil words, the prerequisite knowledge, and a stem sentence pupils will repeat (for example "When the denominators are the same, I add the numerators and the denominator stays the same").
2. Concrete: the manipulative that best shows the structure and why; what the teacher models; what pupils do in pairs; the questions to ask while they handle it ("What is the whole? What are the parts?").
3. Pictorial: the drawing that mirrors the concrete step (bar model, part-whole model, number line, place value chart, array), drawn alongside the objects first, then without them; how pupils record it.
4. Abstract: the symbols and notation, written next to the picture so every symbol maps to something seen; one worked example in full with a non-example.
5. Keep representations side by side through the lesson and let every pupil move between them; say how to return to objects or pictures when someone is stuck.
6. Checks and misconceptions: a quick check at the end of each stage (show me, true or false, which representation matches), the two or three most likely misconceptions for this concept and how each shows up.
7. Practice and depth: varied practice that changes one thing at a time (intelligent practice), then a reasoning or problem-solving task for pupils who are secure ("convince me", "what is the same and what is different").
</task>

<constraints>
- Every number, example and answer must be mathematically correct; check them.
- Use only manipulatives listed if the teacher gave them; otherwise suggest common ones and give a drawn alternative.
- Do not state curriculum requirements as fact; if you mention where the concept sits in a curriculum, mark it [check].
- If the concept is too broad for one lesson, say so and plan the first lesson of the sequence.
</constraints>

<output_format>
## Learning point
Key idea, prerequisite, stem sentence.

## Concrete
Manipulative, teacher model, pupil task, questions.

## Pictorial
The representation (describe or sketch it in text), how it links to the concrete.

## Abstract
Notation, worked example, non-example.

## Checks and misconceptions
Table: Stage | Check question | Answer. Then bullets: misconception, how it shows, response.

## Practice and depth
Varied practice set with answers, then the depth task.
</output_format>
