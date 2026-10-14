---
schema: 1
id: set-up-sanctions-screening
kind: prompt
title: Set up sanctions screening
description: Designs a proportionate sanctions screening process for a small business that onboards customers, suppliers or shipments abroad, covering lists, timing, match review, escalation and records.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, operations-manager, legal-professional]
subject: [law, supply-chain, ecommerce]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sanctions-screening, export-controls, restricted-parties, false-positives, trade-compliance]
pairs_with:
  prompts: [plan-customer-due-diligence, write-aml-risk-assessment, run-vendor-due-diligence]
args:
  - name: business
    description: What the business does and with whom - customers and suppliers by country, payment flows, what is shipped where, volumes, whether goods may be dual-use or controlled, and any tools you already use.
    type: text
    required: true
  - name: jurisdictions
    description: Where the business and its owners are based and the currencies used, since this decides which sanctions regimes can apply (for example UK, EU, US, UN).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Exposure, Regimes to consider, Screening design, Reviewing a match, Escalation, Records and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business build sanctions screening that fits its exposure. Sanctions regimes can apply based on where a business is established, the nationality of its people, the currency used and the goods involved, and some regimes reach further than businesses expect. Sanctions also go beyond named lists: entities owned or controlled by listed persons can be caught, sectoral measures restrict certain dealings, and some countries or regions face broad trade restrictions. Screening against an outdated list, screening only at onboarding, or clearing every name match without a recorded reason are common failures. Equally, a near-identical name is not automatically a hit; a disciplined match review using date of birth, nationality, address and registration numbers keeps false positives manageable. Strict liability or near-strict liability can apply in some regimes, so records of what was checked and when matter.

Jurisdictions: {{jurisdictions}}
</context>

<task>
Business:

<business>
{{business}}
</business>

1. Exposure: summarise where sanctions risk comes from in this business (counterparties, countries, goods, payments, ownership structures), rated low, medium or high with reasons.
2. Regimes to consider: which regimes may apply given the jurisdictions and currencies, and the official consolidated lists to use, named in general terms and marked "verify the current official source".
3. Screening design: who is screened (customers, beneficial owners, suppliers, shipping parties, banks), when (onboarding, before each payment or shipment for higher risk, and on list updates), how (manual search of official lists or a tool; fuzzy matching settings), and checks beyond lists (ownership and control, restricted regions, goods classification).
4. Reviewing a match: a step-by-step procedure to decide true match, false positive or unresolved, using secondary identifiers, with a reason recorded every time.
5. Escalation: what to do with a likely true match (stop, do not tip off, do not move funds or goods, escalate to a named person, seek advice, report or apply for a licence where required), all marked "verify".
6. Records and review: what to keep, for how long (verify), periodic re-screening, and a review of the process when exposure changes.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state whether any named person, company or country is sanctioned; tell the user to check the current official lists.
- Do not invent list names, licence types, reporting deadlines or penalties. Mark them "verify".
- Never help structure a deal, payment route or shipment to avoid sanctions. If the input suggests that, refuse that part and explain why.
- Recommend sanctions or export control counsel for dual-use goods, sanctioned-region exposure, a likely true match, or any request to proceed despite a match.
{{> output/uncertainty}}
</constraints>

<output_format>
## Exposure
Bullets with the rating.

## Regimes to consider
Bullets, marked verify.

## Screening design
Table: who | when | how | owner.

## Reviewing a match
Numbered procedure.

## Escalation
Numbered steps.

## Records and review
Bullets.
</output_format>
