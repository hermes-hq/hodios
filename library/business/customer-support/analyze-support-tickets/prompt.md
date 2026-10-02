---
schema: 1
id: analyze-support-tickets
kind: prompt
title: Analyse support tickets
description: Finds the top contact drivers in a ticket export and ranks deflection opportunities by volume and effort, with root cause and owner. Use for a monthly or quarterly support review.
category: customer-support
version: 1.0.0
status: incubating
stage: [discover, operate]
role: [support-agent, operations-manager, product-manager, data-analyst]
inputs: [dataset, ticket, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contact-drivers, ticket-deflection, root-cause, voice-of-the-customer]
pairs_with:
  prompts: [build-support-macros, write-help-center-article]
args:
  - name: tickets
    description: A ticket export or sample - subject, body or summary, tags, channel, handle time, replies, reopen and satisfaction if available. Mask personal data before pasting.
    type: text
    required: true
  - name: period
    description: The time span the tickets cover (for example "September 2026") and whether this is all tickets or a sample.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Data notes, Contact drivers, Opportunities, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a support operations analyst. Your goal is fewer, easier contacts: every ticket is a sign that something in the product, policy, communication or help content did not work. Existing tags are often unreliable, so you classify by the customer's underlying reason for contacting, then rank where a fix would remove the most volume and effort.
</context>

<task>
Analyse these tickets for the period: {{period}}.

<tickets>
{{tickets}}
</tickets>

1. Data notes: state how many tickets you analysed, which fields are present, whether this looks like a full export or a sample, and any quality issues (missing fields, duplicate tickets, unreliable tags). If the period is empty, say what the data suggests or that it is unknown.
2. Build a contact-driver taxonomy from the content, not just the tags: 6 to 12 drivers for a full export, fewer for a small sample (never close to one driver per ticket), each a specific customer need ("Can't find invoice download", not "Billing"). Assign each ticket to one primary driver; mark unclear ones as "Unclassified".
3. For each driver, compute: count and share of tickets, and effort where the data allows (average handle time, replies per ticket, reopen rate, satisfaction). Show counts, not just percentages.
4. Find the root cause category for each driver: product defect, product usability, missing or unclear help content, policy, communication gap (for example no shipping notification), or account and billing operations. Quote one or two short, anonymised ticket snippets as evidence.
5. Identify deflection or elimination opportunities for each major driver: fix the product, change the policy, send proactive communication, improve or add help content, add in-product guidance, or automate the answer. Name the likely owner team.
6. Rank opportunities by expected impact (volume × effort per ticket) and ease (low, medium, high effort to implement). Put quick, high-impact items first.
7. Note what the data cannot tell you and what to track next period to measure progress.
</task>

<constraints>
- Count from the data; do not estimate counts you did not compute. If the input is a sample, say percentages are of the sample and do not extrapolate totals without stating the assumption.
- Do not quote personal data. Paraphrase or mask snippets.
- Do not claim a trend over time unless the data spans more than one period.
- If there are fewer than about 20 tickets, present findings as indicative, not conclusive.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five bullets: the biggest drivers and the top two opportunities, with numbers.

## Data notes
Bullets.

## Contact drivers
Table: Driver | Tickets | Share | Avg handle time or replies | Root cause | Evidence snippet.

## Opportunities
Table: Rank | Opportunity | Drivers addressed | Tickets affected | Effort to implement | Owner.

## Next steps
Numbered, including what to measure next period.
</output_format>
