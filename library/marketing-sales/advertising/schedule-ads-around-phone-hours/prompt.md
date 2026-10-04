---
schema: 1
id: schedule-ads-around-phone-hours
kind: prompt
title: Schedule ads around phone hours
description: Sets an ad schedule and bid adjustments from hour and day data so call-driven businesses pay for clicks only when someone can answer, with an after-hours plan and a missed-call check.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, marketer]
requires: [none]
inputs: [dataset, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ad-scheduling, call-ads, missed-calls, bid-adjustments, after-hours, front-desk]
pairs_with:
  prompts: [plan-ad-conversion-tracking, evaluate-lead-platform-ads, target-slow-day-ads]
  personas: [local-ads-advisor]
  workflows: [first-search-campaign-track]
args:
  - name: hourly_data
    description: Performance by hour of day and day of week from your ad platform (clicks, cost, calls, conversions), and call logs with missed calls if you have them. Optional; without it you get a starting schedule and how to collect the data.
    type: text
  - name: opening_hours
    description: When someone can actually answer the phone, by day, for example "Mon-Fri 8:00-17:30, Sat 9-12, lunch 12:30-13:15 often unanswered".
    type: string
    required: true
  - name: call_handling
    description: Who answers (owner on site, receptionist, answering service), voicemail and callback habits, and whether you accept online forms or bookings. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Schedule summary, Hour and day analysis, Ad schedule, After-hours plan, Missed-call check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs search or local ads for a business where most customers phone: trades, clinic front desks, law firm and estate agency offices. Every click that leads to an unanswered call is paid for twice: the click and the lost customer, who usually rings the next business on the list. Call-driven accounts waste money when call ads and call buttons run while nobody can answer, when the owner on a roof misses calls at peak hours, and when nobody checks how many calls were missed. Cutting all off-hours ads is not always right either: some people search in the evening and are happy to fill in a form or book a callback.
</context>

<task>
{{#hourly_data}}
<hourly_data>
{{hourly_data}}
</hourly_data>
{{/hourly_data}}

Opening hours: {{opening_hours}}
{{#call_handling}}Call handling: {{call_handling}}{{/call_handling}}

1. If the opening hours are vague (no days or times), ask in one message and stop.
2. Hour and day analysis: if data is supplied, group into blocks (early morning, morning, lunch, afternoon, evening, night) by weekday and weekend, and compare cost per call or conversion against the account average; ignore blocks with too few clicks to judge (say about 30). If no data, say what to export and after how many weeks to revisit.
3. Ad schedule: call-only ads and call assets only during answered hours, starting 15 to 30 minutes after opening and stopping 15 to 30 minutes before closing so the last calls are answered; lunch or site-visit gaps reduced or paused if calls go unanswered. Give bid adjustments by block (for example +10 to +30% for strong blocks, -20 to -50% for weak ones) or, with automated bidding, which blocks to exclude rather than adjust.
4. After-hours plan: keep text ads that point to a form or online booking, an after-hours message on the landing page ("We reply by 9 am"), a voicemail that promises a callback time, and a rule that forms received after hours are called first thing.
5. Missed-call check: track answered, missed and returned calls by hour for two weeks using call tracking reports or phone logs, compute the answer rate (aim above about 90%), and change the schedule or staffing where missed calls cluster.
6. Time zone: confirm the ad account's time zone matches the business's, and adjust for daylight saving changes.
</task>

<constraints>
- Use only the supplied data; do not invent call volumes or conversion rates.
- Give adjustments as starting points to review after two to four weeks, not fixed answers.
- Note that smart bidding may already adjust by time and that heavy manual adjustments can conflict with it; say which settings to check in the platform.
- Keep the plan workable for a small team; do not propose staffing the business cannot afford.
</constraints>

<output_format>
## Schedule summary
Three lines: when ads run, when calls are pushed, the after-hours approach.

## Hour and day analysis
A table: Day type | Block | Clicks | Cost | Calls or conversions | Cost per conversion | Verdict. Or the data to collect if none supplied.

## Ad schedule
A table: Day | Time block | Call ads | Text ads | Bid adjustment.

## After-hours plan
Bullets with the landing page message and voicemail text.

## Missed-call check
A checklist and the two-week tally template.
</output_format>
