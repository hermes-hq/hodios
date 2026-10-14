---
schema: 1
id: design-chat-system
kind: prompt
title: Design a chat system
description: Designs a chat or messaging feature with connection handling, message ordering, delivery and read receipts, history storage, presence and push fallback.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, fullstack-engineer, architect, mobile-engineer]
requires: [none]
inputs: [spec, text]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [instant-messaging, websockets, message-ordering, presence, read-receipts, realtime]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [implement-realtime-updates, estimate-system-capacity]
args:
  - name: product
    description: Kind of chat (one-to-one, group, support, in-game, team channels), platforms, group sizes and features needed (attachments, edits, reactions, threads, search).
    type: text
    required: true
  - name: scale
    description: Concurrent connected users, messages per day, maximum group size and retention.
    type: text
  - name: constraints
    description: Existing stack, hosted services allowed or not, compliance needs such as retention or encryption.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Architecture, Message flow, Ordering and delivery guarantees, Storage, "Presence, receipts and push", Risks and open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Chat looks simple and is mostly edge cases. Clients disconnect constantly (mobile networks, backgrounded apps), so delivery cannot rely on the socket: every message is persisted first, gets a server-assigned per-conversation sequence number, and clients sync from their last seen sequence on reconnect. Clients attach their own message id so retries do not create duplicates. Global ordering is neither possible nor needed; per-conversation ordering is. Connection servers are stateful, so the system needs a way to route a message to the server holding each recipient's connection (a pub/sub layer or a connection registry). Offline recipients get a push notification, which carries a minimal payload for privacy. Presence and typing indicators are high-volume, low-value signals that should be ephemeral and throttled. Read receipts in large groups multiply writes and are usually limited to small groups. History storage is append-heavy and read by conversation and time range. End-to-end encryption changes almost every other choice (server search, moderation, multi-device) and must be decided first. Many teams should use a hosted chat service; build only when chat is core or requirements rule hosted options out.
</context>

<task>
<product>
{{product}}
</product>
{{#scale}}
Scale: {{scale}}
{{/scale}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Decide build or hosted service first, from how central chat is, the requirements and constraints. If hosted fits, say what to evaluate and keep the rest of the design to the integration points.
2. Ask or state whether end-to-end encryption, moderation and server-side search are required, since they conflict.
3. Describe connections: transport (WebSockets with a fallback), authentication on connect, heartbeat, and how a message reaches the server holding the recipient's connection.
4. Describe the send flow: client message id, persist with a per-conversation sequence number, acknowledge to the sender, fan out to online members, push to offline members, and sync from last seen sequence on reconnect.
5. Define storage for conversations, membership, messages, per-user read position and attachments (object storage with signed URLs), with key design for reading recent history by conversation.
6. Define presence, typing and receipts with their throttling and the group size above which receipts are limited.
7. List risks: large groups, multi-device consistency, edits and deletes, abuse and moderation, retention and legal hold.
</task>

<constraints>
- Never rely on the open socket as the delivery guarantee; persistence and resync come first.
- Do not promise global ordering or exactly-once delivery; state the actual guarantee (per-conversation order, at-least-once with client dedupe).
- Do not invent hosted service features or prices; list what to verify.
- Keep the design proportional to the stated scale.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Build or use a hosted service, and the core shape, in at most five lines.
## Architecture
A Mermaid diagram of clients, gateway, message service, storage, fan-out and push, then one line per component.
## Message flow
Numbered steps for send, persist, fan out, deliver, acknowledge, including offline recipients.
## Ordering and delivery guarantees
Sequence numbers, client message ids, retries and dedupe.
## Storage
Table: data, store, key design, retention.
## Presence, receipts and push
How each works and its cost at the stated scale.
## Risks and open questions
Bullets.
</output_format>
