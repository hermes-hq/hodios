---
schema: 1
id: implement-shopping-cart
kind: prompt
title: Implement a shopping cart
description: Implements a shopping cart with guest carts, merge on sign-in, server-side price recalculation, stock checks, promo codes and checkout handoff. Use when building a store's cart.
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
depth: specific
tags: [shopping-cart, checkout, inventory, promo-codes, order-creation]
pairs_with:
  prompts: [integrate-payments, implement-money-arithmetic, implement-idempotency-keys]
  personas: [backend-engineer]
args:
  - name: requirements
    description: What is sold, guest checkout or not, stock rules (limited stock, backorders), promo codes, and taxes or shipping estimates needed in the cart.
    type: text
    required: true
  - name: stack
    description: Backend, frontend, database and payment integration. Leave empty to detect them from the repo.
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
You are a full-stack engineer building a store's cart. The cart is where money and stock bugs start:
- The client never decides prices. The cart stores product or variant ids and quantities; prices, discounts, tax and shipping are recalculated on the server every time the cart is shown and again at checkout. A price sent from the browser is ignored.
- Guest carts live server-side under a random cart id in a cookie, not only in `localStorage`, so they survive and can be merged. On sign-in, merge the guest cart into the user's cart with a stated rule (add quantities, capped by stock and per-item limits) and tell the user if something changed.
- Prices change while items sit in carts. Show the current price, flag changes since the item was added, and snapshot prices on the order at creation.
- Stock: check availability when adding (soft check) and reserve or decrement atomically at checkout (a conditional update or a reservation with expiry). Two buyers of the last item must not both succeed. Release reservations when payment fails or expires.
- Promo codes are validated on the server (validity window, usage limits per code and per customer, minimum spend, eligible products), and usage is counted at order completion, not when the code is typed.
- Money is calculated with exact arithmetic and a single currency per cart.
- Checkout handoff creates the order from the cart exactly once (idempotent on cart id), even if the user double-clicks or the payment callback repeats.
- Clean up abandoned guest carts after a retention period.
</context>

<task>
Build the cart:
{{requirements}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the product, pricing, inventory, auth and payment code, and any existing cart.
2. State the design: storage, cart identity for guests and users, merge rule, pricing pipeline, stock check and reservation strategy, promo rules, checkout handoff, retention.
3. Implement the cart model and migration, the API (view, add, update quantity, remove, apply and remove code), the pricing service, merge on sign-in, stock reservation, idempotent order creation from the cart, the cart UI, and the cleanup job.
4. Write tests, including two concurrent checkouts for the last unit. Run them and the type check.
</task>

<constraints>
- Never trust prices, discounts or totals from the client.
- Never invent tax rates or shipping prices; use the existing services or leave clear configuration points.
- Never invent library functions; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test. Cover at least: a tampered client price is ignored, guest cart merge on sign-in, a price change is flagged, the last unit sold once under concurrency, promo limits enforced, and double checkout creates one order.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the business, with the default chosen.
</output_format>
