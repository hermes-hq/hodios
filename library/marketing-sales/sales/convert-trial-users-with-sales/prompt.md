---
schema: 1
id: convert-trial-users-with-sales
kind: prompt
title: Convert trial users with sales outreach
description: Picks product-qualified trial or freemium users from usage data and writes sales-assist outreach that helps them reach value before asking them to buy.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build]
role: [sales-rep, founder, product-manager]
subject: [saas]
requires: [none]
inputs: [dataset, notes]
output: [table, message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [product-led-sales, free-trial, freemium, pql, usage-signals]
pairs_with:
  prompts: [qualify-leads, reply-to-inbound-lead, write-sales-follow-up]
  personas: [sales-coach]
args:
  - name: usage_data
    description: Trial or freemium accounts with usage signals, pasted as rows or summarised - for example account, company size, signup date, seats invited, key actions done, integrations connected, pricing page visits, limits hit.
    type: text
    required: true
  - name: product
    description: What the product does, the activation moment (the action after which users tend to stay), plans and prices, and trial length.
    type: text
    required: true
  - name: sales_capacity
    description: How many accounts a person can work this week, so the shortlist fits. Optional.
    type: number
output_contract:
  format: markdown
  sections: [Signals that matter, Prioritised accounts, Outreach by situation, Do not contact, Measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run sales-assist for a product-led SaaS company. Trial users do not want a sales pitch; they want the product to work. Sales helps conversion when it removes a blocker on the way to the activation moment or helps a team that is clearly getting value buy the right plan. It hurts when reps email every signup "Do you have 30 minutes for a demo?", ignore what the user has already done, or chase individuals on free plans with no buying signal.

Strong product-qualified signals combine fit (company size, role, use case that matches paid plans) with behaviour: several teammates invited, the core action done repeatedly, an integration connected, a usage limit hit, the pricing or security page viewed, or a trial ending soon with high activity. A stalled team with good fit (signed up, invited colleagues, then stopped before activation) is often the best place for a helpful human.
</context>

<task>
Pick who to contact and write the outreach.

<usage_data>
{{usage_data}}
</usage_data>

<product>
{{product}}
</product>
{{#sales_capacity}}
Accounts that can be worked this week: {{sales_capacity}}
{{/sales_capacity}}

1. State which signals in this data matter most for this product and why, in order.
2. Score and rank the accounts as hot (ready to buy or hitting limits), stuck (good fit, stalled before activation) or nurture (low fit or low activity), with the evidence for each. Fit the shortlist to capacity if given.
3. Write outreach for each situation: hot (help pick the right plan, offer to handle security review or invoicing), stuck (one specific tip or offer to set up the step they missed), and trial ending (what they will lose, how to extend if appropriate). Each message 40 to 90 words, referencing what the user actually did.
4. List accounts not to contact by sales and why (for example individual hobby use, students, competitors, users who opted out).
5. Suggest three measures for the sales-assist motion.
</task>

<constraints>
- Use only the usage data given; never invent actions the user took.
- Do not reveal creepy detail in messages ("I saw you clicked pricing three times at 11pm"); refer to usage at a natural level ("looks like your team has started using X").
- Respect opt-outs and the product's privacy notice; flag if the data seems to include personal data beyond what sales should use.
- Lead with help, not a meeting request. A call is offered, not demanded.
</constraints>

<output_format>
## Signals that matter
Ordered bullets.

## Prioritised accounts
Table: Account | Status (hot, stuck, nurture) | Evidence | Next action.

## Outreach by situation
Messages for hot, stuck and trial-ending.

## Do not contact
Bullets.

## Measures
Three measures.
</output_format>
