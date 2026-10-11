---
schema: 1
id: measure-notification-impact
kind: prompt
title: Measure notification impact
description: Measures the real impact of push, email and in-app notifications with holdouts, opt-outs, unsubscribes, uninstalls and long-term retention rather than open and click rates.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review, verify]
role: [product-manager, marketer, data-analyst, data-scientist]
requires: [none]
inputs: [dataset, text]
output: [plan, table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [push-notifications, lifecycle-messaging, notification-fatigue, incrementality, opt-out-rate, holdout-group]
pairs_with:
  prompts: [design-holdout-experiment, design-notification-strategy, write-push-notifications, define-guardrail-metrics]
args:
  - name: programme
    description: The notifications in scope (types, channels, triggers, frequency), who receives them, and what each is meant to achieve.
    type: text
    required: true
  - name: data
    description: What is measured today (sends, opens, clicks, sessions after click), opt-in and opt-out rates, unsubscribes, uninstalls, complaints, and any holdout or past test results. Optional if you want a measurement plan only.
    type: text
output_contract:
  format: markdown
  sections: [Why opens mislead, Scorecard, Holdout design, Reading current data, Decisions by message type, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You measure notification programmes honestly. Opens and clicks overstate impact because many users who tap a notification would have opened the app anyway that day; only a holdout (users who are eligible but not sent) shows incremental sessions, actions and retention. Notifications also have costs that arrive later and elsewhere: push opt-outs and OS-level disables, email unsubscribes and spam complaints that hurt deliverability, uninstalls, and fatigue that lowers response to every later message. A message can lift today's sessions and lower 90-day retention. A programme-level holdout (a small share never receiving optional notifications) measures the whole system; per-message holdouts measure individual campaigns. Transactional messages (receipts, security alerts) are not tested this way. Email open rates are also distorted by mail privacy features that pre-load images.
</context>

<task>
<programme>
{{programme}}
</programme>
{{#data}}<data>{{data}}</data>{{/data}}

1. Why opens mislead: two or three sentences specific to this programme.
2. Scorecard: for each message type, incremental metrics (sessions, key actions, conversions, retention at 30 and 90 days versus holdout) and cost metrics (opt-out or unsubscribe per thousand sends, uninstalls, complaints, disabled permissions), with definitions.
3. Holdout design: a programme-level holdout (share, duration, how users are chosen and kept), per-message holdouts for high-volume campaigns, exclusions (transactional, legally required messages), and the sample size or duration needed for retention effects.
4. Reading current data: if data is given, say what it can and cannot show, and estimate nothing that needs a holdout.
5. Decisions by message type: keep, change frequency or timing, or cut, with the rule that leads to each (for example cut if incremental key actions are not positive and opt-outs exceed a set level).
</task>

<constraints>
- Do not report click-through or open rates as impact.
- Do not hold out messages that users need for security, legal or transactional reasons.
- Do not invent lift figures; mark estimates as assumptions until a holdout runs.
- Respect consent rules for marketing messages, which differ by jurisdiction.
{{> output/uncertainty}}
</constraints>

<output_format>
## Why opens mislead
Short paragraph.

## Scorecard
Table: metric | type (benefit or cost) | definition | per message or programme.

## Holdout design
Bullets.

## Reading current data
Bullets, or "no data given".

## Decisions by message type
Table: message type | rule | current call.

## Questions
What to confirm.
</output_format>
