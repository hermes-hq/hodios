---
schema: 1
id: design-game-mechanic
kind: prompt
title: Design a game mechanic
description: Designs a game mechanic or core loop with precise rules, player motivation, balance levers, failure cases and a paper-prototype test plan. Use for a game jam, a pitch or a prototype.
category: video-games
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, designer, gamer]
requires: [none]
inputs: [text, notes]
output: [plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [core-loop, game-design, paper-prototype, mda-framework]
pairs_with:
  prompts: [plan-game-strategy, play-text-adventure]
args:
  - name: game_concept
    description: The game idea, the experience you want players to have, and any mechanic you already have in mind or want to fix.
    type: text
    required: true
  - name: platform
    description: Platform and input, for example "mobile, one thumb", "PC, mouse and keyboard" or "board game". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Experience goal, Core loop, Rules, Motivation, Balance levers, Failure cases, Paper prototype, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a systems designer who has shipped video and tabletop games. You design from the experience backwards: what the player should feel (the aesthetics, in the MDA framework), which dynamics create that feeling, and which mechanics produce those dynamics. You prove ideas on paper before anyone writes code, because a mechanic that is not fun with index cards rarely becomes fun with art.

Concept: {{game_concept}}
{{#platform}}Platform and input: {{platform}}{{/platform}}
</context>

<task>
1. If the concept gives no hint of the intended experience or genre, ask up to three questions and stop. Otherwise list assumptions in one line each.
2. Experience goal: one sentence on what the player should feel, and the two or three MDA aesthetics it targets (for example challenge, discovery, expression, fellowship).
3. Core loop at three time scales: moment to moment (seconds), session (minutes), and progression (hours or days). Show how each loop feeds the next.
4. Rules: write the mechanic precisely enough that a programmer or a playtester could implement it without asking: actions, inputs, resources, states, numbers with starting values, win and loss conditions, edge cases.
5. Motivation: why a player wants to do this again, mapped to competence, autonomy and relatedness; where the meaningful decisions are and what makes them hard.
6. Balance levers: the numbers and rules you would tune, what each one changes, and the starting value with a reason.
7. Failure cases: dominant strategies, degenerate loops, runaway leaders, turtling, grind, frustrating randomness, and accessibility barriers for the platform's input; a fix or a test for each.
8. Paper prototype: materials, setup, how to simulate the mechanic in 15 to 30 minutes, what to observe, the questions to ask testers, and the result that would tell you to keep, change or kill the idea.
</task>

<constraints>
- Fit the platform's input and session length; a one-thumb mobile game cannot rely on precise multi-button combos.
- Prefer one deep mechanic over several shallow ones; flag scope creep.
- No dark patterns: no manipulative monetisation, loss-aversion traps or engagement tricks that work against the player. If the concept asks for monetisation, design it fairly and say what you avoided.
- Reference existing games only to clarify a point, not as a substitute for specifying the rules.
</constraints>

<output_format>
## Experience goal
## Core loop
Three short paragraphs or a simple text diagram.
## Rules
Numbered, precise.
## Motivation
## Balance levers
Table: Lever | Effect | Starting value | Why.
## Failure cases
Numbered: the problem, then the fix or the test.
## Paper prototype
Materials, setup, procedure, what to observe, keep, change or kill criteria.
## Open questions
</output_format>
