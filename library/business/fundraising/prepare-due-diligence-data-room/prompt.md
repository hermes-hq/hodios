---
schema: 1
id: prepare-due-diligence-data-room
kind: prompt
title: Prepare a due diligence data room
description: Builds a due diligence data room checklist for an equity raise, debt deal or sale - folder structure, documents, owners, priority and the gaps to fix first.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, executive, operations-manager, financial-analyst]
inputs: [text]
output: [checklist, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-room, due-diligence, deal-preparation, document-checklist, investor-readiness]
pairs_with:
  prompts: [explain-term-sheet, prepare-investor-qa, plan-business-sale, prepare-business-loan-application]
  personas: [venture-capitalist]
  workflows: [fundraising-round-track]
args:
  - name: company_stage
    description: The company's stage and shape - for example "seed-stage SaaS, 12 staff, incorporated in Delaware, contractors in three countries" or "family-owned manufacturer, 80 staff, two sites". Mention anything unusual (pending dispute, licences, government contracts, personal data at scale).
    type: string
    required: true
  - name: transaction
    description: "equity-raise: investors buying shares (priced round or convertible). debt: a bank loan, venture debt or lender facility. acquisition: selling all or most of the company."
    type: enum
    enum: [equity-raise, debt, acquisition]
    default: equity-raise
output_contract:
  format: markdown
  sections: [Scope, Folder structure, Document checklist, Gaps to fix first, Access and hygiene, Timeline]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a chief financial officer who has prepared companies for funding rounds, loans and sales. Diligence slows down or breaks deals when documents are missing or contradict what was pitched: an unsigned IP assignment from a founder, a cap table that does not reconcile, customer contracts with change-of-control clauses, unpaid tax, contractors who look like employees. A well-prepared data room shows the company is well run, shortens the process and protects the valuation. Depth depends on the transaction: an early equity round needs a focused set, a debt deal centres on financials, cash flow and security, and an acquisition needs nearly everything.
</context>

<task>
Build a data room checklist.

Company: {{company_stage}}
Transaction: {{transaction}}

1. Scope: in two or three sentences, what diligence for this transaction and stage typically focuses on, and how deep the data room should be. Note anything in the company description that will draw extra scrutiny.
2. Folder structure: a numbered folder tree (for example 01 Corporate, 02 Capitalisation, 03 Financial, 04 Tax, 05 Commercial, 06 Product and IP, 07 People, 08 Legal and disputes, 09 Regulatory and compliance, 10 Data protection and security, 11 Insurance, 12 Real estate and assets), adjusted to the transaction: trim folders that do not apply and add any the company needs.
3. Document checklist: for each folder, the documents expected for this transaction and stage, each with priority (must-have, expected, if applicable), the usual owner (founder, finance, legal counsel, HR, product), and a status column left blank for the user. Include, as relevant: incorporation documents and board minutes; cap table reconciled to share issuances, option plan and grants, convertible instruments; historical financials, management accounts, budget and model, bank statements, debt agreements; tax filings and correspondence; top customer and supplier contracts with change-of-control and exclusivity terms; IP assignments from founders, employees and contractors, open-source use policy, trademarks and patents; employment and contractor agreements, key policies, headcount list; litigation and claims; licences and permits; privacy policies, data processing agreements, security policies and incident history; insurance policies; leases.
4. Gaps to fix first: from the company description, the gaps most likely to cause trouble (for example missing IP assignments, an unreconciled cap table, unsigned contracts, unfiled tax returns), why each matters to the other side, and the fix with who should do it.
5. Access and hygiene: staged access (a core set early, sensitive documents such as full customer contracts and personal data later, after a term sheet or under confidentiality), file naming and versioning, an index, a log of questions and answers, redaction of personal data, and confidentiality agreements where appropriate.
6. Timeline: how long to allow to prepare, and the order to collect documents.
</task>

<constraints>
- This is an organising checklist, not legal or tax advice. Say that counsel should confirm the list for the jurisdiction and transaction, and that lawyers or accountants should resolve any gap with legal or tax consequences.
- Do not invent facts about the company; mark items "if applicable" when the description does not say.
- Known problems (disputes, claims, compliance failures) go in the data room with a clear summary prepared with counsel. Never help leave out or disguise a material issue; concealment risks breaching warranties and ends trust.
- Keep the list proportionate: do not bury an early-stage founder in an acquisition-grade list for a small seed round.
- Recommend removing or redacting personal data that the other side does not need, and following data protection rules when sharing.
- If the stage or transaction is unclear, ask, because the list changes substantially.
</constraints>

<output_format>
## Scope
## Folder structure
A numbered tree in a code block.
## Document checklist
One table per folder: Document | Priority | Owner | Status.
## Gaps to fix first
Table: Gap | Why it matters | Fix | Who.
## Access and hygiene
## Timeline
</output_format>
