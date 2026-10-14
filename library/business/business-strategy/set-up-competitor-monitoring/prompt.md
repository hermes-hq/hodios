---
schema: 1
id: set-up-competitor-monitoring
kind: prompt
title: Set up competitor monitoring
description: Sets up ongoing competitive intelligence - who to watch, which sources and alerts, which signals matter, who owns it, the cadence and a monthly digest template.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, marketer, product-manager, executive]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [competitive-intelligence, competitor-tracking, market-signals, monthly-digest]
pairs_with:
  prompts: [profile-a-competitor, analyze-competitors, plan-competitive-response]
args:
  - name: business
    description: What you sell, to whom, your main competitors (named or by type), team size, and the decisions competitor news should feed (pricing, roadmap, sales battlecards, local promotions).
    type: text
    required: true
  - name: time_budget
    description: How much time per week someone can spend on this, and tools you already use (alerts, a CRM, a shared drive, a chat tool). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Watch list, Signals that matter, Sources and alerts, Roles and cadence, Monthly digest template, First 30 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design lightweight competitive intelligence for a business. Most monitoring efforts die in one of two ways: they collect everything (every social post, every blog article) until nobody reads the feed, or they rely on one enthusiastic person and stop when that person gets busy. Good monitoring starts from the decisions it should change, watches a short list of competitors in tiers, tracks the few signals that predict real moves (price changes, hiring, new locations or products, key customer wins and losses), and turns them into a short digest with a "so what" on a fixed cadence. Your own sales and support teams are usually the best source and the least used.
</context>

<task>
Design the monitoring setup for this business:

<business>
{{business}}
</business>
{{#time_budget}}

<time_budget>
{{time_budget}}
</time_budget>
{{/time_budget}}

1. Name the decisions the monitoring should feed. Drop any signal that would not change one of them.
2. Build a tiered watch list: tier 1 (2 to 4 direct rivals, watched closely), tier 2 (adjacent or emerging players, checked quarterly), tier 3 (substitutes and potential entrants, scanned twice a year). If competitors are not named, give the criteria for each tier and ask the user to fill them in.
3. List the signals worth tracking, each with why it matters and what it typically predicts: pricing and packaging changes, product or menu launches, hiring patterns, new locations or markets, funding or ownership changes, partnership announcements, review trends, wins and losses in your own deals.
4. Map each signal to sources: their website and pricing page (with a monthly snapshot), job boards, public filings, review sites, trade press, social channels, newsletters, and internal sources such as sales call notes and lost-deal reasons. Suggest generic alert types (keyword alerts, page-change monitoring) without inventing specific product names or prices.
5. Set roles and cadence within the time budget: who collects, where findings go (one shared log with date, competitor, signal, source, so-what), who reviews, and how urgent signals are escalated at once.
6. Write a one-page monthly digest template.
7. Give a first-30-days plan: baseline snapshot of each tier 1 rival, alerts set up, internal capture habit started, first digest.
</task>

<constraints>
- Fit the time budget. If it is under an hour a week, cut to tier 1 only and say so.
- Legal and ethical sources only. Do not suggest posing as a customer under false pretences, scraping in breach of a site's terms, or asking competitors' staff for confidential information.
- Do not invent competitor names, tool prices or features.
- Every signal must link to a decision; no "track everything".
</constraints>

<output_format>
## Watch list
Table: Tier | Competitor or criterion | Why | Check frequency.

## Signals that matter
Table: Signal | Why it matters | Decision it feeds.

## Sources and alerts
Table: Signal | Source | How to capture | Effort.

## Roles and cadence
Bullets: who, what, when, escalation rule.

## Monthly digest template
A fill-in template with headings and one-line prompts.

## First 30 days
A dated checklist.
</output_format>
