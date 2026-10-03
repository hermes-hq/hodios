---
schema: 1
id: design-game-economy
kind: prompt
title: Design a game economy
description: Designs a game economy with currencies, sources and sinks, progression pacing in numbers, monetization guardrails, exploit checks and telemetry to tune it. Use when designing or rebalancing a game.
category: video-games
version: 1.0.0
status: incubating
stage: [design]
role: [designer, software-engineer]
requires: [none]
inputs: [spec, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [game-economy, sources-and-sinks, progression-pacing, monetization, balancing, live-ops]
pairs_with:
  prompts: [design-game-mechanic, write-game-design-document]
  personas: [game-design-mentor]
args:
  - name: game
    description: "The game: genre, core loop, session length, single or multiplayer, whether players can trade, the current resources and progression systems, and any problem you are trying to fix (inflation, grind, stalled players)."
    type: text
    required: true
  - name: monetization
    description: Business model, for example "premium, no microtransactions", "free-to-play with cosmetics and a battle pass", or "ads plus a premium currency". Optional; if missing, design for a premium game.
    type: text
output_contract:
  format: markdown
  sections: [Economy goals, Currencies and resources, Sources and sinks, Progression pacing, Monetization, Exploit and risk checks, Telemetry, Tuning knobs, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior systems and economy designer. A game economy is a set of flows: sources (faucets) create resources, sinks remove them, and converters turn one resource into another. It works when every resource has a purpose, net accumulation matches the pacing the designers want, and no strategy lets players bypass the intended loop. It fails through inflation (faucets outpace sinks, prices lose meaning), deflation and grind (sinks outpace faucets), dominant strategies, and exploits such as duplication, arbitrage or bot farming. In free-to-play games it also fails players when it relies on manipulation.

Game: {{game}}
{{#monetization}}Monetization: {{monetization}}{{/monetization}}
If no monetization is given, design for a premium game with no in-game purchases.
</context>

<task>
1. If the core loop or the progression structure is missing, ask for it and stop: an economy cannot be paced without knowing what players do each session. Otherwise state assumptions (session length, sessions per week, expected lifetime) in one line.
2. Write three to five economy goals in measurable terms, for example "a dedicated player reaches the endgame in 40 hours" or "the average player can afford one meaningful upgrade per session".
3. Define each currency and resource: purpose, how it is earned, what it is spent on, whether it is tradable, any cap, and why it exists separately. Merge or cut any resource without a distinct purpose.
4. Map sources, sinks and converters, with rates per hour of play at early, mid and late stages, and the resulting net flow. Include at least one ongoing sink that scales with player wealth (upkeep, repair, consumables, fees, cosmetic or prestige sinks) so late-game currency keeps meaning.
5. Pace progression with numbers: a cost curve for upgrades or levels (state the formula, such as linear, polynomial or exponential, and why), time-to-next milestone at each stage, and where the curve flattens or spikes. Show a small table of milestones with cumulative hours.
6. If monetized, design what is sold and how it relates to earned resources, keeping the guardrails in the constraints. Show the free-player path to the same progression and how much slower it is.
7. Run exploit and risk checks: duplication and rollback bugs, arbitrage between vendors or currencies, AFK and bot farming, trading and real-money trading, alt accounts, reward stacking, and players who hoard. For each, state the mitigation.
8. List the telemetry to collect and the warning signs (median and top-percentile currency balances, sink participation rate, time-to-milestone, conversion and churn points), plus the knobs to turn when each sign appears.
</task>

<constraints>
- Show your arithmetic for flows and pacing; label estimates that need playtest data.
- Monetization guardrails: no pay-to-win in competitive modes unless the user explicitly chose it and the trade-off is stated; disclose odds for any randomised purchase; price premium currency in clear bundles without leftover-currency traps; avoid dark patterns aimed at children; note that loot boxes and randomised paid items are restricted or regulated in some countries and on some platforms, and recommend legal review before launch.
- Keep the design implementable: name each system as a rule a programmer could build.
- Do not invent facts about the user's game; ask about anything the design depends on.
</constraints>

<output_format>
## Economy goals
## Currencies and resources
Table: Resource | Purpose | Earned by | Spent on | Tradable | Cap.
## Sources and sinks
Table: Flow | Type (source, sink, converter) | Rate early / mid / late | Notes. Then a text flow diagram, for example `Quests -> Gold -> Repairs (sink)`.
## Progression pacing
Formula, then table: Milestone | Cost | Hours to reach | Cumulative hours.
## Monetization
## Exploit and risk checks
Table: Risk | How it happens | Mitigation.
## Telemetry
## Tuning knobs
## Open questions
</output_format>
