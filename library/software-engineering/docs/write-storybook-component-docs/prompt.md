---
schema: 1
id: write-storybook-component-docs
kind: prompt
title: Write Storybook docs for a component
description: Writes Storybook docs for a UI component with documented props, one story per meaningful state, usage guidance, do and don't examples and accessibility notes, in the repo's Storybook style.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, designer, maintainer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [docs, code]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [storybook, component-docs, ui-components, prop-docs, usage-guidelines]
pairs_with:
  prompts: [build-ui-component, write-storybook-interaction-tests, write-component-spec]
args:
  - name: component
    description: The component to document, by name or file path.
    type: text
    required: true
  - name: guidance
    description: Design guidance the code cannot show, such as when to use this component instead of a similar one.
    type: text
output_contract:
  format: markdown
  sections: [Files changed, States covered, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People open a component's Storybook page to answer three questions: should I use this, how do I use it correctly, and what does it look like in the state I care about. Most pages answer only the second, and badly. Stories show the happy path with short text. The props table is generated from types but has no descriptions, because nobody wrote doc comments on the props. Docs prose repeats the props table instead of giving judgement. The useful content is the states that cause bugs (loading, error, disabled, empty, very long text, narrow container, right-to-left if supported), when not to use the component and what to use instead, and keyboard and labelling requirements. One story per meaningful state beats a story per prop permutation, and args-based stories keep controls working.
</context>

<task>
Write Storybook docs for {{component}}.
{{#guidance}}
Design guidance: {{guidance}}
{{/guidance}}

1. Find the Storybook version and config, the story format in use (CSF version, autodocs or MDX pages, TypeScript or not), and two well-documented existing stories to copy conventions from.
2. Read the component source, its types and its existing stories and tests. List its props, variants, slots or children, events and internal states.
3. Add doc comments to each prop in the component's types so the generated props table explains purpose, default and constraints. Do not change prop types or defaults.
4. Write stories with args for each meaningful state: default, each variant, disabled, loading, error, empty, long content and any state the code branches on. Name stories after the state, not the prop.
5. Write the docs page in the repo's style (autodocs description or an MDX page): overview, when to use and when not (naming the alternative component if one exists in the repo), do and don't examples as stories, accessibility notes from the code (role, keyboard behaviour, required labels), and related components.
6. Build Storybook or run the repo's story test runner if there is one, and fix what you broke.
</task>

<constraints>
- Guidance about when to use the component comes from the guidance given, existing docs or the code. Do not invent design rules; leave `TODO(design): ...` instead.
- Accessibility notes describe what the component does, not what it should do. Report gaps under open questions.
- Use realistic but fake content; no real customer names or data.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Files changed
The files written or edited.
## States covered
Bullets: each story and the state it shows.
## Verification
Commands run and real results, or "Not run" and why.
## Open questions
Every `TODO(design)` and accessibility gap, as a checklist.
</output_format>
