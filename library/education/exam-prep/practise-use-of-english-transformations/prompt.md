---
schema: 1
id: practise-use-of-english-transformations
kind: prompt
title: Practise key word transformations and word formation
description: Drills key word transformation and word formation tasks in the style of Cambridge English exams, marking each transformation by the exam's two-part logic.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [language-learner, student]
subject: [english]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cambridge-english, use-of-english, key-word-transformation, word-formation, b2-first, c1-advanced]
pairs_with:
  prompts: [plan-language-exam-prep]
args:
  - name: exam_level
    description: The Cambridge exam to imitate, which sets the grammar and vocabulary range and the word limit for transformations.
    type: enum
    enum: [b2-first, c1-advanced, c2-proficiency]
    default: b2-first
  - name: items
    description: Number of items, split between key word transformations and word formation.
    type: number
    default: 12
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a key word transformation, the candidate completes a second sentence so it means the same as the first, using a given key word unchanged and staying within a word limit (the key word counts; contractions count as two words). Each item tests two things, usually one grammatical structure and one lexical chunk (a passive and a phrasal verb, an inversion and a fixed phrase), and the answer is marked in two halves, one mark for each, so a half-right answer still scores. Spelling must be correct. Word formation gives a gapped text and a stem word in capitals; the candidate must change its form (prefix, suffix, plural, negative, compound) to fit grammar and meaning. Typical word limits are two to five words at B2 First, three to six at C1 Advanced and three to eight at C2 Proficiency; tell the learner to confirm current task details on the official site.
</context>

<task>
Run a drill of {{items}} original items at `{{exam_level}}` level: about half key word transformations, half word formation, alternating in blocks of three.

1. Write every item yourself; never reproduce published exam or coursebook items. For transformations, target structures typical of `{{exam_level}}` (for example reported speech, passives, conditionals, wishes and regrets, comparatives, modal perfects, inversion at C1 and above, causative have, fixed phrases and phrasal verbs). Check privately that each item has a correct answer within the limit, keeps the key word unchanged, and that you can name its two marking halves. For word formation, write a short coherent text of four to six gaps with a stem word for each, mixing noun, adjective, adverb and verb forms and at least one negative prefix.
2. Present one block (three items) per message. For transformations, show the first sentence, the key word in capitals, and the gapped second sentence, and state the word limit.
3. After the learner answers a block:
   - For each transformation, mark each half separately (0, 1 or 2 out of 2), show an accepted answer and any common alternatives, and explain both points tested. If they changed the key word, exceeded the limit or misspelled, say that this loses the mark and why.
   - For each word formation gap, mark it, give the form, and explain the clue in the sentence (article before means a noun, "a" with plural form is wrong, negative meaning needs a prefix).
   - Keep a running list of the structures and word-formation patterns they missed.
4. Bias later blocks toward the patterns they missed.
5. After the last block, give the review.
</task>

<constraints>
- Mark strictly by the exam's conventions: a correct-meaning answer that changes the key word or breaks the word limit scores zero for that half.
- Accept genuinely correct alternatives; when unsure whether an alternative would be accepted, say so.
- Keep vocabulary and grammar within the level's range; do not test C2 idioms at B2.
- No predicted grade or score conversion.
</constraints>

<output_format>
Blocks numbered, items numbered continuously.

At the end:
**Transformations:** x / (2 × number of transformations). **Word formation:** y / number of gaps.
A table: Structure or pattern | Items | Marks lost | Rule to remember.
**Next drill:** two patterns to target and the level to stay at or move to.
</output_format>
