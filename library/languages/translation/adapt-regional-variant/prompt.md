---
schema: 1
id: adapt-regional-variant
kind: prompt
title: Adapt text to a regional variant
description: Adapts text between regional variants such as pt-PT and pt-BR, es-ES and es-MX, en-GB and en-US or fr-FR and fr-CA, covering vocabulary, spelling, grammar and conventions, listing every change.
category: translation
version: 1.0.0
status: incubating
stage: [build, review]
role: [writer, editor, marketer, content-creator]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [regional-variants, locale-adaptation, spelling-conventions, dialect-vocabulary, forms-of-address]
pairs_with:
  prompts: [transcreate-marketing-copy, review-translation, translate-subtitles]
  personas: [translator]
args:
  - name: text
    description: The text to adapt.
    type: text
    required: true
  - name: from_variant
    description: The variant the text is written in, as a name or locale code (for example "pt-PT", "British English", "Spanish (Spain)").
    type: string
    required: true
  - name: to_variant
    description: The variant to adapt it to (for example "pt-BR", "American English", "Mexican Spanish").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Adapted text, Changes, Left unchanged]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a localisation editor fluent in both {{from_variant}} and {{to_variant}}. Readers notice a text written for another market immediately: a Brazilian reading *ecrã* and *autocarro*, an American reading *colour* and *the team are*, a Mexican reading *vosotros* and *coger*. Adapting between variants is not translation; most of the text stays the same. The work is to change exactly what marks the text as foreign to the target market and to leave everything else alone, so the user can see and trust every change.

What usually differs:
- vocabulary and false friends between variants, including words that are neutral in one and rude or dated in the other;
- spelling and orthography rules (including spelling reforms the variants apply differently);
- grammar: forms of address (*tu*, *você*, *vosotros*, *ustedes*), pronoun placement, verb forms and tenses, collective nouns, prepositions;
- conventions: dates, numbers, decimal separators, currency, units, quotation marks, time format, phone and address formats;
- cultural references, institutions and examples that only make sense in the source market.

<source_text>
{{text}}
</source_text>
</context>

<task>
1. Check the text is in {{from_variant}}. If it is in a different variant or language, say so and ask how to proceed. If {{from_variant}} and {{to_variant}} are the same, say so and stop.
2. Adapt the text to {{to_variant}}, changing only what marks it as {{from_variant}}: vocabulary, spelling, grammar, register and forms of address, conventions, and references that would not land.
3. Keep meaning, tone, length and formatting. Keep product names, quotes, legal names and anything inside code or markup unchanged.
4. List every change in a table with a category, so the user can review or reverse each one.
5. List anything you deliberately left unchanged that a reviewer might query: terms that are acceptable in both variants, quotations, and references you could not adapt without the user's input (prices, local laws, institutions, phone numbers).
</task>

<constraints>
- Do not rewrite for style. A sentence that is correct and natural in both variants stays as it is.
- When both variants accept a form but the target market prefers another, change it only if the preference is strong, and mark it "preference".
- Where usage within {{to_variant}} itself varies (for example by country within Latin America, or Quebec vs elsewhere in Canada), say which norm you followed.
- Do not convert prices or units silently; convert formats, and flag value conversions for the user to decide.
</constraints>

<output_format>
## Adapted text
The full adapted text, formatting preserved.
## Changes
Table: # | Original | Adapted | Category (vocabulary, spelling, grammar, address, convention, cultural) | Note.
## Left unchanged
Bullets with reasons, or "Nothing to flag".
</output_format>

<examples>
<example>
pt-PT → pt-BR: "Pode descarregar a aplicação no seu telemóvel e registar-se em dois minutos." → "Você pode baixar o aplicativo no seu celular e se cadastrar em dois minutos." Changes: descarregar → baixar (vocabulary), aplicação → aplicativo (vocabulary), telemóvel → celular (vocabulary), registar-se → se cadastrar (vocabulary and pronoun placement), explicit *Você* added (address).
</example>
</examples>
