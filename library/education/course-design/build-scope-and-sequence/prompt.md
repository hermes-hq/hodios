---
schema: 1
id: build-scope-and-sequence
kind: prompt
title: Build a scope and sequence
description: Builds a multi-year scope and sequence for a school subject, with big ideas, unit order across years, prerequisite links, planned revisits and where key knowledge is assessed.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher, manager]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [scope-and-sequence, curriculum-mapping, knowledge-rich-curriculum, spaced-revisits, prerequisites, key-stage-planning]
pairs_with:
  prompts: [design-unit-plan, align-lesson-to-standards, map-program-curriculum]
  personas: [school-curriculum-lead]
args:
  - name: subject
    description: The school subject, e.g. "history", "science", "computing", "music".
    type: string
    required: true
  - name: year_range
    description: The years or grades covered, e.g. "Years 7-9", "Grades 3-5", "ages 11-14".
    type: string
    required: true
  - name: required_curriculum
    description: Optional. The national or state curriculum statements, exam specification or school priorities the sequence must cover, plus teaching time per week and anything already fixed.
    type: text
output_contract:
  format: markdown
  sections: [Big ideas, Sequence overview, Unit details, Prerequisite chains, Revisits, Assessment points, Coverage check, Decisions for the department]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A scope and sequence is the backbone a department teaches from for years. Weak ones are lists of topics in the order the textbook happened to use, with each unit taught once and forgotten, prerequisites taught after the units that need them, and assessment that checks the unit just finished rather than whether knowledge stuck. Strong ones are built around a small number of big ideas and threads (for history: chronology, causation, evidence; for science: particles, energy, cells), order units so earlier ones make later ones easier, plan where each key concept returns in a more complex form, and assess cumulatively.

Subject: {{subject}}. Years: {{year_range}}.
</context>

<task>
{{#required_curriculum}}
<required_curriculum>
{{required_curriculum}}
</required_curriculum>
{{/required_curriculum}}

1. **Big ideas:** four to seven big ideas or threads for {{subject}} that the sequence builds over {{year_range}}, each with what a pupil understands at the start and at the end.
2. **Sequence overview:** units per year and term, with approximate weeks, fitting the stated teaching time (state your assumption if not given).
3. **Unit details:** for each unit, the core knowledge (three to five items that must be remembered: facts, concepts, procedures), the disciplinary skills, the big ideas it develops, and key vocabulary. Keep it to one table row per unit. If the range spans more than three years or about 20 units, give full rows for the first year and for exam-critical units, list the rest by title, and offer to detail them next.
4. **Prerequisite chains:** which units depend on which; check that nothing is taught before what it needs, and show the chains for the two or three most important concepts.
5. **Revisits:** where each big idea and key concept is deliberately revisited in a later year in a more complex context, not just repeated.
6. **Assessment points:** where key knowledge is assessed, including cumulative checks that test earlier units, and what a pupil should be able to show at the end of each year.
7. **Coverage check:** if a required curriculum is given, map each statement to a unit and flag anything missing or squeezed. If not, say what the sequence assumes.
8. **Decisions for the department:** trade-offs you made (depth versus breadth, what you dropped, choice of contexts, diversity of examples and voices) for the team to confirm.
</task>

<constraints>
- Order by what makes later learning easier, not by textbook order or tradition; explain non-obvious choices.
- Be realistic about time: if the required content cannot fit, say what has to be cut or reduced instead of squeezing.
- Use only the curriculum statements given; never invent statutory requirements or exam content. If the user names a framework or exam board without pasting its content, plan from the subject's widely taught content, say so, and mark every coverage claim [check against the specification].
- Represent a range of perspectives, people and places in contexts where the subject allows.
- If {{subject}} or {{year_range}} is missing, ask and stop.
</constraints>

<output_format>
## Big ideas
Table: Big idea | Start of range | End of range.
## Sequence overview
Table: Year | Term | Unit | Weeks.
## Unit details
Table: Unit | Core knowledge | Disciplinary skills | Big ideas | Key vocabulary. Short phrases, one row per unit.
## Prerequisite chains
Text chains such as Unit A -> Unit C -> Unit F, with a sentence each.
## Revisits
Table: Concept | First taught | Revisited in | How it deepens.
## Assessment points
Table: When | What is assessed | Cumulative content.
## Coverage check
Table: Requirement | Unit | Status.
## Decisions for the department
Bullets.
</output_format>
