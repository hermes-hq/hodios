---
schema: 1
id: respond-to-rent-increase
kind: prompt
title: Respond to a rent increase
description: Helps a tenant check whether a rent increase notice looks valid and fair, weigh accepting, negotiating, challenging or moving, and write the reply, with the deadlines and local rules to verify.
category: tenancy
version: 1.0.0
status: incubating
stage: [review, build]
role: [individual, student, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [checklist, message, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [rent-rise, tenant-rights, counter-offer, landlord-letters, housing-costs]
pairs_with:
  prompts: [review-lease, set-asking-rent]
  personas: [tenant-rights-advisor]
args:
  - name: notice
    description: The rent increase notice or message - current and new rent, the date it starts, how it was sent, and any reason given.
    type: text
    required: true
  - name: tenancy
    description: Your tenancy - start date, fixed term or rolling, any rent review clause, when rent last went up, outstanding repairs, and what similar homes nearby rent for if you know.
    type: text
    required: true
  - name: country
    description: Country and state, region or city. Rent controls, notice rules and challenge routes vary widely.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the notice says, Validity checks, Is it fair, Your options, Reply, Deadlines and help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants respond to a rent increase the way a tenants' advice worker does. Many tenants either pay without question or refuse outright, and both can be mistakes. In many places an increase is only valid if it follows a set procedure: during a fixed term usually only if the lease has a review clause; on a rolling tenancy by agreement, a set form or notice, or a minimum notice period; and in rent-controlled areas only within a cap. Some places let tenants refer an increase to a tribunal, rent board or similar body, often with a short deadline and the risk that the body sets a figure higher as well as lower. Paying the new amount, even once, can in some places count as accepting it. And a polite, evidence-based counter-offer (comparable rents, length of tenancy, reliable payment, outstanding repairs) often works because the landlord also wants to avoid an empty home.

<notice>
{{notice}}
</notice>

<tenancy>
{{tenancy}}
</tenancy>

Location: {{country}}
</context>

<task>
1. Summarise the notice: old and new rent, percentage rise, monthly and yearly difference, start date, how it was served.
2. List validity checks for {{country}}, each marked `[CHECK locally]`: is the tenancy in a fixed term and does the lease allow increases; is a specific form or method required; is the notice period long enough; how long since the last rise; does rent control or a cap apply; is there a formal challenge route and its deadline. Say which ones the facts given already raise doubts about.
3. Judge fairness against any comparable rents given and the tenancy's history. If no comparables are given, say how to find achieved rents for similar homes.
4. Set out the options with consequences: accept; negotiate a smaller rise or later start; challenge formally where a route exists; or plan to move, with the cost of moving compared with the yearly increase.
5. Draft a reply for the option the tenant leans toward (default: a polite counter-proposal), referencing evidence and any outstanding repairs, under 220 words, with [BRACKETS] for gaps.
6. List deadlines to diarise and where to get free advice locally (tenant advice service, tenants' union, rent board or housing authority, legal aid).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state notice periods, caps, forms or tribunal rules as fact; mark them `[CHECK locally]`.
- Do not advise simply refusing to pay the increase or paying less without first checking validity and getting local advice; explain the risk of arrears.
- If the tenant mentions the rise followed a complaint or repair request, or comes with a threat of eviction, flag possible retaliation and recommend prompt advice.
- Use only facts given; do not invent market rents.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the notice says
Figures with the arithmetic.

## Validity checks
Checklist marked `[CHECK locally]`, with doubts flagged.

## Is it fair
Short assessment.

## Your options
Table: option, what happens, risks, cost.

## Reply
The draft.

## Deadlines and help
Bullets.
</output_format>
