---
schema: 1
id: plan-close-reading-lesson
kind: prompt
title: Plan a close reading lesson
description: Plans a close reading lesson on a short complex text with purposeful rereads, an annotation focus, sequenced text-dependent questions and a short evidence-based written response.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [english, literature]
tags: [close-reading, text-dependent-questions, annotation, reading-instruction]
pairs_with:
  prompts: [generate-discussion-questions, write-reading-comprehension-set, plan-socratic-seminar]
args:
  - name: text
    description: The passage itself (ideally 1 page or less), or its exact title and author if it is a well-known public domain text.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: duration_minutes
    description: Lesson length in minutes.
    type: number
    default: 50
  - name: focus
    description: Optional reading standard or skill to emphasise, e.g. "author's use of imagery", "how the argument is built".
    type: string
output_contract:
  format: markdown
  sections: [Overview, Reading plan, Text-dependent questions, Written response, Supports, Timing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Close reading means students work out meaning from the text itself through repeated, purposeful reading of a short passage. Each reread has a different job: first for the gist, second for how the text works (structure, word choice, craft), third for meaning and evaluation. Questions must be answerable only by going back to the text; "Have you ever felt lonely?" is not text-dependent, "Which words in paragraph 2 show the narrator is isolated?" is. Common failures are front-loading so much background that students never struggle with the text, choosing a passage too long to reread, asking recall questions only, and skipping the written response that shows whether students can use evidence.
</context>

<task>
Plan a {{duration_minutes}}-minute close reading lesson for **{{grade_level}}** on this text.
<text>
{{text}}
</text>
{{#focus}}
Focus: {{focus}}
{{/focus}}

1. Identify what makes the text complex for this grade (vocabulary, structure, ideas, assumed knowledge) and the one big understanding students should reach. If only a title was given and you are not certain of the exact wording, base the questions on parts you are sure of and say the teacher must check paragraph references against their copy.
2. Decide minimal front-loading: only the background or vocabulary that cannot be worked out from context; leave the rest for students to figure out.
3. Plan three reads, each with a purpose, who reads (teacher aloud, students independently, partners), and an annotation focus with a simple symbol code.
4. Write 6 to 10 text-dependent questions sequenced from literal to structural to inferential and evaluative. For each give the paragraph or line it targets, the purpose, and an exemplar answer quoting the text.
5. Write a short written response prompt (a paragraph) that requires a claim supported by at least two quoted pieces of evidence, with success criteria and a model answer.
6. Give scaffolds for struggling readers and multilingual learners (chunking, partner reading, sentence frames) that do not replace reading the text, plus a stretch question.
7. Give a timing table adding to {{duration_minutes}}.
</task>

<constraints>
- Every question must require returning to the text; no personal-connection or prediction questions in the main set.
- Quote only from the text provided; never invent quotations or line numbers.
- Do not reproduce long copyrighted passages; work from what the teacher supplied.
- If the text is far too long for close reading, recommend the section to use and say why.
</constraints>

<output_format>
## Overview
Grade, text, complexity notes, big understanding, front-loading.
## Reading plan
Read 1 · Read 2 · Read 3 with purpose, who reads, annotation focus.
## Text-dependent questions
Numbered: question, target lines, purpose, exemplar answer.
## Written response
Prompt, success criteria, model answer.
## Supports
Support, multilingual learners, stretch.
## Timing
A table adding to {{duration_minutes}}.
</output_format>
