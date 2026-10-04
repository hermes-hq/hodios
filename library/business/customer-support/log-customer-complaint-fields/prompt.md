---
schema: 1
id: log-customer-complaint-fields
kind: prompt
title: Log customer complaint fields
description: Extracts a structured complaint record from an email, call note or review - customer, product, issue type, severity, remedy asked, promises made and deadlines - as JSON or a table, with flags.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager, manager]
requires: [none]
inputs: [message, notes, transcript]
output: [table, report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: "off"
level: beginner
tags: [complaint-log, data-extraction, json, severity, escalation-flags]
pairs_with:
  prompts: [analyze-support-tickets]
  workflows: [customer-complaint-track]
args:
  - name: complaint_text
    description: The complaint as received - an email thread, call notes, chat transcript or review - including any replies already sent.
    type: text
    required: true
  - name: output_format
    description: JSON for pasting into a tool or spreadsheet import, or a table for reading.
    type: enum
    enum: [json, table]
    default: json
output_contract:
  format: markdown
  sections: [Record, Flags, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn messy complaints into consistent records for a complaint log in a shop, hotel, restaurant, trades firm or support team. A log is only useful if every record uses the same fields and values, if nothing is guessed, and if promises already made to the customer are captured with their deadlines, because missed promises are the commonest reason a complaint escalates. Records also need to flag the cases that must not wait: safety, legal threats, regulators, vulnerable customers and public posts.

Output format: {{output_format}}
</context>

<task>
<complaint_text>
{{complaint_text}}
</complaint_text>

Extract one record (or one per complaint if the text clearly holds several) with these fields:

1. `received_date` (YYYY-MM-DD, from the text only), `channel` (email, phone, chat, in-person, review, social, letter, other).
2. `customer_name` as written (no guessing from email addresses), `customer_reference` (order, booking, account or job number).
3. `product_or_service`, `location_or_branch` if mentioned, `incident_date`.
4. `issue_type`, one of: product-fault, service-quality, delivery, billing, booking, staff-conduct, safety, hygiene, accessibility, privacy, other.
5. `summary`: one neutral sentence, no judgement.
6. `severity`, 1 to 4: 1 minor annoyance; 2 a failure needing a fix; 3 financial loss, repeated failure or a vulnerable customer affected; 4 safety, injury, illness, legal threat, regulator mention, data breach or discrimination. Add `severity_reason`.
7. `remedy_requested` (refund, replacement, redo, apology, compensation, explanation, other, none stated) and `amount_requested` if stated.
8. `promises_made`: list of objects with `what`, `by_whom`, `deadline` for anything the business already promised in the text.
9. `customer_deadline`: any date the customer set ("by Friday or I go to the ombudsman").
10. `sentiment` (calm, frustrated, angry, distressed) and `key_quote`: the customer's most telling sentence, verbatim, under 30 words.
11. `flags`: any of safety, legal-threat, regulator, media-or-public, vulnerable-customer, repeat-complaint, data-protection.

Leave a field null when the text does not say; never infer dates, names or amounts.
</task>

<constraints>
- Use null for anything not in the text. Do not fill gaps with likely values.
- Copy only the personal data the log needs (name and reference). Do not copy full addresses, card numbers, health details beyond what the issue needs, or passwords; note "personal data omitted" in Missing information if you left some out.
- JSON must be valid: double quotes, no comments, no trailing commas, dates as strings.
- For a table, use field | value rows in the same field order.
</constraints>

<output_format>
## Record
The record as a fenced JSON block, or as a field | value table, as requested.

## Flags
One line per flag with the evidence from the text, or "None".

## Missing information
Bullets of null fields that matter for handling this complaint, and what to ask.
</output_format>
