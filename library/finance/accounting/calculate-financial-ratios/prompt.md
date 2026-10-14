---
schema: 1
id: calculate-financial-ratios
kind: prompt
title: Calculate financial ratios across years
description: Calculates liquidity, profitability, leverage and efficiency ratios from two or more years of statements, with a trend table, loan covenant tests and what each movement means.
category: accounting
version: 1.0.0
status: incubating
stage: [review]
role: [founder, financial-analyst, executive]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ratio-analysis, loan-covenants, trend-analysis, interest-cover]
pairs_with:
  prompts: [review-balance-sheet, review-small-business-pnl, analyze-working-capital]
  personas: [fractional-cfo]
args:
  - name: statements
    description: Profit and loss and balance sheet for two or more years or periods, line by line. Include interest, depreciation, loan repayments and owner pay if you have them.
    type: text
    required: true
  - name: purpose
    description: Why you want the ratios - lender review, covenant check, board pack, sale preparation, own monitoring - and any covenant definitions and thresholds from your loan agreement.
    type: text
    required: true
  - name: business
    description: What the business does and its sector, so the commentary fits. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Definitions used, Ratio trend table, Covenant tests, What changed and why, Watch list, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You do ratio analysis the way an experienced finance lead preparing for a lender or board does. A ratio is only useful with its definition, its trend, and the reason it moved. The same name hides different formulas: EBITDA may or may not include owner pay; debt may include leases and overdrafts or not; days ratios may use year-end or average balances. Lenders define covenant ratios in the loan agreement, and those definitions override textbook ones. The core set: liquidity (current ratio, quick ratio, cash days), profitability (gross margin, operating margin, net margin, return on capital employed), leverage (debt to equity, debt to EBITDA, interest cover, debt service cover), and efficiency (receivable days, payable days, stock days, asset turnover). Sector norms vary widely, so state ranges only as "check your sector" unless the user provides a benchmark.

Purpose: {{purpose}}
{{#business}}Business: {{business}}{{/business}}
</context>

<task>
Statements:

<statements>
{{statements}}
</statements>

1. State each ratio's formula as used, and where the user's covenant definitions differ, use theirs for the covenant test and say so.
2. Compute every ratio for each period, showing the inputs, in one trend table. Use average balances where both opening and closing are available and say which you used.
3. Run covenant tests if thresholds were given: actual, threshold, headroom in amount and percent, pass or fail, and the change in earnings or debt that would cause a breach.
4. Explain the three to six movements that matter most, tying each to the line items that drove it (for example receivable days rising because sales grew in the last quarter).
5. Build a watch list: ratios close to a threshold or moving the wrong way, with what to monitor monthly.
6. List data gaps that weaken the analysis (missing interest, no opening balances, owner pay not shown).
7. Recompute every ratio before answering.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given and show the inputs to every ratio.
- Do not invent sector benchmarks; if none are given, say what to compare against and where such data usually comes from.
- Do not interpret a covenant breach legally or advise on what to tell the lender beyond "talk to them early"; refer loan agreement questions to the accountant or adviser.
- Round ratios sensibly (one or two decimals, days to whole numbers).
</constraints>

<output_format>
## Definitions used
Table: ratio | formula | note.

## Ratio trend table
Table: ratio | each period | direction.

## Covenant tests
Table: covenant | threshold | actual | headroom | result. Write "None given" if none.

## What changed and why
Bullets.

## Watch list
Bullets.

## Data gaps
Bullets.
</output_format>
