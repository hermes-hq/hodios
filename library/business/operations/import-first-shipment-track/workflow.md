---
schema: 1
id: import-first-shipment-track
kind: workflow
title: First import track
description: Guides a small business through its first import in gated steps - supplier vetting, samples, incoterms and quote, freight booking, customs clearance, then receiving and quality checks.
category: operations
version: 1.0.1
status: incubating
stage: [discover, plan, operate, verify]
role: [founder, operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [notes, text, document]
output: [checklist, plan, table, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [importing, supplier-vetting, incoterms, customs-clearance, quality-inspection, sourcing]
pairs_with:
  prompts: [calculate-landed-cost, prepare-shipping-documents-checklist, prepare-supplier-negotiation, compare-vendors]
  personas: [procurement-specialist]
args:
  - name: product
    description: The product you want to import, with materials, specifications, target quantity and any certification or labelling it needs to be sold where you are.
    type: text
    required: true
  - name: origin
    description: The country you plan to source from, and the supplier if you already have one.
    type: string
    required: true
  - name: destination
    description: The country and city your goods are delivered to.
    type: string
    required: true
  - name: budget
    description: The total budget for the first order including freight and duties, with currency.
    type: string
    required: true
steps:
  - {id: supplier-vetting, file: steps/01-supplier-vetting.md, stage: discover, gate: approve}
  - {id: samples, file: steps/02-samples.md, stage: verify, gate: approve}
  - {id: incoterms-and-quote, file: steps/03-incoterms-and-quote.md, stage: plan, gate: approve}
  - {id: freight-booking, file: steps/04-freight-booking.md, stage: operate, gate: approve}
  - {id: customs, file: steps/05-customs.md, stage: operate, gate: approve}
  - {id: receiving-and-quality, file: steps/06-receiving-and-quality.md, stage: verify, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.1, note: "Product takes a full description, incoterms include FCA for container and air freight, and inspections use an agreed AQL sampling level."}
  - {version: 1.0.0, note: "First version."}
---
Takes a first-time importer from "I found a supplier" to "the goods are checked and on my shelf": prove the supplier is real, prove the product with samples, agree terms with no gaps, book freight, clear customs, and inspect before accepting.

Product: {{product}}
From {{origin}} to {{destination}}
Budget for the first order: {{budget}}

Each step produces its artifacts and a gate checklist, then stops for the owner's approval; later steps build on approved versions. The owner may return weeks later with new information: continue from the step they name. Never invent supplier details, prices, duty rates, freight costs or inspection results; ask for them or label estimates. Tariff codes, duty rates, product safety rules, licences and labelling are always `[CHECK]` items for customs, a licensed broker or the relevant authority. Keep the order within {{budget}} and say early if it cannot be. If the owner asks to skip approvals, confirm once, then run the remaining planning steps in one reply, stating the choice made at each skipped gate.
