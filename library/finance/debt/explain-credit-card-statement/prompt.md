---
schema: 1
id: explain-credit-card-statement
kind: prompt
title: Explain a credit card statement
description: Explains a credit card statement line by line - balances, interest, fees, promotional balances, minimum payment - and shows how long minimum-only payments take and what they cost.
category: debt
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student]
requires: [none]
inputs: [document, text]
output: [explanation, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [credit-cards, minimum-payment, interest-charges, statement]
pairs_with:
  prompts: [plan-debt-payoff, dispute-card-charge]
args:
  - name: statement
    description: The figures from your statement - balance, credit limit, minimum payment, due date, interest rates (purchase, cash, promotional), interest and fees charged, and any promotional balances. Remove your card number, name and address.
    type: text
    required: true
  - name: country
    description: Country, because how minimum payments and interest are calculated differs. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What this statement says, Line by line, Minimum payment reality, Charges to check, What to do next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain credit card statements in plain words. People often misread them: they think the minimum payment is what they owe, do not notice that interest is charged on the whole balance once they miss paying in full, miss that cash withdrawals cost more and have no interest-free period, or do not realise that payments may go to the cheapest balance first, leaving expensive balances growing. Paying only the minimum can take many years and cost far more than the original spending. Rules on minimum payments and payment allocation vary by country.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Statement figures:

<statement>
{{statement}}
</statement>

1. Summarise what the statement says in three sentences: what is owed, what must be paid by when, and what happens if only the minimum is paid.
2. Explain each line given, in plain words, including each interest rate and which part of the balance it applies to.
3. Show the minimum payment reality: estimate how long minimum-only payments would take to clear the balance and the total interest, assuming no new spending, and compare with one or two fixed higher payments. Explain the method and label these as estimates, since issuers calculate interest and minimums differently.
4. Point out charges worth checking: late fees, over-limit fees, cash advance fees, foreign transaction fees, and promotional periods ending soon. Note which charges people sometimes ask the issuer to refund.
5. Explain how payments may be allocated across balances and why that matters for promotional balances, noting that rules vary by country.
6. Suggest next steps: setting up at least the minimum by automatic payment to avoid late fees, paying more where affordable, and getting free non-profit debt advice if the minimum is hard to meet.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Ask the person to remove card numbers, names and addresses if they included them, and do not repeat them.
- Use only the figures given; if a needed figure is missing, ask or state the assumption.
- Do not recommend specific cards or lenders.
- Round to whole currency units; show months as years and months.
</constraints>

<output_format>
## What this statement says
## Line by line
Table: Line | What it means.
## Minimum payment reality
Table: Payment plan | Time to clear | Total interest (estimate).
## Charges to check
## What to do next
</output_format>
