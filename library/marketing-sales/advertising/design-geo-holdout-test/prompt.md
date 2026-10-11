---
schema: 1
id: design-geo-holdout-test
kind: prompt
title: Design a geo holdout test for ads
description: Designs a geographic holdout or lift test to measure whether ads cause extra sales, with region matching, test size, duration, contamination guards and a readout plan.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, review]
role: [marketer, data-analyst, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [incrementality, geo-lift, matched-markets, holdout-test, media-measurement, causal-inference]
pairs_with:
  prompts: [analyze-marketing-attribution, design-holdout-experiment, plan-media-budget, decide-brand-keyword-bidding]
  personas: [paid-media-specialist]
  workflows: [ad-account-turnaround-track]
args:
  - name: question
    description: What you want to learn, for example "does Meta prospecting drive extra sales" or "what happens if we cut brand search".
    type: text
    required: true
  - name: business_data
    description: Where you sell, how sales are recorded by region (postcode, city, state, store), weekly sales history per region if available, and seasonality.
    type: text
    required: true
  - name: spend
    description: Current spend on the channel, how it is targeted geographically, and the cost per result the platform reports.
    type: string
    required: true
  - name: constraints
    description: Regions that cannot be turned off, maximum test length, other campaigns or events coming up. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Question and metric, Region selection, Test design, Size and duration, Guardrails, Readout plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants to know whether an ad channel actually causes extra sales, not just whether the platform claims them. Platform attribution takes credit for people who would have bought anyway, especially in retargeting, brand search and broad automated campaigns. A geo test turns ads off (or on, or up) in some regions and compares them with similar regions that keep the normal plan. What experts know: regions must be matched on pre-period sales trends, not just size; the outcome must be measured in the business's own sales data by region, not platform conversions; the test needs to be long enough to cover purchase lag and enough regions or volume to detect a realistic effect; spillover (people crossing regions, national TV, delivery addresses differing from where ads were seen) blurs results; other changes during the test (promotions, price changes) must be the same in both groups; and the readout is incremental sales per unit of spend, compared with what the platform reported. Open-source tools for synthetic control and matched markets exist and can help, but the design choices matter more than the tool.
</context>

<task>
Question: {{question}}
Business data:
<business_data>
{{business_data}}
</business_data>
Spend: {{spend}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Question and metric: restate the question as a testable one, choose the primary outcome (orders, revenue, new customers, leads from the business's own system) and secondary metrics, and the hypothesis with the effect size that would change a decision.
2. Region selection: the unit (state, city, postcode area, store catchment), how to group into test and control by matching pre-period trends and size, regions to exclude (too small, too unusual, home market), and a pre-period check of how closely control tracks test.
3. Test design: holdout (turn off), lift (turn on or increase), or scaled spend levels; what changes in test regions and what stays the same everywhere; how to apply geo targeting in the platform and check it holds.
4. Size and duration: pre-period length, test length covering purchase lag plus a cool-down, and a rough power reasoning: given weekly sales noise in the history, what effect size the design can detect. If the data cannot detect a realistic effect, say so and suggest a bigger cut, more regions or a longer test.
5. Guardrails: spillover controls, freeze on other changes, a stop rule if business harm exceeds a limit, and a log of anything unusual.
6. Readout plan: the method (difference in differences or a synthetic control, with a plain explanation), confidence interval, incremental sales and incremental cost per sale or incremental ROAS, comparison with platform-reported results, and the decisions each outcome leads to.
</task>

<constraints>
- Do not invent sales figures, effect sizes or variance; use the user's data or ask for weekly regional history. Mark rough power estimates as approximate.
- Do not claim a result is significant without the calculation; describe uncertainty honestly.
- You may name open-source geo testing tools, without links; do not claim features you are not sure of.
- If sales cannot be tied to regions, say a geo test is not feasible and suggest an alternative (platform conversion lift study, time-based on and off test with caveats).
</constraints>

<output_format>
## Question and metric
Hypothesis, primary metric, decision threshold.

## Region selection
Unit, grouping method, a table: Group | Regions | Share of sales | Pre-period fit.

## Test design
What changes where, and how to set it up in the platform.

## Size and duration
Timeline (pre-period, test, cool-down) and the power reasoning.

## Guardrails
Checklist.

## Readout plan
Method, outputs, and decisions by outcome.
</output_format>
