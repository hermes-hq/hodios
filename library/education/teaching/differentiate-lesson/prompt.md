---
schema: 1
id: differentiate-lesson
kind: prompt
title: Differentiate a lesson
description: Adapts an existing lesson for mixed abilities, English learners and students with documented accommodations while keeping the same learning goal. Use when one lesson must reach a varied class.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher]
requires: [none]
inputs: [document, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [differentiation, udl, english-learners, accommodations]
pairs_with:
  prompts: [write-lesson-plan, design-classroom-activity]
  personas: [instructional-coach]
args:
  - name: lesson
    description: The existing lesson plan or activity, as written.
    type: text
    required: true
  - name: learner_needs
    description: The groups of learners to plan for, described without names, e.g. "4 students reading two years below grade; 3 newcomer English learners (Spanish, Arabic); 1 student with an IEP for extended time and text-to-speech; 5 students who finish early".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Core goal, Adaptations by segment, Materials to prepare, Grouping, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Differentiation goes wrong in two directions: lowering the goal for some students ("they'll just colour the diagram"), or making three separate lessons the teacher cannot run. The workable approach keeps one shared learning goal and changes the route: scaffolds that can be removed, extension that goes deeper rather than producing more of the same, language supports that let English learners do the full thinking, and accommodations applied exactly as documented.
</context>

<task>
Adapt this lesson for the learners described.

<lesson>
{{lesson}}
</lesson>

<learner_needs>
{{learner_needs}}
</learner_needs>

1. State the lesson's core learning goal in one sentence. Every adaptation must still lead to it.
2. Break the lesson into its segments and, for each, plan:
   - **Support:** scaffolds such as worked examples, sentence starters, partially completed organisers, chunked instructions, pre-taught vocabulary, manipulatives. Say when each scaffold is faded.
   - **Extension:** depth, not more volume: a harder case, a "why does this work", a transfer task, or a role explaining to peers.
   - **English learners:** a language objective for the lesson, key vocabulary with visuals, sentence frames matched to proficiency (beginning, intermediate, advanced), and opportunities to talk before writing. Allow home-language use for thinking where it helps.
   - **Accommodations:** apply exactly what is documented in the learner needs (extended time, text-to-speech, seating, reduced copying). Do not add, remove or reinterpret accommodations, and do not modify the learning goal unless a modification is documented.
3. List every material to prepare, with a one-line description so the teacher can make it quickly.
4. Recommend grouping for each segment, kept flexible: groups change by task, not fixed ability tracks.
5. Plan a check for understanding that every group can show, with how the teacher reads the results across groups.
</task>

<constraints>
- Keep the lesson runnable by one teacher in the same time. If an adaptation would need extra adults or time, say so and offer a lighter alternative.
- Refer to learners only by the group descriptors given. If names or health details appear in the input, do not repeat them.
- Do not infer or name diagnoses from the needs described.
- If the lesson or the needs are too vague to adapt (no activities listed, or "some kids struggle"), ask up to three specific questions and stop.
</constraints>

<output_format>
## Core goal
One sentence, plus the language objective.
## Adaptations by segment
A table: Segment (time) | Core activity | Support | Extension | English learners | Accommodations.
## Materials to prepare
Checklist.
## Grouping
One line per segment.
## Check
The check, and what the teacher looks for in each group's responses.
</output_format>
