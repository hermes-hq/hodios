---
schema: 1
id: plan-courier-fleet-growth
kind: prompt
title: Plan courier fleet growth
description: Plans how a courier or delivery firm grows - more vans and employed drivers, owner-drivers, subcontracting or declining work - compared on cost per drop, reliability and cash.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
subject: [supply-chain]
advice_risk: [financial]
requires: [none]
inputs: [text, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [courier, last-mile, cost-per-drop, owner-drivers, subcontracting, van-fleet]
pairs_with:
  prompts: [plan-delivery-routes, assess-big-contract-risk, decide-in-house-or-outsource]
  personas: [small-business-advisor]
args:
  - name: current_fleet
    description: Vans (owned, leased, age), drivers (employed, self-employed, agency), drops per route per day, cost per van per month, wages, fuel, insurance, and current reliability (on-time and failed deliveries).
    type: text
    required: true
  - name: demand
    description: The extra work on offer or expected - volume per day, clients, rate per drop or per route, peaks, time windows, service levels, and how firm it is (contract, trial, verbal).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Short answer, Cost per drop today, Growth options compared, Reliability and control, Cash needed, Recommended path, Questions for advisers]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the owner of a courier, parcel or same-day delivery firm decide how to take on more work. The options: add vans and employed drivers, bring in owner-drivers on a per-route or per-drop rate, subcontract overflow to another carrier, or decline work. Growth in delivery fails in familiar ways: pricing new work on the average cost per drop when the new routes are less dense; buying or leasing vans for volume that is seasonal or unconfirmed; relying on owner-drivers without the control needed for service levels; and running out of cash between paying drivers weekly and being paid by clients at 30-60 days. You compare options on cost per drop at realistic route density, reliability and cash, and you treat worker status and licensing as questions for advisers.
</context>

<task>
<current_fleet>
{{current_fleet}}
</current_fleet>

<demand>
{{demand}}
</demand>

1. Cost per drop today: per route per day - van cost (lease or depreciation, insurance, maintenance), fuel, driver cost with on-costs, and a share of overheads - divided by drops. Show it, and the rate per drop the new work pays.
2. Growth options compared: for the new volume, cost per drop and margin under (a) new van and employed driver, (b) owner-driver at a per-route or per-drop rate, (c) subcontracted carrier, (d) decline or take only the profitable part. Adjust drop density for the new work's area and time windows, and state the assumption.
3. Reliability and control: for each option, control over service levels, training, vehicle standard and branding, flexibility for peaks and troughs, and the risk of losing the client if service slips.
4. Cash needed: upfront costs (deposits, insurance, equipment, recruitment) and the weekly cash gap between paying drivers and receiving client payments. Show the first eight weeks.
5. Recommended path: a mix with triggers, for example owner-drivers or subcontractors for the first three months, then switch to own vans once volume stays above a stated level for eight weeks; and what to decline.
6. Questions for an accountant, an employment adviser (worker status of owner-drivers depends on the real relationship and differs by country), an insurer, and the transport licensing authority where operator licences apply.
7. Check the arithmetic before answering.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the given costs and rates; label every assumption (drops per hour, mileage, overhead share). Never invent market rates.
- Do not advise on classifying drivers as self-employed to save cost; describe what an adviser will look at and keep options lawful.
- Driver hours, operator licences and insurance rules differ by country and vehicle size; list them as checks, never as stated rules.
- If cost per van, driver pay or the rate for new work is missing, ask for it and stop; show the method with placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences.
## Cost per drop today
Arithmetic, then the new work's rate per drop.
## Growth options compared
Table: Option | Drops per day | Cost per drop | Margin per drop | Margin per day.
## Reliability and control
Table: Option | Service control | Flexibility | Main risk.
## Cash needed
Upfront costs, then a table: Week | Cash out | Cash in | Balance.
## Recommended path
Numbered steps with the volume triggers.
## Questions for advisers
Grouped by accountant, employment adviser, insurer, licensing.
</output_format>
