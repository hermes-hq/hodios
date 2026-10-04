---
schema: 1
id: build-formula-derivation-map
kind: prompt
title: Map how formulas connect
description: Maps a course's formulas into the few core relations worth memorising and the ones that follow from them, with each derivation step, its assumptions and when it fails.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [physics, chemistry, engineering, mathematics]
requires: [none]
inputs: [text, notes]
output: [diagram, table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [formula-sheet, derivations, assumptions, memorisation]
pairs_with:
  prompts: [build-concept-map, create-cheat-sheet, create-faded-worked-examples]
args:
  - name: formulas_or_syllabus
    description: The formulas from your course or formula sheet, or the syllabus section if you do not have them listed. Say which formulas the exam gives you, if you know.
    type: text
    required: true
  - name: course
    description: The course and level, e.g. "A-level Physics mechanics", "first-year thermodynamics", "IB Chemistry HL energetics".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Core relations, Derivation map, Memorise or rebuild, Rebuild drills, Checks to trust a formula]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students in {{course}} often memorise a long list of formulas as if each were separate. Most follow from a few definitions and laws in two or three lines, and the assumptions made along the way are exactly what exam questions test ("Why can't you use this equation here?"). A useful map shows what comes from what, under which assumptions, and which few relations are worth memorising.

What it must avoid:
- Derivations that need maths beyond the course (calculus in a course that does not use it).
- Dropping assumptions, so a formula gets used where it fails (suvat with changing acceleration, ideal gas law at high pressure, small-angle pendulum at large angles).
- Claiming a link that is not a real derivation, or "deriving" an empirical law or a definition.
- Notation that differs from the course's.
</context>

<task>
<formulas>
{{formulas_or_syllabus}}
</formulas>

1. List every formula given. If only a syllabus is given, list the standard formulas for it and tag each [check against your formula sheet].
2. Classify each: definition (cannot be derived; it defines a quantity), fundamental law or principle at this level, empirical relation, or derived result.
3. Choose the core relations: the smallest set from which most of the others follow at this level. Usually 3 to 8.
4. For every derived formula, give: what it comes from, the derivation in 1 to 3 lines using only maths the course uses, the assumptions introduced, and a situation where it fails.
5. Build a tree in an indented list or code block, core relations at the top and derived formulas beneath, each edge labelled with the key step ("integrate with constant a", "substitute v = d/t", "set ΔG = 0").
6. Decide memorise or rebuild for each formula: memorise core relations, formulas the exam does not give and that take more than a few lines to derive, and anything used under time pressure many times; rebuild the rest.
7. Write 4 to 6 rebuild drills: "Starting from X and Y, derive Z", ordered easy to hard, with the expected first step as a hint.
8. Give the checks for any formula: units (dimensional analysis), limiting cases and the sign or direction of change.
</task>

<constraints>
- Check every derivation step and every unit. Do not present a derivation you cannot carry out cleanly at this level; mark it "beyond this course: memorise".
- Use the notation from the student's list; if symbols are ambiguous (for example s for displacement or entropy), say which meaning you used.
- Do not invent formulas the course does not include. Do not state which formulas the exam provides unless the student said so; tell them to check the formula booklet.
- If the course or formulas are too vague to map, ask for the formula list or syllabus section and stop.
</constraints>

<output_format>
## Core relations
Numbered list: formula, what it is (definition, law, empirical), one line on meaning.

## Derivation map
The tree, then a table: Formula | Comes from | Key step | Assumptions | Fails when.

## Memorise or rebuild
Table: Formula | Memorise or rebuild | Why.

## Rebuild drills
Numbered drills with a first-step hint each.

## Checks to trust a formula
3 to 5 bullets with one worked check on a formula from this course.
</output_format>
