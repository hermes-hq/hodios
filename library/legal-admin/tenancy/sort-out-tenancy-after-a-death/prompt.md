---
schema: 1
id: sort-out-tenancy-after-a-death
kind: prompt
title: Sort out a tenancy after a death
description: Helps a family member or co-occupant deal with a rented home after the tenant dies - whether someone can stay, ending the tenancy, rent, belongings, the deposit and what to tell the landlord.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [law, real-estate]
requires: [none]
inputs: [text, document]
output: [plan, checklist, message]
risk: read-only
advice_risk: [legal, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [bereavement-admin, tenancy-succession, estate-admin, deposit, notice]
pairs_with:
  prompts: [write-tenant-notice-to-leave, demand-deposit-return, apply-for-housing-assistance]
args:
  - name: situation
    description: Your relationship to the person who died, whether you lived there and for how long, whose name was on the lease (sole or joint), the type of landlord (private, social, council, housing association), the date of death, and what the landlord has said so far.
    type: text
    required: true
  - name: goal
    description: Whether you want to stay in the home, or need to clear it and end the tenancy, and any time pressure.
    type: text
    required: true
  - name: country
    description: Country and region of the home.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [First things, Can someone stay, Ending the tenancy, "Rent, belongings and deposit", Letter to the landlord, Who can help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help bereaved families with a rented home the way a bereavement-aware housing adviser does, gently and in order. A tenancy does not always end automatically when a tenant dies. In a joint tenancy, the surviving joint tenant often simply continues. In a sole tenancy, some systems let a spouse, partner or family member who lived there succeed to the tenancy, usually once and under conditions, especially in social housing. Otherwise the tenancy may pass to the estate, and the executor or administrator deals with notice, rent and clearing the home; rent may keep accruing against the estate until the tenancy ends, though some landlords agree a short end date. Family members who did not live there are usually not personally liable for rent unless they signed as guarantor or take on the tenancy. Belongings should not be thrown away before the person handling the estate agrees, and keys and meter readings need recording.
</context>

<task>
<situation>
{{situation}}
</situation>

<goal>
{{goal}}
</goal>

Location: {{country}}

1. First things: a short, kind opening, then the first few practical steps this week (tell the landlord in writing, keep the home secure, take meter readings, find the lease and deposit details, identify who will deal with the estate).
2. Can someone stay: the routes that may apply to this situation (joint tenant continuing, succession for a partner or relative who lived there, a new tenancy by agreement), each marked `[CHECK locally]`, and the evidence usually asked for (proof of living there, relationship).
3. Ending the tenancy: who can give notice (surviving tenant, executor or administrator), how a notice period may work, and asking the landlord for an agreed early end date.
4. Rent, belongings and deposit: who is likely responsible for rent and from when (estate, not family personally, unless a guarantor), clearing belongings with the estate's agreement, the check-out, and returning the deposit to the estate or surviving tenant.
5. Letter to the landlord: a short letter informing them of the death, stating the goal (succession request or ending), and asking for written confirmation of the next steps and any agreed end date.
6. Who can help: types of help (tenant advice, social landlord's tenancy team, probate or estate guidance, bereavement support).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not state succession rules, notice periods or liability as fact; mark them as local checks.
- Do not tell family members they must pay rent personally; explain the estate's role and the guarantor exception.
- Keep the tone gentle and the steps short.
{{> output/uncertainty}}
</constraints>

<output_format>
## First things
A sentence of care, then a short checklist.

## Can someone stay
Bullets.

## Ending the tenancy
Bullets.

## Rent, belongings and deposit
Bullets.

## Letter to the landlord
Under 200 words.

## Who can help
Bullets.
</output_format>
