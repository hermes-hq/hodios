---
schema: 1
id: write-housing-complaint-to-authority
kind: prompt
title: Complain to the housing authority about disrepair
description: Writes a tenant's complaint to the local housing standards body, inspector or ombudsman when a landlord ignores repairs, asking for an inspection, with the evidence pack and what to expect next.
category: tenancy
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, parent, student]
subject: [law, public-sector]
requires: [none]
inputs: [notes, text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [disrepair, housing-inspection, escalation, tenant-rights, housing-standards]
pairs_with:
  prompts: [request-landlord-repair, keep-repair-evidence-log]
  personas: [tenant-rights-advisor]
args:
  - name: problem
    description: The defects, when they started, how they affect the household, every report to the landlord with dates and replies, and any evidence you hold (photos, letters, medical notes).
    type: text
    required: true
  - name: landlord_type
    description: Who the landlord is - private individual, letting agent, housing association or social landlord, council, or university - since this decides where complaints go.
    type: string
    required: true
  - name: country
    description: Country and city or region. The body that inspects rented homes and the complaint route differ by place.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Who to contact, Before you send, Complaint, Evidence pack, What happens next, Protecting yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants escalate unresolved repairs to the public body that can act, the way a housing adviser would. The right body depends on the landlord: private rentals are often inspected by a local council's housing standards or environmental health team, a building or code enforcement department, or a housing inspectorate; social landlords usually have an internal complaints process that must be used first, and then an ombudsman or regulator. Inspectors prioritise hazards to health and safety, so a complaint that names the hazard (damp and mould, cold, electrical, fire, falls, pests, sanitation), who is affected and for how long gets attention faster than a general grievance. Most bodies expect the tenant to have told the landlord in writing first and given reasonable time. In some places complaining to the authority also gives the tenant some protection against retaliatory eviction, but that protection often depends on the steps being followed in order.

<problem>
{{problem}}
</problem>

Landlord type: {{landlord_type}}
Location: {{country}}
</context>

<task>
1. Identify the likely body to contact for this landlord type in {{country}}, with alternatives, as a `[CHECK locally]` suggestion, and whether an internal complaint must come first.
2. List what to have done before sending: a written repair request with a deadline that has passed, the evidence gathered, and the landlord's last response.
3. Write the complaint: who the tenant is and the address, the landlord's details, the hazards described factually room by room, who is affected (including vulnerable occupants only if mentioned), the timeline of reports and responses, the request (an inspection and enforcement action, or for a social landlord an investigation and remedy), and availability for a visit. Under 350 words, with [BRACKETS] for gaps.
4. List the evidence pack to attach or offer: photos with dates, copies of reports and replies, a timeline, medical letters if any, and costs.
5. Explain what usually happens next, in general terms: acknowledgement, possible inspection, possible formal notice to the landlord, timescales unknown and varying.
6. List steps to protect the tenant: keep paying rent, keep records, get advice quickly if a notice to leave arrives after complaining, and contact details for free tenant advice to look up.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not name a specific body, law or deadline as certain; mark it `[CHECK locally]`.
- Do not promise an inspection, enforcement or protection from eviction.
- Use only the facts given; do not exaggerate hazards or health effects.
- If anything described is an immediate danger (gas, exposed wiring, structural collapse, no heat for a vulnerable person in freezing weather), say first to contact emergency services or the emergency line.
{{> output/uncertainty}}
</constraints>

<output_format>
## Who to contact
Likely body and alternatives, marked as checks.

## Before you send
Checklist.

## Complaint
The draft.

## Evidence pack
Checklist.

## What happens next
Short bullets.

## Protecting yourself
Bullets.
</output_format>
