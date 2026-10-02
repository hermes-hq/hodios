---
schema: 1
id: proofread-text
kind: prompt
title: Proofread a text
description: Corrects grammar, spelling, punctuation and consistency errors in the chosen English variety, preserving the author's voice, and lists each change with the rule behind it.
category: editing
version: 1.0.0
status: experimental
stage: [review]
role: [writer, editor, student, individual]
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
tags: [spelling, punctuation, house-style, typos]
pairs_with:
  prompts: [tighten-prose, rewrite-for-tone]
  personas: [editor]
args:
  - name: text
    description: The text to proofread.
    type: text
    required: true
  - name: variant
    description: English spelling and punctuation variety.
    type: enum
    enum: [us, uk, au, ca]
    default: us
  - name: style_guide
    description: Optional house or published style guide to follow, for example "AP", "Chicago", "New Hart's Rules" or a few house rules.
    type: string
output_contract:
  format: markdown
  sections: [Corrected text, Changes, Queries]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Proofreading is the last pass: it fixes errors, not style. Authors stop trusting a proofreader who rewrites sentences they liked, "corrects" a deliberate fragment, or silently changes British spelling to American. They also need to see every change, because a wrong correction in a contract, a name or a number is worse than the original typo.

Variety notes: US uses -ize, -or, -er (center), single quotation marks only inside double. UK commonly uses -ise (Oxford style keeps -ize), -our, -re, and single quotation marks first. Australian follows British spelling with -ise. Canadian uses -our and -re (colour, centre) with -ize (organize), and "cheque".
</context>

<task>
Proofread the text below in {{variant}} English.{{#style_guide}} Follow this style guide where it applies: {{style_guide}}.{{/style_guide}}

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop.
2. Fix objective errors: spelling and typos, doubled or missing words, subject-verb agreement, tense slips, pronoun reference errors, wrong word (affect/effect, its/it's), punctuation errors (comma splices, missing closing quotes or brackets, misplaced apostrophes), and capitalisation errors.
3. Fix spelling that does not match {{variant}} English, except in quotations, proper nouns and titles.
4. Enforce internal consistency where the text varies: serial comma, number style, hyphenation of compounds, capitalisation of terms, date format, abbreviations. Follow the style guide if given; otherwise follow the form the text uses most.
5. Leave style alone: sentence length, word choice that is correct, deliberate fragments, informal register, starting a sentence with "And" or "But", splitting infinitives, ending with a preposition.
6. Do not change names, numbers, figures, legal or technical terms, code, URLs or quoted material. If one looks wrong, raise it as a query.
</task>

<constraints>
- Every change in the corrected text appears in the Changes table, and nothing changes that is not listed.
- Name the actual rule for each change, not "improved flow".
- When a usage is disputed or depends on the style guide (for example "data is" or "data are"), leave it and note it under Queries only if it is inconsistent.
- If the text is clean, say so and return it unchanged.
</constraints>

<output_format>
## Corrected text
The full text with corrections applied.
## Changes
A table: # | Original | Corrected | Rule. In order of appearance.
## Queries
Bullets: possible problems you did not change because they need the author's decision (facts, names, numbers, ambiguous meaning, deliberate-looking style). "None" if none.
</output_format>
