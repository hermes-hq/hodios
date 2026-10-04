---
schema: 1
id: target-slow-day-ads
kind: prompt
title: Target ads at slow days
description: Plans small, time-boxed local ads that fill a restaurant's, salon's or shop's slow days and hours, with a dayparted schedule, tight radius, a margin-costed offer and a before-and-after comparison.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
subject: [hospitality, retail]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [dayparting, quiet-hours, local-radius, offer-costing, covers, footfall]
pairs_with:
  prompts: [plan-local-advertising, decide-post-boost, schedule-ads-around-phone-hours]
  personas: [local-ads-advisor]
args:
  - name: business
    description: What you are (restaurant, cafe, salon, barber, shop), where, how far customers come from, average spend per visit and rough gross margin, capacity (covers, chairs, staff on shift) and what regulars like about you.
    type: text
    required: true
  - name: slow_periods
    description: The quiet days and hours with whatever numbers you have (for example "Tue-Wed 14:00-17:00, 6 covers vs 30 on Fridays", "Monday chairs half empty"). Till or booking data can be pasted.
    type: text
    required: true
  - name: budget
    description: What you can spend on ads for the test, for example "150 EUR over four weeks".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Plan in brief, Why the period is slow, Offer and its cost, Ad schedule, Ads to run, How to judge it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user owns a restaurant, cafe, salon or shop with predictable quiet days or hours. Spare capacity in those periods is the cheapest growth they have: staff and rent are already paid, so each extra customer adds mostly margin. Slow-period ads fail when they run all week (and mostly reach people on busy days), when the offer gives away more than the visit earns, when discounts train regulars to move from busy days to cheap ones, or when nobody compares the slow period with a fair baseline. A good plan names a reason to come at that time, runs ads only in the hours before and during the slow window to people within easy reach, and counts the result.
</context>

<task>
<business>
{{business}}
</business>

<slow_periods>
{{slow_periods}}
</slow_periods>

Budget: {{budget}}

1. If the type of business, average spend per visit or the slow days and hours are missing or vague, ask in one message and stop. If only the margin or capacity is unknown (common for owners), carry on: show the offer arithmetic with [MARGIN] as a placeholder, give the break-even extra visits as a formula, and ask for the figure at the end.
2. Why the period is slow: likely reasons (office hours, school run, weather, local habits) and who is free then (remote workers, parents after drop-off, retirees, shift workers, students). Use only what the inputs support and label guesses.
3. Offer: a reason to visit at that time that is not just a discount (a set lunch, a quiet-time service, a class, a bundle, a loyalty stamp that only counts then). Cost it: offer cost per visit against average spend and margin, the extra visits needed to cover the ad budget plus offer cost, and the risk of moving existing customers onto the cheaper slot. Prefer offers that existing busy-time customers cannot easily switch to.
4. Ad schedule: days and hour blocks, starting 2 to 24 hours before the window depending on how far ahead people decide (cafe: same morning; salon: one to three days), radius in km or miles from how far customers really travel, and daily budget per active day so the whole test fits the budget.
5. Ads to run: two short variants per platform the business already uses, each naming the day and time and the offer, plus the in-store signal (code word, voucher, booking tag) that marks ad-driven visits.
6. How to judge it: the baseline (the same slow window in the previous 4 to 6 weeks), the metric (covers, bookings, transactions in the window), redemptions of the code, and a keep, change or stop rule after the test.
</task>

<constraints>
- Do not invent footfall, costs per click or reach; present any estimate as an assumption to read from the platform before paying.
- Keep the offer honest and clear (no fake scarcity, no "was" prices that never applied), and note that alcohol or age-restricted offers have extra ad rules.
- Keep spend within the stated budget; if the budget cannot buy a noticeable result, say so and suggest a non-paid alternative (partnerships, local groups, regulars bringing a friend).
</constraints>

<output_format>
## Plan in brief
Three lines: the offer, the schedule, the number that means it worked.

## Why the period is slow
Bullets.

## Offer and its cost
The arithmetic step by step and the break-even extra visits.

## Ad schedule
A table: Day | Ads on from-to | Radius | Daily budget | Notes.

## Ads to run
Variants with headline and text, the offer code or tag.

## How to judge it
Baseline, metric, tally method and the keep, change or stop rule.
</output_format>
