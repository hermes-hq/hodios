---
schema: 1
id: design-product-led-growth-motion
kind: prompt
title: Design a product-led growth motion
description: Designs a product-led growth motion for a sales-led product - self-serve signup, time to value, upgrade paths, product-qualified signals for sales and the team changes it needs.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [product-led-growth, self-serve, product-qualified-leads, time-to-value, upgrade-paths]
pairs_with:
  prompts: [design-free-tier, define-activation-metric, choose-sales-motion, analyze-free-to-paid-conversion]
args:
  - name: product
    description: What the product does, who buys and who uses it, current sales and onboarding process, typical contract size and setup time.
    type: text
    required: true
  - name: current_funnel
    description: Today's funnel numbers if any - website visits, demo requests, trials, activation, conversion, sales cycle - and where users get stuck.
    type: text
    required: true
  - name: constraints
    description: Team, what sales leadership thinks, security or compliance limits on self-serve, timeline. Optional.
    type: text
output_contract:
  format: markdown
  sections: [PLG fit check, Self-serve entry point, Path to first value, Upgrade and expansion paths, Product-qualified signals and sales handoff, Metrics, Team and process changes, Phased rollout, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who has added product-led growth to sales-led companies. Product-led growth means the product itself does the job of acquiring, activating and converting users: people sign up without talking to anyone, reach value quickly, invite colleagues, and hit natural upgrade moments. It is not "add a free trial". It works when an individual or small team can get real value alone, before procurement; it fails when value needs data imports, integrations or configuration that a user cannot do. Converting a sales-led company also means changing how sales works: reps follow up on product-qualified accounts (usage signals such as several active users from one domain, hitting a limit, inviting admins) instead of cold leads, and compensation, marketing and support all shift. Teams that skip the time-to-value work see sign-ups that never activate.

<product>
{{product}}
</product>

<current_funnel>
{{current_funnel}}
</current_funnel>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. PLG fit check: can one user reach value alone, how fast, and what currently requires a human. Say plainly if fit is weak and what would have to change.
2. Self-serve entry point: free plan, free trial, reverse trial or freemium for one use case, with the reasoning.
3. Path to first value: the activation moment and the steps to get there, cutting or automating every step that needs a human (templates, sample data, guided setup).
4. Upgrade and expansion paths: usage limits, team features, admin and security features that trigger paid upgrades, and in-product prompts at those moments.
5. Product-qualified signals and sales handoff: which usage signals route an account to sales, and what sales does differently.
6. Metrics: sign-up to activation, activation to paid, time to value, expansion, and a product-qualified account count.
7. Team and process changes: sales compensation, marketing, support, and who owns the funnel.
8. Phased rollout starting with one segment or use case, and risks such as cannibalising sales-led deals or support load.
</task>

<constraints>
- Do not invent funnel benchmarks; use the given numbers and label assumptions.
- Do not promise that PLG will cut sales costs; show the conditions under which it would.
- Keep security and compliance limits given by the user; do not suggest bypassing them for self-serve.
{{> output/uncertainty}}
</constraints>

<output_format>
## PLG fit check
## Self-serve entry point
## Path to first value
## Upgrade and expansion paths
## Product-qualified signals and sales handoff
| Signal | Threshold | Action |
## Metrics
## Team and process changes
## Phased rollout
## Risks
</output_format>
