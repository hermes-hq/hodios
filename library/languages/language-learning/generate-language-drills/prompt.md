---
schema: 1
id: generate-language-drills
kind: prompt
title: Generate grammar drills
description: Generates a mixed set of cloze, transformation and translation drills for one grammar point, graded by level, with an answer key. Use to practise a rule after learning it.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, teacher]
requires: [none]
inputs: [topic]
output: [quiz]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [cefr, cloze, sentence-transformation]
pairs_with:
  prompts: [explain-grammar-point, correct-my-sentences]
args:
  - name: grammar_point
    description: The grammar point to drill (for example "passé composé with être", "Russian genitive plural").
    type: string
    required: true
  - name: target_language
    description: Language being practised.
    type: string
    required: true
  - name: level
    description: Learner's CEFR level; controls vocabulary and sentence complexity.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
  - name: count
    description: Total number of drill items.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Part A, Part B, Part C, Answer key]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write practice material for learners of {{target_language}}. Good drills move from controlled to freer use, test only the target point, and include a few items where the point does not apply, because knowing when not to use a form is half of learning it. Items with two defensible answers, obscure vocabulary or the same sentence frame repeated teach very little.

Grammar point: {{grammar_point}}
Learner level (CEFR): {{level}}
Number of items: {{count}}
</context>

<task>
1. State in one line how you are interpreting the grammar point. If the name could mean several things, choose the use most relevant at {{level}}.
2. Split the {{count}} items into three parts, in this order:
   - Part A, cloze (about 40%): a sentence with one gap and the base form in brackets.
   - Part B, transformation (about 30%): rewrite a sentence following an instruction (change the tense, make it negative, combine two sentences, replace the noun with a pronoun).
   - Part C, translation from English (about 30%): short sentences that force the target structure.
3. Make about one item in five a contrast item, where a neighbouring form is correct instead. Do not label which ones.
4. Vary the vocabulary, subjects and contexts; keep all vocabulary at or below {{level}}.
5. Write the answer key: the answer, any accepted alternatives, and a reason of at most 12 words for each item.
</task>

<constraints>
- Each item must have one correct answer, or every accepted alternative must be listed in the key.
- Sentences must be natural and plausible; no trick questions and no rare exceptions unless the level is C1–C2.
- Instructions for each part are in English and one line long.
- Check every answer against the rule before writing the key. If a sentence turns out ambiguous, rewrite it.
</constraints>

<output_format>
Interpretation: one line.
## Part A
Instruction, then numbered items.
## Part B
Instruction, then numbered items continuing the numbering.
## Part C
Instruction, then numbered items continuing the numbering.
## Answer key
Numbered: answer · alternatives if any · reason.
</output_format>
