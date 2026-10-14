---
schema: 1
id: design-anti-corruption-layer
kind: prompt
title: Design an anti-corruption layer
description: Designs a translation layer between your domain and a legacy system or third-party platform, with the model mapping, ownership of identifiers, error and gap handling, and how it shrinks over time.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, schema, text]
output: [docs, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [anti-corruption-layer, domain-driven-design, legacy-integration, model-translation, bounded-context]
pairs_with:
  personas: [software-architect]
  prompts: [find-service-boundaries, plan-monolith-extraction, integrate-third-party-api]
args:
  - name: our_domain
    description: The concepts in your own model that are affected, for example "Customer, Subscription, Invoice", and the rules you want them to follow.
    type: text
    required: true
  - name: foreign_system
    description: The legacy system, ERP, CRM or third-party API you must integrate with, its model and its quirks, for example "accounts and contacts are one table, status codes are integers, dates are local time strings".
    type: text
    required: true
  - name: direction
    description: What flows which way, for example "we read customers from it and write orders to it", and whether the integration is meant to be permanent or to retire the foreign system.
    type: text
output_contract:
  format: markdown
  sections: [Decision, Concept mapping, Layer design, Edge cases and gaps, Code sketch, Exit plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a new system talks directly to a legacy system or a large external platform, the foreign model leaks in: its field names, status codes, odd identifiers and assumptions spread through your code, and the new design slowly becomes a copy of the old one. An anti-corruption layer (ACL) is a boundary that translates between the two models in both directions, so your domain only sees your concepts. Its value depends on doing the translation in one place, being honest about concepts that do not map one to one (one foreign record split into two of yours, or a state you have no name for), owning the identifier mapping, and treating the foreign system's failures and quirks as the ACL's problem. It is overhead when your model would be the same as the foreign one, for example a thin integration with a clean, stable API.
</context>

<task>
<our_domain>
{{our_domain}}
</our_domain>

<foreign_system>
{{foreign_system}}
</foreign_system>

{{#direction}}
<direction>
{{direction}}
</direction>
{{/direction}}

1. Decide whether an ACL is warranted: compare the two models' concepts and say how much they differ and how likely the foreign side is to change or be replaced. If a thin client wrapper is enough, say so and stop after a short justification.
2. Map concepts: for each of your concepts, the foreign concept or concepts it comes from or goes to, the field-level mapping, value translations (status codes, enums, units, time zones, currencies), and mismatches (one-to-many, missing concepts, foreign states with no equivalent).
3. Design the layer: its interface in your domain's language (repository or service ports), the translators, the adapter that talks to the foreign system, where the identifier mapping between your ids and theirs is stored and who owns it, and whether translation is synchronous, event-driven or batch.
4. Handle edge cases: foreign data that violates your invariants (reject, quarantine, repair), partial or failed writes to the foreign system, retries and idempotency, rate limits, and reconciling drift between the two sides.
5. Sketch the code for one concept's translation in both directions, in pseudocode or the stack the user names, with tests built from real-looking foreign payloads.
6. Exit plan: if the foreign system is to be retired, how the ACL lets you move traffic concept by concept; if permanent, how to keep the mapping documented and tested against foreign changes.
</task>

<constraints>
- Your domain code must never see foreign types, codes or identifiers; translation happens only in the layer.
- Do not invent the foreign system's behaviour, limits or field meanings; list unknowns to confirm with its owners or documentation.
- Make lossy translations explicit; never drop foreign data silently without saying where it goes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision
ACL or thin wrapper, and why, in at most 4 lines.
## Concept mapping
Table: our concept, foreign concept, field mapping, value translations, mismatch.
## Layer design
Components, interfaces, id mapping, sync or async, with a Mermaid diagram.
## Edge cases and gaps
Bullets with the handling rule.
## Code sketch
## Exit plan
</output_format>
