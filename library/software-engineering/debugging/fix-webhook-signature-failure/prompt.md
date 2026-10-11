---
schema: 1
id: fix-webhook-signature-failure
kind: prompt
title: Fix webhook signature failures and missing deliveries
description: Fixes incoming webhooks that fail signature verification or never arrive, checking raw body parsing, secrets per environment, timestamp tolerance, proxies, response codes and timeouts.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, fullstack-engineer]
stack: []
requires: [none]
inputs: [logs, file, config, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [webhooks, hmac, signature-verification, raw-body, integrations]
pairs_with:
  prompts: [build-webhook-handler, debug-network-request]
args:
  - name: symptom
    description: What fails, for example "signature verification failed on every event", "fails only in production", "provider dashboard shows timeouts", "events never reach us", plus the provider (Stripe, GitHub, Shopify, Slack, Twilio or other).
    type: text
    required: true
  - name: handler
    description: The receiving route code including body parsing middleware, the framework, how the secret is loaded, and what sits in front (proxy, API gateway, serverless platform). Redact the secret itself.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where it breaks, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer who has debugged webhooks from many providers. Signature checks compute an HMAC over the exact bytes the provider sent, so anything that changes those bytes breaks them:
- The framework parsed the JSON before verification and the code re-serialises it. Key order, whitespace and unicode escaping change, so the HMAC differs. The handler needs the raw body: `express.raw()` on that route before `express.json()` runs, `request.body` as bytes in FastAPI or Flask (`request.get_data()`), disabling the body parser on that route in Next.js, the raw event body in serverless (and decoding it when the platform base64-encodes it).
- The wrong secret: test versus live mode, a secret per endpoint (Stripe gives each endpoint its own), a rotated secret, the API key used instead of the signing secret, a trailing newline from the environment file.
- The scheme is wrong: providers sign different things (Stripe signs `timestamp.body`, Slack signs `v0:timestamp:body`, GitHub signs the body with a `sha256=` prefix), and some use base64 versus hex digests. A naive string comparison can fail on encoding and leaks timing; a constant-time comparison is required.
- Timestamp tolerance rejects events when the server clock is off or when retried events are replayed later.
For events that never arrive, the provider's delivery log is the first stop: a non-2xx answer, a redirect (http to https, trailing slash) that the provider does not follow, a timeout because the handler does slow work before responding, a firewall or auth middleware blocking the route, or a CSRF check on the POST.
</context>

<task>
Fix this webhook.

Symptom:
{{symptom}}

Handler and infrastructure:
{{handler}}

1. If you can read the repository, open the route, every middleware that runs before it (body parsers, auth, CSRF), and where the signing secret is loaded for each environment.
2. Say where it breaks: never delivered, delivered but rejected by middleware, signature mismatch, timestamp rejected, or processed but answered too slowly. Use the provider's delivery log if the user has it; if not, ask for the response code and body it shows, then stop.
3. Name the cause.
4. Give the fix as a diff: raw body for this route only, the signing secret for the right environment and endpoint, the provider's official verification helper where one exists, constant-time comparison, excluding the route from CSRF and session auth, or answering 2xx quickly and moving work to a background job.
5. Give a check: replay a real event with the provider's CLI or dashboard resend, confirm a tampered body is rejected, and confirm duplicate deliveries are handled idempotently.
</task>

<constraints>
- Never suggest skipping signature verification, even temporarily in production; and never ask for the secret value.
- Do not log full payloads that can hold personal or payment data; log the event id and type.
- Use the provider's documented scheme; if you are not sure of a provider's header names or signed string, say so and point to its verification library.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Where it breaks
The stage and the evidence.
## Cause
The cause, or what to read in the delivery log.
## Fix
Diff with a reason per change.
## Check
Replay, tamper and duplicate tests.
</output_format>
