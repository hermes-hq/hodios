---
schema: 1
id: set-up-failure-demand-tracking
kind: prompt
title: Set up failure demand tracking
description: Sets up ongoing failure demand tracking for a service's phones, inbox or front desk, with contact codes, a light logging routine, a review cadence and an owner for each upstream cause.
category: user-feedback
version: 1.0.0
status: incubating
stage: [operate, plan]
role: [product-manager, operations-manager, manager]
subject: [public-sector, social-care, hospitality]
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
tags: [failure-demand, value-demand, contact-reasons, systems-thinking, avoidable-contact, root-cause]
pairs_with:
  prompts: [analyze-support-tickets, define-public-service-kpis, check-kpi-for-perverse-incentives]
args:
  - name: service_description
    description: What the service does, who uses it and what a successful outcome looks like for them (for example "council housing repairs for 9,000 tenants; success is the repair done right first time").
    type: text
    required: true
  - name: contact_channels
    description: How people contact you (phone, email, web form, counter, letters), rough weekly volumes, who answers, and how contacts are logged today, if at all.
    type: text
    required: true
  - name: review_cadence
    description: How often the team will meet to review the numbers and causes.
    type: enum
    enum: [weekly, fortnightly, monthly]
    default: weekly
output_contract:
  format: markdown
  sections: [Definitions for this service, Contact codes, Logging routine, Measures, Review routine, Cause owners, Pilot plan, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a service team measure failure demand continuously, not as a one-off study. Value demand is the contact the service exists for (a request, an application, a booking). Failure demand is contact caused by a failure to do something, or do it right, for the customer: chasing progress, repeat contact because it was not resolved, correcting an error, not understanding a letter or form, being sent to the wrong place. In many services it is a large share of all contact, and every failure contact costs twice: once to cause, once to handle.

Three things make tracking fail. Codes describe the channel or the product instead of the cause, so nobody can act on them. Logging takes so long that staff skip it or tick "other". And the numbers are used to judge frontline staff or to push people online, so the causes upstream (slow decisions, unclear letters, missed appointments) never get fixed.

Review cadence: {{review_cadence}}
</context>

<task>
<service>
{{service_description}}
</service>

<channels>
{{contact_channels}}
</channels>

1. Define value demand for this service in its own words: list the 4-8 legitimate reasons people contact it. Then define the failure types that apply: progress chasing, not resolved or repeat, error correction, not understood (letters, forms, website), wrong place or passed around, and any service-specific type.
2. Build a code list of at most 12 codes in two levels: value or failure, then the reason. Write each code with a one-line definition and an example of what the caller says. Add "unclear" but expect it under 10% of contacts; if it is higher, the codes need work.
3. Design logging that takes under 15 seconds a contact: a single dropdown or tick-box in the system already used, or a paper tally sheet by the phone or counter. If volume is high, sample instead of logging everything: for example two full days a week rotated across weekdays, or every contact in a fixed hour each day, so the sample is not biased toward quiet times.
4. Calibrate: two or three staff code the same 20 contacts; if they agree on fewer than 16, tighten the definitions and repeat.
5. Define the measures: failure demand as a share of all demand, by failure type and by channel; repeat contact within 7 days; the top five causes with estimated weekly volume. For each failure contact, staff note in a few words what upstream failure caused it (late decision, missing information in a letter, appointment not kept).
6. Set the review routine at the chosen cadence: 30 minutes, the trend, the top three causes, one owner and one action per cause, and a check at the next review whether that cause's volume fell.
7. Name a likely owner for each cause by role (whoever controls the process that creates it, which is rarely the contact team), and say how to escalate causes that sit in another team or organisation.
8. Plan a four-week pilot: week 1 calibrate, weeks 2-3 log, week 4 first review and adjust codes.
</task>

<constraints>
- Never use failure demand figures to rate or rank individual staff, and say so in the plan; logging stays honest only if it is safe.
- Do not treat moving contacts to self-service or a chatbot as removing failure demand. A failure contact moved online is still a failure.
- Do not invent volumes, costs or percentages. If volumes are missing, keep the plan and mark sample sizes as [X] with how to estimate them.
- If the service or channels are too vague to write codes (no idea what people contact you about), ask for 20-30 example contacts or a list of common reasons and stop.
- Keep personal data out of the log: no names or case details, only the code and a few words on the cause.
</constraints>

<output_format>
## Definitions for this service
Value demand reasons and failure types, as two short lists.

## Contact codes
Table: code | value or failure | definition | what the person says (example).

## Logging routine
Who logs, where, when, how long it takes, and the sampling rule.

## Measures
Table: measure | formula | split by | why it matters.

## Review routine
Agenda with timings and the action log format (cause | owner | action | due | volume before | volume after).

## Cause owners
Table: likely cause | owning role or team | how to escalate.

## Pilot plan
Week-by-week checklist.

## Questions
What to confirm before starting.
</output_format>
