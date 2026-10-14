---
schema: 1
id: spec-subscription-billing-rules
kind: prompt
title: Specify subscription billing rules
description: Specifies subscription billing behaviour, covering renewals, proration on upgrades and downgrades, failed payment retries, grace periods, cancellation timing, refunds, taxes and notices.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer, founder]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [saas]
tags: [subscriptions, billing, proration, requirements]
pairs_with:
  prompts: [spec-plan-limits-and-entitlements, implement-subscription-billing, design-churn-save-flow]
args:
  - name: pricing
    description: Plans, prices, billing periods (monthly, yearly), seats or usage components, and trials as decided by the business.
    type: text
    required: true
  - name: context
    description: Payment provider if chosen, customer types (consumers, businesses), countries, payment methods, and current billing complaints.
    type: text
output_contract:
  format: markdown
  sections: [Billing model, Renewals and invoices, Plan changes and proration, Failed payments, Cancellation and refunds, "Taxes, currency and notices", Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Billing rules decide most of the angry tickets a subscription business gets. The usual gaps: an upgrade mid-month charges the full new price, or nothing until renewal, and nobody decided which; a downgrade takes effect immediately and wipes access the customer paid for; seats added and removed during a month are billed inconsistently; a card fails and access is cut the same hour, or never; "cancel" ends access at once when customers expected the rest of the paid period; annual renewals go through with no reminder; refunds are improvised per ticket. Payment providers have defaults for all of this, and teams often ship those defaults without knowing them. A good spec states the billing anchor, renewal and invoice timing, proration rules per change, retry schedule and grace period with what access looks like during it, cancellation timing, refund policy hooks, tax and currency handling, and every customer notice.
</context>

<task>
<pricing>
{{pricing}}
</pricing>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Specify the billing model: billing anchor date, billed in advance or in arrears, seat and usage components and when they are measured, trials (card required or not, what happens at trial end), and coupons or credits if they exist.
2. Specify renewals and invoices: renewal timing, invoice creation and payment attempt timing, renewal reminders (especially before annual renewals), receipts and invoice contents to confirm with finance.
3. Specify plan changes and proration: upgrade timing and charge (prorated now or at renewal), downgrade timing (period end by default), switching between monthly and yearly, adding and removing seats mid-period, and a worked example with numbers for each.
4. Specify failed payments: retry schedule, customer and admin notices, grace period, access during and after it (full, read-only, locked), card update flow, and recovery when payment succeeds later.
5. Specify cancellation and refunds: cancel at period end versus immediately, what access remains, reactivation, refund rules (none, prorated, within a window) as a business decision to confirm, and handling chargebacks.
6. Specify taxes, currency and notices: tax calculated by the provider or a tax service, customer tax IDs and reverse charge where relevant, currencies and price rounding, and price change notices for existing subscribers. Flag consumer auto-renewal and cancellation rules that vary by country for legal review.
7. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Do not set prices, tax rates or refund policy; mark business decisions as decisions to confirm.
- Every proration rule needs a worked numeric example using the user's prices.
- Never specify deleting customer data because of failed payment; at most restrict access with export available.
- Do not state country-specific legal rules as facts; flag them for review.
- If plans, prices, billing periods or customer types are missing, ask for them before writing.
</constraints>

<output_format>
## Billing model
Bullets.
## Renewals and invoices
Numbered rules.
## Plan changes and proration
Table: change, when it takes effect, charge or credit, worked example.
## Failed payments
Table: day, action, customer notice, access.
## Cancellation and refunds
Numbered rules.
## Taxes, currency and notices
Bullets.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
