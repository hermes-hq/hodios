---
schema: 1
id: adapt-quiz-for-audience
kind: prompt
title: Adapt a quiz for a different audience
description: Adapts an existing quiz for another country, age group or language level, replacing questions that only work for the original players and keeping the round structure and difficulty curve.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, individual, parent]
requires: [none]
inputs: [text, preferences]
output: [quiz, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pub-quiz, localisation, age-appropriate, question-swap, difficulty-curve]
pairs_with:
  prompts: [review-quiz-questions, host-trivia-night]
args:
  - name: quiz
    description: The quiz to adapt, with answers.
    type: text
    required: true
  - name: original_audience
    description: Who the quiz was written for, for example "US adults" or "university students".
    type: string
    required: true
  - name: new_audience
    description: Who will play now, for example "families in South Africa with children 8 to 12" or "English learners at B1 level in Brazil".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What changes, Adapted quiz, Swapped questions, Verify before use]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You adapt quizzes for new players. A quiz that works in one place often fails elsewhere for hidden reasons: units (miles, Fahrenheit), spellings and names (football versus soccer, autumn versus fall), national TV, brands, sports and school-curriculum knowledge that locals assume is general, references only one generation knows, and wording too dense for younger or second-language players. Good adaptation keeps what is universal, swaps what is local for an equivalent of the same difficulty, and keeps each round's shape.

Original audience: {{original_audience}}
New audience: {{new_audience}}

<quiz>
{{quiz}}
</quiz>
</context>

<task>
1. Sort each question into: keep as is; keep with edits (units, spelling, simpler wording, a name the new audience uses); or replace (depends on knowledge the new audience will not have, or is unsuitable for their age).
2. For edits, change only what is needed and keep the answer the same where possible.
3. For replacements, write a new question on the same subject and at the same difficulty, using knowledge that is common for {{new_audience}}. Prefer widely shared knowledge over the most famous local fact, which can feel patronising.
4. For younger players or language learners: shorten sentences, use common words, add answer options where a free answer would be too hard, and avoid idioms.
5. Keep the order within each round so the difficulty curve survives. Rebalance if many replacements land in one round.
6. List any new answers that are time-sensitive or that you are less sure of, marked [verify].
</task>

<constraints>
- Do not assume the new audience's culture from one detail; if the country, age or level is unclear, state the assumption you used.
- No stereotypes in replacement questions; do not make a whole round about the new audience's country unless asked.
- Never invent local facts; if you are unsure of a local detail, choose a more general question.
- Preserve any question the person marked as fixed.
</constraints>

<output_format>
## What changes
Three or four lines: counts of kept, edited and replaced questions, and the main reasons.
## Adapted quiz
The full quiz by round: # | Question | Answer | Also accept.
## Swapped questions
Table: # | Original | Why it did not travel | Replacement.
## Verify before use
[verify] items with the kind of source to check.
</output_format>
