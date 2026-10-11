---
schema: 1
id: evaluate-revenue-based-financing
kind: prompt
title: Evaluate a revenue-based financing offer
description: Turns a revenue-based financing offer's flat fee and repayment share into an effective annual cost under slow, base and fast growth, and checks the effect on monthly cash.
category: fundraising
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, financial-analyst]
advice_risk: [financial]
inputs: [document, dataset]
output: [table, explanation, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [revenue-based-financing, non-dilutive, cost-of-capital, cash-flow, repayment-cap]
pairs_with:
  prompts: [evaluate-venture-debt-offer, choose-funding-instrument, forecast-cash-flow]
args:
  - name: offer
    description: The offer - advance amount, flat fee or repayment cap (for example 1.08x), share of revenue taken, any minimum payment, term limits, fees and covenants.
    type: text
    required: true
  - name: revenue
    description: Monthly revenue for the last 6-12 months, gross margin, and what the money will be spent on (for example inventory or ad spend) with the return you expect.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The offer in plain words, Repayment under three scenarios, Effective annual cost, Cash flow strain, Does the use of funds pay back, Questions to ask the provider]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders evaluate revenue-based financing, where a provider advances cash and is repaid by a fixed share of revenue until a fixed total (the advance times a cap multiple) is paid. The flat fee looks small, but because it does not depend on time, the effective annual cost rises sharply when revenue grows fast and repayment ends early. Minimum monthly payments turn it into fixed debt when revenue drops. It fits businesses with high gross margins and spending that pays back quickly, such as ad spend or inventory with a known turnover; it is a poor fit for funding long-term product work or covering losses.
</context>

<task>
Evaluate this offer.

<offer>
{{offer}}
</offer>

<revenue>
{{revenue}}
</revenue>

1. The offer in plain words: advance, total repayable, revenue share, minimums, fees, covenants, and anything not stated.
2. Repayment under three scenarios built from the revenue history: slow (flat revenue), base (recent trend continues) and fast (trend doubles). For each, months to repay, monthly payment path, and total paid.
3. Effective annual cost per scenario: the internal rate of return on the cash flows (advance in, payments out), annualised. Show the method and say the result is approximate.
4. Cash flow strain: payment as a share of gross profit each month in the slow scenario, and the effect of any minimum payment if revenue falls 30%.
5. Does the use of funds pay back: compare the expected return on what the money buys with the cost, using the user's numbers, and say what evidence would support that return.
6. Questions to ask the provider.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the offer's terms and the revenue history. Label scenario assumptions.
- Show formulas and the month-by-month logic; do not hide the annualisation.
- Do not compare against "market" pricing or recommend providers.
- Do not tell the founder to accept or decline; set out cost, risk and fit.
- Accounting and tax treatment of the advance varies by country; refer to an accountant.
</constraints>

<output_format>
## The offer in plain words
## Repayment under three scenarios
Table: Scenario | Monthly revenue path | Months to repay | Total paid.
## Effective annual cost
## Cash flow strain
## Does the use of funds pay back
## Questions to ask the provider
</output_format>
