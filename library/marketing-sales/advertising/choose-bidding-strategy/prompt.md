---
schema: 1
id: choose-bidding-strategy
kind: prompt
title: Choose an ad bidding strategy
description: Chooses a bid strategy (manual, maximise conversions, target CPA or ROAS, cost caps) from conversion volume, goals and data health, and plans a safe transition with rollback rules.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text, dataset]
output: [plan, explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [smart-bidding, target-cpa, target-roas, cost-cap, learning-period, conversion-volume]
pairs_with:
  prompts: [calculate-break-even-roas, plan-ad-conversion-tracking, pace-ad-budget, analyze-ad-performance]
  personas: [paid-media-specialist]
  workflows: [ad-account-turnaround-track]
args:
  - name: platform
    description: The ad platform and campaign type, for example "Google Ads search", "Google Shopping", "Meta sales campaign".
    type: string
    required: true
  - name: campaign_data
    description: Per campaign, the last 30 to 90 days of spend, clicks, conversions, conversion value, CPA or ROAS, current bid strategy and any targets set.
    type: text
    required: true
  - name: goal
    description: What the business needs (more volume at a cost limit, profit at a ROAS floor, steady spend) and the break-even CPA or ROAS if known.
    type: string
    required: true
  - name: data_health
    description: Conversion tracking notes (values tracked, recent tracking changes or outages, conversion lag, offline imports). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data health, Recommendation, Targets to set, Transition plan, Watch and rollback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user needs to decide how a campaign should bid, or whether to switch strategies. Automated bidding is only as good as the conversion data it learns from. What experts know: smart bidding needs enough conversions per campaign (or per pooled portfolio) to learn, and platforms publish rough guidance that changes; maximise conversions without a target is a reasonable start when the account has some data, followed by a target set near what the campaign actually achieves; setting a target far tighter than history throttles volume; target ROAS needs reliable conversion values, not one flat value for all; low-volume campaigns can be pooled with portfolio strategies or kept on manual or enhanced bidding; any strategy or big target change starts a learning period of roughly a few conversion cycles, during which results swing; conversion lag means the last days look worse than they are; and tracking outages should be marked as data exclusions so the algorithm does not learn from them. On Meta, the choice is between highest volume, cost per result goal (cost cap), bid cap and ROAS goal, each trading volume for control.
</context>

<task>
Platform: {{platform}}
Goal: {{goal}}
<campaign_data>
{{campaign_data}}
</campaign_data>
{{#data_health}}Data health: {{data_health}}{{/data_health}}

1. Data health: per campaign, count conversions over the period, check whether values vary (needed for value bidding), note conversion lag and any tracking breaks. Flag campaigns whose data cannot support automated targets.
2. Recommendation: per campaign, the strategy to use now and the reason, citing its volume and the goal. Consider pooling low-volume campaigns into a portfolio or shared budget where the platform allows.
3. Targets to set: if a target is used, start it close to the actual CPA or ROAS of the last 30 days (show the number), then the step size and interval for tightening toward the goal. Compare with the break-even figure and say if the goal is unrealistic for the data.
4. Transition plan: what to change, in what order, one change at a time; whether to test the new strategy as an experiment or split first; budget changes to avoid during learning; and data exclusions or seasonality adjustments to apply if relevant.
5. Watch and rollback: what to watch daily and weekly, how long to wait before judging (in conversion cycles, accounting for lag), and the result that triggers rollback.
</task>

<constraints>
- Do not state platform minimum conversion counts or learning period durations as fixed rules; describe them as guidance to confirm in current platform help.
- Do not invent results. Base targets on the data provided; if data is missing, ask for it.
- Never recommend changing bid strategy and budget and creative all at once.
- If tracking is broken, fixing it comes before any bidding change.
</constraints>

<output_format>
## Data health
A table: Campaign | Conversions | Values vary? | Lag or tracking issue | Can support automated targets?

## Recommendation
A table: Campaign | Current strategy | Recommended strategy | Why.

## Targets to set
Starting target per campaign from actual results, step plan toward the goal, and a note on break-even.

## Transition plan
Numbered steps with timing.

## Watch and rollback
Metrics, judgement window, and rollback triggers.
</output_format>
