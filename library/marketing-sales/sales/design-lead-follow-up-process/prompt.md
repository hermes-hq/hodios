---
schema: 1
id: design-lead-follow-up-process
kind: prompt
title: Design a lead follow-up process
description: Designs how a small team handles inbound leads - response-time target, routing, a seven-day follow-up cadence by channel, templates and when to stop - so no enquiry goes cold.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, sales-rep]
requires: [none]
inputs: [notes, text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [inbound-leads, speed-to-lead, lead-routing, follow-up-cadence]
pairs_with:
  prompts: [reply-to-inbound-lead, qualify-leads, reactivate-old-leads]
  personas: [small-business-selling-mentor]
args:
  - name: business
    description: What you sell, typical deal size and how long customers take to decide.
    type: text
    required: true
  - name: lead_sources
    description: Where leads come from (website form, phone, chat, marketplace, ads, email) and roughly how many a week.
    type: text
    required: true
  - name: team
    description: Who can respond, their hours, and the tools you use (shared inbox, CRM, spreadsheet, WhatsApp).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Response targets, Routing, Follow-up cadence, Templates, Stop rules, Weekly check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You fix inbound lead handling for small businesses. The common leak is not bad selling but slow and inconsistent follow-up: an enquiry sits in a shared inbox over the weekend, one call attempt goes to voicemail and nobody tries again, or two people reply with different prices. Buyers often contact several suppliers and tend to go with the first credible, helpful reply, so response time matters more than polish.

A good process is simple enough to survive a busy week: a clear response-time target per channel and hours, one owner per lead, a short multi-channel cadence (several attempts across about a week, not one), templates that answer the question asked, a clear point to stop and move the lead to nurture, and a short weekly check of what slipped.
</context>

<task>
Design the lead follow-up process.

<business>
{{business}}
</business>

<lead_sources>
{{lead_sources}}
</lead_sources>

<team>
{{team}}
</team>

1. Set response-time targets per source, inside and outside working hours, that the team can realistically meet; include an instant acknowledgement where possible.
2. Define routing: who owns which leads, how ownership is recorded, cover for absences, and what happens to leads arriving outside hours.
3. Lay out a seven-day follow-up cadence by channel (for example day 0 call and email, day 1 text, day 3 call, day 7 final email), adjusted to the sources and team.
4. Write the templates: acknowledgement, first reply, voicemail, text, and the final "closing your file" message, each short and with placeholders in square brackets.
5. Set stop rules: when to stop chasing, when to move to nurture, and what to record.
6. Define a 15-minute weekly check with three numbers to watch (for example median first response time, contact rate, quote or meeting rate).
</task>

<constraints>
- Fit the process to the team size and tools named; do not require software they do not have, though you may suggest one optional tool category.
- Respect opt-outs and contact preferences; texting and calling need the lead's permission or a clear expectation from the enquiry, and rules differ by country.
- Do not invent benchmark statistics; describe targets as targets.
- Keep templates under about 80 words and free of pushy language.
</constraints>

<output_format>
## Response targets
Table: Source | In hours | Out of hours | Acknowledgement.

## Routing
Bullets.

## Follow-up cadence
Table: Day | Channel | Action.

## Templates
Each template with its name.

## Stop rules
Bullets.

## Weekly check
The three numbers and how to review them.
</output_format>
