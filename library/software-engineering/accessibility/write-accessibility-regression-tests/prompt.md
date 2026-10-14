---
schema: 1
id: write-accessibility-regression-tests
kind: prompt
title: Write accessibility regression tests
description: Writes component and end-to-end tests that assert roles, accessible names, keyboard behaviour and focus, so accessibility fixes stay fixed after refactors.
category: accessibility
version: 1.0.0
status: incubating
stage: [verify]
role: [frontend-engineer, qa-engineer, fullstack-engineer]
stack: [javascript, typescript]
requires: [repo-read, file-write, shell]
inputs: [file, repo, text]
output: [tests, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [testing-library, playwright, keyboard, focus-management, regression]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [set-up-automated-accessibility-checks, fix-keyboard-navigation, write-component-tests]
args:
  - name: component_or_flow
    description: The component or user flow to protect, its code or file paths, and the accessibility behaviour it must keep (for example "dialog returns focus to its trigger").
    type: text
    required: true
  - name: test_stack
    description: Test runner and libraries in use, for example "Vitest with Testing Library" or "Playwright".
    type: string
    required: true
  - name: fixed_bug
    description: The accessibility bug that was fixed, if these tests guard a specific fix.
    type: text
output_contract:
  format: markdown
  sections: [Behaviours to lock in, Tests, What these tests cannot prove]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A scanner in CI catches missing names and bad ARIA attributes, but most regressions that hurt keyboard and screen-reader users are behavioural: focus no longer returns to the trigger, Escape stops closing the popup, arrow keys stop moving between tabs, an error message is no longer tied to its field. Those only stay fixed if a test asserts them. Tests that query by role and accessible name (`getByRole('button', { name: 'Save' })`) double as accessibility checks, because they fail when the name or role disappears. Tests that query by test id or CSS class do not. Keyboard tests must use real key events through the library's user-event or the browser driver, not by calling handlers directly, and focus is checked with the document's active element, not with a class.
</context>

<task>
Write accessibility regression tests in {{test_stack}} for:

<component_or_flow>
{{component_or_flow}}
</component_or_flow>
{{#fixed_bug}}
Bug that was fixed: {{fixed_bug}}
{{/fixed_bug}}

1. Read the component and its existing tests. Match the file layout, helpers and naming already used.
2. List the accessibility behaviours to lock in, each as one sentence a reviewer can check: role and accessible name of each control, states (`aria-expanded`, `aria-selected`, `aria-invalid`, `aria-current`), keyboard operation (Tab order, Enter, Space, Escape, arrow keys, Home, End), where focus goes on open, close, submit, delete and error, and which text is associated as a description or error.
3. Write the tests. Query by role and name. Drive the keyboard with user-event or the browser driver's keyboard. Assert focus with the active element. Assert associations through accessible description or name, not by reading attribute strings when a semantic query exists. If the project has an axe integration, add one scan per meaningful state (closed, open, error), not one per test.
4. If guarding a fixed bug, write the test so it would have failed before the fix; state how you know.
5. Run the new tests and report the result. If a test fails because of a real bug, report the bug rather than weakening the test.
6. State what the tests cannot prove: actual screen-reader speech, live region timing across screen readers, visual focus indicators, zoom.
</task>

<constraints>
- No assertions on implementation details such as class names or internal state when a role, name or focus assertion exists.
- Do not add test ids to production code just to make tests easier when a role query works.
- Do not mock the component's own keyboard handling.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Behaviours to lock in
Numbered list.

## Tests
The test file or files with paths, then the command run and its result.

## What these tests cannot prove
Bullets with the manual check that covers each.
</output_format>
