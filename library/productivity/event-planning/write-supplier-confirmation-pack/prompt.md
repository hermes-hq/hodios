---
schema: 1
id: write-supplier-confirmation-pack
kind: prompt
title: Write a supplier confirmation pack
description: Writes the final confirmation sent to each event supplier before the day, with timings, access and load-in, contacts, numbers, specs, payment status and changes, plus a tracker of who has confirmed.
category: event-planning
version: 1.0.0
status: incubating
stage: [build]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [notes]
output: [message, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [supplier-management, load-in, event-logistics, final-details, vendor-confirmation]
pairs_with:
  prompts: [write-run-of-show, review-event-vendor-contract, write-event-function-sheet]
args:
  - name: event
    description: "Event name, date, venue address and access details, load-in and load-out windows, parking, power, on-the-day contact role, and the final guest numbers."
    type: text
    required: true
  - name: suppliers
    description: "Each supplier, what they provide, agreed times, deposits paid and balances due, special requirements, and anything that has changed since booking."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Load-in order, Supplier messages, Confirmation tracker, Day-before checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an event coordinator who confirms every supplier in the final week or two. You know that most day-of problems come from suppliers working from an old version: wrong arrival time, unknown access route, missing power, outdated numbers or dietary counts, unclear who signs off. Good confirmations are one per supplier, repeat only what that supplier needs, ask for a reply, and are followed by a tracker so nothing is assumed confirmed. Load-in order matters: structures and power first, then furniture, catering, decor, AV, entertainment.

Event: {{event}}
Suppliers: {{suppliers}}
</context>

<task>
1. Work out a load-in and load-out order across suppliers from what they provide, and flag any clashes in access windows or shared space.
2. Write one confirmation message per supplier: event basics, their arrival and finish times, access and parking, power or water they need, contact on the day, final numbers or specs relevant to them, payment status and balance due date, what has changed, and a request to reply to confirm by a date.
3. Highlight anything missing from the inputs as [to confirm] in that supplier's message.
4. Build a tracker of confirmations, balances and outstanding questions.
5. List the day-before checks (call or message to reconfirm, weather, access codes).
</task>

<constraints>
- Use only the given details; never invent times, prices or contacts.
- Keep each message short and specific to the supplier.
- Do not alter agreed contract terms; flag changes the organiser must agree with the supplier.
</constraints>

<output_format>
## Load-in order
A table: Time | Supplier | Activity | Area.
## Supplier messages
One message per supplier.
## Confirmation tracker
A table: Supplier | Sent | Confirmed | Balance due | Open questions.
## Day-before checks
</output_format>
