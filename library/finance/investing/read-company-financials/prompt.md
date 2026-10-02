---
schema: 1
id: read-company-financials
kind: prompt
title: Read a company's financial statements
description: Walks a learner through a company's income statement, balance sheet and cash flow statement, computes key ratios with the working shown, and explains what they reveal about the business.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual, student, financial-analyst]
subject: [economics]
requires: [none]
inputs: [document, dataset]
output: [explanation, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [financial-statements, ratios, fundamental-analysis, free-cash-flow]
pairs_with:
  prompts: [explain-investment-concept]
args:
  - name: statements
    description: The financial statements or extracts (income statement, balance sheet, cash flow statement), ideally two or more years, with units and currency. Pasted tables or text from an annual report.
    type: text
    required: true
  - name: focus
    description: What you want to understand most, such as profitability, debt, cash generation, growth quality, or one line item. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The business in numbers, Income statement, Balance sheet, Cash flow, Key ratios, What stands out, What these numbers cannot tell you, Questions for further research]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are teaching someone to read company financials the way an analyst does: start with what the business sells and how it makes money, then read the three statements together, because each one hides things the others reveal. Profit can rise while cash falls; a strong balance sheet can mask a shrinking business; one-off items can flatter a year. The goal is to build the reader's skill, so explain each step and show every calculation.

{{#focus}}Focus: {{focus}}{{/focus}}
</context>

<task>
Statements:

<statements>
{{statements}}
</statements>

1. Identify the period(s), currency, units (thousands, millions) and accounting framework if stated. If there is only one period, say trends cannot be judged.
2. Income statement: revenue and its growth, gross margin, operating margin, net margin; separate one-off or non-operating items where they are visible.
3. Balance sheet: liquidity (current ratio), leverage (debt to equity, net debt), and any large or unusual items (goodwill, receivables growing faster than revenue, inventory build-up).
4. Cash flow: operating cash flow vs net income (cash conversion), capital expenditure, free cash flow, and how cash was used (debt repayment, dividends, buybacks, acquisitions).
5. Compute key ratios only from the numbers given, with the formula and the working for each. Where a ratio needs data that is missing (share price for valuation ratios, interest expense for interest cover), say what is missing instead of estimating it.
6. Point out what stands out, linking the statements to each other (for example, "net income rose 12% but operating cash flow fell, mainly because receivables grew").
7. Explain the limits of this analysis and list questions the reader could research next (annual report notes, segment data, competitors' ratios).
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is education about reading financials. Do not say whether the company is a buy, sell or hold, give a price target or valuation, or compare it as an investment with other companies.
- Use only the numbers provided. Never fill gaps with figures from memory about the company; if the company is named, still use only the pasted data and say so.
- Check that the statements are internally consistent where you can (assets = liabilities + equity) and flag inconsistencies, which often mean a transcription error.
- Ratio benchmarks differ by industry. When you describe a ratio as high or low, say "for many industries" or ask for the industry rather than applying one universal threshold.
- Define every term the first time it appears.
{{> output/uncertainty}}
</constraints>

<output_format>
## The business in numbers
Three or four sentences: size, growth, profitability, cash.

## Income statement
Short paragraph plus key lines.

## Balance sheet
Short paragraph plus key lines.

## Cash flow
Short paragraph plus key lines.

## Key ratios
Table: ratio | formula | working | result | what it tells you.

## What stands out
Three to six bullets that connect the statements.

## What these numbers cannot tell you
Bullets.

## Questions for further research
Bullets.
</output_format>
