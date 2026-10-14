---
schema: 1
id: decide-whether-to-take-second-job
kind: prompt
title: Decide whether to take a second job
description: Weighs taking a second job or regular gig against the real take-home after tax and costs, the hours and energy it uses, and what the main job's contract allows.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker, student]
requires: [none]
advice_risk: [financial]
inputs: [text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [second-income, side-work, effective-hourly-rate, burnout, employment-contract]
pairs_with:
  prompts: [check-side-income-tax-rules, decide-whether-to-say-yes, plan-side-business]
args:
  - name: offer
    description: The second job or gig - pay, hours, schedule, travel, how long it lasts, and any costs (equipment, fuel, platform fees).
    type: text
    required: true
  - name: situation
    description: Your main job and its hours, why you want the extra money (target amount or goal), your energy, health and caring duties, and your country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What it really pays, What it costs in time and energy, Main job and rules to check, Alternatives, Verdict, If you take it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide whether to take on a second job. Your limits:
{{> guardrails/professional-limits}}

The headline rate of a second job overstates what it pays. Extra income may be taxed at the person's top rate or affect benefits, student support or tax credits; there may be costs (travel, fuel, equipment, platform fees, childcare); and unpaid time (commuting, waiting, admin) lowers the effective hourly rate. The time comes out of rest, family and the main job's performance, and the cost in sleep and energy tends to grow after the first few weeks. Many employment contracts restrict outside work (exclusivity, conflicts of interest, working-time limits, notice to the employer), and some sectors have legal limits on total weekly hours. A second job works best when it has a clear purpose (a debt target, a fixed-term goal) and an end date or review point; it works worst as an open-ended response to a budget that does not balance.

Offer:
<offer>
{{offer}}
</offer>

Situation:
<situation>
{{situation}}
</situation>
</context>

<task>
1. Work out what it really pays: gross per month, minus an estimate of tax and deductions at the person's likely rate (labelled as an estimate to verify for their country), minus costs, divided by all hours including travel and unpaid time. Show the effective hourly rate.
2. Compare that with the stated goal: how many months to reach the target amount, if there is one.
3. Show what it costs in time and energy: the new weekly schedule, what gives way (sleep, family, exercise, main-job focus), and warning signs that it is costing too much.
4. List main-job and legal points to check: contract clauses on outside work and conflicts of interest, telling the employer, working-time limits, effects on benefits or student support. Do not state these as fact; say where to check.
5. Consider alternatives that might reach the same goal: overtime or more hours in the main job, a raise, cutting a cost, a one-off sale, or a shorter fixed-term stint.
6. Give a verdict: take it, take it with an end date and conditions, or decline, with reasons tied to the person's goal and capacity.
7. If they take it: a review date, the signs to stop, and how to protect the main job.
</task>

<constraints>
- Label tax and benefit figures as rough estimates; tell the person to check with the official tax authority or an adviser for their country.
- Do not assume the main employer allows outside work.
- If the person describes exhaustion, health problems or debt pressure, say so plainly and point to free debt or health advice where relevant.
- Base the verdict on their goal and capacity, not on a general view about hustle or rest.
</constraints>

<output_format>
## What it really pays
Table: Item | Per month. Then the effective hourly rate and months to goal.

## What it costs in time and energy
The new weekly schedule and what gives way.

## Main job and rules to check
Checklist.

## Alternatives
Bullets with rough comparison.

## Verdict
Take it, take it with conditions, or decline, with reasons.

## If you take it
Review date, stop signs, protecting the main job.
</output_format>
