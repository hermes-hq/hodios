---
schema: 1
id: design-command-palette
kind: prompt
title: Design a command palette and shortcuts
description: Designs a command palette and keyboard shortcut system for a web or desktop product, with the command list, search and ranking, result anatomy, discoverability and conflict rules.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, frontend-engineer, product-manager]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [command-palette, keyboard-shortcuts, power-users, quick-actions]
pairs_with:
  prompts: [add-accessible-keyboard-shortcuts, design-search-experience, design-app-navigation, design-internal-tool-ui]
  personas: [product-designer]
args:
  - name: product_context
    description: The product, its main objects and actions, platforms (browser app, desktop app, both), how heavy users work, existing shortcuts, and whether the browser or OS already claims common key combinations users will expect.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scope, Command inventory, Palette anatomy, Search and ranking, Shortcut map, Discoverability, Edge states, Accessibility]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A command palette lets frequent users act without hunting through menus, but only if it contains the actions they actually use, finds them from partial or synonym input, and teaches the shortcuts along the way. Common mistakes: a palette that only navigates pages, fuzzy search that ranks rare commands above everyday ones, shortcuts that collide with browser or OS shortcuts or with typing in text fields, single-key shortcuts that fire while someone types, and shortcuts nobody can discover. Good design combines navigation, actions on the current context and recent items, ranks by context and recency, shows each command's shortcut in the result, and has a cheat sheet one key away.
</context>

<task>
<product_context>
{{product_context}}
</product_context>

If the product's main objects and actions are unknown, ask and stop. Other gaps become assumptions marked [confirm].

1. **Scope.** What the palette covers (navigation, actions, object search, settings), what it does not, and its trigger (for example Cmd/Ctrl+K with an alternative where that combination is taken).
2. **Command inventory.** The commands grouped by type, with synonyms users might type, context in which each is available, and which deserve a direct shortcut.
3. **Palette anatomy.** Input, result groups, result row (icon, name, context, shortcut hint), empty query view (recent and suggested), nested steps for commands that need an argument (for example "Assign to..." then a person), and preview if useful.
4. **Search and ranking.** Matching (prefix, fuzzy, synonyms, acronyms), ranking signals (current context, frequency, recency), and how objects and commands mix in results.
5. **Shortcut map.** Shortcuts with platform variants (Cmd versus Ctrl), conflicts checked against common browser and OS shortcuts, sequence shortcuts (g then i) versus modifiers, and which shortcuts are disabled while typing in inputs.
6. **Discoverability.** Shortcut hints in menus and tooltips, a cheat sheet (often "?"), and a hint in onboarding or empty states without nagging.
7. **Edge states.** No results with suggestions, command unavailable in this context (shown disabled with the reason, or hidden, with the rule), permission-restricted commands, destructive commands requiring confirmation.
8. **Accessibility.** Combobox semantics with arrow-key navigation and announced result counts; any single-character shortcut (a letter, number or symbol without a modifier) can be turned off, remapped to include a modifier, or works only when its component has focus (WCAG 2.1.4 Character Key Shortcuts); nothing is available only by shortcut.
</task>

<constraints>
- Every command reachable by shortcut or palette must also be reachable through visible UI.
- Do not assign shortcuts that override common browser or OS shortcuts without saying so and offering an alternative.
- Single-character shortcuts must not fire inside text inputs and must be able to be turned off.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
## Command inventory
| Command | Group | Synonyms | Context | Shortcut |
## Palette anatomy
## Search and ranking
## Shortcut map
| Action | Mac | Windows and Linux | Conflict check |
## Discoverability
## Edge states
## Accessibility
</output_format>
