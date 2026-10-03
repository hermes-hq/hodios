---
schema: 1
id: write-reading-comprehension-set
kind: prompt
title: Write a reading comprehension set
description: Writes an original passage at a target reading level with text-dependent literal, inferential and vocabulary questions, an answer key and the skill each question tests.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [topic]
output: [article, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [reading-comprehension, literacy, text-dependent-questions, answer-key]
pairs_with:
  prompts: [adapt-text-reading-level, plan-vocabulary-instruction, write-multiple-choice-questions]
args:
  - name: topic
    description: What the passage is about, and the genre if it matters, e.g. "how honeybees communicate (informational)" or "a girl who finds a lost dog (narrative)".
    type: string
    required: true
  - name: reading_level
    description: Target level, e.g. "Grade 3", "Lexile 800L", "guided reading level M", "CEFR B1", "Year 8".
    type: string
    required: true
  - name: question_count
    description: Number of questions to write.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Passage, Questions, Answer key, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Comprehension questions often test something other than comprehension: general knowledge (answerable without the passage), memory of trivial details, or reading the question rather than the text. Good sets are text-dependent: every answer needs the passage. They move from what the text says (literal) to what it means (inference, main idea, cause and effect) to how it says it (word meaning in context, structure, author's purpose), and the answer key cites the evidence so a teacher can see why a student went wrong. The passage itself has to sit at the target level in sentence length, vocabulary and the background knowledge it assumes.
</context>

<task>
Write a comprehension set on **{{topic}}** at **{{reading_level}}** with {{question_count}} questions.

1. Write an original passage. Choose a length suited to the level (roughly 150 to 250 words for early primary, 300 to 500 for upper primary and lower secondary, 500 to 800 for older readers) and match the level in sentence length, vocabulary and assumed background knowledge. Include 3 to 5 words worth teaching, with enough context clues to work them out. Give it a title, and number the paragraphs so questions can refer to them.
2. Write {{question_count}} questions with this approximate mix: about a third literal (retrieve or locate), about half inferential (infer, main idea, sequence or cause and effect, character or author's purpose), and the rest vocabulary in context or text structure. Order them roughly as the passage unfolds, with a main-idea or synthesis question last.
3. Mix formats: mostly short constructed response, a few multiple choice with plausible distractors, and at least one question that asks students to cite evidence ("Which sentence shows…?").
4. Make every question text-dependent: a student who has not read the passage should not be able to answer it from general knowledge.
5. Write the answer key: the answer, the paragraph that supports it, and for constructed responses what a full-credit answer must include and a common partial answer.
6. Tag each question with the skill it tests.
</task>

<constraints>
- The passage is original. Do not reproduce or closely paraphrase a published text.
- For informational passages, use only well-established facts and keep numbers and claims general enough to be safe; list any specific fact a teacher should double-check in the teacher notes.
- Content must be age-appropriate, inclusive and free of stereotypes; vary names and settings.
- Questions use simpler language than the passage, so the question is never harder to read than the text.
- If {{reading_level}} is a scale you cannot map with confidence, say what you assumed (for example "treated as roughly Grade 4") in the teacher notes.
- Do not claim a precise readability score; describe the level qualitatively.
</constraints>

<output_format>
## Passage
Title, then numbered paragraphs.
## Questions
Numbered questions, with options for multiple choice and lines like "_____" for written answers, ready to print.
## Answer key
Table: # | Answer | Evidence (paragraph) | Skill | Full-credit notes.
## Teacher notes
Level assumptions, words worth pre-teaching, facts to verify, and one extension question.
</output_format>
