---
schema: 1
id: test-payment-integration
kind: prompt
title: Test a payment integration
description: Tests a payment integration with the provider's test mode, test cards, signed simulated webhooks and subscription time travel, covering declines, 3-D Secure, refunds and duplicate events.
category: testing
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [backend-engineer, fullstack-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [payments, webhooks, test-mode, subscriptions, refunds]
pairs_with:
  prompts: [integrate-payments, build-webhook-handler, build-fake-for-external-api]
  personas: [test-engineer]
args:
  - name: integration
    description: The payment code to test (checkout, subscriptions, webhooks, refunds) as paths or pasted code, and the provider, for example Stripe, Adyen, PayPal, Mollie or Braintree.
    type: text
    required: true
  - name: flows
    description: The flows that matter most, for example "one-off checkout and monthly subscription with free trial".
    type: string
output_contract:
  format: markdown
  sections: [Flows and outcomes, Test levels, Tests, Manual checks in test mode, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a test engineer who has tested payment flows that move real money. Payment bugs are expensive and the happy path is the least interesting part. What breaks: the order is marked paid on the client redirect instead of on the verified webhook, a duplicate or out-of-order webhook ships an order twice or downgrades an active subscription, a signature check is skipped in tests and then broken in production, amounts are handled as floats instead of integer minor units, a currency with zero decimals (JPY) or three decimals is wrong, a 3-D Secure challenge or an asynchronous payment method (bank debit, vouchers) leaves the order stuck in pending, a partial refund is recorded as full, and renewals fail silently.

Every serious provider has a test mode with documented test card numbers for success, declines, insufficient funds and authentication challenges; a CLI or dashboard tool to send signed test webhooks; and for subscriptions a way to advance time (for example Stripe test clocks). Look up the provider's current test values in its documentation rather than recalling them. Three levels work together: unit tests for amount, currency and state transition logic; webhook handler tests that build signed payloads with the provider's library and a test secret; and a small number of end-to-end runs against the provider's test mode.
</context>

<task>
Write tests for this payment integration{{#flows}}, focusing on {{flows}}{{/flows}}:

{{integration}}

1. Read the code and map each flow to its states and outcomes: created, requires action, succeeded, failed, refunded or partially refunded, disputed, and for subscriptions trialing, active, past due, cancelled. Note which events change state and where the code trusts the client.
2. Unit tests: amount conversion to minor units, zero-decimal and three-decimal currencies, rounding of discounts and tax, and state transitions including invalid ones.
3. Webhook tests: build signed payloads with the provider's SDK and a test signing secret; cover a valid event, an invalid signature (rejected, nothing changes), the same event delivered twice (one side effect), events out of order, and an unknown event type (acknowledged and ignored).
4. Test-mode tests or scripted manual checks: successful card, declined card, insufficient funds, authentication challenge passed and failed, an asynchronous method, a refund and partial refund, and for subscriptions a trial ending, a successful renewal and a failed renewal using the provider's time-travel feature. Mark which ones run in CI and which are manual.
5. Run what can run locally and report results, then give a short pre-launch checklist of payment behaviours still to verify.
</task>

<constraints>
- Use only test-mode keys from environment variables or a secrets store; never hard-code keys and never run tests with live keys.
- Do not invent test card numbers, event names or API fields; take them from the provider's documentation or SDK and say which version you assumed.
- Never disable signature verification to make a test pass.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Flows and outcomes
Table: flow, outcome, triggering event, expected system state.
## Test levels
What is covered by unit, webhook and test-mode tests.
## Tests
The test code.
## Manual checks in test mode
Numbered steps with the test values to use and the expected result.
## Check
Commands run, results, and the pre-launch checklist.
</output_format>
