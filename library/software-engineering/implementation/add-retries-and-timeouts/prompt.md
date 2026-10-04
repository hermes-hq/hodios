---
schema: 1
id: add-retries-and-timeouts
kind: prompt
title: Add retries and timeouts to external calls
description: Adds timeouts, retries with exponential backoff and jitter, idempotency and a circuit breaker to calls to an external service, with tests that simulate failures.
category: implementation
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, sre]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, text, logs]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [resilience, exponential-backoff, circuit-breaker, idempotency, timeouts]
pairs_with:
  personas: [backend-engineer]
  prompts: [integrate-third-party-api, debug-production-only-bug, plan-load-test]
args:
  - name: call_site
    description: The code that calls the external service, or a description of where it lives and what it calls, for example "PaymentsClient.charge in src/billing, calls the payment provider's REST API".
    type: text
    required: true
  - name: stack
    description: Language, framework and HTTP or RPC client in use, for example "Go with net/http" or "Java Spring with WebClient".
    type: string
    required: true
  - name: slo
    description: The caller's latency or error budget, for example "checkout p99 under 800 ms, 99.9% success". Leave empty to propose one.
    type: string
output_contract:
  format: markdown
  sections: [Current behaviour, Policy, Changes, Tests, Rollout and monitoring]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Retry code often makes outages worse: no timeout at all, so threads wait forever on a hung connection; retries on every error, including 400s and validation failures that will never succeed; retrying a payment or order creation without an idempotency key, so the customer is charged twice; fixed delays that make every client retry in lockstep; retries at three layers multiplying into dozens of attempts per user request; total retry time longer than the caller's own deadline; and no circuit breaker, so a dead dependency ties up every worker. Good resilience is a written policy per call: how long to wait, what to retry, how often, how to stay safe to repeat, and when to stop trying for a while.
</context>

<task>
Add timeouts, retries and circuit breaking to this call site:

<call_site>
{{call_site}}
</call_site>

Stack: {{stack}}
{{#slo}}
Caller's budget: {{slo}}
{{/slo}}

1. Read the call site and everything around it: the client and its current settings, every caller and their own deadlines, existing retry logic at other layers (client libraries, service mesh, load balancer, job queue), whether the operation is idempotent, whether the provider supports idempotency keys, and the provider's documented rate limits and error codes. Describe current behaviour before changing it. If you cannot tell whether the operation is safe to repeat, ask and stop.
2. Write the policy as a table:
   - Timeouts: a connect timeout, a per-attempt timeout, and an overall deadline that fits inside the caller's budget and propagates the caller's cancellation. Derive the numbers from the budget, or propose them from observed latency and mark them as proposed.
   - Retry conditions: only transient failures, such as connection errors, timeouts on idempotent calls, HTTP 502, 503 and 504, and 429 honouring `Retry-After`. Never retry 400, 401, 403, 404, 409 or 422, or errors the provider marks permanent.
   - Backoff: exponential with full jitter, a cap on each delay, a maximum number of attempts, and a total retry budget that ends before the overall deadline.
   - Idempotency: reads retry freely; writes retry only with an idempotency key generated once per logical operation and reused on every attempt, or when the operation is naturally idempotent.
   - Circuit breaker: opens on a failure rate over a sliding window with a minimum number of calls, stays open for a cool-down, half-opens with limited trial calls, and has a defined fallback when open (cached value, degraded response, queued for later, or a clear error).
   - Concurrency: a bulkhead limit, if a slow dependency could exhaust shared workers.
3. Implement it with the resilience library or client features the project already uses, or a small well-tested helper if none exists, configured from settings rather than hard-coded. Retry at one layer only, and remove or disable retries at other layers if they would multiply.
4. Add observability: metrics for attempts, retries, timeouts and breaker state changes; a log line per final failure with the attempt count and the last error, without request bodies or secrets; and propagate the trace context.
5. Write tests with a fake server or stubbed transport and a controllable clock and random source: a hung response hits the per-attempt timeout; a transient error followed by success retries and succeeds; 4xx responses are not retried; `Retry-After` is honoured; attempts stop when the budget runs out; the same idempotency key is sent on every attempt; the breaker opens after the threshold, rejects fast while open and closes after successful trial calls; and jittered delays stay within bounds. Run them and report the real result.
</task>

<constraints>
- Never add retries to a non-idempotent write without an idempotency mechanism; if none exists, say so and stop at timeouts and the circuit breaker.
- Total time including retries must fit inside the caller's deadline.
- Do not change the external contract of the call (return types, error types callers depend on) without listing every caller affected.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Current behaviour
Timeouts, retries and failure handling as they are today, and any retries at other layers.
## Policy
Table: setting, value, reason. Proposed values are marked proposed.
## Changes
One line per file.
## Tests
One line per test and the real result of the run.
## Rollout and monitoring
How to roll it out safely, which metrics and alerts to watch, and how to tune the values.
</output_format>
