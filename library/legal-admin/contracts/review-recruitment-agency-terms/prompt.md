---
schema: 1
id: review-recruitment-agency-terms
kind: prompt
title: Review a recruitment agency's terms of business
description: Reviews a recruitment agency's terms of business for placement fees, rebates, candidate ownership windows, temp-to-perm fees and payment triggers before you engage them.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, manager, recruiter, operations-manager]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [recruitment-agency, placement-fee, rebate-period, temp-to-perm, candidate-introduction, staffing]
pairs_with:
  prompts: [brief-recruitment-agency, redline-contract, explain-contract-clause]
args:
  - name: terms
    description: The agency's terms of business, fee schedule and any signed acceptance, with clause numbers.
    type: text
    required: true
  - name: hiring
    description: The role or roles, expected salary, permanent or temporary, how many agencies you use, and whether you also find candidates yourself.
    type: text
    required: true
  - name: country
    description: Country and region. Agency and temporary worker rules vary a lot by country.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Fee example, Clause check, What to ask for, Message to the agency]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hiring managers often accept agency terms by replying to a CV email, and only read them when an invoice arrives. What in-house recruiters know to check: the fee base (percentage of first-year salary, or of "total remuneration" including bonus, car and benefits, which raises it); when the fee is earned (on offer, acceptance or start) and payment days; the rebate or refund scale if the hire leaves or is dismissed in the first weeks, and conditions that void it (paying late, not notifying in time); the introduction or ownership window, often 6 to 12 months, during which hiring a candidate the agency sent triggers the fee even if they reapplied directly or came through another agency; "introduction" defined so loosely that a CV sent unsolicited counts; fees for hiring the candidate into a different role or passing them to another company; temp-to-perm conversion fees for taking on an agency temp, and whether a longer hire period reduces them; exclusivity and retained fees paid in stages regardless of success; and the agency's own duties (checks on right to work, references) that the client may wrongly assume are done.
{{#country}}

Country: {{country}}
{{/country}}

<hiring>
{{hiring}}
</hiring>
</context>

<task>
<terms>
{{terms}}
</terms>

1. In brief: what the client owes and when, and the three terms most likely to cost money unexpectedly.
2. Fee example: work out the fee for the stated role and salary, including whatever the fee base counts, and the refund under the rebate scale if the hire left at sample points. Show the arithmetic.
3. Clause check, quoting each clause: how terms are accepted, definition of introduction, fee base and rate, when the fee is earned and paid, rebate scale and conditions, ownership window, duplicate introductions between agencies, hiring for other roles or passing on details, temp-to-perm and temp hire fees, exclusivity and retainers, candidate checks and who does them, data protection, liability, termination, governing law.
4. What to ask for: ranked asks with a reason and a fallback (fee on base salary only, earned on start, longer rebate scale, shorter ownership window, first-come rule for duplicate CVs, no fee for unsolicited CVs, reduced conversion fee after a set period).
5. Message to the agency: a short note proposing the changes and confirming no candidates should be sent until terms are agreed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Do not invent percentages or market rates; if a benchmark would help, tell the user to compare quotes from other agencies.
- Do not state whether a temp-to-perm fee or ownership clause is lawful where the user is; note that some countries regulate them and say what to check.
- Show all fee arithmetic.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## Fee example
Short calculation with the assumptions.

## Clause check
Table: topic | clause and short quote | rating (fine / check / negotiate) | why.

## What to ask for
Numbered: ask - reason - fallback.

## Message to the agency
The message.
</output_format>
