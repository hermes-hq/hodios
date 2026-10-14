---
schema: 1
id: evaluate-debt-consolidation
kind: prompt
title: Evaluate debt consolidation
description: Checks whether consolidating debts with a loan or balance transfer would actually save money, comparing total cost and payoff date against the current debts, with the catches and the behaviour risk.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [table, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [consolidation-loan, balance-transfer, total-cost, apr]
pairs_with:
  prompts: [plan-debt-payoff, compare-loan-offers, improve-credit-score]
  personas: [personal-finance-coach]
args:
  - name: current_debts
    description: Each debt you would consolidate - type, balance, interest rate, monthly payment, any early repayment fee. Leave out account numbers.
    type: text
    required: true
  - name: offer
    description: The consolidation option you are looking at - loan amount, APR, term, fees, or a balance transfer's promotional rate, length, transfer fee and the rate afterwards.
    type: text
    required: true
  - name: country
    description: Country, because loan rules, fees and protections differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Short answer, Side by side, The catches, Behaviour check, Questions to ask the lender, Free help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide whether to consolidate debts. Consolidation replaces several debts with one, through a loan or a balance transfer card. It helps only when the total cost falls and the person does not borrow again on the cleared cards. The common traps: a lower monthly payment that comes from a much longer term and costs more overall; arrangement or transfer fees that eat the saving; a promotional rate that ends before the balance is cleared; turning unsecured debt into debt secured on the home; and cleared credit cards filling back up within a year. Debt-relief companies often advertise "consolidation" when they mean something else, such as a debt management plan with fees.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Current debts:

<debts>
{{current_debts}}
</debts>

Consolidation option:

<offer>
{{offer}}
</offer>

1. If figures needed to compare are missing (rates, terms, fees), ask for them, and say which ones change the answer most.
2. Compare side by side: monthly payment, months to clear, total interest and fees, and total paid, for (a) keeping the current debts with the same total monthly payment and (b) the consolidation option. Show the arithmetic, marking estimates where you approximated amortisation.
3. For a balance transfer, calculate the monthly payment needed to clear the balance inside the promotional period, and the cost if it is not cleared.
4. Explain the catches that apply: longer term, fees, rate after the promotion, early repayment charges on current debts, secured versus unsecured, and credit file effects of applying.
5. Behaviour check: ask whether the cleared cards will be closed, reduced or kept, and how new spending will be prevented; explain why this decides whether consolidation works.
6. List questions to ask the lender before signing.
7. If the person is already missing payments or cannot meet minimums, say consolidation borrowing may not be suitable and point to free, non-profit debt advice first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend specific lenders, cards or debt companies.
- Never suggest securing unsecured debts against a home without a clear warning that the home could be at risk.
- Use only the rates and figures given; label any assumption.
- Round to whole currency units and keep the comparison on the same monthly budget so it is fair.
</constraints>

<output_format>
## Short answer
Two or three sentences: likely saves, likely costs more, or depends on behaviour.
## Side by side
Table: Option | Monthly | Months | Interest and fees | Total paid.
## The catches
## Behaviour check
## Questions to ask the lender
## Free help
</output_format>
