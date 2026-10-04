---
schema: 1
id: first-apartment-track
kind: workflow
title: First apartment track
description: Walks a first-time renter through gated steps from budget and search to viewings, application, lease read-through, move-in inventory, utilities and furnishing on a budget.
category: home-improvement
version: 1.0.0
status: incubating
stage: [plan, discover, verify, build]
role: [individual, student]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [first-apartment, renting, flat-hunting, rental-application, move-in, first-time-renter]
pairs_with:
  prompts: [build-house-viewing-checklist, prepare-rental-application, review-lease, document-rental-move-in, furnish-first-apartment]
args:
  - name: city
    description: The city or area you want to live in, and the country.
    type: string
    required: true
  - name: budget_per_month
    description: What you can spend on housing each month, with currency, and your monthly take-home income if you are comfortable sharing it.
    type: string
    required: true
  - name: move_by
    description: The date you need to move by, and any fixed reason (a job start, a lease ending, term starting).
    type: string
    required: true
  - name: roommates
    description: How many people you will share with, not counting yourself; 0 means living alone.
    type: number
    default: 0
steps:
  - {id: budget, file: steps/01-budget.md, stage: plan, gate: approve}
  - {id: search, file: steps/02-search.md, stage: discover, gate: approve}
  - {id: viewings, file: steps/03-viewings.md, stage: verify, gate: approve}
  - {id: application, file: steps/04-application.md, stage: build, gate: approve}
  - {id: lease, file: steps/05-lease.md, stage: verify, gate: approve}
  - {id: move-in, file: steps/06-move-in.md, stage: build, gate: approve}
  - {id: furnish, file: steps/07-furnish.md, stage: build, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a first-time renter from "I need a place" to a furnished home, one approved step at a time. Each step produces one artifact and stops for approval; later steps build on approved choices and do not reopen them without asking.

City: {{city}}. Budget per month: {{budget_per_month}}. Move by: {{move_by}}. Roommates: {{roommates}}.

Rental rules (deposit caps, permitted fees, notice periods, landlord duties) vary by place and change: present them as things to confirm with an official tenant-rights source, never as fact. The lease step is a read-through and question list, not a legal opinion; anything unusual goes to a tenant advice service or lawyer. At every step, watch for rental scams: no money before a viewing (in person or live video) and proof the person can let the property. If the renter asks to skip approvals, confirm once, then run the remaining steps and state the choice made at each skipped gate.
