---
schema: 1
id: add-event-adjustments-to-forecast
kind: prompt
title: Adjust a forecast for known events
description: Adjusts a baseline forecast for promotions, price changes, moving holidays and other known events, sized from past analogues, with pull-forward and cannibalisation and a log for later review.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, data-analyst, business-analyst, marketer]
subject: [retail, supply-chain]
inputs: [text, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [promotion-uplift, judgmental-adjustment, demand-planning-overrides, holiday-effects]
pairs_with:
  prompts: [forecast-time-series, measure-forecast-accuracy, decompose-seasonality]
args:
  - name: baseline_forecast
    description: The statistical or baseline forecast by period, and how it was made (method, whether it already includes seasonality and recurring holidays).
    type: text
    required: true
  - name: events
    description: "Each known future event: what it is (promotion depth and mechanic, price change, new listing, competitor action, moving holiday, weather-sensitive period), the dates, and which items or regions."
    type: text
    required: true
  - name: history
    description: Results of similar past events - sales before, during and after, ideally for the same items - so the adjustment is sized from evidence.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Already in the baseline?, Adjustments, Adjusted forecast, Adjustment log, Review after the event]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Manual adjustments to a statistical forecast are justified only for information the model cannot know: a promotion next month, a price change, a new store. Studies of company forecasting have repeatedly found that many adjustments make forecasts worse: small tweaks add noise and optimistic upward changes add bias, while large adjustments backed by specific information tend to help. The common mistakes are double counting (adding a Christmas uplift to a seasonal model that already has Christmas in it), sizing uplift from hope instead of past events, forgetting the dip before a promotion (customers wait) and after it (pantry loading pulls demand forward), forgetting that a promoted item cannibalises its neighbours, and placing moving holidays (Easter, Ramadan, Lunar New Year, Diwali) in the wrong weeks. Every adjustment should be logged with its reason and owner so its value can be checked afterwards.

<baseline>
{{baseline_forecast}}
</baseline>

<events>
{{events}}
</events>
{{#history}}

<history>
{{history}}
</history>
{{/history}}
</context>

<task>
1. For each event, decide whether the baseline already captures it (recurring holidays in a seasonal model, a regular monthly promotion that is in the history) and whether a moving holiday falls in a different period from last year. Adjust only what is new or shifted.
2. Size each remaining adjustment from the history: uplift during the event as a ratio to baseline, the dip before, the dip after, and the effect on related items. If there is no history, give a cautious range and label it as judgment.
3. Apply the adjustments period by period, keeping the baseline, each adjustment and the final forecast as separate columns so they can be audited.
4. Check the net effect: total demand across the event window and the item group, after pull-forward and cannibalisation, is usually much smaller than the headline uplift. Report it.
5. Write the adjustment log: event, periods, size, evidence, owner, and the actual to compare against.
6. Set up the review: after the event, compare baseline, adjusted forecast and actual, and say what result would show the adjustment helped.
</task>

<constraints>
- Do not adjust for something already in the baseline; explain any case where you are unsure.
- Never size uplift from the promotion's target or a sales team's wish; use history, or a labelled judgment range.
- Do not make small adjustments (within normal forecast error) unless there is specific information; say when the right answer is "leave the baseline".
- Keep units and periods consistent with the baseline.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Net change in demand over the event window, the largest adjustment, and any adjustment you advise against.

## Already in the baseline?
Table: event | in baseline? | reason | action.

## Adjustments
Table: event | periods | during | before dip | after dip | cannibalisation | evidence.

## Adjusted forecast
Table: period | baseline | each adjustment | final.

## Adjustment log
Table: event | size | evidence | owner | compare against.

## Review after the event
Bullets.
</output_format>
