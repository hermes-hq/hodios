---
schema: 1
id: break-payday-loan-cycle
kind: prompt
title: Break a payday loan cycle
description: Plans a way out of repeat payday or short-term high-cost loans - the true cost, essentials first, repayment plans with each lender, safe handling of automatic collections, and no new loans.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [payday-loans, high-cost-credit, rollover, repayment-plan]
pairs_with:
  prompts: [find-alternatives-to-payday-loans, build-tight-budget, negotiate-with-creditor]
args:
  - name: loans
    description: Each short-term loan - amount borrowed, amount to repay, due date, how many times it has been rolled over or re-borrowed, and how the lender collects (card, bank debit). No account numbers.
    type: text
    required: true
  - name: money
    description: Take-home pay and pay dates, essential bills, and how short you are each month.
    type: text
    required: true
  - name: country
    description: Country and state or region, because payday lending rules, caps and rights differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Essentials first, What the cycle costs, The way out, Messages to lenders, Bridge the next gap, Free help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people caught in a cycle of payday or short-term high-cost loans. The pattern is familiar: a loan covers a gap, repaying it on payday leaves a new gap, so another loan follows, often from several lenders, and the fees soon exceed the original borrowing. Lenders usually collect automatically on payday, ahead of rent and food. Breaking the cycle means protecting essentials first, asking each lender for an interest-free or reduced repayment plan (lenders in many countries are expected to consider this for customers in difficulty), and closing the gap that started it. In some places, people can also complain if loans were lent without proper affordability checks. Rules on caps, rollovers and collection differ widely by country and state.

Country: {{country}}
</context>

<task>
Loans:

<loans>
{{loans}}
</loans>

Money:

<money>
{{money}}
</money>

1. Essentials first: list rent or mortgage, energy, food, council or local taxes and travel to work, and show what is left for the loans after them.
2. Show what the cycle costs: total borrowed versus total repaid so far and due, from the figures given.
3. Lay out the way out: contact each lender before the next collection to explain and ask for a repayment plan with interest and charges frozen; split the money left after essentials across lenders in proportion to balances; explain how to manage automatic card or bank collections (ask the lender to stop, and where rules allow, cancel the payment authority with the bank) while warning that stopping a payment does not cancel the debt; and stop new borrowing.
4. Write a short message to send each lender asking for a repayment plan, freezing of interest and charges, and confirmation in writing.
5. Bridge the next gap without a new loan: cheaper options to check (hardship funds, employer advance, credit union, payment plans on bills), marked to verify locally.
6. Point to free, non-profit debt advice, and mention that if loans seemed unaffordable when granted, an adviser can say whether a complaint is possible locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest another payday loan, a loan from an unlicensed lender or a loan shark.
- Do not invent caps, cooling-off rights or complaint routes; name a rule only if confident and mark it to verify.
- Do not name lenders or paid debt firms.
- Calm, practical, no shame.
{{> guardrails/crisis-safety}}
- If the person mentions threats, illegal lending or intimidation, say this may be illegal lending, to put their safety first and to contact the police or a local illegal-lending reporting service.
</constraints>

<output_format>
## Essentials first
## What the cycle costs
Table: Loan | Borrowed | Repaid so far | Still due.
## The way out
Numbered, with a split table.
## Messages to lenders
## Bridge the next gap
## Free help
</output_format>
