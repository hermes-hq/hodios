---
schema: 1
id: build-adhd-friendly-budget
kind: prompt
title: Build an ADHD-friendly budget
description: Builds a low-friction budget for someone with ADHD or executive function difficulties, built on automation, visible balances, few decisions and fees-avoidance, not daily tracking or willpower.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, student]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [adhd, executive-function, neurodivergent, low-friction-system]
pairs_with:
  prompts: [set-up-money-accounts-system, fix-failing-budget, curb-impulse-spending, plan-bill-payment-calendar]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Income and how it arrives, main bills, what goes wrong now (late fees, forgotten subscriptions, impulse buys, lost track of balance, avoidance of opening the banking app).
    type: text
    required: true
  - name: what_helps
    description: Things that already work for you elsewhere (visual reminders, body doubling, rewards, routines). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What is costing you, Automate the boring parts, One number to watch, Catch the leaks, A money routine that fits, When it slips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Standard budgeting advice assumes steady attention: log every purchase, check categories weekly, remember due dates. For many people with ADHD this fails, and the costs show up as an "ADHD tax": late fees, forgotten subscriptions and free trials, missed refunds, duplicate purchases, impulse buys and avoidance of looking at the account. What works better is a system that needs as few decisions and as little memory as possible: automate bills and saving on payday; reduce the day-to-day to one visible number (what is left to spend this week); make leaks impossible or loud (alerts, virtual cards for trials, a monthly subscription sweep); use external structure (calendar blocks, a money buddy, a short routine tied to an existing habit); and plan for lapses with a reset instead of shame.

<situation>
{{situation}}
</situation>
{{#what_helps}}What already helps: {{what_helps}}{{/what_helps}}
</context>

<task>
1. What is costing you: from what they said, list the specific "ADHD tax" leaks and estimate the yearly cost where they gave figures.
2. Automate the boring parts: the payday set-up (bills account or pot, automatic payments for every bill that allows it, automatic saving), keeping the number of accounts small. Size it from their figures.
3. One number to watch: a weekly spending allowance moved to a spending account or card each week, so the only question is "what is left this week". Give the amount.
4. Catch the leaks: specific defences for each leak (low-balance and large-payment alerts, a single card for subscriptions, cancel-at-sign-up for free trials, a returns shelf by the door, a 24-hour list for non-essential buys).
5. A money routine that fits: a ten-minute weekly routine anchored to something they already do, with a visual or reward element, using what helps them.
6. When it slips: a simple reset routine for after a missed week or month, and when to ask for support (a trusted person, free money advice, or a clinician if money stress is severe).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose ADHD or comment on treatment; this is about money systems.
- No shame or "just try harder" framing.
- Describe kinds of tools and bank features; do not name apps or banks.
- Fewer steps beats more features; cut anything that needs daily effort unless they ask for it.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is costing you
Table: leak | example | rough yearly cost.

## Automate the boring parts
Checklist with amounts.

## One number to watch
Amount and how it gets there.

## Catch the leaks
Bullets: leak, defence.

## A money routine that fits
Numbered steps, at most five.

## When it slips
Short reset steps.
</output_format>
