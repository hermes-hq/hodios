---
schema: 1
id: request-consent-to-sublet
kind: prompt
title: Ask your landlord's consent to sublet
description: Prepares a tenant's request to sublet, take in a lodger or swap a flatmate, explaining the tenant's ongoing liability, the risks to check, and writing the consent request and an agreement checklist.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, student]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, checklist, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [subletting, lodger, flatmate-change, landlord-consent, tenant-requests]
pairs_with:
  prompts: [review-lease, write-house-share-agreement]
  personas: [tenant-rights-advisor]
args:
  - name: plan
    description: What you want to do - sublet the whole home while away (dates), rent out a room to a lodger, or replace a leaving flatmate - and who the person is in general terms.
    type: text
    required: true
  - name: lease
    description: What the lease says about subletting, lodgers, assignment, occupants and guests, plus who is named on it.
    type: text
    required: true
  - name: country
    description: Country and state or region. Subletting rights, consent rules and short-let restrictions vary.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Which arrangement this is, What you stay responsible for, Risks to check, Consent request, Agreement checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants arrange a sublet or a change of occupant without endangering their own tenancy. The words matter: a lodger usually shares the home with the tenant; a subtenant rents part or all of it and may gain rights of their own; an assignment or a new joint tenancy changes who the landlord's tenant is. Most leases restrict at least one of these, and subletting without consent is a common ground for ending a tenancy. Even with consent, the original tenant usually stays liable to the landlord for rent and damage, so a subtenant who stops paying or wrecks the place is the tenant's problem. Some places give tenants a right to sublet or take a lodger that a landlord cannot unreasonably refuse; some cities restrict short-term sublets or how much a tenant may charge.

<plan>
{{plan}}
</plan>

<lease>
{{lease}}
</lease>

Location: {{country}}
</context>

<task>
1. Identify which arrangement this is (lodger, sublet of a room, sublet of the whole home, flatmate replacement by new agreement or assignment) and why it matters.
2. Explain what the tenant stays responsible for: rent, damage, the subtenant's behaviour, ending the arrangement, deposit.
3. List risks to check locally, each marked `[CHECK locally]`: lease terms and whether consent can be unreasonably refused, short-let or sublet rules in the city, limits on what the tenant may charge, the subtenant's or lodger's rights and how they can be asked to leave, tax on income received, insurance, and any landlord registration triggered.
4. Draft a consent request to the landlord: what is proposed, dates, who the occupant is in general terms and the checks the tenant will do, how rent will continue to be paid, and a request for written consent. Under 200 words.
5. Give a checklist for the agreement between the tenant and the occupant: rent and deposit, dates, house rules, what happens at the end, references and identity checks, inventory, and a copy of the landlord's consent.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest subletting or listing on a short-let platform without consent where the lease requires it, or hiding an occupant from the landlord.
- Do not state subletting rights or caps as fact; mark them `[CHECK locally]`.
- Do not ask for or record more personal data about the occupant than the plan needs.
{{> output/uncertainty}}
</constraints>

<output_format>
## Which arrangement this is
Two or three lines.

## What you stay responsible for
Bullets.

## Risks to check
Checklist marked `[CHECK locally]`.

## Consent request
The draft.

## Agreement checklist
Checklist.
</output_format>
