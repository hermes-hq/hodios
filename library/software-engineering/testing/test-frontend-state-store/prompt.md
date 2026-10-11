---
schema: 1
id: test-frontend-state-store
kind: prompt
title: Test a frontend state store
description: Tests an existing Redux Toolkit slice, Zustand store or Pinia store through its public actions and selectors, with a fresh store per test, async actions against a mocked network and no leaked state.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer]
stack: [react, vue]
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
tags: [redux-toolkit, zustand, pinia, selectors, async-actions]
pairs_with:
  prompts: [write-component-tests, mock-http-with-msw, test-react-hooks]
  personas: [frontend-engineer, test-engineer]
args:
  - name: store
    description: The slice or store to test, as a path or pasted code, with the API calls its async actions make.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Behaviours, Setup, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer who tests state stores as small public APIs: dispatch or call an action, then read state through the selectors or getters the UI uses. Tests that inspect internal state shape or assert which action types were dispatched break on every refactor and miss real bugs.

Library specifics:
- Redux Toolkit: build a real store per test with the app's `configureStore` setup function (a `setupStore(preloadedState)` helper) so middleware and listeners run. Test reducers with plain calls only for pure logic; test `createAsyncThunk` and RTK Query by dispatching against a mocked network (MSW or a mocked base query) and asserting pending, fulfilled and rejected outcomes through selectors. Memoised selectors (`createSelector`) deserve a test that the same input returns the same reference when re-renders matter.
- Zustand: stores are module singletons, so state leaks between tests unless reset. Capture the initial state and call `useStore.setState(initial, true)` in `beforeEach`, or follow Zustand's documented test setup that resets all stores. Call actions with `useStore.getState().action()` without rendering.
- Pinia: call `setActivePinia(createPinia())` in `beforeEach` for unit tests; use `createTestingPinia` from `@pinia/testing` when mounting components, remembering it stubs actions by default (`stubActions: false` to run them). Test getters by setting state and reading them.
- Persistence middleware (redux-persist, Zustand `persist`, Pinia plugins) needs storage mocked or reset, and version migrations need their own test with old saved state.
- Async actions: assert the loading flag, the success state and the error state, including a request that resolves after a newer one (stale response) if the code guards against it.
</context>

<task>
Write tests for {{store}}.

1. Read the store, its selectors or getters, async actions, middleware or plugins, the components that use it, the test runner config and existing tests. Note library versions.
2. List the behaviours as action-then-observed-state pairs, including initial state, each action, derived values, async loading, success and failure, and persistence or migration if present.
3. Set up isolation: a store factory per test for Redux, a reset in `beforeEach` for Zustand, a fresh active Pinia for Pinia; mock the network at the boundary (MSW or the project's existing API mock) and storage for persistence.
4. Write the tests through public actions and selectors only, with readable names stating the behaviour. Await async actions and assert each phase.
5. Run the tests and report results. If a behaviour cannot be tested without reaching into internals, say what seam would help.
</task>

<constraints>
- Do not assert on dispatched action type lists or private state fields when a selector or getter exposes the behaviour.
- Do not share a store instance across tests.
- Do not mock the store library itself.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Behaviours
Table: action or sequence, observed state or selector result.
## Setup
Store factory or reset, network and storage mocks.
## Tests
The test files.
## Check
Commands run and results.
</output_format>
