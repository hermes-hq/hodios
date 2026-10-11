---
schema: 1
id: design-ticket-tagging-scheme
kind: prompt
title: Design a ticket tagging scheme
description: Designs support ticket tags or contact-reason fields - a short mutually exclusive list with definitions and examples, who tags and when, and how to keep the data clean.
category: customer-support
version: 1.0.0
status: incubating
stage: [design]
role: [manager, operations-manager, support-agent]
requires: [none]
inputs: [ticket, dataset, text]
output: [table, docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contact-reasons, ticket-tags, helpdesk-fields, support-reporting, data-quality]
pairs_with:
  prompts: [classify-incoming-customer-messages, analyze-support-tickets, design-ticket-routing-rules]
args:
  - name: ticket_sample
    description: "50 to 200 recent ticket subjects or first messages, or your current tag list with usage counts. Remove personal data."
    type: text
    required: true
  - name: context
    description: "What the business sells, channels, team size, which helpdesk fields exist, and the questions leaders want the data to answer (top contact drivers, product bugs, cost per reason). Optional."
    type: text
output_contract:
  format: markdown
  sections: [Design choices, Contact reason list, Definitions and examples, Other fields, Tagging rules, Keeping it clean, Moving from the old tags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design support data structures. Most tag lists fail the same way: free-form tags multiply until there are 400, nobody agrees what "billing" covers, agents pick the first plausible option, and the reports built on them are noise. What works is separating the questions: contact reason (why the customer got in touch, from their point of view, one required value per ticket from a short two-level list), plus a few other structured fields (product area, outcome, root cause owner) instead of mixing them all into one tag cloud. A list of 15-30 reasons with written definitions and boundary examples beats a long one; "Other" should stay under about 5% or the list is missing something. Reasons should be set or confirmed at close, when the real reason is known.
</context>

<task>
Design the tagging scheme.

<ticket_sample>
{{ticket_sample}}
</ticket_sample>
{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. State the design choices: which questions the data must answer, which fields will hold what (contact reason, product area, outcome, root cause owner, any compliance flags), which are required, and why not to use free tags for reporting.
2. Build the contact reason list from the sample: two levels at most (group and reason), 15-30 reasons, named in plain words from the customer's goal, mutually exclusive. Estimate the share of the sample in each, and check that "Other" is small.
3. For each reason write a one-line definition, an example that belongs, and a boundary example that belongs elsewhere (for example "refund not received" versus "request a refund").
4. Define the other fields with their allowed values.
5. Write tagging rules: who sets each field and when (set on arrival for routing, confirmed at close for reporting), the rule for tickets with several reasons (the main reason the customer contacted, others in a secondary field if needed), and what automation may set.
6. Plan upkeep: a monthly review of "Other" and low-use reasons, one owner who can change the list, a change log, and a quarterly sample audit of tagging accuracy.
7. If a current tag list was given, map old tags to new fields and values, and list which to retire.
</task>

<constraints>
- Base the reasons on the sample given; do not pad the list with generic reasons the sample does not show, beyond a few clearly needed ones (complaints, data requests) that you mark as added.
- No overlapping reasons; if two would often be confused, merge them or write a clear boundary.
- Do not recommend specific helpdesk software; describe fields generically.
- Keep customer personal data out of examples.
</constraints>

<output_format>
## Design choices
## Contact reason list
Table: Group | Reason | Estimated share of sample.
## Definitions and examples
Table: Reason | Definition | Belongs here | Belongs elsewhere.
## Other fields
## Tagging rules
## Keeping it clean
## Moving from the old tags
Or "No current tags given."
</output_format>
