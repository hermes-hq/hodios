---
schema: 1
id: build-multilingual-reply-snippets
kind: prompt
title: Build multilingual reply snippets
description: Builds support reply snippets in the languages your customers speak, from one plain-English source, with a term glossary, sync rules and a list of what a fluent speaker must check.
category: customer-support
version: 1.0.0
status: incubating
stage: [build]
role: [support-agent, operations-manager, founder]
requires: [none]
inputs: [text]
output: [message, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [localisation, glossary, canned-responses, multilingual]
pairs_with:
  prompts: [build-support-macros, write-chat-quick-replies-for-shop]
args:
  - name: top_questions
    description: The questions customers ask most, with the answer you give today (in any language), plus facts like hours, prices, policies and links.
    type: text
    required: true
  - name: languages
    description: The languages to write, with the country or region if it matters (Brazilian or European Portuguese, Latin American or Spain Spanish) and formal or informal address if you know.
    type: text
    required: true
  - name: product_terms
    description: Optional. Product, room, service or brand names and whether each stays untranslated.
    type: text
output_contract:
  format: markdown
  sections: [Source snippets, Glossary, Translations, Native speaker checks, Keeping them in sync]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build ready-to-use support replies in several languages for a small shop, hotel, delivery firm or service business. Translated snippets usually go wrong in four ways: the languages drift apart when the source answer changes, product and brand terms are translated differently in each snippet, the level of formality is wrong for the market (tu or vous, du or Sie, voce or o senhor), and nobody fluent ever checks them, so a polite answer reads as rude or a policy is mistranslated. A good set has one plain-English source per snippet with an ID, a shared glossary, and a clear list of what a fluent person must review before use.

Languages: {{languages}}
</context>

<task>
<top_questions>
{{top_questions}}
</top_questions>

{{#product_terms}}
<product_terms>
{{product_terms}}
</product_terms>
{{/product_terms}}

1. Write the source snippets in plain English: one per question, an ID (for example HOURS-01), 30-80 words, short sentences, no idioms, no wordplay, placeholders in square brackets ([order_number], [date]) that must never be translated.
2. Build the glossary: each product, service and brand term with its rendering in each language, or "keep as is", and any term that must always be the same word (refund versus credit, booking versus reservation).
3. Translate each snippet into each language:
   - choose formality per market and say which you chose;
   - adapt date, time, number and currency formats, and keep placeholders exactly as written;
   - keep the meaning of any policy, money or safety sentence exact rather than elegant;
   - allow for longer text (German, French and many other languages often run longer than English; check any character limits);
   - for right-to-left languages, note that placeholders and numbers need checking in the actual tool.
4. List what a fluent speaker must check for each language: policy sentences, money and dates, formality, any term from the glossary, and anything you marked as uncertain.
5. Write the sync rules: the English source is the master, every change gets a new version date, all languages are updated or marked "out of date" the same day, and agents send the English version with an apology line if a translation is out of date.
</task>

<constraints>
- Use only the facts in the answers given. Never invent prices, times, policies or links; use [CHECK: ...] placeholders.
- Mark any phrase you are unsure of with [VERIFY] in the translation and list it under Native speaker checks.
- State plainly that machine-assisted translations must be reviewed by a fluent speaker before customers see them, most of all for anything about money, safety, health or legal rights.
- If a requested language is ambiguous (Chinese: Simplified or Traditional; Portuguese: Brazil or Portugal), ask, or pick the most likely and say so.
</constraints>

<output_format>
## Source snippets
Each as: ID, title, English text.

## Glossary
Table: term | one column per language | notes.

## Translations
A level-3 heading per snippet ID with each language's text labelled.

## Native speaker checks
Bullets grouped by language.

## Keeping them in sync
Bullets.
</output_format>
