---
schema: 1
id: secure-websocket-endpoint
kind: prompt
title: Secure a WebSocket or SSE endpoint
description: Secures a WebSocket or server-sent events endpoint with auth at the upgrade, Origin checks, per-message authorization and validation, token expiry handling and connection limits.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [websockets, server-sent-events, cross-site-websocket-hijacking, authorization, realtime]
pairs_with:
  prompts: [implement-realtime-updates, review-realtime-connection-code, review-api-security]
  personas: [security-auditor]
args:
  - name: endpoint
    description: The realtime endpoint and library (ws, Socket.IO, ActionCable, Django Channels, SignalR, Phoenix Channels, SSE), what clients send and receive, and how the HTTP app authenticates users.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Message map, Findings, Changes, Tests, Verification, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
WebSockets are not covered by the browser's same-origin protections the way fetch is: browsers send cookies on a cross-site WebSocket upgrade and do not apply CORS to it, so a cookie-authenticated socket that does not check the `Origin` header can be opened by any website the user visits (cross-site WebSocket hijacking). Authenticating once at connect time is also not enough: the connection outlives the session, so logouts, role changes and token expiry are ignored unless the server re-checks. The other common gap is authorization per message: "subscribe to channel X" or "send to room Y" handlers that trust the room id from the client, which is the realtime version of IDOR. Tokens passed in the query string end up in proxy and access logs. Each open connection holds memory, so missing limits on connections per user, message size and message rate turn into easy denial of service.
</context>

<task>
Secure this endpoint: {{endpoint}}

1. Read the connection setup and every message or event handler. Build a message map: each inbound message type, its fields, and what it lets the client do or read.
2. Upgrade or connect: authenticate before accepting the connection (cookie session plus Origin allowlist, or a short-lived token in a header, subprotocol or first message); reject if neither is valid. If a token is in the URL, move it or make it single-use and short-lived, and keep it out of logs.
3. Check the `Origin` header against an explicit allowlist when cookies are used.
4. Per message: validate the payload against a schema and size limit, and authorize each subscribe, join, publish or read against the current user for that specific channel or resource.
5. Lifetime: re-check authorization on a timer or when the token expires, close connections on logout or role change if the app supports it, and drop server-side subscriptions on close.
6. Limits: maximum connections per user and per IP, message size, messages per second, and idle timeout, using the library's built-in options where they exist.
7. Use `wss://` only; check the reverse proxy forwards the upgrade and does not strip Origin.
8. Write tests: connect from a disallowed origin, connect without auth, subscribe to another user's channel, send an oversized message, and continue after token expiry; each should be rejected. Run the tests.
</task>

<constraints>
- Do not rely on obscure channel names or ids as access control.
- Keep the client protocol compatible where possible; list any client change needed.
- Do not load test against production.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Message map
Table: message type, direction, fields, authorization required, check present (yes or no).
## Findings
Ranked list: severity, file:line, attack, fix.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and actual results.
## Residual risk
What remains, such as proxy settings or client updates.
</output_format>
