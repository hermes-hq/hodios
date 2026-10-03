---
schema: 1
id: calculate-cogs
kind: prompt
title: Calculate cost of goods sold
description: Calculates cost of goods sold and closing inventory value from purchases and stock counts using FIFO, weighted average or specific identification, explaining each step and the checks.
category: accounting
version: 1.0.0
status: incubating
stage: [build, verify]
role: [founder, operations-manager, financial-analyst]
subject: [ecommerce]
requires: [none]
inputs: [dataset, text]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cogs, inventory-valuation, fifo, stock-count]
pairs_with:
  prompts: [calculate-product-margin, prepare-year-end-accounts-pack, explain-accounting-concept]
  personas: [bookkeeper]
args:
  - name: inventory_data
    description: Opening stock (quantities and costs), purchases in the period with dates, quantities and unit costs (plus freight-in and duties), units sold, closing stock count, and any damaged, obsolete or returned stock.
    type: text
    required: true
  - name: method
    description: Costing method to apply.
    type: enum
    enum: [fifo, weighted-average, specific]
    default: fifo
output_contract:
  format: markdown
  sections: [Result, Inputs used, Working, Checks, Write-downs and adjustments, What to confirm with your accountant]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You calculate cost of goods sold (COGS) and the value of stock left at the end of a period, showing every step so an owner or bookkeeper can follow and check it. The base identity is: opening inventory + purchases (including costs to bring stock to its location, such as freight-in and import duties) − closing inventory = COGS. The costing method decides which unit costs sit in closing stock and which flow to COGS:
- fifo: the oldest costs are sold first, so closing stock carries the latest costs.
- weighted-average: each unit carries the average cost of units available (recomputed after each purchase under a perpetual system, or once per period under a periodic system).
- specific: each item's own cost, used for unique or high-value items tracked individually.

Method requested: {{method}}
</context>

<task>
Inventory data:

<inventory_data>
{{inventory_data}}
</inventory_data>

1. List the inputs as you understood them: opening stock, each purchase with its landed unit cost (adding freight-in and duties spread across the units they relate to), units sold, closing count. Ask about anything missing or inconsistent instead of filling it in.
2. Reconcile units: opening units + purchased units − sold units should equal the counted closing units. Report any difference as shrinkage or a counting error to investigate, and say how it is treated in the calculation.
3. Apply {{method}} step by step with a layer or running-average table, and compute closing inventory value and COGS.
4. Prove the result with the identity: opening + purchases − closing = COGS, both in units and in money.
5. Consider write-downs: stock damaged, obsolete or likely to sell for less than cost should usually be carried at the lower of cost and net realisable value (verify the rule for the user's framework). Show the effect separately.
6. If the user asks, or if it helps the decision, show how the result would differ under the other methods in one short comparison table, and note that the method should be applied consistently from year to year.
7. List what to confirm with an accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the data given. Do not invent unit costs, dates or counts; if something is missing, list it and stop the calculation at that point or show it with a labelled placeholder.
- Show all arithmetic and round money to two decimals at the end, not in intermediate steps.
- Say plainly that which methods are allowed, and whether a method can be changed, depends on the accounting framework and tax rules (for example, LIFO is not allowed under IFRS); mark these points "verify".
- Explain any term the first time you use it in one short clause.
{{> output/uncertainty}}
</constraints>

<output_format>
## Result
Two lines: COGS and closing inventory value for the period, with the method.

## Inputs used
Table: item | date | units | unit cost (landed) | total.

## Working
Layer or running-average table, then the COGS calculation.

## Checks
Unit reconciliation and the identity proof.

## Write-downs and adjustments
Bullets with amounts, or "none identified".

## What to confirm with your accountant
Numbered.
</output_format>
