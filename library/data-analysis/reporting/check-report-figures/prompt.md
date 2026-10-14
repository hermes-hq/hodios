---
schema: 1
id: check-report-figures
kind: prompt
title: Check a report's figures before sending
description: Checks a draft report or deck for number errors before it goes out - totals that do not add, percent versus percentage points, period and unit mismatches, text that contradicts tables.
category: reporting
version: 1.0.0
status: incubating
stage: [verify]
role: [data-analyst, business-analyst, financial-analyst, manager]
inputs: [document, text]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [quality-assurance, number-check, proofing, pre-send]
pairs_with:
  prompts: [write-insight-report, write-monthly-business-review, write-data-correction-notice]
args:
  - name: draft
    description: The draft report, deck text or tables, including chart data or labels where possible.
    type: text
    required: true
  - name: source_figures
    description: The source figures the report should match (an extract, a pivot, last period's published report). Optional; without it only internal consistency is checked.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Errors, Inconsistencies, Wording fixes, Not checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most errors in published reports are not analysis errors but production errors, and a careful reviewer checks for a known list. Components that do not sum to the stated total (often from rounding, sometimes from a stale cell). Percentage changes confused with percentage-point changes ("margin up 3%" when it went from 20% to 23%). Growth computed against the wrong base, or with the sign reversed for "lower is better" metrics. A headline in the text that no longer matches the table after a late data refresh. Periods that silently differ between sections (month to date in one, full month in another), currency or unit mismatches (thousands versus millions), averages of percentages instead of weighted rates, and chart axes or labels that disagree with the table beside them. The reviewer recomputes what can be recomputed and lists what could not be checked, instead of declaring the report correct.
</context>

<task>
<draft>
{{draft}}
</draft>
{{#source_figures}}

<source_figures>
{{source_figures}}
</source_figures>
{{/source_figures}}

1. Inventory every number in the draft with its location (section, table, chart, sentence).
2. Recompute: totals and subtotals, shares that should sum to 100%, period-on-period changes, and rates from their parts. Allow for rounding and say when a difference is only rounding.
3. Check consistency: the same figure quoted in more than one place, text claims against tables, periods, units, currencies and signs.
4. Check wording: percent versus percentage points, "increase" for a lower-is-better metric that got worse, averages of rates, unqualified superlatives ("record", "best ever") that the data does not show.
5. If source figures are supplied, compare every matching figure with the source.
6. Rank findings: errors that change a conclusion first, then wrong numbers, then wording, then cosmetic.
</task>

<constraints>
- Show the recomputation for each error so the author can verify it in seconds.
- Do not rewrite the report; give the exact fix for each finding.
- Never call a figure wrong when the difference is explained by rounding; say so instead.
- List what you could not check (charts without data, numbers without inputs); never declare the report error-free.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Ready to send, send after fixes, or hold, with the count of findings by severity.

## Errors
Table: Location | What it says | What it should say | Recomputation | Severity.

## Inconsistencies
Table: Figure | Place A | Place B | Which is right, if knowable.

## Wording fixes
Bullets: original, fix.

## Not checked
Bullets.
</output_format>
