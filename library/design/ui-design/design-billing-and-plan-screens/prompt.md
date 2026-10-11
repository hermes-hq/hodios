---
schema: 1
id: design-billing-and-plan-screens
kind: prompt
title: Design billing and plan screens
description: Designs a subscription product's billing area with current plan, usage, invoices, payment methods, plan changes with proration shown, and failed-payment and past-due states.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer, founder]
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
tags: [billing, subscriptions, invoice-history, plan-changes, failed-payments, dunning]
pairs_with:
  prompts: [spec-subscription-billing-rules, design-churn-save-flow, design-settings-screen, design-upgrade-prompts-and-paywall, write-ux-microcopy]
  personas: [product-designer]
args:
  - name: billing_context
    description: Plans and prices, billing periods, seat or usage-based pricing, who manages billing (individual, workspace owner, finance contact), payment methods and billing provider, tax or VAT details needed on invoices, and the questions or tickets support gets about billing.
    type: text
    required: true
  - name: constraints
    description: Billing provider features or limits, hosted pages you must use, markets. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Billing area structure, Overview screen, Plan change flow, Payment methods, Invoices and receipts, Failed payment and past due, Permissions, Errors and edge states, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most billing support tickets come from screens that do not answer four questions at a glance: what plan am I on, what will I pay next and when, why was I charged this amount, and how do I change it. Plan changes that hide proration, seat counts that silently increase the bill, invoices without the tax details finance teams need, and failed-payment states that lock people out without warning all create churn and chargebacks. A good billing area is boring and complete: it shows the next charge with its date, explains every amount, lets the right person change things, and treats payment failure as a recoverable state with clear deadlines.
</context>

<task>
<billing_context>
{{billing_context}}
</billing_context>
{{#constraints}}

<billing_constraints>
{{constraints}}
</billing_constraints>
{{/constraints}}

If plans and pricing model are unknown, ask and stop. Other gaps become assumptions marked [confirm].

1. **Billing area structure.** Sections and navigation (overview, plan, payment methods, invoices, billing details) and where billing lives in settings.
2. **Overview screen.** Current plan, price, billing period, next charge amount and date, seats or usage against included amounts with how overage is billed, and the primary actions.
3. **Plan change flow.** Upgrade, downgrade, switch period and change seats. Before confirming, show the amount charged today, the new recurring amount, the effective date, and what features or data change on downgrade. State whether downgrades apply now or at period end.
4. **Payment methods.** Add, set default, remove (blocked if it is the only method on an active plan, with the reason), expiring-card warning, and any authentication step handled in place.
5. **Invoices and receipts.** List with date, number, amount, status and download; billing details (legal name, address, tax ID) editable for future invoices; what to do about a past invoice that needs correction.
6. **Failed payment and past due.** The banner and email sequence with dates, what still works during the grace period, the exact day access changes, one-click retry or update payment, and what happens to data after suspension.
7. **Permissions.** Who can see amounts and invoices versus who can change plans; what a non-billing member sees and how they request a change.
8. **Errors and edge states.** Card declined, authentication required, tax ID invalid, plan change not allowed mid-contract, refund pending, currency mismatch, cancelled plan still active until period end.
9. **Metrics.** Billing tickets per 1,000 accounts, involuntary churn rate, recovery rate after failed payment, plan change completion.
</task>

<constraints>
- Show the exact amount and date before every action that changes what the user pays.
- Do not invent prices, proration rules, tax rates or grace periods; use given values or placeholders marked [confirm].
- Do not state tax or invoicing law as fact; list invoice fields to confirm with the finance owner.
- No dark patterns: cancellation and downgrade are reachable from the billing area, not hidden behind support.
{{> output/uncertainty}}
</constraints>

<output_format>
## Billing area structure
## Overview screen
Top-to-bottom layout with labels and example values.
## Plan change flow
Steps with the confirmation summary content.
## Payment methods
## Invoices and receipts
## Failed payment and past due
| Day | What the user sees | Channel | Access |
## Permissions
## Errors and edge states
| Situation | Message (exact copy) | Recovery |
## Metrics
</output_format>
