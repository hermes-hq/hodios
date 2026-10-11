---
schema: 1
id: plan-acquisition-integration
kind: prompt
title: Plan the integration of an acquired company
description: Plans integrating an acquired company - day-one checklist, 100-day plan, people, customers, systems and synergies with owners, plus what to leave alone.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [executive, operations-manager, founder, project-manager]
advice_risk: [legal]
requires: [none]
inputs: [text, document, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [post-merger-integration, day-one, hundred-day-plan, synergies, integration-management]
pairs_with:
  prompts: [screen-acquisition-targets, harmonise-terms-after-acquisition, plan-brand-merger, build-strategy-presentation]
args:
  - name: deal
    description: Who bought whom, why (the deal thesis), sizes of both companies, completion date, expected synergies, and any promises made to the seller, staff or customers.
    type: text
    required: true
  - name: companies
    description: How each company works - structure, key people, systems, customers, culture, locations - and known overlaps or risks. Optional but improves the plan.
    type: text
output_contract:
  format: markdown
  sections: [Integration approach, Day-one checklist, First 100 days, People and culture, Customers, Systems and operations, Synergy tracker, Governance and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan post-acquisition integration. Value from an acquisition is mostly won or lost in the first months: key people leave because nobody told them anything, customers are poached by rivals during the uncertainty, systems are merged too fast and orders go missing, and promised synergies never get an owner. The level of integration should follow the deal thesis: a capability purchase may need light touch to keep what made the company valuable, while a scale deal needs full consolidation. Day one is about continuity and communication: everyone gets paid, customers are served, people know who their manager is. Revenue synergies are usually slower and less certain than cost synergies, and both need named owners and tracking.
</context>

<task>
Plan the integration:

<deal>
{{deal}}
</deal>
{{#companies}}

<companies>
{{companies}}
</companies>
{{/companies}}

{{> guardrails/professional-limits}}

1. Integration approach: choose the level (preserve, partial, full absorption) for each area (brand, leadership, sales, operations, back office, systems) from the deal thesis, and explain why.
2. Day-one checklist: legal and banking continuity, payroll, access and security, announcements to staff, customers and suppliers, key-person conversations, decision rights.
3. First 100 days: workstreams with owners and milestones at day 30, 60 and 100, ordered so that customer and people continuity come before system changes.
4. People and culture: retention of key people (identified by role), communication cadence, how roles and reporting lines will be decided, culture differences to manage. Flag that any change to terms, roles or redundancies requires HR and legal advice under local law.
5. Customers: which accounts are at risk, who contacts them and when, how to handle overlapping accounts and pricing differences.
6. Systems and operations: what to keep running in parallel, what to integrate and when, with cut-over risks.
7. Synergy tracker: each synergy from the deal with value (as given), owner, timing, one-off cost to achieve, and the measure.
8. Governance and risks: an integration lead, weekly steering, a risk log with the top five risks and mitigations.
</task>

<constraints>
- Use only the facts given; do not invent synergy values, people or systems. Leave gaps as [X].
- Keep any promises made to the seller, staff or customers, and flag where the plan might conflict with them.
- Do not advise on contract law, employment law or competition clearance; list them for advisers.
- Before completion, competitors may not coordinate as if already merged; flag "gun-jumping" rules for legal advice if completion has not happened.
{{> output/uncertainty}}
</constraints>

<output_format>
## Integration approach
Table: Area | Level | Why.

## Day-one checklist
Checklist grouped by area.

## First 100 days
Table: Workstream | Owner | Day 30 | Day 60 | Day 100.

## People and culture
Bullets including key-person retention and advice flags.

## Customers
Bullets and an at-risk accounts approach.

## Systems and operations
Table: System or process | Keep, integrate or replace | When | Risk.

## Synergy tracker
Table: Synergy | Value | Owner | Timing | Cost to achieve | Measure.

## Governance and risks
Bullets and top-five risk table.
</output_format>
