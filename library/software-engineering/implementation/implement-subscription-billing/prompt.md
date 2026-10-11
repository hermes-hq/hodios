---
schema: 1
id: implement-subscription-billing
kind: prompt
title: Implement subscription billing
description: Implements recurring subscriptions with a billing provider covering plans, trials, upgrades with proration, failed-payment dunning and entitlements synced by webhooks. Use for SaaS plans.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [subscriptions, recurring-billing, dunning, proration, entitlements, webhooks]
pairs_with:
  prompts: [integrate-payments, build-webhook-handler, implement-money-arithmetic, migrate-payment-provider]
  personas: [backend-engineer]
args:
  - name: plans
    description: The plans and prices, billing intervals, trial rules, upgrade and downgrade behaviour, and what each plan unlocks.
    type: text
    required: true
  - name: provider
    description: Billing provider, for example Stripe Billing, Paddle, Chargebee or Lemon Squeezy. Leave empty to use what the repo already has.
    type: string
  - name: stack
    description: Language, framework and database. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer implementing recurring billing on top of a billing provider. Writing your own billing engine is almost never right; the work is keeping your app in sync with the provider. What matters:
- The provider is the source of truth for subscription state. Your database mirrors it from webhooks, so the app works when the provider is slow and you can query locally.
- Webhooks: verify signatures, process idempotently by event id, acknowledge fast and do work in a job, and expect events out of order and repeated. For state, refetch the subscription from the provider's API or compare event timestamps instead of trusting the order of arrival.
- Entitlements (what the customer may use) derive from subscription status in one place: `trialing` and `active` grant access, `past_due` usually keeps access during a grace period, `canceled` and `unpaid` remove it. Code checks entitlements, never plan names scattered across the codebase. Prices map to plans through configuration, not hard-coded provider ids in feature code.
- Upgrades usually take effect at once with proration; downgrades usually apply at period end. Cancel at period end is the default; immediate cancellation and refunds are explicit admin actions.
- Dunning: use the provider's automatic retries and emails, show an in-app banner with a link to update the payment method, and restrict after the grace period ends.
- Use the provider's hosted checkout and customer portal where possible: they keep card data off your servers (PCI scope) and handle 3-D Secure.
- Tax depends on jurisdiction; use the provider's tax features or a merchant-of-record provider. Do not compute tax from invented rates.
- Test with the provider's test mode and its time-simulation features for renewals, trial ends and failed payments.
</context>

<task>
Implement subscription billing:
{{plans}}

{{#provider}}Provider: {{provider}}{{/provider}}
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read existing billing, payment, webhook, account and feature-gating code. Find where features are gated today.
2. State the design: plan and price configuration, local subscription table, status-to-entitlement mapping, upgrade, downgrade and cancel rules, trial rules, dunning and grace period, webhook events handled.
3. Implement checkout session creation, the customer portal link, the webhook handler with signature verification and idempotency, the local subscription sync, the entitlement check used by feature gates, the past-due banner, and the admin view.
4. Write tests with recorded webhook fixtures, including out-of-order and duplicate events. Run them and the type check.
</task>

<constraints>
- Never store card numbers or handle raw card data; use the provider's hosted fields or checkout.
- Never invent prices, tax rates or provider API fields; if unsure of an API or event name, say so and name the provider docs page to check.
- Do not create or change live products, prices or webhooks; list the dashboard or API setup steps for a human.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why. Include the status-to-entitlement table.
## Changes
One line per file: `path`, what changed. Then the setup steps for the provider dashboard.
## Tests
One line per test. Cover at least: trial start and conversion, upgrade with proration, downgrade at period end, failed payment entering grace and then losing access, duplicate and out-of-order webhooks, and an invalid signature rejected.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the business, with the default chosen.
</output_format>
