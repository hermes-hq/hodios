---
schema: 1
id: write-component-tests
kind: prompt
title: Write UI component tests
description: Writes tests for a React, Vue or Svelte component that render it, interact like a user through accessible queries, mock the network at the boundary and assert what the user sees, not internals.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, qa-engineer]
stack: [react, vue, svelte]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [testing-library, component-tests, user-event, mock-service-worker, jsdom]
pairs_with:
  prompts: [write-e2e-test, write-visual-regression-tests]
  personas: [test-engineer, frontend-engineer]
args:
  - name: component
    description: The component to test, as a path or pasted code, with its props and the hooks, stores or API calls it uses.
    type: text
    required: true
  - name: behaviours
    description: Optional. The behaviours that matter most, for example "shows validation errors, disables submit while saving, shows the server error message".
    type: text
output_contract:
  format: markdown
  sections: [Behaviours to cover, Test setup, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend test engineer. Component tests sit between unit tests and end-to-end tests: they render one component, or a small tree, in a simulated DOM (jsdom or happy-dom) or a real browser runner, and drive it the way a user would. They catch most UI logic bugs in milliseconds, and they break needlessly when they test implementation details.

Good component tests:
- Query by role and accessible name, label text or visible text (`getByRole('button', { name: 'Save' })`), which also checks the component is accessible; fall back to test ids only for elements with no accessible name.
- Interact with `user-event` (or the framework equivalent), which types, clicks and tabs like a browser, rather than firing synthetic events.
- Wait for asynchronous changes with `findBy` queries or `waitFor`, never fixed timeouts.
- Mock the network at the HTTP boundary (Mock Service Worker or the project's fetch mock), not the component's own hooks or child components.
- Render with the real providers the component needs (router, store, theme, i18n) through a shared helper.
- Assert on output the user sees or the callback a parent receives, not on state, instance methods, CSS class names or snapshot dumps of the whole tree.
</context>

<task>
Write component tests for:
{{component}}

{{#behaviours}}Priorities: {{behaviours}}{{/behaviours}}

1. Read the component and the project's existing test setup (runner, Testing Library flavour, providers, network mocking, custom render helper). Reuse what exists.
2. List the behaviours worth testing: rendering for each meaningful prop and data state (loading, empty, error, populated), each user interaction and its visible result, validation, disabled and busy states, callbacks to the parent, and keyboard use for interactive widgets.
3. Write one test per behaviour, named as the behaviour, using accessible queries, `user-event`, network mocks at the HTTP boundary and `findBy` for async results. Put shared rendering in a helper only if three or more tests need it.
4. Run the tests and fix failures. For each test, make it fail once by breaking the behaviour (or explain how you checked it can fail), so none pass vacuously.
5. Note anything that a component test cannot cover well (real layout, scrolling, cross-page flows) and should go to an end-to-end or visual test instead.
</task>

<constraints>
- Do not mock the component under test, its child components or React or Vue internals, unless a child is a heavy third-party widget; say so when you do.
- No full-tree snapshot tests as the main assertion; no fixed sleeps; no querying by CSS class or DOM structure.
- If a needed element has no accessible name, flag it as an accessibility issue rather than silently adding a test id.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Behaviours to cover
Numbered list.
## Test setup
Runner, render helper, providers and network mocking used or added.
## Tests
The test file.
## Check
Command run, results, and how each test was shown to fail when the behaviour breaks.
</output_format>
