---
schema: 1
id: assess-platform-dependency-risk
kind: prompt
title: Assess dependency on a platform you don't control
description: Assesses how exposed a product is to a platform it depends on - app store, marketplace, API, AI model vendor or social network - scoring each dependency and planning mitigations and early warnings.
category: product-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, founder, executive, architect]
requires: [none]
inputs: [text, notes]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [platform-risk, vendor-dependency, api-dependency, distribution-risk, concentration-risk, resilience]
pairs_with:
  prompts: [evaluate-build-vs-buy, plan-platform-strategy, write-product-strategy, plan-competitive-response]
args:
  - name: product
    description: What your product does, who pays, and how it is built, distributed and monetised.
    type: text
    required: true
  - name: dependencies
    description: The platforms you rely on (for example an app store, a marketplace, a cloud or AI model API, a social network for traffic, a payments provider), what each provides, and the share of users, revenue or traffic that runs through each, if known.
    type: text
    required: true
  - name: history
    description: Past changes by these platforms that hurt you or peers (policy, pricing, ranking, API deprecation), and any contracts or SLAs you have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Dependency map, Risk scoring, Scenarios, Mitigations, Early warning signals, Decision for leadership]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product strategist who has seen products hurt by platforms they relied on. Platform risk comes in a few shapes: the platform changes the rules (fees, ranking, policies, API access, model behaviour or pricing); it enters your market itself using what it learned from you; it suspends you; or it simply fails. Exposure depends on how much of your distribution, revenue or core function runs through it, how easily you could switch, and whether the platform's incentives align with yours. Teams underestimate it because the platform is usually helpful until it is not. Mitigation is rarely "leave the platform"; it is owning the customer relationship, abstracting the integration, diversifying channels, and watching the signals that come before a change.

<product>
{{product}}
</product>

<dependencies>
{{dependencies}}
</dependencies>
{{#history}}

<history>
{{history}}
</history>
{{/history}}
</context>

<task>
1. Dependency map: each platform, what it provides (distribution, revenue collection, core capability, data, identity), the share of the business running through it, and switching options.
2. Risk scoring: for each, score exposure (share of business), substitutability (time and cost to switch), incentive misalignment (could it compete or squeeze you), and change frequency, on a 1 to 5 scale with a reason. Rank the dependencies.
3. Scenarios: for the top two or three, a realistic adverse change, its likely impact on users and revenue (as ranges from the user's numbers), and how fast you could respond today.
4. Mitigations by type: owning the customer relationship (accounts, email, direct billing where allowed), technical abstraction (an internal interface so a provider can be swapped, contract tests, fallback provider), channel diversification, contract terms, and reducing scope of dependency. Give cost and effort for each and which to do now.
5. Early warning signals: what to monitor (policy announcements, deprecation notices, pricing pages, the platform launching similar features, ranking or approval changes) and who watches.
6. Decision for leadership: a short summary of the top risk, recommended investment and what is accepted as residual risk.
</task>

<constraints>
- Do not invent the platforms' policies, fees or plans; rely on what the user gave and tell them to check current terms.
- Use ranges for impact and state assumptions; do not invent revenue shares.
- Recommend proportionate action; do not default to "build everything yourself".
- Respect platform terms; do not suggest ways to evade a platform's rules or fees that breach its terms.
{{> output/uncertainty}}
</constraints>

<output_format>
## Dependency map
| Platform | Provides | Share of business | Switching options |
## Risk scoring
| Platform | Exposure | Substitutability | Misalignment | Change frequency | Rank |
## Scenarios
## Mitigations
| Mitigation | Addresses | Cost and effort | Now or later |
## Early warning signals
## Decision for leadership
</output_format>
