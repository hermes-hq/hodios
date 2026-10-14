---
schema: 1
id: design-sales-to-operations-handoff
kind: prompt
title: Design the sales to operations handoff
description: Designs how a won order or job passes from sales to the people who deliver it - required fields, a handoff form, readiness checks, and what happens when details are missing.
category: operations
version: 1.0.0
status: incubating
stage: [design]
role: [operations-manager, founder, manager, sales-rep]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [order-handoff, job-intake, sales-handover, order-to-delivery, process-design]
pairs_with:
  prompts: [write-customer-quote, map-business-process, build-raci-matrix]
args:
  - name: business
    description: What you sell and deliver (products, installations, projects, services), how orders are won and recorded today, the tools used (CRM, spreadsheet, job software, email), and who delivers.
    type: text
    required: true
  - name: problems
    description: What goes wrong at the handoff today - missing measurements or specs, promised dates nobody checked, special terms lost in emails, wrong addresses, unpaid deposits, customers repeating themselves.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where the handoff breaks, Required information, Handoff form, Readiness check, Missing information rule, Handoff meeting, Measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most delivery problems in small and mid-sized firms start at the moment sales hands over a won order: the salesperson knows the customer's constraints, the special price, the promised date and the site details, and operations receives a line on a spreadsheet. The fix is a defined handoff with a minimum data set that operations needs to plan and deliver without calling the customer back, a readiness check that operations can reject (with a reason and a deadline) rather than quietly starting work on guesses, and a rule that sales does not promise dates or custom terms outside what operations has agreed. Good designs make the handoff easy for sales (fields captured during the sale, not retyped), make one person accountable for completeness, and use a short call for complex or high-value orders. Results are measured by the number of jobs that start with missing information and the number of customer callbacks.
</context>

<task>
Business:
<business>
{{business}}
</business>

Problems today:
<problems>
{{problems}}
</problems>

1. Map where the handoff breaks: for each problem listed, the point where information is lost and its cost (rework, delay, margin, customer trust).
2. Define the minimum required information for operations to plan and deliver: customer and contacts, what exactly was sold (spec, quantities, options, references to the quote), price and special terms, promised dates and how firm they are, delivery or site details and access, payment status (deposit, credit approval), and risks or customer sensitivities. Mark each field as required or conditional.
3. Draft a handoff form or field list that fits the tools described, ideally captured in the CRM or job system during the sale.
4. Write a readiness check operations runs within a set time `[CONFIRM]`: accept, accept with questions, or return to sales with the missing items listed.
5. Set the missing-information rule: who chases, deadline, what work may start meanwhile, and when the customer is told about a date change.
6. Define when a short handoff meeting or call is needed (value, complexity, custom terms, new customer) and its agenda.
7. Add a rule on date and term promises: what sales may promise without checking and what needs operations' agreement first.
8. Propose two or three measures to track and a review after one month.
</task>

<constraints>
- Do not design a heavy process for a small team; scale the form and checks to the volume described.
- Do not invent the business's lead times, capacity or terms; use `[CONFIRM]` placeholders.
- Keep accountability clear: one owner for completeness of each handoff.
- Do not claim features of named software; describe fields and steps and say to check what the tool supports.
</constraints>

<output_format>
## Where the handoff breaks
Table: Problem | Where information is lost | Cost.
## Required information
Table: Field | Required or conditional | Why operations needs it.
## Handoff form
## Readiness check
## Missing information rule
## Handoff meeting
## Measures
</output_format>
