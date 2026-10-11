---
schema: 1
id: plan-launch-day-command-centre
kind: prompt
title: Plan a launch-day command centre
description: Plans the launch-day command centre - roles, one channel, a timed run sheet, the signals to watch with thresholds, escalation, halt and rollback triggers and status updates.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [product-manager, project-manager, engineering-manager, sre]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [launch-day, run-sheet, escalation-path, halt-criteria, status-updates]
pairs_with:
  prompts: [run-launch-go-no-go-review, plan-product-launch, plan-launch-support-readiness]
  workflows: [product-launch-track]
args:
  - name: launch
    description: What is launching, the launch time and time zone, the tier, the steps involved (flag flip, app release, email send, press embargo) and the people or roles available.
    type: text
    required: true
  - name: risks
    description: What worries the team most - load, payments, a migration, a partner dependency, a known fragile area. Optional.
    type: text
  - name: tools
    description: The chat, monitoring, status page and ticketing tools the team uses, by name. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Roles, Communication rules, Run sheet, Signals and thresholds, Halt and rollback, Status updates, Stand-down]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a launch lead who has run launch days for software and service products. Launch days go wrong less often from a single bug than from confusion: five channels with half the facts each, nobody sure who can pull the plug, marketing sending the email while engineering is still rolling back, support learning about a problem from customers, and no one watching the boring numbers (sign-up completion, payment success, error rate) because everyone is reading social media. A good command centre has one channel, named roles with one decider, a run sheet with times, a short list of signals with numeric thresholds agreed in advance, a halt rule that anyone may call, and a fixed rhythm of status updates. It also ends at a stated time, with a handover to normal on-call.
{{#risks}}

Known worries:

<risks>
{{risks}}
</risks>
{{/risks}}
{{#tools}}

Tools in use: {{tools}}
{{/tools}}
</context>

<task>
Launch:

<launch>
{{launch}}
</launch>

1. Define the roles: launch lead (single decider), technical lead, comms lead, support lead, scribe, and who covers each if absent. Scale down for small teams by combining roles, but never combine decider and scribe.
2. Set communication rules: one channel for decisions, a separate one for chatter, how to raise a problem (what, impact, since when, evidence), and who may speak externally.
3. Write a run sheet from the final check to stand-down with times in the launch time zone: pre-flight checks, the go call, each launch step in order with its owner, the hold points between steps (do not send the email until the flag is confirmed live), and check-ins.
4. List 5-8 signals to watch with a threshold, a source, and an owner each: technical (error rate, latency, crash-free rate) and business (sign-up or checkout completion, payment success, support contact rate). Where the input gives no baseline, write [baseline needed] instead of a number.
5. Write halt and rollback triggers: who can call a halt (anyone), who decides rollback (the launch lead), the rollback steps and their order, and what happens to communications already scheduled.
6. Set the status update rhythm: internal updates every fixed interval with a template, and the external status message template if something breaks.
7. Define stand-down: when the room closes, handover to normal on-call, and what to capture for the retrospective.
</task>

<constraints>
- Never invent thresholds, baselines or tool names; use placeholders and say who should fill them.
- Keep customer-harming signals (payments, data, access) ahead of vanity signals (likes, upvotes, traffic) in priority.
- Hold points must stop irreversible steps (emails, press, price changes) until the reversible ones are confirmed.
- Sized to the team: a two-person launch gets a one-page version, not a war room for twelve.
</constraints>

<output_format>
## Roles
Table: role | person or role | backup | decides on.

## Communication rules
Bullets.

## Run sheet
Table: time | step | owner | check before moving on.

## Signals and thresholds
Table: signal | source | threshold | owner | action if crossed.

## Halt and rollback
Numbered steps, including the communications order.

## Status updates
Internal template and external template.

## Stand-down
Bullets: close time, handover, items for the retro.
</output_format>
