---
schema: 1
id: set-up-lot-traceability
kind: prompt
title: Set up lot traceability
description: Sets up batch or lot traceability for a small maker - lot code format, what to record at each step, one-up one-down links to suppliers and customers, and a mock recall test.
category: operations
version: 1.0.0
status: incubating
stage: [build, operate]
role: [operations-manager, founder, manager]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [traceability, batch-codes, lot-tracking, mock-recall, product-safety]
pairs_with:
  prompts: [run-product-recall-customer-contact, write-quality-control-checklist, plan-inventory]
args:
  - name: product
    description: What you make, the ingredients, components or materials, how they flow from receipt to dispatch, batch sizes, and how you sell (direct, shops, wholesale, online).
    type: text
    required: true
  - name: current_records
    description: What is recorded today and where (paper, spreadsheet, stock or accounting software), and any customer or retailer traceability requirements you have been given.
    type: text
  - name: jurisdiction
    description: Country or region you sell in, because legal traceability duties differ by sector and place.
    type: string
output_contract:
  format: markdown
  sections: [Traceability design, Lot code format, Records by step, Linking suppliers and customers, Mock recall test, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Traceability means that, given a problem with one incoming material or one finished batch, you can quickly name every affected batch and every customer who received it, and nothing more. The common baseline is "one step back, one step forward": which supplier lots went into each of your batches, and which customers received each batch. Small makers lose this link in predictable places: mixing supplier lots in a shared bin, rework and leftovers added to a new batch, part-used materials, samples and giveaways, and online orders that record the product but not the lot. The tighter the lot (per day or per mix rather than per month), the smaller a recall, at the cost of more recording. A system is only proven by a timed mock recall: pick one supplier lot and one finished lot and trace both ways, then measure time taken and percentage of quantity accounted for. Many sectors (food, feed, cosmetics, toys, medical, automotive) have specific legal or customer rules on what to record and for how long.
</context>

<task>
Product and flow:
<product>
{{product}}
</product>

{{#current_records}}Current records and requirements:
<current_records>
{{current_records}}
</current_records>{{/current_records}}

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}

1. Map the flow from goods-in to dispatch and mark the points where lot identity can be lost (mixing, splitting, rework, part-used stock, returns).
2. Recommend the lot size and explain the trade-off between recall size and recording effort for this business.
3. Design a lot code format that is short, unique and readable on the label (for example date plus a sequence), and say where it appears: product, outer case, invoice or delivery note, order record.
4. Specify the records at each step: goods-in (supplier, supplier lot, quantity, date, your internal reference), production (which supplier lots went into which batch, quantities, rework added), stock (part-used materials kept labelled), dispatch (customer, batch, quantity, date).
5. Fit the records to the current tools; suggest the simplest change that closes each gap.
6. Write a mock recall test: one backward trace and one forward trace, a time target as `[CONFIRM]` if no requirement is given, the reconciliation of quantities, and how to record the result.
7. List points to confirm, including legal record-keeping duties and retention periods for this sector and place.
</task>

<constraints>
- Do not state legal traceability requirements, retention periods or recall time limits as fact unless given; mark them to confirm with the relevant regulator, trade body or customer.
- Design for the tools and staff described; do not require software the business does not have unless you explain the cost-benefit.
- Cover the awkward cases (rework, leftovers, samples, returns, online orders); they are where traceability fails.
- If the product is food, cosmetics, medical or for children, note that a recall plan and contact with the authority are separate duties beyond traceability.
</constraints>

<output_format>
## Traceability design
Flow with the risk points marked.
## Lot code format
Format, example and where it is shown.
## Records by step
Table: Step | What to record | Where | Who.
## Linking suppliers and customers
## Mock recall test
Steps, target time, reconciliation, result record.
## Points to confirm
</output_format>
