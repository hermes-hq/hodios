---
schema: 1
id: plan-customer-marketing-program
kind: prompt
title: Plan a customer marketing programme
description: Plans marketing to existing customers across adoption, expansion, advocacy and reviews, with segments, plays per lifecycle stage, coordination with account teams and retention and expansion targets.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, manager]
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
tags: [customer-marketing, retention, advocacy, customer-lifecycle, expansion]
pairs_with:
  prompts: [plan-expansion-revenue, collect-adopter-stories, design-referral-program, design-ambassador-program]
  personas: [growth-marketer]
args:
  - name: business
    description: What you sell, number of customers, pricing model, average customer value, retention or churn, and who owns customers today (account managers, customer success, nobody).
    type: text
    required: true
  - name: current_state
    description: What customers receive from you today after buying (onboarding, newsletters, events, community), review and referral activity, and known reasons customers leave or stay small.
    type: text
    required: true
  - name: goals
    description: What the programme should improve, for example retention, expansion revenue, reviews, references or referrals, with targets if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Programme summary, Customer segments, Plays by lifecycle stage, Advocacy engine, Coordination with customer teams, Calendar, Measures and targets]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a customer marketing lead. Most marketing budgets go to acquisition while existing customers, who are cheaper to grow and are the best source of proof and referrals, get a newsletter at most. Customer marketing works through the lifecycle: help new customers reach first value fast, deepen use so they stay, show relevant upgrades when they hit limits or succeed, and turn happy customers into reviews, references, case studies and referrals. The order matters: asking for reviews or upsells before customers get value backfires. It needs clear coordination with whoever owns accounts, so customers do not get three uncoordinated messages in a week, and it is measured on retention, expansion and advocacy, not on email opens.
</context>

<task>
<business>
{{business}}
</business>

<current_state>
{{current_state}}
</current_state>

{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}

1. If the number of customers, pricing model or customer ownership is unclear, ask up to three questions and stop.
2. Customer segments: split customers by value and lifecycle stage (new, adopting, established, at risk, champions), with how to identify each from available data.
3. Plays by lifecycle stage: for each stage, two or three plays (onboarding content, feature adoption campaigns, user training or office hours, milestone messages, upgrade prompts triggered by usage or limits, win-back for lapsing customers), each with trigger, channel, owner and measure.
4. Advocacy engine: when and how to ask for reviews (after a success moment), references and case studies, referrals and community participation; incentives that are allowed and disclosed; how to avoid over-asking the same champions.
5. Coordination: who owns which touchpoints (marketing, success, sales), a contact frequency cap, and how account teams see what marketing sends.
6. Calendar: the first two quarters, with launches and recurring programmes.
7. Measures and targets: retention or churn, expansion revenue, product adoption for key features, reviews and references produced, referral-sourced customers; targets from the user's goals or placeholders.
</task>

<constraints>
- Do not invent customer data, churn rates or targets; use the user's numbers or placeholders.
- Review requests must follow platform rules and local consumer law on incentivised or selective review gathering; flag these rather than stating the law.
- Respect customers' communication preferences and consent.
{{> output/uncertainty}}
</constraints>

<output_format>
## Programme summary
Four bullets.

## Customer segments
A table: Segment | How to identify | Size if known | Main goal.

## Plays by lifecycle stage
A table: Stage | Play | Trigger | Channel | Owner | Measure.

## Advocacy engine

## Coordination with customer teams

## Calendar

## Measures and targets
</output_format>
