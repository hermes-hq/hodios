---
schema: 1
id: plan-departing-engineer-handover
kind: prompt
title: Plan a departing engineer's handover
description: Plans the weeks before an engineer leaves with knowledge sessions, docs to write, ownership and access transfers, and a dated checklist so nothing walks out of the door.
category: planning
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [engineering-manager, tech-lead]
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
depth: specific
tags: [knowledge-transfer, offboarding, ownership-transfer, bus-factor, notice-period]
pairs_with:
  prompts: [write-ownership-handover-doc, reduce-bus-factor, map-system-ownership]
args:
  - name: engineer
    description: The departing engineer's role, what they own or know (systems, on-call, vendor contacts, ongoing projects, credentials or accounts in their name), and their remaining working days.
    type: text
    required: true
  - name: receivers
    description: Who will take over each area, if known, and their availability.
    type: text
output_contract:
  format: markdown
  sections: [Knowledge inventory, Who takes what, Plan by week, Access and accounts, Last-day checklist, After they leave]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A notice period is shorter than it looks: holidays, a farewell week and an engineer who is mentally halfway out leave fewer real days than the calendar says, and the last days are the least productive. Handovers fail when they are a single long meeting near the end, when nobody on the receiving side is named, when the departing engineer writes docs nobody reads, and when the important knowledge is tacit (why things are the way they are, which alerts can be ignored, which customer contact matters, what is half-finished). The effective pattern is: inventory early, name a receiver per area, have the receiver do the work while the departing engineer watches (driving a deploy, handling an on-call shift, running the release), and transfer accounts, keys and vendor relationships before the last week.
</context>

<task>
Departing engineer: {{engineer}}
{{#receivers}}Receivers: {{receivers}}{{/receivers}}

1. Knowledge inventory: systems owned, recurring duties (releases, on-call, reports, certificate renewals), in-flight work, tacit knowledge (history of decisions, known quirks, alerts that are noise), external relationships (vendors, customers, other teams), and anything tied to their personal identity (accounts, API keys, domains, app store or cloud accounts, scheduled jobs running under their user). Rank items by risk if lost.
2. Who takes what: a named receiver for each item; flag items with no receiver and propose one.
3. Plan by week: first week inventory and receivers; middle weeks reverse shadowing (the receiver does, the departing engineer advises), recorded walkthroughs of the riskiest systems, and docs written for specific gaps only; in-flight work finished, handed over or explicitly paused with notes; last week no new work and the final checks.
4. Access and accounts: what must be transferred to a team or service account before they leave, rotated after they leave, or revoked on the last day, coordinated with IT and security.
5. Last-day checklist.
6. After they leave: who to call with questions (agree whether they are willing to be contacted and on what terms), a review two and six weeks later of what was missed.
</task>

<constraints>
- Do not assume the engineer's willingness to help after leaving; it is their choice and may be governed by their contract.
- Credentials are transferred or rotated, never shared in docs or chat.
- Do not include HR, pay or legal steps beyond pointing to HR; this plan covers the engineering handover.
{{> output/uncertainty}}
</constraints>

<output_format>
## Knowledge inventory
Table: Item | Type | Risk if lost | Receiver.
## Who takes what
## Plan by week
Table: Week | Activities | Done when.
## Access and accounts
Table: Account or key | Action (transfer, rotate, revoke) | When | Owner.
## Last-day checklist
## After they leave
</output_format>
