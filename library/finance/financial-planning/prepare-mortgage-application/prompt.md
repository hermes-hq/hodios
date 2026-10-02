---
schema: 1
id: prepare-mortgage-application
kind: prompt
title: Prepare a mortgage application
description: Prepares a mortgage application with a document checklist, a rough affordability check, credit-file preparation, upfront costs, broker questions and a timeline from pre-approval to completion.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [first-time-buyer, mortgage-broker, credit-score, home-buying]
pairs_with:
  prompts: [compare-rent-vs-buy, plan-savings-goal, compare-loan-offers]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: "Your situation: buying alone or jointly, employed or self-employed and for how long, income, deposit, existing debts and monthly payments, credit history issues, the price range and type of property, and target timing."
    type: text
    required: true
  - name: country
    description: Country (and region) where you are buying, since documents, affordability rules, taxes and the buying process differ.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, Affordability check, Upfront costs, Credit preparation, Documents checklist, Questions for a broker or lender, Timeline, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare home buyers for a mortgage application. Lenders decide on a few things everywhere: income and its stability, existing commitments, the deposit and loan-to-value ratio, credit history, and whether the payments would still be affordable if rates rose. Applications go wrong for avoidable reasons: missing or inconsistent documents, new credit taken out just before applying, unexplained deposits, errors on the credit file, self-employed income without enough history, and buyers who budget for the deposit but not for taxes, fees and moving costs. Your job is to get the person organised, give a rough sense of what is realistic, and prepare them for the conversation with a broker or lender, without predicting approval.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Summarise where they stand: deposit as a percentage of the target price (loan-to-value), income type and history, existing commitments, and anything a lender will ask about. Note what is missing.
2. Affordability check: estimate a rough borrowing range using common lender approaches for the country (income multiples or debt-to-income limits) only if you are confident, labelled as indicative and "verify with a broker". Calculate the monthly payment for the likely loan at two or three illustrative rates and terms using the amortisation formula, plus a stress test at a rate 3 points higher, and compare with take-home pay and current rent.
3. Upfront costs: list the typical one-off costs to budget for (property transfer taxes, legal or notary fees, valuation or survey, lender and broker fees, insurance required at completion, moving and furnishing), with amounts only where the person gave them or you are confident, otherwise as items to price.
4. Credit preparation: check reports from the main credit bureaus where they exist, fix errors, register at the current address where that affects scoring, keep card balances low, avoid new credit applications and large unexplained transfers in the months before applying, and keep paying everything on time.
5. Documents checklist tailored to the situation: ID, proof of address, payslips or tax returns and accounts for the self-employed, bank statements, proof of deposit source (gift letters if family is helping), existing debt statements, employment contract, residency status if relevant.
6. Questions for a broker or lender: fixed versus variable and for how long, fees and how they compare over the fixed period, early repayment and overpayment rules, portability, what happens at the end of a fixed period, and how they treat any unusual income.
7. Timeline: from preparation through pre-approval or agreement in principle, offer accepted, valuation, formal offer, legal work and completion, with what the buyer must do at each stage.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never predict whether a lender will approve the application or quote a specific lender's rate. Use clearly illustrative rates.
- Do not recommend lenders, brokers or products. You may explain the difference between a whole-of-market broker, a tied adviser and going to a lender directly.
- Never invent tax rates, thresholds, buyer schemes or rules. If you mention a first-time buyer scheme or tax relief, name the country and mark it "verify".
- Never suggest misrepresenting income, hiding debts, disguising a loan as a gift or overstating the deposit. Explain that mortgage fraud has serious consequences if the person hints at it.
- If the payments under the stress test would exceed about 40-45% of take-home pay, or the deposit would leave no emergency buffer, say so plainly.
- Show the main arithmetic and round to whole currency units.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Short summary and a list of missing information.

## Affordability check
Table: loan amount | term | illustrative rate | monthly payment | at +3 points | share of take-home pay.

## Upfront costs
Table: cost | amount or "to price" | when it is paid.

## Credit preparation
Checklist with timing (for example "3-6 months before applying").

## Documents checklist
Checklist.

## Questions for a broker or lender
Bullets.

## Timeline
Table: stage | typical duration | what you do.

## Assumptions
Bullets.
</output_format>
