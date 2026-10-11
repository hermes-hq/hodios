---
schema: 1
id: fit-regulatory-deadline-into-roadmap
kind: prompt
title: Fit a regulatory deadline into the roadmap
description: Plans product work for a fixed legal or regulatory deadline - confirmed obligations, scope to meet them, a backward schedule with buffers, what it displaces and the open questions for legal.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, engineering-manager, founder, legal-professional]
requires: [none]
inputs: [text, document]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [compliance-deadline, regulation, backward-planning, legal-review, fixed-date, obligation-mapping]
pairs_with:
  prompts: [map-cross-team-dependencies, forecast-roadmap-dates-with-ranges, write-roadmap-update, push-back-on-roadmap-request]
args:
  - name: obligation
    description: The law, regulation or standard, the deadline, the jurisdictions, and what you know of what it requires (paste the guidance or legal team's summary if you have it).
    type: text
    required: true
  - name: product_and_roadmap
    description: The product areas affected, the current roadmap and team capacity, and anything already done toward the obligation.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Obligations to confirm, Gap and scope, Backward schedule, What it displaces, Risks, Questions for legal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a product team fit work for a fixed legal or regulatory deadline (for example accessibility, data protection, consumer, payments or product safety rules) into a roadmap. Three failure patterns are common. Teams plan from a vague summary and discover late what is actually required. They schedule forward from today and land on the deadline with no time for testing, audit, documentation, staff training or a supplier's part. And they quietly squeeze the work in without telling anyone what it displaced. The method: turn the regulation into a list of obligations confirmed by legal, map gaps against the product, plan backwards from the deadline with buffers, and make the trade-offs visible.

You are not giving legal advice. Interpretations of the law come from the user's legal or compliance team; you mark every interpretation as needing their confirmation.
</context>

<task>
<obligation>
{{obligation}}
</obligation>

<product_and_roadmap>
{{product_and_roadmap}}
</product_and_roadmap>

1. Obligations to confirm: break what was given into specific obligations, each tagged as stated in the source given or assumed. Note jurisdiction differences if several apply. Do not add obligations from memory as fact; list possible ones as questions.
2. Gap and scope: for each obligation, the product areas affected, current state, the gap, and a rough size. Separate the minimum to comply from nice-to-have improvements.
3. Backward schedule: from the deadline, work back through the steps that usually take time beyond building (legal sign-off, external audit or certification, supplier changes, documentation, support and staff training, customer notice periods, a rollout window) to the latest safe start date for each workstream. Add a buffer and say how big and why.
4. What it displaces: which roadmap items move, by how much, and who must be told.
5. Risks: what could make the deadline slip, with an early warning sign and an owner for each.
6. Questions for legal: precise questions whose answers would change scope or dates.
</task>

<constraints>
- Do not state what a law requires unless it appears in the input; anything else is a question for legal. Never claim the plan makes the company compliant.
- Do not invent the deadline, fines or enforcement practice.
- If today's date and capacity show the deadline cannot be met, say so plainly and give options (reduced scope, interim measures, asking legal about the risk position) rather than a hopeful plan.
- If the obligation or deadline is missing, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Obligations to confirm
Table: obligation | source (given or assumed) | jurisdiction | confirmed by legal (yes or pending).

## Gap and scope
Table: obligation | area | current state | gap | minimum to comply | size.

## Backward schedule
Table: workstream | latest safe start | steps | latest safe finish | buffer. Then one line on feasibility.

## What it displaces
Bullets: item, new timing, who to tell.

## Risks
Table: risk | warning sign | owner.

## Questions for legal
Numbered list.
</output_format>
