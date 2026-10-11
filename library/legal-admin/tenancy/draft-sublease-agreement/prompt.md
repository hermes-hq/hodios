---
schema: 1
id: draft-sublease-agreement
kind: prompt
title: Draft a sublease agreement
description: Drafts a sublease between a tenant and a subtenant covering rent, deposit, dates, shared rules, the head lease, the landlord's consent and how it ends, for review before signing.
category: tenancy
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student]
subject: [law]
requires: [none]
inputs: [text, document]
output: [docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [sublease, subletting, subtenant, sublet-agreement, summer-sublet]
pairs_with:
  prompts: [request-consent-to-sublet, review-lease, write-house-share-agreement]
  personas: [tenant-rights-advisor]
args:
  - name: arrangement
    description: What is being sublet (whole home or one room), start and end dates, monthly rent and how it is paid, deposit, bills and what is included, furniture, and house rules that matter to you.
    type: text
    required: true
  - name: head_lease
    description: The parts of your own lease that matter - subletting and occupant clauses, rent, end date, rules on pets, smoking, noise and guests - and whether the landlord has agreed in writing.
    type: text
    required: true
  - name: location
    description: Country and state, city or region. Sublet rights, rent caps, deposit rules and short-term rental limits differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you sign, Sublease agreement, Condition record, Points to check locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft a sublease for a tenant (the sublandlord) and the person moving in (the subtenant). The tenant normally stays fully liable to the landlord for rent and damage during the sublet, so the sublease must pass the head lease's obligations down to the subtenant and give the tenant a way to recover losses. Common failures: no written landlord consent where the lease requires it, which can put the tenant in breach; a sublease that runs past the head lease end date; no condition record, so deposit disputes become one person's word against another's; vague bills and utilities splits; no plan for what happens if the subtenant stops paying or the head lease ends early; and charging more than local rules allow or holding the deposit in a way local law forbids. In some places a subtenant who has exclusive possession can gain rights that make ending the arrangement slower than either side expects, while a lodger sharing with the tenant may have fewer protections. The draft is a starting point to check locally, not a finished legal document.

Location: {{location}}

<arrangement>
{{arrangement}}
</arrangement>

<head_lease>
{{head_lease}}
</head_lease>
</context>

<task>
1. Before drafting, check the head lease facts: whether consent is required and obtained, whether the sublease dates fit inside the head lease, and whether rent charged exceeds the tenant's rent (which some places restrict). List any blocker first and say not to sign until it is resolved.
2. Draft the sublease in plain English with numbered clauses: parties and property (room or whole home, shared areas); term with start and end dates; rent, due date, method and late handling; deposit amount, where it is held and how and when it is returned, marked to check against local deposit rules; bills and what is included; incorporation of the head lease rules (attach or summarise them) and the subtenant's promise to follow them; use and house rules (guests, pets, smoking, noise, quiet hours); repairs and how to report them; access by the tenant and landlord with notice; condition and the attached condition record; ending early by either side, and what happens if the head lease ends; no further subletting; keys and move-out; signatures and date.
3. Write a short condition record template: room by room, item, condition, photo reference, both parties' initials.
4. List points to check locally with "[CHECK locally]": consent rules, rent caps for sublets, deposit protection, notice to end, whether a subtenant or lodger gets extra rights, short-term rental registration, and tax on rent received.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not draft a sublease that hides the arrangement from the landlord where consent is required, or that is designed to evade local rent or short-let rules.
- Use only the facts given; put missing details in [brackets] rather than inventing amounts, dates or names.
- Keep clauses in plain language and balanced; a sublease that is unfair to the subtenant may be unenforceable in parts.
- Say once that a local tenant adviser or lawyer should review it before signing if the amounts or the term are significant.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you sign
Bullets, blockers first.

## Sublease agreement
The full draft with numbered clauses and signature lines.

## Condition record
A table template: Room | Item | Condition | Photo ref | Initials.

## Points to check locally
Checklist marked "[CHECK locally]".
</output_format>
