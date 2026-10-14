---
schema: 1
id: plan-streaming-subscription-rotation
kind: prompt
title: Plan a streaming subscription rotation
description: Turns your watchlist and the services you pay for into a month-by-month rotation, subscribing to one or two at a time, so you watch what you want and pay for less.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [streaming-services, subscription-rotation, watchlist, cancel-and-resubscribe, household-budget]
pairs_with:
  prompts: [triage-entertainment-backlog, plan-franchise-watch-order, pick-movie-for-group]
args:
  - name: services
    description: Each service you pay for or are considering, with its monthly price as you see it, for example "Service A 12.99, Service B 8.99 (annual plan until June)".
    type: text
    required: true
  - name: watchlist
    description: What you want to watch, and which service has it if you know, for example "The Bear S3 (A), new season of X in November (B), live football on Saturdays (C)".
    type: text
    required: true
  - name: household
    description: Who watches and any must-keep needs, for example "kids watch cartoons daily on B; partner needs C for football".
    type: text
    default: just me
  - name: months
    description: How many months to plan.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [What you pay now, The rotation, Before you cancel, Savings estimate]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most households pay for several streaming services at once but watch one or two in any month. Rotating works because cancelling usually keeps access until the end of the paid period and most services let you return later; watchlists and viewing history are often kept. The plan has to respect real constraints: annual plans that cannot be paused, bundles with phone or broadband contracts, sports seasons, a child's daily favourite, shared family profiles, and release schedules where a weekly series is best binged after it finishes. Catalogues and prices change and differ by country, so the person's own information is the source of truth.

Services and prices: {{services}}
Watchlist: {{watchlist}}
Household: {{household}}
Months to plan: {{months}}
</context>

<task>
1. If the watchlist does not say which service carries a title, list those titles and ask the person to check where they are available in their country; plan the rest. Never assume where a title streams.
2. Total what they pay now per month and over {{months}} months, using only their prices and currency.
3. Mark services that cannot rotate (annual plans, bundles, must-keep household needs) and keep them fixed.
4. Build a month-by-month rotation that keeps at most one or two rotating services at a time, grouping titles so each paid month is used fully. Place weekly-release series in the month after they finish when the person is happy to wait, and say so.
5. For each month list the service or services, what to watch and a cancel-by reminder (just before renewal).
6. Before you cancel: a checklist of what to check (renewal date, whether access continues to the end of the period, annual or bundle terms, downloads that will disappear, shared profiles).
7. Estimate the saving against the current total, clearly labelled as an estimate from their prices.
</task>

<constraints>
- Use only the prices and availability the person gave; do not state catalogues, prices or offers yourself.
- Do not recommend sharing passwords outside the household or breaking terms of service.
- Keep must-keep needs untouched even if dropping them would save more; mention the trade-off once.
</constraints>

<output_format>
## What you pay now
Short table and totals.
## The rotation
Table: Month | Active services | Watch | Cancel by.
## Before you cancel
Checklist.
## Savings estimate
One or two lines with the numbers.
</output_format>
