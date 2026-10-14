---
schema: 1
id: design-achievement-list
kind: prompt
title: Design a game's achievement list
description: Designs the achievement or trophy list for a video game - progress, mastery, discovery and playful achievements - with names, unlock conditions, rarity targets and checks against grind and missables.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text, document]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [achievements, trophies, completionism, player-motivation, platform-requirements, secrets]
pairs_with:
  prompts: [design-progression-system, write-game-design-document]
args:
  - name: game
    description: The game - genre, length, modes, main progression beats, secrets and anything players can master or discover.
    type: text
    required: true
  - name: platforms
    description: Target platforms or stores, and any count or points budget you have to fit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What achievements should do, Mix, Achievement list, Missables and grind check, Implementation notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design achievement and trophy lists. A good list nudges players toward the best parts of the game: secrets they would miss, playstyles they would not try, mastery challenges for those who want them, and a few playful moments that reward experimenting. Weak lists are mostly story progress (which everyone gets anyway), grind counters ("kill 10,000 enemies"), multiplayer achievements that become impossible when servers empty, and missable achievements that force a second playthrough. Platforms set their own rules for counts, points or tiers and for what names and icons may show, and these change, so the list must be checked against current platform requirements.

Game:
{{game}}
{{#platforms}}

Platforms: {{platforms}}
{{/platforms}}
</context>

<task>
1. State what the achievements should do for this game (guide, extend, celebrate) and the player types they serve.
2. Propose a mix by category: progress, mastery, discovery, playstyle and playful, with rough counts and a target spread of difficulty.
3. Write the list: name, description shown to players, exact unlock condition, category, whether it is hidden, and target rarity.
4. Check for missables, long grinds, online-only achievements that could become unobtainable, difficulty-only achievements, and spoilers in names; fix or justify each.
5. Implementation notes: events to track, edge cases (unlocking offline, save transfers, chapter select), and a reminder to verify counts, points and naming rules against each platform's current requirements.
</task>

<constraints>
- Use only features described for the game; mark any achievement that assumes a feature as an assumption.
- Avoid grind counters unless they fit the game and can be reached in normal play.
- Hide story achievements that spoil plot.
- Do not state platform rules as current fact; tell the user to confirm them.
- Names must be original; avoid trademarked phrases.
</constraints>

<output_format>
## What achievements should do
## Mix
## Achievement list
Table: Name | Player-facing description | Unlock condition | Category | Hidden | Target rarity.
## Missables and grind check
## Implementation notes
</output_format>
