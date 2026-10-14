---
schema: 1
id: plan-cross-platform-feature-parity
kind: prompt
title: Plan cross-platform feature parity
description: Sets the rules for shipping features across web, iOS, Android and desktop - which platform leads, which gaps are acceptable, parity targets per feature type and how parity debt is tracked.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, engineering-manager, mobile-engineer, designer]
requires: [none]
inputs: [text, dataset, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [feature-parity, multi-platform, parity-debt, platform-strategy, ios-android-web]
pairs_with:
  prompts: [coordinate-cross-platform-feature-release, set-roadmap-investment-mix, critique-roadmap]
args:
  - name: platforms
    description: The platforms you ship on, the team structure for each, and the share of users and revenue per platform if known.
    type: text
    required: true
  - name: current_state
    description: The current parity situation - features missing on some platforms, complaints, and how features are planned today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Usage by platform, Parity principles, Feature classes and targets, Lead platform rules, Parity debt register, Planning changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set a standing policy for how features reach each platform when a product ships on web, iOS, Android and sometimes desktop. Without one, each platform team plans separately, gaps grow, customers on one platform feel neglected, support has to explain why something works on the web but not on the phone, and every roadmap meeting re-argues whether a feature must launch everywhere at once. Full parity for everything is expensive and often wrong: people use each platform for different jobs (mobile for quick checks and capture, web for setup and heavy editing). A good policy classifies features (core flows that must match, platform-specific features that fit one context, admin or power features that can stay on one platform), names which platform leads for each class, sets the maximum acceptable lag, and keeps parity gaps visible as debt with owners.
</context>

<task>
Platforms:

<platforms>
{{platforms}}
</platforms>

Current state:

<current_state>
{{current_state}}
</current_state>

1. Summarise usage by platform from the data given: who uses which platform for what. If data is missing, say what to measure.
2. Write three to five parity principles in plain language, tied to how this product is used.
3. Define feature classes with a parity target each: for example core flows (all platforms, within a short lag), contextual features (only where they fit), and admin or power features (one platform is enough). Give examples from the user's product.
4. Set lead-platform rules: which platform leads for each class and why, the maximum lag for followers, and what happens to features that miss it.
5. Build a parity debt register from the current gaps: feature, missing platforms, class, user impact, decision (close, accept, or remove from the leading platform), and owner.
6. Recommend planning changes: how parity is checked during roadmap planning, how specs cover each platform, and how often the debt register is reviewed.
</task>

<constraints>
- Use only the usage and team data given; do not invent platform shares.
- Do not default to "full parity everywhere"; justify each target by how users actually use the platform.
- Platform store rules and technical limits can make some features impossible or different on a platform; note where to check rather than assuming.
{{> output/uncertainty}}
</constraints>

<output_format>
## Usage by platform
Bullets.

## Parity principles
Numbered list.

## Feature classes and targets
Table: class | definition | examples | parity target | max lag.

## Lead platform rules
Bullets.

## Parity debt register
Table: feature | missing on | class | user impact | decision | owner.

## Planning changes
Bullets.
</output_format>
