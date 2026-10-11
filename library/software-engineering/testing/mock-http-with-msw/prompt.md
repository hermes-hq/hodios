---
schema: 1
id: mock-http-with-msw
kind: prompt
title: Mock HTTP with Mock Service Worker
description: Sets up Mock Service Worker handlers shared by unit tests, Storybook and local development, with per-test overrides, error and latency scenarios and strict handling of unmocked requests.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write, shell]
inputs: [file, repo, schema]
output: [tests, config, code]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [msw, network-mocking, jest, vitest, storybook]
pairs_with:
  prompts: [write-component-tests, mock-modules-in-jest-or-vitest, build-fake-for-external-api]
  personas: [frontend-engineer, test-engineer]
args:
  - name: api
    description: The API the frontend calls (endpoints, a typed client, or an OpenAPI or GraphQL schema) and where requests are made in the code.
    type: text
    required: true
  - name: environments
    description: Where the mocks should run, for example "Vitest with jsdom, Storybook, and the dev server behind a flag".
    type: string
output_contract:
  format: markdown
  sections: [Layout, Handlers, Wiring, Example tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer who mocks the network, not the modules that call it. Mock Service Worker intercepts real requests made by fetch, axios or a GraphQL client, so the app's own client code, headers, serialisation and error handling are exercised. One set of handlers can serve Node tests (`setupServer` from `msw/node`), the browser for Storybook and local development (`setupWorker` from `msw/browser` with the generated service worker file), and React Native (`msw/native`).

What makes an MSW setup good:
- MSW 2.x uses `http.get(...)` and `graphql.query(...)` with `HttpResponse.json(...)`; 1.x used `rest` and `res(ctx.json())`. Check the installed version before writing handlers.
- Handlers hold happy-path defaults built from typed fixtures or factories that match the real API shape. Tests override with `server.use(...)` for errors, empty lists and slow responses; `server.resetHandlers()` in `afterEach` removes those overrides.
- `onUnhandledRequest: 'error'` in tests makes a forgotten mock fail loudly instead of hitting the network or hanging.
- Error scenarios worth ready-made overrides: 401 (expired session), 403, 404, 422 with a validation body, 500, network failure (`HttpResponse.error()`), and latency (`await delay(...)`) for loading states.
- To assert what was sent, read the request body in a handler override or listen to `server.events`, rather than spying on the client module.
- Node test environments need `fetch`, `Request` and `Response` globals (Node 18+) and jsdom polyfills in some Jest setups; Vitest with jsdom or happy-dom usually works directly.
Keeping handlers in sync with the real API is the long-term risk; generating fixtures from an OpenAPI or GraphQL schema, or typing handlers with the API client's types, makes drift a compile error.
</context>

<task>
Set up MSW for this API{{#environments}} in {{environments}}{{/environments}}:

{{api}}

1. Read the API client code, the test runner config and setup files, Storybook config and existing mocks (module mocks of the client, ad-hoc fetch stubs). Check whether MSW is installed and which major version.
2. Propose a layout: `mocks/handlers` grouped by resource, typed fixtures or factories, `mocks/node.ts` for tests, `mocks/browser.ts` for Storybook and dev.
3. Write default handlers for the endpoints in use, typed against the API client or schema, plus a small set of reusable error, empty and delay overrides.
4. Wire it up: test setup with `server.listen({ onUnhandledRequest: 'error' })`, `resetHandlers` after each test and `close` after all; Storybook through the MSW addon or loader with per-story handlers; the dev server behind an explicit flag so it never runs in production builds.
5. Convert one or two existing tests that mock the client module to use MSW, showing a per-test error override and an assertion on the request body.
6. Run the tests and report results, plus any handlers that could not be typed against the real API.
</task>

<constraints>
- The browser worker must only start behind an explicit development flag; never in production bundles.
- Do not hand-write response shapes that contradict the API schema or client types; derive them or flag the gap.
- Do not migrate every existing test in one change; convert examples and list the rest.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Layout
Files and folders for handlers, fixtures and setup.
## Handlers
Default handlers and the reusable overrides.
## Wiring
Test setup, Storybook and dev server configuration.
## Example tests
The converted tests.
## Check
Commands run and results.
</output_format>
