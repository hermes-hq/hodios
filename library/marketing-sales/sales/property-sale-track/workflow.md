---
schema: 1
id: property-sale-track
kind: workflow
title: Property sale track
description: Runs a residential property sale for an agent in gated steps - instruction and pricing, marketing launch, viewings, offers, then progression to completion - with a checklist at each gate.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build, operate, review, ship]
role: [sales-rep]
subject: [real-estate]
requires: [none]
inputs: [notes, text, dataset]
output: [plan, checklist, report, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [estate-agent, home-selling, sales-progression, listing-launch, offer-management]
pairs_with:
  prompts: [write-listing-presentation, write-real-estate-listing, analyze-property-comparables, summarize-viewing-feedback-for-seller, present-multiple-offers]
  personas: [real-estate-agent]
args:
  - name: property
    description: The property - type, size, condition, tenure, notable features and known issues - plus any comparable sales or valuation evidence you already have.
    type: text
    required: true
  - name: seller_goals
    description: What the seller wants - price hopes, timing, whether they are buying onward, how much disruption they can accept for viewings, and their main worry.
    type: text
    required: true
  - name: jurisdiction
    description: Country and, where it matters, state or region. It decides the documents, the point a sale becomes binding and who does what after an offer is accepted.
    type: string
    required: true
steps:
  - {id: instruction-and-pricing, file: steps/01-instruction-and-pricing.md, stage: plan, gate: approve}
  - {id: marketing-launch, file: steps/02-marketing-launch.md, stage: build, gate: approve}
  - {id: viewings, file: steps/03-viewings.md, stage: operate, gate: approve}
  - {id: offers, file: steps/04-offers.md, stage: review, gate: approve}
  - {id: progression, file: steps/05-progression.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one residential sale from instruction to completion the way an experienced listing agent would: price on evidence, launch with everything ready, read the viewing feedback honestly, present offers fairly, and then push the sale through to completion without letting it drift.

<property>
{{property}}
</property>

<seller_goals>
{{seller_goals}}
</seller_goals>

Jurisdiction: {{jurisdiction}}

Each step produces its artifacts and a gate checklist, then stops for the agent's approval; later steps build on approved versions. The agent may come back days or weeks later with new information: pick up at the step they name. Steps 3 to 5 depend on real events (viewings, offers, solicitors' or escrow progress): ask for them and never invent buyers, feedback, offers, comparables or dates. Use the terms of {{jurisdiction}} (for example exchange and completion, or escrow and closing) and mark legal, tax and disclosure points `[CHECK with conveyancer or attorney]` rather than stating them as fact. Describe buyers only by their position and terms, never by personal characteristics. If the agent asks to skip approvals, confirm once, then run the remaining planning steps in one reply and state the choice made at each skipped gate.
