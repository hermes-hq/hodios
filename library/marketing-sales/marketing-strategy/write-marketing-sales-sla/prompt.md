---
schema: 1
id: write-marketing-sales-sla
kind: prompt
title: Write a marketing and sales service level agreement
description: Writes the agreement between marketing and sales with shared lead stage definitions, handover fields, response times, follow-up rules, recycling, volume commitments and joint reporting.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, sales-rep, manager]
requires: [none]
inputs: [text, notes]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-alignment, lead-handover, lead-stages, service-level-agreement, revenue-operations]
pairs_with:
  prompts: [build-lead-scoring-model, qualify-leads, plan-b2b-demand-generation, define-marketing-kpis]
args:
  - name: situation
    description: How leads flow today from marketing to sales, team sizes, lead volumes, the CRM used, and the friction (for example "sales says leads are junk, marketing says sales never calls them").
    type: text
    required: true
  - name: targets
    description: Pipeline or revenue targets for the period and current conversion rates between stages if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and scope, Lead stage definitions, Marketing commitments, Sales commitments, Handover and response rules, Recycling and disqualification, Reporting and review, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a revenue operations lead who has ended the "leads are junk" versus "sales never follows up" argument more than once. The fix is a short written agreement with stage definitions both teams sign, commitments on both sides (marketing on volume and quality of qualified leads, sales on speed and number of follow-up attempts), a required reason code when sales rejects or recycles a lead, and a shared weekly look at the same report. Response time matters: hand-raisers contacted within hours convert far better than those contacted days later, so the agreement sets a clock and a fallback when a rep is unavailable. Agreements fail when they are long, legalistic, or have no review and no data to check them.
</context>

<task>
<situation>
{{situation}}
</situation>

{{#targets}}
<targets>
{{targets}}
</targets>
{{/targets}}

1. If you cannot tell who hands leads to whom and roughly how many, ask up to three questions and stop.
2. Purpose and scope: which teams, which lead sources (inbound, events, partners), and the period.
3. Lead stage definitions: raw lead, marketing qualified, sales accepted, sales qualified or opportunity, recycled, disqualified; each with entry criteria that can be checked in the CRM and who owns the lead at that stage.
4. Marketing commitments: monthly volume of qualified leads, minimum data on each handed-over lead, and quality targets measured by sales acceptance rate.
5. Sales commitments: time to first contact by lead type (direct requests faster than content leads), number and spacing of attempts before recycling, accept or reject within a set time, and a reason code for every rejection.
6. Handover and response rules: routing, required handover fields (source, what they did, fit notes, suggested angle), what happens when the owner is out, and alerts when the clock is breached.
7. Recycling and disqualification: when a lead returns to nurture, how it can re-qualify, and reasons that remove it.
8. Reporting and review: one shared dashboard, the weekly 15-minute review agenda, monthly targets versus actuals for both sides, and a quarterly revision of definitions.
9. Open decisions the teams must settle, with a suggested default.
</task>

<constraints>
- Write it short enough to fit on two pages; plain language, no legal phrasing.
- Use numbers the user gave; mark proposed response times and volumes as proposals to agree.
- Do not assume specific CRM features; describe the rules.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose and scope

## Lead stage definitions
A table: Stage | Entry criteria | Owner | Exit.

## Marketing commitments

## Sales commitments

## Handover and response rules
A table: Lead type | First contact within | Attempts | Fallback.

## Recycling and disqualification
Include the reason code list.

## Reporting and review

## Open decisions
</output_format>
