---
schema: 1
id: migrate-enzyme-to-testing-library
kind: prompt
title: Migrate Enzyme tests to React Testing Library
description: Rewrites Enzyme tests to React Testing Library, replacing shallow rendering, instance and state checks with user-facing queries and events, keeping what each test proves.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, qa-engineer]
stack: [react]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [tests, diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [enzyme, testing-library, component-tests, user-events]
pairs_with:
  prompts: [migrate-test-framework-track, upgrade-react-major-version]
args:
  - name: scope
    description: Which test files or folders to migrate, or "all".
    type: string
    default: "all"
  - name: notes
    description: Test runner, React version, custom render helpers, providers the components need (store, router, theme, i18n).
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Approach, Changes made, Coverage kept, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Enzyme has no adapter for React 18 or later, so it blocks React upgrades, but a mechanical port of Enzyme tests produces tests that are worse than either library. Enzyme tests usually assert on implementation: `shallow` rendering that never mounts children, `wrapper.state()`, `wrapper.instance().method()`, `find('ChildComponent').props()`, and `simulate('click')` that skips real event behaviour. React Testing Library deliberately cannot do those things. The migration is a rewrite of each test around what the user sees: find elements by role, label or text (`getByRole` first, `getByTestId` last), interact with `user-event` (async, realistic) rather than `fireEvent` where possible, and assert on visible output or calls to props and network mocks. Shallow rendering becomes full rendering with providers and, where a child is heavy, a module mock of that child. Tests that only checked internal state may have no user-facing equivalent; those should be rewritten to check the behaviour the state drives, or deleted with a note, not translated into fragile DOM checks. Async UI needs `findBy*` or `waitFor`, not arbitrary timeouts.
</context>

<task>
Migrate the Enzyme tests in scope ({{scope}}) to React Testing Library.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Inventory Enzyme use: files, counts of `shallow`, `mount`, `render`, `.state()`, `.instance()`, `.setProps()`, `.simulate()`, `find(Component)`, snapshot tests, and custom helpers or adapters.
2. Run the test suite and record which tests pass today. Note flaky ones separately.
3. Create or reuse a single `render` helper that wraps components in the providers they need (store, router, theme, i18n, query client). Check the repo for an existing one first.
4. Migrate one file at a time. For each test, write down in one line what behaviour it proves, then rewrite it: render, query by role, label or text, act with `user-event`, assert on what the user sees or on mocked callbacks and requests.
5. For tests that only check internal state or instance methods, find the user-visible behaviour that state controls and test that instead. If there is none, propose deleting the test and say why.
6. Replace shallow rendering of heavy children with a module mock only when full rendering is slow or needs unavailable setup.
7. Remove the Enzyme adapter, setup file and packages only when no test uses them.
8. Run the suite after each file; compare pass counts with the baseline and run the migrated files several times to catch flakiness.
</task>

<constraints>
- Every migrated test must still fail when the behaviour it covers breaks. Briefly break the code locally for a sample of tests to prove it, then revert.
- Do not query by class names, component display names or DOM structure when a role, label or text query works.
- Do not replace removed coverage with snapshots of the whole tree.
- No fixed sleeps; use `findBy*` or `waitFor`.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Files and counts per Enzyme pattern.
## Approach
Render helper, query and event conventions used, mocking decisions.
## Changes made
Per file: tests migrated, rewritten around behaviour, or proposed for deletion with reason.
## Coverage kept
Table: test, behaviour proved, checked by breaking the code (yes or no).
## Verification
Pass counts before and after, repeated runs, Enzyme removal status.
</output_format>
