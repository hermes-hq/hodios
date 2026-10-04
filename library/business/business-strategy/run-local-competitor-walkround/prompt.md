---
schema: 1
id: run-local-competitor-walkround
kind: prompt
title: Run a local competitor walkround
description: Plans a walkround of nearby competitors for a shop, cafe or salon with what to observe and a visit sheet, then turns the visit notes into two or three moves.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, operations-manager]
subject: [retail, hospitality]
requires: [none]
inputs: [text, notes]
output: [checklist, report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [competitor-visits, mystery-shopping, field-research, local-market, store-visits]
pairs_with:
  prompts: [analyze-competitors, run-swot-analysis, wargame-competitor-response]
  personas: [small-business-advisor]
args:
  - name: business
    description: Your business - what you sell, your customers, prices, opening hours and what you think you do better or worse than others.
    type: text
    required: true
  - name: competitors
    description: The competitors you plan to visit, or the area and type of business to look for. Optional when running a debrief.
    type: text
  - name: mode
    description: plan builds the visit plan and sheet; debrief turns your visit notes into findings and moves.
    type: enum
    enum: [plan, debrief]
    default: plan
  - name: visit_notes
    description: Your notes, photos described in words, prices and impressions from the visits. Needed for debrief.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, Visit plan, Visit sheet, Findings, Moves, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a local business owner learn from nearby competitors by visiting them as a customer, then act on it. Walkrounds usually go wrong in three ways: the owner visits at a quiet time and draws conclusions from one empty room; notes are impressions ("nicer vibe") instead of things that can be compared (prices, wait time, what staff said); and the visit ends in a long list of ideas with nothing changed. A good walkround has a question to answer, comparable timings, a short structured sheet, and a debrief that ends in two or three moves with an owner and a date. Visits are as an ordinary customer: honest, polite, no pretending to be a journalist or supplier, no photos of staff or customers, and no copying of protected material.

Mode: {{mode}}
</context>

<task>
<business>
{{business}}
</business>

{{#competitors}}
<competitors>
{{competitors}}
</competitors>
{{/competitors}}

{{#visit_notes}}
<visit_notes>
{{visit_notes}}
</visit_notes>
{{/visit_notes}}

Use debrief whenever visit notes are given, even if the mode says plan; otherwise follow the mode.

If the mode is plan:
1. Purpose: one or two questions the walkround should answer (for example "why do families choose the bakery across the road at weekends?").
2. Visit plan: which competitors (direct, substitutes, and one admired business outside the sector), when to visit (the same peak and quiet slots for each), how long, what to buy or book, and a small budget.
3. Visit sheet: a one-page sheet to fill in for each visit - arrival time and how busy; first impression from outside; welcome and wait time; range and best sellers; prices of five comparison items; upsells offered; payment and loyalty; cleanliness and comfort; online presence and reviews checked beforehand; one thing they do better; one thing we do better. Use a 1-5 scale with anchors where useful.
Leave Findings and Moves as "After the visits".

If the mode is debrief:
1. Summarise the notes into a comparison table on the sheet's fields; mark single observations as weak evidence.
2. Findings: patterns across visits, gaps in the market, and where the user's business is clearly behind or ahead.
3. Moves: choose two or three changes with the biggest likely effect for the cost, each with owner, cost, first step, date, and how to tell if it worked. Also say what not to copy and why.
If notes are missing in debrief mode, ask for them and stop.
</task>

<constraints>
- Never invent competitor names, prices or details. Use only what the user gives.
- Keep visits ethical: act as a genuine customer, no deception about identity, no photos of people, respect any requests to stop.
- Prefer moves that fit the user's brand and customers over copying competitors.
- Keep it short and practical; the visit sheet must fit on one page.
</constraints>

<output_format>
## Purpose
One or two questions.
## Visit plan
Table: Competitor | Why visit | Slot | What to buy or book. (Plan mode; "Done" in debrief mode.)
## Visit sheet
The one-page sheet as a table: Field | What to note | Score 1-5 anchor. (Plan mode; in debrief mode the comparison table goes here.)
## Findings
Bullets.
## Moves
Table: Move | Owner | Cost | First step | Date | Success measure.
## Questions
Bullets.
</output_format>
