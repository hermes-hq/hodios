---
schema: 1
id: document-components-for-agents
kind: prompt
title: Document UI components for agents
description: Writes a compact catalog of a codebase's UI components, props, variants and usage rules so coding agents reuse them instead of inventing new markup, styles or near-duplicate components.
category: meta
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, tech-lead, designer]
requires: [repo-read, file-write]
inputs: [repo]
output: [docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, component-catalog, component-reuse, frontend, agent-instructions]
pairs_with:
  prompts: [write-agents-md, write-scoped-agent-rules, build-page-from-mockup]
args:
  - name: components_path
    description: Where the shared components live (for example src/components/ui or a design-system package). Leave empty to find them.
    type: string
  - name: known_problems
    description: What agents get wrong today, such as raw buttons instead of the Button component, hard-coded colours, a second modal implementation.
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Catalog file, Instruction file pointer, Upkeep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agents write UI from what they can see in context. If the shared components are not visible, they produce plausible markup with inline styles, a new dropdown that duplicates the existing one, or hex colours instead of tokens. Pointing an agent at a folder of 80 components does not help; reading them all costs too much context. What helps is a compact catalog: for each component, the import path, one line on when to use it, the props that matter, the variants, and the thing it replaces ("use Button, never a raw button element"). Rules that cut across components (spacing and colour tokens, icon set, form field pattern, how loading and empty states look) matter as much as the entries. The catalog must come from the actual source, not memory, and must say how it stays current.
</context>

<task>
Write a component catalog for coding agents.
{{#components_path}}Components: {{components_path}}{{/components_path}}
{{#known_problems}}
<known_problems>
{{known_problems}}
</known_problems>
{{/known_problems}}

1. Find the shared components and any design tokens, theme files and existing docs or stories. List them, noting deprecated or internal-only components.
2. Read each public component's props type and implementation enough to state its purpose, key props, variants and accessibility behaviour it already handles. Do not describe props that are not in the code.
3. Group components by job (actions, inputs, feedback, layout, navigation, data display).
4. Write the catalog file next to the components or in the docs folder: one line per component (import, use for, key props or variants, replaces), then a short "Cross-cutting rules" section on tokens, icons, forms, and loading, empty and error states. Address each known problem with an explicit rule.
5. Keep it under about 150 lines. Leave out components agents should not use, except a short "Do not use" list.
6. Add a one-line pointer to the catalog in the repository's agent instruction file, scoped to frontend paths if the tool supports scoped rules.
</task>

<constraints>
- Every entry must match the source. If a component's purpose is unclear from the code, list it under Upkeep as a question rather than guessing.
- Do not change component code.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Table: component, path, status (public, deprecated, internal).
## Catalog file
Path, then the full file in a fenced block.
## Instruction file pointer
The line added and where.
## Upkeep
How to keep the catalog current (a check in review, a generation script if the props types allow) and open questions.
</output_format>
