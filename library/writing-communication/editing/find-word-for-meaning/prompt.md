---
schema: 1
id: find-word-for-meaning
kind: prompt
title: Find the word for a meaning
description: Finds the exact word or set phrase for a meaning the user describes, ranking near-synonyms by nuance, register and fit in their sentence, with examples and look-alike words to avoid.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, student, individual]
requires: [none]
inputs: [text]
output: [explanation, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [word-choice, near-synonyms, synonyms, tip-of-the-tongue, register]
pairs_with:
  prompts: [suggest-alternative-phrasings, tighten-prose, answer-grammar-usage-question]
args:
  - name: description
    description: What you mean, in your own words, for example "a word for being happy about someone else's success" or "the feeling when a place you have never been feels familiar".
    type: text
    required: true
  - name: sentence
    description: The sentence the word should go into, with a blank where it goes. Optional but improves the fit.
    type: string
  - name: register
    description: The tone needed, for example formal, casual, technical, literary. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Best match, Close alternatives, Look-alikes to avoid, In your sentence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A thesaurus lists words that share a meaning; a writer looking for the right word needs to know how they differ. Near-synonyms differ in intensity (annoyed, angry, furious), connotation (thrifty, frugal, stingy), register (begin, commence), grammar (the word may need a different construction: "prevent from" versus "preclude"), and whether a reader will actually know it. Sometimes the meaning has no single English word and needs a short phrase, or the familiar answer is a loanword whose meaning people stretch (schadenfreude means pleasure at someone else's misfortune, not happiness at their success). The best answer says honestly when there is no exact word.

<description>
{{description}}
</description>
{{#sentence}}Sentence: {{sentence}}{{/sentence}}
{{#register}}Register: {{register}}{{/register}}
</context>

<task>
1. Restate the meaning precisely in one line, including the elements that matter (who feels it, intensity, positive or negative).
2. Give the best match. If no single English word fits, say so and give the most natural short phrase, and any loanword in established English use, with how well readers will know it.
3. Give three to six close alternatives ranked by fit, each with how it differs (intensity, connotation, register, how common it is) and a short example sentence.
4. List look-alikes that are often used for this meaning but are wrong or misleading, with the actual meaning.
5. If a sentence is given, show it with the top one or two choices, adjusting only the grammar the word needs (preposition, article, verb form).
</task>

<constraints>
- Never invent words or meanings. If you are unsure a word exists or means this, leave it out.
- Mark words that are rare, archaic, regional or technical, so the writer knows the reader may not know them.
- Keep definitions to one line each.
</constraints>

<output_format>
## Best match
The word or phrase, a one-line definition and why it fits.
## Close alternatives
Numbered list: word, how it differs, example sentence.
## Look-alikes to avoid
Bullets: word and its actual meaning. "None" if none.
## In your sentence
The sentence with the top choices, or omit this section if no sentence was given.
</output_format>
