---
schema: 1
id: calculate-discount-break-even
kind: prompt
title: Calculate what a discount really costs
description: Works out what a requested discount costs in margin and lifetime value, what volume, term or payment change would make it worth giving, and drafts the counter-offer.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, manager, financial-analyst]
requires: [none]
inputs: [notes, text]
output: [table, report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [discounting, margin, deal-economics, counter-offer, pricing-discipline]
pairs_with:
  prompts: [prepare-deal-negotiation, design-pricing]
  personas: [deal-desk-analyst]
args:
  - name: deal
    description: The product or service, list price and quantity, contract length, billing and payment terms, the discount requested, and who asked and why if known.
    type: text
    required: true
  - name: costs
    description: What you know about your costs - gross margin percentage or cost per unit, delivery or onboarding cost, commission rate, and typical renewal or repeat rate. Give what you have; approximate is fine if labelled.
    type: text
    required: true
  - name: options
    description: Things you could ask for in return (longer term, more volume, upfront or annual payment, case study, faster signature, smaller scope) and any discount approval limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The ask in numbers, What it costs you, Break-even trades, Counter-offer, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help sellers see what a discount really costs before they agree to it. A discount comes straight out of profit, not revenue: on a 40% gross margin, 10% off the price removes a quarter of the gross profit, and to earn the same profit you would need to sell about a third more volume. Discounts also carry forward, because renewals and future price rises start from the discounted price, and they set a precedent with that customer and anyone they talk to. Costs that do not shrink with price, such as onboarding and support, take a larger share of what is left. Finance-minded sellers therefore trade discounts for things that are worth more than they cost: a longer committed term, annual upfront payment (cash and lower churn risk), more volume, a reference or case study, or a smaller scope.
</context>

<task>
<deal>
{{deal}}
</deal>

<costs>
{{costs}}
</costs>

{{#options}}<options>
{{options}}
</options>{{/options}}

1. **The ask in numbers:** list price, requested price, discount in money and percent per period and over the full term.
2. **What it costs you:** gross profit at list and at the requested price, the drop in gross profit as a percentage, the extra volume needed to keep the same gross profit, and the effect on renewal value if the discount carries into renewals. Include commission if given.
3. **Break-even trades:** for each available trade, calculate what it is worth (for example, the value of cash paid upfront, extra years of committed revenue, added volume) and how much discount it would justify. Show the formula and arithmetic for each so it can be checked.
4. **Counter-offer:** recommend a counter (a smaller discount tied to specific trades, a first-year-only ramp, or holding price with added value), with the reason, and draft a short reply to the buyer using "if you can..., we can..." language.
5. **Assumptions:** list every assumption and the number most sensitive to being wrong.
</task>

<constraints>
- Show every calculation step with the numbers used; do not round until the end, and state units and currency.
- Use only the figures given. If margin or cost is missing, say the result depends on it and show the calculation for a stated assumed range, clearly labelled as assumed.
- Do not recommend going below the user's approval limits or misrepresenting approvals to the buyer.
- No fake deadlines or invented competing offers in the reply.
- If the numbers are inconsistent (for example, the discount is larger than the price), point it out and ask before calculating.
</constraints>

<output_format>
## The ask in numbers
Table: Item | Per period | Full term.

## What it costs you
Table with gross profit at list and requested price, change, and volume needed, followed by the arithmetic.

## Break-even trades
Table: Trade | Worth to you | Discount it justifies | Working.

## Counter-offer
Recommendation in two or three sentences, then the reply to the buyer.

## Assumptions
Bullets, with the most sensitive one marked.
</output_format>
