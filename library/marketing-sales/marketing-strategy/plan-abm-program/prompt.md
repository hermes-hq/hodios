---
schema: 1
id: plan-abm-program
kind: prompt
title: Plan an account-based marketing programme
description: Plans an account-based marketing programme with account selection and tiers, plays per tier, ads, content and sales coordination, budget per account and account-level measures.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, sales-rep, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [saas]
tags: [account-based-marketing, b2b-marketing, target-accounts, sales-alignment, enterprise]
pairs_with:
  prompts: [plan-account-based-outreach, map-buying-committee, build-ideal-customer-profile, write-marketing-sales-sla]
  personas: [fractional-cmo]
args:
  - name: business
    description: What you sell, average deal size, sales cycle length, who buys (roles in the buying group), and your best current customers.
    type: text
    required: true
  - name: resources
    description: Number of sales reps and marketers, budget for the programme, tools you have (CRM, ad platforms, intent data, sales engagement), and any account list you already have.
    type: text
    required: true
  - name: goal
    description: What the programme should achieve, for example pipeline from 50 named accounts in two quarters, or expansion in existing customers. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Programme summary, Is ABM right here, Account selection and tiers, Plays by tier, Sales and marketing coordination, Budget, Measurement, First 90 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a B2B marketing lead who has run account-based programmes. ABM pays off when deals are large enough and buying groups complex enough that treating each account as a market of its own is worth the cost; for small deals and fast cycles it is usually waste. Programmes work in tiers: a handful of one-to-one accounts with bespoke work, a few dozen one-to-few accounts handled by cluster (industry or use case), and a larger one-to-many tier with light personalisation. The usual failure is a marketing-only programme: ads to a list that sales never works. ABM only works when sales and marketing agree the list, the plays and the follow-up, and when success is measured at the account level (engagement across the buying group, meetings, opportunities, pipeline), not leads.
</context>

<task>
<business>
{{business}}
</business>

<resources>
{{resources}}
</resources>

{{#goal}}Goal: {{goal}}{{/goal}}

1. Is ABM right here: check deal size, cycle length and buying group against the cost of the programme. If it does not fit, say so and suggest the better motion, then stop after a short note.
2. Account selection: criteria from the best customers (fit, firmographics, technology, triggers and intent signals where available), how to build and agree the list with sales, and how many accounts the team can actually cover. Split into tiers with counts.
3. Plays by tier: for each tier, the plays (research and account plan, tailored content or landing pages, targeted ads to the buying group, direct mail or gifts only where appropriate, events or dinners, executive outreach, sales sequences), who runs each and the cadence. Personalise by role in the buying group, not just by company name.
4. Coordination: the weekly account review, who owns each account, what signals trigger sales action (engagement thresholds, intent spikes, website visits by known accounts), and how feedback flows back.
5. Budget: cost per account per tier and the total, checked against expected pipeline per tier.
6. Measurement: account coverage (contacts engaged per account), engagement trend, meetings, opportunities, pipeline and win rate versus non-target accounts, sales cycle length; with a review at 90 and 180 days and when to rotate accounts out.
7. First 90 days: the sequence of setup, pilot with a small tier, and review.
</task>

<constraints>
- Do not invent company names for the account list or benchmark figures; describe criteria and leave the list for the user's data.
- Respect privacy rules for contacting individuals and for intent and tracking data in the user's region; flag consent needs rather than stating the law.
- Keep plays within the stated team capacity; count hours.
{{> output/uncertainty}}
</constraints>

<output_format>
## Programme summary
Five bullets: goal, account counts per tier, main plays, budget, success measure.

## Is ABM right here

## Account selection and tiers
Criteria and a table: Tier | Accounts | Personalisation level | Owner.

## Plays by tier
A table: Tier | Play | Audience in buying group | Owner | Cadence.

## Sales and marketing coordination

## Budget
A table: Tier | Cost per account | Accounts | Total.

## Measurement
Measures, targets as placeholders or user data, review points.

## First 90 days
</output_format>
