---
schema: 1
id: build-cash-flow-statement
kind: prompt
title: Build a cash flow statement
description: Builds a historic cash flow statement by the indirect method from two balance sheets and a profit and loss, reconciling profit to cash and explaining where the money went.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, financial-analyst, executive]
requires: [none]
inputs: [dataset, text]
output: [table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cash-flow-statement, indirect-method, working-capital, profit-vs-cash]
pairs_with:
  prompts: [forecast-cash-flow, analyze-working-capital, prepare-financial-statements-from-trial-balance]
  personas: [fractional-cfo]
args:
  - name: balance_sheets
    description: The opening and closing balance sheets for the period, line by line.
    type: text
    required: true
  - name: profit_and_loss
    description: The profit and loss for the same period, including depreciation, interest and tax lines.
    type: text
    required: true
  - name: extra_details
    description: Anything the balance sheets do not show - assets bought or sold and proceeds, new loans and repayments, dividends or drawings, capital introduced, tax paid. Optional but makes the statement accurate.
    type: text
output_contract:
  format: markdown
  sections: [Inputs check, Cash flow statement, Working capital movements, Reconciliation to cash, What it shows, Gaps and assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build cash flow statements the way an experienced accountant does when an owner asks "we made a profit, so where is the cash?". The indirect method starts from operating profit (or profit before tax), adds back non-cash charges such as depreciation and losses on disposal, adjusts for working capital (an increase in receivables or stock uses cash; an increase in payables provides it), then shows tax paid, investing flows (assets bought and sold) and financing flows (loans drawn and repaid, capital introduced, drawings or dividends). The statement must end at the actual change in cash between the two balance sheets. Fixed asset purchases come from the change in cost or net book value plus depreciation and disposals, not from guesswork, and tax and interest paid differ from the charge by the movement in the related liability. Different frameworks classify interest and dividends differently; state the choice.
</context>

<task>
Balance sheets:

<balance_sheets>
{{balance_sheets}}
</balance_sheets>

Profit and loss:

<profit_and_loss>
{{profit_and_loss}}
</profit_and_loss>

{{#extra_details}}Extra details:

<extra_details>
{{extra_details}}
</extra_details>{{/extra_details}}

1. Check the inputs: both balance sheets balance, retained earnings or capital moves by profit less drawings or dividends plus capital introduced (if not, list the unexplained movement), and the period matches the profit and loss.
2. Compute the operating section: profit, add back depreciation, amortisation and losses on disposal (deduct gains), then each working capital movement line by line, interest and tax paid derived from the charge and the liability movement.
3. Compute investing flows: asset purchases derived from opening and closing values, depreciation and disposals; disposal proceeds.
4. Compute financing flows: loans drawn and repaid from the loan balance movement and details given, capital introduced, drawings or dividends.
5. Show the total net cash flow and reconcile it to the change in cash (cash and bank less overdrafts) between the balance sheets. If it does not agree, state the difference and which line is most likely incomplete.
6. Explain in plain words where the cash came from and went, and the two or three movements that matter most.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Derived figures show their working. Do not invent asset purchases, loans or dividends to make it agree.
- Never plug a difference; report it.
- State the classification choices made for interest, dividends and drawings.
- This is a management statement, not a statutory one.
</constraints>

<output_format>
## Inputs check
Bullets.

## Cash flow statement
Table: operating, investing, financing sections with subtotals, net change in cash, opening and closing cash.

## Working capital movements
Table: item | opening | closing | movement | cash effect.

## Reconciliation to cash
Figures showing the statement agrees to the bank movement, or the difference.

## What it shows
Three to five plain bullets.

## Gaps and assumptions
Bullets.
</output_format>
