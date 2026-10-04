---
schema: 1
id: write-tenant-welcome-pack
kind: prompt
title: Write a tenant welcome pack
description: Writes a welcome pack for new tenants covering repairs, emergencies, utilities and meters, bins, appliances, house rules and moving out, built only from the details the landlord gives.
category: operations
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, individual]
subject: [real-estate]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [property-management, landlord, tenant-onboarding, welcome-pack, move-in]
pairs_with:
  prompts: [set-up-rental-maintenance-process, write-property-inspection-report, check-landlord-obligations]
  personas: [property-manager]
args:
  - name: property
    description: Details of the home - type, heating and hot water system, where the stopcock, fuse box and meters are, appliances, bin collection days, parking, internet, and anything quirky that new tenants should know.
    type: text
    required: true
  - name: landlord_contacts
    description: How tenants reach the landlord or agent for routine repairs and for emergencies, office hours, and any contractors tenants may call directly.
    type: text
    required: true
  - name: rules
    description: Optional. House rules from the tenancy agreement or building - pets, smoking, decorating, subletting, quiet hours, shared areas.
    type: text
  - name: location
    description: Optional. Town and country, used to name the right emergency numbers and local terms; without it they are left as placeholders.
    type: string
output_contract:
  format: markdown
  sections: [Welcome, Key contacts, In an emergency, Reporting repairs, Utilities and meters, Bins and recycling, Heating and appliances, Safety in your home, House rules, Access and inspections, Moving out, Note for the landlord]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write tenant welcome packs for landlords and letting agents. New tenants are given a stack of documents on move-in day and remember almost none of it; the welcome pack is what they open at 10 p.m. when water is coming through the ceiling. So it must be scannable, plain-spoken and specific to this home: where the stopcock is, what counts as an emergency, who to call, and what happens if nobody answers. It is a practical guide, not a legal document, and it must never contradict or replace the tenancy agreement.

<property>
{{property}}
</property>

<landlord_contacts>
{{landlord_contacts}}
</landlord_contacts>
{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}
{{#location}}
Location: {{location}}
{{/location}}
</context>

<task>
1. If there is no way for tenants to report an emergency in the landlord contacts, ask for one and stop; a pack without an emergency route is unsafe.
2. Write a short, warm welcome and a contacts box: routine repairs, emergencies, out-of-hours, and response times. Response times not given become `[CONFIRM]`.
3. Write "In an emergency" first among the practical sections: what counts (gas smell, fire, flooding, no heating in freezing weather, electrical danger, a break-in), the first action for each (for gas: no switches or flames, open windows, leave, call the gas emergency line; for fire: get out and call the emergency services), where the stopcock and fuse box are, and then who to call. Use the emergency numbers for {{location}} if known, otherwise `[EMERGENCY NUMBER]` and `[GAS EMERGENCY LINE]`.
4. Explain how to report a repair: the channel, what to include (photos, access times, pets), and what happens next.
5. Cover utilities and meters (who pays what, suppliers if known, meter locations, taking a reading on move-in day), bins and recycling, heating, hot water and each appliance (how to use, common faults, how to avoid condensation and mould with ventilation and heating).
6. Cover safety: test smoke and carbon monoxide alarms monthly and report faults at once.
7. Summarise the house rules from the rules provided, in plain words, and say the tenancy agreement takes precedence.
8. Explain access and inspections in general terms: notice will be given before visits `[CHECK: notice period in the agreement and local rules]`.
9. Write the moving-out section: giving notice as the agreement sets out, the checkout inspection, cleaning standard, returning keys, final meter readings and forwarding address.
10. Add a note for the landlord (not part of the pack): every `[ADD]`, `[CONFIRM]` and `[CHECK]` item, and a reminder that documents the law may require them to give tenants at the start of a tenancy are separate from this pack `[CHECK locally]`.
11. Before writing the final version, check that every location, number and day in the pack came from the input or is a placeholder.
</task>

<constraints>
- Never invent where things are, contact numbers, collection days or supplier names. Missing details become `[ADD: …]`.
- Plain language, short sentences, headings tenants can scan. Avoid legal jargon.
- House rules must be fair and lawful as written in the agreement; do not add new rules or penalties. If a supplied rule looks unlawful or unenforceable (for example banning all visitors), flag it in the landlord note instead of including it.
- Keep it to what a tenant needs; do not include the landlord's personal details beyond the contact routes supplied.
</constraints>

<output_format>
Markdown with the headings in the output contract, in that order. "In an emergency" in a short numbered list. "Note for the landlord" at the end, clearly separated with a horizontal rule.
</output_format>
