---
schema: 1
id: make-numbers-readable-in-text
kind: prompt
title: Make numbers readable in text
description: Rewrites the figures in a report, article or update so readers grasp them, with sensible rounding, one consistent format, comparisons, per-person or per-unit framing and fewer numbers per sentence.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, data-analyst, manager, researcher]
requires: [none]
inputs: [text, document]
output: [rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [numbers-in-prose, statistics-communication, rounding, number-formats, numeracy]
pairs_with:
  prompts: [turn-text-numbers-into-chart, extract-key-numbers, run-readability-check]
  personas: [editor]
args:
  - name: text
    description: The text containing the numbers.
    type: text
    required: true
  - name: reader
    description: "Who reads it, for example \"the general public\" or \"the finance committee\"."
    type: text
  - name: number_style
    description: "Any house rules for numbers, for example \"spell out one to nine, use % symbol, UK dates\"."
    type: string
output_contract:
  format: markdown
  sections: [Number problems, Edited text, Numbers changed, Checks for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Numbers in prose fail readers in recognisable ways: too many in one sentence; false precision ("an increase of 23.4718%"); mixed formats (3m, 3,000,000 and three million in one page); percentages without the base ("up 50%" from 2 to 3); percentage-point changes confused with percent changes; large totals with no sense of scale; and comparisons that make the reader do arithmetic. Readers grasp numbers better when they are rounded to what matters, put in context (per person, per day, compared with something familiar or with last year), and given one or two per sentence. Every rounding and reframing must stay accurate: "nearly half" for 41% is misleading, and per-person figures need the right denominator.
</context>

<task>
Make the numbers in this text easy to grasp.
{{#reader}}Reader: {{reader}}{{/reader}}
{{#number_style}}House rules for numbers: {{number_style}}{{/number_style}}

<text>
{{text}}
</text>

1. If the text is empty or has no numbers, say so and stop.
2. List the number problems: overcrowded sentences, false precision, inconsistent formats, missing bases or timeframes, percent versus percentage-point confusion, unexplained large figures, comparisons the reader must calculate.
3. Fix them: round to the precision that matters for the reader (keep exact figures where exactness matters, such as money owed, doses or legal thresholds); apply one format consistently, using the house rules if given; split overcrowded sentences; add the base or timeframe if it is in the text; do the comparison arithmetic for the reader; add per-person or per-unit framing only when the denominator is in the text.
4. Show your arithmetic for every derived figure so it can be checked.
5. If a reframing needs data the text does not contain (a population, last year's figure), do not invent it: mark `[NEED: …]` and list it.
</task>

<constraints>
- Every rounded or derived number must be correct and not misleading. Round "nearly" and "more than" in the right direction.
- Do not change what the numbers mean or which comparison they make.
- Do not add outside data.
- Keep exact figures in tables, footnotes or where precision is required; you may keep an exact figure in brackets after a rounded one.
</constraints>

<output_format>
## Number problems
Bullets with quoted examples.
## Edited text
The full edited text.
## Numbers changed
A table: Original | New | Arithmetic or reason.
## Checks for you
Missing data and any rounding the author should confirm. "None" if none.
</output_format>
