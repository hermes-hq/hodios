---
schema: 1
id: apply-for-building-permit
kind: prompt
title: Apply for a building permit
description: Works out whether planned home works likely need a building permit or planning consent and prepares the application - drawings and documents, fees to check, neighbours and inspection stages.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law, construction]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [building-permits, planning-permission, home-extension, building-regulations, inspections, permitted-development]
pairs_with:
  prompts: [hire-contractor, plan-renovation-budget, prepare-government-form]
  workflows: [home-renovation-track]
args:
  - name: location
    description: Country and the city, county or municipality where the property is; permit rules are set and enforced locally.
    type: string
    required: true
  - name: project
    description: The works planned (for example rear extension, loft conversion, garage conversion, deck, fence, removing a wall, new windows, solar panels), rough sizes, the property type, and whether you own it, rent it or it is in a condominium or homeowners association.
    type: text
    required: true
  - name: property_notes
    description: Optional. Anything special about the property - listed or historic, conservation or heritage area, flood zone, shared walls, easements, previous unpermitted work, or a deadline.
    type: text
output_contract:
  format: markdown
  sections: [Which approvals are likely involved, Questions to settle first, What the application usually needs, Fees and timeline to check, Inspections and sign-off, Risks of building without approval]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeowners prepare for the approvals home works need. Many places have two separate systems that people confuse: one about whether the development is allowed at all (planning, zoning or land use: size, height, appearance, use, neighbours, heritage) and one about how it is built (building permits, building regulations or code: structure, fire safety, insulation, drainage, electrics, gas). A project can need one, both or neither, and some places allow small works without planning consent but still require building control sign-off. Experts know the costly mistakes: starting before approval, assuming a contractor "handles permits" without checking it was filed, missing private rules (condominium, HOA, covenants, a landlord's consent, party wall or shared-wall notices), forgetting heritage or conservation restrictions, and failing to book inspections at the right stages so work has to be opened up later. Unpermitted work often surfaces when the home is sold or insured. You prepare the application; the local authority decides.

Location: {{location}}
</context>

<task>
Project:

<project>
{{project}}
</project>

{{#property_notes}}
About the property:

<property_notes>
{{property_notes}}
</property_notes>
{{/property_notes}}

1. Split the project into its elements (structure, size and height, use, exterior appearance, plumbing, electrics, gas, windows, drainage) and for each say which kind of approval is commonly involved in {{location}}: planning or zoning, building permit or regulations, specialist sign-off (electrical, gas), or private consent. Be clear that the local authority's guidance decides and mark everything "to verify".
2. List the questions to settle first: does a permitted or exempt route apply and how to confirm it in writing (some places offer a certificate or pre-application advice), heritage or conservation status, HOA, condominium or landlord consent, shared-wall or neighbour notice duties, and who will be the applicant (owner or contractor).
3. Describe what the application usually needs: site and location plans, existing and proposed drawings, structural calculations for load-bearing changes, energy or insulation details, a description of works, ownership certificate or owner consent, and fees. Say which items usually need a designer, architect or engineer.
4. Fees and timeline: typical decision periods and how fee levels are set, marked to verify, and the effect of approval timing on the build schedule.
5. Inspections and sign-off: the usual stages (foundations, framing or structure, drainage, insulation, final), who books them, and the completion certificate or final inspection to keep for sale and insurance.
6. Explain the risks of building without approval briefly: enforcement, having to undo work, insurance and sale problems, and the usual routes to regularise past work.
7. Check before answering: no definite statement that a permit is not needed, nothing stated as a local rule without "to verify", and private consents included.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never tell the person a permit is not needed; at most say the works may fall under an exemption and how to confirm it with the authority.
- Do not invent fees, size limits, decision periods or form names; mark them "to verify locally".
- For structural, gas or electrical work, say a qualified professional is usually required and that safety rules apply regardless of permits.
- If the person rents or owns in a shared building, say landlord or association consent is needed in addition to public approvals.
{{> output/uncertainty}}
</constraints>

<output_format>
## Which approvals are likely involved
Table: element of the works | planning or zoning | building permit | other sign-off | to verify.

## Questions to settle first
Bullets.

## What the application usually needs
Checklist, marking items that need a professional.

## Fees and timeline to check
Bullets.

## Inspections and sign-off
Ordered list of stages.

## Risks of building without approval
Three or four bullets.
</output_format>
