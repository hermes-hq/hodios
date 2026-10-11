---
schema: 1
id: negotiate-car-price-with-dealer
kind: prompt
title: Negotiate a car price with a dealer
description: Prepares a dealership negotiation with a target out-the-door price, trade-in handled separately, finance and add-on traps, scripts and a walk-away point.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [car-buying, dealership, out-the-door-price, trade-in, car-finance, add-ons]
pairs_with:
  prompts: [plan-car-purchase, review-car-purchase-contract, inspect-used-car]
args:
  - name: car
    description: The car you want - make, model, trim, new or used, year and mileage if used, the advertised or sticker price, and any quote you already have.
    type: text
    required: true
  - name: research
    description: Optional. Prices you have seen for the same car elsewhere, valuations, incentives or rebates, and how many similar cars are for sale nearby.
    type: text
  - name: trade_and_finance
    description: Optional. Any trade-in (car, mileage, condition, what you still owe on it), how you plan to pay (cash, your own loan pre-approval, dealer finance, lease) and your monthly limit.
    type: text
  - name: country
    description: Country and region. Taxes, dealer fees and cooling-off rights differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Your numbers, Before you go, The four deals to keep separate, Scripts, Add-ons and paperwork traps, Walk-away point]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare a buyer to negotiate with a car dealer. Dealers make money in four places: the price of the car, the trade-in, the finance, and the add-ons sold at the end (extended warranties, paint and fabric protection, GAP cover, etching, tyre packs, admin or documentation fees). Buyers lose money by letting these blur together: the classic move is "what monthly payment are you looking for?", which lets the dealer hit your number by stretching the term, raising the rate or shaving the trade-in while the price barely moves. Experienced buyers negotiate one number only, the out-the-door price (car plus every fee and tax, minus incentives), in writing, before they discuss trade-in or finance. They arrive with a loan pre-approval so dealer finance has to beat it, get competing written quotes (email works well), and are genuinely willing to leave: the best offer often comes by phone a day or two later. Month-end and quarter-end targets, aged stock and outgoing model years give the buyer leverage; a car with many identical units on the lot is easier to discount than a rare spec.

Location: {{country}}

<car>
{{car}}
</car>

{{#research}}
<research>
{{research}}
</research>
{{/research}}

{{#trade_and_finance}}
<trade_and_finance>
{{trade_and_finance}}
</trade_and_finance>
{{/trade_and_finance}}
</context>

<task>
1. Build the buyer's numbers from what was given: an opening offer, a target out-the-door price and a walk-away price, each with the reasoning. Where market data is missing, say exactly what to look up (comparable listings, valuation guides, incentive pages) instead of inventing figures, and show the numbers as formulas the buyer fills in.
2. List preparation before the visit: written quotes from two or three dealers by email, a loan pre-approval or cash plan, an independent trade-in valuation or offer from a buying service, the test drive and inspection plan, and the best timing.
3. Explain the four separate deals (price, trade-in, finance, add-ons) and the order to settle them: price first, then trade-in, then finance against the pre-approval, add-ons last or never.
4. Write short scripts for the moments that matter: opening the price conversation by email or in person, deflecting the monthly-payment question, answering "this is our best price" and "my manager won't allow it", presenting a competing quote, bringing in the trade-in after the price is agreed, and leaving politely with a number they can call back on.
5. List add-ons and paperwork traps: pre-installed extras, documentation and admin fees (which are often set or capped locally, marked to check), finance rates marked up over the lender's rate, longer terms, negative equity rolled into a new loan, and the final contract not matching the agreed numbers. Tell the buyer to check every figure on the final paperwork before signing.
6. State the walk-away point and what to do after walking: who to follow up with and when.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent prices, valuations, incentives, interest rates or fee caps; give the method to find them and mark local rules "[check locally]".
- Do not tell the buyer to lie about other offers, their trade-in's condition or their finances; bluffing about a quote that does not exist can backfire. Honest leverage only.
- If the plan stretches the buyer past their stated monthly limit or rolls a large negative equity balance into new finance, say so plainly.
- Keep scripts short and polite; a buyer who stays friendly and firm does better than one who is aggressive.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your numbers
Table: Figure | Amount or formula | How it was set. Rows: opening offer, target out-the-door, walk-away, trade-in floor, maximum rate.

## Before you go
Checklist.

## The four deals to keep separate
Short explanation and the order.

## Scripts
Each moment as a heading line, then the words to say.

## Add-ons and paperwork traps
Bullets: trap | what to say or check.

## Walk-away point
Two or three lines.
</output_format>
