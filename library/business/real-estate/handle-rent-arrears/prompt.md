---
schema: 1
id: handle-rent-arrears
kind: prompt
title: Handle a tenant's rent arrears
description: Plans a landlord's response to unpaid rent with a staged contact plan, a realistic repayment agreement, the letters for each stage and the formal steps to take advice on before any notice.
category: real-estate
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, operations-manager]
subject: [real-estate]
requires: [none]
inputs: [notes, text]
output: [plan, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [landlord, unpaid-rent, repayment-plan, credit-control, letting]
pairs_with:
  prompts: [check-landlord-obligations]
  personas: [property-manager]
args:
  - name: situation
    description: Monthly rent, how much is owed and since when, payment history before this, anything the tenant has said about why, contact so far, deposit held, guarantor, and any rent insurance.
    type: text
    required: true
  - name: country
    description: Country and state or region. What a landlord may and may not do about arrears, and the notices involved, differ by place.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Where you stand, Contact plan, Repayment agreement, Letters, Formal options to take advice on, Records to keep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a landlord deal with rent arrears the way a good property manager does: early, in writing, calm and lawful. Arrears are cheapest to fix in the first two to four weeks. Most tenants in arrears have had a change in income, not a change in character, and a repayment plan the tenant can actually afford (current rent plus a small amount towards the debt) recovers more money, faster, than a rushed eviction. Many tenants are entitled to help with housing costs they have not claimed, and pointing them to free debt or benefits advice is in the landlord's interest. The common mistakes are waiting months, agreeing a plan the tenant cannot keep, and self-help steps (changing locks, cutting utilities, removing belongings, repeated pressure at the door) that are unlawful in most places and can turn a debt claim into a claim against the landlord.

Situation: {{situation}}
Location: {{country}}
</context>

<task>
1. Summarise where the landlord stands: amount owed, how many rent periods that is, whether this is a first lapse or a pattern, what security exists (deposit, guarantor, rent insurance with its notification deadline), and what is unknown.
2. Write a staged contact plan with dates relative to today: a friendly first contact, a formal arrears letter with a statement, an offer to agree a plan, a guarantor or insurer notification if relevant, and a final letter before formal action. Include signposting to free debt advice and housing-cost help at the early stages.
3. Propose a repayment agreement the tenant could keep: current rent plus a stated amount per period, the date arrears clear, what happens if a payment is missed, and a review point. Show the arithmetic.
4. Draft the letters for the first two stages and the repayment agreement confirmation, polite and factual, with [BRACKETS] for gaps.
5. List formal options to take advice on in {{country}}, each marked `[CHECK locally]`: the notice type used for arrears, any minimum arrears level or pre-action steps required before notice, court or tribunal routes, a money claim instead of or alongside possession, and how the deposit can and cannot be used during the tenancy.
6. List the records to keep: rent statement, every contact with date and method, agreements, evidence of service.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest changing locks, removing belongings, cutting utilities, entering without proper notice, contacting the tenant's employer, or repeated visits or calls to pressure them. If the landlord proposes any of these, say clearly that it is likely unlawful and risky.
- Do not state notice periods, arrears thresholds or court procedures as fact; mark them `[CHECK locally]` and recommend a solicitor, attorney or landlord association before serving any formal notice.
- Do not invent figures. Use only the amounts given and show the calculation.
- Keep letters under 220 words each and free of threats.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Short summary with the arrears figure and security available.

## Contact plan
Table: when, action, channel, purpose.

## Repayment agreement
Terms and the arithmetic.

## Letters
The drafts, each under a short heading.

## Formal options to take advice on
Bullets marked `[CHECK locally]`.

## Records to keep
Checklist.
</output_format>
