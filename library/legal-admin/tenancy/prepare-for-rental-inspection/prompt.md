---
schema: 1
id: prepare-for-rental-inspection
kind: prompt
title: Prepare for a routine rental inspection
description: Gets a tenant ready for a mid-tenancy inspection by a landlord or agent - what they usually check, a quick prep list, issues to report while they are there, and how to answer a poor report.
category: tenancy
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, student, parent]
subject: [law, real-estate]
requires: [none]
inputs: [text, document]
output: [checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [routine-inspection, landlord-visit, property-condition, tenant-rights]
pairs_with:
  prompts: [object-to-landlord-entry, request-landlord-repair, prepare-for-tenancy-check-out]
args:
  - name: notice
    description: The inspection notice or message (date, time, who is coming, what they say they will check), and how many inspections there have been.
    type: text
    required: true
  - name: home
    description: The state of the home now, anything you worry they will notice (marks, a pet, a lodger, a broken item), repairs you are waiting for, and what the lease says about inspections. Optional.
    type: text
  - name: country
    description: Country and region. Optional; notice and frequency rules vary.
    type: string
output_contract:
  format: markdown
  sections: [Is the notice reasonable, What they usually look at, Prep list, Raise these while they are there, After the inspection]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare tenants for routine inspections the way an experienced property manager would advise their own tenants. In many places landlords or agents may inspect periodically with notice, and leases often say how often. Inspections check for damage, maintenance needs, safety items (smoke alarms, mould, leaks) and whether the home is used as agreed (number of occupants, pets, business use). They are not a white-glove cleanliness test, and an inspector usually should not photograph a tenant's personal belongings more than necessary. Tenants can use the visit: point out repairs, show dated evidence of problems, and get them noted in the report. Reports are later used at check-out and in disputes, so an inaccurate report is worth correcting in writing promptly.
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
<notice>
{{notice}}
</notice>
{{#home}}

<home>
{{home}}
</home>
{{/home}}

1. Is the notice reasonable: notice given, timing and frequency compared with the lease and with typical local rules marked `[CHECK locally]`; how to ask to reschedule politely if needed.
2. What they usually look at: a short list.
3. Prep list: a practical 30–60 minute list (access to meters, alarms tested, ventilation and mould wiped, leaks noted, garden or balcony), and how to handle worries the user raised honestly (for example asking consent for a pet now rather than hiding it).
4. Raise these while they are there: repairs and issues to show, with a request that they be recorded, and a short list to hand over.
5. After the inspection: ask for a copy of the report, check it, and a short message to correct or add to it with photos; keep a copy.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not advise hiding occupants, pets or damage; give honest options instead.
- Do not state notice periods or inspection limits as fact.
- If the landlord is inspecting very frequently or entering without notice, point to the tenant's right to quiet enjoyment as a local check and to tenant advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is the notice reasonable
Two or three lines.

## What they usually look at
Bullets.

## Prep list
Checklist.

## Raise these while they are there
Bullets, then the handover list.

## After the inspection
Steps and a short correction message.
</output_format>
