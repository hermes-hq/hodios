---
schema: 1
id: review-realtime-connection-code
kind: prompt
title: Review WebSocket or SSE connection code
description: Reviews WebSocket or server-sent events code on client and server for reconnect storms, missed updates after reconnect, auth expiry, ordering and unbounded fan-out.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [fullstack-engineer, backend-engineer, frontend-engineer]
requires: [none]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [websockets, server-sent-events, reconnection, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [implement-realtime-updates, review-message-consumer-change]
args:
  - name: diff
    description: Client and server connection code, message handlers and subscription logic, with file paths.
    type: text
    required: true
  - name: context
    description: Transport (WebSocket, SSE, a library such as Socket.IO), how servers are load balanced and scaled, auth method, expected concurrent connections and message rates.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Connection lifecycle, Findings, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Realtime code works in a demo and fails on a train, behind a corporate proxy and during a deploy. Connections drop all the time, so what matters is what happens next. A client that reconnects immediately in a loop takes the server down after a deploy, when every client reconnects at once; it needs exponential backoff with jitter. A reconnected client has missed every message sent while it was away, so it must resync, either by fetching current state or resuming from a last event id (SSE has `Last-Event-ID` built in; WebSockets need it designed). Auth checked only at the handshake keeps working after the token expires or the user is removed, so long-lived connections need re-validation. Messages from different server instances are not ordered unless the design orders them. Idle connections are killed silently by load balancers and proxies after 30 to 120 seconds without traffic, so heartbeats are needed on both sides. Servers need per-connection send buffers with limits, or one slow client grows memory without bound, and broadcast fan-out must go through a shared bus when there is more than one instance. Browser clients leak listeners and sockets when components unmount without closing them.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Map the connection lifecycle on both sides: open, authenticate, subscribe, receive, heartbeat, drop, reconnect, resync, close. Mark which steps exist in the code and which are missing.
2. Client checks: reconnect backoff with jitter and a cap, resync after reconnect (fetch state or resume from last id), duplicate handling when resync and live messages overlap, cleanup on unmount or navigation, behaviour when the tab is backgrounded or the network changes.
3. Server checks: authentication at the handshake and on expiry or revocation, authorisation per subscription or channel (can a client subscribe to another tenant's channel by name), origin checks for WebSockets, per-connection buffer limits and slow-consumer handling, connection limits per user.
4. Scale checks: fan-out across instances (a pub/sub bus or sticky sessions and what happens when an instance dies), memory per connection, behaviour during a rolling deploy.
5. Message checks: ordering assumptions, schema versioning between old clients and new servers, large payloads, messages handled before the initial state has loaded.
6. Network checks: heartbeats or pings versus load balancer and proxy idle timeouts, SSE buffering by proxies or compression.
7. For each finding, give the scenario (network drop, deploy, token expiry, slow client) and the smallest fix.
</task>

<constraints>
- Every finding states a scenario and what the user or server experiences.
- Treat cross-tenant subscription and auth that never expires as critical.
- Do not assume load balancer timeouts or scaling setup; read config or ask.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Connection lifecycle
Table: step, client (present/missing), server (present/missing).
## Findings
Numbered: severity, `path:line`, scenario, effect, fix.
## Tests to add
Bullets: drop-and-reconnect, resync, token expiry and slow-client tests.
</output_format>
