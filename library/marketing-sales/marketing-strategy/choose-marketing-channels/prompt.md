---
schema: 1
id: choose-marketing-channels
kind: prompt
title: Choose marketing channels for an early-stage business
description: Chooses marketing channels for an early-stage business by scoring audience fit, cost and speed to signal, then designs small tests with success and kill criteria before committing budget.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [channel-selection, traction, early-stage, marketing-tests, bullseye-framework]
pairs_with:
  prompts: [write-marketing-plan, build-ideal-customer-profile, design-ab-test, plan-media-budget]
  personas: [growth-marketer, fractional-cmo]
args:
  - name: business
    description: What you sell, price point and purchase model, stage (pre-launch, first customers, some traction), how current customers found you, and the founder's skills and time.
    type: text
    required: true
  - name: audience
    description: Who buys, in a phrase, for example "HR managers at 50-500 person companies" or "new parents in Madrid".
    type: string
    required: true
  - name: budget
    description: Money and time available for testing over the next two to three months. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Starting point, Channel scorecard, Shortlist, Test plans, Decision rules, What to ignore for now]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an early-stage go-to-market adviser. Young businesses usually fail at marketing by spreading a small budget across every channel at once and reading nothing clearly, or by copying a channel that worked for a different business. The better approach, popularised by the "bullseye" method in the book Traction, is to consider a wide range of channels, rank them on evidence, run cheap and fast tests on a few, and then concentrate on the one that works. Channel fit depends heavily on price point: an expensive B2B contract can afford outbound sales and events; a cheap consumer app cannot.
</context>

<task>
Choose marketing channels for this business.

<business>
{{business}}
</business>

Audience: {{audience}}
{{#budget}}Testing budget: {{budget}}{{/budget}}

1. Starting point: summarise the price point, what an acquired customer is roughly worth (labelled estimate if not given), how existing customers found the business, and what that suggests.
2. Channel scorecard: score 12 to 15 candidate channels (for example search ads, SEO and content, social ads, organic social, community and forums, partnerships, affiliates, email and newsletters, sponsorships, outbound email or calls, events, PR, marketplaces and app stores, referrals, offline local) from 1 to 5 on: audience presence (is there evidence this audience is reachable there), cost relative to customer value, speed to a readable signal, and fit with the founder's skills. Give a one-line reason per channel.
3. Shortlist: pick three channels to test, ideally of different types, and explain why each made the cut.
4. Test plans: for each shortlisted channel, write a test with a hypothesis, the specific tactic, the budget and time, the duration, the primary metric (one tied to customers or qualified leads, not clicks), the success threshold that would justify more spend, and the kill threshold.
5. Decision rules: how to compare results across channels fairly (cost per qualified lead or customer, payback, quality of customers) and what to do after the tests: double down, iterate, or test the next three.
6. What to ignore for now: channels that look attractive but do not fit yet, with the reason.
</task>

<constraints>
- Scores reflect evidence in the input or labelled assumptions; do not invent channel benchmarks such as typical cost per click or conversion rates as facts. Where a threshold needs a number, derive it from customer value and say so.
- Tests must fit the stated budget and be readable in weeks, not quarters, at this stage.
- No spam, bought email lists or tactics that break platform rules or consent law.
- If the price point or audience is missing, ask for it before scoring, because it decides which channels are viable.
</constraints>

<output_format>
## Starting point
## Channel scorecard
A table: Channel | Audience presence | Cost vs value | Speed to signal | Founder fit | Total | Reason.
## Shortlist
## Test plans
One block per channel: Hypothesis, Tactic, Budget and time, Duration, Primary metric, Success threshold, Kill threshold.
## Decision rules
## What to ignore for now
</output_format>
