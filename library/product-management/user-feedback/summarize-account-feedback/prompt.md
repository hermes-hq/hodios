---
schema: 1
id: summarize-account-feedback
kind: prompt
title: Summarise one account's feedback
description: Summarises everything one key customer account has said across tickets, calls, emails and surveys into pains, requests, sentiment over time and open loops, for a business review or renewal.
category: user-feedback
version: 1.0.0
status: incubating
stage: [operate]
role: [product-manager, sales-rep, support-agent, manager]
requires: [none]
inputs: [text, notes, transcript]
output: [summary, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [key-account, account-management, business-review, renewal-prep, account-health]
pairs_with:
  prompts: [prepare-business-review, prepare-renewal-conversation, extract-feedback-fields]
args:
  - name: account_material
    description: The account's tickets, call notes, emails, survey responses and feature requests, with dates and who said what where available.
    type: text
    required: true
  - name: purpose
    description: What the summary is for, for example a quarterly business review, a renewal, an escalation or a product team briefing. Optional.
    type: string
  - name: account_context
    description: Plan, size, contract dates, key contacts and roles, and the status of known requests if you have it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Account snapshot, Top pains, Requests, Sentiment over time, Risk and opportunity signals, Open loops, Talking points, Gaps in the record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare account feedback summaries for customer success, sales and product teams. Raw account history is repetitive and scattered: the same complaint appears in five tickets, an email and a call note, often in different words. A useful summary deduplicates by underlying problem, shows who raised it (an executive buyer and a daily user care about different things), when it was last raised, and whether anything was done. It separates pains from requested solutions, tracks sentiment over time with evidence rather than adjectives, and surfaces risk signals such as a new decision maker, a competitor mention or complaints about value. It never invents the status of a request: unknown is a valid answer and a prompt to find out.

Account material:

<account_material>
{{account_material}}
</account_material>
{{#purpose}}

Purpose: {{purpose}}
{{/purpose}}
{{#account_context}}

Account context:

<account_context>
{{account_context}}
</account_context>
{{/account_context}}
</context>

<task>
1. Write an account snapshot: who they are, sources covered with date range and count, and any gaps (for example no call notes in the last six months).
2. Deduplicate into top pains: for each, the underlying problem, how often and how recently it was raised, who raised it (role), business impact in their words, and one short verbatim quote with source and date.
3. List requests separately: what they asked for, the problem behind it, who asked, and status only if given (shipped, planned, declined, unknown).
4. Describe sentiment over time: a short timeline of turning points with evidence (escalations, praise, survey scores, tone changes), not a single label.
5. Flag risk and opportunity signals: champion or sponsor changes, competitor mentions, value or price complaints, usage concerns, expansion interest, with the evidence for each.
6. List open loops: promises made to the customer, unanswered questions and unresolved tickets, with owner if known.
7. Draft talking points for the stated purpose: what to acknowledge, what to report back on, what to ask, and what not to say (internal notes not to share).
8. Note gaps in the record: what you would need to confirm before the meeting.
</task>

<constraints>
- Use only the material given; do not invent quotes, dates, people or statuses.
- Quote verbatim and attribute by role and date; mark paraphrases as such.
- Keep internal comments (for example agent notes about the customer) out of anything meant to be shared with the customer.
- Keep the summary readable in five minutes.
</constraints>

<output_format>
## Account snapshot
Short paragraph.

## Top pains
A table: problem | times raised | last raised | raised by | impact | quote.

## Requests
A table: request | underlying problem | asked by | status.

## Sentiment over time
A short dated timeline.

## Risk and opportunity signals
Bullets with evidence.

## Open loops
A table: item | promised by or to | owner | status.

## Talking points
Bullets for the stated purpose.

## Gaps in the record
Bullets.
</output_format>
