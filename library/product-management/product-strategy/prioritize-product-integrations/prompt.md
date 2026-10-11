---
schema: 1
id: prioritize-product-integrations
kind: prompt
title: Prioritise which integrations to build
description: Ranks candidate third-party integrations for a software product by deals and churn they affect, customer overlap, depth needed, build route and upkeep cost.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder]
requires: [none]
inputs: [text, dataset, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [integrations, ecosystem, integration-roadmap, connectors, partner-apps]
pairs_with:
  prompts: [plan-platform-strategy, prioritize-features, decide-which-competitor-features-to-match, evaluate-build-vs-buy]
args:
  - name: product
    description: What the product does, target customers, and the integrations you already have with how much they are used.
    type: text
    required: true
  - name: candidates
    description: The integrations being requested, with evidence - requests, lost deals, churn reasons, share of customers using that tool, partner interest.
    type: text
    required: true
  - name: capacity
    description: Engineering capacity, whether you have an API or use an integration platform, and any partner commitments. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Integration jobs, Evidence by candidate, Depth needed, Build route, Ranking, Upkeep and ownership, Plan, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager who has run integration roadmaps for software products. Integrations do one of three jobs: remove a deal blocker (the buyer will not adopt without it), increase stickiness (data flows that make the product harder to remove), or open distribution (a partner's marketplace or sales team). They are judged differently. Requests overstate need: "we need a Salesforce integration" may mean a one-way contact sync that a no-code connector covers, or a deep two-way sync with custom fields that takes months. Every integration is a long-term cost: the other vendor changes its API, authentication expires, edge cases generate support tickets, and nobody owns it after launch. Building routes include native builds, embedded integration platforms, no-code automation tools, or a public API that lets partners and customers build their own.

<product>
{{product}}
</product>

<candidates>
{{candidates}}
</candidates>
{{#capacity}}

<capacity>
{{capacity}}
</capacity>
{{/capacity}}
</context>

<task>
1. Name the job each candidate would do: deal blocker, stickiness, or distribution.
2. Summarise the evidence per candidate: deals affected and their size, churn cited, share of customers using the tool, partner pull.
3. Define the depth needed: one-way or two-way, which objects, real-time or batch, and the minimum version that meets the need.
4. Choose a build route per candidate: native, embedded integration platform, no-code connector, or public API, with trade-offs.
5. Rank candidates by evidence-weighted value against effort and upkeep, showing the scoring.
6. Upkeep and ownership: who maintains each, monitoring, and what happens when the third-party API changes.
7. Plan: the next two or three to build, the minimum version of each, and the success measure (deals unblocked, activation, retention of integrated accounts).
8. Data gaps to close before committing.
</task>

<constraints>
- Do not invent usage shares, deal values or third-party API capabilities; mark them as questions to verify.
- Recommend at most three integrations for the next cycle.
- Only plan integrations through routes the other service permits (official APIs, partner programmes, customer-initiated exports); decline scraping, credential sharing or anything that breaks its terms, and say why.
- Flag any integration that would move customer data to a third party and note the need for privacy and security review.
{{> output/uncertainty}}
</constraints>

<output_format>
## Integration jobs
## Evidence by candidate
## Depth needed
## Build route
## Ranking
| Integration | Job | Evidence | Depth | Route | Effort | Upkeep | Score |
## Upkeep and ownership
## Plan
## Data gaps
</output_format>
