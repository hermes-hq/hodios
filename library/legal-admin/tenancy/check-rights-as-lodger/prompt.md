---
schema: 1
id: check-rights-as-lodger
kind: prompt
title: Check your rights as a lodger or room renter
description: Works out what kind of arrangement someone renting a room in a shared or owner-occupied home is likely in, what that usually means for notice, deposit and privacy, and what to put in writing.
category: tenancy
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual, student]
subject: [law, real-estate]
requires: [none]
inputs: [text, document]
output: [explanation, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [lodger, room-rental, house-share, licence-to-occupy, notice]
pairs_with:
  prompts: [review-lease, demand-deposit-return, write-house-share-agreement]
  personas: [tenant-rights-advisor]
args:
  - name: arrangement
    description: Who owns or rents the home, whether they live there, what you share (kitchen, bathroom, living room), whether you have a lock on your room, what you pay and what it includes, whether there is a written agreement, and how long you have been there.
    type: text
    required: true
  - name: issue
    description: What prompted the question - being told to leave, a deposit, the owner entering your room, house rules, a rent rise. Optional.
    type: text
  - name: country
    description: Country and region.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What you are likely to be, What that usually means, Your issue, What to get in writing, Where to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people renting a room work out where they stand, the way a tenant adviser does. The label on the agreement matters less than the facts. Many systems treat these situations differently: a lodger living with a resident owner, a subtenant renting from a tenant who lives there, a room-by-room tenant in a shared house whose landlord lives elsewhere, and a joint tenant on one lease with others. Lodgers living with the owner often have fewer protections, and in some places can be asked to leave with only reasonable notice and without a court order; room tenants in a house the landlord does not live in may have the same protections as other tenants. Subletting from a tenant can leave the subtenant exposed if the head tenancy ends or subletting was not allowed. Deposit protection rules may or may not apply. Privacy in one's own room, what the payment includes, and notice should be clear in writing whatever the category.
</context>

<task>
<arrangement>
{{arrangement}}
</arrangement>
{{#issue}}

<issue>
{{issue}}
</issue>
{{/issue}}

Location: {{country}}

1. What you are likely to be: the categories that commonly exist, and which this arrangement looks closest to and why, with the facts that would change the answer. Say the final answer needs a local check `[CHECK locally]`.
2. What that usually means: for that category, notice to leave, eviction process, deposit protection, entry to the room, rent increases and repairs, all as general patterns to verify.
3. Your issue: apply this to their question, if given, with the next step.
4. What to get in writing: a short list (rent and what it includes, notice both ways, room entry, house rules, deposit and its return) and a polite message asking the owner or head tenant to confirm these.
5. Where to check: types of local services (tenant advice, the official housing website, student housing office if a student).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state the person's legal status or notice rights as fact.
- If they have been told to leave immediately, locked out or had belongings removed, say first to contact tenant advice or police if threatened, as these may be unlawful even for lodgers in some places.
- Do not suggest staying beyond agreed notice to force a court process without advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you are likely to be
Short paragraph with reasons.

## What that usually means
Table: topic | usual pattern | check.

## Your issue
Short paragraph and next step.

## What to get in writing
Checklist, then a short message.

## Where to check
Bullets.
</output_format>
