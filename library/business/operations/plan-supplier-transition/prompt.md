---
schema: 1
id: plan-supplier-transition
kind: prompt
title: Plan a switch to a new supplier
description: Plans switching suppliers without running out or losing quality - bridge stock, qualification, spec and tooling handover, cutover date, exit from the old supplier and fallback.
category: operations
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [operations-manager, founder]
subject: [supply-chain]
inputs: [notes, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [supplier-switch, transition-plan, bridge-stock, qualification, cutover, sourcing]
pairs_with:
  prompts: [compare-vendors, vet-new-supplier, write-manufacturing-spec-sheet, terminate-supplier-relationship]
args:
  - name: products
    description: What is moving to the new supplier - products, monthly usage or sales, how critical each is, and current stock on hand.
    type: text
    required: true
  - name: old_supplier
    description: The current supplier situation - why you are leaving, whether they know, contract end or notice terms, tooling, moulds, artwork or materials they hold that belong to you.
    type: text
    required: true
  - name: new_supplier
    description: The new supplier - lead times for samples and first order, minimum order, where they are, and what they still need from you.
    type: text
    required: true
  - name: deadline
    description: Optional. A date you must switch by, for example contract end or a price change.
    type: string
output_contract:
  format: markdown
  sections: [Transition summary, Bridge stock, Qualification, Handover, Timeline, Telling the old supplier, Fallback, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a supply chain manager who has moved many product lines between suppliers. Switches fail in predictable ways: the old supplier is told too early and service drops or they stop shipping, while the new supplier's first production run is late or does not match the approved sample; no bridge stock was built, so the business runs out; moulds, tools, artwork files or the old supplier's specification were never formally handed over, so the new supplier makes something slightly different; customers notice a change that needed to be declared (ingredients, materials, country of origin, certifications). A safe transition builds bridge stock to cover the new supplier's full lead time plus a failure buffer, qualifies the new supplier on a production run (not just a sample), overlaps the two suppliers for a period, recovers owned tooling and files, and keeps a fallback until the new supply is proven.
</context>

<task>
Plan the supplier transition.

<products>
{{products}}
</products>

<old_supplier>
{{old_supplier}}
</old_supplier>

<new_supplier>
{{new_supplier}}
</new_supplier>
{{#deadline}}Deadline: {{deadline}}{{/deadline}}

1. Transition summary: what moves, the order of products (least risky first unless there is a reason not to), and the key risk for each.
2. Bridge stock: for each product, calculate stock needed to cover the time from now until the new supplier's first approved delivery plus a safety margin for one failed run. Show the arithmetic from usage and lead times. State the cash and storage cost, and whether the old supplier must be ordered from before they are told.
3. Qualification: the steps to approve the new supplier - specification sign-off, samples, pre-production or first article inspection, a pilot run, inspection of the first shipment, and in-use or customer testing where relevant. Give clear acceptance criteria and who signs off.
4. Handover: specs, drawings, artwork, tooling, moulds, dies and materials owned by the user, how to recover them (check ownership in the contract or invoices), and what to test when the new supplier uses transferred tooling.
5. Timeline: a week-by-week plan from now to the end of the overlap, with the critical path marked. If a deadline is given, say whether it is realistic and what to do if not.
6. Telling the old supplier: when and how to give notice (after bridge stock is secured and per the contract notice), what to say, final orders, payment of open invoices, and keeping the relationship civil as a possible fallback.
7. Fallback: what triggers going back to the old supplier or a third option, and how to keep that option open during the overlap.
8. Checklist: also flag any change customers or regulators may need to be told about (labels, ingredients, origin, certificates).
</task>

<constraints>
- Do not invent lead times, stock levels or contract terms; use the user's figures and label any assumption.
- Do not advise breaching the old contract's notice or exclusivity terms; tell the user to check them, and to get legal advice if ownership of tooling is disputed.
- Never suggest giving the old supplier's confidential drawings or pricing to the new supplier unless the user owns them; flag where ownership is unclear.
- Do not recommend switching a critical product without a qualified production run.
</constraints>

<output_format>
## Transition summary
Table: Product | Order of switch | Main risk.
## Bridge stock
Table: Product | Monthly usage | Weeks to cover | Units needed | On hand | To order, with the arithmetic.
## Qualification
Numbered steps with acceptance criteria and sign-off.
## Handover
Table: Item | Owned by | Where it is | Action.
## Timeline
Table: Week | Actions | Critical path?
## Telling the old supplier
Bullets and a short notice outline.
## Fallback
Triggers and how to keep the option open.
## Checklist
A checklist.
</output_format>
