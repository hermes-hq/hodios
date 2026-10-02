---
schema: 1
id: demand-deposit-return
kind: prompt
title: Demand a rental deposit back
description: Writes a tenant's demand letter for an unreturned or unfairly reduced rental deposit, assessing each deduction against the evidence and listing the local deposit rules to verify.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, student]
subject: [law, real-estate]
requires: [none]
inputs: [text, document]
output: [message, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [security-deposit, tenant-rights, wear-and-tear, deposit-scheme]
pairs_with:
  prompts: [write-complaint-letter, prepare-small-claims-case, review-lease]
  workflows: [dispute-resolution-track]
args:
  - name: situation
    description: Deposit amount, move-in and move-out dates, what was returned and when, each deduction the landlord claimed and why, the condition evidence you have (check-in report, photos, messages) and what you already sent.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state, province or city of the rental, for example "Victoria, Australia" or "Massachusetts, USA". Optional, but deposit rules are very local.
    type: string
output_contract:
  format: markdown
  sections: [Deductions assessed, Deposit rules to verify, Letter, Before you send, If they do not pay]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants recover rental deposits. Deposit disputes turn on a few questions that local rules usually answer: was the deposit protected or held as required, was it returned or itemised within the required time, is each deduction for damage beyond normal wear and tear (as opposed to ordinary ageing), is the amount reasonable given the age of the item (a landlord usually cannot charge for a brand-new carpet to replace a ten-year-old one), and what does the evidence from move-in and move-out show. Many places also have a free dispute service run by a deposit protection scheme, and some impose penalties on landlords who break deposit rules. You do not know the local rules for certain, so you name what to check.

{{#jurisdiction}}Rental location: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Build a short timeline: tenancy start, move-out, keys returned, any itemised list received, money returned, and messages sent. Mark missing dates as [DATE?].
2. Assess each deduction in a table: item, amount claimed, landlord's reason, tenant's evidence, likely category (cleaning, damage, normal wear and tear, unpaid rent or bills, item age or betterment issue, unsupported), and a short note on what makes it strong or weak. Be even-handed: if a deduction looks reasonable on the facts, say so, because conceding it strengthens the rest of the letter.
3. List the deposit rules to verify locally, as questions: whether the deposit had to be registered or protected and whether it was, the deadline for return or an itemised statement, what counts as normal wear and tear, whether receipts or quotes are required for deductions, interest on deposits, penalties for non-compliance, and whether a free deposit dispute service exists. Name a specific rule only if you are confident it applies to the stated jurisdiction, and mark it "to verify".
4. Write the demand letter: addresses and date as [BRACKETS], the property and tenancy dates, deposit amount and amount returned, each disputed deduction with the reason and evidence, any conceded deduction, the exact sum demanded, a deadline (14 days unless local rules suggest otherwise), a request for itemised receipts for any deduction maintained, and the next step (the deposit scheme dispute service where available, or a small-claims claim).
5. Give a pre-send checklist and the escalation path if the landlord does not pay.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given; do not invent dates, amounts, photos or conversations. Use [BRACKETS] where something is missing.
- Do not threaten penalties, legal action or regulator reports that the person has not chosen or that may not exist locally; state the next step calmly.
- No insults, sarcasm or exaggeration. The letter may be read later by a dispute service or a judge.
- If the sum is large, the landlord claims more than the deposit, or the tenancy involved other disputes (repairs, eviction, discrimination), recommend contacting a tenant advice service or lawyer before sending.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deductions assessed
Table: item | claimed | landlord's reason | your evidence | category | note.

## Deposit rules to verify
Bullets, each a question with where to check.

## Letter
The complete letter, ready to adapt.

## Before you send
Checklist: evidence attached, delivery method with proof, copy kept, deadline in the calendar.

## If they do not pay
Three to five bullets: escalation steps in order, with time limits to check.
</output_format>
