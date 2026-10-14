---
schema: 1
id: build-recommendation-system
kind: prompt
title: Build a recommendation system
description: "Builds a recommender from a popularity baseline to item-item or learned models, with time-based offline evaluation, cold-start handling and business rules, before any online test."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, design]
role: [ml-engineer, data-scientist, backend-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo, spec]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [recommender-systems, collaborative-filtering, ranking-metrics, cold-start, personalization]
pairs_with:
  prompts: [plan-ml-experiment, choose-ml-approach]
args:
  - name: product
    description: What is recommended to whom and where (home feed, "similar items", email), and the business goal (clicks, purchases, watch time, retention).
    type: text
    required: true
  - name: data
    description: Interaction data available (views, clicks, purchases, ratings) with volumes, item catalogue and metadata, user attributes, and how often items are added.
    type: text
    required: true
  - name: constraints
    description: Latency, how often recommendations can be recomputed, and rules such as stock or content restrictions.
    type: string
output_contract:
  format: markdown
  sections: [Framing, Models, Code, Offline results, Cold start and rules, Path to online test, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recommenders are judged against baselines that are surprisingly hard to beat: most popular items in the last week, and "recently viewed" or "bought again" for returning users. Item-item co-occurrence or a matrix factorisation model on implicit feedback (views, clicks, purchases) usually comes next; learned two-tower or sequence models only pay off with large data and engineering capacity. Offline evaluation with random splits leaks the future; hold out each user's latest interactions by time instead. Recall@k and NDCG@k must be paired with coverage and popularity bias, or a model that only recommends best-sellers looks fine. Items the user already bought, out-of-stock items and restricted content need filtering. New users and new items have no interactions, so cold start needs content features or popularity by segment. Offline gains often do not carry over online, and recommendations shape the data they are later trained on, so an A/B test is the final judge.
</context>

<task>
Build a recommender for: {{product}}

Data: {{data}}
{{#constraints}}

Constraints: {{constraints}}
{{/constraints}}

1. Read the repository and data access code. Frame the problem: the recommendation surface, the positive signal (and how strong each interaction type is), the candidate set, and the metric that matches the business goal.
2. Prepare interactions: deduplicate, remove bots and test accounts, weight interaction types, and decide on minimum activity thresholds. Report sparsity and the share of interactions from the top 1% of items.
3. Split by time: train on interactions before a cutoff, evaluate on each user's interactions after it. Keep users and items unseen in training as a separate cold-start slice.
4. Build baselines: global popularity over a recent window, and for returning users recently viewed or repeat purchase where relevant.
5. Build one or two models suited to the data: item-item similarity from co-occurrence, implicit matrix factorisation, or a two-tower model only if data volume justifies it. Explain the choice.
6. Evaluate all on the same split: recall@k, NDCG@k, catalogue coverage, and average popularity of recommended items, overall and for light versus heavy users and for the cold-start slice.
7. Add cold start (content-based similarity from item metadata, popularity by segment) and business rules (exclude already purchased, out of stock, restricted), and show their effect on metrics.
8. Produce batch or online serving code within the latency limits, and write tests for filtering rules and for users with no history.
9. Describe the online test: the metric, guardrails, minimum duration and how exposure logging will be captured for future training.
</task>

<constraints>
- No random interaction split; time-based only.
- Always report against the popularity baseline.
- Do not claim business impact from offline metrics; the online test decides.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Framing
Surface, signal, candidates, metric.
## Models
Baselines and models chosen, with reasons.
## Code
Code blocks with file paths.
## Offline results
Table: model | recall@k | NDCG@k | coverage | popularity, with slices.
## Cold start and rules
What happens for new users and items, and the filters.
## Path to online test
Metric, guardrails, duration, logging.
## Check
Commands run and real results.
</output_format>
