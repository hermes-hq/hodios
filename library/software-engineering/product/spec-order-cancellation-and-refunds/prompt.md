---
schema: 1
id: spec-order-cancellation-and-refunds
kind: prompt
title: Specify order cancellation, returns and refunds
description: Specifies order cancellation, returns and refunds for engineers, with time windows, partial refunds and fees, discount allocation, payment reversal, restocking, notifications and records.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer, fullstack-engineer]
stack: []
requires: [none]
inputs: [spec, document, notes]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [ecommerce, retail]
tags: [refunds, returns, order-management, requirements]
pairs_with:
  prompts: [write-refund-policy, spec-record-status-lifecycle, spec-promo-code-rules]
args:
  - name: order_flow
    description: What is sold, how orders move from placed to delivered, payment methods, and who handles cancellations and returns.
    type: text
    required: true
  - name: policy
    description: The business's refund and returns policy, countries sold to, and known problem cases.
    type: text
output_contract:
  format: markdown
  sections: [Cancellation windows, Returns flow, Refund calculation, Payment and stock effects, Notifications and records, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A refund looks like one button and is really a chain of money and stock movements. Gaps that cost money or customers: an order cancelled after the warehouse picked it ships anyway; a partial return refunds the item's list price instead of what was paid after an order-level discount; shipping is or is not refunded depending on who processed it; the refund goes to a card that has since expired and nobody knows what happens; a refund via a buy-now-pay-later provider or gift card takes a different path; returned stock is added back before inspection and sold damaged; the invoice is not corrected; and support issues goodwill refunds with no limit or record. Consumer rights on cancellation and returns vary a lot by country and by how goods were sold, so the policy must come from the business and its legal advice; the spec makes it executable. It needs cancellation windows tied to fulfilment states, a return flow, a refund calculation with a worked example, effects on payments, stock and accounting documents, and every customer message.
</context>

<task>
<order_flow>
{{order_flow}}
</order_flow>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. Specify cancellation windows: who can cancel (customer, support, system) in each fulfilment state, what happens when the order is already picked, packed or shipped (intercept, convert to return), partial cancellation of lines, and automatic cancellations (payment failure, stock shortage).
2. Specify the returns flow: eligibility and window, which items are excluded (as given by policy), return request steps, reasons, labels and who pays return shipping, receipt and inspection, and outcomes (refund, exchange, store credit, rejection with reason).
3. Specify the refund calculation: line price paid after allocated discounts, shipping, fees and restocking fees if the policy allows them, partial refunds, refunds to multiple payment methods (card plus gift card), rounding, and a worked example with an order-level discount and a partial return.
4. Specify payment and stock effects: void versus refund depending on capture state, refund to the original method and fallback when it is no longer available, provider-specific paths (wallets, buy now pay later), stock returned only after inspection with condition grades, and credit notes or corrected invoices for accounting.
5. Specify notifications and records: messages at each step, expected refund timing stated as provider-dependent, support tools with limits and approvals for goodwill refunds, and an audit record of who refunded what and why.
6. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Do not invent the business's policy or statutory consumer rights; use the policy given and mark legal points for confirmation in the countries sold to.
- Refunds must never exceed what was paid for the line plus refundable shipping unless a goodwill rule allows it with approval.
- Always include a worked refund example with discounts.
- If payment methods or fulfilment states are unknown, ask before writing payment rules.
</constraints>

<output_format>
## Cancellation windows
Table: fulfilment state, who can cancel, what happens.
## Returns flow
Numbered steps.
## Refund calculation
Rules, then a worked example.
## Payment and stock effects
Bullets.
## Notifications and records
Table: event, customer message, internal record.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
