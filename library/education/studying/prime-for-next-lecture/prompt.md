---
schema: 1
id: prime-for-next-lecture
kind: prompt
title: Prime for the next lecture
description: Makes a one-page, 10-minute pre-lecture sheet from the slides or set reading with key terms, the big question, things to listen for and space for questions. Use the evening before a lecture.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [document, notes, text]
output: [summary, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pre-reading, pretraining, lecture-preparation, advance-organiser]
pairs_with:
  prompts: [choose-note-taking-method, convert-lecture-notes-to-cornell]
args:
  - name: slides_or_reading
    description: The lecture slides, outline or set reading, pasted as text. Include the lecture title and course if they are not in the text.
    type: text
    required: true
  - name: prior_knowledge
    description: Optional. What you already know about the topic, or the previous lecture's topic, so the sheet can link to it.
    type: text
output_contract:
  format: markdown
  sections: [The big question, Key terms, What you already know, Listen for, Your prediction, Questions to bring, After the lecture]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student wants to arrive at a lecture able to follow it. Learning the names and meanings of key terms beforehand frees attention during the lecture for the ideas themselves, and a question in mind gives the student something to listen for. The mistake is to turn the pre-lecture sheet into a full summary: then the student reads for an hour, feels they "know it", and stops listening. The sheet must take about 10 minutes to read, fit on one page, and leave gaps that the lecture fills.
</context>

<task>
<slides_or_reading>
{{slides_or_reading}}
</slides_or_reading>
{{#prior_knowledge}}
<prior_knowledge>
{{prior_knowledge}}
</prior_knowledge>
{{/prior_knowledge}}

1. Find the big question the lecture answers, in one sentence a student could ask (for example "Why do some enzymes speed up a reaction more than others?").
2. Pick at most eight key terms the lecture depends on. Give each a plain meaning in under 15 words, taken from the material, and a note on where it comes up.
3. Link to what the student already knows (from their notes or earlier lectures) in two or three bullets. If nothing was given, name the likely prerequisite ideas and mark them [check].
4. Pick three things to listen for: the turning points, contested claims, worked examples or diagrams the lecture builds on. Phrase each as a question to answer during the lecture.
5. Ask the student for one prediction before the lecture ("I think the answer to the big question is...") and leave a line for it.
6. Leave space for questions, and give an after-lecture five-minute check: answer the three listen-for questions from memory, then compare.
</task>

<constraints>
- Do not summarise the full lecture or answer the listen-for questions.
- Use only the material given. If slides are mostly images or titles with little text, say what is missing, work from the titles, and mark guesses [check].
- Never invent definitions, data or references; if a term is used but not defined in the material, give a short general meaning and mark it [check against the lecture].
- One page: under 400 words in total.
</constraints>

<output_format>
## The big question
One sentence.

## Key terms
Table: Term | Plain meaning | Where it comes up. Up to eight rows.

## What you already know
Two or three bullets.

## Listen for
Three numbered questions with a blank answer line each.

## Your prediction
One prompt line for the student to complete.

## Questions to bring
Three empty bullet lines.

## After the lecture
The five-minute check in three steps.
</output_format>
