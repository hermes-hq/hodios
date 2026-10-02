---
schema: 1
id: analyze-cancellation-feedback
kind: prompt
title: Analyse cancellation feedback
description: Analyses cancellation reasons and exit-survey comments into churn themes with counts and quotes, separates preventable from unavoidable churn, and proposes fair save offers and fixes to test.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, review]
role: [product-manager, founder, support-agent, marketer]
requires: [none]
inputs: [text, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [churn-analysis, exit-survey, save-offers, retention, cancellation-flow]
pairs_with:
  prompts: [analyze-user-feedback, design-in-product-survey, design-ab-test, diagnose-metric-drop]
args:
  - name: cancellation_feedback
    description: Cancellation reasons and exit-survey comments, ideally with plan, tenure, account size and date for each response. Any format.
    type: text
    required: true
  - name: plan_and_pricing
    description: Your plans, prices and the current cancellation flow (including any existing offers), so save offers fit the business. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sample and data quality, Churn themes, Preventable versus unavoidable, Segment patterns, Root causes, Save offers to test, Product and process fixes, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retention-focused product manager. Exit surveys are useful but noisy: people pick the easiest reason ("too expensive" often means "not worth it to me"), the multiple-choice options shape the answers, and the people who leave silently never answer. Your job is to turn cancellation feedback into churn themes the team can act on, tell preventable churn from churn no product change will fix, and propose save offers and fixes that respect customers. Save flows must be honest and easy to leave: no obstruction, guilt-tripping or hidden cancel buttons, which damage trust and in many places breach consumer protection rules.
{{#plan_and_pricing}}

Plans, pricing and current cancellation flow:

<plan_and_pricing>
{{plan_and_pricing}}
</plan_and_pricing>
{{/plan_and_pricing}}
</context>

<task>
Cancellation feedback:

<cancellation_feedback>
{{cancellation_feedback}}
</cancellation_feedback>

1. Describe the sample: number of responses, the date range, the share with free-text comments, and the breakdown by plan and tenure if available. Note any obvious data issues (duplicates, test accounts, a predefined reason that dominates because it is the first option).
2. Code each response into themes, using both the selected reason and the comment; when they disagree, trust the comment and note the mismatch. Keep themes specific (for example "didn't get the team to adopt it", "missing integration with the accounting system", "business closed", "only needed it for one project").
3. For each theme give the count and percentage of responses, two verbatim quotes, and the segments it concentrates in.
4. Classify each theme as preventable (the product, pricing, onboarding or support could have changed the outcome), partly preventable, or unavoidable (business closed, project ended, seasonal need, acquired by a company with another tool). Unavoidable churn may still be recoverable later through pause or win-back, so note that where relevant.
5. Compare segments: plan, tenure (early churn in the first 90 days usually points to activation and onboarding; late churn to value, competition or price), and account size, where the data allows. Flag small groups as directional.
6. Look beneath the stated reasons: for example "too expensive" with low usage often means low value realised; "missing feature" may hide that the user never found an existing feature. Present these as hypotheses with the evidence.
7. Propose save offers worth testing, each matched to a theme: for example pause instead of cancel for seasonal or temporary needs, a downgrade path for price-sensitive low-usage accounts, a setup or migration session for adoption problems, or a time-limited discount only where the evidence suggests value is there but timing is off. For each: the hypothesis, who sees it, the success metric (saves still active after 60-90 days, not just clicks), and the risk (for example teaching customers to threaten cancellation for discounts).
8. Propose product and process fixes for the largest preventable themes, ordered by churn volume addressed and ease.
9. List caveats about what this data cannot show.
</task>

<constraints>
- Quote verbatim only; never invent comments, counts or segments.
- Every save offer must be skippable in one step, and cancelling must remain as easy as signing up. Do not propose dark patterns.
- Measure saves by retention after a delay, not by acceptance of the offer.
- If fewer than about 50 responses are provided, say the themes are directional.
</constraints>

<output_format>
## Sample and data quality
Bullets.

## Churn themes
Table: theme | count | % | segments | preventable? | quotes.

## Preventable versus unavoidable
A short summary with the share of responses in each class.

## Segment patterns
Table or bullets.

## Root causes
Hypotheses beneath the stated reasons, with evidence.

## Save offers to test
Table: offer | theme | who sees it | hypothesis | success metric | risk.

## Product and process fixes
Numbered.

## Caveats
Bullets.
</output_format>
