---
schema: 1
id: implement-realtime-updates
kind: prompt
title: Implement real-time updates
description: Implements real-time updates with WebSockets, server-sent events or polling, choosing the simplest transport that fits, with reconnection, resync, authorisation and scaling notes. Use for live UIs.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build]
role: [fullstack-engineer, backend-engineer, frontend-engineer]
stack: []
requires: [none]
inputs: [spec, text, file]
output: [code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [websockets, server-sent-events, polling, pub-sub, live-updates]
pairs_with:
  prompts: [implement-offline-sync, implement-background-job, build-webhook-handler]
  personas: [backend-engineer, frontend-engineer]
args:
  - name: feature
    description: What must update live and for whom, for example "order status on the customer's tracking page" or "cursor positions in a shared whiteboard", how fast updates must arrive, how many concurrent users, and whether clients also send data.
    type: text
    required: true
  - name: stack
    description: Server and client stack and hosting, for example "Next.js on Vercel, Postgres, Redis available" or "Django on two VMs behind nginx, React SPA".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Transport choice, Event contract, Server, Client, Auth, Scaling and operations, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer who has run live features in production. The transport is the smaller decision; the design questions that decide whether it works are what happens when a client misses messages, who may receive which events, and how events reach the server instance holding the connection.

Transports, simplest first:
- Polling: a timed request, optionally with `ETag` or a `since` parameter. Right when seconds or minutes of delay are fine. Works everywhere, including serverless.
- Server-sent events (SSE): one long-lived HTTP response, server to client only. Built-in browser reconnection and `Last-Event-ID` for resuming. Needs proxies not to buffer responses and periodic comment heartbeats; over HTTP/1.1, browsers limit connections per origin, which HTTP/2 removes.
- WebSockets: bidirectional and low latency. You build reconnection, heartbeats and resume yourself. Right for chat-like or collaborative features where clients send frequent messages.
- A managed real-time service: right when the host cannot keep long-lived connections (many serverless platforms) or the team does not want to run the fan-out.

Rules that hold for every transport: delivery over a live connection is at most once, so on every reconnect the client must resync (fetch changes since its last event id or version, or refetch state); events carry an id and a version so clients can drop duplicates and stale updates; authorisation is checked when a client subscribes to a channel and again when permissions change; with more than one server instance, events need a pub/sub layer (Redis, NATS, a message broker, or Postgres `LISTEN/NOTIFY` for modest volumes) to reach the right connections; load balancers close idle connections (often after about 60 seconds), so heartbeats must be more frequent than the idle timeout.
</context>

<task>
Design and implement real-time updates.

Feature:
{{feature}}

Stack:
{{stack}}

1. If latency needs, scale or whether clients send data are missing and they change the transport, ask up to three questions and stop.
2. Choose the simplest transport that meets the requirements and say why the next simpler one is not enough. Check that the hosting supports it.
3. Define the event contract: event types, payload shape with `id`, `type`, `version` or timestamp from the server, and the channel or topic naming.
4. Implement the server: subscription with authorisation, publishing from the place where the data changes (after the transaction commits), fan-out across instances if there is more than one, heartbeats, and clean-up on disconnect.
5. Implement the client: connect, reconnect with exponential backoff and jitter, resync on reconnect, apply events idempotently, and show connection state (live, reconnecting, offline) in the UI.
6. Describe how to scale and operate it: connection limits per instance, file descriptor and memory per connection, sticky sessions or not, proxy and load balancer settings, and the metrics to watch.
7. Write tests.
</task>

<constraints>
- Never put long-lived credentials in a WebSocket or SSE URL query string; URLs end up in logs. Use cookies with origin checks, or a short-lived single-use ticket.
- Do not publish an event before the database change it describes is committed.
- Prefer the polling or SSE option when it meets the requirements; do not choose WebSockets for a one-way feed by default.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Transport choice
The choice and the reasoning, three to six sentences.
## Event contract
Example events as JSON.
## Server
Code.
## Client
Code.
## Auth
How connections and channel subscriptions are authorised and revoked.
## Scaling and operations
Bullets with concrete settings for this stack.
## Tests
Tests for: delivery to an authorised subscriber, no delivery to an unauthorised one, resync after a dropped connection, and duplicate events being ignored.
</output_format>
