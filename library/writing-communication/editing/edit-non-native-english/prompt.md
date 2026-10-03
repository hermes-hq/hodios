---
schema: 1
id: edit-non-native-english
kind: prompt
title: Polish English written by a non-native speaker
description: Polishes English written by a non-native professional into natural, idiomatic text in the right register, and lists their recurring error patterns with one-line rules so they improve over time.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [individual, language-learner, researcher, software-engineer]
subject: [english]
requires: [none]
inputs: [text]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [second-language-writers, non-native-writers, idiomatic-english, error-patterns, business-english]
pairs_with:
  prompts: [proofread-text, rewrite-for-tone, correct-my-sentences]
args:
  - name: text
    description: Your text in English, such as an email, report section, abstract, cover letter or post.
    type: text
    required: true
  - name: writer_first_language
    description: Your first language, for example Portuguese, German or Mandarin. It helps explain why certain patterns happen; leave empty if you prefer.
    type: string
  - name: register
    description: How formal the text should be. Business for work emails and documents, academic for papers and theses, casual for chat and social posts.
    type: enum
    enum: [business, academic, casual]
    default: business
output_contract:
  format: markdown
  sections: [Polished text, Changes that matter, Your patterns, Phrases to keep]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Professionals who write in English as a second language usually know exactly what they mean; the problems are articles, prepositions, verb tenses, word order, false friends, collocations ("make a research" instead of "do research"), and register that is too formal or too blunt for English readers. A plain proofread fixes the text but teaches nothing, so the same errors come back next week. The writer needs the text fixed, the few changes that affect meaning or impression called out, and their own recurring patterns explained with simple rules they can apply themselves. Over-editing is a real risk: rewriting everything into a native-speaker style the writer could never reproduce, or "correcting" valid international English, makes them feel their English is worse than it is.
</context>

<task>
Polish this text to natural {{register}} English.{{#writer_first_language}} The writer's first language is {{writer_first_language}}.{{/writer_first_language}}

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop.
2. Fix errors in grammar, articles, prepositions, tense and aspect, word order, collocations, false friends and punctuation. Replace phrases that are grammatical but unnatural with what an English-speaking professional would write.
3. Adjust register to {{register}}: for business, direct and polite, with softened requests ("Could you…" rather than "You must…") and no archaic formality ("Kindly do the needful", "Herewith"); for academic, precise and hedged appropriately; for casual, relaxed but clear.
4. Keep the writer's meaning, structure, content and level of detail. Keep their voice: do not replace simple correct words with fancier ones, and do not change correct sentences just to sound more native.
5. Call out the changes that matter most: anything that changed or could have changed the meaning, and anything that could make the writer sound rude, too informal or unsure. Put these first.
6. Identify the writer's three to five recurring patterns (errors that appear more than once, or a type of error), each with an example from their text, the correction, and a one-line rule they can remember. If the first language is given and the pattern is a well-known transfer from it, mention that briefly and only when you are confident.
7. Note two or three phrases from their text that were already good, so they keep using them.
</task>

<constraints>
- Do not add content, claims or politeness formulas the writer did not intend.
- Keep technical terms, names, numbers and quoted material unchanged.
- Use the spelling variety the text mostly uses (US or UK); if mixed, choose the dominant one and say so.
- Explanations in simple English, short sentences, no linguistic jargon beyond common terms like "article" or "preposition".
- Be encouraging and factual; do not comment on the writer's English level.
</constraints>

<output_format>
## Polished text
The full polished text.
## Changes that matter
Up to five bullets: original → polished, and why it matters (meaning or impression).
## Your patterns
Table: Pattern · Example from your text · Correction · Rule to remember.
## Phrases to keep
Two or three bullets quoting what already works well.
</output_format>
