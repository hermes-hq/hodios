---
schema: 1
id: plan-vocabulary-instruction
kind: prompt
title: Plan vocabulary instruction for a unit
description: Plans explicit vocabulary instruction for a unit, selecting tier 2 and tier 3 words with student-friendly definitions, examples, practice routines across days and a quick check.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, topic, document]
output: [plan, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [tiered-vocabulary, academic-language, literacy, explicit-instruction, word-consciousness]
pairs_with:
  prompts: [write-reading-comprehension-set, adapt-text-reading-level, write-lesson-plan]
args:
  - name: unit_text_or_topic
    description: The unit topic, or better, the text students will read (pasted), so words are chosen from what they will actually meet.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course, e.g. "Grade 4", "Year 8 history", "adult ESL intermediate".
    type: string
    required: true
  - name: word_count
    description: How many words to teach explicitly across the unit.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Word selection, Teaching cards, Introducing a word, Practice across the unit, Quick check, Words to treat lightly]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students learn most words from reading, but the words that unlock academic texts need explicit teaching. Useful selection follows a tiered view: tier 1 everyday words rarely need teaching; tier 2 words (analyse, reluctant, consequence, significant) appear across subjects and are the best investment; tier 3 words (photosynthesis, feudalism) are subject-specific and are taught with the content. Dictionary definitions rarely help ("ubiquitous: present everywhere"); student-friendly definitions explain the word in everyday language with "describes someone who…" or "if something is…, it…". Words stick through multiple, varied encounters over days: examples and non-examples, using the word in speech and writing, word parts, and connections between words.
</context>

<task>
Plan vocabulary teaching for **{{grade_level}}**, teaching {{word_count}} words explicitly.

<unit_text_or_topic>
{{unit_text_or_topic}}
</unit_text_or_topic>

1. **Select words.** From the text (or, if only a topic is given, from texts typical for that topic and level), choose {{word_count}} words: mostly tier 2, plus the tier 3 words essential to the content. For each, say why it earns explicit teaching: it is needed to understand the unit, useful across subjects, or unlikely to be learned from context. If a text was given, only choose words that appear in it.
2. **Teaching card for each word:** a student-friendly definition, an example sentence from the unit context, an example from students' everyday lives, a non-example, word parts or related forms if useful (for example "-ology", "reluctant / reluctance"), and for multilingual learners a cognate note where a common one exists.
3. **Introducing a word:** a short routine (about 2 minutes per word) the teacher repeats: say it, students say it, definition, examples, a quick "yes or no, why?" question, students use it.
4. **Practice across the unit:** a day-by-day plan of short practice activities (5 to 10 minutes) that bring every word back several times, mixing speaking and writing, such as "which word goes with…", example or non-example sorts, word-relationship maps, and challenges to use target words in discussion or writing.
5. **Quick check:** 5 to 8 items that test meaning in context rather than definition recall, with an answer key.
6. **Words to treat lightly:** other unfamiliar words in the text to explain in passing, not teach.
</task>

<constraints>
- Definitions use words simpler than the word being defined and fit the meaning used in this unit; note when a word has a different everyday meaning (for example "table" in science, "power" in maths).
- Do not pick words only because they are long or rare. Prefer words students will meet again.
- If a pasted text has fewer than {{word_count}} words worth teaching, choose fewer and say so.
- Example sentences must be correct, natural and inclusive.
- Keep cognate notes accurate; skip them when you are not sure, and flag false friends only if you are certain.
</constraints>

<output_format>
## Word selection
Table: Word | Tier | Why teach it.
## Teaching cards
One block per word: definition · unit example · everyday example · non-example · word parts · cognate note (if any).
## Introducing a word
The routine as numbered steps with teacher prompts in quotes.
## Practice across the unit
Table: Day | Activity | Words | Time.
## Quick check
Numbered items, then the answer key.
## Words to treat lightly
Word: quick in-passing explanation.
</output_format>
