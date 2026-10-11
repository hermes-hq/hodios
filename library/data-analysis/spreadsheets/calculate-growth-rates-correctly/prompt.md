---
schema: 1
id: calculate-growth-rates-correctly
kind: prompt
title: Calculate growth rates correctly
description: Calculates month-on-month, year-on-year, CAGR and percentage-point changes in a spreadsheet, handling zero or negative bases, partial periods and averaged rates without misleading numbers.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, financial-analyst, founder]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [growth-rate, cagr, percentage-points, year-over-year, kpi]
pairs_with:
  prompts: [compare-period-performance, calculate-running-totals-and-ytd, write-spreadsheet-formula]
args:
  - name: data_layout
    description: Where the values are (columns or rows by period), what they measure (revenue, users, a rate like conversion or margin), the period type, and some real values including any zeros or negatives.
    type: text
    required: true
  - name: growth_needed
    description: Which growth figures you need (month on month, year on year, CAGR over N years, average monthly growth) and who reads them.
    type: text
    required: true
  - name: app
    description: The application, for example Excel 365, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Definitions, Formulas, Worked examples, Cases that need a different number, How to present it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You calculate growth figures that end up in board packs and investor updates, where a wrong sign or an inflated percentage is embarrassing. Experts know the traps. Growth from a zero base is undefined, not infinite. Growth from a negative base flips sign (a loss going from -100 to -50 computes as -50% when it is an improvement), so it needs ABS in the denominator or, better, "n/m" (not meaningful) and the absolute change. A change in a rate (margin from 20% to 25%) is 5 percentage points, not 25%, and readers confuse the two. CAGR is (end/start)^(1/years)-1 where years is the number of intervals, not the number of data points, so five annual values span four years; Excel and Google Sheets both have RRI(periods, start, end) for it. The average of monthly growth rates is not the compound monthly rate and overstates growth when it is volatile. A partial current period compared with a full prior one is not growth at all.

App: {{app}}

<data_layout>
{{data_layout}}
</data_layout>

<growth_needed>
{{growth_needed}}
</growth_needed>
</context>

<task>
1. Define each requested figure precisely: numerator, denominator, number of periods, and whether it is a percentage or a percentage-point change. Identify which measures are themselves rates or ratios.
2. Write the formulas, locked for filling across or down: simple change, percentage change, percentage-point change for rates, CAGR with RRI or the power formula, and compound average period growth if asked. Put the period count in a cell or compute it from dates, never hard-code it.
3. Handle the bad bases inside the formula: return "n/m" (or blank) when the base is zero or negative and show the absolute change instead; explain the choice. If the user insists on a percentage from a negative base, use ABS(base) in the denominator and label it.
4. Check for partial periods (a current month or year not finished) and give a like-for-like option: the same days of the prior period, or a run-rate clearly labelled as an estimate.
5. Work through at least four examples from the user's data or realistic values: a normal case, a zero base, a negative base, and a CAGR, showing the arithmetic.
6. Suggest how to show it: the growth figure beside the absolute values, one decimal place, and "pp" for percentage points.
</task>

<constraints>
- Never present growth from a zero or negative base as an ordinary percentage without a label.
- Do not average percentages across items of different size to get a total growth rate; compute growth on the totals.
- Use only functions available in {{app}}; use English-locale commas and note that some locales use semicolons.
- Do not judge whether the growth is good or bad for the business unless asked; the job is correct numbers.
- If the values look like they changed definition or scope between periods (a jump caused by an acquisition, a new product line), flag it as a question rather than ignore it.
</constraints>

<output_format>
## Definitions
One line per figure.

## Formulas
Each in a code block with its target cell.

## Worked examples
Table: start | end | periods | formula result | comment.

## Cases that need a different number
Bullets: zero base, negative base, rates, partial periods, changed scope.

## How to present it
Three to five bullets.
</output_format>
