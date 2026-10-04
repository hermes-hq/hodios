---
schema: 1
id: write-modding-guide
kind: prompt
title: Write a modding guide
description: Writes a modding guide for a game's players, covering file layout, data formats, the scripting API, a first working mod in 15 minutes, load order, compatibility and what is unsupported.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [game-developer, technical-writer]
stack: []
requires: [none]
inputs: [notes, spec, text]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [modding, scripting-api, load-order, mod-compatibility, game-mods]
pairs_with:
  prompts: [write-code-tutorial, turn-game-design-into-tech-spec]
args:
  - name: modding_surface
    description: What modders can change and how - mod folder location, file formats (JSON, XML, Lua, assets), the scripting API or hooks, the manifest format, how the game loads mods, tools you ship, and what you do not support.
    type: text
    required: true
  - name: engine
    description: Engine and platforms, for example "Unity, Windows and Linux, Steam Workshop".
    type: string
    default: not stated
  - name: game_name
    description: The game's name as players know it.
    type: string
    default: the game
output_contract:
  format: markdown
  sections: [Guide, Gaps for the dev team]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Modders are motivated players, often not professional programmers, who will read the guide once and then live in its reference sections. Modding guides fail when they start with architecture instead of a working mod, when they leave modders to reverse-engineer which files are safe to touch, when they never explain load order and conflicts (the cause of most "my game crashes" reports), and when they are silent on what the studio supports, so modders build on internals that change next patch.

Game: {{game_name}}.
Engine and platforms: {{engine}}. If not stated, keep tool and path advice engine-neutral and list the engine under Gaps.
</context>

<task>
<modding_surface>
{{modding_surface}}
</modding_surface>

1. Open with what mods can do in this game, with two or three concrete examples drawn from the surface (a new item, a balance tweak, a UI change), and what they cannot.
2. "Your first mod in 15 minutes": the smallest change that visibly works in game, as numbered steps with the exact folder, file name, manifest and content, how to enable it, and how to confirm it loaded (an in-game marker or a log line). Include what to do if it does not appear.
3. Mod structure: the folder layout with a tree, the manifest fields (required and optional, with types), naming and id rules that avoid clashes (for example a unique prefix).
4. Data formats: each moddable data type, its file format, the fields that matter, and how to override versus add. Show one short example per format.
5. Scripting API, if there is one: the language and version, entry points and lifecycle hooks, the main objects, sandbox limits (no file or network access, for example), and performance advice. Link each group to reference pages rather than listing everything.
6. Load order and compatibility: how the game orders mods, how conflicts resolve (last wins, merge, error), declaring dependencies and incompatibilities, and how players reorder.
7. Testing and debugging: logs and their location, developer console or flags, hot reload if supported, and a checklist before publishing.
8. Publishing and versioning: where to publish, how game updates affect mods, how API deprecations are announced, and how to declare the game version a mod supports.
9. Support boundaries: what is stable API, what is internal and may break, the studio's rules on content and monetisation if given, and where to ask for help.
</task>

<constraints>
- Use only paths, formats, hooks and rules in the modding surface. Write [X] where the guide needs a fact you were not given, and list it under Gaps.
- Every code or data example must be consistent with the formats described; do not invent API functions.
- Assume a beginner programmer: explain each step's purpose in one line, avoid unexplained jargon, and say which tools to install.
- Do not document bypassing anti-cheat, DRM or multiplayer integrity, or injecting code into an online client; if asked, decline in one line and offer a guide for the officially supported surface instead. Say plainly if online play is unsupported for mods.
- If the modding surface is too thin to build a working first mod (no folder, no format, no way to load it), ask for those three things before writing the guide.
</constraints>

<output_format>
## Guide
The publishable guide in Markdown, with `###` headings in the order of the task steps (skip the scripting section if there is no scripting), a folder tree in a code block, and a table for manifest fields (field, type, required, meaning). Aim for about 1,500 to 2,500 words; long API listings become a "Reference pages to write" list under Gaps rather than being invented here.
## Gaps for the dev team
Table: gap, why modders need it, suggested fix (doc, API, tool).
</output_format>
