---
schema: 1
id: write-construction-change-order
kind: prompt
title: Write a construction change order
description: Writes a construction change order or variation with the change described, the reason, cost and time impact, the effect on the contract sum, and approval blocks, for contractors and clients.
category: operations
version: 1.0.0
status: incubating
stage: [build, review]
role: [operations-manager, founder]
subject: [engineering, construction]
requires: [none]
inputs: [notes, document, dataset]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [change-order, contract-variation, cost-impact, extension-of-time, contractors]
pairs_with:
  prompts: [write-construction-rfi, plan-construction-lookahead, write-customer-quote]
args:
  - name: change
    description: What is changing and why - the instruction or event that caused it, where on the project, the drawings or specification affected, and the effect on the programme if known.
    type: text
    required: true
  - name: cost_breakdown
    description: Your cost build-up - labour hours and rates, materials, plant or equipment, subcontractor quotes, overhead and profit percentage allowed by the contract, and credits for work omitted.
    type: text
    required: true
  - name: original_scope
    description: Optional. The relevant part of the original scope or contract, the contract sum, previously approved change orders, and the contract form if a standard one is used.
    type: text
  - name: project_details
    description: Optional. Project name, contract reference, client, contractor, change order number and date.
    type: text
output_contract:
  format: markdown
  sections: [Change order, Cover note, Checks before issuing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write construction change orders (also called variations, change notices or, under some contract forms, compensation events). A change order is the written record that changes the scope, the price and often the completion date; disputes at the end of a project usually trace back to changes that were done on a verbal instruction, priced vaguely, or agreed without the time impact. A good change order describes the change so precisely that someone not on site understands it, states why it is needed and who instructed it, prices it transparently with the markup the contract allows, states the time impact or explicitly reserves it, and shows the running contract sum. The contract governs: its procedures, notice periods, valuation rules and forms override any general template.

<change>
{{change}}
</change>

<cost_breakdown>
{{cost_breakdown}}
</cost_breakdown>
{{#original_scope}}
<original_scope>
{{original_scope}}
</original_scope>
{{/original_scope}}
{{#project_details}}
<project_details>
{{project_details}}
</project_details>
{{/project_details}}
</context>

<task>
1. If the change is not described clearly enough to say what is added, omitted or substituted, or the cost breakdown has no figures, ask for what is missing and stop.
2. Write the change order header: project, contract reference, change order number, date, client, contractor, and the instruction it responds to. Missing details become `[ADD]`.
3. Describe the change: what is added, omitted or substituted, where, and the drawings, specification sections or RFIs affected, with revision numbers if given.
4. State the reason and its category: client request, design change or error, unforeseen site condition, regulatory or authority requirement, or other. Keep it factual and avoid assigning blame.
5. Price it: labour, materials, plant or equipment, subcontractors, overhead and profit at the contract rate, credits for omitted work, and the net total. Show quantities × rates where given. If the markup rate is not given, use `[CONTRACT MARKUP %]` rather than assuming one.
6. State the time impact: extension of time in working or calendar days and the revised completion date, whether the change affects the critical path, and any related costs of delay. If the time impact cannot yet be assessed, state that the contractor reserves the right to claim time and by when an assessment will follow.
7. Show the contract sum: original sum, previously approved changes, this change, revised sum. Use `[ADD]` where the figures are not supplied.
8. List assumptions and exclusions, and the period for which the price is valid.
9. Add approval blocks for the contractor, the client and, where applicable, the contract administrator, architect or engineer, with the statement that work proceeds only on signed approval unless an urgent written instruction is given.
10. Write a short cover note sending the change order to the client.
11. List checks before issuing: notice periods and procedure in the contract, whether the contract form uses a specific template, supporting quotes and records to attach.
12. Before writing the final version, recompute every line, subtotal, markup and the revised contract sum.
</task>

<constraints>
- Never invent rates, markups, quantities or contract sums. Use placeholders for anything not given.
- Neutral, factual language; no blame, no threats. The aim is a quick, clear approval.
- Do not interpret the contract's legal effect; flag points about entitlement, notice or time bars for the parties or their advisers to check.
- Use the terms of the contract form if one is named (for example "variation" or "compensation event").
</constraints>

<output_format>
## Change order
Header table, then: Description of change, Reason, Cost breakdown (table: Item | Quantity | Rate | Amount), Time impact, Contract sum (table), Assumptions and exclusions, Approvals (signature blocks).
## Cover note
## Checks before issuing
</output_format>
