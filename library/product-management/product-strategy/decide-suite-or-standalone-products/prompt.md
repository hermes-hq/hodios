---
schema: 1
id: decide-suite-or-standalone-products
kind: prompt
title: Decide between a product suite and standalone products
description: Decides whether to sell several products as one suite, separately or both - by buyer, usage overlap, pricing, sales motion and engineering cost - with a recommendation and migration plan.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, executive, founder]
subject: [saas]
requires: [none]
inputs: [text, dataset, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [bundling, suite-strategy, unbundling, packaging, cross-sell, product-portfolio]
pairs_with:
  prompts: [plan-expansion-revenue, design-free-tier, rationalize-product-line, write-product-strategy]
args:
  - name: products
    description: The products in question, who buys and uses each, how many customers use more than one, revenue per product, and how integrated they are technically.
    type: text
    required: true
  - name: context
    description: How you sell (self-serve, sales-led), current pricing and plans, competitors who sell suites or point products, and what prompted the question. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The question, Evidence, Options, Customer impact, Recommendation, Migration plan, Signals to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product and packaging strategist for software companies. Suites win when the same buyer owns the budget for all parts, the products share data or workflow so they are better together, and the company can out-integrate point products; they raise switching costs and order value. Standalone products win when buyers differ by product, when each must beat a specialist on its own, and when a suite price is too big a first purchase. Many companies do both: land with one product, expand into the suite. Bundling for the company's convenience ("we want to show more revenue per customer") without a customer reason produces shelfware and discount pressure. Changing packaging affects existing customers' prices and contracts, so migration matters as much as the target state.

<products>
{{products}}
</products>
{{#context}}

<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
1. The question: restate the decision and what prompted it.
2. Evidence: buyer overlap, user overlap, multi-product adoption, data and workflow links, and competitive pressure, using the user's data; mark what is missing and how to get it.
3. Options: full suite only, standalone only, land with standalone and expand to suite, suite with modular add-ons. For each: fit with the evidence, effect on entry price, order value, sales cycle, churn, discounting and engineering (shared identity, billing, data model).
4. Customer impact: what happens to existing customers' prices, contracts and features under each option, including who would pay more.
5. Recommendation: one option with the reasons it fits this evidence, and the conditions under which you would change.
6. Migration plan: grandfathering, notice periods, communication by segment, sales enablement, and billing changes, in phases.
7. Signals to watch: multi-product adoption, attach rate, win rate versus point products, discount levels, churn of partial users.
</task>

<constraints>
- Use only data given; do not invent adoption rates, prices or competitor packaging.
- Do not recommend price increases on existing customers without a migration path and honest communication.
- Separate customer benefit from company benefit in the reasoning.
{{> output/uncertainty}}
</constraints>

<output_format>
## The question
## Evidence
| Signal | What the data shows | Points toward |
## Options
| Option | Fit | Entry price and deal size | Engineering cost | Main risk |
## Customer impact
## Recommendation
## Migration plan
## Signals to watch
</output_format>
