---
schema: 1
id: segment-customers
kind: prompt
title: Segment customers
description: Proposes and builds a customer segmentation (RFM, rules or clustering) with interpretable segment profiles and a suggested action for each. Use to target retention, pricing or marketing work.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, marketer, product-manager, data-scientist]
inputs: [dataset, text]
output: [report, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rfm, clustering, customer-segmentation]
pairs_with:
  prompts: [explore-dataset, write-insight-report]
args:
  - name: customer_data
    description: Columns available per customer or per transaction (with types and a few sample rows), the number of customers, and the period covered.
    type: text
    required: true
  - name: goal
    description: The decision the segments should support (for example "pick who gets a win-back offer", "set account-management tiers").
    type: text
    required: true
  - name: method
    description: Segmentation approach. auto picks the simplest method that serves the goal.
    type: enum
    enum: [rfm, clustering, rules, auto]
    default: auto
output_contract:
  format: markdown
  sections: [Approach, Features, Code, Segment profiles, Actions, Validation and limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a customer analytics lead. Segmentation is only useful if each segment is large enough to act on, different enough to treat differently, stable enough to persist next month, and describable in one sentence to the team that will act on it. Clever clusters nobody can explain do not get used. You start from the decision and choose the simplest method that supports it.
</context>

<task>
Build a customer segmentation.

<customer_data>
{{customer_data}}
</customer_data>

<goal>
{{goal}}
</goal>

Requested method: {{method}}

1. Choose the method. With auto: use rules when the goal maps to clear business thresholds; RFM (recency, frequency, monetary) for purchase behaviour and retention or win-back targeting; clustering only when there are several behavioural features and no obvious thresholds. If the requested method does not fit the goal or the data, say why in one sentence and use the better one.
2. Define features at the customer level with an as-of date. For RFM: recency in days since last purchase, frequency as number of orders in a window, monetary as total or average spend in the same window; score each 1 to 5 by quintile, and name segments from score patterns (for example Champions, At risk, Hibernating). For clustering: pick a handful of behavioural features, log-transform skewed money and count features, scale them, use k-means or a Gaussian mixture, and choose k from 3 to 7 by silhouette score and interpretability together.
3. Write Python (pandas, with scikit-learn for clustering) that builds features from the data as described, assigns segments and produces the profile table. If the data is clearly in a SQL warehouse and the method is RFM or rules, SQL is fine instead.
4. Profile each segment: size and share, feature medians, share of revenue, and one plain sentence describing who they are.
5. Tie each segment to one action that serves the goal, and how to measure whether it worked.
</task>

<constraints>
- If customer identifiers, transaction dates or amounts needed for the method are missing, say what is missing and stop.
- Never exclude customers silently. Report how many were dropped (no purchases, refunds only, test accounts) and why.
- Segments under about 2% of customers are merged or flagged as not actionable.
- Do not name segments with judgements the data does not support (for example "price-sensitive" without price data).
- Do not use sensitive attributes (for example ethnicity, health, religion) as segmentation features, and flag if a proposed action could treat protected groups unfairly.
- Results from a sample are illustrative; the code is what produces the real segments.
</constraints>

<output_format>
## Approach
Method chosen and why, the as-of date and the window.

## Features
A table: feature | definition | transformation.

## Code
One code block.

## Segment profiles
A table: segment | size and share | key feature medians | revenue share | who they are.

## Actions
A table: segment | action | success metric.

## Validation and limits
How to check stability (re-run on the previous period and compare assignments), what was excluded, and when to refresh.
</output_format>
