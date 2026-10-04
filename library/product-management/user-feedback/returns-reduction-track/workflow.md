---
schema: 1
id: returns-reduction-track
kind: workflow
title: Reduce product returns
description: Takes a physical product's returns from data and reasons through classification, root causes, upstream fixes and monitoring, pausing for approval between steps. Use when returns are eating margin.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, review, design, operate]
role: [product-manager, founder, operations-manager, manager]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, text, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [product-returns, return-reasons, root-cause, listing-accuracy, packaging, size-and-fit]
pairs_with:
  prompts: [define-physical-product-kpis, analyze-field-service-notes, analyze-in-home-use-test-results]
  personas: [customer-insights-analyst]
args:
  - name: returns_data
    description: Returns by product or SKU with units sold in the same period, return reason codes and free-text comments, channel, date of sale and return, and condition on receipt if graded. An export or rough notes are fine.
    type: text
    required: true
  - name: product_and_channels
    description: The products (category, sizes or variants, price), the channels they sell through (own site, marketplaces, shops), the return policy in each, and the cost of a return if known.
    type: text
    required: true
steps:
  - {id: assemble, file: steps/01-assemble-data.md, stage: discover, gate: approve, artifact: "returns/01-data-baseline.md"}
  - {id: classify, file: steps/02-classify-reasons.md, stage: review, gate: approve, artifact: "returns/02-reason-classes.md"}
  - {id: root-cause, file: steps/03-root-causes.md, stage: review, gate: approve, artifact: "returns/03-root-causes.md"}
  - {id: fixes, file: steps/04-choose-fixes.md, stage: design, gate: approve, artifact: "returns/04-fixes.md"}
  - {id: monitor, file: steps/05-monitoring-plan.md, stage: operate, gate: none, artifact: "returns/05-monitoring.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Reduces returns of a physical product by fixing their causes upstream (the product, the listing, the size guidance, the packaging, the instructions) rather than by making returning harder. Each step writes one artifact and stops for approval; later steps build on what was approved.

<returns_data>
{{returns_data}}
</returns_data>

<product_and_channels>
{{product_and_channels}}
</product_and_channels>

Rules for every step:
- Use only the data given or confirmed. Ask for missing essentials (units sold for the same period, reason codes, channel) and mark gaps as [X]. Never invent rates, costs or customer comments.
- Work with return rates (returns / units sold, by month of sale), not raw counts.
- Customers' stated reasons are a starting point, not the truth: "changed mind" often hides "not as expected", and marketplace reason menus push people to certain answers.
- Do not recommend restricting legal return rights, hiding the policy or making returns deliberately hard. Consumer return rights differ by country; say to check them locally.
- Any return reason suggesting a safety risk (overheating, sharp edges, choking parts, skin reactions) goes to whoever is responsible for product safety at once, outside this workflow.
- End each artifact with open questions.
