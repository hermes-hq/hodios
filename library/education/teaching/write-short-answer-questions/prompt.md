---
schema: 1
id: write-short-answer-questions
kind: prompt
title: Write short-answer questions
description: Writes short and constructed-response questions with clear command words, a mark scheme listing creditable points, model answers at full marks and notes on answers that do not earn credit.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [topic, document]
output: [questions, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [constructed-response, mark-scheme, command-words, test-writing]
pairs_with:
  prompts: [write-multiple-choice-questions, make-answer-key-with-worked-solutions, create-rubric]
args:
  - name: topic
    description: What the questions assess, ideally with your notes, unit content or the text the questions are about.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: count
    description: How many questions.
    type: number
    default: 6
  - name: exam_style
    description: Optional exam board or style to match, e.g. "GCSE-style command words", "state test constructed response, 2-point rubric".
    type: string
output_contract:
  format: markdown
  sections: [Questions, Mark scheme, Item notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Short-answer and constructed-response questions show what students understand, but only if the question signals clearly what is wanted and the mark scheme lets two teachers award the same mark. Command words matter: "state" wants a fact, "describe" wants what happens, "explain" wants why or how with a link, "evaluate" wants a judgement weighed against evidence. The marks should match the demand (a 4-mark "explain" needs room for two linked points). Weak items have vague stems ("Talk about photosynthesis"), mark schemes with only one model answer, and no guidance on near-miss answers, so marking becomes inconsistent.
</context>

<task>
Write {{count}} short-answer or constructed-response questions for **{{grade_level}}** on:
<topic>
{{topic}}
</topic>
{{#exam_style}}
Match this style: {{exam_style}}
{{/exam_style}}

1. Spread the questions across demand levels: some recall (state, name, identify), some understanding (describe, explain), at least one application or analysis, and one extended response if the level suits.
2. For each question write: a clear stem with a command word, any stimulus it needs (data, a short extract, a scenario you write), and the marks. Make marks match the demand.
3. Write a mark scheme for each: the creditable points (more than needed, so equivalent answers earn credit), how marks are awarded (one per point, or linked points for explanations, or levels for extended answers), a full-mark model answer, and answers that do not earn credit (too vague, repeats the question, common misconception).
4. Add item notes: the skill each question targets, and any ambiguity a reviewer should check.
</task>

<constraints>
- Content must be accurate for the level; do not test facts not in the topic given unless they are standard for this grade, and say so.
- Write any stimulus yourself; do not quote copyrighted exam papers.
- Do not claim questions match a specific exam board's official format unless the style was given; even then, tell the teacher to check against current official specimen materials.
- Each question assesses one clear thing; avoid double-barrelled stems.
</constraints>

<output_format>
## Questions
Numbered, with marks in brackets and any stimulus.
## Mark scheme
Per question: creditable points, award rules, model answer, no credit for.
## Item notes
A table: Question | Skill | Demand | Check.
</output_format>
