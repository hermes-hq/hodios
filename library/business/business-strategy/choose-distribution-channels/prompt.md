---
schema: 1
id: choose-distribution-channels
kind: prompt
title: Choose distribution channels
description: Compares routes to your customers - direct, own shop or site, retail, marketplaces, wholesale, distributors, resellers - on margin, control, reach and effort, and picks a channel mix.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, product-manager]
requires: [none]
inputs: [text, notes]
output: [table, report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [route-to-market, channel-strategy, online-marketplace-selling, resellers, channel-economics]
pairs_with:
  prompts: [plan-wholesale-pricing, recruit-resellers, plan-market-entry, choose-marketing-channels]
args:
  - name: business
    description: What you sell, price and unit cost, who buys and how they prefer to buy, current channels and their results, team and cash available, and how much control over brand and customer data matters to you.
    type: text
    required: true
  - name: options
    description: The channels you are considering, with any terms you have been offered (marketplace fees, retailer margins, distributor terms, minimum orders). Optional; the prompt suggests options if empty.
    type: text
output_contract:
  format: markdown
  sections: [How customers buy, Channel options, Unit economics by channel, Scorecard, Recommended mix, Tests and sequence, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise on route to market: where and through whom a product is sold, not how it is promoted. Each channel trades margin for reach and control. Selling direct keeps margin and customer data but needs you to generate all demand; marketplaces bring traffic but take fees, control the customer relationship and can change rules; retail and wholesale bring reach and credibility but take a large margin, pay slowly and expect support; distributors open new regions but add another margin and distance you from customers. The right mix follows how the target customer already buys, and a small business usually does better mastering one or two channels than spreading thin. Adding a channel can also hurt existing ones (price conflict, lost stockists).
</context>

<task>
Choose distribution channels for:

<business>
{{business}}
</business>
{{#options}}

<options>
{{options}}
</options>
{{/options}}

1. Describe how target customers buy today: where they look, where they purchase, how often, how much advice they need. Mark what is evidence and what is assumption.
2. List the realistic channel options (use the user's list and add any obvious missing ones).
3. For each channel, estimate unit economics per sale: price received, channel fees or margin, fulfilment and payment costs, returns, and your contribution. Use given terms; mark any typical figures as assumptions to confirm.
4. Score each channel on margin, reach to the target customer, control of brand and price, customer data access, cash timing, effort and fixed cost, and risk (dependency on one gatekeeper). Explain each score briefly.
5. Recommend a mix: a lead channel, at most one or two supporting channels, and channels to avoid for now, with the reasons. Address conflicts between them (prices, exclusives, stock allocation).
6. Set a sequence of tests: what to try first, a small and time-boxed test for each new channel, success and stop criteria.
7. List the main risks: dependency, cash, margin squeeze, channel conflict.
</task>

<constraints>
- Use only given terms and figures; never invent marketplace fee rates or retailer margins as facts. Label typical ranges as varying by sector and country.
- Keep the mix within the team and cash described.
- Do not recommend misleading tactics on marketplaces (fake reviews, keyword stuffing that breaks rules).
{{> output/uncertainty}}
</constraints>

<output_format>
## How customers buy
Short paragraph with evidence labels.

## Channel options
Bullets, one line each.

## Unit economics by channel
Table: Channel | Price received | Fees and costs | Contribution per unit | Cash timing.

## Scorecard
Table: Channel | Margin | Reach | Control | Data | Effort | Risk | Total.

## Recommended mix
Lead, supporting, avoid for now, conflict rules.

## Tests and sequence
Table: Test | Duration | Success | Stop.

## Risks
Bullets.
</output_format>
