---
schema: 1
id: map-small-business-insurance-needs
kind: prompt
title: Map a small business's insurance needs
description: Maps what insurance a small business or sole trader needs - compulsory, contract-required and worth considering - from what it does, with gaps in current cover and questions for a broker.
category: insurance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, individual, operations-manager]
requires: [none]
inputs: [text, document]
output: [table, report, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [public-liability, professional-indemnity, employers-liability, business-interruption, cyber-cover]
pairs_with:
  prompts: [plan-business-continuity, check-business-licences, plan-service-business-launch]
args:
  - name: business
    description: "What the business does and how: services or products, where work happens (own premises, clients' homes, online), staff or subcontractors, vehicles, equipment and stock values, customer data held, turnover band, and country."
    type: text
    required: true
  - name: current_cover
    description: Policies already held with limits and excesses, and anything clients, landlords or platforms require in contracts (for example "public liability of at least 5 million").
    type: text
output_contract:
  format: markdown
  sections: [Summary, Risk map, Cover to consider, Likely compulsory or contract-required, Gaps in current cover, Questions for a broker, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small businesses tend to buy whatever a comparison site bundles and miss the cover that matches how they actually work. A broker starts from the risks: injuring someone or damaging their property (public or general liability), harm caused by advice or a mistake in professional work (professional indemnity or errors and omissions), harm caused by a product sold (product liability), injury to staff (employers' liability or workers' compensation, which many countries make compulsory once you employ anyone), loss of premises, stock and equipment, the income lost while the business cannot trade (business interruption, where the indemnity period should match how long recovery really takes), data breaches and cyber attacks, vehicles used for work (personal car policies often exclude business use), goods in transit, and the loss of a key person. Contracts often set minimum limits, and personal home and car policies usually exclude business activity. Requirements differ by country and trade.

<business>
{{business}}
</business>
</context>

<task>
{{#current_cover}}
<current_cover>
{{current_cover}}
</current_cover>
{{/current_cover}}

1. Build a risk map for this business: each realistic way it could lose money or face a claim, with a short example from its own work.
2. Cover to consider for each risk: the type of cover, what it typically responds to, and the points that matter when buying (limit of indemnity, excess, basis such as claims-made versus occurrence for professional indemnity and the need for run-off cover after stopping, indemnity period for business interruption, sums insured for stock and equipment).
3. Likely compulsory or contract-required: cover that is commonly compulsory in the person's country (for example employers' liability or workers' compensation, motor cover for work vehicles) stated as something to confirm, and any minimums named in their contracts.
4. Gaps in current cover: compare current cover with the map; flag missing cover, limits below contract requirements, personal policies used for business activity, and subcontractor cover the business should ask to see.
5. Questions for a broker and documents to bring (turnover, contracts, claims history, staff numbers, asset list).
6. Summary: the two or three most important gaps first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what the law requires as fact for the person's country; name what is commonly compulsory and say to confirm with a broker, regulator or trade body.
- Do not recommend insurers, products or exact limits; say how a limit is usually chosen (contract minimums, worst realistic claim).
- Do not overload a micro business with every possible cover; rank by how likely and how severe the risk is for this business.
- Point out when a personal home or car policy is likely to exclude the business use described.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The most important gaps and priorities in three or four sentences.

## Risk map
Table: risk | example from this business | likelihood | severity.

## Cover to consider
Table: cover | responds to | key buying points | priority.

## Likely compulsory or contract-required
Bullets, each marked "to confirm".

## Gaps in current cover
Bullets.

## Questions for a broker
Numbered, then documents to bring.

## Assumptions
Bullets.
</output_format>
