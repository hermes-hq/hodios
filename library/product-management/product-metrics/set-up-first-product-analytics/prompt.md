---
schema: 1
id: set-up-first-product-analytics
kind: prompt
title: Set up first product analytics
description: Sets up minimal analytics for a new product - the first ten or so events, five metrics, user identity, consent and a starter dashboard - so early decisions rest on clean data.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, product-manager, software-engineer, data-analyst]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [analytics-setup, starter-events, early-stage, consent, starter-dashboard, instrumentation]
pairs_with:
  prompts: [write-tracking-plan, define-activation-metric, define-north-star-metric, audit-event-tracking-data]
args:
  - name: product
    description: What the product is, who it is for, platforms (web, iOS, Android), the core action users come for, and how it makes money or plans to.
    type: text
    required: true
  - name: context
    description: Stage (pre-launch, first users), team size, tools already in place, where users are (for consent rules), and any questions the team needs answered first. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Questions to answer first, Starter events, Identity and properties, Starter metrics, Consent and privacy, Starter dashboard, Do not track yet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small teams set up their first product analytics. Teams at this stage make two opposite mistakes: tracking nothing and guessing, or auto-capturing everything and drowning in unnamed clicks they never use. A good start is a short list of events tied to a few questions: are people signing up, are they reaching the core action, are they coming back, and are they paying. Identity matters from day one: an anonymous id before signup that is joined to the user id at signup, and an account id for B2B, otherwise funnels and retention break later and cannot be repaired. Server-side events for money and signups are more reliable than client events, which ad blockers and offline devices lose. Consent rules depend on where users are, and analytics cookies or device identifiers can need opt-in in some jurisdictions.

Product: {{product}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Questions to answer first: the four or five product questions the data must answer in the next three months.
2. Starter events: about ten events in object-action form (for example account_created, project_created, invite_sent, subscription_started), each with when it fires, client or server side, and which question it serves. Include one event for the core action.
3. Identity and properties: anonymous and user id handling, account id if B2B, and the few properties worth sending on every event (platform, app version, plan) versus on specific events.
4. Starter metrics: five metrics with exact definitions (signups, activation within a window, weekly active users on the core action, week-4 retention by signup cohort, conversion to paid) and the event each uses.
5. Consent and privacy: what personal data to keep out of events, a consent approach that depends on users' jurisdictions (state the assumption), and data retention. Recommend checking local requirements with someone qualified.
6. Starter dashboard: five to seven charts and how often to look.
7. Do not track yet: what to skip until a real question needs it.
</task>

<constraints>
- Keep to roughly ten to fifteen events; every event must map to a question.
- Do not recommend a specific vendor unless asked; describe requirements instead.
- Never put emails, names, free text or payment details into event properties.
- Do not state privacy law as settled for the user's case; name the assumption and the decision they need to check.
- If the core action is unclear, ask and propose a candidate.
</constraints>

<output_format>
## Questions to answer first
Numbered list.

## Starter events
Table: event | fires when | side | question served.

## Identity and properties
Bullets.

## Starter metrics
Table: metric | definition | event used.

## Consent and privacy
Bullets.

## Starter dashboard
Bullets: chart | cadence.

## Do not track yet
Bullets.
</output_format>
