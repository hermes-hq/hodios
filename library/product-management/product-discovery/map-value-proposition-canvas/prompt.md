---
schema: 1
id: map-value-proposition-canvas
kind: prompt
title: Map a value proposition canvas
description: Maps a value proposition canvas with ranked customer jobs, pains and gains against the product's pain relievers and gain creators, marks evidence versus assumption, and shows fit gaps and tests.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, founder, marketer, designer]
requires: [none]
inputs: [text, notes, transcript]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [value-proposition-canvas, customer-jobs, pains-and-gains, product-fit, assumption-testing]
pairs_with:
  prompts: [define-jobs-to-be-done, synthesize-customer-interviews, map-assumptions, design-validation-experiment]
  personas: [product-coach]
args:
  - name: customer_segment
    description: The one customer segment to map, as specifically as possible (role, situation, context), not "everyone".
    type: text
    required: true
  - name: product
    description: The product or concept, what it does, its main features and services, and the value you believe it delivers.
    type: text
    required: true
  - name: evidence
    description: Interview notes, survey results, support tickets, reviews or sales notes about this segment. Optional; without it the canvas is a set of hypotheses to test.
    type: text
output_contract:
  format: markdown
  sections: [Customer profile, Value map, Fit analysis, Biggest gaps, Tests to run]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product strategist who uses the value proposition canvas to check whether a product actually addresses what a specific customer cares about. The canvas has two sides. The customer profile lists the customer's jobs (functional, social and emotional, the tasks they are trying to get done), pains (obstacles, risks and bad outcomes around those jobs) and gains (outcomes and benefits they want, from required to unexpected). The value map lists the products and services, the pain relievers (how they remove specific pains) and the gain creators (how they produce specific gains). Fit exists when relievers and creators address the jobs, pains and gains that matter most to this customer. You know the canvas is often filled with wishful thinking: generic pains, features restated as gains, and everything marked as important. Your job is to make it specific, ranked and honest about what is known.
</context>

<task>
<customer_segment>
{{customer_segment}}
</customer_segment>

<product>
{{product}}
</product>
{{#evidence}}

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

If the segment is "everyone" or several different customers at once, ask the user to pick one segment (suggest two or three from the input) and stop.

1. **Customer profile.** Five to eight jobs (mostly functional, plus the social and emotional ones that really drive choice), five to eight pains and five to eight gains, each written concretely in the customer's terms ("spends Sunday evenings reconciling receipts" rather than "wastes time"). Rank pains by severity and gains by relevance. Mark each item as evidence (with the source from the input) or assumption.
2. **Value map.** The products and services, then the pain relievers and gain creators. Each reliever or creator names the specific pain or gain it addresses. Do not restate a feature as a benefit.
3. **Fit analysis.** For each top pain and gain, whether the product addresses it strongly, partly or not at all. Highlight features that address nothing important (candidates to drop or deprioritise) and important pains or gains the product ignores.
4. **Biggest gaps.** The two or three gaps that matter most, and what they mean for the product or the positioning.
5. **Tests to run.** For the riskiest assumptions (important items with no evidence), the cheapest test: interviews about past behaviour, a landing-page test, a concierge test, a prototype test, with what result would confirm or refute it.
</task>

<constraints>
- Never present an assumption as evidence, and never invent quotes or data.
- One segment per canvas. Avoid generic items that would fit any customer.
- Keep each item to one line.
{{> output/uncertainty}}
</constraints>

<output_format>
## Customer profile
| Type | Item | Rank | Evidence or assumption |
Types: Job, Pain, Gain.
## Value map
| Type | Item | Addresses |
Types: Product or service, Pain reliever, Gain creator.
## Fit analysis
| Top pain or gain | Addressed by | Fit (strong, partial, none) |
Then features that address nothing important.
## Biggest gaps
## Tests to run
| Assumption | Test | Confirms if | Refutes if |
</output_format>
