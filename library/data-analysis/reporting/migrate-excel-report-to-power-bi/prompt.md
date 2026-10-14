---
schema: 1
id: migrate-excel-report-to-power-bi
kind: prompt
title: Migrate an Excel report pack to Power BI
description: Plans moving a recurring Excel report pack into Power BI - inventory of tabs and manual steps, formulas mapped to Power Query and measures, and parity tests before cutover.
category: reporting
version: 1.0.0
status: incubating
stage: [plan, design, verify]
role: [data-analyst, financial-analyst, business-analyst, data-engineer]
stack: [power-bi, excel]
inputs: [file, text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [report-migration, parity-testing, power-query, dax, cutover]
pairs_with:
  prompts: [design-power-bi-data-model, write-dax-measure, write-power-query, write-report-runbook]
args:
  - name: workbook
    description: "The Excel report pack: each tab and what it does, where its data comes from (exports, other files, typed values), key formulas, manual adjustments made each cycle, the outputs people read, and who uses them."
    type: text
    required: true
  - name: constraints
    description: Deadline, Power BI licence type, gateway or data access limits, and who must sign off. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Target design, Formula mapping, Manual steps, Parity test plan, Cutover, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An Excel report pack mixes three things in the same tabs: data preparation (pasted exports, lookups, cleanup), calculation (SUMIFS grids, ratios, year-to-date formulas) and presentation (a laid-out page someone prints or screenshots). Migrations that copy the tabs one for one into Power BI end up slow and fragile. Migrations that work separate the layers: raw data and lookups go to Power Query or the source; row-level logic goes to Power Query or the source rather than DAX calculated columns; aggregations become measures, with ratios built as a ratio of sums rather than an average of row ratios; year-to-date and prior-period formulas become time intelligence on a proper date table. The hidden risks are the manual steps: values typed over formulas, a monthly adjustment pasted in, a mapping of products to categories kept in someone's head or a hidden tab. Each must become a governed table with an owner, or the new report will quietly disagree with the old one. Cell-by-cell layouts such as a management P&L need a layout table to control row order and subtotals. Users will compare the new numbers with the old ones on day one, so parity must be proven for at least two cycles before the old pack stops, and differences that turn out to be errors in the old workbook must be documented, not hidden.
</context>

<task>
<workbook>
{{workbook}}
</workbook>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Inventory the workbook: each tab with its role (input, preparation, calculation, output), data sources, refresh method, and the outputs people actually use. Mark outputs nobody seems to use as candidates to drop, to confirm with users.
2. Propose the target design: source connections, Power Query steps, the tables of a star-shaped model (facts, dimensions, a date table), mapping and adjustment tables, and the report pages that replace the outputs.
3. Map formulas: for each important Excel calculation, where it goes (source, Power Query, measure) and the measure logic in words or short DAX, flagging any Excel logic whose result differs by design (averages of ratios, hard-coded cells, circular references).
4. Turn every manual step into a controlled mechanism: an adjustments table with amount, reason, author and period; a mapping table with an owner; or an automated rule. List any step that cannot be automated and who will do it.
5. Write a parity test plan: which figures to compare (grand totals, each output total, breakdowns by the main dimensions, a few individual rows), the tolerance, the number of cycles to run in parallel (at least two), how to record differences, and how to decide whether a difference is an Excel error or a migration error.
6. Plan cutover: sign-off criteria, communication, how users who need Excel get it (for example Analyze in Excel or a governed export), archiving the old workbook, and a rollback option.
7. List risks with mitigations: data access and gateway, licence limits, key-person knowledge, and timeline.
</task>

<constraints>
- Base the inventory on the workbook description; do not invent tabs, sources or formulas. Where the description is thin, list what you need to see.
- Keep DAX and Power Query snippets short and illustrative; say they need testing against the real model.
- Do not plan to switch off the Excel pack before parity sign-off.
- Respect the licence and access constraints given; flag features that need a higher licence.
</constraints>

<output_format>
## Inventory
Table: tab | role | source | refresh | used by | keep or drop.

## Target design
Sources, Power Query, model tables, report pages.

## Formula mapping
Table: Excel calculation | where it goes | logic | note on differences.

## Manual steps
Table: manual step | new mechanism | owner.

## Parity test plan
Table: check | Excel figure | Power BI figure | tolerance | cycles. Then the difference log format.

## Cutover
Checklist.

## Risks
Table: risk | mitigation.
</output_format>
