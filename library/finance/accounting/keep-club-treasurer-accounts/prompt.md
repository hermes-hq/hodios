---
schema: 1
id: keep-club-treasurer-accounts
kind: prompt
title: Keep a club treasurer's accounts
description: Sets up the books for a volunteer treasurer of a club, PTA, society or residents' group - cash book, receipts, bank reconciliation, payment controls and the annual statement for the AGM.
category: accounting
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
subject: [nonprofit]
tags: [volunteer-treasurer, cash-book, receipts-and-payments, agm-accounts, community-groups]
pairs_with:
  prompts: [reconcile-bank-account, set-up-internal-controls, explain-restricted-funds]
  personas: [bookkeeper]
args:
  - name: group
    description: What the group is (sports club, PTA, choir, allotment society, residents' association), its rough yearly income and spending, where money comes from (subscriptions, events, grants, donations) and goes, cash versus bank and card payments, and any rules in its constitution about money.
    type: text
    required: true
  - name: situation
    description: Where you are starting from - taking over from a previous treasurer, no records, a spreadsheet already, an AGM date coming up, an examiner to satisfy, or a problem such as unexplained cash.
    type: text
  - name: country
    description: Country, because registration, reporting thresholds and tax rules for clubs and charities differ.
    type: string
output_contract:
  format: markdown
  sections: [Getting started, Cash book layout, Money in and out rules, Monthly routine, Annual statement, Handover and red flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help volunteer treasurers of small clubs and community groups keep simple, trustworthy accounts. Most small groups do not need double-entry bookkeeping; a well-kept receipts-and-payments cash book that matches the bank statement, with a receipt or record for every item, is enough for the members and an independent examiner. Treasurers get into trouble in familiar ways: mixing club money with their own, cash from events counted by one person and not recorded, payments made by one person without approval, missing receipts, grant money spent on the wrong thing, membership fees received but not linked to members, and a bank mandate still in the name of people who left. Basic controls protect the treasurer as much as the club: two people count cash and sign a cash sheet, payments need approval from a second person (dual authorisation or two signatories), receipts are kept for everything, the bank is reconciled monthly, and the committee sees a short report regularly. At the AGM, members usually receive a statement of receipts and payments for the year with opening and closing balances, often checked by an independent examiner or auditor as the constitution requires. Whether a group must register as a charity, file accounts or pay tax depends on its country, structure and income.

<group>
{{group}}
</group>
{{#situation}}

<situation>
{{situation}}
</situation>
{{/situation}}
{{#country}}

Country: {{country}}
{{/country}}
</context>

<task>
1. Getting started: the first steps for this situation, such as getting the previous records and bank statements, updating the bank mandate and signatories, confirming what the constitution says about money, reporting and the year end, and opening balances.
2. Design the cash book as a spreadsheet: columns for date, reference (receipt or voucher number), description, payer or payee, category, money in, money out, running bank balance and a cash column if the group handles cash, plus a tick column for reconciled items. Propose 6 to 12 categories that fit this group, and a separate column or tab for restricted money such as grants for a specific purpose.
3. Set the money in and out rules: cash counting with two people and a signed cash sheet, banking cash promptly, receipts and numbering, who approves payments and up to what amount, no reimbursement without a receipt, no personal accounts, and how to record online and card payments.
4. Give a monthly routine: enter transactions, reconcile to the bank statement, chase missing receipts, check restricted funds, and a one-paragraph committee report with the balance and anything unusual.
5. Explain the annual statement: a receipts and payments account by category, opening and closing balances that agree to the bank, notes on money held for specific purposes, and what an independent examiner will ask for. Give a layout template.
6. Cover handover and red flags: a handover checklist for the next treasurer and signs to raise with the committee, such as unexplained cash shortfalls or payments without approval.
7. Note that registration, filing and tax obligations depend on the country, structure and income, and say where to check (the charity or nonprofit regulator, the tax authority, an umbrella body for that type of group).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state registration thresholds, filing deadlines or tax rules as fact; describe them generally and point to the official regulator or tax authority for the country.
- Use only figures the treasurer provides; use placeholders otherwise.
- If the situation suggests money is missing or misused, advise documenting facts and raising it with the committee chair or the body the constitution names, not confronting individuals or accusing anyone.
- Keep it simple enough for a volunteer with no accounting training.
</constraints>

<output_format>
## Getting started
## Cash book layout
Table of columns, then the category list.
## Money in and out rules
## Monthly routine
## Annual statement
Template table: Receipts by category | Payments by category | Opening balance | Closing balance.
## Handover and red flags
</output_format>
