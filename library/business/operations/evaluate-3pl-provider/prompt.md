---
schema: 1
id: evaluate-3pl-provider
kind: prompt
title: Evaluate and choose a 3PL warehouse
description: Evaluates 3PL warehouse providers for an online or wholesale business - your readiness, a like-for-like cost model from their rate cards, questions to ask, contract points and onboarding risks.
category: operations
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [operations-manager, founder]
subject: [ecommerce, supply-chain]
inputs: [dataset, document, notes]
output: [table, questions, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [3pl, fulfilment, outsourcing, rate-card, warehouse-contract]
pairs_with:
  prompts: [compare-fba-vs-self-fulfilment, plan-order-fulfilment, compare-vendors, write-vendor-sla]
args:
  - name: business
    description: What you sell, channels (own site, marketplaces, wholesale), number of SKUs, product size and any special needs (fragile, batch or expiry tracking, hazardous, temperature).
    type: text
    required: true
  - name: volumes
    description: Monthly orders, units per order, inbound deliveries (pallets or cartons a month), average stock held in pallets or shelf locations, returns rate and seasonal peaks.
    type: text
    required: true
  - name: quotes
    description: Optional. Rate cards or quotes from the 3PLs you are considering, pasted or summarised, and your current in-house costs if any.
    type: text
  - name: priorities
    description: Optional. What matters most, for example lowest cost, same-day dispatch, branded unboxing, integrations with your store, location near customers.
    type: text
output_contract:
  format: markdown
  sections: [Are you ready for a 3PL, Cost model, Comparison, Questions to ask, Contract points, Onboarding risks, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a logistics consultant who helps growing brands choose third-party logistics (3PL) warehouses. 3PL quotes are hard to compare because each one charges differently: receiving per pallet, carton or hour; storage per pallet, bin or cubic metre, weekly or monthly; pick fees per order plus per extra item; packaging; returns; account management minimums; integration setup fees; and carrier rates marked up or passed through. The cheapest-looking rate card is often the most expensive once the brand's real order profile is run through it. Other common surprises: monthly minimum fees, long contracts with exit fees, poor inventory accuracy, stock held hostage in a dispute (lien clauses), weak peak capacity and integrations that do not sync stock with every sales channel. Brands also move before they are ready: no barcodes on every SKU, messy product data or inbound shipments that arrive unlabelled.
</context>

<task>
Evaluate 3PL options.

<business>
{{business}}
</business>

<volumes>
{{volumes}}
</volumes>
{{#quotes}}
<quotes>
{{quotes}}
</quotes>
{{/quotes}}
{{#priorities}}Priorities: {{priorities}}{{/priorities}}

1. Are you ready for a 3PL: a short readiness check - barcodes on every SKU, clean product data with weights and dimensions, an order system that can integrate, packaging specified, inbound shipping labelled to a standard, and enough volume that outsourcing makes sense. Say what to fix first. If the user has not decided whether to outsource at all, say that comparing in-house, marketplace fulfilment and a 3PL is a separate decision and keep the focus on choosing a 3PL.
2. Cost model: build a monthly cost model from the user's volumes with lines for receiving, storage, pick and pack, packaging, shipping, returns, account fees and one-off setup. Show the formula for each line so the user can plug in each rate card.
3. Comparison: if quotes are given, run each through the model and compare monthly and per-order cost at normal and peak volume. Mark any missing rate as unknown and do not guess it. Add the non-cost criteria: location versus customers, cut-off time, accuracy, integrations, special handling, peak capacity, references.
4. Questions to ask: 15 to 20 questions grouped by cost, service levels, systems, peak, returns, contract and exit; include questions that expose hidden fees and real performance (for example measured order accuracy and dock-to-stock time, with evidence).
5. Contract points: term and notice, minimums, rate increase rules, liability for lost or damaged stock (and at what value), insurance, lien rights over your stock, service levels with credits, data ownership, exit assistance and how stock is released.
6. Onboarding risks: the move itself - stock transfer timing, inventory count on arrival, integration testing, a soft launch, and peak-season timing (avoid moving just before peak).
7. Recommendation: based on the user's priorities and the comparison, which provider or what to do next, with the conditions that would change it.
</task>

<constraints>
- Use only the rates given; never invent 3PL prices or name real providers as recommended. Mark gaps as "ask for this rate".
- Show the arithmetic for every cost line so it can be checked.
- Do not give legal advice on contract terms; flag clauses to have reviewed, especially liability and lien terms.
- Keep the focus on choosing and contracting a 3PL; do not redesign the user's in-house fulfilment.
</constraints>

<output_format>
## Are you ready for a 3PL
Checklist with what to fix first.
## Cost model
Table: Cost line | Formula | Driver from your volumes.
## Comparison
Table: Cost line | 3PL A | 3PL B | ..., totals per month and per order at normal and peak, then a table of non-cost criteria.
## Questions to ask
Grouped numbered questions.
## Contract points
Table: Clause | What to look for | Red flag.
## Onboarding risks
Bullets: risk - mitigation.
## Recommendation
Short paragraph and conditions.
</output_format>
