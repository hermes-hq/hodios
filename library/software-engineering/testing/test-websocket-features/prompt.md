---
schema: 1
id: test-websocket-features
kind: prompt
title: Test WebSocket and real-time features
description: Tests WebSocket, Server-Sent Events or socket-based real-time features for connection auth, message delivery and ordering, reconnection, backpressure and multi-client behaviour.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [fullstack-engineer, backend-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [websockets, server-sent-events, real-time, reconnection, multi-client]
pairs_with:
  prompts: [implement-realtime-updates, write-e2e-test, fix-flaky-test]
  personas: [test-engineer]
args:
  - name: feature
    description: The real-time feature to test (chat, live notifications, collaborative editing, live dashboard), with paths to the server handler and client code and the library used (ws, Socket.IO, Phoenix Channels, ActionCable, SignalR, Django Channels).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Behaviours, Harness, Tests, Check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a test engineer who has debugged real-time features that worked in a demo and failed under real networks. The usual bugs: the socket handshake skips the authorisation check that HTTP routes have, a user subscribes to another user's channel by guessing its name, messages sent during a reconnect are lost or duplicated, two clients see events in different orders, the server keeps sending to a dead connection, and a slow consumer grows memory without bound.

Real-time tests are prone to flakiness because they are asynchronous. Stable tests use the library's test helpers where they exist (Phoenix `ChannelCase`, Action Cable `ActionCable::Channel::TestCase`, Django Channels `WebsocketCommunicator`, SignalR with `WebApplicationFactory`), or start the server on a random port and connect real clients in the test. They wait for specific messages with a timeout instead of sleeping, give each test its own channel or room, and close every connection in teardown. Browser-level tests (Playwright can observe WebSocket frames) are for one or two end-to-end paths, not for every case.
</context>

<task>
Write tests for this real-time feature:

{{feature}}

1. Read the server handler, the client code and the auth path. List the behaviours: connect and authenticate, subscribe and authorise per channel, send and receive, broadcast to the right recipients only, ordering guarantees the feature promises, reconnection and missed-message recovery, heartbeats and idle timeouts, and limits such as message size and rate.
2. Build a harness: start the server in-process or on a random port, a helper to open authenticated clients as given users, and a helper to wait for the next message matching a predicate with a timeout. Close all clients in teardown.
3. Write server-level tests: unauthenticated and expired-token connections are rejected; a user cannot join another user's or tenant's channel; a message reaches every intended client and no one else; ordering holds for messages from one sender; oversized or malformed messages are rejected without crashing the connection; and a reconnecting client gets the messages it missed if the feature promises that, or a clear resync signal if not.
4. Add one end-to-end browser test with two browser contexts showing a change made by one user appearing for the other.
5. Run the tests several times in a row to check for flakiness and report results.
</task>

<constraints>
- No fixed sleeps; wait for specific messages or states with timeouts.
- Each test uses its own room or channel and cleans up its connections.
- Do not weaken authorisation checks or timeouts in production code to make tests easier.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Behaviours
Table: behaviour, expected result, test name.
## Harness
Server start-up, client helper and wait helper.
## Tests
Server-level tests, then the end-to-end test.
## Check
Commands run, repeated runs and results.
## Gaps
What is not covered, such as behaviour behind real proxies or at scale.
</output_format>
