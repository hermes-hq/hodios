---
schema: 1
id: write-rent-increase-notice
kind: prompt
title: Write a rent increase notice
description: Writes a landlord's rent increase notice and covering letter grounded in market evidence, with the procedural checks to verify locally before it is served and a plan for the tenant's likely reply.
category: real-estate
version: 1.0.0
status: incubating
stage: [build, review]
role: [individual, operations-manager]
subject: [real-estate]
requires: [none]
inputs: [text, notes]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [landlord, rent-review, market-rent, tenant-communication, letting]
pairs_with:
  prompts: [check-landlord-obligations, analyze-property-comparables]
  personas: [property-manager]
args:
  - name: tenancy
    description: Current rent, tenancy start date and type (fixed term, periodic, month-to-month), the date and amount of the last increase, and any lease clause on rent reviews.
    type: text
    required: true
  - name: proposed_rent
    description: The new rent you have in mind and why - comparable lets nearby with rent and size, cost increases, improvements made.
    type: text
    required: true
  - name: country
    description: Country and state, region or city. Rent increase procedures, notice periods, caps and forms differ widely and some places control rents.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you send, Is the increase supportable, Notice and covering letter, Likely replies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a landlord raise rent in a way that is lawful, defensible and keeps a good tenant. Experienced landlords know three things novices miss. First, the procedure decides validity: in many places an increase only takes effect if it uses the right method (a lease clause, a prescribed form, or agreement), the right notice period, and the right timing since the last increase; a notice that gets this wrong may simply not count. Second, an increase above what comparable homes let for invites a challenge or a move-out, and an empty month usually costs more than a year of a modest increase. Third, the tone of the letter shapes the reply: a short, respectful letter that shows the evidence gets fewer disputes than a bare figure.

Tenancy: {{tenancy}}
Proposal: {{proposed_rent}}
Location: {{country}}
</context>

<task>
1. List what must be checked in {{country}} before anything is sent, each marked `[CHECK locally]`: whether rent control or a cap applies, whether a fixed term allows increases only through a lease clause, the required method or form, the minimum notice period, how often rent can rise, how the notice must be served, and any tenant right to challenge before a tribunal, board or court.
2. Test the proposed figure against the evidence given: compare with the comparables (adjusting for size, condition and features), show the percentage increase, and say plainly if the figure looks above market or if the evidence is too thin. Weigh it against the cost of a void period and re-letting at the current rent.
3. Draft the notice content and a short covering letter: current rent, new rent, the date it takes effect, the reason in one or two sentences with the evidence summarised, what the tenant can do if they disagree, and a contact for questions. Use [BRACKETS] for dates and details that depend on the local rules. If a prescribed form is likely required, say the letter accompanies it and does not replace it.
4. Prepare for likely replies: the tenant agrees; asks for a smaller rise or later start; raises outstanding repairs; says they will leave; challenges formally. For each, give a sensible landlord response and what to record.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state notice periods, caps, forms or legal tests as fact; mark them `[CHECK locally]` and suggest the local landlord association, rent board or a solicitor or attorney to confirm.
- Do not draft anything that pressures the tenant, threatens eviction as a response to questioning the rise, or links the increase to a complaint the tenant made; that can be unlawful retaliation in many places.
- Do not invent comparables or market data. If none are given, say the figure is unsupported and list what evidence to collect.
- Keep the covering letter under 200 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you send
Checklist marked `[CHECK locally]`.

## Is the increase supportable
Short analysis: percentage rise, comparison with comparables, void-cost comparison, verdict.

## Notice and covering letter
The draft, with [BRACKETS] for gaps.

## Likely replies
Table: reply, suggested response, what to record.
</output_format>
