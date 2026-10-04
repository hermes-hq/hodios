---
schema: 1
id: implement-multiplayer-netcode
kind: prompt
title: Implement multiplayer netcode
description: Chooses a netcode model for a game, such as authoritative server with prediction, rollback or lockstep, and implements tick rate, reconciliation, lag compensation and cheat limits.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build]
role: [game-developer]
stack: []
requires: [none]
inputs: [text, spec]
output: [code, report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [netcode, multiplayer, client-prediction, rollback, lag-compensation, anti-cheat]
pairs_with:
  personas: [game-developer]
  prompts: [implement-realtime-updates, fix-physics-jitter-and-tunneling]
args:
  - name: game_description
    description: Genre, core actions, how precise timing must be (fighting game frames, shooter hit registration, turn-based), whether it is competitive, platform and any existing single-player code.
    type: text
    required: true
  - name: engine
    description: Engine and version, plus any networking library already in use (Netcode for GameObjects, Mirror, Fish-Net, Unreal replication, Godot high-level multiplayer, GGPO-style libraries).
    type: string
    default: engine-agnostic
  - name: players
    description: Players per match and expected region spread, for example "2 players, worldwide" or "16 players per server, EU only".
    type: string
    default: not given - infer from the game description or ask
output_contract:
  format: markdown
  sections: [Model choice, Architecture, Tick and bandwidth budget, Prediction and reconciliation, Lag compensation, Cheat surface, Code, Test plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is adding multiplayer to a game. Engine and networking library: {{engine}}. Players per match and regions: {{players}}. The netcode model must follow the game, not the engine default. Rules of thumb experts use: 1v1 or small-count games needing frame-exact inputs (fighting, platform fighters) suit rollback with deterministic simulation; RTS and large-unit-count games suit deterministic lockstep, sending only inputs; shooters and action games suit an authoritative server with client-side prediction, server reconciliation, entity interpolation for remote players and lag compensation for hits; slow or turn-based games need only reliable messages. Common failures: trusting the client's position or hit claims; non-deterministic simulation (floats across platforms, unordered iteration, physics engines) under lockstep or rollback, causing desyncs; sending full state every tick and blowing bandwidth; and no plan for packet loss, jitter and reconnects. Retrofitting netcode into a single-player codebase usually requires separating simulation from presentation first.
</context>

<task>
<game_description>
{{game_description}}
</game_description>

1. If genre precision, player count or competitive stakes are missing and would change the model, ask. Otherwise state assumptions.
2. Compare the candidate models for this game in a table (latency feel, bandwidth, determinism needs, cheat resistance, implementation cost) and choose one, with the topology (dedicated server, listen server, relay, peer-to-peer).
3. Design the architecture: what is simulated where, the authoritative state, the input message format with sequence numbers, the snapshot or delta format, and the transport (UDP with a reliability layer for critical events; avoid TCP for real-time state).
4. Set the tick and bandwidth budget: simulation tick rate, send rate, interpolation delay (about two snapshot intervals), and bytes per player per second with quantisation and delta compression.
5. Design prediction and reconciliation (or rollback): input buffer, predicted local state, on server correction rewind and replay unacknowledged inputs, smoothing of visible corrections; for rollback, the input delay frames, maximum rollback window and save/load state cost; for lockstep, checksums each N ticks and desync reporting.
6. Design lag compensation: server-side rewind of hitboxes to the shooter's view time with a cap (for example 200-250 ms), and its fairness trade-off for the target.
7. Map the cheat surface: what the client may claim, server validation (speed, cooldowns, line of sight, rate limits), what state is hidden from clients that should not see it, and what is out of scope (client-side anti-cheat products). Scale it to the stakes: for co-op or friends-only games a host-authoritative listen server or relay is usually enough, so limit this to griefing, save or progression tampering and host migration instead of building competitive-grade validation.
8. Write core code for the chosen model on {{engine}} and a test plan using network condition simulation (latency, jitter, 1-5% loss), bots, and two clients on one machine.
</task>

<constraints>
- Never make the client authoritative for outcomes in a competitive game.
- Do not invent engine networking APIs; state versions assumed and mark unknowns.
- State numbers as starting points to measure, not guarantees.
{{> output/uncertainty}}
</constraints>

<output_format>
## Model choice
Comparison table, then the decision in two or three sentences.
## Architecture
Bullets and a text diagram.
## Tick and bandwidth budget
Table: Item | Value | Reasoning.
## Prediction and reconciliation
Numbered steps.
## Lag compensation
Bullets.
## Cheat surface
Table: Client claim | Server check.
## Code
Files with names.
## Test plan
Numbered scenarios with network conditions and pass criteria.
</output_format>
