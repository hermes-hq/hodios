---
schema: 1
id: explain-lesson-in-simple-english
kind: prompt
title: Explain a lesson in simple English
description: Re-explains a subject lesson for a learner still learning English, in simple sentences that keep and gloss the key subject words, with described visuals and quick comprehension checks.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher]
subject: [english]
requires: [none]
inputs: [text, document]
output: [explanation, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [multilingual-learners, eal, plain-language, newcomers, key-vocabulary, sheltered-instruction]
pairs_with:
  prompts: [explain-concept-at-level, build-vocabulary-through-morphology]
args:
  - name: lesson_content
    description: The lesson material to re-explain (teacher's notes, a textbook page, slide text, a worksheet), for any subject.
    type: text
    required: true
  - name: english_level
    description: The learner's English. new means the first months in English (about CEFR A1); developing means everyday English but struggling with textbook language (A2 to B1); confident means mostly fine but needs academic words explained (B2).
    type: enum
    enum: [new, developing, confident]
    default: developing
  - name: first_language
    description: The learner's first language, for example Arabic, Ukrainian, Dari, Spanish. Optional; adds a key-word list with translations to check.
    type: string
output_contract:
  format: markdown
  sections: [Key words, The lesson in simple English, Pictures in words, Check your understanding]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A learner aged roughly 10 to 18, still learning English (level: {{english_level}}), needs to understand a subject lesson. Simplifying for language learners goes wrong when it removes the subject's key words (the learner then cannot follow the next lesson or the exam), when it becomes childish in content, when it keeps long sentences full of idioms and passive voice, or when it relies on pictures the learner cannot see in a text answer. Good practice keeps the thinking at the same level, keeps and explains the key terms, makes the language simple, and checks understanding in ways that do not need much English to answer.
</context>

<task>
<lesson_content>
{{lesson_content}}
</lesson_content>

1. Find the 5 to 10 subject words the learner must keep (for example "photosynthesis", "migration", "denominator") and any everyday words likely to confuse (idioms, phrasal verbs, words with a special subject meaning like "table", "power", "product").
2. Rewrite the lesson's ideas in the same order:
   - For new: very short sentences (about 5 to 10 words), present tense where possible, one idea per sentence, the same word for the same thing every time.
   - For developing: sentences up to about 15 words, simple linking words (because, so, but, first, then), active voice.
   - For confident: normal sentences, but explain academic words and complex structures in brackets.
   Bold each key subject word the first time and explain it in brackets in simple words.
3. Describe in words any diagram, graph, map or process the lesson relies on, as a simple step list or layout description.
4. {{#first_language}}Add the key words with a {{first_language}} translation column, and note that subject terms can translate differently in textbooks; the learner or teacher should check with a bilingual subject dictionary or a speaker of the language.{{/first_language}}
5. Write 4 to 6 checks that need little English to answer: yes/no or true/false, choose the right word, match word to meaning, put steps in order, then one short-answer question with a sentence starter.
</task>

<constraints>
- Keep the subject content accurate and at the same level of thinking as the original; simplify language, not ideas.
- Do not add facts that are not in the lesson. If the lesson content looks wrong or unclear, say so briefly at the end.
- No idioms, jokes that depend on wordplay, or cultural references the learner may not share.
- Content must suit a teenager or older child; never babyish.
- If the material is not a lesson (for example a personal letter or a legal form), say what it is and that a different kind of help may suit better.
</constraints>

<output_format>
## Key words
| Word | Simple meaning |{{#first_language}} {{first_language}} (check) |{{/first_language}}
## The lesson in simple English
Short paragraphs with bold key words.
## Pictures in words
Descriptions of any visuals, or "None in this lesson."
## Check your understanding
Numbered questions, then an answer key below.
</output_format>
