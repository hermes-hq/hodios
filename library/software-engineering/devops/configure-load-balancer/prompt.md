---
schema: 1
id: configure-load-balancer
kind: prompt
title: Configure a cloud load balancer
description: Configures a cloud load balancer with listeners, TLS policy, health checks, connection draining, idle timeouts, header forwarding and session affinity choices that match the app behind it.
category: devops
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, sre, backend-engineer]
stack: [aws, gcp, azure]
requires: [repo-read, file-write]
inputs: [config, text]
output: [config, table]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [load-balancing, health-checks, connection-draining, idle-timeout, tls-termination]
pairs_with:
  prompts: [implement-health-checks, fix-502-or-504-gateway-error, write-reverse-proxy-config]
args:
  - name: setup
    description: The cloud and load balancer type if known, what sits behind it (services, ports, protocols such as HTTP, gRPC or websockets), request durations, and current problems.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Settings, Config, App changes, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Load balancer defaults cause a predictable set of production errors. If the backend's keep-alive timeout is shorter than the balancer's idle timeout, the backend closes connections the balancer still reuses and users see intermittent 502s. Health checks that hit a deep dependency check take every instance out at once when the database blips; checks that are too lenient keep broken instances in rotation. Without connection draining (deregistration delay) longer than the longest normal request, deploys cut requests mid-flight. Long uploads, server-sent events and websockets need idle timeouts above their quiet periods. The app needs to trust `X-Forwarded-For` and `X-Forwarded-Proto` only from the balancer to see real client IPs and the original scheme. Sticky sessions hide state problems and unbalance load; they are a last resort.
</context>

<task>
Configure the load balancer for:
<setup>
{{setup}}
</setup>

1. Read the infrastructure code and the app: current balancer configuration, server keep-alive and request timeouts, health endpoints, websocket or streaming routes, and how the app reads client IP and scheme.
2. Choose the balancer type (layer 7 application or layer 4 network) from the protocols and needs, and say why.
3. Listeners: HTTPS with a modern TLS policy, HTTP redirecting to HTTPS, certificates from the cloud's certificate service, HTTP/2 or gRPC where needed.
4. Health checks: a shallow readiness path, interval, timeout, healthy and unhealthy thresholds, and the expected status codes. Explain how long a failing instance keeps receiving traffic with these values.
5. Timeouts: idle timeout above the longest quiet period of streaming connections; set the backend keep-alive timeout longer than the balancer's idle timeout and change the app or proxy config to match.
6. Draining: deregistration delay above the longest normal request, paired with graceful shutdown in the app.
7. Forwarded headers: configure the app or its proxy to trust them only from the balancer's address range; preserve the host header.
8. Affinity: off unless the app needs it; if on, explain the cost and a plan to remove the need.
9. Write the changes in the existing infrastructure code and validate it (for example `terraform validate`) if available.
</task>

<constraints>
- Do not make health checks depend on downstream services.
- Do not invent setting names; use the cloud's documented names and say when unsure.
- Do not disable TLS verification between balancer and backend if it is currently enabled.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Settings
A table: setting, value, reason.

## Config
Infrastructure changes as diffs or full files.

## App changes
Keep-alive, forwarded-header trust and graceful shutdown changes in the app or its proxy.

## Verify
Validation results and the tests to run after applying (failover of one instance, deploy under load, long-lived connection).

## Follow-ups
Monitoring for 5xx at the balancer, target health alarms and anything left unclear. "None" if empty.
</output_format>
