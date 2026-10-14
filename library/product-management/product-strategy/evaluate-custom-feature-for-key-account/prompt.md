---
schema: 1
id: evaluate-custom-feature-for-key-account
kind: prompt
title: Evaluate a custom feature for a key account
description: Decides whether to build a feature a big customer or deal demands, weighing revenue, reuse by others, roadmap cost, precedent and alternatives to a custom build.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [key-account, custom-request, deal-desk, roadmap-tradeoff, special-request]
pairs_with:
  prompts: [decline-feature-request, plan-move-upmarket, triage-feature-requests, prioritize-features]
args:
  - name: request
    description: What the customer or prospect asks for, the problem behind it, the deadline they want, and whether the deal or renewal depends on it.
    type: text
    required: true
  - name: account
    description: The account's current and potential revenue, segment, strategic value (reference, logo, expansion), and history of similar requests.
    type: text
    required: true
  - name: context
    description: How many other customers want something similar, rough effort, roadmap commitments it would displace, and the product strategy. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The real need, Value of the deal, Reuse beyond this account, Cost and displacement, Precedent risk, Options, Recommendation, Terms if we build]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who handles big-customer requests without letting them hijack the roadmap. The request as stated is often a solution; the underlying need can frequently be met with configuration, an API, an integration, a workaround or an existing roadmap item. The real cost of a custom build is not the first build but the permanent maintenance, the testing burden on every release, and the precedent: once one large customer gets a special build, others ask, and sales learns that roadmaps can be bought. Good decisions weigh the revenue truly at stake (not the whole contract if the feature is one of several asks), whether the capability generalises to the target market, what it displaces, and whether terms such as shared funding, a longer commitment or a design-partner role make it worth it. Saying yes but generalised ("we will build this for everyone, on our design") is often the best outcome.

<request>
{{request}}
</request>

<account>
{{account}}
</account>
{{#context}}

<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
1. Restate the real need behind the request and whether existing capabilities could meet it.
2. Value of the deal: revenue truly dependent on this feature, confidence that the feature decides it, and strategic value.
3. Reuse beyond this account: how many other customers or target segments need the same capability.
4. Cost and displacement: build effort, ongoing maintenance, and which committed work slips.
5. Precedent risk: what this teaches sales and other customers.
6. Options: build generalised, build custom, meet the need another way, partner or integrate, decline. Score each.
7. Recommendation with reasoning, and how to tell the account.
8. Terms if we build: design ownership, timeline without hard promises, commitment from the customer (contract length, design partnership, funding), and whether it becomes part of the standard product.
</task>

<constraints>
- Do not invent revenue, effort or customer counts; mark them as questions.
- Do not recommend promising delivery dates engineering has not confirmed.
- Ensure the recommendation states what work would slip and who must agree.
{{> output/uncertainty}}
</constraints>

<output_format>
## The real need
## Value of the deal
## Reuse beyond this account
## Cost and displacement
## Precedent risk
## Options
| Option | Value | Cost | Risk | Score |
## Recommendation
## Terms if we build
</output_format>
