---
schema: 1
id: price-services
kind: prompt
title: Price your services
description: Prices services as hourly, day rate, project, retainer or value-based from costs, income target, utilisation and market anchors, with a quote template. For freelancers and agencies.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, consultant, designer]
inputs: [text]
output: [table, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [day-rate, retainers, value-based-pricing, utilisation, quotes, price-increase]
pairs_with:
  prompts: [design-pricing, start-freelance-business, model-unit-economics]
  personas: [small-business-advisor]
args:
  - name: service
    description: What you deliver, for which clients, how long typical jobs take, and the result the client gets (for example "brand identity for restaurants, about 25 hours, used for 5+ years").
    type: text
    required: true
  - name: costs_and_income_target
    description: Your yearly or monthly business costs (software, insurance, rent, equipment), what you want to earn before tax, holidays, and for agencies team salaries and overheads.
    type: text
    required: true
  - name: market_rates
    description: What you know about rates - what you charge now, quotes clients mentioned, what peers or competitors charge. Leave empty if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Floor rate, Pricing models compared, Recommended prices, Quote template, Raising prices, Assumptions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help freelancers and small agencies set prices they can live on and defend. Most underprice because they divide a salary by 2,000 hours, forget that only part of their time is billable, and anchor on the cheapest rates they see. You build the price from the floor up (costs and income), then position it against the market and the value delivered, and you choose a pricing model that rewards efficiency rather than punishing it.
</context>

<task>
Price this service.

<service>
{{service}}
</service>

<costs_and_income_target>
{{costs_and_income_target}}
</costs_and_income_target>
{{#market_rates}}
<market_rates>
{{market_rates}}
</market_rates>
{{/market_rates}}

1. Floor rate: compute the minimum sustainable rate step by step.
   - Establish whether the income target is before or after tax. If it is take-home pay, gross it up: target / (1 - combined tax and social-contribution rate), with the rate as an assumption the user must confirm. If it is already before tax, do not add tax again. If the input does not say, ask, and meanwhile show both versions labelled.
   - Add what an employer used to pay for and the user now must: pension contributions, health or income-protection insurance, equipment and training, as business costs.
   - Pre-tax income plus business costs equals the revenue needed.
   - Working days per year minus holidays, public holidays, sick days and training gives available days. Billable utilisation is usually 50-70% for solo freelancers (sales, admin and gaps take the rest) and should be stated as an assumption; for agencies use the team's real billable hours.
   - Revenue needed divided by billable days and by billable hours gives the floor day rate and hourly rate.
2. Market anchors: compare the floor with the market rates given. If none were given, explain how to find them (peer communities, published rate surveys, asking prospects their budget, lost-deal feedback) and do not invent figures.
3. Value: estimate what the result is worth to the client in their terms (revenue gained, cost saved, risk avoided, time saved), using only the service description, with the reasoning and an explicit confidence. Value-based prices typically capture a fraction of the value created; show the range.
4. Compare models for this service: hourly, day rate, fixed project, retainer and value-based. For each, note when it fits, the risk to the seller and the buyer, and how scope creep is handled.
5. Recommend prices: a primary model and prices for two or three packages (for example good, better, best), each with scope, deliverables, revisions, timeline and price, all at or above the floor. Include the rate for out-of-scope work.
6. Quote template: a short quote the user can send, with the client's problem restated, the options, what is included and excluded, payment terms (deposit, milestones), validity date and next step.
7. Raising prices: when and how to raise rates for new and existing clients, notice period, wording for the message, and how to handle pushback.
</task>

<constraints>
- Show every calculation with the numbers used so the user can redo it. State currency and whether figures are before tax.
- Never recommend prices below the floor without saying it loses money and why it might still be a deliberate, time-limited choice.
- Do not invent market rates or client budgets. Mark any figure that is not from the input as an assumption.
- Tax and social-contribution rates vary by country and status; tell the user to confirm the percentage with an accountant.
</constraints>

<output_format>
## Floor rate
Step-by-step calculation, then: Floor day rate | Floor hourly rate.
## Pricing models compared
Table: Model | Fits when | Seller risk | Buyer risk | Scope creep handling.
## Recommended prices
Table: Package | Scope | Deliverables | Timeline | Price. Then the out-of-scope rate.
## Quote template
Ready to copy, with [placeholders].
## Raising prices
Steps and a sample message.
## Assumptions to check
Checklist.
</output_format>
