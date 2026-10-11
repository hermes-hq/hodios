---
schema: 1
id: plan-round-closing-checklist
kind: prompt
title: Plan the closing of a funding round
description: Builds the checklist from signed term sheet to money in the bank for an equity round - documents, approvals, signatures, funds flow, filings and post-close tasks - with owners and dates.
category: fundraising
version: 1.0.0
status: incubating
stage: [ship]
role: [founder, executive, operations-manager]
advice_risk: [legal]
inputs: [document, notes]
output: [checklist, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [closing-checklist, definitive-documents, funds-flow, board-approval, post-close]
pairs_with:
  prompts: [prepare-due-diligence-data-room, explain-term-sheet, write-funding-announcement]
args:
  - name: deal
    description: The signed term sheet's key points, the investors, the target closing date, and any conditions to closing (for example due diligence, key hires, IP assignment).
    type: text
    required: true
  - name: company
    description: Country of incorporation, existing investors and their consent rights, board composition, and anything messy in the corporate records you already know about.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Timeline, Documents, Approvals and consents, Conditions to closing, Funds flow, Post-close tasks, Questions for your lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders run the stretch between a signed term sheet and the money arriving, which often takes longer than expected. Delays usually come from missing corporate records (unsigned founder IP assignments, unrecorded option grants, missing board minutes), existing investors whose consent or waiver of pre-emption rights is needed, signature chasing across many parties, and funds arriving at different times. The company's lawyer drives the definitive documents; the founder's job is to have the records, approvals and people ready so the lawyer is not waiting. Required documents, approvals and filings differ by country.
</context>

<task>
Build the closing plan.

<deal>
{{deal}}
</deal>

<company>
{{company}}
</company>

1. Timeline: working back from the target closing date, the key milestones (diligence complete, documents agreed, approvals obtained, signing, funding, filings), with a realistic buffer.
2. Documents: the definitive documents commonly involved in a priced round in general terms (share subscription or purchase agreement, investors' or shareholders' agreement, updated articles or charter, disclosure letter or schedule, board and shareholder resolutions, ancillary items), each with owner and status. Note that names and set differ by country and the lawyer confirms the list.
3. Approvals and consents: board approval, shareholder approvals, existing investor consents and waivers, any third-party or regulatory consents the input suggests.
4. Conditions to closing: each condition from the term sheet with the action to satisfy it and evidence needed.
5. Funds flow: who sends what to which account, confirmation of receipt, and how share issuance follows.
6. Post-close tasks: share certificates or register updates, statutory filings, cap table update, option pool update, investor onboarding (information rights, update cadence), announcement timing.
7. Questions for your lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state filing deadlines, fees or legal requirements for a specific country as fact; list them as items for the lawyer to confirm.
- Use only the facts given; mark any assumed party, date or document as an assumption.
- Flag record-keeping gaps the input mentions as early critical-path items.
- Never suggest backdating documents or resolutions; if historical records are missing, the lawyer decides how to correct them.
</constraints>

<output_format>
## Timeline
Table: Week | Milestone | Owner.
## Documents
Table: Document | Owner | Status | Notes.
## Approvals and consents
Checklist.
## Conditions to closing
Table: Condition | Action | Evidence | Owner.
## Funds flow
## Post-close tasks
Checklist.
## Questions for your lawyer
</output_format>
