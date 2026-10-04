---
schema: 1
id: turn-realia-into-worksheet
kind: prompt
title: Turn real-world material into a worksheet
description: Turns an authentic item such as a menu, timetable, bill or school letter into a levelled worksheet with scanning tasks, vocabulary, a role-play and a writing task, keeping the original intact.
category: language-learning
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [text, document, image]
output: [quiz, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [realia, authentic-materials, worksheet, scanning, everyday-documents, esol]
pairs_with:
  prompts: [plan-literacy-lesson-for-adult-newcomers, gloss-authentic-text, create-differentiated-reading-tasks]
  personas: [esol-volunteer-tutor]
args:
  - name: target_language
    description: The language of the material and class.
    type: string
    required: true
  - name: realia_text
    description: The text of the real item (menu, timetable, flyer, bill, school letter, sign), typed or pasted from a photo, with a note of what it is. Remove personal names, addresses and account numbers.
    type: text
    required: true
  - name: level
    description: The class's CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
output_contract:
  format: markdown
  sections: [About this material, Before you read, Find it fast, Words and phrases, Role-play, Writing follow-up, Answer key]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher, often of adult newcomers, turn a real item from daily life into a worksheet at CEFR {{level}}. Real material teaches learners to cope with the documents they actually meet. The principle is "grade the task, not the text": the item stays exactly as it is, and the tasks are made easy or hard. Worksheets on realia often go wrong by rewriting the item into textbook language, asking learners to read every word when real people scan, and stopping at comprehension instead of the action the item leads to (ordering, booking, replying, paying).

<realia>
{{realia_text}}
</realia>
</context>

<task>
1. Identify the item, who would receive it and what a reader needs to do with it (choose, find a time, pay by a date, reply, bring something). Note any personal data left in it and replace it with placeholders.
2. Before you read: 2-3 questions that activate experience ("When did you last get a letter from school? What was it about?") and a prediction task from the layout alone (where is the price, the date, the action?).
3. Find it fast: 6-10 scanning questions in the order a real reader would need the information, with a time limit. At A1-A2 use matching, circling and true/false; from B1 add short answers and one question that needs two pieces of information combined.
4. Words and phrases: 8-12 items from the item that matter for acting on it (abbreviations, fixed phrases, labels like "due date", "incl.", "per person"), each with a simple meaning in {{target_language}} and an example from another context. Explain the conventions of this kind of document (date and price formats, abbreviations, polite formulas).
5. Role-play: a two-person scene in which learners use the item (ordering from the menu, asking at the station, phoning the school), with role cards A and B, useful phrases and one complication (something sold out, a changed time).
6. Writing follow-up with a real purpose: fill the form, write the reply slip, a text message to a friend about the event, a short email to the school. Give a frame at A1-A2.
7. Answer key with the place in the item where each answer is.
</task>

<constraints>
- Reproduce the item's wording exactly as given; do not correct or simplify it. If a version for low levels is needed, add tasks, not a rewrite.
- Do not invent details that are not in the item (prices, times, rules). If the pasted text looks incomplete (cut off, missing a table), say what seems missing and work with what is there.
- If the item contains information with legal, medical or money consequences (a fine, a medicine label, a debt letter), note that the worksheet is for language practice and that learners with a real letter should get advice from the issuer or an advice service.
- Instructions are written at {{level}}; at A1 add a picture or symbol cue for each task type.
</constraints>

<output_format>
## About this material
What it is, who gets it, what a reader does with it; placeholders used.
## Before you read
## Find it fast
## Words and phrases
Table: Word or phrase | Meaning | Another example. Then the document conventions.
## Role-play
Role card A, role card B, useful phrases.
## Writing follow-up
## Answer key
</output_format>
