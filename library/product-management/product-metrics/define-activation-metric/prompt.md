---
schema: 1
id: define-activation-metric
kind: prompt
title: Define an activation metric
description: Finds a product's activation moment from usage and retention data, defines an activation metric with an action, threshold and time window, and plans how to validate it.
category: product-metrics
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, data-analyst, founder, marketer]
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [activation, aha-moment, retention, onboarding-metrics, product-analytics]
pairs_with:
  prompts: [define-north-star-metric, analyze-conversion-funnel, write-tracking-plan, design-ab-test]
args:
  - name: usage_data_summary
    description: New-user cohort data - candidate early actions with how many new users did them (and how often) in their first days, and the retention or conversion of users who did versus did not. Include cohort dates, sample sizes and how retention is defined.
    type: text
    required: true
  - name: product
    description: The product, its natural usage frequency (daily, weekly, monthly), and who the user is. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Retention outcome, Candidate actions, Recommended activation metric, Metric definition, Validation plan, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product analyst who has defined activation metrics for consumer and B2B products. An activation metric names the early behaviour that separates new users who go on to retain from those who do not, in a form the team can move: "created 3 projects and invited 1 teammate within 7 days of sign-up". It is a leading indicator for onboarding work. Teams get it wrong by picking the action with the highest raw retention lift while only 2% of users do it, by picking something nearly everyone does, by choosing a window so long that it cannot steer onboarding, and by treating a correlation as proof that pushing users to the action will cause retention.
</context>

<task>
{{#product}}Product: {{product}}

{{/product}}<usage_data_summary>
{{usage_data_summary}}
</usage_data_summary>

If the data has no retention or conversion outcome, or no split between users who did and did not do the candidate actions, do not guess: explain what is missing and give the analysis to run (step 6) instead of a recommendation.

1. **Retention outcome.** State the outcome the activation metric predicts (for example "active in week 4", "converted to paid by day 30", "account still active in month 3") and check it fits the product's natural usage frequency. If the data uses a different outcome, use it and note the mismatch.
2. **Candidate actions.** For each candidate action and threshold in the data, compute or extract:
   - Reach: share of new users who reach it in the window.
   - Retention if reached and if not reached, and the lift between them.
   - Coverage: share of retained users who reached it (how much of retention it explains).
   - Precision: share of users who reached it who retained.
   Show the calculation when you derive a number. Where several thresholds exist (1, 3, 5 projects), find where the retention gain flattens.
3. **Recommended activation metric.** Pick the action, threshold and window that best balance precision and coverage while being reachable early enough to steer onboarding. Prefer an action that reflects receiving value (completing a report, a teammate responding) over setup busywork (filling in a profile). Explain why it beats the runner-up. If two actions together beat either alone, consider a combined definition, but keep it explainable in one sentence.
4. **Metric definition.** A precise spec: name, plain-language definition, numerator, denominator (which sign-up cohort, which exclusions such as test accounts, internal users or invited users), window measured from what event, the events and properties needed, refresh cadence, and an owner placeholder.
5. **Validation plan.** How to check the metric is useful, not just correlated: hold the definition fixed on a later cohort; check it holds across the main segments and acquisition channels; and run at least one onboarding experiment that raises the activation rate, then check whether retention in that test group rises too. Set the result that would make you revise the definition.
6. **Analysis to run.** If the data was insufficient, or to confirm the recommendation, describe the query: cohort, events, windows, outputs per threshold. Use plain pseudo-SQL or step-by-step logic.
7. **Caveats.** Selection effects (motivated users do everything), small samples, seasonality, and how the definition could be gamed.
</task>

<constraints>
- Every number you report comes from the data given or is computed from it with the working shown. Never invent rates or sample sizes.
- Flag any candidate with fewer than about 100 users in either group as too small to rank confidently.
- Describe relationships as associations; causal language is allowed only for experimental results.
- Keep the metric to one sentence a new team member would understand.
{{> output/uncertainty}}
</constraints>

<output_format>
## Retention outcome
One or two sentences.

## Candidate actions
| Action and threshold | Window | Reach | Retention if reached | Retention if not | Lift | Coverage | Precision | Notes |

## Recommended activation metric
The one-sentence metric in bold, then the reasons and the runner-up.

## Metric definition
Bullets for each spec field.

## Validation plan
Numbered steps with the revise-if condition.

## Caveats
Bullets. Add "## Analysis to run" before Caveats when needed.
</output_format>
