---
schema: 1
id: design-save-game-format
kind: prompt
title: Design a save game format
description: Designs a game save format covering what state to persist, versioning and migration of old saves, atomic writes and checksums against corruption, cloud-save conflicts and per-platform size limits.
category: data
version: 1.0.0
status: incubating
stage: [design, build]
role: [game-developer]
stack: []
requires: [none]
inputs: [text]
output: [code, report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [save-system, serialisation, versioning, atomic-writes, cloud-saves, checksums]
pairs_with:
  prompts: [upgrade-game-engine-version]
args:
  - name: game_state
    description: What the game needs to remember - world, player, inventory, quests, settings, procedural seeds - plus genre, how often it saves (manual, checkpoints, autosave), engine and language.
    type: text
    required: true
  - name: platforms
    description: Target platforms and stores (for example "PC on Steam, Switch", "iOS and Android"), and whether cloud saves are wanted.
    type: string
    default: PC
output_contract:
  format: markdown
  sections: [What to save, Format and layout, Versioning and migration, Corruption protection, Cloud saves, Platform notes, Test plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A game developer is designing how the game saves. Save systems cause the bugs players remember most: a patch that cannot read old saves, a crash or power loss mid-write that corrupts the only save, cloud saves that overwrite 40 hours of progress with an older file, and saves that bloat until loading takes seconds. Experts save the minimum state needed to reconstruct the game (not entire engine objects), version every save from day one, write atomically with a backup, and treat cloud sync conflicts as a player-facing decision.

Platforms: {{platforms}}
</context>

<task>
<game_state>
{{game_state}}
</game_state>

1. What to save: split state into must-save (progress, inventory, quest flags, player stats, world changes the player caused), reconstructable (anything derived from a seed or static game data; save the seed and the deltas instead), and never-save (caches, engine object references, transient effects). Reference static content by stable ids, never by array index or engine object path, so content updates do not break saves.
2. Format and layout: choose a serialisation (human-readable JSON or similar during development, a compact binary or compressed form for release if size matters) with a header holding magic bytes, format version, game version, timestamp, playtime and a checksum. Separate settings from progress, and slots from each other. Sketch the schema.
3. Versioning and migration: an integer format version incremented on every breaking change; on load, run migration steps in sequence from the save's version to the current one; never drop unknown fields silently; keep fixture saves from each released version to test migrations.
4. Corruption protection: write to a temporary file, flush, then atomic rename over the old one; keep the previous save as a backup (or rotating autosaves); validate the checksum on load and fall back to the backup with a clear message; never save during scene transitions or while state is half-updated.
5. Cloud saves: conflict detection using timestamps and playtime (not timestamps alone, clocks lie), and a player choice screen showing both saves' playtime, location and date when they conflict. Never auto-overwrite the save with more progress.
6. Platform notes: tell the user to check each platform's and store's rules for save size, storage location, write frequency and cloud quotas; do not state them as fact. Mobile apps can be killed at any time, so save on pause or background.
7. Anti-tamper: say plainly whether it matters (single-player: usually not; competitive or economy games: validate on a server instead of trusting the file).
</task>

<constraints>
- Do not state platform certification rules, quotas or engine API details as fact; mark them to verify in the platform or engine docs.
- If the game state list is missing key parts (engine, how saving is triggered), ask, and mark assumptions as [X].
- Code samples in the user's engine language if given, otherwise language-neutral pseudocode.
</constraints>

<output_format>
## What to save
Table: state | category (must-save, reconstruct, never) | how stored.

## Format and layout
Header fields and a schema sketch in a code block.

## Versioning and migration
The rule and an example migration step.

## Corruption protection
The write and load procedure as numbered steps, with code.

## Cloud saves
Conflict rule and the player-facing choice.

## Platform notes
Bullets of what to check per platform.

## Test plan
Checklist: power-loss simulation, old-version fixtures, conflict cases, large saves.
</output_format>
