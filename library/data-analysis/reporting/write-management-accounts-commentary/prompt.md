---
schema: 1
id: write-management-accounts-commentary
kind: prompt
title: Write management accounts commentary
description: Writes the narrative for a monthly management accounts pack covering profit, margin, cash, working capital and balance sheet movements in plain words, with open questions for finance.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [financial-analyst, founder, executive, manager]
inputs: [dataset, text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [management-accounts, month-end, profit-and-loss, working-capital, board-pack]
pairs_with:
  prompts: [explain-budget-variance, write-monthly-business-review, forecast-cash-flow, check-report-figures]
args:
  - name: accounts
    description: "The month's profit and loss (month and year to date, against budget and prior year), balance sheet at month end and prior month end, cash flow or cash movement, and key figures such as debtor days, creditor days and stock."
    type: text
    required: true
  - name: notes
    description: "Known one-offs, accrual or provision changes, timing items, pricing or cost changes, and anything the finance team has already explained. Optional."
    type: text
  - name: audience
    description: Who reads the pack (owner-manager, leadership team, board, lender) and how much finance knowledge they have. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Headline, Profit and loss, Margin, Cash and working capital, Balance sheet, Outlook and risks, Questions and open items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Management accounts commentary tells non-accountants what the numbers mean this month: did we make money, why, and did it turn into cash. Good finance teams write it in a set order. Revenue movement split into volume, price and mix where the data allows. Gross margin movement explained by price, input costs, mix or one-offs, because a margin change of one point on large revenue usually matters more than a large overhead line. Overheads against budget, separating timing (a cost booked earlier or later than budgeted) from real over or underspend. Then the bridge from profit to cash, because profitable months can still drain cash through debtors, stock, capital spend, tax or loan repayments; debtor days and creditor days show whether working capital is moving. Balance sheet lines that moved a lot need a sentence: accruals, provisions, deferred income, intercompany. Month figures are noisy, so year to date and the trend carry more weight than one month. Management accounts are unaudited and often contain estimates, which the commentary should say plainly.

{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
<accounts>
{{accounts}}
</accounts>

{{#notes}}<notes>
{{notes}}
</notes>{{/notes}}

1. Write a headline that states profit for the month and year to date against budget and prior year, and the cash position, in one or two sentences.
2. Explain revenue movements, splitting volume, price and mix where the figures allow, and mark one-offs and timing.
3. Explain gross margin and its drivers, then overheads against budget, separating timing from real variances.
4. Build a short profit-to-cash bridge (profit, working capital movements, capital spend, tax, financing) and comment on debtor days, creditor days and stock.
5. Comment on any material balance sheet movement.
6. State the outlook and risks the figures point to, and list open questions where the numbers do not explain themselves.
</task>

<constraints>
- Use only the figures and notes supplied; where a driver is not explained by them, write it as a question for the finance team, not as a guess.
- Keep the arithmetic consistent: variances, percentages and the cash bridge must add up to the figures in the pack.
- Say when a figure is an estimate or the accounts are unaudited; do not give tax, accounting-treatment or investment advice beyond describing the numbers.
- Plain words: define any accounting term the audience may not know the first time it appears.
- Do not round in ways that change the direction of a variance.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
One or two sentences.

## Profit and loss
Table: Line | Month actual | Budget | Variance | Year to date actual | Year to date budget | Prior year. Commentary on material lines below.

## Margin
Gross margin percentage this month, budget, prior year, and the drivers.

## Cash and working capital
Profit-to-cash bridge table, then debtor days, creditor days and stock comments.

## Balance sheet
Bullets on material movements.

## Outlook and risks
Bullets.

## Questions and open items
Numbered questions for the finance team or budget holders.
</output_format>
