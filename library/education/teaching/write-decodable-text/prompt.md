---
schema: 1
id: write-decodable-text
kind: prompt
title: Write a decodable text
description: Writes a short decodable story that uses only the phonics patterns and tricky words already taught, with a word-by-word decodability check and comprehension questions.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, parent]
requires: [none]
inputs: [notes, topic]
output: [article, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [decodable-text, phonics, early-literacy, decoding, science-of-reading]
pairs_with:
  prompts: [plan-phonics-lesson, plan-guided-reading-group, create-spelling-pattern-list]
args:
  - name: taught_patterns
    description: Every grapheme-phoneme correspondence taught so far, plus endings or morphemes taught (-s, -ed, -ing), e.g. "s a t p i n m d g o c k ck e u r h b f l ff ll ss sh ch th ng; -s plural".
    type: text
    required: true
  - name: tricky_words
    description: Optional common exception words already taught, e.g. "the, to, I, no, go, said, was, he, she".
    type: text
  - name: theme
    description: Optional theme or setting, e.g. "a trip to the beach", "a lost pet".
    type: string
  - name: length_words
    description: Approximate length of the text in words.
    type: number
    default: 120
output_contract:
  format: markdown
  sections: [Title, Text, Decodability check, Comprehension questions, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A decodable text lets a beginning reader practise exactly the phonics they have been taught, so every word can be worked out by blending. Its value collapses if even a few words need patterns the child has not learned: the child is pushed back into guessing. The hard part is writing within the code and still producing something worth reading: a character who wants something, a small problem, and an ending, in natural sentences rather than "Sam sat. Sam sat on a mat." Language models are unreliable at this by default because they write fluent English first and check later, so the check has to be explicit and word by word.
</context>

<task>
Write a decodable text of about {{length_words}} words{{#theme}} on the theme "{{theme}}"{{/theme}}.

Taught patterns:
<taught_patterns>
{{taught_patterns}}
</taught_patterns>
{{#tricky_words}}
Taught tricky words:
<tricky_words>
{{tricky_words}}
</tricky_words>
{{/tricky_words}}

Work in this order:
1. Write out the allowed set: each taught grapheme with its sound, any taught endings, and the tricky words. If `taught_patterns` gives only a scheme name or stage, state the GPCs you assume and flag them for the teacher to confirm.
2. Brainstorm a bank of 30 or more decodable words, including verbs, so the story can move. Prefer words that use the most recently taught patterns (the end of the list) so the text practises them.
3. Draft a story with a named character, a goal or problem, at least one event, and an ending. Use short, natural sentences, and some dialogue if quotation marks fit the age.
4. Check every word in the draft against the allowed set. Replace or rewrite any word that fails. Watch especially for: untaught endings (-ed, -ing, -es, plural -s), y as a vowel, vowel digraphs, silent letters, "a" pronounced as schwa, names with untaught spellings, and tricky words that are not on the list (said, was, of, you, they).
5. Write comprehension questions.
</task>

<constraints>
- Zero words outside the allowed set. If the theme cannot be written decodably at this stage, change the angle of the theme and say so in Teacher notes.
- Character names must be decodable too (Pip, Tess, Mac), not Emma or Jack unless their spellings are taught.
- Keep the length within about 15% of {{length_words}} words.
- No content that would worry or exclude young children; keep it friendly and inclusive.
- Do not reproduce text from published decodable series.
</constraints>

<output_format>
## Title
A decodable title.
## Text
The story in short paragraphs, sentences on separate lines for the youngest readers, then the word count.
## Decodability check
Table: Pattern or tricky word | Words in the text that use it. Then: "Words outside the allowed set: none" (or, if any remain, list them and fix them before finishing).
## Comprehension questions
4 to 6 questions: literal, sequencing, one inference, one vocabulary, each with an expected answer.
## Teacher notes
Assumptions about the allowed set, the patterns practised most, 4 to 6 words to pre-read with sound buttons, and one quick follow-up writing task.
</output_format>
