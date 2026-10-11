---
schema: 1
id: plan-customer-offboarding
kind: prompt
title: Plan offboarding for a cancelling customer
description: Plans a clean offboarding for a cancelling B2B customer - data export, access end dates, integrations, final billing, an exit conversation and a door left open - with the customer email.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [support-agent, manager, operations-manager, founder]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [account-closure, cancellation, data-export, exit-interview, churn]
pairs_with:
  prompts: [handle-membership-cancellation-requests, resolve-cancellation-fee-dispute, plan-at-risk-account-save]
  personas: [customer-success-manager]
args:
  - name: offboarding_situation
    description: "Who is leaving, what they use (users, data, integrations, connected systems), the reason given, the cancellation date, and the relationship (good, strained, disputed)."
    type: text
    required: true
  - name: contract_terms
    description: "Notice period, end date, what happens to data after the end (retention and deletion periods), refunds or final invoices, and any data processing terms you have. Optional; missing items are flagged for checking."
    type: text
output_contract:
  format: markdown
  sections: [Timeline, Data export and deletion, Access and integrations, Final billing, Exit conversation, Leaving the door open, Customer email]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help support and customer success teams offboard customers well. A cancellation is the last impression a customer has, and it is often what former customers repeat to others. Offboarding goes wrong when data disappears before the customer exported it, access is cut early or left open long after, a forgotten integration keeps sending data or fails silently in the customer's systems, the final invoice surprises them, or the team goes cold the moment the decision is made. A good offboarding confirms dates in writing, gives the customer their data in a usable format before the end date, deletes it afterwards as the contract and data rules require (and confirms when asked), settles billing clearly, asks one honest exit question to learn from, and leaves the way back easy. Saving the account is a separate step; once the decision is final, pushing further harms the relationship.
</context>

<task>
Plan this offboarding.

<offboarding_situation>
{{offboarding_situation}}
</offboarding_situation>
{{#contract_terms}}
<contract_terms>
{{contract_terms}}
</contract_terms>
{{/contract_terms}}

1. Build the timeline from today to the end date and beyond: confirmation, export window, access end, integration shutdown, final invoice, data deletion and its confirmation, with owners on both sides.
2. Plan data export and deletion: what data the customer can export and in what formats, help offered, the date after which data is deleted under the terms, and the deletion confirmation. Flag anything that depends on contract or data protection terms not given.
3. Plan access and integrations: user access end date, admin access for the export period, API keys and connected systems to switch off, and a warning to the customer about anything in their systems that depends on yours.
4. Settle final billing: what is owed or refunded under the terms, the final invoice date, and any pending disputes.
5. Plan the exit conversation: who asks, three or four open questions, and how the learning is recorded and shared with product and sales. No hard selling.
6. Leave the door open: what to say about returning, whether settings or data can be restored within a period (only if true), and a light check-in later if appropriate.
7. Write the customer email confirming the plan, dates and contacts.
</task>

<constraints>
- Do not invent contract terms, retention periods or refunds; mark [CHECK contract] where not given.
- Never recommend withholding the customer's data or delaying export to pressure them.
- Data deletion and retention must follow the contract and the applicable data protection law; mark [CHECK data protection rules for your country].
- If the relationship is in dispute, keep the email factual and suggest a manager or legal review before sending.
</constraints>

<output_format>
## Timeline
Table: Date | Step | Our owner | Their owner.
## Data export and deletion
## Access and integrations
## Final billing
## Exit conversation
## Leaving the door open
## Customer email
</output_format>
