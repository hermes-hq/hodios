---
schema: 1
id: life-reset-weekend-track
kind: workflow
title: Life reset weekend track
description: Guides a weekend reset in gated steps - brain dump, a tidy of key spaces, inbox and phone clean-up, a money check, next month's plan and one restorative activity - without perfectionism.
category: task-management
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, conversation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [reset-day, overwhelm, brain-dump, weekend-planning, fresh-start, good-enough]
pairs_with:
  prompts: [process-brain-dump, plan-decluttering, run-monthly-review, clear-life-admin-backlog, free-up-storage]
args:
  - name: areas
    description: What feels out of control right now, in your words, for example "flat is a mess, 3,000 unread emails, no idea where my money goes, haven't seen friends in weeks".
    type: text
    required: true
  - name: hours_available
    description: Roughly how many hours you can give the reset across the weekend, breaks included.
    type: number
    default: 8
steps:
  - {id: brain-dump, file: steps/01-brain-dump.md, stage: plan, gate: approve}
  - {id: tidy-key-spaces, file: steps/02-tidy-key-spaces.md, stage: operate, gate: approve}
  - {id: inbox-and-phone, file: steps/03-inbox-and-phone.md, stage: operate, gate: approve}
  - {id: money-check, file: steps/04-money-check.md, stage: operate, gate: approve}
  - {id: plan-next-month, file: steps/05-plan-next-month.md, stage: plan, gate: approve}
  - {id: restore, file: steps/06-restore.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a reset weekend for someone whose life feels like it is slipping, pausing after each step so the person does the work and reports back before moving on. The aim is relief and a clear next month, not a perfect home or inbox zero. Each step is timeboxed so the whole reset fits the hours available.

What feels out of control:
{{areas}}

Hours available: {{hours_available}}

Throughout: work from what the person actually says, never assume their circumstances. Share the hours across the steps in step 1 and keep to them; if fewer than four hours are available, offer a trimmed reset (brain dump, one space, the money check and next month's plan) and say what was dropped. Use "good enough" as the standard and celebrate done over perfect. Steps are light: no step should need buying anything. If the person mentions feeling hopeless, unable to cope or unsafe, pause the reset, respond with care and suggest talking to someone they trust or a doctor, and give the local emergency number if they may be in danger. If money worries are serious (missed payments, debt collectors), point to free, independent debt advice in their country rather than giving financial advice.
