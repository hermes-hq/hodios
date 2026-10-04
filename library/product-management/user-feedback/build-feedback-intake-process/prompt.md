---
schema: 1
id: build-feedback-intake-process
kind: prompt
title: Build a feedback intake process
description: Designs how product feedback enters and moves through a company, with one intake form, deduplication, routing to owners, response times, updates to submitters and a monthly health check.
category: user-feedback
version: 1.0.0
status: incubating
stage: [design, operate]
role: [product-manager, operations-manager, manager]
subject: [saas]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [product-ops, feedback-intake, routing-rules, service-levels, feedback-form, evidence-linking]
pairs_with:
  prompts: [design-feedback-tagging-taxonomy, triage-feature-requests, turn-sales-notes-into-product-insights, extract-feedback-fields]
  personas: [product-operations-lead]
args:
  - name: current_situation
    description: How feedback reaches product today (Slack messages, emails, CRM notes, spreadsheets, hallway asks) and what goes wrong (lost requests, duplicates, sales chasing PMs, no replies).
    type: text
    required: true
  - name: teams_and_tools
    description: Who submits feedback (sales, support, success, marketing, execs), the product teams and areas, and the tools in use (CRM, helpdesk, issue tracker, chat, any feedback tool).
    type: text
    required: true
  - name: company_size
    description: Number of employees, which sets how much process is worth having.
    type: enum
    enum: [under-50, 50-500, over-500]
    default: 50-500
output_contract:
  format: markdown
  sections: [Principles, Intake form, Deduplication and linking, Routing rules, Service levels and statuses, Health check, Rollout, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design the pipe that carries customer feedback from customer-facing teams to product decisions. The people who use it are sales, support and success staff with little time: if submitting takes more than two minutes or nothing ever comes back, they go back to messaging their favourite PM, and the loudest account wins.

What good looks like: one front door; each submission records the customer's problem and evidence, not only a feature name; duplicates become extra evidence on one record; every item has an owner and a status the submitter can see; and someone checks monthly that feedback actually reaches decisions.

Company size: {{company_size}}
</context>

<task>
<current_situation>
{{current_situation}}
</current_situation>

<teams_and_tools>
{{teams_and_tools}}
</teams_and_tools>

1. State four or five principles for this company (one front door, problems over solutions, evidence over volume, every submitter hears back, the process serves decisions).
2. Design the intake form, placed inside a tool submitters already use. Required fields, kept to six or fewer: customer or account, segment or plan, the problem in the customer's words, what they were trying to do, impact (blocked, workaround, nice to have) with any revenue or deal at stake, and a link or verbatim quote. Optional: product area guess, deadline the customer mentioned. No field asking for a priority score.
3. Deduplication and linking: who checks new items against existing problem records, how a duplicate is merged as extra evidence (account, quote, revenue) rather than closed, and how the combined record shows the count of accounts and segments.
4. Routing rules: from product area to an owning team or PM, with a fallback owner for unclear items, and how urgent items (bugs, security, data loss, contractual commitments) leave the feedback path for the incident or support process.
5. Service levels and statuses: acknowledge within 2 working days, triage within 10 working days; statuses such as received, needs info, under review, planned, not planned now, shipped. Say who notifies the submitter at each change and give a two-line template for "not planned now".
6. Health check, monthly: share triaged within the service level, share of items with a customer and evidence attached, median days from submission to decision, share of roadmap items with linked feedback, and a quick pulse of submitters (does it feel worth submitting?).
7. Fit the process to the size: under-50 a shared form and weekly 30-minute triage by one PM; 50-500 a form in the existing tool and a product ops or rotating triage owner; over-500 per-area queues, a shared taxonomy with an owner and quarterly calibration.
8. Rollout over four to six weeks: pilot with one customer-facing team, migrate open items, announce, and retire the old channels by redirecting rather than ignoring them.
</task>

<constraints>
- Use the tools named; do not recommend buying a new tool unless the current ones cannot hold a form, a record and a status, and then describe the capability needed without naming vendors.
- Do not invent volumes or team names; mark gaps as [X].
- Keep customer personal data to what is needed to follow up; say to check the company's privacy rules for storing customer quotes.
- If the teams or tools are not described, ask for them and stop.
</constraints>

<output_format>
## Principles
Four or five bullets.

## Intake form
Table: field | required | type (dropdown, text, link) | help text shown to submitter.

## Deduplication and linking
Numbered steps and who does them.

## Routing rules
Table: product area or signal | owner | fallback | exits to (incident, support, none).

## Service levels and statuses
Table: status | meaning | who sets it | submitter notified (yes/no) | target time. Then the "not planned now" template.

## Health check
Table: measure | how to calculate | target | source.

## Rollout
Week-by-week checklist.

## Questions
What to confirm.
</output_format>
