---
schema: 1
id: document-websocket-api
kind: prompt
title: Document a WebSocket or SSE API
description: Documents a WebSocket or Server-Sent Events API with connection and auth, every message type in both directions, event sequences, heartbeats, reconnection and error handling.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, fullstack-engineer, technical-writer]
requires: [repo-read, file-write]
inputs: [repo, file]
output: [docs]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [websockets, server-sent-events, realtime, api-reference]
pairs_with:
  prompts: [document-webhook-events]
args:
  - name: target
    description: The realtime server code (connection handler, message router, auth) or a description of the protocol.
    type: text
    required: true
  - name: client_languages
    description: Languages for the client examples, for example "browser JavaScript and Python".
    type: string
    default: browser JavaScript
output_contract:
  format: markdown
  sections: [Page written, Protocol gaps, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Realtime APIs fail clients in ways REST does not: the connection drops silently behind a proxy, a token expires mid-session, the client reconnects and misses events, two messages arrive out of the expected order. A usable reference therefore covers the lifecycle, not just message shapes: how to connect and authenticate (browsers cannot set headers on a WebSocket, so tokens go in a query string, a cookie, a subprotocol or a first message), what the server sends first, heartbeats and idle timeouts, close codes and what each means, how to resume after reconnect (last event id, sequence numbers, a snapshot), rate limits on client messages, and backpressure. SSE adds its own rules: `Last-Event-ID` on reconnect, the `retry:` field, and the browser's per-domain connection limit over HTTP/1.1.
</context>

<task>
Document the realtime API in:

<target>
{{target}}
</target>

1. Read the server code: the upgrade or SSE endpoint, auth checks, the message router, every message type sent and received, heartbeat and timeout settings, close codes, and any replay or resume logic.
2. Write the reference page with these parts:
   - Connecting: URL, protocol (WebSocket or SSE), subprotocols, authentication method and token expiry behaviour.
   - Lifecycle: a sequence of what happens from connect to first data (handshake, welcome or snapshot message, subscriptions), as a short numbered list or sequence diagram in Mermaid.
   - Messages: a table per direction (client to server, server to client) with type, when it is sent, payload fields and an example JSON.
   - Heartbeats and timeouts: ping or keepalive interval and what the client must do.
   - Errors and close codes: each code or error message, its meaning and whether to reconnect.
   - Reconnection: backoff advice and how to resume without losing or duplicating events.
   - Limits: message size, client message rate, subscriptions per connection.
3. Write a minimal working client in {{client_languages}} that connects, authenticates, handles heartbeats and reconnects with backoff and resume.
4. Test the example against a local server if you can run one, and report the result.
</task>

<constraints>
- Every message type, field, interval and close code must come from the code. Mark unknowns as "to confirm".
- If there is no resume mechanism, say plainly that events during a disconnect are lost; do not imply delivery guarantees the server does not give.
- Never put long-lived secrets in example URLs; show short-lived tokens and note that query strings can end up in logs.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the reference page. Then reply with:
## Page written
Path and what it covers, and whether the client example was run.
## Protocol gaps
Missing protocol pieces that hurt clients (no heartbeat, no resume, undocumented close codes).
## Questions for the owners
Facts you could not confirm from code.
</output_format>
