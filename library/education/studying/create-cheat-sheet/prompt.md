---
schema: 1
id: create-cheat-sheet
kind: prompt
title: Create an exam cheat sheet
description: Condenses a course or topic into a one-page reference sheet of formulas, definitions, procedures and common traps, sized and ordered to fit the exam's allowed-materials rules.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [document, notes]
output: [summary, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [reference-sheet, formula-sheet, open-book-exam, crib-sheet, high-yield]
pairs_with:
  prompts: [make-study-guide, make-flashcards, generate-practice-exam]
args:
  - name: material
    description: The course material to condense, such as lecture notes, a syllabus with key formulas, slides text or a textbook chapter summary. The more complete, the better the selection.
    type: text
    required: true
  - name: page_limit
    description: The space allowed (for example "one A4 side", "both sides of a 3x5 index card", "two US Letter pages").
    type: string
    default: one A4 side
  - name: exam_rules
    description: What the exam allows on the sheet (handwritten only, no worked examples, typed allowed, minimum font size) and the exam format. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sheet plan, The sheet, Left off on purpose, Check before you copy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good exam reference sheet is not a summary of the course. It holds what is hard to remember and easy to get wrong under time pressure: formulas with their conditions, exact definitions, step orders for procedures, sign conventions, units, and the traps that cost marks. What a student already knows well wastes space. Layout matters as much as content: grouped by the kind of question it answers, scannable in seconds, with the most-used items where the eye lands first. Making the sheet is also one of the best revision tasks, because choosing what goes on it forces the student to judge what they know.

Space: {{page_limit}}.
{{#exam_rules}}
<exam_rules>
{{exam_rules}}
</exam_rules>
{{/exam_rules}}

<material>
{{material}}
</material>
</context>

<task>
1. Estimate the capacity: roughly how many lines and how many items fit in {{page_limit}} at a readable size (about 60 to 80 short lines per A4 side in two columns when typed small, far fewer handwritten). If the rules require handwriting, plan for fewer, shorter items. State the estimate.
2. Inventory the material into candidate items and classify each: formula (with variables, units and conditions of validity), definition, procedure (ordered steps), relationship or table, diagram cue, or trap.
3. Prioritise. Keep items that are high-yield (likely to be examined, used often) and hard to recall. Drop items that are trivial for this student's level or derivable in seconds; list them in "Left off on purpose" so the student can overrule you.
4. Lay out the sheet in sections ordered by when they are needed in an exam, using compact notation: symbols defined once, abbreviations consistent, arrows for "leads to", tables for comparisons, and one tiny worked line only where a procedure is otherwise ambiguous and the rules allow it.
5. Add a "Traps" block: sign errors, unit conversions, conditions people forget (for example "only valid for small angles", "assumes independence"), and confusable pairs.
6. Check every formula and definition against the material. If the material gives a formula with a different convention from the standard one, keep the course's version and flag the difference.
</task>

<constraints>
- Only include content that is in the material or standard for the topic. If the material seems incomplete for a topic it names, say what is missing instead of filling the gap from memory without marking it.
- Respect the exam rules. If they ban something (worked examples, printed text), do not include it and say how you adapted.
- Use plain text and Markdown that survives copying. Write formulas in readable inline notation (for example v = u + a·t) unless LaTeX is clearly expected.
- If the material is too large to fit, say so and ask which topics are examined rather than shrinking everything to illegibility.
</constraints>

<output_format>
## Sheet plan
Capacity estimate, sections in order with their share of space, and how the exam rules shaped the plan.
## The sheet
The sheet itself, in sections with short headers, ready to copy or hand-write.
## Left off on purpose
Bullets of dropped items and why, so the student can swap them back in.
## Check before you copy
Three to five items to verify against lecture notes (conventions, constants, anything flagged).
</output_format>
