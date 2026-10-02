---
schema: 1
id: adapt-text-reading-level
kind: prompt
title: Adapt a text to several reading levels
description: Rewrites a passage at several reading levels while keeping the key content and target vocabulary, with a glossary and comprehension questions for each version. For teachers with mixed-ability classes.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [text, document]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [leveled-texts, differentiation, readability, english-learners, academic-vocabulary]
pairs_with:
  prompts: [differentiate-lesson, generate-discussion-questions]
  personas: [instructional-coach]
args:
  - name: text
    description: The original passage, with its source if it is a published text.
    type: text
    required: true
  - name: levels
    description: The target levels, in any system the teacher uses, e.g. "grade 3, grade 5, grade 8", "Lexile 500L, 800L, 1100L", "CEFR A2, B1, B2", "below, at and above level for Year 6".
    type: text
    required: true
  - name: key_vocabulary
    description: Optional words every version must keep and support, e.g. "photosynthesis, chlorophyll, glucose".
    type: text
output_contract:
  format: markdown
  sections: [Shared core, Versions, Notes for the teacher]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Levelled versions of one text let a whole class learn the same content and then discuss it together. They fail when simplification drops the ideas that matter, removes the very vocabulary the lesson is teaching, or changes the facts. Good adaptation lowers the reading load (sentence length and complexity, assumed background, idiom and figurative language, text density) while keeping the content, the key terms and the order of ideas.
</context>

<task>
Rewrite the passage at each of these levels: {{levels}}.

<text>
{{text}}
</text>
{{#key_vocabulary}}Key vocabulary to keep in every version: {{key_vocabulary}}.{{/key_vocabulary}}

1. Identify the shared core: the 3 to 6 key ideas and facts every version must keep, and the key vocabulary{{#key_vocabulary}} (the list given plus any other essential terms){{/key_vocabulary}}.
2. Write one version per level:
   - Keep every core idea, in the same order, so students reading different versions can discuss together.
   - Keep the key vocabulary in every version. At lower levels, support each term in context (a short definition or example in the sentence) rather than replacing it.
   - Adjust sentence length and structure, paragraph length, connectives, background knowledge supplied, and figurative language to the level. Explain or replace idioms and cultural references at lower levels.
   - At higher levels, keep the original's nuance and add precision; do not just lengthen it.
   - Never change facts, numbers, names or quotations. If a quotation is too hard, keep it and paraphrase it next to it.
3. For each version, write a glossary of 4 to 8 words with student-friendly definitions at that level, and 4 comprehension questions: 2 literal, 1 inferential and 1 shared "big question" that is the same across every version so the class can discuss it together.
4. If the original contains errors, outdated information or content that may be unsuitable for the levels requested, flag it rather than silently changing it.
</task>

<constraints>
- Reading-level labels are approximate. Do not claim an exact Lexile or grade score; say the teacher can check with a readability tool if precision matters.
- If the levels are far apart from the original (for example, a university text to grade 2), say what had to be cut from the shared core and why.
- If the text is copyrighted and long, adapt it for classroom use only and note the source.
- Do not add new facts or examples that are not in the original, except short definitions of key terms.
</constraints>

<output_format>
## Shared core
Key ideas as a list, then the key vocabulary.
## Versions
One subsection per level, each with: the text, "Glossary" (word: definition), and "Questions" (numbered, with the shared big question marked).
## Notes for the teacher
What was simplified or cut at each level, anything flagged in the original, and the shared big question again for whole-class discussion.
</output_format>
