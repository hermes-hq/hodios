---
schema: 1
id: make-parent-quiz-cards
kind: prompt
title: Make quiz cards a parent can ask
description: Turns a child's school topic or knowledge organiser into quiz cards a parent can read out, each with the answer, a hint and a why follow-up, so non-specialist parents can test at home.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [parent]
requires: [none]
inputs: [document, text]
output: [quiz]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [retrieval-practice, knowledge-organiser, quiz-cards, home-learning]
pairs_with:
  prompts: [make-flashcards, build-reading-routine-with-child]
args:
  - name: topic_material
    description: The school material to quiz on - a pasted knowledge organiser, revision sheet, worksheet or the teacher's topic list. A topic name alone is not enough.
    type: text
    required: true
  - name: age
    description: The child's age or school year, such as "9" or "Year 8".
    type: string
    required: true
  - name: cards
    description: How many cards to make.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [How to use these cards, Cards, Tricky ones to come back to]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A parent who did not study the subject, or studied it decades ago, wants to quiz their child at home. Retrieval practice works, but parent-led quizzing often goes wrong: questions are read from the sheet word for word so the child recognises rather than recalls, the parent cannot judge a half-right answer, and a run of wrong answers turns into a row. Cards built for a parent fix this: a short question in plain words, the answer with what counts as right, a hint to give before saying the answer, and a "why" follow-up that checks understanding rather than parroting.

Child's age or year: {{age}}. Cards wanted: {{cards}}.
</context>

<task>
<topic_material>
{{topic_material}}
</topic_material>

1. Use only facts in the material. Pick the {{cards}} most important ideas: key words, dates, processes, causes and effects, as the material presents them.
2. Write each question so the child must produce the answer, not choose it. One fact per card. Use vocabulary right for {{age}}; keep the subject's key terms but explain them in the answer for the parent.
3. For each card give: the question to read aloud; the answer, with "also accept" for fair alternatives and "not quite" for a common half-right answer; a hint that narrows without giving it away; and a "why" or "how" follow-up with a one-line model answer.
4. Order the cards from easier recall to harder understanding, and mark three to five as "tricky".
5. Add parent notes: a short session (10-15 minutes, a few cards a day), what to say when the answer is wrong ("Nearly, here's a hint", then the answer, then ask again at the end), and how to re-ask tricky cards over the next few days.
</task>

<constraints>
- If the material is only a topic name or too thin to make {{cards}} cards, say how many good cards it supports, make those, and ask for the knowledge organiser or worksheet for more. Do not fill gaps from general knowledge.
- If something in the material looks wrong, flag it for the parent to check with the teacher instead of correcting it silently.
- Keep answers short enough to read in a glance.
- Encouraging tone; no scores or rankings for the child.
</constraints>

<output_format>
## How to use these cards
Five bullets for the parent.

## Cards
Numbered cards, each as:
**Q:** question
**A:** answer. *Also accept:* ... *Not quite:* ...
**Hint:** ...
**Why?** follow-up question, then the model answer in one line.

## Tricky ones to come back to
The card numbers and a suggested day to re-ask each.
</output_format>
