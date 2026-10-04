---
schema: 1
id: check-target-language-typography
kind: prompt
title: Check target-language typography conventions
description: Checks a translated text against the target locale's typographic conventions, such as quotation marks, spacing before punctuation, number and date formats and capitalisation, listing each fix by line.
category: translation
version: 1.0.0
status: incubating
stage: [review]
role: [editor, writer]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [typography, punctuation, number-formats, locale-conventions]
pairs_with:
  prompts: [review-translation, adapt-regional-variant, post-edit-machine-translation]
args:
  - name: target_language
    description: The language the text is written in, for example "French", "German", "Brazilian Portuguese".
    type: string
    required: true
  - name: text
    description: The translated text to check. Keep line breaks so fixes can be referenced by line.
    type: text
    required: true
  - name: locale
    description: Optional. The specific locale or house style when it changes the rules, for example "fr-CA", "de-CH", "es-MX", or "client style guide says straight quotes".
    type: string
output_contract:
  format: markdown
  sections: [Conventions applied, Fixes, Consistency, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You proofread translated text for typographic and formatting conventions only, the layer that is easy to miss because translators often carry over the source language's habits. Typical carry-overs: English-style quotation marks in French or German, missing or wrong spaces before high punctuation in French (and the different rule in Swiss and Canadian French), decimal points and thousands separators from English, month-day order, currency symbol placement, capitalised weekdays, months and nationality adjectives in languages that lower-case them, title case in headings where the target uses sentence case, and hyphens where the target uses dashes or vice versa. Locale matters: de-CH, fr-CA and es-MX each differ from their neighbours in some of these rules.

Target language: {{target_language}}
{{#locale}}Locale or house style: {{locale}}{{/locale}}
</context>

<task>
<text>
{{text}}
</text>

1. State the conventions you will apply for this language and locale in a short list: quotation marks (primary and nested), spacing before punctuation, decimal and thousands separators, date and time formats, currency position and spacing, percentage spacing, capitalisation (days, months, languages, nationalities, titles and headings), dashes and hyphens, ordinal and abbreviation forms, and any non-breaking spaces required (between number and unit, in titles such as "M. Dupont", in French guillemets). If a house style is given, it overrides general conventions; say where.
2. Number the lines of the text as given, and go through it line by line. For every deviation give the line, the text as found, the corrected text and the rule.
3. Check consistency across the whole text: the same convention used every time (one quotation style, one date format, one way of writing a recurring unit or currency).
4. List questions where the rule depends on a choice you cannot see (publisher style, whether figures in tables follow a different convention, whether a quoted English title keeps English punctuation).
</task>

<constraints>
- Typography and formatting only. Do not change wording, grammar, terminology or style; if you notice a likely mistranslation or grammar error, mention it once under Questions without correcting it.
- Do not convert units or currencies, only their formatting.
- Where conventions genuinely vary within a language (for example spacing before punctuation in some French publishing traditions, or spaced versus unspaced dashes), say so and follow the locale or house style; ask if neither is given.
- Show non-breaking and thin spaces visibly in fixes, for example as [NBSP] and [NNBSP], since they are invisible otherwise.
- If the text is very long, check the first 150 lines fully, then report repeated patterns for the rest and say so.
</constraints>

<output_format>
## Conventions applied
Bullets, one per convention, each with an example.
## Fixes
Table: Line | Found | Fix | Rule. In line order. "No fixes needed" if clean.
## Consistency
Bullets on mixed conventions across the text.
## Questions
Numbered.
</output_format>
