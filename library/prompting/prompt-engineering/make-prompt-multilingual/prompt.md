---
schema: 1
id: make-prompt-multilingual
kind: prompt
title: Make a prompt work in several languages
description: Adapts a prompt so it answers in the user's language and local formats, keeps fixed terms untranslated, handles mixed-language input and comes with a test plan per language.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build, verify]
role: [product-manager, ml-engineer, support-agent, content-creator]
requires: [none]
inputs: [text]
output: [prompt, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [multilingual, localisation, reply-language, locale-formats, glossary]
pairs_with:
  personas: [prompt-engineer]
  prompts: [write-system-prompt, build-prompt-test-set, port-prompt-between-models]
args:
  - name: prompt
    description: The prompt or system prompt to adapt, as it is now.
    type: text
    required: true
  - name: languages
    description: The languages and locales served, with rough share of users if known, for example "Spanish (Spain and Mexico) 50%, Portuguese (Brazil) 30%, English 20%".
    type: text
    required: true
  - name: fixed_terms
    description: Optional - brand names, product terms, legal phrases or labels that must stay as they are or have an approved translation.
    type: text
output_contract:
  format: markdown
  sections: [Language issues found, Revised prompt, Locale rules, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A prompt written and tested in English often drifts back to English for other users, especially when its examples, fixed phrases or templates are in English. "Reply in the user's language" is also less simple than it sounds: short messages ("ok", "thanks") have no clear language, users mix languages, a pasted document may be in a different language from the question, and some users write in one language but want answers in another. Locales matter beyond language: date and number formats, currency, units, formal or informal address, and name order. Product terms and brand names get translated when they should not. Quality, tone and safety behaviour are often weaker in less common languages, so each main language needs its own tests, ideally reviewed by a fluent speaker. Instructions can usually stay in one language; it is the replies, examples and fixed text that need care.

<prompt_under_test>
{{prompt}}
</prompt_under_test>
Languages and locales: {{languages}}
{{#fixed_terms}}
Fixed terms: {{fixed_terms}}
{{/fixed_terms}}
</context>

<task>
1. Find language issues in the prompt: English-only examples or canned phrases, fixed reply text, formats that assume one locale, terms that will be wrongly translated, tone rules that do not carry over (for example formality), and missing rules for ambiguous cases.
2. Write a reply-language rule: reply in the language of the user's latest message; for short or mixed messages keep the language of the conversation so far; if the user asks for a language, use it; when working on a document, answer in the user's language unless asked otherwise. Adjust to the product if the user said otherwise.
3. Write locale rules per locale: date, number and currency formats, units, and formal or informal address, with placeholders where the user must decide.
4. Add a glossary rule: terms that stay as written, and terms with approved translations.
5. Make examples and fixed text language-neutral, or give one example in a second main language so English is not the only pattern. Keep structured output keys and labels fixed in one language if code reads them.
6. Give the revised prompt with these changes and nothing else altered.
7. Write a test plan: for each main language, five test inputs (normal, short ambiguous reply, mixed language, document in another language, a tone or formality check), a pass condition each, and who should review the answers.
</task>

<constraints>
- Do not translate the whole prompt unless there is a clear reason; say why if you recommend it.
- Do not claim the model performs equally well in every language; say which languages need extra testing.
- Do not guess locale conventions you are unsure of; mark them for a fluent reviewer to confirm.
</constraints>

<output_format>
## Language issues found
Table: Issue | Where in the prompt | Effect.
## Revised prompt
Fenced code block.
## Locale rules
Table: Locale | Dates | Numbers and currency | Address form | Notes.
## Test plan
Table: Language | Input | What it tests | Pass condition.
</output_format>
