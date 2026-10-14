---
schema: 1
id: tie-out-report-to-source
kind: prompt
title: Tie out a report to its source system
description: Ties every figure in a report back to the source system or ledger with a tie-out sheet, explains each difference (timing, filters, definitions, currency, joins) and lists fixes.
category: reporting
version: 1.0.0
status: incubating
stage: [verify]
role: [data-analyst, financial-analyst, business-analyst]
inputs: [document, dataset, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [tie-out, source-reconciliation, audit-trail, report-assurance]
pairs_with:
  prompts: [check-report-figures, reconcile-datasets, explain-metric-discrepancy, write-data-correction-notice]
args:
  - name: report_figures
    description: The figures in the report to tie out, with where each appears and how it was produced (query, pivot, extract) if known.
    type: text
    required: true
  - name: source_figures
    description: "The matching figures from the source system or ledger: control totals, trial balance lines, system screens or query results, with the date and time they were taken."
    type: text
    required: true
  - name: tolerance
    description: The acceptable difference (for example rounding only, or 0.5% or a fixed amount). Optional; defaults to rounding only.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Tie-out sheet, Differences explained, Open items, Fixes, Evidence and sign-off]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tying out means proving that each number in a report comes from the system of record, figure by figure, and leaving a trail a reviewer or auditor can follow. It is different from checking that a report adds up internally: a report can be perfectly consistent and still wrong against the ledger. Experienced preparers tie the totals first, then drill into the components only where totals differ. The differences are rarely mysterious. Timing and cut-off: posting date against transaction date, a different timezone, an extract taken before late postings or a restatement. Filters: test or internal accounts, cancelled orders, intercompany lines. Definitions: gross against net of returns, discounts or tax. Currency: a different rate or rate date. Joins in the report query that drop unmatched rows or duplicate them. Rounding. A difference is "explained" only when its amount is accounted for, not when a plausible cause is named. Each line ends in a status, and the preparer and reviewer are recorded.
</context>

<task>
<report_figures>
{{report_figures}}
</report_figures>

<source_figures>
{{source_figures}}
</source_figures>
{{#tolerance}}

Tolerance: {{tolerance}}
{{/tolerance}}

1. Pair each report figure with its source figure. List report figures with no source given as "no source provided".
2. Tie the totals first, then each component. For each line compute the difference and the difference as a percentage of the source.
3. Give each line a status: tied, tied within rounding, explained difference, or open. Use the tolerance given, or rounding only if none.
4. For each difference, test the usual causes against the evidence: cut-off and timing (compare extract times and date fields), filters, definitions, currency, joins (row counts, duplicates) and rounding. Mark a difference explained only when the explanation accounts for its amount; otherwise keep it open with the most likely cause and the check that would confirm it.
5. List fixes: corrections to the report, changes to the query or process so the difference does not recur, and any figure that must not be published until resolved.
6. Write the evidence and sign-off block: the source reference and timestamp per line, preparer, reviewer and date fields to fill.
</task>

<constraints>
- Never mark a line tied or explained without the arithmetic to show it.
- Do not invent source figures, extract times or causes; ask for what is missing.
- Show amounts with their units and currencies; never compare figures in different units without converting and saying so.
- Separate verified facts from inferred causes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Lines tied, explained and open, with the total unexplained difference and whether the report can go out.

## Tie-out sheet
Table: ref | report figure | location | report value | source | source value | difference | difference % | status.

## Differences explained
Per difference: amount, cause, arithmetic, evidence.

## Open items
Table: ref | amount | most likely cause | check to confirm | owner role.

## Fixes
## Evidence and sign-off
Source references and timestamps, then preparer, reviewer and date lines to fill.
</output_format>
