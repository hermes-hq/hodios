---
schema: 1
id: write-tenant-notice-to-leave
kind: prompt
title: Give your landlord notice to leave
description: Works out the earliest valid end date for a tenant's notice from the lease and local rules to verify, writes the notice letter, and lists the move-out steps that protect the deposit.
category: tenancy
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, student, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [notice-period, moving-out, end-of-tenancy, landlord-letters, deposit]
pairs_with:
  prompts: [demand-deposit-return, deep-clean-for-move-out, prepare-for-tenancy-check-out]
  personas: [tenant-rights-advisor]
args:
  - name: tenancy
    description: Tenancy start date, fixed term or rolling, rent period and payment date, any notice clause, the landlord's or agent's address for notices, and who is on the lease.
    type: text
    required: true
  - name: plan
    description: When you want to leave and any flexibility, and whether all joint tenants are leaving.
    type: text
    required: true
  - name: country
    description: Country and state or region. Minimum notice and how it must be given vary.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Earliest valid end date, Notice letter, How to serve it, Before you leave]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants end a tenancy cleanly. A notice that is a few days short, sent to the wrong address, or given during a fixed term without a break clause may not end the tenancy, and the tenant keeps owing rent. In many places notice on a rolling tenancy must be a minimum length and sometimes must end on a particular day of the rent period; a fixed-term tenancy may end automatically on its last day or may need notice, depending on the place and the lease. With joint tenancies, in some places one tenant's notice ends the tenancy for everyone, which can leave flatmates homeless; in others all must sign. Proof of service matters as much as the content.

<tenancy>
{{tenancy}}
</tenancy>

<plan>
{{plan}}
</plan>

Location: {{country}}
</context>

<task>
1. Work out the earliest end date: show the lease's notice terms, the likely local minimum as a `[CHECK locally]` assumption, any rule about ending on a rent-period date, and the resulting date. If the plan's date is too early, say so and give the earliest date that works. If the tenancy is in a fixed term without a break clause, say notice may not end it early and point to options for leaving early.
2. Write the notice letter: tenant names and address, landlord or agent, date of the letter, a clear statement that the tenant is ending the tenancy, the end date, the forwarding address for the deposit, a request to arrange the check-out inspection, and signatures of every tenant who is leaving. Under 180 words, with [BRACKETS] for gaps.
3. Explain how to serve it so receipt can be proved: the method in the lease, plus email and tracked post, keeping copies and the date sent.
4. List what to do before leaving: final meter readings with photos, utilities and council or local taxes closed, redirect post, return all keys with a receipt, document condition with dated photos, and the deposit return timeline to check locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state notice periods as settled law; show the calculation and mark the legal minimum `[CHECK locally]`.
- If some joint tenants are staying, warn that one tenant's notice may end the tenancy for all and recommend advice before sending.
- Keep the letter neutral; do not add complaints or demands.
{{> output/uncertainty}}
</constraints>

<output_format>
## Earliest valid end date
The calculation and the date.

## Notice letter
The draft.

## How to serve it
Three bullets.

## Before you leave
Checklist.
</output_format>
