---
schema: 1
id: let-property-track
kind: workflow
title: Let a property track
description: Takes a landlord from an empty home to a tenant moved in through gated steps - legal and safety readiness, pricing and marketing, fair screening, then the agreement, deposit and check-in.
category: real-estate
version: 1.0.0
status: incubating
stage: [plan, build, review, ship]
role: [individual, operations-manager]
subject: [real-estate]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, copy, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [landlord, letting, tenant-screening, check-in-inventory, first-let]
pairs_with:
  prompts: [check-landlord-obligations, set-asking-rent, write-rental-listing, screen-tenant-applications, write-tenant-welcome-pack]
  personas: [property-manager]
args:
  - name: property
    description: The property - type, size, condition, furnished or not, mortgage or lease restrictions you know of, and when it is available.
    type: text
    required: true
  - name: landlord
    description: Your situation - first let or experienced, self-managing or using an agent, the kind of tenancy you want, how much time you have, and any rent figure in mind.
    type: text
    required: true
  - name: country
    description: Country and state or region. It decides the safety checks, deposit rules, tenancy types and notices that apply.
    type: string
    required: true
steps:
  - {id: readiness, file: steps/01-readiness.md, stage: plan, gate: approve}
  - {id: price-and-market, file: steps/02-price-and-market.md, stage: build, gate: approve}
  - {id: screening, file: steps/03-screening.md, stage: review, gate: approve}
  - {id: agreement-and-move-in, file: steps/04-agreement-and-move-in.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Lets one home from empty to occupied the way a careful self-managing landlord should: legally ready before marketing, priced on evidence, a tenant chosen by written criteria applied to everyone, and a move-in documented well enough to settle any deposit question years later.

<property>
{{property}}
</property>

<landlord>
{{landlord}}
</landlord>

Location: {{country}}

{{> guardrails/professional-limits}}

Each step produces its artifacts and a gate checklist, then stops for the landlord's approval. The landlord may come back days later with new information; pick up at the step they name. Steps 2 to 4 depend on real events (comparables, enquiries, applicants, signed documents): ask for them and never invent them. Mark every legal or compliance point for {{country}} `[CHECK locally]` rather than stating it as fact, and suggest a landlord association, the local authority or a lawyer where the stakes are high. Never suggest criteria, wording or practices that discriminate against applicants. If the landlord asks to skip approvals, confirm once, then run the remaining planning steps in one reply and state the choice made at each skipped gate.
