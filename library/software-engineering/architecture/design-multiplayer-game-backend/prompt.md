---
schema: 1
id: design-multiplayer-game-backend
kind: prompt
title: Design a multiplayer game backend
description: Designs a multiplayer game backend with accounts, matchmaking, dedicated or relayed session servers, authoritative state, persistence, region placement and live operations.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, backend-engineer, architect]
requires: [none]
inputs: [text, spec]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [multiplayer, matchmaking, game-servers, player-progression, live-ops, region-placement]
pairs_with:
  personas: [software-architect, game-developer]
  prompts: [implement-multiplayer-netcode, estimate-system-capacity]
args:
  - name: game
    description: Genre, players per match, session length, platforms, real-time or turn-based, and features such as ranked play, parties, inventory, chat or trading.
    type: text
    required: true
  - name: scale
    description: Expected concurrent players at launch and peak, and the regions players are in.
    type: text
  - name: constraints
    description: Engine, team size, budget, whether managed game backend services or hosting are acceptable.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Services, Session hosting, Matchmaking, Persistence and economy, Cheating and abuse, Capacity and cost]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A multiplayer game backend is several systems: identity and accounts, matchmaking, session hosting, persistent player data, and live operations (events, configuration, analytics, moderation). Real-time competitive games need an authoritative server per match so clients cannot decide outcomes; turn-based or casual co-op games can often use relays or simpler request-response backends. Session servers are stateful and short-lived, so they are allocated from a fleet per region, sized by players per server and peak concurrency, and drained rather than killed. Matchmaking always trades queue time against match quality (skill, latency, party size); strict rules at low population produce empty queues, so rules relax over time in the queue. Player inventory and currency need transactional, idempotent writes and a server-side ledger, because duplication exploits destroy game economies. Launch days create load spikes of many times the steady state, especially on login and matchmaking. Managed game backend services and server hosting platforms save a lot of work for small teams; building everything is justified only at scale or with unusual needs. Netcode inside the match is a separate design.
</context>

<task>
<game>
{{game}}
</game>
{{#scale}}
Scale: {{scale}}
{{/scale}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Classify the game's needs: real-time or turn-based, competitive or casual, players per match, session length, and which state must be authoritative on the server.
2. Decide build or buy per service (identity, matchmaking, server hosting, player data, live-ops) from team size and scale, naming the capability to look for rather than inventing vendor features.
3. Design session hosting: dedicated, relay or peer, server allocation from a regional fleet, scaling on queue depth and peak, draining for updates, and region selection from latency.
4. Design matchmaking: tickets, skill rating, latency constraints, parties, rule relaxation over queue time, backfill, and what happens at low population.
5. Design persistence: player profile, progression, inventory and currency with server-side transactions, idempotency on grants and purchases, and an audit ledger.
6. List what the server must own to limit cheating (match results, currency, inventory, rate limits) and abuse handling (reports, bans).
7. Estimate peak session servers from the given numbers, name the launch-day bottlenecks (login, matchmaking, database), and the load tests to run.
</task>

<constraints>
- Never let the client be authoritative for match results, currency or inventory in competitive or monetised games.
- Do not invent vendor features, prices or limits; describe the capability and say what to verify.
- Keep the design proportional; a small co-op game does not need a global fleet.
- In-match netcode is out of scope; refer to it instead of designing it here.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The overall shape and build or buy choices, in at most five lines.
## Services
A Mermaid diagram of client, identity, matchmaking, session servers, persistence and live-ops services, then one line each.
## Session hosting
Dedicated servers, relays or peer hosting, fleet allocation and region placement.
## Matchmaking
Rules, skill rating, latency buckets, party handling and queue time trade-offs.
## Persistence and economy
Player data, inventory and currency transactions, consistency rules.
## Cheating and abuse
What the server must own and validate.
## Capacity and cost
Estimate of servers at peak from the stated numbers, and what to load test.
</output_format>
