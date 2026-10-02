---
schema: 1
id: build-style-sheet
kind: prompt
title: Build an editorial style sheet
description: Builds an editorial style sheet from a manuscript, recording spelling, capitalisation, hyphenation, numbers, terms, names and formatting decisions, and flags every inconsistency with its locations.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [editor, writer]
requires: [none]
inputs: [document, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [style-sheet, word-list, consistency, house-style]
pairs_with:
  prompts: [proofread-text, edit-for-structure]
  personas: [editor]
args:
  - name: manuscript
    description: The manuscript or a substantial part of it. Longer is better; a style sheet records decisions across the whole text.
    type: text
    required: true
  - name: house_style
    description: "The style guide and dictionary to follow, for example \"Chicago 17th, Merriam-Webster\", \"New Hart's Rules, Oxford English Dictionary, -ize spellings\", \"AP\", or \"none; infer from the manuscript\"."
    type: string
    default: none; infer the author's dominant choices from the manuscript
output_contract:
  format: markdown
  sections: [Basis, Style sheet, Word list, Names and terms, Inconsistencies, Queries for the author]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An editorial style sheet records every style decision for one manuscript so the author, copyeditor, proofreader and typesetter apply them the same way. It lists only decisions specific to this text or departures from the house style, not the whole style guide. The usual sections are general style choices (spelling variety, serial comma, number style, dates, quotation marks), an alphabetical word list (spellings, hyphenation, capitalisation, italics), names of people, places and organisations, and special terms, abbreviations and formatting. The value is in catching drift: "e-mail" on page 3 and "email" on page 40, a character's name spelled two ways, "Chapter 2" and "chapter 4".
</context>

<task>
Build a style sheet for this manuscript.
House style: {{house_style}}

<manuscript>
{{manuscript}}
</manuscript>

1. If the text is too short to show recurring choices (under about 500 words), say so, build what you can, and suggest sending more.
2. Scan for every style decision in these areas: spelling variety (US, UK, other) and -ise/-ize; serial comma; numbers (words versus figures and the threshold, percentages, currencies, ranges); dates and times; capitalisation of titles, headings, job titles and terms; hyphenation and compounds; italics for titles, foreign words and emphasis; abbreviations and acronyms (first-use expansion, full stops); quotation marks and punctuation placement; lists and headings format; cross-references; and any field-specific conventions.
3. For each decision, record the form to use. If a house style is named, follow it and note where the manuscript departs. If none is given, adopt the author's dominant usage (the form used most often) and say so.
4. Build the alphabetical word list: every term whose spelling, hyphenation, capitalisation or italics needed a decision, with the chosen form.
5. List names (people, places, organisations, products, fictional entities) with their exact spelling and any descriptor needed to keep them straight.
6. Flag every inconsistency: each variant found, how often or where (quote a few words of surrounding text so it can be found), and the recommended form.
7. Where the choice is the author's (a deliberate stylistic quirk, a contested name), raise a query instead of deciding.
</task>

<constraints>
- Record only what is in the manuscript; do not pad the sheet with general rules the text never needs.
- Do not change or correct the manuscript itself; this output is the sheet and the flag list.
- When you cite a style guide rule, name the guide but do not quote section numbers you are not sure of.
- Distinguish errors (a misspelled name) from inconsistencies (two acceptable forms) and from author choices.
- Keep quoted words, titles of works and names exactly as the author or owner spells them, even if unusual.
</constraints>

<output_format>
## Basis
House style and dictionary applied, or "inferred from manuscript", plus the spelling variety.
## Style sheet
A table: Area | Decision | Example from the text.
## Word list
Alphabetical table: Term | Use | Notes (for example "hyphenated as adjective only").
## Names and terms
Table: Name or term | Exact form | Type or descriptor | First appearance.
## Inconsistencies
Table: Variants found | Where (short quoted context) | Recommended form | Error, inconsistency or author choice.
## Queries for the author
Numbered questions on choices only the author can make.
</output_format>
