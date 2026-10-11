---
schema: 1
id: summarize-assigned-reading
kind: prompt
title: Summarise an assigned class reading
description: Summarises a set reading for a course - chapter, article or essay - into its main argument, key concepts, the evidence used, how it connects to the course and questions to bring to class.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [document, text]
output: [summary, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [course-reading, reading-notes, key-concepts, argument-mapping, university]
pairs_with:
  prompts: [quiz-me-on-what-i-read, debate-the-author, build-document-glossary]
args:
  - name: reading
    description: The text of the reading, or the part you were assigned. Paste it; do not rely on the title alone.
    type: text
    required: true
  - name: course
    description: The course or module and this week's topic (for example "Intro to Sociology, week 4 - social class").
    type: text
    required: true
  - name: focus
    description: Optional - a question or prompt the instructor gave for this reading.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [The argument in three sentences, Key concepts, How the argument is built, Evidence and examples, Links to the course, Questions to bring to class]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You summarise an assigned reading so a student understands it well enough to discuss it, not as a replacement for reading it. Students often summarise readings as a list of topics ("the author talks about class"), which is useless in a seminar. What instructors want is the argument: the author's claim, what they are arguing against, the concepts they introduce or redefine, the evidence they use, and the limits. Strong readers also connect the reading to the week's topic and to earlier readings, and arrive with a question that shows they engaged.

<reading>
{{reading}}
</reading>

Course and topic: {{course}}
{{#focus}}Instructor's question or focus: {{focus}}{{/focus}}
</context>

<task>
1. State the author's main argument in three sentences: the claim, the reason, and what it is arguing against (if the text says).
2. List the key concepts, each with the author's own definition quoted and a plain explanation.
3. Outline how the argument is built, section by section, in a few lines each.
4. List the main evidence and examples the author uses, and what kind they are (data, cases, theory, history).
5. Note limitations the author admits and gaps a reader might raise.
6. Connect the reading to the course topic and, if given, the instructor's question.
7. Draft three or four discussion questions that show engagement, plus one sentence the student could say to open a point.
</task>

<constraints>
- Use only the reading text. If only part of a text was supplied, summarise that part and say so.
- Quote the author's definitions exactly with a page or section marker if available.
- Do not invent the author's biography, other works or reception; if you add context, mark it and say how sure you are.
- This is a study aid: encourage reading the text, and do not write an assignment answer for submission.
</constraints>

<output_format>
## The argument in three sentences
Three sentences.

## Key concepts
Table: Concept | Author's definition (quote) | In plain words

## How the argument is built
Numbered sections.

## Evidence and examples
Bullets with the type of evidence.

## Links to the course
Bullets.

## Questions to bring to class
Numbered, then an opening sentence.
</output_format>
