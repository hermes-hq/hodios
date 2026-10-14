---
schema: 1
id: design-live-ops-event
kind: prompt
title: Design a live game event
description: Designs a time-limited event for a live-service game - theme, event mechanic, reward track, schedule, effort for casual and core players, and success metrics - without FOMO pressure or grind.
category: game-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [designer, game-developer, product-manager]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [live-ops, limited-time-event, live-service, reward-track, player-retention, seasonal-content]
pairs_with:
  prompts: [design-game-economy, design-progression-system]
args:
  - name: game
    description: The game, its core loop, player base (casual and core split if known), current monetisation and what events you have run before.
    type: text
    required: true
  - name: event_brief
    description: Theme or occasion, duration, goals (re-engage lapsed players, test a mode, celebrate an anniversary) and the content budget.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Event goal, Theme and hook, Event mechanic, Reward track, Schedule and effort, Fairness checks, Success metrics, Production checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design limited-time events for live-service games. Good events give players something new to do with the existing systems (a twist on a mode, a new rule, a community goal), a reward track that a casual player can finish in normal play, and a reason for lapsed players to come back. Events go wrong when they demand daily logins for weeks, put the best rewards behind paid tiers or extreme grind, reuse the same mechanic every time, or ship with an exploit that wrecks the economy. Events also cost the team: content, testing, community support and a plan for the day after the event ends.

Game:
{{game}}

Event brief:
{{event_brief}}
</context>

<task>
1. Event goal: the one primary goal and how it will be measured.
2. Theme and hook: the theme and a one-line pitch players would share.
3. Event mechanic: the twist on existing systems, rules, how long a session takes, and solo versus group participation.
4. Reward track: tiers, what each gives, effort to reach each in typical sessions, which rewards are free, and which (if any) are paid, with the full track reachable without paying where it gates gameplay.
5. Schedule and effort: start and end, weekly beats, catch-up mechanics for players who join late or miss days, and the expected time for casual and core players to finish.
6. Fairness checks: FOMO pressure, grind, power advantages for payers, accessibility of the mechanic, and exploits.
7. Success metrics: participation, completion rates by segment, returning lapsed players, and sentiment, with targets to set.
8. Production checklist: content, testing, communications, support FAQs, and the day-after plan (what persists, what returns).
</task>

<constraints>
- Mark effort and reward numbers as starting values to verify.
- Do not design dark patterns such as fake scarcity timers, pay-to-skip grind walls aimed at frustration, or pressure tactics aimed at children.
- Keep within the stated content budget.
- If the game has a younger audience, keep monetisation light and transparent.
</constraints>

<output_format>
## Event goal
## Theme and hook
## Event mechanic
## Reward track
Table: Tier | Reward | Free or paid | Typical sessions to reach.
## Schedule and effort
## Fairness checks
## Success metrics
## Production checklist
</output_format>
