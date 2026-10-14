---
schema: 1
id: decide-on-remortgage
kind: prompt
title: Decide how to switch your mortgage when a deal ends
description: Compares staying on the lender's follow-on rate, a product transfer with the same lender or a remortgage elsewhere, with total cost over the deal, fees, breakeven and timing.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [refinance, product-transfer, mortgage, interest-rates, fixed-rate-ending]
pairs_with:
  prompts: [compare-mortgage-options, compare-mortgage-overpay-vs-invest, prepare-mortgage-application, stress-test-budget]
  personas: [personal-finance-coach]
args:
  - name: mortgage
    description: Current mortgage - balance, remaining term, current rate and when the deal ends, the rate it reverts to, monthly payment, any early repayment charge and the rough property value.
    type: text
    required: true
  - name: offers
    description: Offers or quotes you have - rate, deal length, product fee, valuation and legal costs, cashback, whether fees are added to the loan. Optional; without them the prompt explains what to collect.
    type: text
  - name: situation
    description: Anything that affects lending or the choice - income or job changes, plans to move or overpay, wanting to borrow more or cut the term, credit problems. Optional.
    type: text
  - name: country
    description: Country, because product types, fees, rules for switching and how rates are fixed differ widely.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, The options, Cost over the deal, Timing and steps, Questions for the lender or broker, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeowners decide what to do when a mortgage deal ends or rates move. The common mistakes are drifting onto the lender's standard or reversion rate, which is often much higher, and comparing headline rates while ignoring fees. The fair comparison is the total cost over the deal period: interest plus product, arrangement, valuation and legal fees, minus cashback, and the balance left at the end. A low rate with a large fee often loses on a small loan, and adding a fee to the loan means paying interest on it. A product transfer with the existing lender usually needs no new affordability check or valuation and is quick, which matters if income has fallen or credit has worsened; a full remortgage elsewhere may offer a better rate or let you borrow more, but needs underwriting, takes weeks and has legal costs. Many lenders let you secure a new deal some months before the current one ends. In many countries breaking a fixed deal early triggers an early repayment charge, so switching mid-deal only pays if the saving exceeds that charge. In some countries refinancing works differently (closing costs, points, rate locks), and the same logic of total cost and breakeven applies.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Current mortgage:

<mortgage>
{{mortgage}}
</mortgage>
{{#offers}}

Offers or quotes:

<offers>
{{offers}}
</offers>
{{/offers}}
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. Summarise where the person stands: when the deal ends, the reversion rate and what the payment becomes if they do nothing, any early repayment charge and the rough loan-to-value, since a lower loan-to-value band can unlock better rates.
2. Lay out the options that apply: stay on the follow-on rate, product transfer, remortgage elsewhere, and if relevant switching now and paying the charge. For each, note what it needs (affordability check, valuation, legal work) and who it suits.
3. For each offer, calculate the total cost over the deal period: monthly payment, total payments, fees (paid upfront or added to the loan), cashback, and balance at the end. Show the arithmetic with a standard repayment formula and round sensibly. If no offers are given, show the do-nothing cost and list exactly what to collect.
4. Give the fee breakeven: the loan size or months at which a lower-rate, higher-fee deal beats a no-fee deal. If switching early, compare the saving with the early repayment charge.
5. Cover fixed versus variable and deal length briefly in light of the person's plans (moving, overpaying, needing flexibility), without predicting rates.
6. Give a timeline: when to start, when an offer can usually be secured, and how to keep watching for a better rate before completion.
7. List questions for the lender or a broker, and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict interest rates. If you show rate changes, label them as stress tests.
- Never invent rates, fees or lender rules. Use the person's figures; mark any typical figure you add as "verify".
- Do not recommend a lender or product; show the costs and the deciding factors.
- If income has fallen or credit has worsened, point out that a product transfer may avoid a fresh affordability check, and that this is something to confirm with the lender.
- If the person wants to borrow more, note that it changes the comparison and may need full underwriting.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Short bullets including the do-nothing payment.

## The options
Table: option | what it needs | suits | watch out for.

## Cost over the deal
Table: offer | monthly | fees | total cost over the deal | balance at end, then the breakeven note.

## Timing and steps
Numbered steps with rough timings.

## Questions for the lender or broker
Bullets.

## Assumptions
Bullets.
</output_format>
