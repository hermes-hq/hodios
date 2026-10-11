---
schema: 1
id: fix-websocket-connection-drops
kind: prompt
title: Fix WebSocket connections that drop or fail
description: Fixes WebSocket connections that fail to upgrade or drop after a while, checking proxy upgrade headers, idle timeouts, heartbeats, load balancer stickiness, TLS and reconnect logic.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, fullstack-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [logs, config, file, text]
output: [explanation, config]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [websockets, reverse-proxy, idle-timeout, heartbeats, realtime]
pairs_with:
  prompts: [implement-realtime-updates, fix-502-or-504-gateway-error]
args:
  - name: symptom
    description: What happens and when, for example "handshake fails with 400 or 404", "drops after exactly 60 seconds idle", "drops on every deploy", "works locally, fails in production", with close codes and browser console errors if you have them.
    type: text
    required: true
  - name: setup
    description: The client and server libraries (native WebSocket, Socket.IO, ws, SignalR, Django Channels or other), what sits between them (Nginx, a cloud load balancer, Cloudflare, Kubernetes Ingress), how many server instances, and the relevant proxy config.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the symptom points to, Checks to run, Cause, Fix]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a realtime systems engineer. WebSocket failures nearly always come from what sits between client and server, and the timing of the failure points to the layer:
- Fails at handshake: the proxy does not forward `Upgrade` and `Connection` headers (Nginx needs `proxy_http_version 1.1` and both headers set explicitly), a path mismatch, an origin check rejecting the client, `ws://` from an `https` page (blocked as mixed content), or auth middleware rejecting the upgrade request.
- Drops after a fixed idle time (often 60 seconds, sometimes 100 or 350): a proxy or load balancer idle timeout (`proxy_read_timeout` in Nginx, the cloud load balancer's idle timeout, Cloudflare's limit). Fix with application pings at a shorter interval than the smallest timeout, or raise the timeout where you control it.
- Socket.IO or SignalR with several instances: long polling falls back or fails without sticky sessions, and broadcasts reach only clients on one instance without a shared adapter or backplane (Redis).
- Drops on deploy or scale-down: connections live on the old instance; the server needs graceful draining and the client needs reconnect with backoff and jitter so thousands of clients do not reconnect at the same second.
- Drops on mobile or after sleep: the network changed; only heartbeats and reconnect logic help.
- Close codes help: 1006 means abnormal closure with no close frame (often a proxy or network cut), 1001 going away, 1008 policy violation, 1009 message too big.
</context>

<task>
Fix these WebSocket drops or failures.

Symptom:
{{symptom}}

Setup:
{{setup}}

1. If you can read the repository, open the server socket setup, the client connection and reconnect code, and the proxy or ingress config before answering.
2. Say what the timing and close code point to: handshake, idle timeout, instance affinity, deploys, or client network.
3. Give checks that isolate the layer: the handshake response status and headers in the browser network tab, connecting straight to the server bypassing the proxy, measuring the exact time to drop while idle versus with traffic, server logs for the close reason. Ask for results if the layer is not clear, then stop.
4. Name the cause.
5. Give the fix as config or a diff: proxy upgrade headers and timeouts, ping or heartbeat at an interval below the smallest idle timeout, sticky sessions or a shared adapter for multiple instances, graceful shutdown that closes sockets with a close code, and client reconnect with exponential backoff, jitter and state resync.
6. Give a check: an idle connection kept past the old drop time, and a deploy with clients reconnecting cleanly.
</task>

<constraints>
- Do not suggest replacing WebSockets with polling or another product as the fix unless the infrastructure truly cannot carry WebSockets; say why if so.
- Do not set proxy timeouts to unlimited; prefer heartbeats plus a bounded timeout.
- Do not invent timeout defaults for a product; say which setting to check if unsure of its default.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What the symptom points to
Layer suspected and why.
## Checks to run
How to isolate it.
## Cause
The cause, or "Waiting for check results".
## Fix
Config or diff, server and client.
</output_format>
