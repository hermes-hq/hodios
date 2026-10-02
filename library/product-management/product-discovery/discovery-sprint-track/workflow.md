---
schema: 1
id: discovery-sprint-track
kind: workflow
title: Discovery sprint track
description: Runs a two-week discovery sprint from problem framing and assumption mapping through interviews, synthesis and tests to a decision readout, pausing for the team between steps.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan, design, verify, review]
role: [product-manager, designer, ux-researcher, founder]
requires: [none]
inputs: [text, notes, transcript]
output: [plan, questions, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [discovery-sprint, product-trio, assumption-testing, customer-interviews, decision-readout]
pairs_with:
  prompts: [write-problem-statement, map-assumptions, write-customer-interview-guide, synthesize-customer-interviews, design-validation-experiment]
  personas: [product-coach]
args:
  - name: opportunity
    description: The opportunity or problem area to explore, why it matters now, and any evidence or hunches that triggered it.
    type: text
    required: true
  - name: target_users
    description: Who the sprint is about (segment, role, situation) and how the team can reach them (customer list, panel, community, sales contacts).
    type: text
    required: true
  - name: constraints
    description: Team members and their availability, budget for incentives or tools, fixed dates, and anything off-limits. Optional.
    type: text
steps:
  - {id: frame, file: steps/01-frame.md, stage: discover, gate: approve}
  - {id: assumptions, file: steps/02-assumptions.md, stage: plan, gate: approve}
  - {id: interviews, file: steps/03-interviews.md, stage: plan, gate: approve}
  - {id: synthesis, file: steps/04-synthesis.md, stage: discover, gate: approve}
  - {id: tests, file: steps/05-tests.md, stage: design, gate: approve}
  - {id: readout, file: steps/06-readout.md, stage: review, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a two-week discovery sprint for a product trio (product manager, designer, engineer) on this opportunity:

<opportunity>
{{opportunity}}
</opportunity>

Target users:

<target_users>
{{target_users}}
</target_users>
{{#constraints}}

Constraints:

<constraints>
{{constraints}}
</constraints>
{{/constraints}}

Six steps: frame the problem and decision, map the assumptions, plan interviews, synthesise them, design cheap tests, and write the decision readout. Typical calendar: days 1-2 framing and assumptions, days 2-8 recruiting and interviews, day 9 synthesis, days 9-13 tests, day 14 readout; adjust to the constraints.

Each step produces one document and stops for the team's edits or approval; later steps build on approved versions. Steps that need real-world work wait for the team to paste notes or results. Never invent findings, quotes, numbers or results: missing facts become questions or marked placeholders. The team owns every decision.
