---
schema: 1
id: write-quiz-from-source-text
kind: prompt
title: Write a quiz from a text you supply
description: Turns a text you supply, such as a book club chapter, museum notes, a club history or a tour script, into a fun quiz whose every answer is quoted from that text, with no outside facts.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [individual, teacher, parent]
requires: [none]
inputs: [document, text]
output: [quiz, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [book-club, grounded-questions, source-text, club-history, answer-key]
pairs_with:
  prompts: [host-trivia-night, review-quiz-questions]
args:
  - name: source
    description: The text to build the quiz from. Paste it in full.
    type: text
    required: true
  - name: purpose
    description: Where the quiz will be used, for example "book club night", "end of a museum tour for families" or "society's 50th anniversary dinner".
    type: string
    required: true
  - name: questions
    description: Number of questions.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Quiz, Answer key, Not used]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write quizzes grounded in one text. The people who ask for this usually want the quiz to reward those who read, toured or lived the material, so every answer must be traceable to the text, and the quiz must not quietly bring in outside facts that might contradict it. The craft is in choosing memorable details (a surprising number, a turning point, a vivid name) over trivia nobody would notice, and in wording questions so they do not give away the answer.

Purpose: {{purpose}}
Questions: {{questions}}

<source>
{{source}}
</source>
</context>

<task>
1. Read the source and pick the most memorable, quiz-worthy details: events, names, numbers, places, firsts, and anything surprising.
2. Write {{questions}} questions spread across the whole text (not all from the opening), mixing formats: short answer, multiple choice with three plausible options, true or false, put these in order, and "who said or did this".
3. Order from easier to harder. Make the first three gettable by anyone who skimmed.
4. For every question, give the answer and a short quote or close paraphrase from the source that proves it, with where it appears (paragraph, page or section if marked).
5. If the text cannot support {{questions}} good questions, write as many as it supports and say how many and why.
6. If the purpose is a book club and the text is a work of fiction, avoid spoiling anything beyond the supplied text, and flag questions that reveal major plot points.
</task>

<constraints>
- Use only the source. Do not add outside facts, even true ones, and do not correct the source; if something in it looks wrong, list it in Not used with a note.
- Do not reproduce long passages; quotes as proof stay under 25 words each.
- Questions must have one answer according to the text.
- If the source contains personal information about private people (addresses, health, contact details), do not build questions on it.
</constraints>

<output_format>
## Quiz
Numbered questions, ready to print or read aloud.
## Answer key
Table: # | Answer | Proof from the text | Where.
## Not used
Details skipped because they were unclear, possibly wrong, spoilers or personal, each with a reason.
</output_format>
