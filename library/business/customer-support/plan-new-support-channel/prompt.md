---
schema: 1
id: plan-new-support-channel
kind: prompt
title: Plan a new support channel
description: Plans adding a support channel such as live chat, phone, messaging apps or social - whether it fits, demand, staffing and hours, response targets, setup and a staged launch.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [manager, operations-manager, founder, support-agent]
requires: [none]
inputs: [dataset, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [support-channels, live-chat, phone-support, messaging-support, channel-launch]
pairs_with:
  prompts: [plan-support-staffing, plan-out-of-hours-support, write-chat-quick-replies-for-shop, design-ticket-routing-rules]
args:
  - name: channel
    description: "The channel you are considering, for example live chat on the website, phone, WhatsApp or other messaging apps, social media messages, or in-app chat."
    type: string
    required: true
  - name: business_context
    description: "What you sell and to whom, current channels with volumes and response times, team size and hours, why you want the new channel (customer requests, sales, cost), and your country or markets."
    type: text
    required: true
  - name: constraints
    description: "Budget, tools already in use, regulated topics (payments, health), and languages. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Demand estimate, Staffing and hours, Service targets, Setup, Launch plan, Review after launch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan support channel launches. Each channel sets a different expectation and workload: live chat is expected in minutes and one agent can handle only two or three chats at once; phone is the most expensive per contact and needs cover for every advertised hour; messaging apps are asynchronous but customers expect replies within hours and threads never close; social messages are often public-facing and mix support with complaints. A new channel rarely replaces old contacts one for one: it often adds volume, especially chat on high-traffic pages. The common failures are opening a channel everywhere at once, advertising hours the team cannot cover, running it as a separate silo without shared history, and forgetting regulated or sensitive topics (payments, identity checks) that the channel cannot handle safely.
</context>

<task>
Plan adding this support channel.

Channel: {{channel}}

<business_context>
{{business_context}}
</business_context>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Fit check: whether this channel suits the customers and contact reasons described, what it will be good for and what it should not handle (and where those go instead). Give an honest go, go small, or not now, with the reason.
2. Estimate demand: expected contacts per day as a range, with the assumptions stated (share of current contacts that may move, new contacts it creates), and the peak hours.
3. Staffing and hours: agents needed for the advertised hours given the channel's concurrency and handle time, shown with the calculation; opening hours the team can truly cover; and what customers see outside hours.
4. Service targets for this channel (first reply, resolution, and for chat the maximum wait), set against what customers expect from it.
5. Setup checklist: tool requirements described generically (shared history with other channels, routing, saved replies, reporting), identity checks for account questions, data and consent rules for the channel, quick replies for the top reasons, and agent training.
6. Launch plan: a staged start (limited pages, hours or customer group), success and stop criteria, and the date to widen.
7. Review after launch: what to measure in the first 30 and 90 days, including whether total contacts rose and whether other channels improved.
</task>

<constraints>
- Show all staffing arithmetic; do not invent volumes. Use ranges and state assumptions when data is thin.
- Do not recommend specific vendors or quote their prices.
- Flag legal and privacy points by country (call recording notice, messaging consent, data storage) as [CHECK for your country] rather than stating the law.
- Do not advertise hours or response times the staffing plan does not support.
</constraints>

<output_format>
## Fit check
## Demand estimate
## Staffing and hours
## Service targets
## Setup
## Launch plan
## Review after launch
</output_format>
