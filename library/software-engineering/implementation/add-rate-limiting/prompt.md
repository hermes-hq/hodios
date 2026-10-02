---
schema: 1
id: add-rate-limiting
kind: prompt
title: Add rate limiting to an API
description: Adds rate limiting to API endpoints with a fitting algorithm, keys, per-tier limits, standard headers, 429 responses and tests. Use when protecting endpoints from abuse or overload.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer, sre]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, spec, text]
output: [code, tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rate-limiting, token-bucket, http-429, abuse-prevention, api-quotas]
pairs_with:
  personas: [backend-engineer]
  prompts: [build-rest-endpoint, harden-web-app-config, plan-load-test]
args:
  - name: endpoints
    description: The endpoints or route groups to protect and why, for example "POST /login (credential stuffing), /api/v1/* (fair use per API key)".
    type: text
    required: true
  - name: traffic_profile
    description: Normal and peak request rates, clients (browsers, partners, mobile), plans or tiers, and whether traffic comes through a CDN or proxy.
    type: text
  - name: stack
    description: Language, framework and deployment (number of instances). Leave empty to detect it from the repo.
    type: string
  - name: storage
    description: Where counters live. In-memory only works for a single instance; use a shared store such as Redis when there are several.
    type: string
    default: in-memory or redis
output_contract:
  format: markdown
  sections: [Policy, Design, Changes, Tests, Rollout]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rate limiting goes wrong in a few repeatable ways: limits keyed by client IP when every request arrives from the load balancer's address, or keyed by a spoofable X-Forwarded-For; in-memory counters on six instances that quietly allow six times the limit; a read-then-write counter in Redis that races under load; fixed windows that allow double the limit at the window boundary; 429 responses with no hint of when to retry, so clients hammer harder; and limits switched on in production without anyone knowing which customers they would block. Good rate limiting picks the key and algorithm per purpose, is atomic, tells clients what is happening and is rolled out in observe-only mode first.
</context>

<task>
Add rate limiting to these endpoints:

<endpoints>
{{endpoints}}
</endpoints>

{{#traffic_profile}}
Traffic profile: {{traffic_profile}}
{{/traffic_profile}}
{{#stack}}
Stack: {{stack}}
{{/stack}}
Counter storage: {{storage}}

1. Read the app's middleware chain, auth, proxy configuration, existing rate limiting (including at a gateway, CDN or WAF) and how many instances run. Do not add a second limiter on top of an existing one without saying why.
2. Define the policy per endpoint group, in a table:
   - **Purpose:** abuse prevention (login, sign-up, password reset, OTP), fair use per customer, or overload protection.
   - **Key:** authenticated user or API key for fair use; account identifier plus IP for login-style endpoints; client IP only when there is no identity, derived from the trusted proxy hop only (configure the framework's trusted-proxy setting rather than reading the header blindly).
   - **Algorithm:** token bucket or GCRA when bursts are acceptable, sliding window (log or counter) when the limit must be smooth; avoid plain fixed windows unless the boundary burst is acceptable, and say so.
   - **Limits:** per tier or plan, with burst size. Propose numbers from the traffic profile with the reasoning, marked as proposed if no profile was given.
3. Implement it with the framework's middleware or a well-maintained library already in use or common for the stack. With a shared store, make the check-and-increment atomic (a single atomic command or a server-side script), set expiry on every key, and decide fail-open or fail-closed when the store is unavailable (usually fail-open for fair use, fail-closed for login abuse), with a log and a metric either way.
4. Respond correctly: HTTP 429 with a `Retry-After` header, a consistent error body in the API's existing error format, and rate-limit headers on responses. Use the `RateLimit-Policy` and `RateLimit` header fields from the IETF HTTPAPI draft if the API has no existing convention, or the widely used `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` if clients already expect those; say which and why.
5. Add allowlisting for health checks and internal callers where needed, and make limits configurable without a deploy.
6. Add observability: a metric of allowed and limited requests by endpoint group and tier, and a log line for limited requests with the key hashed or truncated.
7. Write tests with a fake or controllable clock: requests under the limit pass, the limit plus one returns 429 with Retry-After, the bucket refills over time, different keys do not interfere, tiers get their own limits, the spoofed X-Forwarded-For case does not bypass the limit, and the store-down behaviour matches the chosen policy. Run them and report the real result.
8. Recommend a rollout: log-only (shadow) mode first, review who would have been limited, then enforce.
</task>

<constraints>
- Do not use in-memory counters when there is more than one instance unless the limit is explicitly per instance; say so if it is.
- Never key on a client-supplied header without a trusted-proxy configuration.
- Keep limits and tier names in configuration, not hard-coded in handlers.
- Do not claim a header draft is a final standard; describe it as the IETF draft.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Policy
Table: endpoint group, purpose, key, algorithm, limit and burst per tier, store-down behaviour.
## Design
Where the limiter sits in the request path, the storage and atomicity approach, and the headers, in a few bullets.
## Changes
One line per file.
## Tests
One line per test and the real result of the run.
## Rollout
Numbered steps from shadow mode to enforcement, with what to watch.
</output_format>
