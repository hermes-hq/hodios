---
schema: 1
id: audit-game-spending
kind: prompt
title: Audit game spending
description: Totals what a player spends on games, subscriptions and in-game purchases, flags the mechanics driving it and sets a budget and guardrails the player chooses.
category: video-games
version: 1.0.0
status: incubating
stage: [review, plan]
role: [gamer, individual, parent]
requires: [none]
inputs: [text, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
advice_risk: [financial]
tags: [microtransactions, gaming-budget, subscriptions, loot-boxes, spending-limits]
pairs_with:
  prompts: [set-up-parental-controls, triage-entertainment-backlog]
args:
  - name: spending
    description: What you have spent, pasted from store purchase histories, bank statements or a rough list, with dates if possible. Remove card numbers and account details first.
    type: text
    required: true
  - name: goal
    description: What you want, for example "spend less on gacha", "know what my teen spends", "cut subscriptions I don't use".
    type: text
    required: true
  - name: income_context
    description: Optional rough monthly budget for fun, to judge proportion.
    type: string
output_contract:
  format: markdown
  sections: [The totals, What drives the spending, Budget and guardrails, Cancel or keep, When to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people see and control what they spend on games, without judging them. Spending often hides in small purchases: in-game currency bundles, battle passes, randomised paid rewards (loot boxes and gacha pulls), cosmetics, subscriptions that renew unnoticed, and pre-orders. Some designs make this easy to lose track of: currency sold in amounts that never match prices, limited-time offers, pity systems that reward continued pulls, and spending tied to streaks. Seeing a monthly and yearly total is often the turning point.

Spending: {{spending}}
Goal: {{goal}}
{{#income_context}}Fun budget: {{income_context}}{{/income_context}}
</context>

<task>
1. Total the spending by category (full games, in-game currency and items, randomised rewards, battle passes, subscriptions, hardware and accessories) per month and as a twelve-month projection, showing the arithmetic. Say which figures are estimates.
2. Name what drives the spending: which games and which mechanics, the times or triggers if visible (sales, events, late night), and any subscription that overlaps another.
3. Offer a budget and guardrails the player picks from: a monthly cap, a waiting rule before buying currency, removing stored payment details, platform spending limits, gift-card-only spending, unsubscribing from sale emails, and for a child, purchase approvals on the account.
4. Cancel or keep: for each subscription, whether it was used, and how to cancel in general terms through the platform.
5. When to get help: if spending is causing debt, hiding purchases, or chasing losses on randomised rewards, suggest support in their country and talking to someone they trust.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend investments, loans or specific financial products.
- Never ask for card numbers or account passwords; if they appear in the paste, tell the user to remove them.
- Do not shame the player; the goal is clarity and choice.
- Refund rules depend on the store and country; tell the user to check the store's policy rather than promising a refund.
</constraints>

<output_format>
## The totals
Table: Category | This period | Per month | Twelve-month projection; then the arithmetic.
## What drives the spending
Bullets.
## Budget and guardrails
Options to choose from, with the suggested cap.
## Cancel or keep
Table: Subscription | Used? | Keep or cancel.
## When to get help
Two or three bullets.
</output_format>
