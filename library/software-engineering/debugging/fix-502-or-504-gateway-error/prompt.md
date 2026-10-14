---
schema: 1
id: fix-502-or-504-gateway-error
kind: prompt
title: Fix a 502 or 504 gateway error
description: Finds why a reverse proxy or load balancer returns 502 Bad Gateway or 504 Gateway Timeout by checking upstream health, ports and bind addresses, timeouts, keep-alive mismatches and crashes.
category: debugging
version: 1.0.0
status: incubating
stage: [operate, ship]
role: [devops-engineer, backend-engineer, sre]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [explanation, config]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [reverse-proxy, load-balancer, nginx, timeouts, keep-alive]
pairs_with:
  prompts: [debug-network-request, investigate-latency-spike]
args:
  - name: symptom
    description: The status (502, 503 or 504), how often (always, intermittent, only on some routes, only on deploy), how long requests take before failing, and the proxy's error log line if you have it.
    type: text
    required: true
  - name: setup
    description: The chain from client to app (CDN, cloud load balancer, Nginx, Ingress, app server such as Gunicorn, Puma, Node, PHP-FPM), the relevant timeout and keep-alive settings, and how the app is started.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Which hop answered, What the code means here, Cause, Fix]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes gateway errors by first finding which hop produced the error page, then reading the meaning of the code at that hop:
- 502 Bad Gateway: the proxy reached for the upstream and got nothing usable. Connection refused (the app is down, listens on another port, or binds `127.0.0.1` inside a container), a crash or OOM kill mid-request, a reset connection, an invalid response, or response headers bigger than the proxy's buffer. Nginx logs say which: "connect() failed (111: Connection refused)", "upstream prematurely closed connection", "upstream sent too big header".
- Intermittent 502 under light load is often a keep-alive mismatch: the app server closes idle connections sooner than the load balancer expects, and the load balancer reuses a connection the app just closed. The app's keep-alive timeout must be longer than the load balancer's idle timeout (a well-known Node.js and Gunicorn issue behind cloud load balancers).
- 502 during deploys: old instances stop before traffic drains, or new ones receive traffic before they are ready (missing or wrong readiness checks).
- 504 Gateway Timeout: the upstream accepted the connection but did not answer within the proxy's timeout. Slow queries, a blocked worker pool (all Gunicorn sync workers busy, PHP-FPM `pm.max_children` reached), a deadlock, or an upstream timeout shorter than the app's own work. Each hop has its own timeout, and the shortest wins.
- 503 usually means no healthy upstream or a rate or connection limit.
Error page branding, the `Server` header and request ids show which hop answered.
</context>

<task>
Find why these gateway errors happen.

Symptom:
{{symptom}}

Setup:
{{setup}}

1. If you can read the repository, open the proxy or ingress config, the app server start command and its worker, timeout and keep-alive settings, and the health check config.
2. Say which hop answered the error, using the error page, headers and timing, or how to find out.
3. Say what the code means at that hop and list the causes that fit the timing (always, intermittent, on deploy, only slow routes).
4. Give the checks that settle it: the proxy's error log line for a failing request, whether the upstream is listening on the expected address and port from the proxy's network, app logs and restarts or OOM kills at the same time, worker saturation, the duration of failing requests against each hop's timeout. Ask for results if needed, then stop.
5. Name the cause and give the fix as config or a diff: correct port or bind address, app keep-alive timeout above the load balancer's idle timeout, enough workers or async workers, timeouts aligned along the chain (outer hops slightly longer than inner), larger proxy header buffers, readiness checks and connection draining on deploy, or moving long work to a background job.
6. Give a check that reproduces the original failure and shows it gone.
</task>

<constraints>
- Do not raise every timeout to minutes as the fix for 504; find the slow work, and move long tasks out of the request if they cannot be made fast.
- Do not restart services in production as the fix without naming the underlying cause.
- Do not invent default timeout values for a product; name the setting to check if unsure.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Which hop answered
The hop and the evidence, or how to tell.
## What the code means here
Candidate causes that fit the timing.
## Cause
The cause, or the checks still needed.
## Fix
Config or diff, and how to confirm.
</output_format>
