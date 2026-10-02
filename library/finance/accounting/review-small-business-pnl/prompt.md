---
schema: 1
id: review-small-business-pnl
kind: prompt
title: Review a small business P&L
description: Reviews a small business profit and loss statement for margins, cost trends and unusual lines, and names the three questions the owner should investigate first.
category: accounting
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager]
requires: [none]
inputs: [dataset, document]
output: [report, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [profit-and-loss, gross-margin, financial-statements, cost-control]
pairs_with:
  prompts: [prepare-month-end-close, forecast-cash-flow, calculate-product-margin]
  personas: [bookkeeper]
args:
  - name: pnl
    description: The profit and loss statement as text or pasted table, ideally two or more periods side by side (months, quarters or years). Say whether figures include sales tax and whether the owner's pay is in it.
    type: text
    required: true
  - name: industry
    description: What the business does, for example café, agency, e-commerce, trades, SaaS. Helps judge which lines matter.
    type: string
output_contract:
  format: markdown
  sections: [Headline, Margins, Trends, Lines that need a look, Three questions to investigate, For your accountant, Data gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review profit and loss statements for small business owners who are not accountants. Owners usually look at the bottom line and miss the story: a gross margin quietly falling because supplier prices rose faster than prices charged, one cost line growing faster than sales, a profitable year flattered by a one-off, or a "profit" that exists only because the owner pays themselves nothing or because equipment was bought and expensed. Your job is to read the numbers carefully, compute the ratios that matter, point at the lines that need explaining, and turn that into a short list of questions the owner can actually go and answer.

{{#industry}}Industry: {{industry}}{{/industry}}
</context>

<task>
P&L:

<pnl>
{{pnl}}
</pnl>

1. Restate the structure: revenue lines, cost of sales (direct costs), gross profit, operating expenses, operating profit, other income and costs, tax, net profit. If the statement mixes these up (for example direct labour in overheads), say so and recompute on a consistent basis, showing both.
2. Check the arithmetic of every subtotal and flag differences.
3. Compute for each period: revenue growth, gross margin %, each major expense as % of revenue, operating margin %, net margin %. Show the formulas once.
4. With two or more periods, describe trends: which lines grew faster or slower than revenue, and the money impact of margin changes (for example "gross margin fell from 64% to 58%; on this year's revenue that is about X less gross profit").
5. Flag unusual lines: one-offs, negative expenses, large round numbers, lines that appear or disappear, categories like "miscellaneous" or "suspense" above a few percent of costs, missing lines that this kind of business normally has (owner's pay, depreciation, rent, insurance), and anything that looks like a balance-sheet item (loan repayments, equipment purchases, owner drawings, VAT).
6. If an industry is given, describe which ratios usually matter most for it (for example food cost and labour % for a café, utilisation for an agency, contribution after fulfilment and ad spend for e-commerce). Do not quote industry benchmarks as facts; if you give a typical range, label it a rough guide and suggest a source for proper benchmarks.
7. Choose the three questions the owner should investigate first, each with why it matters in money terms and where to look for the answer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures provided. Do not invent missing periods, lines or benchmarks.
- Describe, do not prescribe: you may name levers (pricing, supplier terms, staffing) as areas to examine, but not tell the owner to cut a specific cost or raise prices by a specific amount.
- Profit is not cash. Note that the P&L does not show cash timing, loan repayments or stock build-up, and suggest a cash-flow view if relevant.
- Tax, revenue recognition, depreciation choices and anything going into filed accounts are questions for the accountant.
- Round percentages to one decimal place and money to whole units.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
Two or three sentences: how the business is doing on these numbers.

## Margins
Table: metric | each period | change.

## Trends
Bullets with numbers.

## Lines that need a look
Table: line | what is unusual | possible explanations | how to check.

## Three questions to investigate
Numbered, each with why it matters in money and where to look.

## For your accountant
Bullets.

## Data gaps
Bullets: what is missing and what it would change.
</output_format>
