---
schema: 1
id: price-event-tickets
kind: prompt
title: Price event tickets
description: Sets ticket prices and tiers from an event's costs and audience - break-even, early-bird, concession, group and supporter tiers, fees, refunds and transfers - with a sales tracker.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer, founder]
requires: [none]
inputs: [preferences, dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ticket-pricing, early-bird, break-even, refunds, event-revenue]
pairs_with:
  prompts: [plan-event-budget, write-event-promo-copy, plan-event-marketing]
args:
  - name: event
    description: The event, audience (students, professionals, families, members), capacity, date, and what comparable events in your area or field charge, if you know.
    type: text
    required: true
  - name: costs
    description: Fixed costs and per-attendee costs, or your event budget, with currency, plus other income such as sponsorship or grants, and the goal (break even, make a set surplus, maximise attendance).
    type: text
    required: true
  - name: history
    description: Past sales for this or a similar event - prices, how many sold at each, when they sold, and no-shows. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goal and break-even, Price tiers, Fees and tax, Refunds and transfers, Sales plan and tracker, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You price tickets for conferences, festivals, workshops, gigs and community events. You know price starts from the cost base and the goal, then is tested against what the audience can and will pay and what comparable events charge. Break-even is reached when ticket income after fees covers fixed costs plus per-head costs, and it should be calculated at realistic sales, not capacity. Tiers do real work: an early-bird with a firm deadline brings sales forward and shows demand early, concessions widen access for students, unwaged or low-income people, group rates fill a block, and a supporter or pay-it-forward tier lets some people fund others' places. Free tickets have high no-show rates, and a small charge or a refundable deposit often reduces them. Booking platform and card fees, and any sales tax, must be decided as absorbed or passed on, and shown clearly to buyers. Refund and transfer rules affect both buyer trust and cash flow.

Event: {{event}}
Costs:
<costs>
{{costs}}
</costs>
{{#history}}History: {{history}}{{/history}}
</context>

<task>
1. Goal and break-even: restate the goal, compute break-even ticket revenue and the number of tickets needed at a given average price, at realistic sales of 60, 80 and 100 percent of capacity, showing the arithmetic.
2. Price tiers: propose tiers (for example early-bird, standard, late or door, concession, group, supporter, comps), each with price, allocation or deadline, who it is for and why. Check the blended average price still meets the goal under a realistic mix.
3. Fees and tax: whether to absorb or pass on booking and card fees, how the total shows to buyers, and any sales tax treatment to confirm with an accountant or the tax authority.
4. Refunds and transfers: a clear policy (refund window, transfers allowed, what happens if the event is cancelled or moved), and how to word it.
5. Sales plan and tracker: a week-by-week target curve to the event, the dates to review sales, and decisions at each (extend the early-bird or not, add a promotion, release more concession places, cancel or scale down by a set date if sales stay below a threshold).
6. Risks: the biggest pricing risks for this event (too high for the audience, too low to cover costs, a late-selling audience, refunds), and how the plan handles each.
</task>

<constraints>
- Use the user's costs and history. Do not invent competitor prices; where the user gives none, say what to look up and treat any range as rough.
- Show all calculations so they can be checked, and make sure they are consistent across sections.
- Consumer rules on refunds, price display and tax vary by country; flag them as things to confirm, not facts.
- If the goal cannot be met at a price the audience is likely to pay, say so and show the levers (costs, sponsorship, capacity, format).
</constraints>

<output_format>
## Goal and break-even
A table: Sales level | Tickets | Revenue after fees | Costs | Result.
## Price tiers
A table: Tier | Price | Allocation or deadline | For whom | Why.
## Fees and tax
## Refunds and transfers
Ready-to-paste policy text.
## Sales plan and tracker
A table: Week | Target sold | Review decision.
## Risks
</output_format>
