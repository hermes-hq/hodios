---
schema: 1
id: create-differentiated-reading-tasks
kind: prompt
title: Create differentiated reading tasks
description: Builds support, core and stretch tasks on one shared text for a mixed-level language class, with pre-reading, a shared discussion task and answer keys, so everyone works on the same content.
category: language-learning
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [text, document]
output: [quiz, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [mixed-level-class, reading-comprehension, tiered-tasks, worksheet, cefr]
pairs_with:
  prompts: [level-down-text-for-learner, gloss-authentic-text, turn-realia-into-worksheet]
args:
  - name: target_language
    description: The language of the text and class.
    type: string
    required: true
  - name: text
    description: The reading text the whole class will use, pasted in full (ideally 200-600 words), with its source if you have it.
    type: text
    required: true
  - name: levels
    description: The CEFR levels in the class, lowest to highest, as three tiers.
    type: string
    default: A2, B1, B2
output_contract:
  format: markdown
  sections: [Text check, Pre-reading, Support tasks, Core tasks, Stretch tasks, Shared discussion, Answer keys]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher with a mixed-level class build reading tasks on one shared text. Everyone reads the same text so the class can discuss it together; the tasks change, not the content. Tiered tasks fail when the support tier only gets easier questions on a text it cannot decode, when the stretch tier just gets more questions, and when the tiers never come back together.

Tiers (lowest to highest): {{levels}}

<text>
{{text}}
</text>
</context>

<task>
1. Text check: estimate the text's CEFR level, length and the 8-12 words or chunks most likely to block the lowest tier. If the text is far above the lowest tier (they would know fewer than about 90 percent of the words even with support), say so and suggest a glossed or shortened version for that tier only, keeping the same facts and paragraph order.
2. Pre-reading for everyone (5-8 minutes): a prediction task from the title or a picture, and a vocabulary task on the blocking words that the support tier can do with a glossary.
3. Support tier: a glossary of the blocking words (simple definitions in {{target_language}}, with a picture idea where useful), a gist task (match headings to paragraphs or choose the main idea), then 5-6 literal questions in text order with paragraph numbers, in true/false, multiple choice or sentence-completion format. Answers can be found and copied from the text.
4. Core tier: one gist task, then 6-8 questions mixing literal, vocabulary in context and one inference question, in short-answer format, not in text order.
5. Stretch tier: 4-5 questions on inference, the writer's purpose and attitude, how language creates an effect (a word choice, a connector, a tense), and one task that transforms the text (rewrite a paragraph for a different reader, or write the reply).
6. Shared discussion (10 minutes): 3 questions every tier can answer from its own work, put mixed-level groups together, and give each tier a role (support reports the facts, core explains causes, stretch evaluates).
7. Answer keys for every task, with the paragraph or line where each answer is found.
</task>

<constraints>
- Do not alter the original text for the core and stretch tiers. Quote it accurately; do not paraphrase it in answer keys as if it were the text.
- Questions must be answerable from the text, not from general knowledge.
- Label tiers neutrally on the student copy (for example Circle, Triangle, Square), never "weak" or "easy".
- Task instructions are written at the level of the tier that receives them.
- If no actual text is given (only a topic, title or link), ask for the text and stop; do not write your own. If the text is short (under about 150 words), keep it and scale down the number of questions per tier, and say so.
</constraints>

<output_format>
## Text check
Level estimate, blocking words, any adaptation for the support tier.
## Pre-reading
## Support tasks
## Core tasks
## Stretch tasks
## Shared discussion
## Answer keys
Grouped by tier, each answer with its paragraph number.
</output_format>
