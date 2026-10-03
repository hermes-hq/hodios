---
schema: 1
id: build-subject-glossary
kind: prompt
title: Build a subject glossary
description: Builds a glossary of a subject's key terms with plain definitions, examples, word roots and commonly confused pairs, plus a flashcard export ready to import.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher]
requires: [none]
inputs: [text, document]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [glossary, key-terms, subject-terminology, etymology, confused-words]
pairs_with:
  prompts: [make-flashcards, create-memory-aids, make-study-guide]
args:
  - name: subject
    description: The subject and topic, for example "A-level Biology, cell structure" or "Intro Macroeconomics".
    type: string
    required: true
  - name: terms_or_material
    description: Either a list of terms or a passage of course material (notes, a chapter, slides) to extract the key terms from.
    type: text
    required: true
  - name: level
    description: Optional level, for example "Year 9", "first-year university". Sets how technical the definitions are.
    type: string
output_contract:
  format: markdown
  sections: [Glossary, Commonly confused, Flashcards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Subject vocabulary is where many marks quietly go: students know roughly what "osmosis" or "elasticity" means but cannot define it precisely, mix it up with a near neighbour, or use an everyday meaning where the subject uses a technical one ("significant", "theory", "work"). A good glossary defines each term without using the term itself, anchors it with an example, shows the word parts when they genuinely help recall, and separates the pairs students confuse.
</context>

<task>
Build a glossary for {{subject}}{{#level}} at {{level}} level{{/level}}.

<terms_or_material>
{{terms_or_material}}
</terms_or_material>

1. If this is a term list, use it. If it is course material, extract the 10 to 30 terms a student would be expected to define or use precisely, and only terms that appear in the material.
2. Group the terms by subtopic, in the order a learner would meet them.
3. For each term write:
   - A plain definition in one sentence that does not use the term or a form of it, accurate at the stated level. If the material defines the term, follow its definition.
   - A concrete example or use in a sentence.
   - Word roots (Greek, Latin or other) only when they help recall and you are sure of them, for example "photo- (light) + synthesis (putting together)". Leave the cell empty otherwise.
   - The term it is most often confused with, if any.
   - A note when the everyday meaning differs from the subject meaning.
4. Collect the commonly confused pairs and explain each difference in one or two lines with a quick test to tell them apart.
5. Produce a flashcard export: one line per term, "term;definition", with no header, ready for import into Anki or Quizlet with semicolon as the separator.
</task>

<constraints>
- Never invent an etymology. A wrong root is worse than none.
- Do not add terms that are not in the list or material, except to name a confused partner.
- Keep definitions short: at most 25 words each.
- If the list is empty or the material contains no subject terms, say so and ask for the terms or a passage.
</constraints>

<output_format>
## Glossary
One table per subtopic: Term | Definition | Example | Roots | Don't confuse with.
Everyday-meaning notes in italics below the relevant table.
## Commonly confused
Bullets: "A vs B": the difference, then the quick test.
## Flashcards
A code block of "term;definition" lines.
</output_format>
