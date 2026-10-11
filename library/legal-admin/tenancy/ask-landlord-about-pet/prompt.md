---
schema: 1
id: ask-landlord-about-pet
kind: prompt
title: Ask your landlord to allow a pet
description: Writes a tenant's request to keep a pet with a pet CV, the reassurances landlords care about and a proposed written addendum, and explains how assistance-animal requests may differ locally.
category: tenancy
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, student]
subject: [law]
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
tags: [pet-permission, landlord-letters, lease-addendum, assistance-animals, tenant-requests]
pairs_with:
  prompts: [review-lease, choose-pet-for-lifestyle]
  personas: [tenant-rights-advisor]
args:
  - name: pet
    description: The animal - species, breed, age, size, neutered or not, vaccinations and parasite treatment, training, temperament, how long you have had it, and references from past landlords if any.
    type: text
    required: true
  - name: tenancy
    description: What the lease says about pets, how long you have rented there, your payment record, the type of home (flat or house, garden, shared areas), and whether the building has its own rules.
    type: text
    required: true
  - name: country
    description: Country and state or region. Some places limit blanket pet bans, cap pet deposits or treat assistance animals differently. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, Pet CV, Request letter, Proposed terms, If the answer is no]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants ask for permission to keep a pet the way a tenant adviser and a reasonable landlord would both recognise. Landlords say no mostly because of fears they rarely voice: damage to floors and doors, smells and fleas at the end of the tenancy, noise complaints from neighbours, and losing a building's or insurer's approval. A request that answers those fears with evidence (a short pet CV, vaccination and flea treatment records, a reference from a past landlord, an offer of a professional clean at exit or pet insurance with liability cover) gets yes far more often. In some places landlords may not refuse unreasonably, or pet deposits are capped or prohibited, and assistance animals for disabled people are often covered by separate rules that are not "pets" at all. Keeping a pet without permission where the lease forbids it can put the tenancy at risk.

<pet>
{{pet}}
</pet>

<tenancy>
{{tenancy}}
</tenancy>
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
1. Explain where the tenant stands from the lease terms given and what may be worth checking locally `[CHECK locally]`: whether consent is required, whether the landlord can refuse unreasonably, limits on extra deposits or pet rent, building or association rules, and whether the animal is an assistance animal under separate rules.
2. Write a one-page pet CV: the animal's details, health and care, training and temperament, routine when the tenant is out, and references.
3. Draft the request letter: friendly, specific, answering the landlord's likely concerns, attaching the CV and records, proposing terms, and asking for a written reply. Under 220 words.
4. Propose terms for a short written addendum: which animal (by name and description, not "a pet"), responsibilities for damage and cleaning, flea treatment, noise, garden waste, liability insurance, and any deposit within local limits.
5. If the answer is no: ask for the reason in writing, address it, and where a local rule may require reasonable consideration or assistance-animal rules apply, point to local tenant advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest keeping a pet secretly or claiming a pet is an assistance animal when it is not; if asked, decline and explain the risk to the tenancy.
- Do not state local pet rules or deposit caps as fact; mark them `[CHECK locally]`.
- Use only the details given; put [BRACKETS] where records or references are missing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Short bullets with checks marked.

## Pet CV
Compact profile.

## Request letter
The draft.

## Proposed terms
Bullets for the addendum.

## If the answer is no
Numbered next steps.
</output_format>
