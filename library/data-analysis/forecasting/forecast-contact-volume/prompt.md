---
schema: 1
id: forecast-contact-volume
kind: prompt
title: Forecast contact centre volume by interval
description: Forecasts calls, chats or tickets by day and by 15 or 30-minute interval for a contact centre or support team, with weekday shapes, known drivers and a range ready for staffing.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, support-agent, data-analyst, manager]
inputs: [dataset, text]
output: [table, report, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [workforce-management, call-volume, intraday-profile, contact-centre]
pairs_with:
  prompts: [plan-support-staffing, analyze-contact-centre-data, add-event-adjustments-to-forecast]
args:
  - name: volume_history
    description: "Contacts by interval or by day for at least several months (ideally two years), by channel and queue if relevant, with notes on outages, campaigns, billing runs, product launches and holidays."
    type: text
    required: true
  - name: horizon
    description: "What is being planned and how far ahead: next week's schedule, next month's rota, or a quarterly hiring plan."
    type: string
    required: true
  - name: tool
    description: Tool for any code.
    type: enum
    enum: [python, r, spreadsheet, none]
    default: spreadsheet
output_contract:
  format: markdown
  sections: [Summary, Data checks, Daily forecast, Intraday profile, Drivers and events, Code, Hand-off to staffing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Workforce planners forecast contact volume in two layers: the daily total, which carries trend, seasonality, weekday pattern and events, and the intraday profile, the share of each day's contacts arriving in each interval, which is stable for a given weekday and season and is estimated separately. Splitting them is more accurate than forecasting each interval directly. Common distortions are specific to contact centres: offered contacts differ from handled ones (abandoned calls and callbacks double-count or hide demand), outages and system failures create spikes that will not repeat, and business events (billing runs, letters, price rises, product launches, marketing emails) drive predictable surges that should be modelled as events, not as noise. A Monday after a holiday carries the backlog. Staffing needs depend on interval volume and handle time, so the forecast must reach interval level for schedules, while hiring plans only need weekly or monthly totals.

Horizon: {{horizon}}
Tool: {{tool}}
</context>

<task>
<volume_history>
{{volume_history}}
</volume_history>

1. Check the data: offered versus handled versus abandoned, repeat callers and callbacks, missing intervals, outages, and channel shifts (for example contacts moving from phone to chat).
2. Forecast the daily totals for the horizon with a method suited to the history (seasonal baseline with weekday effects, or ETS), plus event adjustments for known drivers in the horizon. Show a backtest against a same-weekday-last-weeks baseline.
3. Build the intraday profile: share of daily volume per interval for each weekday, from recent comparable weeks, smoothed, with separate profiles for unusual day types (post-holiday, billing day).
4. Combine: interval forecast equals daily forecast times interval share. Give a range for the daily total and explain that interval-level noise is larger for small queues.
5. List the drivers and events to confirm with other teams (marketing sends, billing, launches) before finalising.
6. Prepare the hand-off to staffing: interval volumes, the handle-time assumption to be supplied by the staffing owner, and which intervals carry the most risk.
</task>

<constraints>
- Forecast offered demand, not handled contacts, and say how abandoned and repeat contacts were treated.
- Compute only from data supplied; do not invent event effects without past analogues and label assumptions.
- Do not compute staffing numbers unless handle time and service targets are given; hand off instead.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Daily volume forecast for the horizon with range, and the riskiest days.

## Data checks
Bullets.

## Daily forecast
Table: Date | Weekday | Baseline | Event adjustment | Forecast | Low | High.

## Intraday profile
Table: Interval | Share by weekday (or day type).

## Drivers and events
Bullets with source to confirm.

## Code
Code or formulas.

## Hand-off to staffing
Bullets.
</output_format>
