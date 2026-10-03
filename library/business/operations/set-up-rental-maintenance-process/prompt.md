---
schema: 1
id: set-up-rental-maintenance-process
kind: prompt
title: Set up a rental maintenance request process
description: Sets up a maintenance request process for a small landlord or property manager - intake, urgency triage, contractor dispatch, tenant updates, records and preventive checks.
category: operations
version: 1.0.0
status: incubating
stage: [design, operate]
role: [operations-manager, founder, individual]
subject: [real-estate]
inputs: [notes, text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [property-management, landlord, maintenance-requests, repair-triage, contractors, tenant-communication]
pairs_with:
  prompts: [check-landlord-obligations, plan-equipment-maintenance, compare-vendors, write-sop]
args:
  - name: properties
    description: The portfolio - number and type of units, locations, age and known problem areas (old boiler, damp), who manages day to day, and how requests arrive now (texts, calls, email).
    type: text
    required: true
  - name: contractors
    description: Contractors you use now by trade, any you lack, and whether anyone can approve spending when you are away.
    type: text
output_contract:
  format: markdown
  sections: [Intake, Triage, Dispatch and approval, Tenant updates, Records, Preventive checks, Contractor list, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up maintenance operations for small landlords and property managers with a handful to a few dozen units. Without a process, requests arrive by text at 11 p.m., urgent jobs wait behind cosmetic ones, tenants chase for updates, nobody knows whether the contractor turned up, and there is no record when a dispute or an inspection comes. A simple process fixes this: one intake route, an urgency scale with response targets, pre-agreed contractors and spending limits, standard tenant updates and a log. Landlords' repair duties and response times are set by local law and the tenancy agreement, so you design the process and mark every legal point to check.
</context>

<task>
Set up a maintenance request process.

<properties>
{{properties}}
</properties>
{{#contractors}}
<contractors>
{{contractors}}
</contractors>
{{/contractors}}

1. Intake: one route for routine requests (a form or a dedicated email or number) and a separate always-on route for emergencies, with what the tenant must include (unit, problem, photos, access times, pets) and an automatic acknowledgement.
2. Triage: an urgency scale, for example Emergency (danger to people or serious damage: gas smell, no heat in cold weather, flooding, electrical danger, security breach), Urgent, Routine and Planned, with examples for this portfolio and a response target for each marked `[CHECK: local law and tenancy agreement]`. Include the instruction to give tenants for real emergencies: call the emergency services or gas emergency line first where relevant, then report.
3. Dispatch and approval: who decides, contractor choice by trade, spending limit without approval, quotes above it, how access is arranged with the tenant (notice rules to check), and confirmation that the job was done (photos, tenant sign-off).
4. Tenant updates: message templates for received, scheduled, contractor coming, completed with a check-in, and delayed with a reason and a new date.
5. Records: a maintenance log (columns), where invoices, photos and certificates are kept, and how long, plus what to record when a tenant reports damp, mould or a safety issue.
6. Preventive checks: a seasonal schedule for this portfolio (heating service, gutters, smoke and carbon monoxide alarms, safety certificates that may be required, inspections), with legal requirements marked to check.
7. Contractor list: the trades needed, gaps to fill, and what to agree with each (call-out rates, response times, insurance, invoicing).
</task>

<constraints>
- Never state a landlord's legal duty, repair deadline, notice period or required certificate as fact; mark each `[CHECK: …]` and say to confirm with the tenancy agreement, local housing authority or a property law adviser.
- The emergency route must never depend on the owner seeing an email; give a phone-based fallback.
- Treat damp, mould, gas, electrical, fire safety and water leaks as safety issues, never cosmetic.
- Size the process to the portfolio; one landlord with four flats does not need software, but say when a tool would start to help.
</constraints>

<output_format>
## Intake
## Triage
Table: Level | Examples | Response target | Who acts.
## Dispatch and approval
Numbered steps, with the spending limit as `[DEFINE]` if not given.
## Tenant updates
Five short messages.
## Records
Log columns as a table header, then rules.
## Preventive checks
Table: Check | When | Who | Legal requirement to check.
## Contractor list
Table: Trade | Current | Gap | Terms to agree.
## Questions
At most four.
</output_format>
