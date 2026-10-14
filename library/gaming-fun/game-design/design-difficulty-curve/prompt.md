---
schema: 1
id: design-difficulty-curve
kind: prompt
title: Design a difficulty curve
description: Designs a game's difficulty curve across levels or sessions - challenge ramps, rest beats, failure cost, difficulty options and assist settings - and how to measure where players quit.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, designer]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [difficulty, pacing, flow, assist-modes]
pairs_with:
  prompts: [design-game-level, design-game-onboarding, design-boss-fight]
args:
  - name: game
    description: The game, its genre, its structure (levels, waves, runs, chapters, open world) and who it is for.
    type: text
    required: true
  - name: symptoms
    description: What players do now, if you know - where they quit, die repeatedly, or get bored. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Target experience, Curve, Failure and retry, Difficulty options, Measure it, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design difficulty curves. A good curve is a saw-tooth, not a straight ramp: tension rises, peaks at a test, then drops for a rest beat where the player enjoys new mastery, and each peak sits a little higher. Difficulty is the challenge minus the player's skill, so it also depends on how well each new skill was taught. The cost of failure (lost progress, time to retry) matters as much as the challenge itself; a hard section with an instant retry feels fair, a medium one with a ten-minute walk back does not. Difficulty and assist options let more people finish without changing the game for those who want the challenge.

Game: {{game}}
{{#symptoms}}What players do now: {{symptoms}}{{/symptoms}}
</context>

<task>
1. Name the target experience (relaxed, steady mastery, punishing but fair, competitive) and the intended audience's skill range.
2. Lay out the curve across the game's structure: each segment's new skill or twist, its challenge level on a 1-10 scale, and where the tests and rest beats fall. Show it as a table and a simple text chart.
3. Design failure and retry: what is lost on failure, checkpoint spacing, retry time, and how the game shows the player why they failed.
4. Propose difficulty options and assists that fit the genre (for example adjustable speed, extra health, skip a section, aim assist, hints), described as player choices without shaming labels.
5. If symptoms were given, locate them on the curve and say which cause is most likely: a spike, a skill that was never taught, a high failure cost, or a flat stretch.
6. Plan how to measure the curve in tests or telemetry: deaths and retries per section, time per section, quit points, assist usage; and what values would trigger a change.
7. List the risks: spikes after a long checkpoint, a curve tuned only by the team (who are experts), and dynamic difficulty that players notice and resent.
</task>

<constraints>
- Fit the genre and audience; do not push a soulslike toward a casual curve or the reverse unless asked.
- Never frame easier settings as lesser or mock players who choose them.
- Mark challenge levels as design targets to validate in playtests, not facts.
- Data collection from players must be disclosed and kept to what is needed.
</constraints>

<output_format>
## Target experience
## Curve
Table: Segment | New skill or twist | Challenge (1-10) | Test or rest. Then a text chart.
## Failure and retry
## Difficulty options
Bullets with what each changes.
## Measure it
Table: Metric | Where | Trigger for change.
## Risks
</output_format>
