---
schema: 1
id: migrate-payment-provider
kind: prompt
title: Migrate to a new payment provider
description: Plans moving to a new payment provider, covering provider-to-provider card migration, subscriptions, mandates, webhooks, refunds and disputes on old charges, reconciliation and a staged cutover.
category: migration
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [backend-engineer, tech-lead, engineering-manager]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [payments, card-data-migration, subscriptions, pci-dss, cutover-plan]
pairs_with:
  prompts: [integrate-payments, build-webhook-handler, plan-incremental-migration]
  personas: [migration-engineer]
args:
  - name: situation
    description: Current and new provider, payment methods and countries, one-off versus recurring payments, how many stored payment methods and active subscriptions, and why you are moving.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What has to move, Stored payment data, Recurring billing, Cutover plan, Old account wind-down, Reconciliation and monitoring, Questions for both providers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Changing payment provider is mostly not a code change. Card numbers sit in the old provider's vault, and a merchant who never handled raw card data cannot export them; the providers transfer them between each other under PCI DSS, on request, and the process takes weeks and depends on both sides. Recurring payments carry hidden state: subscription schedules, trial ends, proration, and in many regions the record of the customer's original authentication or mandate, which merchant-initiated charges reference; if that does not carry over, renewals can fail or need the customer to authenticate again. Local payment methods and bank debit mandates often cannot move at all. The old account cannot be closed at cutover: refunds and disputes on old charges must go through it for months. Webhook event types, idempotency rules, decline codes and payout timing all differ, so finance reconciliation breaks quietly if no one plans it.
</context>

<task>
Situation:
{{situation}}

1. List what has to move: customers and their IDs, stored payment methods, subscriptions and plans, mandates, open invoices, coupons, saved addresses and tax settings, webhooks consumers, reporting and payout reconciliation.
2. Stored payment data: describe the provider-to-provider transfer path (request, encryption and mapping file of old to new IDs, test batch, final batch), what cannot move (methods to re-collect), and how to handle cards added or updated after the export (delta export or a freeze window).
3. Recurring billing: how schedules, trials and proration are recreated without double charging or skipping a cycle; whether original authentication or mandate references transfer, and the fallback (re-authentication campaign, grace period, retry logic).
4. Cutover plan in stages: new customers and one-off payments on the new provider first behind a switch; migrated customers in batches, with renewals routed by a per-customer provider field; a rollback path for each stage; and the success rate, decline mix and dispute rate compared per provider.
5. Old account wind-down: keep it open for refunds and disputes on old charges for the dispute window stated by the provider; route refunds by the charge's original provider; stop old webhooks only after the last expected event.
6. Reconciliation and monitoring: map payouts, fees and refunds from both providers into one ledger; alerts on authorization rate drop, webhook failures and unmatched payouts.
7. Questions to ask both providers in writing.
</task>

<constraints>
- Never suggest exporting, storing or moving raw card numbers through your own systems.
- Do not state fees, timelines, dispute windows or provider capabilities as facts; put them in the questions for the providers.
- Payment rules differ by country and scheme; state assumptions and name where finance, legal or compliance staff must sign off.
{{> output/uncertainty}}
</constraints>

<output_format>
## What has to move
Table: item | moves how | owner.
## Stored payment data
Numbered steps and what must be re-collected.
## Recurring billing
Bullets.
## Cutover plan
Numbered stages with gate metric and rollback.
## Old account wind-down
Bullets with dates as placeholders.
## Reconciliation and monitoring
Bullets.
## Questions for both providers
Numbered list.
</output_format>
