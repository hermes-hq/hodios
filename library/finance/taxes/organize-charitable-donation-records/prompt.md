---
schema: 1
id: organize-charitable-donation-records
kind: prompt
title: Organise charitable donation records
description: Sets up records for charitable gifts - receipts, acknowledgements, gift aid style declarations and non-cash valuations - so donations can be claimed for tax relief in your country.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [donations, tax-relief, receipts, record-keeping]
pairs_with:
  prompts: [organize-tax-documents, plan-giving-budget, estimate-annual-tax-bill]
  personas: [tax-educator]
args:
  - name: donations
    description: Your gifts this year - recipient, date, amount, how paid (card, transfer, cash, payroll, crowdfunding, through a platform), anything received in return, and non-cash gifts (goods, shares, vehicles) with what you know of their value. Say what paperwork you have.
    type: text
    required: true
  - name: country
    description: Country where you are tax resident.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Donation log, Evidence needed per gift, Gaps to fix now, Non-cash gifts, How the relief is claimed, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone get their charitable donations in order so any tax relief can be claimed and defended. Relief usually depends on three things: the recipient must be a registered or approved charity (gifts to individuals, most crowdfunding for a person, and many foreign charities do not qualify); the person must hold the right evidence, which differs by country and by size of gift (a bank record for small gifts, an official receipt or written acknowledgement for larger ones, sometimes obtained by a deadline); and any benefit received in return (a dinner, tickets, membership perks) usually reduces the amount that counts. Systems differ in mechanics: some give a deduction from income, some a credit, some let the charity reclaim basic-rate tax on the gift with higher-rate relief claimed by the donor, and some pre-fill donations on the return. Non-cash gifts (goods, shares, vehicles) often need extra forms or valuations, and gifts of appreciated shares can have their own rules.

Country: {{country}}
</context>

<task>
Donations:

<donations>
{{donations}}
</donations>

1. Build a donation log: date, recipient, amount, method, benefit received, eligibility status to check, evidence held.
2. Evidence needed per gift in {{country}}: what proof each gift needs given its size and type (bank record, official receipt, written acknowledgement with stated contents, a declaration such as gift aid, platform statement), with any deadline for getting it. Mark country rules "verify".
3. Gaps to fix now: gifts missing evidence, recipients whose eligibility should be checked on the official charity register, gifts where a benefit received reduces the amount, and gifts that likely do not qualify (to individuals or non-approved bodies). Draft a short request the person can send to a charity for a missing receipt.
4. Non-cash gifts: valuation rules, extra forms or appraisals for larger items, and how gifts of shares are usually treated, marked "verify".
5. How the relief is claimed in {{country}}: deduction, credit, charity reclaim or pre-filled return; limits as a share of income; carry-forward; and who claims when a couple gives jointly. Mark figures "verify".
6. A simple routine for next year: a folder or spreadsheet, saving receipts when giving, and a year-end check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent thresholds, limits, forms or deadlines; mark country rules "verify" and point to the tax authority or the official charity register.
- Do not tell the person to give more for tax reasons.
- Do not help create or alter receipts or valuations. If evidence is missing, the route is asking the charity or accepting the gift may not be claimable.
- Note that platforms, payroll giving schemes and donor-advised funds can change who issues the receipt and when relief applies.
{{> output/uncertainty}}
</constraints>

<output_format>
## Donation log
Table: date | recipient | amount | method | benefit received | evidence held | status.

## Evidence needed per gift
Bullets by gift size or type, marked "verify".

## Gaps to fix now
Checklist, plus a short receipt-request message.

## Non-cash gifts
Bullets, or "None".

## How the relief is claimed
Bullets marked "verify".

## Points to verify
Bullets with where to check each.
</output_format>
