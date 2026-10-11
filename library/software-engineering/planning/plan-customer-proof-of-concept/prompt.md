---
schema: 1
id: plan-customer-proof-of-concept
kind: prompt
title: Plan a customer proof of concept
description: Plans a time-boxed proof of concept for a prospect with success criteria agreed up front, scope, environment, data, owners on both sides and a decision meeting.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, sales-rep, consultant, product-manager]
stack: []
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [poc, pilot, success-criteria, sales-engineering, technical-evaluation, b2b]
pairs_with:
  prompts: [plan-spike, plan-prototype-to-production]
args:
  - name: prospect
    description: Who the prospect is, what problem they want solved, who decides, and what they have said about evaluating.
    type: text
    required: true
  - name: product
    description: What your product does, how it is deployed, and what it would need from the prospect (data, access, integration).
    type: text
    required: true
  - name: weeks
    description: Time box for the proof of concept.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Purpose and decision, Success criteria, Scope, Environment and data, Plan by week, Owners, Risks and exit rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most customer proofs of concept fail for reasons that have nothing to do with the product: success was never defined, so the evaluation drifts into a free pilot with no end; the prospect's security review, data access or integration owner appears in week three; the people who decide never see the result; or the scope grows into custom engineering nobody priced. A good proof of concept tests the two or three things the buyer is unsure about, with measurable criteria both sides sign before work starts, a fixed time box, named owners on the customer side, realistic but limited data, and a decision meeting already in the calendar.
</context>

<task>
Prospect: {{prospect}}
Product: {{product}}
Time box: {{weeks}} weeks.

1. Purpose and decision: state the business question the proof of concept answers, who makes the decision, and what happens if it passes (for example a purchase, a paid pilot, a security review). If the decision path is unknown, say that is the first thing to find out.
2. Success criteria: three to five criteria, each measurable with a target and a method (for example "matches 95% of 500 sample invoices, checked by their AP lead"). Separate must-pass from nice-to-have. Mark targets you cannot know as [X] to agree with the customer.
3. Scope: what is in, and explicitly what is out (custom features, production integration, scale testing beyond stated volumes). Note any engineering work it requires from your side and whether it is reusable.
4. Environment and data: hosted by whom, access and accounts needed, sample data and how it is anonymised or approved, security and legal steps (NDA, data processing terms, security questionnaire) and their lead time.
5. Plan by week: setup, a mid-point check against criteria, final results, decision meeting.
6. Owners: a named role on each side for every activity, including the customer's technical owner and the decider.
7. Risks and exit rules: what ends the proof of concept early, what you do if criteria are missed narrowly, and how to stop it turning into unpaid ongoing use.
</task>

<constraints>
- Do not invent customer names, figures or targets; use [X] and say what to agree.
- Keep the scope to what tests the buyer's real doubts; push back on scope that is free custom development.
- Do not promise product capabilities not described in the product input.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose and decision
## Success criteria
Table: Criterion | Target | How measured | Must-pass?
## Scope
In and out lists.
## Environment and data
Checklist with lead times.
## Plan by week
Table: Week | Activities | Owner | Checkpoint.
## Owners
Table: Activity | Our side | Customer side.
## Risks and exit rules
Bullets.
</output_format>
