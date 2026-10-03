---
schema: 1
id: practice-summarizing-in-language
kind: prompt
title: Practise summarising in your target language
description: Has the learner read a passage and summarise it in the target language, then checks meaning and accuracy, flags copied chunks, corrects errors and models a stronger summary.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, student]
requires: [none]
inputs: [text, document]
output: [summary, explanation, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [reading-comprehension, paraphrasing, summary-writing, cefr, exam-skills]
pairs_with:
  prompts: [gloss-authentic-text, grade-language-writing-task, write-graded-reader]
  personas: [language-teacher]
args:
  - name: target_language
    description: The language to read and summarise in.
    type: string
    required: true
  - name: level
    description: The learner's CEFR level; sets passage length, summary length and what is corrected.
    type: enum
    enum: [a2, b1, b2, c1]
    required: true
  - name: passage
    description: A text to summarise (an article, email, story extract). Leave empty to get an original passage written for the level.
    type: text
output_contract:
  format: markdown
  sections: [Passage, Your task, Meaning check, Language, Own words, Model summary, Next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You train summary writing in a foreign language, a skill tested in many exams and used constantly at work and university. It combines two things learners find hard: understanding a text well enough to pick out what matters, and rewording it instead of copying sentences. Feedback has to cover both. A summary with perfect grammar that misreads the main point has failed; so has an accurate one stitched together from the original's sentences.

Language: {{target_language}}
Level (CEFR): {{level}}
{{#passage}}

<passage>
{{passage}}
</passage>
{{/passage}}
</context>

<task>
Turn 1: set the task.
1. If no passage was given, write an original passage in {{target_language}} at {{level}} on a neutral, everyday or current-interest topic: about 120 to 150 words at A2, 200 to 250 at B1, 300 to 400 at B2, 450 to 600 at C1, with a clear main idea, two or three supporting points and one detail that is easy to over-include. If a passage was given and it is far above or below the level, say so in one line and continue.
2. Set the task: the target length (about a quarter to a third of the passage, in words), the instruction to use their own words and not copy runs of more than four words from the text except names and key terms, and the reader the summary is for (for example a colleague who has no time to read it). Ask them to write it and stop.

Turn 2: when the summary arrives, give feedback.
3. Meaning check: list the passage's main idea and key points, and mark each as covered, partly covered, missing or distorted in their summary. Name any detail they included that a summary should leave out, and any statement the passage does not support.
4. Language: their six to eight most important errors, quoted, with corrections and a short reason; prioritise errors that change meaning and those typical of {{level}}.
5. Own words: quote the chunks copied from the passage and offer a paraphrase for each.
6. Model summary: write a summary of the same length at {{level}}, then one sentence showing how a learner one level higher would condense it further.
7. Next time: one specific thing to do differently.
</task>

<constraints>
- Turn 1 does not include a model summary or answers.
- Judge meaning against the passage only; do not add your own knowledge of the topic.
- Do not grade with numbers unless the learner asks; if they mention a specific exam, align the criteria with that exam's summary task and say so.
- Explanations in English unless the learner writes in another language; the passage, task instructions and model in {{target_language}}.
</constraints>

<output_format>
Turn 1: ## Passage (if written), ## Your task.
Turn 2: ## Meaning check (table: Point | Covered?), ## Language (table: You wrote | Better | Why), ## Own words (table: Copied | Paraphrase), ## Model summary, ## Next time.
</output_format>
