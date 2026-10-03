---
schema: 1
id: plan-peak-season-operations
kind: prompt
title: Plan peak season operations
description: Plans a small business's peak season - demand estimate, staffing, stock, hours, customer messages, a daily control routine and a debrief. Use eight to twelve weeks before the rush.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate, review]
role: [operations-manager, founder, manager]
inputs: [notes, dataset, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [peak-season, holiday-rush, capacity-planning, seasonal-staffing, stock-planning, debrief]
pairs_with:
  prompts: [build-staff-schedule, plan-inventory, plan-order-fulfilment, plan-support-staffing]
args:
  - name: business
    description: What you sell, how customers buy (walk-in, online, bookings), your team, opening hours, and figures from last year's peak if you have them (sales by week, orders per day, queues, stockouts, complaints).
    type: text
    required: true
  - name: peak_period
    description: The peak and its dates, for example "Black Friday to Christmas" or "summer tourist season, June to August".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Demand estimate, Capacity gaps, Staffing, Stock and suppliers, Hours and service changes, Customer communications, Peak control routine, Countdown, Debrief template, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan peak seasons for small shops and service businesses. Peaks are won in the weeks before they start: the business that knows its busiest days, has trained extra hands, has stock on the shelf and has told customers the deadlines simply executes. Peaks fail at the bottleneck: one till, one oven, one packer, one person who knows the booking system. Your plan finds that bottleneck, sizes the gap with numbers, and protects the core team from burning out by week three.
</context>

<task>
Plan operations for this peak.

<business>
{{business}}
</business>

Peak: {{peak_period}}

1. Demand estimate: from last year's figures, estimate demand by week (and the busiest days) for the peak, with a low, expected and high case. If there are no figures, say so, explain the assumption you use, and give the owner a simple way to estimate (for example last year's bank deposits by week). Never present a guess as data.
2. Capacity gaps: list each constraint (staff hours, tills or workstations, equipment, storage, delivery, bookings per day) and compare its capacity with the high case. Name the bottleneck.
3. Staffing: extra hours needed per week, how to cover them (existing staff extra shifts, seasonal hires, family, agency), hiring and training lead times, a minimum crew per day, and rest rules to prevent burnout. Flag that hours, overtime and employment rules must be checked locally.
4. Stock and suppliers: what to order, when (from supplier lead times), the best sellers to protect, a reorder trigger, and what to do when something sells out.
5. Hours and service changes: whether to extend hours, simplify the menu or range, pause slow services, or add click-and-collect or bookings to shift demand.
6. Customer communications: messages with dates (order-by and last delivery dates, new hours, returns over the peak, what to expect), and the channels.
7. Peak control routine: a ten-minute daily check (yesterday's sales against plan, stock of best sellers, staffing tomorrow, complaints) with triggers that prompt an action.
8. A countdown from now to the end of the peak, and a debrief template to fill in within two weeks of the peak ending.
</task>

<constraints>
- Use the figures given; mark every assumed number "(assumed)" and say how to replace it with a real one.
- Plan for the high case at the bottleneck and the expected case everywhere else, and say so.
- Do not state employment law, minimum wages or overtime rules; list them as things to check.
- Keep the plan to what a business of this size can run: no tools or roles it does not have unless you say what they would cost in time.
</constraints>

<output_format>
## Demand estimate
Table: Week | Low | Expected | High | Basis.
## Capacity gaps
Table: Constraint | Normal capacity | Peak need (high) | Gap | Fix. Then the bottleneck in one sentence.
## Staffing
## Stock and suppliers
Table: Item | Order by | Quantity basis | Reorder trigger.
## Hours and service changes
## Customer communications
Table: Message | Send on | Channel | Key content.
## Peak control routine
Checklist with triggers.
## Countdown
Table: Week | Actions | Owner.
## Debrief template
Headings with prompts: what went well, bottlenecks, stockouts, staffing, customer feedback, numbers against plan, change for next year.
## Questions
At most five questions whose answers would change the plan.
</output_format>
