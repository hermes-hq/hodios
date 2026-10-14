---
schema: 1
id: set-up-figma-variables
kind: prompt
title: Set up Figma variables and modes
description: Plans Figma variables for colour, spacing, radius and type, with collections, modes for themes, aliasing, scoping, code syntax and naming that matches the code tokens.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer]
stack: [figma]
requires: [none]
inputs: [text, config, image]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [figma-variables, design-tokens, theming, modes, design-code-parity]
pairs_with:
  prompts: [structure-figma-component-library, define-design-tokens, generate-platform-token-files, audit-design-code-parity]
  personas: [design-systems-lead]
args:
  - name: tokens
    description: The token set to represent, as a token file excerpt or list, or a description of the colours, spacing, radius and type you use today.
    type: text
    required: true
  - name: themes
    description: Optional. Themes and variants needed, such as light and dark, brands, density, or platform.
    type: text
  - name: setup
    description: Optional. Your Figma plan, whether variables or styles exist already, and how tokens reach code today.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Collections and modes, Variable list, Aliasing, Scoping and publishing, Styles still needed, Code sync, Setup steps, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Figma variables hold colour, number, string and boolean values, are grouped into collections, and switch values through modes, which is how one library serves light and dark or several brands. The structure that holds up is two or three collections that mirror the token tiers: primitives (raw palette and scales, hidden from publishing so designers cannot pick them directly), semantic tokens that alias primitives and carry the modes, and optionally component tokens. Modes belong on the semantic collection; putting brand and theme modes on primitives multiplies values and makes aliases hard to trace. Scoping limits where each variable appears (fill, stroke, text, gap, radius), which removes most misuse in the picker. Names with slashes create groups in Figma, and code syntax can be set per platform so Dev Mode shows the real token name engineers use. The number of modes allowed per collection depends on the Figma plan, so a plan with many brands times themes must check its limit. Some properties still need styles rather than variables, such as effects, gradients and composite text styles, though text styles can bind their size, line height, weight and family to variables. Code and Figma drift unless one side is the source of truth and the sync route is explicit.
</context>

<task>
Plan the Figma variables setup for this token set.

<tokens>
{{tokens}}
</tokens>
{{#themes}}

<themes>
{{themes}}
</themes>
{{/themes}}{{#setup}}

<setup>
{{setup}}
</setup>
{{/setup}}

1. **Collections and modes.** Name the collections, what goes in each, and the modes on each. Explain why modes sit where they do. If brands and themes multiply, show the mode count and tell the user to check it against their plan's limit.
2. **Variable list.** A table per collection: variable name (slash-grouped), type, value or alias per mode, and the matching code token name.
3. **Aliasing.** Which semantic variables alias which primitives, and rules for when a component variable is worth adding.
4. **Scoping and publishing.** The scope for each group (for example text colours only on text fill, spacing only on gap and padding), which collections are hidden from publishing, and descriptions to add to variables.
5. **Styles still needed.** Text styles bound to typography variables, effect styles for shadows, and anything else that variables do not cover in this setup.
6. **Code sync.** Choose the source of truth (code or Figma) and the sync route the user's setup allows (export plugin, REST API where their plan permits, or manual review), set code syntax per platform, and describe a check for drift.
7. **Setup steps.** An ordered checklist to build it, including how to migrate existing styles to variables without breaking consumer files.
</task>

<constraints>
- Variable names must match code token names one to one, or the mapping must be listed.
- Do not state specific plan limits or features as facts unless the user gave their plan; tell them what to check.
- Do not invent token values; aliases and proposals are labelled.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Variable lists as tables, setup as a numbered checklist. End with Open questions.
</output_format>
