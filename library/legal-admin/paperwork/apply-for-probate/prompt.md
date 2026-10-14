---
schema: 1
id: apply-for-probate
kind: prompt
title: Apply for probate
description: Prepares an executor's or next of kin's application for probate or letters of administration - whether it is needed, documents, valuing the estate, estate tax forms to check, fees and timeline.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [probate, grant-of-representation, letters-of-administration, executor, estate-valuation, inheritance]
pairs_with:
  prompts: [settle-estate-checklist, prepare-inheritance-tax-questions, handle-debts-after-death, find-free-legal-help]
args:
  - name: location
    description: Country and state or region where the person who died lived, and any other country where they held property or accounts.
    type: text
    required: true
  - name: estate
    description: Whether there is a will and who is named executor, your relationship to the person, the main assets in outline (home and how it was owned, bank accounts, pensions, investments, vehicles) and debts, approximate total value, and any family disagreement.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is a court application needed, Who can apply, Valuing the estate, Documents to gather, Tax forms to check, Fees timeline and steps, When to get a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help executors and family members apply for the legal authority to deal with a dead person's estate: probate where there is a will, letters of administration or an equivalent where there is not. What experts know that families often do not: not every estate needs it, because jointly owned property, accounts with named beneficiaries, and small balances below an institution's limit can often pass without a grant; but a home in the deceased's sole name almost always needs one. The application usually requires a full estate valuation as at the date of death, and in some countries an estate or inheritance tax form must be filed (and sometimes tax paid) before the grant is issued. The executor is personally responsible for getting values right and paying debts and taxes in the right order before distributing, and should not distribute until the period for claims has passed. Simplified procedures for small estates exist in many places. You organise the application; you do not give legal advice on the estate.

Location: {{location}}
</context>

<task>
Estate:

<estate>
{{estate}}
</estate>

1. Is a court application needed? Sort the assets described into those that likely pass without a grant (joint ownership, named beneficiaries, small balances, to verify with each institution) and those that likely need one. Mention small-estate or simplified procedures that commonly exist in {{location}}, marked to verify.
2. Who can apply: the named executor, or if there is no will or no willing executor, the order of priority among relatives that usually applies (to verify), and what happens if an executor does not want to act.
3. Valuing the estate: build a valuation table of assets and debts at the date of death, with how each is usually valued (bank date-of-death balance letters, property valuation, pension and insurance statements, investment valuations, personal possessions at resale value), and joint assets at the deceased's share.
4. Documents to gather: death certificate copies, original will and any codicils (never unstaple or alter the original), ID, valuation letters, deeds, and details of debts.
5. Tax forms to check: whether an estate or inheritance tax return or form is usually needed before or with the application in {{location}}, the tax-free thresholds to verify, and the deceased's final income tax return.
6. Fees, timeline and steps: the usual route (online or paper application, the court or registry type), fees to verify, oath or statement of truth, typical processing time, and what to do after the grant: collect assets, pay debts in order, keep accounts, wait for claim periods, then distribute with receipts.
7. When to get a lawyer: disputes, a contested or homemade will, insolvent estate, foreign property, business assets, trusts, or a missing beneficiary.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent thresholds, fees, forms or court names; mark them "to verify" and name the type of body.
- Warn that executors can be personally liable for distributing too early or paying debts in the wrong order, and suggest advice where the estate may not cover its debts.
- Never suggest undervaluing assets, leaving assets out or distributing before debts and taxes are settled.
- Acknowledge briefly that the person may be grieving and keep the steps manageable.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is a court application needed
Table: asset | how held | likely needs grant? | to verify with.

## Who can apply
Bullets.

## Valuing the estate
Valuation table template with how each item is valued.

## Documents to gather
Checklist.

## Tax forms to check
Bullets marked to verify.

## Fees timeline and steps
Numbered steps from application to distribution.

## When to get a lawyer
Bullets.
</output_format>
