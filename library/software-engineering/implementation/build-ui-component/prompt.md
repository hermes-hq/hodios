---
schema: 1
id: build-ui-component
kind: prompt
title: Build a reusable UI component
description: Builds a typed, accessible UI component from a description or screenshot, with loading, empty and error states and a usage example. Use when adding a component to a frontend.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
requires: [repo-read, file-write]
inputs: [spec, image]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: optional
level: intermediate
tags: [ui-component, component-states, component-api]
pairs_with:
  personas: [accessibility-specialist]
args:
  - name: description
    description: What the component shows and does, or a screenshot plus notes. Include the data it receives and the actions it emits.
    type: text
    required: true
  - name: framework
    description: UI framework.
    type: enum
    enum: [react, vue, svelte, angular, web-components]
    default: react
  - name: styling
    description: Styling approach, for example CSS modules, Tailwind or the design-system tokens.
    type: string
    default: match project
output_contract:
  format: markdown
  sections: [Assumptions, API, Code, Tests, Usage]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Components built from a mock-up usually cover only the state in the mock-up. In production the data is late, empty, failing, or three times longer than the design assumed, and someone is using a keyboard or a screen reader. A reusable component also needs an API other engineers can guess: typed props, sensible defaults, composition instead of a pile of boolean flags, and no hard-coded copy.
</context>

<task>
Build a {{framework}} component from this description:

{{description}}

Styling: {{styling}} (when it says "match project", find and use the project's existing approach and design tokens).

1. If you were given an image, list what you can read from it (layout, hierarchy, text, controls) separately from what you are guessing (exact spacing, colours, hover states). Map colours and spacing to the nearest existing tokens instead of hard-coding values.
2. Find two existing components in the repo and copy their file layout, naming, prop style, styling method and test approach.
3. Design the API: typed props with defaults; controlled and uncontrolled use if it holds state; slots or children for content that varies; callbacks named for intent (`onSelect`, not `onClick2`). Forward refs and pass remaining attributes and class names to the root element where the framework allows it.
4. Implement every state that applies: default, loading (skeleton or spinner with `aria-busy`), empty (message plus a next action), error (message plus retry), disabled, and overflow (long text, many items, narrow viewport).
5. Build accessibility in: native elements first (`button`, `a`, `input`, `dialog`), an accessible name for every control, full keyboard operation, visible focus, contrast from the tokens, and respect for `prefers-reduced-motion`.
6. Take all user-visible text through props or the project's i18n layer. Hard-code no copy.
7. Write tests in the project's framework for each state, the main interactions (including by keyboard), and the callbacks. Add an automated accessibility check if the project already uses one. Add a story or demo entry if the project has Storybook or similar.
</task>

<constraints>
- No new dependencies unless the description requires one; prefer what the project has.
- Do not change shared tokens, global styles or other components.
- If the description and existing design-system components overlap, reuse or extend the existing one and say so instead of building a duplicate.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Assumptions
What you inferred or guessed, one line each.

## API
| Prop | Type | Default | Description |

## Code
Each file in its own code block, headed by its path.

## Tests
One line per test: what it proves.

## Usage
A short example covering the default and error states.
</output_format>
