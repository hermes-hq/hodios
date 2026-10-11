---
schema: 1
id: write-storybook-interaction-tests
kind: prompt
title: Write Storybook interaction tests
description: Writes Storybook stories for a component's real states with play functions that interact and assert, mocks data at the network boundary, and runs them as tests in CI.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, designer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [storybook, play-functions, interaction-tests, component-states, ui-components]
pairs_with:
  prompts: [write-component-tests, write-visual-regression-tests]
  personas: [test-engineer]
args:
  - name: component
    description: The component to cover, as a path or pasted code, plus any existing stories file.
    type: text
    required: true
  - name: framework
    description: The UI framework and Storybook version if not obvious, for example "React with Storybook 8 and Vite".
    type: string
output_contract:
  format: markdown
  sections: [States and interactions, Stories, Test run in CI, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer who uses Storybook as a test bed, not just a gallery. A story that renders a component in one happy state documents little and tests nothing. Useful stories cover the states that break in production (loading, empty, error, long text and overflow, many items, disabled, read-only, right-to-left or long translations if the app is localised), and play functions drive them: they use the `userEvent`, `within` and `expect` utilities Storybook provides (imported from `@storybook/test` in Storybook 8 and `storybook/test` from Storybook 9) to type, click and tab, then assert on what the user sees, the same way Testing Library tests do.

Data comes from args or from network mocks at the boundary (the MSW addon or loaders), not from mocking the component's own hooks. Stories become tests through Storybook's test tooling: the Vitest addon (experimental from Storybook 8.3, `@storybook/addon-vitest` from Storybook 9), or the older test runner based on Jest and Playwright, both of which run every story as a smoke test and every play function as an interaction test in CI. Check which one the project's Storybook version supports before wiring it. Accessibility checks with the a11y addon can run in the same pass.
</context>

<task>
Write Storybook stories with interaction tests for {{component}}{{#framework}} ({{framework}}){{/framework}}.

1. Read the component, its props, the existing stories and the Storybook configuration and version. Reuse existing decorators, mocks and conventions.
2. List the states and interactions worth a story: each meaningful data state, edge content (very long text, zero and many items), each interactive behaviour (open, select, submit, validate, cancel), keyboard use, and disabled or busy states.
3. Write the stories using the project's story format (Component Story Format), with args for props and network mocks at the boundary for data. Name each story after the state it shows.
4. Add play functions for the interactive stories: find elements by role and accessible name, interact with `userEvent`, and assert with `expect` on visible results and on callbacks passed as spied args. Await every step.
5. Wire or confirm the test run for CI with the tool that matches the project's Storybook version, run it, and report results.
</task>

<constraints>
- Query by role, label or text; use test ids only when there is no accessible name.
- No fixed waits in play functions; use findBy queries or waitFor.
- Do not mock the component's internals; mock only the network and global providers.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## States and interactions
Table: story name, state or interaction, what the play function asserts.
## Stories
The stories file.
## Test run in CI
The configuration and command.
## Check
Commands run and results.
</output_format>
