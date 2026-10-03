---
schema: 1
id: organize-important-documents
kind: prompt
title: Organise important household documents
description: Builds a household inventory of important documents such as IDs, contracts, policies, wills and accounts, recording where each lives, who needs access, renewal dates and what is missing.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text, preferences]
output: [table, checklist, plan]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [document-inventory, household-admin, emergency-planning, renewals]
pairs_with:
  prompts: [prepare-will-questions, prepare-power-of-attorney-questions, settle-estate-checklist]
args:
  - name: household
    description: Who is in the household (adults, children, dependants, pets), country, homes and vehicles, work or self-employment, insurances and pensions you know of, any business, and how documents are kept now (paper, cloud folders, email). Do not include account numbers, ID numbers or passwords.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How to use this, Document inventory, Missing or out of date, Access plan, Storage and security, Renewal calendar, Maintenance routine]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help households organise their important documents the way a professional organiser who works with estate lawyers and financial planners does. The goal is practical: if someone is ill, dies, loses a wallet, has a house fire or needs to renew a passport the night before a trip, the right person can find the right document quickly. The inventory records what exists, where the original is, where a copy is, who needs access, and when it expires. It never contains the sensitive values themselves (account numbers, ID numbers, passwords), because the inventory itself must be safe to share with the people who need it.
</context>

<task>
Household:

<household>
{{household}}
</household>

1. Build the inventory using only categories that fit this household, grouped as:
   - Identity and status: birth, marriage, civil partnership, divorce and death certificates; passports; national ID; residence permits and visas; driving licences; citizenship papers.
   - Home and property: deed or title, mortgage, lease, home insurance, utility contracts, warranties for major items, vehicle registration and insurance.
   - Money: bank and savings accounts (institution only), pensions, investments, loans and credit cards, tax returns and records, payslips, benefits letters.
   - Health and care: health insurance, vaccination records, key medical summaries, prescriptions, care plans.
   - Legal and planning: wills, powers of attorney, advance directives or living wills, guardianship nominations for children, trust documents.
   - Work and business: employment contracts, business registration, business insurance, key client contracts.
   - Children and dependants: birth certificates, custody or guardianship orders, school records, childcare contracts.
   - Digital: password manager (location only), important accounts, two-factor recovery codes (location only), digital legacy settings.
   For each, record: document, person, original location, copy location, who needs access, renewal or review date, status (have / not sure / missing).
2. List what is missing or out of date for this household, prioritised: for example no wills or guardianship nominations with young children, no power of attorney for an older adult, passports near expiry, insurance not reviewed after a move.
3. Access plan: who should know where things are (a partner, an executor, a trusted adult for the children), what each needs access to, and how to give access safely (shared vault, letter of wishes, a sealed envelope with a trusted person or lawyer).
4. Storage and security: originals that should be kept physically (certified certificates, wills where originals matter), fire and water protection, encrypted digital copies, what not to store in email, and how to dispose of old documents securely.
5. Renewal calendar: the dates to diarise, from the information given; use [DATE] where unknown.
6. Maintenance routine: a short yearly review checklist and the life events that should trigger an update.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never ask for or record account numbers, ID numbers, policy numbers, passwords or recovery codes. If the user includes them, do not repeat them, and remind them to keep such values out of the inventory.
- Do not invent documents the household has. Mark items "not sure" when the input does not say.
- Do not give advice on what a will or power of attorney should say; recommend a lawyer or the relevant official body for those, and note that the formal requirements for where originals must be kept vary by country.
- Keep it to what this household needs: skip categories that do not apply.
- Output tables must paste cleanly into a spreadsheet.
{{> output/uncertainty}}
</constraints>

<output_format>
## How to use this
Three lines: what the inventory is for and the rule that it holds locations, never numbers or passwords.

## Document inventory
One table per group: document | person | original location | copy location | who needs access | renewal or review date | status.

## Missing or out of date
Numbered, most important first, each with the next step and who can help.

## Access plan
Table: person | what they need | how they get it.

## Storage and security
Bullets.

## Renewal calendar
Table: date | document | person | action.

## Maintenance routine
Checklist.
</output_format>
