---
schema: 1
id: write-customer-quote
kind: prompt
title: Write a customer quote or estimate
description: Writes a clear quote or estimate for a trade or service job - scope, exclusions, price breakdown, assumptions, validity, payment terms and how to accept - from your own costs and notes.
category: operations
version: 1.0.0
status: incubating
stage: [build]
role: [founder, sales-rep, operations-manager]
inputs: [notes, text]
output: [docs, table, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [quote, estimate, scope-of-work, exclusions, trades, payment-terms]
pairs_with:
  prompts: [build-job-quote-calculator, price-services]
args:
  - name: job
    description: What the customer asked for and what you saw on the visit - location, measurements, materials, access, anything uncertain (hidden pipework, condition behind walls).
    type: text
    required: true
  - name: costs
    description: Your numbers - labour hours and rate, materials, subcontractors, equipment hire, waste removal, markup, tax treatment - and the total if you already have it.
    type: text
    required: true
  - name: business
    description: Your business name, trade and standard terms (deposit, payment schedule, validity period, guarantee) if you have them.
    type: string
  - name: document_type
    description: Quote (a fixed price for the defined scope) or estimate (a best guess that may change, with how changes are handled).
    type: enum
    enum: [quote, estimate]
    default: quote
output_contract:
  format: markdown
  sections: [Document, Cover message, Check before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tradespeople and service businesses write quotes that win work and prevent disputes. Most job disputes trace back to the quote: a vague scope, unstated exclusions, an "estimate" the customer read as a fixed price, or no rule for what happens when something unexpected is found. A good quote describes the result in the customer's words, lists what is and is not included, shows enough of the price breakdown to look fair without inviting line-by-line haggling, states assumptions, and makes accepting easy.
</context>

<task>
Write a {{document_type}} for this job.

<job>
{{job}}
</job>

<costs>
{{costs}}
</costs>

Business and standard terms: {{business}}

1. Check the arithmetic in the costs: subtotals, markup and tax. If the numbers do not add up or tax treatment is unclear, show the corrected calculation and flag it in "Check before sending". Never change a rate or markup silently.
2. Scope of work: numbered items describing what will be done and the finished result, in plain language a homeowner or office manager understands.
3. Exclusions: what is not included, especially the things customers commonly assume are (making good, decorating, waste removal, permits, out-of-hours work, parts of the job behind walls or under floors).
4. Assumptions and unknowns: what the price assumes (access, working hours, condition found) and how unforeseen work is handled (stop, inform, written agreement on cost before continuing).
5. Price: a breakdown grouped into a few lines (labour, materials, other) with tax shown as given, and the total. For an estimate, give the expected figure and say clearly it may change and why.
6. Terms: validity period, deposit and payment schedule, start date or lead time, guarantee, and how to accept. Use the business's terms if given; otherwise use `[YOUR TERM: …]` placeholders rather than inventing terms.
7. Write a short cover message to send with it.
</task>

<constraints>
- Use only the costs given. Do not add charges, discounts or terms the user did not give; mark gaps as `[YOUR TERM: …]` or `[CHECK: …]`.
- Call it a quote only if the price is fixed for the stated scope; if the user chose quote but the job has big unknowns, keep the quote and add a clear unforeseen-work clause, and suggest an estimate or a provisional sum for the unknown part.
- Do not state legal requirements (cooling-off periods, licences, tax rules) as fact; list them under "Check before sending" if they may apply.
- Plain, confident language; no legalese beyond what is needed.
</constraints>

<output_format>
## Document
Header (business, customer `[NAME]`, date, reference, valid until), then: Scope of work, Exclusions, Assumptions, Price (table: Item | Amount, then tax and total), Terms, How to accept.
## Cover message
Under 100 words.
## Check before sending
Bullets: arithmetic issues, placeholders to fill, terms or legal points to confirm.
</output_format>
