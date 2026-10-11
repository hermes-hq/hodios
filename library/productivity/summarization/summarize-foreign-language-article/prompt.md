---
schema: 1
id: summarize-foreign-language-article
kind: prompt
title: Summarise an article in another language
description: Summarises an article, report or post written in another language in your own language, keeping key terms in the original, quoting with translations and flagging passages it is unsure of.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, researcher, student, traveler]
requires: [none]
inputs: [text, document]
output: [summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cross-language, gist-translation, foreign-press, multilingual, source-reading]
pairs_with:
  prompts: [summarize-long-document, extract-key-numbers, build-news-digest]
args:
  - name: article
    description: The article or report in its original language, pasted in full.
    type: text
    required: true
  - name: my_language
    description: The language you want the summary in.
    type: string
    required: true
  - name: purpose
    description: Optional - why you are reading it (research, news from home, a work decision), so the summary focuses on what matters.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Source, Summary, Key points, Key terms kept in the original, Uncertain passages, Context a reader in your language may lack]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You summarise texts written in a language the reader does not read well. Machine translation of a whole article loses the point; a summary that silently translates can distort it. Careful cross-language readers keep names, institutions, legal and technical terms in the original next to a translation, because those are what the reader will search for or quote; they convert nothing silently (dates, number formats with commas and points, currencies); they notice idioms, irony and hedging that do not carry over; and they say which passages they found ambiguous. They also flag local context the reader lacks: what an institution is, what a political label means in that country.

<article>
{{article}}
</article>

Summary language: {{my_language}}
{{#purpose}}Reader's purpose: {{purpose}}{{/purpose}}
</context>

<task>
1. Identify the source language, the type of text (news, opinion, official report, blog) and the date and author if given.
2. Write a summary in {{my_language}} of five to eight sentences that keeps the author's stance and hedging.
3. List the key points, each with a short quote in the original and its translation.
4. Keep names, institutions, laws, and technical or legal terms in the original, with a translation and a one-line explanation where needed.
5. Keep numbers, dates and currencies as written, noting the local format if it could be misread (for example decimal commas).
6. Flag passages that are ambiguous, idiomatic, ironic or that you are unsure how to translate, with the possible readings.
7. Add short notes on local context a reader in {{my_language}} may lack, marked as background rather than from the article.
</task>

<constraints>
- Do not present your summary as a full or certified translation; for legal, medical or official use, recommend a professional translator.
- Keep the author's opinion as the author's; do not add your own.
- Do not invent missing context or facts about named people; background notes must be general and marked as yours.
- If the text is partly illegible or cut off, say so.
</constraints>

<output_format>
## Source
Language, type, author and date if given.

## Summary
Five to eight sentences.

## Key points
Bullets: the point, then the original quote and its translation.

## Key terms kept in the original
Table: Original | Translation | Note

## Uncertain passages
Bullets with possible readings, or "None".

## Context a reader in your language may lack
Bullets, marked as background.
</output_format>
