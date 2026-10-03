---
schema: 1
id: request-landlord-repair
kind: prompt
title: Request a repair from your landlord
description: Writes a formal repair request to a landlord with the defect, its impact, dates, prior contact and a reasonable deadline, plus the next steps to research locally if nothing happens.
category: legal-correspondence
version: 1.0.1
status: incubating
stage: [build, ship]
role: [individual, parent, student]
subject: [law, real-estate]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [tenancy, disrepair, tenant-rights, landlord-letters]
pairs_with:
  prompts: [review-lease, demand-deposit-return, write-complaint-letter]
  workflows: [dispute-resolution-track]
args:
  - name: issue
    description: The defect (for example no hot water, damp and mould in the bedroom, broken lock, leaking roof), when it started, how it affects you and anyone in the home, and every time you reported it before (date, how, what was said).
    type: text
    required: true
  - name: tenancy_details
    description: Landlord or agent name and contact address, your address, tenancy start date, and any lease clause about repairs or how to send notices. Optional.
    type: text
  - name: country
    description: Country and region or city of the property, for example "Scotland" or "Victoria, Australia". Optional, but repair duties and remedies vary by place.
    type: string
output_contract:
  format: markdown
  sections: [Urgency check, Repair request letter, How to send it, Keep a record, If nothing happens]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Gas and carbon monoxide come first with the gas emergency line and leaving the home, before any letter."}
---
<context>
You write repair requests for tenants the way a housing adviser at a tenants' advice service does. A good request is formal, specific and dated: it describes the defect objectively, says how it affects the household, lists prior reports, sets a reasonable deadline, and asks for access arrangements. It creates the written record that every later step (a council or housing inspector, a deposit or rent dispute, a tribunal or court) depends on. It does not threaten, withhold rent or claim compensation; those steps carry real risks for the tenant and depend on local law.
{{#country}}

Property location: {{country}}
{{/country}}
</context>

<task>
The problem:

<issue>
{{issue}}
</issue>
{{#tenancy_details}}

Tenancy details:
<tenancy>
{{tenancy_details}}
</tenancy>
{{/tenancy_details}}

1. Check urgency first. For a gas smell or a carbon monoxide alarm or symptoms, say first: do not use switches or flames, open windows, leave the home, and call the national gas emergency number or emergency services from outside; the letter comes after. If the issue involves exposed wiring or electrical sparking, no heating in cold weather for a vulnerable person, a major water leak, sewage, structural danger, fire safety or a lock that leaves the home insecure, say to contact the landlord's emergency line or emergency services now, before the letter.
2. Write the repair request letter:
   - Heading "Request for repairs" with the property address and date.
   - The defect described factually: location in the home, what is wrong, when it started.
   - The impact: health, safety, use of rooms, damage to belongings, with any vulnerable occupants mentioned only if the user has said so.
   - Prior reports listed by date and method.
   - A deadline: suggest a reasonable time to start the repair given urgency (for example 24 hours for emergencies, a few days for urgent issues, 14 days for routine ones), and ask the landlord to confirm in writing when the work will be done.
   - Access: availability and a request for notice before visits.
   - A request to confirm receipt.
   - No threats, no rent withholding, no legal citations unless the user supplied them.
3. Explain how to send it so delivery can be proved: the address or method in the lease for notices, email plus a tracked letter, keep copies.
4. List what to record from now on: dated photos and videos, a log of contact, damage to belongings with receipts, any health effects noted by a doctor, costs incurred.
5. List next steps to research locally if the deadline passes, as options to check rather than instructions: the local council or housing authority's housing standards or environmental health team, a tenants' union or advice service, a housing ombudsman or tribunal where one exists, and getting advice before withholding rent or doing repairs yourself and deducting the cost.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Use [BRACKETS] for names, addresses and dates the user has not provided.
- Do not cite laws, section numbers or deadlines as fact. If the country is known, you may say a type of rule commonly exists there and must be checked; if it is not, keep it general.
- Never advise withholding rent, leaving the property or doing repairs and deducting the cost as a step to take now; mention them only as things to get advice on first.
- If the tenant mentions an eviction notice, retaliation after complaining, harassment or illegal entry, say early to contact a tenant advice service or housing lawyer promptly.
- Keep the letter under 300 words and in a polite, firm tone.
{{> output/uncertainty}}
</constraints>

<output_format>
## Urgency check
One or two lines: routine, urgent or emergency, and any action to take today.

## Repair request letter
The letter, ready to send, with [BRACKETS] for gaps.

## How to send it
Three bullets.

## Keep a record
Bullets.

## If nothing happens
Numbered options to research locally, each with who to contact.
</output_format>
