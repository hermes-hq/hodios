---
schema: 1
id: pace-ad-budget
kind: prompt
title: Pace an ad budget
description: Checks month-to-date ad spend against plan and seasonality and recommends daily budget changes to land the month on budget, with rules for underspend, overspend and daily overdelivery.
category: advertising
version: 1.0.0
status: incubating
stage: [operate]
role: [marketer, founder, consultant]
requires: [none]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [budget-pacing, daily-budgets, overdelivery, month-end, spend-forecast]
pairs_with:
  prompts: [plan-media-budget, analyze-ad-performance, calculate-break-even-roas]
  personas: [paid-media-specialist]
args:
  - name: spend_to_date
    description: Spend so far this month by campaign (and by day if you have it), current daily budgets, today's date, and results so far (conversions, cost per conversion or ROAS) for each campaign.
    type: text
    required: true
  - name: monthly_budget
    description: The total for the month and whether it is a hard cap or a target, for example "6,000 EUR hard cap" or "around 10k USD, plus or minus 5%".
    type: string
    required: true
  - name: calendar_notes
    description: Anything that changes demand for the rest of the month (sale dates, holidays, payday, a launch, stock running out, being closed). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Pacing status, Forecast, Budget changes, Rules for the rest of the month, Watch list]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user manages ad spend against a monthly budget and needs to land on it without a panic at month end. Pacing goes wrong when the remaining budget is spread evenly across days that are not equal (weekends, paydays, sale days), when platforms are allowed to overspend a daily budget on some days (many platforms can spend noticeably above the daily setting on a given day while averaging out over the month; the user should confirm the current rule), when underspend is fixed by raising budgets on campaigns that are already losing money, and when big budget jumps reset the platform's learning. Pacing serves the business goal: the right answer is sometimes to finish under budget.
</context>

<task>
<spend_to_date>
{{spend_to_date}}
</spend_to_date>

Monthly budget: {{monthly_budget}}

{{#calendar_notes}}
<calendar_notes>
{{calendar_notes}}
</calendar_notes>
{{/calendar_notes}}

1. If today's date, spend to date or current daily budgets are missing, ask for them in one message and stop.
2. Pacing status: days elapsed and remaining, spend to date, the straight-line expected spend for today's date, the gap in money and percent. Within about 5% is on pace; over 10% either way needs action.
3. Forecast: at current daily budgets, the projected month total, allowing for possible daily overdelivery. Use calendar notes to weight remaining days (for example sale days at 1.5 to 3 times a normal day); state the weights as assumptions.
4. Budget changes: the new daily budget per campaign to land on the target. Put extra money into campaigns at or better than target cost per conversion or ROAS, and take cuts first from those above target. Keep changes to about 20 to 30% per step every few days to avoid resetting learning, and say when a bigger change is still the right call (hard cap at risk, stock running out).
5. Rules for the rest of the month: when to check, the trigger for the next change, and what to do in the last three days if a hard cap is close (lower daily budgets, pause the weakest campaigns, or set a campaign end date or account spend limit).
6. Watch list: campaigns limited by budget, campaigns not spending (possible bid, audience or approval problem rather than budget), and anything that suggests tracking is broken.
</task>

<constraints>
- Use only the user's numbers; label every weighting or overdelivery assumption.
- Never recommend spending the remainder just to hit the number if results are below target; show the cost of finishing under budget instead.
- Round budgets to sensible amounts and keep the total within the cap when the user says it is hard.
- Say that platform overdelivery and billing rules should be confirmed in the platform's current help pages.
</constraints>

<output_format>
## Pacing status
A short table: Measure | Value (days elapsed, expected to date, actual to date, gap, gap %), and a one-line verdict.

## Forecast
Projected total at current settings and with calendar weighting.

## Budget changes
A table: Campaign | Current daily | New daily | Results vs target | Reason.

## Rules for the rest of the month
Bullets.

## Watch list
Bullets.
</output_format>
