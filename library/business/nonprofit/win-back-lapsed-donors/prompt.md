---
schema: 1
id: win-back-lapsed-donors
kind: prompt
title: Win back lapsed donors
description: Plans a reactivation campaign for donors who stopped giving - segments by recency and value, a message sequence that admits the gap, an easy ask, and how to measure it.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, marketer, writer]
subject: [nonprofit]
inputs: [dataset, notes]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [lapsed-donors, donor-retention, reactivation, donor-segmentation, appeal-sequence]
pairs_with:
  prompts: [analyze-donor-data, write-donor-appeal, write-donor-thank-you, plan-monthly-giving-programme]
  personas: [nonprofit-advisor]
args:
  - name: donors
    description: A summary of the lapsed donors - counts by last gift year, gift size bands, how they first gave (event, appeal, online, in memory), channels you have permission to use. No personal details needed.
    type: text
    required: true
  - name: organisation
    description: What your organisation does, what has changed or been achieved since these donors last gave, and a current need.
    type: text
    required: true
  - name: country
    description: Country, so consent and data protection rules for contacting past donors can be flagged.
    type: string
output_contract:
  format: markdown
  sections: [Segments, Why they lapsed, Message sequence, The ask, Consent check, Measuring it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help nonprofits bring back donors who stopped giving. Many first-time donors never give again, and the chance of reactivation falls with every year since the last gift, so the recent lapsed are worth far more effort than donors gone for five years. Donors rarely lapse out of anger; more often they were never thanked well, never heard what their gift did, gave for one moment (an event, a disaster, a memorial) or simply forgot. Reactivation messages work when they show what has happened since, make a specific and modest ask, and do not guilt the donor. Contacting past donors is subject to consent and data protection rules that vary by country and by channel.
</context>

<task>
Plan the win-back campaign.

<donors>
{{donors}}
</donors>

<organisation>
{{organisation}}
</organisation>

{{#country}}Country: {{country}}{{/country}}

1. Segments: group the lapsed donors by recency (for example lapsed 13-24 months, 25-48 months, older) and value, and by how they first gave. Set the priority of each, with the reasoning, and recommend leaving very old, low-value segments out or giving them a single light touch.
2. Why they lapsed: likely reasons per segment based on how they first gave, labelled as hypotheses.
3. Message sequence: for the top two segments, three touches over about six to eight weeks across the permitted channels. Draft the first message in full for each: it acknowledges they supported you before, says what has happened since with one concrete result, and makes one ask.
4. The ask: amount or action per segment, anchored to their last gift and, for some, an option to give monthly or simply to re-subscribe for updates.
5. Consent check: what to confirm before contacting each segment by each channel, as questions for whoever handles data protection.
6. Measuring it: reactivation rate per segment, cost per reactivated donor, second-gift rate within 12 months, and a small control group if the list is large enough.
</task>

<constraints>
- Use only the figures given; never invent donor counts, response rates or impact numbers. Where an impact result is missing, use `[result: ...]`.
- No guilt, no "we miss you" clichés without substance, no false urgency.
- Do not assume consent to email or phone; flag it.
- Keep messages short and in the organisation's plain voice.
</constraints>

<output_format>
## Segments
Table: Segment | Size | Priority | Reasoning.
## Why they lapsed
## Message sequence
Per segment: touch schedule, then the first message in full.
## The ask
## Consent check
## Measuring it
</output_format>
