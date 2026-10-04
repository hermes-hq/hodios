---
schema: 1
id: create-knowledge-organiser
kind: prompt
title: Create a knowledge organiser
description: Creates a one-page knowledge organiser for a unit with key vocabulary, core facts, a timeline or diagram plan and self-quiz instructions, limited to what pupils must remember.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, build]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, document]
output: [table, docs, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [knowledge-organiser, retrieval-practice, key-vocabulary, self-quizzing, curriculum-planning]
pairs_with:
  prompts: [design-homework-task-set, write-retrieval-practice-starters, plan-vocabulary-instruction]
args:
  - name: unit
    description: The unit title and subject, e.g. "The Norman Conquest (history)".
    type: string
    required: true
  - name: unit_content
    description: The content of the unit - lesson sequence, key facts, vocabulary, dates, processes or quotations you teach. Paste your scheme of work or notes.
    type: text
    required: true
  - name: year_group
    description: Year group or age, e.g. "Year 8".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Knowledge organiser, Self-quiz routine, Left out on purpose, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher wants a knowledge organiser for {{unit}} for {{year_group}}: one page of the core knowledge pupils must remember for the long term, used for self-quizzing and retrieval, not a summary of everything taught. Common failures: cramming the page with every detail so nothing stands out; writing definitions in teacher language pupils cannot recall; and handing it out without teaching pupils how to quiz themselves from it, so it is read once and filed.
</context>

<task>
<unit_content>
{{unit_content}}
</unit_content>

1. Select the core: the knowledge later units and assessments depend on. Limit it to about 10 to 15 key terms, 8 to 15 core facts or ideas, and one structured element.
2. Key vocabulary: a table of term and a short pupil-friendly definition (under 15 words), with an example where it helps. Number every item so quizzes can refer to it.
3. Core facts: short numbered statements grouped under two to four sub-headings that follow the unit's logic.
4. One structured element that suits the subject: a timeline (dates and events), a labelled diagram (described precisely so it can be drawn), a process sequence, a formula box, or key quotations with their meaning.
5. Fit one side of A4 in a sensible font: if it will not fit, cut to the essentials and list what was cut.
6. Self-quiz routine: teach look, cover, write, check; quizzing on numbered items; mixing old and new sections; using it for homework and starters. Add five sample self-quiz questions with answers.
</task>

<constraints>
- Use only content from the unit content; every fact must match it. If something looks wrong in the source, flag it rather than correcting silently.
- Pupil-friendly wording for {{year_group}}; no teacher jargon.
- Do not invent dates, figures, quotations or names. If the unit content is too thin to fill a section, leave it short and ask for more.
- No decoration or clip-art suggestions that compete with the content.
</constraints>

<output_format>
## Knowledge organiser
Sub-headings: Key vocabulary (table: No. | Term | Definition), Core facts (numbered), and the structured element. Laid out so it fits one page.

## Self-quiz routine
Numbered routine, then five sample questions with answers.

## Left out on purpose
Bullets: content taught but not on the organiser, and why.

## Questions
Anything to check in the source.
</output_format>
