---
schema: 1
id: implement-in-app-purchases
kind: prompt
title: Implement in-app purchases
description: Implements App Store and Google Play in-app purchases and subscriptions with product setup, purchase flow, server-side validation, entitlements, restores, refunds, grace periods and sandbox tests.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [mobile-engineer, backend-engineer, founder]
stack: [ios, android]
requires: [none]
inputs: [text, spec]
output: [code, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [in-app-purchases, subscriptions, storekit, play-billing, entitlements, receipts]
pairs_with:
  personas: [mobile-engineer]
  prompts: [integrate-payments, implement-push-notifications]
args:
  - name: products
    description: What you sell - consumables, non-consumables, auto-renewing subscriptions with tiers, trial and intro offers - and what each unlocks. Add your backend and whether users log in across devices.
    type: text
    required: true
  - name: platform
    description: Which stores you ship to.
    type: enum
    enum: [ios, android, both]
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Product catalogue, Entitlement model, Purchase flow, Server validation, Lifecycle events, Code, Sandbox test plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user sells digital goods inside an app on {{platform}}. Store billing has rules a web payments engineer does not expect: digital content consumed in the app generally must use store billing; transactions must be finished (StoreKit) or acknowledged within three days (Google Play) or they are refunded; unlocking features from the client alone is trivially bypassed; a subscription's state changes outside the app (renewals, billing retry, grace period, refunds, revocation, upgrades and downgrades, family sharing) and only arrives through server notifications; and users expect "Restore purchases" to work on a new device. Experts store entitlements on their server, keyed to their own user id, driven by verified store data, and treat the client as a cache.
</context>

<task>
<products>
{{products}}
</products>

1. If it is unclear what each product unlocks, whether users have accounts, or whether there is a backend, ask and stop. Note that a serverless app can rely on on-device verification (StoreKit 2 signed transactions) with stated weaker guarantees.
2. Design the product catalogue: product ids that never get reused, type, subscription groups and levels (iOS) or base plans and offers (Google Play), trials and intro offers, and how prices are shown from store data, never hard-coded.
3. Design the entitlement model: a server table of user, entitlement, source (store, original transaction id or purchase token), status, expiry, and the rule that maps store state to access, including grace period and billing retry.
4. Write the purchase flow: load products, show localized price, buy with an account token (appAccountToken or obfuscatedAccountId) linking to your user, handle pending (Ask to Buy, deferred payment), cancellation and errors, send the signed transaction or purchase token to the server, grant access only after the server confirms, then finish or acknowledge.
5. Write server validation: verify App Store signed transactions (JWS) and use the App Store Server API; verify Google Play purchases with the Play Developer API; reject reused or mismatched tokens; idempotent processing keyed on transaction id.
6. Handle lifecycle events from App Store Server Notifications V2 and Google Play Real-time Developer Notifications: renewal, failed renewal, grace period, expiry, refund and revocation, upgrade and downgrade, pause (Android), with an event-to-state table. Reconcile periodically in case notifications are missed.
7. Add restore purchases and cross-device access through the user's account.
8. Write a sandbox test plan: StoreKit configuration file and sandbox accounts, Play license testers and test cards, accelerated renewal, refunds, interrupted purchases, and app killed mid-purchase.
</task>

<constraints>
- Never grant paid access from client-side state alone when a backend exists.
- Do not state commission rates, pricing tiers or store policy details as current fact; say to check the latest App Store Review Guidelines and Google Play policies, including rules on external payment links, which vary by country.
- Do not invent API endpoints or SDK methods; state the StoreKit and Play Billing Library versions assumed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Product catalogue
Table: Product id | Type | Store config | Unlocks.
## Entitlement model
Schema and the access rule.
## Purchase flow
Numbered steps for the client and server.
## Server validation
Code and the checks performed.
## Lifecycle events
Table: Store event (iOS / Android) | New state | Access | Action.
## Code
Client files with names.
## Sandbox test plan
Table: Scenario | How to simulate | Expected.
</output_format>
