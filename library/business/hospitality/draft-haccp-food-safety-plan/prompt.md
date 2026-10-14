---
schema: 1
id: draft-haccp-food-safety-plan
kind: prompt
title: Draft a HACCP food safety plan
description: Drafts a HACCP-based food safety plan for a small food business - process flows, hazards, critical control points, limits to confirm locally, monitoring, corrective actions and records.
category: hospitality
version: 1.0.0
status: incubating
stage: [plan, build]
role: [operations-manager, founder, manager]
subject: [hospitality]
advice_risk: [legal]
requires: [none]
inputs: [text, notes, document]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [haccp, critical-control-points, food-safety-management, temperature-control, corrective-actions, due-diligence]
pairs_with:
  prompts: [prepare-for-food-safety-inspection, build-allergen-matrix, write-dish-spec-sheet]
args:
  - name: business
    description: What you make and sell and how - menu or product list, cooking and holding methods (cook-chill, hot holding, sous vide, buffets), deliveries, storage, and number of staff.
    type: text
    required: true
  - name: location
    description: Country and region, so the plan can point to the right authority and its published guidance.
    type: string
    required: true
  - name: existing_records
    description: Checks and records you already keep (fridge logs, probe checks, cleaning schedules), or "none". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope and assumptions, Process flows, Hazard analysis, Critical control points, Prerequisites, Records, Review and verification, Values to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a food safety consultant who writes HACCP plans for small restaurants, cafes, caterers and food producers. HACCP has seven principles: analyse hazards, identify critical control points (CCPs), set critical limits, monitor, take corrective action, verify, and keep records. Small businesses go wrong by making every step a CCP (so nothing is watched closely), copying temperatures from another country, writing a plan nobody follows, and forgetting allergens and higher-risk processes such as cooling, reheating, sous vide and hot holding. Good basic hygiene (prerequisites: cleaning, pest control, training, supplier checks) carries most of the load; CCPs are the few points where control is essential.

Business: {{business}}
Location: {{location}}
{{#existing_records}}Existing records: {{existing_records}}{{/existing_records}}
</context>

<task>
1. Scope and assumptions: products and processes covered, the regime you assume applies in this location and the authority to confirm with, and whether a ready-made pack from that authority might suit the business better than a bespoke plan.
2. Process flows: a step list for each process group (for example cook and serve, cook-chill-reheat, hot holding, cold preparation, delivery and storage).
3. Hazard analysis: for each step, the biological, chemical (including allergens) and physical hazards and the control.
4. Critical control points: only the steps where control is essential and cannot be done later, with critical limit (as `[CONFIRM: value from local guidance]` unless you are certain for this location and name the source), how to monitor, how often, who, and the corrective action.
5. Prerequisites: the hygiene programmes the plan relies on, each one line.
6. Records: the logs needed, what goes on each, and how long to keep them `[CONFIRM]`.
7. Review and verification: who checks records, when the plan is reviewed (at least yearly and whenever the menu, supplier or process changes), and staff training.
8. Values to confirm: every placeholder in one list with where to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never guess a temperature, time or legal duty for the user's location. Use placeholders and name the authority or published guidance to check.
- Never suggest backdating, completing logs in advance or inventing records.
- Keep CCPs few and real; explain briefly why other steps are controlled by prerequisites.
- If the business description shows a current risk (unsafe hot holding, raw and ready-to-eat foods mixed, no hand-wash basin, a high-risk process with no control), say so at the top.
- Plain words a kitchen team can follow.
</constraints>

<output_format>
## Scope and assumptions
Bullets.
## Process flows
Numbered steps per process.
## Hazard analysis
Table: Step | Hazard | Control | CCP? (Y/N).
## Critical control points
Table: CCP | Critical limit | Monitoring | Frequency | Who | Corrective action.
## Prerequisites
Bullets.
## Records
Table: Record | Contents | Keep for.
## Review and verification
Bullets.
## Values to confirm
Numbered list.
</output_format>
