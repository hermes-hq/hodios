---
schema: 1
id: forecast-infrastructure-capacity
kind: prompt
title: Forecast infrastructure capacity needs
description: Forecasts when storage, compute, database or network resources will hit their limits from usage history and business growth, with headroom targets, lead times and the date to act.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [sre, devops-engineer, dba, engineering-manager]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [capacity-planning, saturation-date, headroom, growth-forecast]
pairs_with:
  prompts: [forecast-time-series, forecast-with-leading-indicators, present-forecast-uncertainty]
args:
  - name: usage_history
    description: "Usage metrics over time for the resources in question (disk used, CPU or memory at peak, database size, connections, request rate), with the hard limits and any past step changes (migrations, cleanups, launches)."
    type: text
    required: true
  - name: business_drivers
    description: "Expected changes in users, customers, data retention, new features or onboarding of large clients. Optional."
    type: text
  - name: lead_time
    description: "How long it takes to add capacity (order hardware, raise a quota, migrate, re-shard) and the headroom policy, if any."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Resources and limits, Growth model, Saturation dates, Act-by dates, Code, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Capacity planning is a forecasting problem with a deadline: the question is not "how much in a year" but "by when must we start adding capacity so we never cross the safe limit". Practitioners forecast the peak, not the average, because outages happen at peak (the busiest hour, the end-of-month batch); they model growth on the right shape (storage often grows with cumulative data and retention, so it accelerates; traffic often grows with users and has weekly and seasonal peaks); they strip out step changes such as one-off migrations or cleanups before fitting a trend; and they plan to a headroom threshold below the hard limit (for example 70-80% for disk or CPU, because performance degrades and failover needs spare room). The act-by date is the projected date of crossing the headroom threshold minus the lead time to add capacity, using the pessimistic end of the range. Linking resource usage to a business driver (data per customer, requests per active user) makes the forecast respond to business plans instead of extrapolating a line.
</context>

<task>
<usage_history>
{{usage_history}}
</usage_history>
{{#business_drivers}}

<business_drivers>
{{business_drivers}}
</business_drivers>
{{/business_drivers}}

<lead_time>
{{lead_time}}
</lead_time>

1. For each resource, record the hard limit and the headroom threshold (from policy or a proposed default, labelled as a proposal).
2. Prepare the series: use peak values at the relevant granularity, and remove or adjust for step changes.
3. Fit a growth model appropriate to the resource (linear, compound, or driver-based such as usage per customer times forecast customers), compare it with a simple trend, and give a central and pessimistic projection.
4. Compute the date each resource crosses its headroom threshold under the central and pessimistic projection.
5. Compute the act-by date: pessimistic crossing date minus lead time, and flag any act-by date already passed or within the next planning cycle.
6. Provide code (or formulas) to recompute the projections when new data arrives.
</task>

<constraints>
- Compute only from data supplied and show the calculation for each saturation date.
- Plan on peaks and the pessimistic case for act-by dates; say so explicitly.
- Do not invent business growth figures; if none are supplied, use the observed trend and say business plans could change it.
- Recommendations about which capacity option to buy or build are out of scope beyond noting the decision and its deadline.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The earliest act-by date and the resource that drives it.

## Resources and limits
Table: Resource | Current peak | Hard limit | Headroom threshold.

## Growth model
Per resource: model chosen, fit, and why.

## Saturation dates
Table: Resource | Central crossing | Pessimistic crossing.

## Act-by dates
Table: Resource | Lead time | Act by | Status.

## Code
Code or formulas.

## Caveats
Bullets.
</output_format>
