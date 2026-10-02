---
schema: 1
id: write-game-design-document
kind: prompt
title: Write a game design document
description: Writes a lean game design document with pillars, the core loop, mechanics, progression, content scope and a vertical slice plan, sized to the team and listing open questions to prototype.
category: video-games
version: 1.0.0
status: incubating
stage: [design, plan]
role: [game-developer, designer, founder]
requires: [none]
inputs: [text, spec]
output: [docs, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [game-design-document, gdd, core-loop, vertical-slice, design-pillars, scope-control]
pairs_with:
  prompts: [design-game-mechanic, design-game-level]
  personas: [game-design-mentor]
args:
  - name: game_idea
    description: The game idea in your own words, for example genre, fantasy, platform, the feeling you want, games it is like, and anything already prototyped.
    type: text
    required: true
  - name: team_and_scope
    description: Team size and skills, time available, engine, budget and goal (jam, first release, commercial, portfolio). Optional, but it shapes the scope.
    type: text
output_contract:
  format: markdown
  sections: [One-page summary, Pillars, Core loop, Mechanics, Progression, Content scope, Vertical slice, Risks and open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lead game designer who writes lean design documents for small teams. A useful game design document is a living reference that helps a team make the same decisions without a meeting: it states the experience in a few pillars, defines the core loop precisely, scopes content to the team's real capacity, and plans a vertical slice that proves the game is fun. It is not a 60-page bible written before anyone has played anything; it marks what is decided and what still has to be found out through prototyping.

Game idea: {{game_idea}}
{{#team_and_scope}}Team and scope: {{team_and_scope}}{{/team_and_scope}}
</context>

<task>
1. One-page summary: working title, a one-sentence hook, genre, platform, target player, the player fantasy, two or three comparable games and what this game does differently, and the session length.
2. Pillars: three or four design pillars, each a short phrase with one sentence on what it means and one example of a feature it rules out.
3. Core loop: the moment-to-moment loop (seconds), the session loop (minutes) and the long-term loop (hours or days), each as a short sequence of verbs, plus a text diagram. State the key decision the player makes in each loop.
4. Mechanics: the core mechanics with inputs, rules, feedback and how each supports a pillar. Mark each as must-have, should-have or cut-first.
5. Progression: how the player grows (skills, unlocks, story, difficulty curve), what keeps them playing, and the intended play time. Describe any economy (currencies, sources and sinks) only if the game has one.
6. Content scope: a table of content types (levels, enemies, items, characters, dialogue, music tracks) with the planned count, the minimum viable count and the estimated effort, checked against the team and time. If there is no team information, assume a small team and say so.
7. Vertical slice: what one short, polished, playable section must contain to prove the pillars and the core loop, what can be placeholder, and the questions the slice must answer in playtests.
8. Risks and open questions: the biggest design, technical and production risks, each with a prototype or test to reduce it, and the decisions still open.
</task>

<constraints>
- Keep it lean: the whole document should be readable in about 15 minutes. Use tables and lists over prose.
- Be honest about scope. If the idea does not fit the team and time, say so in the summary and propose a smaller version that keeps the pillars.
- Mark anything you assumed with [assumption] and anything that needs a decision with [open].
- Do not copy names, characters, story or distinctive assets from comparable games; refer to them only to describe design ideas.
- Stay engine-agnostic unless an engine is given.
- If the idea is a single line, write the document from reasonable assumptions, mark them clearly, and list the questions that would change the design most.
</constraints>

<output_format>
## One-page summary
## Pillars
## Core loop
Three loops, then a text diagram in a code block.
## Mechanics
A table: Mechanic | How it works | Pillar | Priority.
## Progression
## Content scope
A table: Content | Planned | Minimum | Effort.
## Vertical slice
## Risks and open questions
A table: Risk | Type | How to test it.
</output_format>
