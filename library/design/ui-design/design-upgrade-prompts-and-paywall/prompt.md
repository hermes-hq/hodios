---
schema: 1
id: design-upgrade-prompts-and-paywall
kind: prompt
title: Design upgrade prompts and a paywall
description: Designs where and how a freemium or trial product asks users to upgrade, with limit states, locked-feature previews, paywall screens and honest trial and renewal messaging.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [saas]
tags: [paywall, upgrade-prompts, freemium, free-trial, usage-limits, monetisation]
pairs_with:
  prompts: [write-paywall-and-upgrade-copy, spec-plan-limits-and-entitlements, analyze-paywall-performance, design-pricing-page, review-design-for-dark-patterns]
  personas: [product-designer]
args:
  - name: product_context
    description: The product, free and paid plans with their limits and prices, trial model (none, free trial, card required or not), platforms (web, iOS, Android), where users hit limits today, and current conversion or complaint data.
    type: text
    required: true
  - name: constraints
    description: App store rules you must follow, billing provider limits, brand rules. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Upgrade moments, Placement map, Limit and locked states, Paywall screen, Trial messaging, Frequency rules, Errors and edge states, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Upgrade prompts convert when they appear at the moment a user has just felt the value and hit a real limit, and they annoy when they interrupt work at random. The common mistakes: a modal on every launch, locked features that give no idea what they do, limits discovered only after the user has done the work ("upgrade to export" after a two-hour edit), trials whose end date and renewal price are hidden, and paywalls without a visible way out. Good design maps the natural upgrade moments, warns before a limit is hit, lets users preview what is locked, states exactly what they pay and when, and caps how often the product asks.
</context>

<task>
<product_context>
{{product_context}}
</product_context>
{{#constraints}}

<monetisation_constraints>
{{constraints}}
</monetisation_constraints>
{{/constraints}}

If plans or limits are unknown, ask and stop. Other gaps become assumptions marked [confirm].

1. **Upgrade moments.** List the moments where upgrading makes sense for this product: approaching a usage limit, hitting it, trying a locked feature, team growth, trial ending. Rank them by user intent.
2. **Placement map.** For each moment, the surface (inline banner, badge on a locked feature, modal, dedicated paywall screen, settings entry), why that surface, and what the user was doing. Keep a permanent, quiet upgrade entry in navigation or settings.
3. **Limit and locked states.** Warn at a threshold before the limit (for example 80%) with usage shown; at the limit, say what still works and never destroy or hide work already done. Locked features show what they do (preview, sample, short description) before asking to pay.
4. **Paywall screen.** Layout top to bottom: the benefit tied to what the user just tried, plan options with price per period and total billed, what changes immediately, trial terms, primary action, restore purchases (mobile), and a clearly visible close or "not now".
5. **Trial messaging.** Start, mid-trial and before-end reminders with dates, the renewal price and how to cancel; what happens to data and features when a trial ends without paying.
6. **Frequency rules.** Caps per session and per week, cool-down after dismissal, never during onboarding's first task, and suppression for users already paying or in a billing issue.
7. **Errors and edge states.** Purchase failed or cancelled, payment pending, already subscribed on another platform, family or team admin pays, offline, restore found nothing.
8. **Metrics.** Prompt view to upgrade rate per moment, dismiss rate, trial-to-paid, refund and complaint rate, and churn in the first billing cycle as a guard against over-aggressive prompts.
</task>

<constraints>
- No dark patterns: no hidden close button, no confirmshaming ("No, I don't want to succeed"), no pre-selected longest plan without saying so, no trial that converts without a clear date and price.
- Do not state app store rules or consumer-law requirements as fact; mark them as items to confirm for the platforms and markets.
- Do not invent prices or plan names; use those given or placeholders.
- Work the user already created must stay accessible or exportable when a limit is hit, or say clearly why not.
{{> output/uncertainty}}
</constraints>

<output_format>
## Upgrade moments
## Placement map
| Moment | Surface | Trigger | Why here |
## Limit and locked states
## Paywall screen
Top-to-bottom layout with placeholder copy; final wording and terms text belong to a copywriting pass.
## Trial messaging
| When | Channel | Message |
## Frequency rules
## Errors and edge states
| Situation | Message (exact copy) | Recovery |
## Metrics
</output_format>
