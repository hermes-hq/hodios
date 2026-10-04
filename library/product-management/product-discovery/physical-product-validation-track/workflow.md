---
schema: 1
id: physical-product-validation-track
kind: workflow
title: Validate a physical product idea
description: Takes a physical product idea through gated steps - buyer interviews, a concept and price check, a prototype test, a preorder test and a go, revise or stop call - before money goes into tooling.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, verify, review]
role: [founder, product-manager, designer]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, notes]
output: [plan, questions, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hardware, physical-product, tooling, preorders, unit-economics, stage-gates]
pairs_with:
  prompts: [test-physical-prototype-with-users, test-preorders-before-tooling, audit-idea-evidence, write-customer-interview-guide]
  personas: [hardware-product-manager]
args:
  - name: product_idea
    description: The product idea, the problem it solves, how far you are (sketch, prototype, supplier quotes) and any numbers you have.
    type: text
    required: true
  - name: target_buyer
    description: Who buys it and who uses it if different (for example parents buy, children use), and where they shop today.
    type: text
    required: true
  - name: budget
    description: Money and time you can spend before deciding on tooling. Optional.
    type: text
steps:
  - {id: interviews, file: steps/01-buyer-interviews.md, stage: discover, gate: approve, artifact: "validation/01-buyer-interviews.md"}
  - {id: concept-price, file: steps/02-concept-and-price.md, stage: verify, gate: approve, artifact: "validation/02-concept-and-price.md"}
  - {id: prototype, file: steps/03-prototype-test.md, stage: verify, gate: approve, artifact: "validation/03-prototype-test.md"}
  - {id: preorders, file: steps/04-preorder-test.md, stage: verify, gate: approve, artifact: "validation/04-preorder-test.md"}
  - {id: decision, file: steps/05-decision.md, stage: review, gate: none, artifact: "validation/05-decision.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a physical product idea from hunch to a tooling decision. Physical products are expensive to change once moulds are cut and stock is ordered, so each step asks for stronger evidence than the last: stories of the problem, reactions to a concept and price, behaviour with a prototype, and finally money paid. Each step writes one document and stops for approval; steps that need real-world work wait for the results to be pasted in.

<product_idea>
{{product_idea}}
</product_idea>

<target_buyer>
{{target_buyer}}
</target_buyer>
{{#budget}}

<budget>
{{budget}}
</budget>
{{/budget}}

Rules for every step:
- Ask for missing essentials (retail price target, unit cost or quotes, minimum order quantity) when a step needs them, instead of inventing them. Mark assumptions as [assumed] with a range.
- Never invent interview findings, test results, supplier quotes or conversion rates. Pass marks are set before each test and never moved afterwards.
- Compliments and "I would buy it" are weak evidence; past behaviour and money paid are strong. Say which kind each result is.
{{> guardrails/professional-limits}}
- Product safety, certification, consumer law on preorders and refunds differ by country and product type: list them as items to confirm with a test lab or local adviser, never as rulings.
