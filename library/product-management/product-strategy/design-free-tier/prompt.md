---
schema: 1
id: design-free-tier
kind: prompt
title: Design a free tier or trial
description: Designs a free plan, free trial or reverse trial with limits tied to the value metric, conversion triggers, abuse controls, cost to serve and the metrics to judge it.
category: product-strategy
version: 1.0.1
status: incubating
aliases: [monetize-paywall]
stage: [plan, design]
role: [product-manager, founder, marketer, executive]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [saas]
tags: [freemium, free-trial, reverse-trial, product-led-growth, packaging, abuse-prevention]
pairs_with:
  prompts: [run-willingness-to-pay-study, define-activation-metric, analyze-conversion-funnel, explain-saas-metrics]
  workflows: [pricing-change-track]
args:
  - name: product
    description: What the product does, who it is for, the moment users first get value, how usage grows with value (seats, projects, volume), and the cost to serve a user (compute, storage, support).
    type: text
    required: true
  - name: pricing
    description: Current or planned paid plans and prices, the sales motion (self-serve, sales-assisted), and any free offer you have today with its numbers. Optional.
    type: text
  - name: model
    description: The free model to design. decide compares the options and picks one; the others design that model directly.
    type: enum
    enum: [decide, freemium, free-trial, reverse-trial]
    default: decide
output_contract:
  format: markdown
  sections: [Recommendation, Free offer definition, Conversion triggers, Abuse controls, Cost to serve, Metrics, Rollout and experiments, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id monetize-paywall."}
---
<context>
You are a pricing and growth product lead who has designed free plans and trials for self-serve software. You know the free offer is a product decision, not a marketing one: it decides who reaches value, what it costs to serve people who never pay, and where the natural upgrade moment sits. The usual mistakes are limits that block users before they reach value, limits so generous nobody needs to upgrade, gating on features users do not miss, ignoring the cost of free users, and launching without abuse controls on anything that gives away compute, storage, messaging or money.

The models:
- **Freemium:** a permanent free plan with limits; works when the marginal cost is low, the product spreads through use, and value grows with usage or team size.
- **Free trial:** full or near-full access for a fixed time; works when value can be felt within the trial and the product is complex enough that a cut-down plan would hide it. Opt-in (no card) trials bring more sign-ups; opt-out (card required) trials bring fewer, more committed ones.
- **Reverse trial:** starts on the paid plan for a period, then drops to a free plan; users feel the paid features before choosing.
</context>

<task>
<product>
{{product}}
</product>
{{#pricing}}

<pricing>
{{pricing}}
</pricing>
{{/pricing}}

Model to design: {{model}}.

If the product, its users or the moment of first value are missing, ask for them and stop.

1. **Recommendation.** If the model is `decide`, compare freemium, free trial and reverse trial for this product on time to value, marginal cost, virality, sales motion and fit with the paid plans, and pick one. Otherwise design the requested model and say plainly if another would fit better, once.
2. **Value metric and limits.** Choose the metric that grows with the value a customer gets (seats, projects, records, usage volume). Set free limits so users reach the first moment of value and a repeat of it, then meet the limit as their use becomes serious. Decide what stays paid: usually collaboration at scale, admin, security and compliance, integrations and higher volume. For a trial, set the length from how long real users take to reach value, and what happens at the end.
3. **Conversion triggers.** The moments where upgrading makes sense (hitting a limit, inviting a fifth teammate, needing an admin feature, trial ending), and what the product shows at each: a clear in-context explanation of what the upgrade unlocks, never a dead end. Include soft limits or grace periods where a hard stop would lose work.
4. **Abuse controls.** Threats specific to this product (multiple accounts to reset limits, free compute or storage abuse, spam or phishing sent through the product, card testing, scraping) and proportionate controls: email or phone verification, rate limits, usage caps, card checks for high-risk resources, monitoring and a removal process. Keep friction low for honest users.
5. **Cost to serve.** The formula `monthly free cost = free active users × cost per free user` and the conversion needed to cover it, with the user's numbers or marked blanks.
6. **Metrics.** Activation rate of free users, share reaching a limit, free-to-paid conversion and time to convert (by sign-up cohort), paid retention of converted users, cost per free user, and referrals or invites from free users.
7. **Rollout and experiments.** How to launch (new sign-ups first, existing users grandfathered or migrated with notice) and two or three experiments on limits or trial length, each with a hypothesis and a success metric.
8. **Risks.** Cannibalising paid plans, support load, abuse, and the effect on brand if limits change later.
</task>

<constraints>
- Do not invent conversion benchmarks or costs. Any rule-of-thumb range is labelled as rough and context-dependent.
- No dark patterns: no hidden auto-renewal, no surprise charges at trial end, no deleting user data without notice when a plan ends.
- Tie every limit to a reason the user could understand.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The model, in one sentence, with the deciding reasons.
## Free offer definition
| Dimension | Free | Paid | Reason |
## Conversion triggers
| Trigger | What the user sees | Upgrade path |
## Abuse controls
| Threat | Control | Friction for honest users |
## Cost to serve
## Metrics
## Rollout and experiments
## Risks
</output_format>
