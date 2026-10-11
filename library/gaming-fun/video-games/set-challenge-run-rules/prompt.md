---
schema: 1
id: set-challenge-run-rules
kind: prompt
title: Set challenge run rules
description: Writes a fair, unambiguous rule set for a self-imposed challenge run, such as a Nuzlocke, no-hit, pacifist or low-level run, with edge-case rulings and a difficulty check.
category: video-games
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer, content-creator]
requires: [none]
inputs: [text, preferences]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [challenge-run, nuzlocke, self-imposed-rules, replay-value, run-tracking]
pairs_with:
  prompts: [plan-speedrun-route, plan-game-strategy]
args:
  - name: game
    description: The game and version.
    type: string
    required: true
  - name: idea
    description: The challenge you have in mind, for example "Nuzlocke", "no healing items", "only starting weapon", "never level up", or a mix.
    type: text
    required: true
  - name: purpose
    description: Why you are doing it, for example "fun and fresh replay", "stream series", "racing a friend under the same rules". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Core rules, Rulings on edge cases, Difficulty check, Tracking sheet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write challenge-run rules that hold up mid-run. Challenge runs go wrong when a rule is vague at the worst moment (does a scripted defeat count, does a gift count as an encounter, is a cutscene kill a death), when the challenge makes a section literally impossible, or when the player quietly bends rules and stops enjoying it. Established communities usually have common variants (for example Nuzlocke's catch-one-per-area and faint-means-release core, with clauses such as duplicates or shiny clauses); naming the variant and listing any house rules avoids disputes. Racing a friend needs identical rules and a stated tie-break.

Game: {{game}}
Idea: {{idea}}
{{#purpose}}Purpose: {{purpose}}{{/purpose}}
</context>

<task>
1. Write the core rules as numbered, testable statements (a rule someone else could check from a recording). Name the community variant if one exists, and separate optional clauses the player can switch on.
2. Anticipate edge cases for this game and challenge (scripted events, forced battles, gifts and trades, death definitions, glitches, menus and settings, difficulty options, DLC, accidental breaks) and write a ruling for each. Mark game-specific facts you are unsure of as to check.
3. Difficulty check: points where the rules might make progress impossible or extremely grindy, and a fair fallback that keeps the spirit (for example a single allowed exception, written in advance).
4. Give a tracking sheet: columns to log progress, losses, rule exceptions and notes; for stream series, what to show on screen.
</task>

<constraints>
- Do not invent game mechanics, areas or items; when unsure, write the ruling generally and mark it to verify.
- Rules must be unambiguous; avoid "reasonable" and "mostly".
- Keep the rule set short enough to fit on one screen; move extras to optional clauses.
</constraints>

<output_format>
## Core rules
Numbered list, then optional clauses.
## Rulings on edge cases
Table: Situation | Ruling.
## Difficulty check
Bullets with fallbacks.
## Tracking sheet
Column list or table header.
</output_format>
