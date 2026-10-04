---
schema: 1
id: upgrade-game-engine-version
kind: prompt
title: Upgrade a game engine version
description: Plans a game engine major upgrade such as Godot 3 to 4 or a Unity LTS jump, covering backup branch, API and render pipeline changes, shader and asset re-import, plugins and a playtest checklist.
category: migration
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [game-developer]
stack: [unity, godot]
requires: [none]
inputs: [text, config]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [engine-upgrade, render-pipeline, shaders, asset-import, playtesting, plugins]
pairs_with:
  prompts: [inventory-deprecated-api-usage, upgrade-major-dependency]
  personas: [migration-engineer]
args:
  - name: engine
    description: The engine, for example Godot, Unity or Unreal.
    type: string
    required: true
  - name: from_version
    description: The exact current version (for example "3.5.3" or "2021.3.33f1").
    type: string
    required: true
  - name: to_version
    description: The exact target version.
    type: string
    required: true
  - name: project_notes
    description: Optional. Genre, target platforms, render pipeline, scripting languages, plugins and asset store packages, custom shaders, project size, team size, release date and why you are upgrading.
    type: text
output_contract:
  format: markdown
  sections: [Go or wait, Preparation, What will break, Upgrade steps, Playtest checklist, Rollback, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A game developer wants to move {{engine}} from {{from_version}} to {{to_version}}. Engine upgrades are riskier than library upgrades: opening the project in the new editor rewrites scene, prefab and resource files in place, re-imports every asset (which can take hours and changes texture and audio settings), and may convert shaders or materials one way. Third-party plugins and store packages are often the real blocker. Rendering changes alter how the game looks even when nothing errors, and physics or timing changes alter how it feels. Upgrading close to a release date, on a console certification schedule, or mid-jam is usually the wrong call.
{{#project_notes}}
Project notes:
{{project_notes}}
{{/project_notes}}
</context>

<task>
1. Decide go or wait: is the jump supported directly or does it need intermediate versions; is the target a long-term support or stable release; what the upgrade buys (features, platform requirements, store or console requirements, bug fixes); and how close the next release is.
2. Preparation: commit everything, tag the last good build, create an upgrade branch, confirm version control handles the engine's large and binary files (LFS or equivalent) and ignores generated folders (for example `.godot/` or `Library/`), record a baseline (build size, load times, frame time on target hardware, a short gameplay capture of key scenes), and freeze content changes or plan how to merge them.
3. Inventory what will break, using the official upgrade or migration guide for every version crossed (ask the user to paste it if you cannot read it, and do not list changes from memory as fact):
   - Scripting API renames and removals, and any automatic conversion tool the engine provides plus what it misses.
   - Rendering: pipeline or renderer changes, lighting, post-processing, colour space, shader language changes and custom shaders that need rewriting.
   - Assets: re-import settings, compression formats per platform, animation and import pipeline changes.
   - Physics, input, UI, audio and networking changes that alter feel or behaviour.
   - Plugins and packages: support status for the target version for each one, with a replacement or removal decision.
   - Build and platform: SDK and toolchain versions, export templates, signing, console or store requirements.
4. Write the upgrade steps in order: plugins first (update or remove), run the engine's converter on the branch, fix compile errors, then warnings, then rendering, then feel.
5. Write a playtest checklist that compares against the baseline: every scene loads, save files from the old version load, input on each device type, audio, UI scaling, performance on minimum-spec hardware, and a full build on each target platform.
6. Define rollback: the tag to return to and the rule for abandoning the branch.
</task>

<constraints>
- Never suggest opening the main project in the new editor without a backup branch or tag first.
- Do not invent API names, version numbers or plugin compatibility; say what to check and where (official migration guide, release notes, plugin page).
- If the exact versions, platforms or plugin list are missing and they change the plan, ask, and mark assumptions as [X].
- Players' existing save files must keep working, or the plan must say how they are migrated.
{{> output/uncertainty}}
</constraints>

<output_format>
## Go or wait
Recommendation in one line, then the reasons.

## Preparation
Checklist.

## What will break
Table: area | change | where it hits this project | fix or decision | source to check.

## Upgrade steps
Numbered steps.

## Playtest checklist
Checklist grouped by scene, platform and system, each compared with the baseline.

## Rollback
The tag, and when to abandon.

## Open questions
Bullets.
</output_format>
