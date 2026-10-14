---
schema: 1
id: write-house-style-guide
kind: prompt
title: Write a house style guide
description: Writes a short house style guide for a team covering names, numbers, dates, capitals, punctuation, lists, headings, inclusive terms and the disputes the team keeps having, with examples.
category: editing
version: 1.0.0
status: incubating
stage: [plan]
role: [editor, manager, technical-writer, marketer]
requires: [none]
inputs: [document, preferences]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [house-style, editorial-standards, writing-standards, consistency, team-writing]
pairs_with:
  prompts: [build-style-sheet, copyedit-to-style-guide, write-brand-voice-guide]
  personas: [editor]
args:
  - name: organisation
    description: "Who the guide is for and what they write, for example \"a 30-person environmental charity: reports, grant bids, social posts and newsletters\"."
    type: text
    required: true
  - name: base_guide
    description: "An existing published guide to defer to for anything not covered, for example \"Chicago\", \"AP\", \"Guardian style\" or \"none\"."
    type: string
    default: none stated
  - name: samples_and_disputes
    description: Optional samples of the team's writing, and the questions people keep arguing about (for example "percent or %", "Oxford comma", how to write the organisation's own name).
    type: text
output_contract:
  format: markdown
  sections: [How to use this guide, Our names and terms, Numbers and dates, Capitals and punctuation, Lists and headings, Inclusive and respectful language, Decisions on disputes, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A house style guide exists to end repeated arguments and make a team's writing look like it came from one organisation. Good ones are short (people do not read 40-page guides), alphabetical or grouped so answers are found in seconds, decided rather than hedged ("Use %, not percent"), shown with an example, and defer to a named published guide for everything else. They focus on what the team actually gets wrong or disagrees on: the organisation's own name and product names, job titles, numbers, dates and times, capitalisation of headings and teams, abbreviations, the Oxford comma, lists, and sensitive terms for the people the organisation works with. A style guide is different from a brand voice guide (how the organisation sounds) and from a style sheet for one manuscript.
</context>

<task>
Write a house style guide for this organisation.

Organisation and what they write: {{organisation}}
Base guide to defer to: {{base_guide}}
{{#samples_and_disputes}}
<samples_and_disputes>
{{samples_and_disputes}}
</samples_and_disputes>
{{/samples_and_disputes}}

1. If the organisation description is too thin to know what they write, ask what documents and audiences the guide must cover, and stop.
2. From the samples, list the inconsistencies the team already shows (for example three spellings of the organisation's name, mixed date formats).
3. For each topic area in the output, make a clear decision with a one-line example. Prefer the base guide's choice unless the samples or disputes suggest the team needs something else, and say when you depart from it.
4. Settle every listed dispute with a decision and a short reason.
5. Where a choice depends on the organisation's country or sector conventions (spelling variety, date order, currency), state the assumption and give the alternative.
6. Where only the organisation can decide (how to write product names, preferred terms for the communities it serves), do not guess: list it as an open question with options.
7. Keep the whole guide short enough to read in ten minutes.
</task>

<constraints>
- Make decisions, not lists of options, except for genuinely open questions.
- Do not invent product names, team names or facts about the organisation; use placeholders where needed.
- Do not quote or reproduce published style guides; refer to them by name.
- Inclusive language choices must follow the stated preferences of the communities concerned where known; flag where the organisation should ask.
</constraints>

<output_format>
## How to use this guide
Three or four lines, including the base guide for anything not covered.
## Our names and terms
A table: Write | Not | Note.
## Numbers and dates
Bulleted decisions with examples.
## Capitals and punctuation
Bulleted decisions with examples.
## Lists and headings
Bulleted decisions with examples.
## Inclusive and respectful language
Bulleted decisions with examples.
## Decisions on disputes
Each dispute: the decision and a one-line reason.
## Open questions
Bullets for the organisation to decide, with options. "None" if none.
</output_format>
