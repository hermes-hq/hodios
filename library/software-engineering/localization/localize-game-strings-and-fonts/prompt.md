---
schema: 1
id: localize-game-strings-and-fonts
kind: prompt
title: Localise game strings and fonts
description: Plans and implements game localisation, covering string tables, variables and plurals, font atlases for CJK and Cyrillic, text expansion in fixed UI, subtitles and platform language rules.
category: localization
version: 1.0.0
status: incubating
stage: [plan, build]
role: [game-developer]
requires: [none]
inputs: [spec, file, text]
output: [plan, code, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [string-tables, font-atlas, cjk, text-expansion, subtitles, voice-over]
pairs_with:
  prompts: [pseudo-localize-ui, write-icu-plural-messages, write-translator-context-notes, audit-game-accessibility]
  personas: [localization-engineer]
args:
  - name: game_description
    description: The game, how text is stored today (hard-coded, scriptable objects, CSV, dialogue tool), amount of text, voiced lines, UI style (pixel art, fixed panels), and fonts used.
    type: text
    required: true
  - name: target_languages
    description: The languages to ship, for example "French, German, Spanish, Brazilian Portuguese, Russian, Japanese, Simplified Chinese, Korean".
    type: string
    required: true
  - name: engine
    description: The engine and version, for example "Unity 2022 LTS", "Godot 4", "Unreal 5", "custom". Leave empty to stay engine-neutral.
    type: string
output_contract:
  format: markdown
  sections: [Summary, String pipeline, Fonts and rendering, UI and layout, Audio and subtitles, Certification and stores, Plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Games add problems that app localisation rarely meets. Pixel fonts and baked font atlases have no glyphs for Japanese, Chinese, Korean or Cyrillic, and a full CJK atlas can be tens of megabytes. Dialogue is assembled from variables ("{player} found {count} {item}") in languages with gender, case and plural agreement. Fixed-size dialogue boxes and HUD labels overflow when German runs 30% longer, and text baked into textures cannot be translated at all. Voiced lines must match subtitles and timing. Platform holders and stores set language rules (the system language at boot, store page languages, age-rating text), and players review-bomb poor translations. Experienced teams externalise text early, choose a font strategy per script, test with pseudo-localisation, and send translators context and screenshots.
</context>

<task>
Plan localisation for this game into: {{target_languages}}. Engine: {{engine}} (engine-neutral if empty).

<game_description>
{{game_description}}
</game_description>

1. String pipeline: move all player-facing text into string tables (the engine's localisation system where one exists, such as Unity Localization, Godot's TranslationServer with CSV or PO, Unreal's text localisation), with stable keys, speaker and scene context, character limits and screenshots. Include item names, tutorials, achievements, store text and text in textures or shaders.
2. Variables and grammar: replace assembled sentences with full messages using named placeholders; use ICU or the engine's plural and gender support; give items and characters grammatical metadata (gender, articles) where target languages need it, or rewrite lines to avoid agreement (for example "Item found: {item}").
3. Fonts: per script, choose a strategy: dynamic fonts with fallback chains; pre-baked atlases limited to the characters actually used (generate the character set from the translated tables at build time); or a separate font per language. Check licensing for embedding and for each script. Handle line breaking for CJK (no spaces), Thai if targeted, kinsoku rules for Japanese, and Arabic shaping and right-to-left only if those languages are in the list.
4. UI and layout: auto-size or wrap text containers, allow 30 to 40% expansion for European languages, shorter but taller glyphs for CJK, avoid text in images, and run a pseudo-localisation build with expanded and accented strings to find overflows and hard-coded text.
5. Audio and subtitles: decide which languages get voice-over versus subtitles only, keep subtitle timing data separate from text, respect reading speed (roughly 15 to 17 characters per second, lower for children's games), and keep speaker names.
6. Certification and stores: the game should follow the console or device system language at first boot where the platform expects it, and provide an in-game language switch; store pages, age ratings and legal text need translation per store; verify current platform requirements in each platform's documentation rather than relying on memory.
7. Testing: linguistic QA by native players in context, functional QA for overflows and missing glyphs (a tool that scans tables for characters missing from each font), and a bug template.
8. Plan the order of work with rough effort per phase and what can run in parallel with development.
</task>

<constraints>
- Do not state console certification requirements as fact; say what to check and where.
- Do not invent engine APIs; mark uncertain ones [check engine version].
- If the text volume or storage method is unknown, ask for it before estimating effort.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Summary
Three to five sentences: biggest risks for these languages and the recommended approach.

## String pipeline
Bullets and a sample string table row with columns: key, source, context, max length, speaker, notes.

## Fonts and rendering
Table: Script | Languages | Font strategy | Size or licence notes.

## UI and layout
Bullets of changes and the pseudo-localisation setup.

## Audio and subtitles
Bullets.

## Certification and stores
Bullets of what to verify, with the owner.

## Plan
Table: Phase | Work | Effort (S, M, L) | Can start when.
</output_format>
