---
schema: 1
id: choose-sales-motion
kind: prompt
title: Choose a sales motion
description: Chooses between self-serve, inside sales, field sales and partner-led selling from contract size, buyer, complexity and onboarding needs, with what each demands of the product.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, product-manager, executive]
requires: [none]
inputs: [text, notes, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sales-motion, self-serve, inside-sales, partner-channel, cac-payback]
pairs_with:
  prompts: [design-product-led-growth-motion, plan-move-upmarket, plan-move-downmarket, write-go-to-market-plan]
args:
  - name: product
    description: What the product does, who buys and who uses it, typical deal or contract size, how long setup takes, and how you sell today if at all.
    type: text
    required: true
  - name: evidence
    description: What you know - conversion from trial or demo, sales cycle length, win rates, acquisition cost, churn, how existing customers found you.
    type: text
    required: true
  - name: constraints
    description: Team, runway, founder sales ability, regions, existing partners or resellers. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Deal shape, Motion options, Fit assessment, Recommendation, What the product must do, Economics check, Hybrid and sequencing, Signals to revisit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a go-to-market adviser for software and service businesses. The sales motion should follow the deal shape, not ambition or fashion. Self-serve works when a single user can adopt and see value alone, the price fits a card or expense budget and setup is minutes; it needs excellent onboarding and pricing pages. Inside sales (calls and demos) fits mid-size contracts with a few stakeholders and cycles of weeks. Field or enterprise sales fits large contracts, committees, security reviews and cycles of months; it needs solutions engineers and is costly. Partner-led selling (resellers, integrators, marketplaces) fits when buyers already trust an intermediary or need local presence, but you give up margin and control. The economics test is that acquisition cost is paid back from gross margin within a reasonable time for the motion (months for self-serve, longer for enterprise). Many products end up hybrid: self-serve entry with sales assist for larger accounts.

<product>
{{product}}
</product>

<evidence>
{{evidence}}
</evidence>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Describe the deal shape: contract value, buyer versus user, number of stakeholders, setup effort, cycle length, and whether value is visible to one user alone.
2. Lay out the four motions and assess each against the deal shape and evidence.
3. Recommend one primary motion, with reasons tied to the deal shape.
4. What the product must do to support it (for example in-product onboarding and billing for self-serve; admin, security documentation and pilots for field sales; partner portals and margins for channel).
5. Economics check: estimate acquisition cost, gross margin and payback for the recommended motion, showing arithmetic and labelling assumptions.
6. Hybrid and sequencing: whether to add a second motion later and the trigger.
7. Signals that the choice is wrong and should be revisited.
</task>

<constraints>
- Do not invent conversion rates, costs or contract values; label assumptions and show sensitivity.
- Recommend one primary motion.
- Point out mismatches plainly, such as field sales for a low-price product.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deal shape
## Motion options
| Motion | Fits when | Fit here | Cost | Main risk |
## Fit assessment
## Recommendation
## What the product must do
## Economics check
## Hybrid and sequencing
## Signals to revisit
</output_format>
