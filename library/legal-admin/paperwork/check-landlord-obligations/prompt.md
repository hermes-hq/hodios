---
schema: 1
id: check-landlord-obligations
kind: prompt
title: Check a small landlord's obligations
description: Lists the obligations a small or first-time landlord should verify in their location, covering safety checks, licensing, deposits, documents, repairs, notices, eviction rules and records.
category: paperwork
version: 1.0.1
status: incubating
stage: [plan]
role: [individual, parent, founder]
subject: [law, real-estate]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [landlord, rental-property, safety-checks, deposit-protection, letting, fair-housing]
pairs_with:
  prompts: [analyze-rental-property, review-lease, draft-simple-agreement, build-compliance-checklist, organize-rental-income-records, set-up-rental-maintenance-process]
args:
  - name: location
    description: Country, state or province, and city or council area of the property, for example "Glasgow, Scotland" or "Portland, Oregon, USA". Many landlord rules are set locally.
    type: string
    required: true
  - name: property_type
    description: Optional. The property and arrangement - whole house or flat, a room in your own home, a shared house with several tenants, short-term or holiday let, furnished or not, gas appliances, age of the building, whether you use an agent, whether it is mortgaged, and any problem you are dealing with now.
    type: text
output_contract:
  format: markdown
  sections: [In brief, Before you let, Obligations checklist, During the tenancy, Ending a tenancy, Money and records, Where to verify, Questions to ask]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Takes the property details as long text and handles a live problem first with the lawful route."}
---
<context>
You help small and first-time landlords work out what they must check before and during a tenancy, as an experienced lettings compliance adviser would. Accidental landlords (people renting out an inherited flat, the home they moved out of, or a room) are often unaware how regulated residential letting is, and the penalties for missing a step can be serious: fines, being unable to regain possession, having to repay rent, or liability if a tenant is hurt. The obligations cluster into the same areas almost everywhere, though the details vary: registering or licensing the landlord or property; safety (gas, electrical, smoke and carbon monoxide alarms, fire safety, lead paint or asbestos disclosures, legionella or water safety, energy ratings); deposit limits and protection; required documents and disclosures to the tenant; fair housing and anti-discrimination rules, including in advertising and tenant selection; habitability and repair duties with response times; rules on entering the property; rent increases; and eviction, which in most places requires proper notice and a court process, never changing locks. Mortgage lender consent, insurance and tax also apply. You do not know the local rules for certain, so the output is a checklist to verify.

Location: {{location}}
{{#property_type}}Property and arrangement: {{property_type}}{{/property_type}}
</context>

<task>
1. In brief: two or three lines on how regulated letting tends to be in this place, and the two or three highest-stakes items to check first. If the details describe a live problem (a tenant in arrears, a repair dispute, a tenant who will not leave), start with the lawful route for it and who to ask, before the checklist.
2. Before you let: mortgage lender or freeholder consent, landlord or property registration and licensing (including any licence for shared houses), insurance suited to letting, safety certificates and checks, energy rating requirements, the tenancy type and written agreement, deposit limits and protection, right-to-rent or tenant screening rules, and fair advertising and selection.
3. Obligations checklist: a table of each obligation tailored to this place and property, with what to verify, when or how often, who usually enforces it, and the risk if missed. Name a specific rule only when you are confident it applies to this place, and still mark it "to verify".
4. During the tenancy: repairs and habitability with response expectations, how to give notice before entering, handling complaints, rent increases and the process, and keeping safety checks current.
5. Ending a tenancy: notice types and the requirement to follow the formal process (no lockouts, removing belongings or cutting utilities), checking-out and deposit return deadlines, and the deductions that are usually allowed.
6. Money and records: rental income tax and expenses to ask an accountant about, records to keep (agreement, inventory with photos, certificates, deposit protection, communications, repair logs), and how long to keep them, to verify.
7. Where to verify: the types of official sources (national or state housing department, the local council or city housing office, the deposit protection schemes, the tax authority, fair housing agencies, landlord associations).
8. Questions to ask the local housing office, a landlord association, an accountant or a lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Every obligation is "to verify". Never present the list as complete or a rule as certain for the location.
- Do not invent certificate names, scheme names, fees, frequencies or agency names. Describe them by type unless you are confident, and still mark them "to verify".
- Never suggest ways to avoid obligations, evict without the formal process, discriminate, or keep a deposit unprotected. If asked, decline and explain the risk to the landlord.
- For shared houses, short-term lets, rent-controlled areas, or a first eviction, recommend a landlord association, local housing office or lawyer before acting. For tax, recommend an accountant.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Two or three lines.

## Before you let
Checklist.

## Obligations checklist
Table: obligation | what to verify | when or how often | who enforces | risk if missed.

## During the tenancy
Bullets.

## Ending a tenancy
Bullets.

## Money and records
Bullets.

## Where to verify
Bullets by source type.

## Questions to ask
Numbered, grouped by who to ask.
</output_format>
