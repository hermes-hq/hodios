---
schema: 1
id: terminate-supplier-relationship
kind: prompt
title: End a supplier or contractor relationship
description: Writes the notice ending a business supplier or contractor relationship in line with the contract, with the end date, transition, data and property return and final invoice steps.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, founder, project-manager, manager]
requires: [none]
inputs: [notes, document]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
advice_risk: [legal]
tags: [supplier-offboarding, termination-notice, contract-notice, vendor-exit, transition-plan]
pairs_with:
  prompts: [review-supplier-terms, reject-vendor-proposal, cancel-contract-or-subscription]
args:
  - name: supplier
    description: The supplier or contractor, what they provide, how long you have worked together, and your contact there.
    type: text
    required: true
  - name: contract_terms
    description: The relevant contract wording pasted in (term, notice period, how notice must be given, termination for convenience or cause, data return, exit assistance, fees), or "no written contract".
    type: text
    required: true
  - name: reason_and_plan
    description: Why you are ending it (if you want to say), whether for convenience or for a breach, your preferred end date, what needs to transition and to whom, and anything still owed either way.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your position, Termination notice, Exit checklist, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ending a supplier relationship goes wrong in predictable ways: notice sent to the wrong address or by a method the contract does not accept, an end date that ignores the notice period, termination "for cause" claimed without following the contract's breach and cure process, and an exit with no plan for data, access, equipment, open orders or the final invoice. Procurement people separate two things: the formal notice, which should be short, unambiguous and match the contract exactly, and the relationship message, which can thank the supplier and is often a call before the notice arrives. For anything high-value, disputed or for cause, a lawyer should check the notice before it goes.
</context>

<task>
Prepare the termination for this supplier.

<supplier>
{{supplier}}
</supplier>

<contract_terms>
{{contract_terms}}
</contract_terms>

<reason_and_plan>
{{reason_and_plan}}
</reason_and_plan>

1. Your position: from the contract terms only, set out the notice period, how notice must be given and to whom, whether termination is for convenience or for cause and what the contract requires for each, any fees or minimum commitments, and the earliest end date. Quote clause numbers. Mark anything not stated as "not stated".
2. If the user wants to end for cause, check whether the contract requires notice of the breach and a cure period first; if so, say the first letter should be a breach notice, not termination, and recommend legal advice.
3. Termination notice: subject "Notice of termination: [contract name/number]"; the contract reference; the clause relied on; the termination effective date; a request to confirm receipt; transition requests (data return or deletion in an agreed format, return of property and access credentials, handover of work in progress, cancellation of open orders); final invoice and settlement of amounts owed; a brief, neutral thank-you. Give the reason only if the user wants to and it is factual.
4. Exit checklist: who does what by when, including revoking system access, retrieving data and equipment, notifying internal teams, stopping recurring payments after the final invoice, and moving to the new supplier.
5. Check before sending: the method of service, whether a call should come first, and what to have a lawyer review.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the contract exactly. Never invent notice periods, clauses, fees, breaches or dates.
- No accusations or emotional language in the formal notice; keep any criticism factual and only if needed for a for-cause termination.
- Do not advise withholding payment for work already delivered unless the contract allows a set-off; flag the risk instead.
- Keep names, contract numbers and addresses as [placeholders] when not given.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your position
Table: term | what the contract says (clause) | effect. Then the earliest end date.
## Termination notice
Ready to send.
## Exit checklist
Table: task | owner | by when.
## Check before sending
Bullets.
</output_format>
