---
schema: 1
id: convert-english-variant
kind: prompt
title: Convert between English variants
description: Converts text between American, British, Canadian and Australian English for spelling, vocabulary, punctuation, dates and units, and lists every change it made.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, marketer, individual]
subject: [english]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [british-english, american-english, australian-english, canadian-english, spelling-variants, localisation]
pairs_with:
  prompts: [proofread-text, copyedit-to-style-guide, adapt-message-for-culture]
  personas: [editor]
args:
  - name: text
    description: The text to convert.
    type: text
    required: true
  - name: from_variant
    description: The variety the text is written in now. us = American, uk = British, ca = Canadian, au = Australian.
    type: enum
    enum: [us, uk, ca, au]
    required: true
  - name: to_variant
    description: The variety to convert it to.
    type: enum
    enum: [us, uk, ca, au]
    required: true
output_contract:
  format: markdown
  sections: [Converted text, Changes, Left unchanged on purpose, Judgement calls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Converting between varieties of English is more than swapping -or for -our. It covers spelling, vocabulary that would confuse or sound foreign to the new reader, punctuation conventions, date order, units and a few grammar habits. It also means knowing what never to touch: names of organisations, quoted speech, titles of works, product names, code and URLs. Canadian English mixes British spelling (colour, centre, cheque) with American vocabulary and -ize endings. Australian English uses British spelling with -ise, but Australian government style writes "program". British publishers differ on -ise versus Oxford -ize.
</context>

<task>
Convert this text from {{from_variant}} English to {{to_variant}} English.

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop. If the source and target variants are the same, do not convert: run a consistency check instead, normalising any mixed spellings to that variant, and say so at the top.
2. If the text is clearly not in the stated source variant, say what it looks like and convert from what it actually is.
3. Mark protected items and leave them exactly as written: proper names and organisation names ("World Health Organization", "Labour Party", "Department of Defense"), quotations, titles of published works, brand and product names, legal citations, code, URLs, email addresses and file names.
4. Convert, in this order:
   - **Spelling:** -or/-our, -ize/-ise and -yze/-yse, -er/-re, doubled -l- (traveled/travelled), -ense/-ence (license, defense), program/programme, check/cheque, tire/tyre, gray/grey, aluminum/aluminium, and similar pairs, following the target variant's dominant usage.
   - **Vocabulary:** only words the target reader would find foreign or ambiguous (apartment/flat, sidewalk/pavement or footpath, truck/lorry or ute, fall/autumn, cell phone/mobile). Do not "translate" words that are shared, and keep the register.
   - **Grammar and idiom:** gotten/got, "on the weekend" versus "at the weekend", "in hospital" versus "in the hospital", "write me" versus "write to me", collective nouns with plural verbs where natural in British usage. Change these only where the original would sound wrong to the target reader.
   - **Punctuation:** quotation-mark style and punctuation inside or outside closing quotes, full stops after Mr/Mrs/Dr. Follow the target's most common convention and apply it consistently.
   - **Dates and times:** rewrite numeric dates in the target order (US month/day; UK and AU day/month). For Canada, and for any numeric date that could be read both ways, write the month as a word. If a source date is itself ambiguous, flag it and do not guess.
   - **Units:** convert only where the target reader would expect it (US customary to metric for AU and CA; UK keeps miles, pints and stone in everyday use). Round sensibly, and keep the original in brackets where precision matters, such as specifications, doses and legal limits. Never convert currency amounts; flag them.
5. Log every change. Before answering, reread the converted text once for any missed item and for consistency.
</task>

<constraints>
- Change nothing else: no rewording, no tightening, no tone changes.
- Where the target variant is genuinely split (Oxford -ize in the UK, "program" in Australia, units in Canada), choose the more common usage for general writing, apply it consistently, and list it under Judgement calls so the author can switch.
- If a house style is mentioned in the text or the request, follow it over these defaults.
</constraints>

<output_format>
## Converted text
The full converted text.
## Changes
A table: Original | Converted | Type (spelling, vocabulary, grammar, punctuation, date, unit). One row per distinct change, with a count if it repeats ("colour ×3").
## Left unchanged on purpose
Bullets: protected items and look-alikes you kept, with the reason. "None" if none.
## Judgement calls
Bullets: split conventions you chose, ambiguous dates, currency, and anything the author should confirm. "None" if none.
</output_format>
