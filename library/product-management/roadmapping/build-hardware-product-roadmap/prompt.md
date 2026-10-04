---
schema: 1
id: build-hardware-product-roadmap
kind: prompt
title: Build a hardware product roadmap
description: Builds a physical product roadmap with EVT, DVT and PVT gates, tooling and part lead times, certification, factory slots and retail deadlines, showing the latest safe date for each decision.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, project-manager]
subject: [engineering]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [evt-dvt-pvt, tooling, long-lead-parts, certification, critical-path, firmware-updates]
pairs_with:
  prompts: [plan-seasonal-product-calendar, set-product-cost-target, plan-retail-shelf-launch, map-cross-team-dependencies]
args:
  - name: product_and_stage
    description: The product, what is new about it (mechanics, electronics, radio, battery, app), and where it is now (concept, works-like prototype, EVT, DVT). Rough notes are fine.
    type: text
    required: true
  - name: target_launch
    description: The launch date or season you are aiming for and what launch means (crowdfunding shipments, own web store, retail shelves in a named season).
    type: text
    required: true
  - name: constraints
    description: Optional. Known lead times, factory or contract manufacturer, target markets, retailer deadlines, budget limits, team size, anything already ordered or frozen.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Gate plan, Latest safe dates, Long-lead and irreversible decisions, Certification and compliance, After launch, Risks and assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan hardware the way an experienced hardware PM does: backwards from the date the product must be in customers' hands, with the slow, expensive and irreversible decisions placed first. Software roadmaps can slip a sprint; hardware slips a season, because steel tooling, long-lead components, certification lab slots, factory capacity and retailer buying deadlines all have fixed lead times and most of them cannot be compressed with money.

Plain plans fail in three ways: they treat EVT, DVT and PVT as names instead of gates with exit criteria, they start certification and tooling too late because the design "is not final yet", and they forget the time between the last unit off the line and the shelf (freight, customs, retailer distribution centres).
</context>

<task>
Product and current stage:

<product_and_stage>
{{product_and_stage}}
</product_and_stage>

Target launch:

<target_launch>
{{target_launch}}
</target_launch>

{{#constraints}}
Known constraints:

<constraints>
{{constraints}}
</constraints>
{{/constraints}}

1. Restate what launch means as a date units must reach customers or shelves. If the target is a season, convert it to an in-market date and say how.
2. Lay out the gates from the current stage: prototype (works-like, looks-like), EVT (production-intent design, functional and reliability checks), DVT (units from production tooling, full validation, certification testing), PVT (pilot run on the real line, yield and process checks), mass production. For each gate give entry criteria, exit criteria, typical build quantity and typical duration as a range.
3. Work backwards from the in-market date: freight and customs, retailer distribution lead time if any, mass production ramp, PVT, certification, DVT, tool build and T1/T2 trial iterations, design freeze, long-lead component orders. Use the user's lead times first; where none are given, use typical ranges and label them "typical, confirm with supplier".
4. For every decision on the critical path, give the latest safe date: the last day it can happen without moving launch. Mark which decisions are irreversible or costly to undo (tooling kickoff, long-lead purchase orders, packaging print runs, radio module choice).
5. Place certification and compliance work: which tests the product category is likely to need (radio, electrical safety, EMC, battery transport, materials and chemical restrictions, labelling), on which units, booked how far ahead. Name them as items to confirm with a test lab for the target markets, not as legal fact.
6. Plan after launch: firmware and app updates (day-one update, security patches, the support period you will commit to), spare parts, the first production changes from field returns.
7. If the target date is not reachable from the current stage, say so plainly, show the earliest realistic date, and list what would have to be true to pull it in (scope cut, off-the-shelf module, air freight, fewer markets).
</task>

<constraints>
- Do not invent supplier names, quotes, lead times or regulations. Every assumed duration is a labelled range; every compliance item is "confirm with a test lab or compliance adviser for [market]".
- Ask for the current stage and the target markets if they are missing, because both change the whole plan; until answered, mark them [X] and keep going only where the plan does not depend on them.
- Show the backward arithmetic so the user can recompute when a date moves.
- Keep firmware on the plan: hardware that ships cannot be recalled for a software fix, so the factory firmware image needs its own freeze date.
- No buffer means no plan: include at least one explicit buffer before launch and say what it protects.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three lines: in-market date, whether it is reachable from today's stage, and the single decision that matters most this month.

## Gate plan
Table: gate | start | end | build quantity | exit criteria | owner placeholder.

## Latest safe dates
Table: decision or milestone | latest safe date | lead time used (source: user or typical) | reversible? | slack.

## Long-lead and irreversible decisions
Bullets in date order, each with what must be known before it is taken.

## Certification and compliance
Table: test or requirement to confirm | markets | units needed | when to book | when to test.

## After launch
Firmware, app, support period, spares and first change cycle as short bullets.

## Risks and assumptions
Top risks with mitigation, then every assumed duration, then open questions.
</output_format>
