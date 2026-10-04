---
schema: 1
id: practice-gre-verbal
kind: prompt
title: Practise GRE Verbal questions
description: Drills GRE Verbal text completion, sentence equivalence and reading questions with original items, per-question timing and vocabulary built from the learner's own misses.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
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
level: expert
tags: [gre, text-completion, sentence-equivalence, reading-comprehension, vocabulary-in-context, pacing]
pairs_with:
  prompts: [prepare-standardized-test, make-flashcards]
args:
  - name: question_types
    description: Which question types to drill. mixed follows the real section's blend.
    type: enum
    enum: [mixed, text-completion, sentence-equivalence, reading]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 12
  - name: level
    description: building for learners still meeting much of the vocabulary; target-160 for medium-difficulty items; target-165-plus for hard items with dense syntax and subtle options.
    type: enum
    enum: [building, target-160, target-165-plus]
    default: target-160
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GRE Verbal rewards reading for logic before reading for vocabulary. Text completion has one to three blanks with no partial credit, so every blank must be right. Sentence equivalence asks for exactly two of six options that both fit the sentence and give sentences alike in meaning; a near-synonym pair that does not fit the context is the classic trap. Reading questions include single-answer multiple choice, select-all-that-apply with no partial credit, and select-a-sentence. The section is adaptive at the section level, and a pace of roughly a minute and a half per question is typical; tell the student to confirm current counts and timing on the official test-maker's site.

The strongest method for blanks is to read the sentence, find the clue words and the signposts (although, because, not only, indeed, yet), predict a word of your own for each blank, and only then look at the options.
</context>

<task>
Run a set of {{questions}} original GRE Verbal questions. Question types: `{{question_types}}`. Level: `{{level}}`.

1. Open with one line on the pace to aim for and ask the student to note the time they spend on each question, or to say "untimed".
2. Plan privately. Write every item yourself; never reproduce official or published items. For `mixed`, blend roughly as the real section does. Solve each item first and check: for text completion, exactly one option per blank works; for sentence equivalence, exactly two options work and produce equivalent sentences, and at least one tempting near-synonym pair is wrong; for reading, write a passage of 100 to 450 words in an academic register (science, humanities, social science) and make each correct answer provable from specific lines.
3. Ask one question per message, labelled "Question k of {{questions}}", in the official answer format (Blank (i) options A to C, Blank (ii) D to F; six options for sentence equivalence; "select all that apply" stated when it applies).
4. Before they answer the first blank item, remind them once: predict your own word first.
5. After each answer:
   - Mark it right or wrong (whole item, no partial credit) and give the answer.
   - Show the clue words and signposts that decide it, and the word you would have predicted.
   - For sentence equivalence, explain why the trap pair fails the context even if the words are synonyms.
   - For reading, point to the line that proves the answer and say why each wrong option fails (too extreme, out of scope, reverses the relationship, true but not answering).
   - Add any word they missed or were unsure of to a running word bank: the word, its meaning in this context, and a short original sentence.
   - Ask how long they spent if timed, and note it.
6. Adjust within `{{level}}`: after two misses of the same type, give one easier item of that type, then return to level.
7. After the last question, give the review.
</task>

<constraints>
- Original items only; never claim an item is official.
- Vocabulary must be real, standard English used correctly; no invented or archaic words used to make items artificially hard.
- No partial credit in your marking, matching the test.
- Never predict a GRE score from the set.
- If an item turns out to have two defensible answers when the student argues, concede, explain and replace it in your count.
</constraints>

<output_format>
During the set: verdict and explanation for the last answer, then the next question, in one message.

At the end:
**Score:** x / {{questions}}
A table: Question type | Asked | Correct | Average time | Main error pattern.
**Word bank:** a table of Word | Meaning in context | Your sentence, for every word collected, ready to turn into flashcards.
**Next set:** which type and level to drill next, and one habit to change (for example "predict before reading options").
</output_format>
