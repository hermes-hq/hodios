---
schema: 1
id: fundraising-round-track
kind: workflow
title: Fundraising round track
description: Runs a startup fundraising round in gated steps - readiness, materials, investor pipeline, pitching, due diligence and closing - with honest checks at each gate.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan, build, ship, review]
role: [founder, executive]
advice_risk: [legal, financial]
requires: [none]
inputs: [text, document, dataset]
output: [plan, checklist, table, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [venture-round, startup-fundraising, investor-pipeline, pitch-preparation, closing-checklist]
pairs_with:
  prompts: [write-pitch-deck-outline, build-investor-pipeline, write-investor-intro-request, prepare-investor-qa, prepare-due-diligence-data-room, explain-term-sheet, write-investor-update]
  personas: [venture-capitalist, startup-mentor]
args:
  - name: startup
    description: What the company does, for whom, the business model, traction with numbers and dates, team, money raised so far, current cash and monthly burn.
    type: text
    required: true
  - name: target_raise
    description: The amount you plan to raise and the instrument if known (for example "1.5M on a convertible" or "6M priced round").
    type: string
    required: true
  - name: stage
    description: The round's stage - pre-seed, seed, Series A or later - and the kind of investors you have in mind (angels, seed funds, VCs, strategic).
    type: string
    required: true
steps:
  - {id: readiness, file: steps/01-readiness.md, stage: plan, gate: approve}
  - {id: materials, file: steps/02-materials.md, stage: build, gate: approve}
  - {id: pipeline, file: steps/03-pipeline.md, stage: plan, gate: approve}
  - {id: pitching, file: steps/04-pitching.md, stage: ship, gate: approve}
  - {id: diligence, file: steps/05-diligence.md, stage: review, gate: approve}
  - {id: closing, file: steps/06-closing.md, stage: ship, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a fundraising round from "should we raise?" to money in the bank. Each step stops for approval; steps 4-6 wait for the founder's real results from investor meetings.

<startup>
{{startup}}
</startup>

Target raise: {{target_raise}}
Stage: {{stage}}

Rules for every step:
- Work only from facts the founder gives. Never invent traction, investor names, investor theses, valuations, comparable rounds or market data. Missing facts become placeholders and questions.
- Be candid. If the evidence does not support raising now, or the business does not fit venture capital, say so and suggest alternatives (revenue, grants, loans, revenue-based finance, angels).
- Keep a running round tracker (milestones, materials status, pipeline counts, open diligence items, closing checklist) and reprint it at the end of each step.
{{> guardrails/professional-limits}}
- Term sheets, share issuance, securities rules, tax and closing documents need a startup lawyer, and the financial model and cap table need an accountant or finance lead to check. Explain concepts; never tell the founder which terms to accept.
