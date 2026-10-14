---
schema: 1
id: respond-to-client-hiring-offer
kind: prompt
title: Respond to a client who wants to hire you in-house
description: For a freelancer offered a permanent job by a client. Compares the offer with staying independent on like-for-like numbers and drafts the reply - accept, counter or decline.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan]
role: [consultant, software-engineer, designer, writer]
advice_risk: [legal, financial]
requires: [none]
inputs: [message, preferences]
output: [report, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [job-offer, client-relationship, going-in-house, employment-status, conversion-fee, career-decision]
pairs_with:
  prompts: [evaluate-job-offer, negotiate-job-offer, pitch-retainer-to-client, part-ways-with-client]
args:
  - name: offer
    description: The client's offer or message in full, plus anything said in conversation (title, salary, benefits, hours, location, start date, who you would report to).
    type: text
    required: true
  - name: situation
    description: Your current freelance numbers (last 12 months' income, how much of it comes from this client, typical utilisation, business costs), your other clients and pipeline, what you want from the next few years, and your country.
    type: text
    required: true
  - name: terms
    description: Anything in your current contract or platform terms about being hired by the client (conversion or buyout fee, non-solicitation, exclusivity, notice), and whether you came to this client through an agency or marketplace.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [What is on the table, Like-for-like comparison, Options, Recommendation, Reply, Before you sign]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer answer a client who says "we'd love to have you on the team full time". What experienced freelancers know: the offer is a compliment and a signal of leverage, not an obligation; a salary cannot be compared with a day rate directly, because the freelance figure has to cover unpaid days (holidays, sickness, admin, gaps between clients), business costs, self-funded pension and insurance, and in many countries different tax and social charges, while the salary comes with benefits and paid leave but also an employer who now owns your time and, often, your side work; if most of your income already comes from this one client, the real choice may be between dependence as a contractor and dependence as an employee, and some tax authorities treat a contractor who works like an employee as one; agencies and marketplaces often charge a conversion fee or forbid direct hiring for a period, and contracts can carry non-solicitation or exclusivity clauses; and there are middle options clients rarely suggest themselves: a fixed-term contract role, a part-time or capped-days retainer, a trial period as a contractor, or an interim role while they hire someone else. Declining well usually keeps the client.
</context>

<task>
<offer>
{{offer}}
</offer>

<situation>
{{situation}}
</situation>

{{#terms}}
<terms>
{{terms}}
</terms>
{{/terms}}

1. Say once, briefly, that this is general information and that contract clauses, employment status and tax differ by country and need a local accountant or employment adviser for a firm answer. State the country you are assuming; if none is given, ask for it and keep tax points generic.
2. Summarise what is actually on the table and what is missing (equity terms, notice period, IP and side-work policy, remote rules, probation, bonus conditions). List the questions to ask the client before deciding.
3. Build a like-for-like comparison from the numbers given: freelance income converted to an equivalent salary by subtracting business costs and the value of benefits and paid leave the freelancer currently funds, shown as a range with each assumption visible. If a number is missing, mark it and show how the result would change; never fill it with an invented market figure.
4. Name the non-money factors the freelancer has stated (autonomy, variety, stability, learning, team) and the concentration risk if this client is a large share of income in either path.
5. Lay out the options: accept as offered, accept with negotiated changes, propose a middle arrangement (fixed-term contract, capped retainer, trial period, interim cover), or decline and keep the client. For each: what changes, what it costs or earns, and the risk.
6. Recommend one option in two or three sentences, tied to what the freelancer said they want. If the data points both ways, say so and name the one question that would settle it.
7. Draft the reply for the recommended option: warm, thanks them, gives a clear answer or counter-proposal, protects the current project, and leaves the door open. Under 180 words.
8. List what to check before signing anything: conversion or buyout fees, non-solicitation and exclusivity, what happens to existing clients and IP, notice to other clients, and closing the business side (final invoices, registrations) if they accept.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent salaries, market rates, tax rates or benefit values; use the freelancer's numbers or label a figure as an assumption to check.
- Do not tell the freelancer that a contract clause is or is not enforceable; say what to ask an adviser.
- Do not suggest hiding a conversion fee from an agency or platform, or arranging the hire to get around one.
- Do not push toward either path; employment and freelancing are both legitimate, and the decision follows the freelancer's stated goals.
- The reply must not disclose other clients' names or rates.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is on the table
Bullets: the offer, what is missing, questions to ask the client.

## Like-for-like comparison
Table: item | freelance (current) | employed (offer) | note. End with the equivalent-salary range and its assumptions.

## Options
Table: option | what changes | money | risk.

## Recommendation
Two or three sentences.

## Reply
Ready to send.

## Before you sign
Checklist.
</output_format>
