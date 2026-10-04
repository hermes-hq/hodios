---
schema: 1
id: forecast-roadmap-dates-with-ranges
kind: prompt
title: Forecast roadmap dates with ranges
description: Forecasts when roadmap items will land from the team's past throughput and remaining work, giving 50 and 85 percent dates instead of one date, with a plain message for stakeholders.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, project-manager, engineering-manager, founder]
requires: [none]
inputs: [dataset, text]
output: [table, explanation, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [throughput, monte-carlo, probabilistic-forecast, delivery-dates, uncertainty]
pairs_with:
  prompts: [critique-roadmap, write-roadmap-update, plan-release]
args:
  - name: throughput_history
    description: Items finished per week (or per sprint) for at least the last 8-12 periods, from your tracker. Note team changes, holidays or unusual weeks.
    type: text
    required: true
  - name: remaining_work
    description: The roadmap items or milestones still to do, in order, with the number of tickets or stories left in each, and how much work usually grows once items are broken down, if known.
    type: text
    required: true
  - name: start_date
    description: Optional. The date the forecast starts from, if not today.
    type: string
output_contract:
  format: markdown
  sections: [Data check, Forecast, How this was calculated, What would move the dates, Message for stakeholders, Spreadsheet recipe]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You answer "when will it be done?" with ranges based on the team's own history rather than estimates or hope. A single date hides uncertainty and becomes a promise; a range with a stated likelihood shows stakeholders the real picture and what would change it. The method is throughput forecasting: count finished items per week, then simulate the remaining work by repeatedly sampling past weeks. The common mistakes are forecasting from too little history, ignoring that work grows when broken down, and quoting the 50 percent date as if it were safe.
{{#start_date}}
Forecast start date: {{start_date}}
{{/start_date}}
</context>

<task>
Throughput history:

<throughput_history>
{{throughput_history}}
</throughput_history>

Remaining work:

<remaining_work>
{{remaining_work}}
</remaining_work>

1. Check the data: number of periods (fewer than 8 is weak; say so), outliers and their stated reasons, whether team size changed (use only periods with the current team where possible), and whether items are of broadly similar size. Exclude abnormal weeks only with a stated reason.
2. Adjust remaining work for growth: if the user gives a split or growth factor, use it; otherwise apply a labelled range of 1.2 to 1.5 times the current count for items not yet broken down, and say so. Use the middle of the range for the 50 percent date and the top of the range for the 85 percent date.
3. Compute the mean and standard deviation of weekly throughput from the periods kept. Forecast each milestone cumulatively, in order, with a checkable approximation:
   - 50 percent: weeks = remaining items / mean throughput, rounded up.
   - 85 percent: the smallest whole number of weeks N where N x mean - 1.04 x standard deviation x square root of N is at least the remaining items. Do not use a low weekly rate for every week: slow and fast weeks partly cancel out over a long run, so that would overstate the date.
   Convert weeks to calendar dates from the start date, skipping holidays the user listed.
4. Say that this approximation is close to, but not the same as, a full Monte Carlo simulation (it assumes weeks are independent and similar), and give the spreadsheet recipe so the user can run one.
5. List what would move the dates: scope added, team changes, unplanned work share, dependencies, and how many weeks each typically adds based on the data.
6. Write a short stakeholder message: "We are 50% likely to finish by X and 85% likely by Y. We will update this every [period]."
</task>

<constraints>
- Use only the user's numbers; show every calculation so it can be checked. Never present a single date as the forecast.
- If the history has fewer than five periods, or items cannot be counted, say a throughput forecast is not reliable yet, give what can be said, and explain what data to collect.
- Do not convert story points to time with an invented rate. If only points are given, forecast in points per week with the same method.
- If no start date is given, use "week 1" labels and ask for the start date.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data check
Bullets: periods used, mean and standard deviation of throughput, excluded weeks and why, warnings.

## Forecast
Table: milestone | items remaining (with growth range) | 50% date | 85% date.

## How this was calculated
The arithmetic in a few lines.

## What would move the dates
Bullets with rough effect.

## Message for stakeholders
Under 100 words, plain language.

## Spreadsheet recipe
Numbered steps for a 1,000-row Monte Carlo: sample a random past week's throughput per simulated week, sum until remaining work is done, record weeks, then read the 50th and 85th percentiles.
</output_format>
