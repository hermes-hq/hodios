---
schema: 1
id: nudge-trade-account-reorders
kind: prompt
title: Nudge trade accounts to reorder
description: Reads trade or wholesale order history to find accounts due or overdue to reorder, ranks them by value and lapse risk, and writes a call script or message per account built on what they buy.
category: sales
version: 1.0.0
status: incubating
stage: [operate]
role: [sales-rep, founder]
subject: [retail, supply-chain]
requires: [none]
inputs: [dataset, text]
output: [table, message, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [wholesale-accounts, reorder-cycle, lapsed-accounts, account-reactivation, trade-counter]
pairs_with:
  prompts: [pitch-to-stockists, write-account-plan, review-sales-pipeline]
args:
  - name: order_history
    description: Order lines or a summary per account - account name, order dates, products or SKUs, quantities and values. A pasted CSV or spreadsheet export is ideal; at least the last three orders per account if you have them.
    type: text
    required: true
  - name: new_lines_or_changes
    description: New products, stock coming back, discontinued lines, price changes with dates, seasonal deadlines or minimum order changes worth mentioning. Optional.
    type: text
  - name: today
    description: Today's date, so days since last order are calculated correctly (for example 2026-10-04).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Account board, Call list, Scripts and messages, Data gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a wholesale or distributor rep, a maker selling to shops, or trade counter staff decide which accounts to contact this week about reordering. Trade customers rarely announce that they are drifting away: the gap between orders just stretches, or the basket gets smaller as a competitor takes some lines. Reps waste time calling the accounts they like rather than the ones that are due. A useful reorder nudge is timed to each account's own rhythm, mentions what that shop actually buys, and gives one reason to order now (a new line, stock back, a price change date, a seasonal deadline).
</context>

<task>
Today is {{today}}.

<order_history>
{{order_history}}
</order_history>

{{#new_lines_or_changes}}<new_lines_or_changes>
{{new_lines_or_changes}}
</new_lines_or_changes>{{/new_lines_or_changes}}

1. Per account, calculate: number of orders, typical gap between orders (median of gaps; with two orders, the single gap, flagged as low confidence), days since last order, average order value, trailing 12-month value, and top three products.
2. Status: due (days since last order is 80-110% of the typical gap), overdue (110-150%), at risk (over 150%, or the last two baskets shrank by more than 30% or lost a top product), not yet due, or one-off (single order; treat as a follow-up, not a reorder).
3. Rank due, overdue and at-risk accounts by 12-month value x status weight (at risk 3, overdue 2, due 1). Show the top 15 at most.
4. For each ranked account, pick the channel (call for top-value and at-risk accounts, message or email for the rest) and one reason to contact now, using only the new lines or changes given or their own buying pattern ("you usually restock the 250ml before half-term").
5. Write a call opener and question, or a short message, per account. For at-risk accounts, ask an honest question about what changed instead of pushing an order.
</task>

<constraints>
- Calculate only from the data given; show days and gaps so the rep can check them. If dates or values are missing or unparseable, list the rows under Data gaps.
- Never invent stock levels, promotions, prices or deadlines. Mention a change only if it is in the changes provided.
- Messages under 60 words, calls opener under 20 seconds, in a friendly trade tone using the buyer's usual products.
- Do not suggest discounts unless the changes list includes one.
- If the order history is empty or has no dates, ask for it and stop.
</constraints>

<output_format>
## Account board
Table: Account | Orders | Typical gap (days) | Days since last | 12-month value | Status | Top products.

## Call list
Ranked table: Rank | Account | Status | Why now | Channel.

## Scripts and messages
Per ranked account: a bold account name, then the call opener and question, or the message.

## Data gaps
Bullets: rows or accounts that could not be assessed and what is needed.
</output_format>
