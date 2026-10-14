---
schema: 1
id: proofread-slide-deck
kind: prompt
title: Proofread a slide deck
description: Proofreads a deck as a whole for typos, numbers that disagree between slides, inconsistent terms, title case and date formats, chart labels that contradict the text and agenda items that do not match.
category: presentations
version: 1.0.0
status: incubating
stage: [review, ship]
role: [manager, consultant, student, individual]
requires: [none]
inputs: [document]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [consistency-check, typos, numbers, final-check, quality-assurance]
pairs_with:
  prompts: [critique-slide-deck, add-sources-to-slides, proofread-text]
  personas: [presentation-designer]
args:
  - name: deck
    description: The text of every slide in order, including titles, bullets, chart titles, axis labels, footnotes and speaker notes if they will be shared.
    type: text
    required: true
  - name: conventions
    description: House rules if any, for example "British English, sentence case titles, dates as 3 March 2026, currency as EUR". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Must fix, Consistency decisions, Line fixes, Final checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You proofread slide decks before they go out. A deck has errors a sentence-level proofread misses because they span slides: the executive summary says 14% while slide 9 says 12%, the agenda lists five sections and the deck has four, the product is called three different names, one chart says "Q1-Q3" while the title says "first half", percentages in a pie chart add up to 103, and slides built by different people use different date formats and title capitalisation. Typos in large titles are the most visible and most embarrassing errors in a deck. Numbers matter most: a single inconsistent figure in front of executives or a client undermines the whole presentation. You can only check what is in the text; you cannot see the visuals unless their labels are given.

<deck>
{{deck}}
</deck>

{{#conventions}}Conventions: {{conventions}}{{/conventions}}
</context>

<task>
1. Read the whole deck first and build an inventory of every number, date, name and key term with the slides where it appears.
2. Flag every number that appears on more than one slide with different values, every total or percentage that does not add up, and every chart label or title that contradicts the slide text. Do not decide which value is right; ask.
3. Check structure: agenda against actual sections, slide numbering references ("see slide 7"), and section dividers.
4. Check consistency: product and team names, terms, abbreviations defined on first use, title capitalisation, date and number formats, currency, spelling variety{{#conventions}}, following the conventions given{{/conventions}}. Where no convention is given, pick the majority usage and say so.
5. List line-level errors: spelling, grammar, punctuation, repeated words, with slide number, original and correction.
6. Give a short checklist of things to verify that text cannot show, such as visuals, links and fonts.
</task>

<constraints>
- Do not rewrite content, change meaning or improve style; fix errors and flag inconsistencies only.
- Never guess which of two conflicting numbers is correct.
- Quote the original text exactly in each fix.
</constraints>

<output_format>
## Must fix
Numbered list of number conflicts, contradictions and title typos, each with slides affected.

## Consistency decisions
Table: Item | Variants found (slides) | Recommended form.

## Line fixes
Table: Slide | Original | Correction | Type.

## Final checks
Checklist.
</output_format>
