---
schema: 1
id: suggest-alternative-phrasings
kind: prompt
title: Suggest alternative phrasings
description: Offers several alternative wordings for one sentence or phrase you are stuck on, each labelled by nuance, register and length, with a recommended pick for the context.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, student, individual, editor]
requires: [none]
inputs: [text]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [word-choice, wording, register, synonyms, writers-block]
pairs_with:
  prompts: [rewrite-for-tone, tighten-prose, line-edit-prose]
  personas: [editor]
args:
  - name: phrase
    description: The sentence or phrase you want alternatives for.
    type: text
    required: true
  - name: context
    description: Optional, the sentence or paragraph around it, who reads it, and what is wrong with the current wording ("sounds stiff", "too pushy", "used it three times already").
    type: text
  - name: register
    description: The register the alternatives should fit.
    type: enum
    enum: [formal, neutral, casual]
    default: neutral
output_contract:
  format: markdown
  sections: [What it needs to do, Options, Recommended, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a writer is stuck on one phrase, a thesaurus swap rarely helps: synonyms carry different nuance, strength and register, and the problem is often the structure, not the word. Good alternatives vary along deliberate dimensions (softer or stronger, shorter or fuller, more concrete, a different sentence shape), each fits grammatically where the original sat, and each comes with a label so the writer can choose by meaning rather than by sound.
</context>

<task>
Suggest alternative wordings for this phrase in a {{register}} register.

<phrase>
{{phrase}}
</phrase>
{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If the phrase is empty, ask for it and stop.
2. Work out what the phrase must do: its meaning, its job in the sentence (request, transition, claim, softener, sign-off, description) and, if the context says, what is wrong with it now. If the phrase can mean two different things and the context does not settle it, say so and give options for each reading in separate groups.
3. Write six to ten alternatives that differ in a meaningful way:
   - nuance: softer, firmer, warmer, more neutral, more precise;
   - length: a shorter version and, where useful, a fuller one;
   - structure: at least one that recasts the sentence (a different subject, a verb instead of a noun phrase, a question instead of a statement), not only word swaps.
4. Each alternative must fit the surrounding sentence grammatically if context was given, and must not add facts or commitments the original does not make.
5. Label each one with its nuance, its register (formal, neutral or casual) and its word count. Flag idioms that may confuse non-native readers or that are regional.
6. Recommend one for this context and say why in one sentence. Name any options to avoid and why.
</task>

<constraints>
- No archaic, inflated or cliché wording ("utilise", "at this juncture", "circle back") unless the register really calls for it.
- Keep options mostly in the requested register; you may include one from a neighbouring register if it is clearly better, labelled as such.
- If the phrase has a fixed technical, legal or contractual meaning, say that rewording may change its meaning or effect, offer only alternatives that keep that meaning, and recommend checking with whoever owns the document.
</constraints>

<output_format>
## What it needs to do
One or two lines: meaning, job in the sentence, and the problem with the current wording.
## Options
A table: # | Wording | Nuance | Register | Words. Group by reading if the phrase is ambiguous.
## Recommended
The pick in bold and one sentence on why.
## Avoid
One or two bullets, or "None".
</output_format>

<examples>
Phrase: "I wanted to touch base regarding the proposal." Register: neutral.
| # | Wording | Nuance | Register | Words |
|---|---|---|---|---|
| 1 | Do you have any thoughts on the proposal? | direct question, invites reply | neutral | 8 |
| 2 | Following up on the proposal I sent on Monday. | factual, no pressure | neutral | 9 |
| 3 | Is there anything you need from me to move the proposal forward? | helpful, nudges a decision | neutral | 13 |
</examples>
