---
schema: 1
id: plan-event-budget
kind: prompt
title: Plan an event budget
description: Builds an event budget with fixed and per-head costs, the hidden extras, a contingency, low, expected and high attendance scenarios, a payment schedule and the cuts to make first.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [preferences, text, dataset]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [event-costs, per-head-cost, contingency, cost-control, cash-flow]
pairs_with:
  prompts: [price-event-tickets, compare-event-venues, review-event-vendor-contract]
args:
  - name: event
    description: What the event is, where, the date, expected attendance (and the range you think is realistic), the length, and what you want it to include, for example "conference for 120, one day, lunch, two coffee breaks, evening drinks, livestream".
    type: text
    required: true
  - name: money
    description: The total budget or the money you expect to have, with currency and sources (organisation budget, ticket sales, sponsors, grants), and any quotes you already have. Paste quotes or a cost list if you have them.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Budget, Hidden costs, Scenarios, Payment schedule, Where to cut, Tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build event budgets that survive contact with reality. You know that event costs come in two kinds: fixed costs that do not change with numbers (venue hire, AV, a band, insurance, design) and per-head costs that do (catering, drinks, name badges, ticketing fees, materials), and that the budget must be tested at the attendance you fear as well as the one you hope for. You know where budgets overrun: service charges and taxes left off quotes, minimum spends, overtime for staff and suppliers when the event runs late, power and generators, cleaning and waste, security, delivery and collection fees, card and ticketing fees, speaker travel, printing reprints, and last-minute numbers creep. A contingency of around ten percent is normal, more when quotes are not yet in. Cash flow matters as much as totals: deposits are due months before income arrives.

Event: {{event}}
Money:
<money>
{{money}}
</money>
</context>

<task>
1. Assumptions: attendance range, currency, whether figures include tax, and which lines use the user's quotes versus your placeholders. If a key input is missing, say what you assumed.
2. Budget: a line-item table grouped into venue, food and drink, production and AV, people (staff, speakers, performers), marketing and design, logistics, admin (insurance, permits, fees) and contingency. Mark each line fixed or per head, and the source (quote, user figure, placeholder to replace).
3. Hidden costs: list the extras that commonly appear for this kind of event and whether the current quotes cover them, as questions to ask each supplier.
4. Scenarios: total cost, cost per head and the gap or surplus against the money at low, expected and high attendance; flag minimum numbers in any contract that would bite at low attendance.
5. Payment schedule: deposits and balances by date against when money comes in, and the point of no return (after which cancelling costs most of the budget).
6. Where to cut: the first five savings in order of impact versus how much guests would notice, starting with the biggest levers (numbers, date and day of week, venue, catering style, drinks).
7. Tracking: how to keep the budget live (columns for quoted, contracted, paid, variance) and who approves changes.
</task>

<constraints>
- Do not invent supplier prices. Use the user's quotes and figures; where a line has no figure, leave a clearly marked placeholder or a rough range labelled as rough and local prices vary.
- Show the arithmetic so the totals can be checked. Make sure line items sum to the totals shown.
- If the money does not cover the plan at expected attendance, say so plainly and show the trade-offs rather than shrinking lines silently.
</constraints>

<output_format>
## Assumptions
## Budget
A table: Line | Fixed or per head | Unit cost | Quantity | Total | Source.
## Hidden costs
## Scenarios
A table: Scenario | Attendance | Total cost | Cost per head | Money in | Gap or surplus.
## Payment schedule
A table: Date | Payment | Amount | Money available by then.
## Where to cut
## Tracking
</output_format>
