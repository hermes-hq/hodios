---
schema: 1
id: chase-delayed-insurance-claim
kind: prompt
title: Chase a delayed insurance claim
description: Builds a timeline of a stalled insurance claim, works out what is actually holding it up, and drafts a chaser and then a formal complaint about the delay with the costs it has caused.
category: insurance
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent, founder]
requires: [none]
inputs: [text, notes]
output: [message, table, plan]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [claim-delay, insurance-complaint, interim-payment, claims-timeline, ombudsman]
pairs_with:
  prompts: [appeal-insurance-denial, review-claim-settlement-offer, prepare-for-loss-adjuster-visit]
  workflows: [insurance-claim-track]
args:
  - name: history
    description: The claim so far - date of loss, date reported, claim reference, each contact with dates (calls, emails, visits), what was promised and what you sent. Rough notes are fine.
    type: text
    required: true
  - name: impact
    description: What the delay is costing you - living elsewhere, a business not trading, a car off the road, repair quotes going up, stress, extra travel - with amounts where known.
    type: text
  - name: country
    description: Country and region. Complaint timescales and whether an ombudsman or regulator handles insurance complaints vary.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Claim timeline, What is holding it up, Chaser, Formal complaint, Escalation path]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most stalled claims are not refused, they are stuck: waiting on a document nobody asked for clearly, an adjuster's report, a supplier, a recovery from another insurer, or a handler who has moved on. Phone calls leave no record, so the chaser that works is written, short, cites the claim reference and the dates, and asks for specific things by a specific date: what is outstanding, who is responsible for it, and when a decision or payment will be made. If the claim is partly agreed, an interim payment for the undisputed part can often be requested. In many countries an insurer must handle claims promptly and fairly, must respond to a complaint within a set period, and an ombudsman or dispute service can award compensation for unreasonable delay and the distress and costs it caused. That route usually opens only after the insurer has had its chance to answer a formal complaint, so making the complaint formal, in writing, starts the clock.
{{#country}}

Country: {{country}}
{{/country}}
{{#impact}}

<impact>
{{impact}}
</impact>
{{/impact}}
</context>

<task>
<history>
{{history}}
</history>

1. Claim timeline: a table of every dated event, with gaps longer than two weeks with no contact highlighted, and anything the insurer promised that did not happen.
2. What is holding it up: the most likely blockers given the history, and anything the person still owes (documents, quotes, a signed form). Be honest if the delay is partly on their side.
3. Chaser: a short written message citing the reference and key dates, listing what is outstanding, asking who owns each item and by when, asking for an interim payment for any agreed part, and setting a response date (often 10 to 14 days).
4. Formal complaint (for use if the chaser fails or the delay is already serious): states it is a formal complaint, sets out the timeline, the impact with figures, what the person wants (a decision, payment, interest or compensation for costs, an apology), and asks for a final response.
5. Escalation path: the internal complaint timescale to check, the ombudsman or dispute service where one exists, how to record further costs, and when advice (a broker, solicitor or free advice service) is worth it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent statutory deadlines, regulator names or compensation amounts; say what to check locally.
- Keep the messages factual and polite; no threats the person cannot carry out.
- Do not predict an ombudsman outcome.
- If the person is in hardship (no home, no income, vulnerable), say to tell the insurer explicitly, since many insurers have processes to prioritise these claims.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
How long the claim has been running, the main blocker, and the next step.

## Claim timeline
Table: date | event | promised next step | happened?

## What is holding it up
Bullets.

## Chaser
The message, ready to send.

## Formal complaint
The message, ready to send if needed.

## Escalation path
Numbered steps.
</output_format>
