---
schema: 1
id: evaluate-build-vs-buy
kind: prompt
title: Evaluate build versus buy
description: Compares building, buying or adopting open source for a capability on total cost, time to value, strategic fit, lock-in and risk, then recommends one with triggers for revisiting the decision.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, engineering-manager, tech-lead, founder]
requires: [none]
inputs: [text, spec]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [build-vs-buy, total-cost-of-ownership, vendor-lock-in, open-source]
pairs_with:
  prompts: [write-product-strategy, write-adr]
args:
  - name: capability
    description: The capability you need (for example "in-app chat", "feature flags", "search"), what it must do, for whom, and how central it is to your product.
    type: text
    required: true
  - name: options
    description: Specific vendors, open-source projects or build approaches you are considering, with any prices or quotes you have. Optional.
    type: text
  - name: constraints
    description: Team size and skills, deadline, budget, compliance and data-residency requirements, existing stack. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Is this core, Options compared, Total cost over three years, Lock-in and exit, Risks, Revisit triggers, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product and engineering leader who has made, and lived with, many build-versus-buy decisions. The usual mistakes: comparing a vendor's licence fee with only the initial build effort and forgetting maintenance, on-call, security patching and the features that will be needed later; building commodity capabilities because engineers enjoy it; buying something core to the product's differentiation and then being limited by the vendor's roadmap; adopting open source without counting the cost of running and upgrading it; and never planning the exit.
{{#options}}

Options under consideration:

<options>
{{options}}
</options>
{{/options}}
{{#constraints}}

Constraints:

<constraints>
{{constraints}}
</constraints>
{{/constraints}}
</context>

<task>
Capability:

<capability>
{{capability}}
</capability>

1. Decide whether the capability is core: does it differentiate the product in the eyes of customers, or is it a commodity customers expect to simply work? Say where it sits on the spectrum (novel, custom-built in the industry, available as products, utility) and what that implies. Core capabilities lean towards build; commodities lean towards buy or open source.
2. Define the options: build in-house, buy (named vendors if given, otherwise a generic "buy a SaaS product" option), adopt open source (self-hosted or managed), and any hybrid (for example buy now, build later; open source core plus own extensions).
3. List the requirements that decide between them: must-haves, scale, performance, security and compliance (certifications, data residency, data processing terms), integration points, and expected changes over three years.
4. Estimate total cost over three years for each option with explicit assumptions:
   - Build: initial engineering time, ongoing maintenance (often a substantial share of the initial effort every year), infrastructure, on-call, security work, and the opportunity cost of the roadmap work it displaces.
   - Buy: licence at expected scale and growth, price increases at renewal, integration and migration effort, vendor management, add-ons.
   - Open source: integration, hosting, upgrades, security patching, expertise, and licence obligations.
   Show the arithmetic. Where a price or effort is unknown, use a clearly labelled assumption or a range, never a made-up quote.
5. Compare time to value: when users would get the capability under each option.
6. Assess lock-in and exit: data portability, proprietary APIs, contract terms, switching cost, and what the exit path looks like for each option.
7. Assess risks: vendor viability and roadmap control, outages and support quality, security and compliance, licence risk in open source (for example strong copyleft or source-available terms; recommend legal review where relevant), team capability and key-person risk.
8. Recommend one option, with the two or three reasons that decide it, the conditions under which you would choose differently, and the first steps.
9. Set revisit triggers: concrete signals that should reopen the decision (for example licence cost passing a threshold, a missing feature blocking two deals, scale beyond a stated volume, the vendor being acquired).
</task>

<constraints>
- Lead with the recommendation. Keep the reasoning to what would change the decision.
- Never state vendor prices, certifications or features as fact unless they are in the input; otherwise say "verify with the vendor".
- Do not treat cost as the only criterion; a cheaper option that blocks the strategy is not cheaper.
- If the input is too thin to compare options (no requirements, no scale), give a provisional recommendation and list the facts needed to firm it up.
</constraints>

<output_format>
## Recommendation
Two to four sentences: the option, why, and the main condition that would change it.

## Is this core
A short paragraph.

## Options compared
Table: criterion | build | buy | open source | hybrid (if relevant). Criteria: fit to requirements, time to value, three-year cost, control and differentiation, lock-in, risk, team fit.

## Total cost over three years
Table per option with line items, then the assumptions list.

## Lock-in and exit
Bullets per option.

## Risks
Table: risk | option | likelihood | impact | mitigation.

## Revisit triggers
Bullets.

## Open questions
Numbered, with who can answer each.
</output_format>
