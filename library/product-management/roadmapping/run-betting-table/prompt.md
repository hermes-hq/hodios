---
schema: 1
id: run-betting-table
kind: prompt
title: Run a betting table
description: Prepares and runs a Shape Up style betting table for the next cycle - checks each pitch is ready, sizes appetite against team slots, frames the bets and records what was not bet on and why.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, engineering-manager, designer]
requires: [none]
inputs: [document, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [shape-up, betting, appetite, cycle-planning, cool-down, fixed-time-variable-scope]
pairs_with:
  prompts: [write-shaped-pitch, plan-release, run-quarterly-planning]
args:
  - name: pitches
    description: The pitches up for the next cycle (problem, appetite, solution sketch, rabbit holes, no-gos), or links summarised as text.
    type: text
    required: true
  - name: cycle_and_teams
    description: Cycle length, cool-down length, how many teams or slots are available (for example two big-batch teams, one small-batch team) and anything already in flight.
    type: text
    required: true
  - name: context
    description: Optional. Current goals, urgent issues, and what was bet on last cycle and how it went.
    type: text
output_contract:
  format: markdown
  sections: [Pitch readiness, Slots and appetite, Proposed bets, Not bet on, Decisions to confirm at the table]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare a betting table: the short meeting where a few senior people decide which shaped pitches get a team for the next fixed-length cycle. It differs from backlog prioritisation in ways teams often forget. Appetite is a budget set before the work, not an estimate, so a pitch that only fits if everything goes well is a bad bet. Only shaped pitches are eligible: raw ideas and unbounded requests go back to shaping. Nothing carries over automatically; work that did not finish has to be re-pitched, with the circuit breaker treated as information. Pitches not bet on are not queued; they are dropped and can come back. And the cool-down after a cycle is protected time, not a buffer for overruns.

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
<pitches>
{{pitches}}
</pitches>

<cycle_and_teams>
{{cycle_and_teams}}
</cycle_and_teams>

1. Pitch readiness: for each pitch, check problem, appetite, solution at the right level of abstraction, rabbit holes addressed and no-gos. Mark ready, needs shaping (with what is missing) or not a pitch.
2. Slots and appetite: list the available slots and their size, and the ready pitches' appetites. Show which combinations fit without exceeding any slot.
3. Proposed bets: two or three alternative slates, each filling the slots, with why it serves the current goals and the main risk of each bet. Flag bets where the appetite looks too small for the problem as written.
4. Not bet on: each remaining pitch with a one-line reason (not shaped, lower value now, too big for appetite) and what would bring it back.
5. Decisions to confirm at the table: the choice between slates, any pitch to send back to shaping, any work from last cycle that would need re-pitching, and confirmation the cool-down is kept.
</task>

<constraints>
- Do not stretch an appetite to make a pitch fit; suggest narrowing scope or a smaller version instead.
- Do not place unfinished work from last cycle into the slate automatically; treat it as a new pitch.
- The table decides; present slates with trade-offs and do not declare the final bets.
- Use only the pitches given; if they are not shaped at all, say so and suggest shaping before betting.
</constraints>

<output_format>
## Pitch readiness
Table: pitch | appetite | problem clear | rabbit holes | no-gos | status | missing.

## Slots and appetite
Slots available, then the fitting combinations.

## Proposed bets
Slate A, B (and C): pitches per slot, why, main risk.

## Not bet on
Table: pitch | reason | what would bring it back.

## Decisions to confirm at the table
Numbered list.
</output_format>
