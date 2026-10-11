---
schema: 1
id: test-nextjs-server-components
kind: prompt
title: Test Next.js server components and actions
description: Tests a Next.js App Router feature across server components, server actions and route handlers, choosing unit, integration or end-to-end tests for each part and isolating data access.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [fullstack-engineer, frontend-engineer]
stack: [nextjs, typescript]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [app-router, server-components, server-actions, route-handlers, playwright]
pairs_with:
  prompts: [write-component-tests, write-e2e-test, test-react-hooks]
  personas: [test-engineer]
args:
  - name: feature
    description: The App Router feature to test, with paths to its pages, layouts, server actions, route handlers and data access code.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Parts and test levels, Seams, Tests, Check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend test engineer working with the Next.js App Router. Testing tools have not caught up with it evenly. Synchronous server components can be rendered in Vitest or Jest with Testing Library, but async server components are not well supported by those tools, and Next.js documentation recommends end-to-end tests for them. Server actions and route handlers are plain async functions underneath, so the most reliable approach is to keep their logic in ordinary modules (validation, authorisation, data access) that are unit tested directly, and keep the action or component a thin layer that is covered by a few end-to-end tests with Playwright against `next build` and `next start` (not the dev server, whose behaviour differs).

What goes wrong in these features: a server action that trusts its input or skips the auth check because "only our form calls it" (actions are public HTTP endpoints), missing `revalidatePath` or `revalidateTag` so the page shows stale data after a mutation, caching that serves one user's data to another, `redirect` and `notFound` thrown inside try/catch and swallowed, and secrets imported into client components. Mocking `next/headers`, `next/navigation` and cookies is possible in unit tests but brittle; prefer passing what the logic needs as arguments.
</context>

<task>
Write tests for this Next.js App Router feature:

{{feature}}

1. Read the pages, layouts, server actions, route handlers and data layer. Check the Next.js and React versions in `package.json`, since behaviour and test support differ between versions.
2. Decide the level for each part and explain it: pure logic (validation, authorisation, data mapping) as unit tests; route handlers called directly with a constructed `Request`; client components with Testing Library; async server components and full mutation flows through end-to-end tests.
3. If logic is tangled inside actions or components, propose the smallest extraction into plain functions as a diff so it can be unit tested, keeping behaviour the same.
4. Write the tests: unit tests for validation and authorisation, including calling the action logic as an unauthorised user and with malformed input; route handler tests for status codes and bodies; and Playwright tests against a production build for the main flow, checking that after a mutation the page shows fresh data and that one user never sees another user's data.
5. Run the tests and report results, then list what remains untested.
</task>

<constraints>
- Treat every server action and route handler as a public endpoint in tests: check auth and input validation.
- Run end-to-end tests against a production build, not the dev server.
- Use a test database or mocked data layer; never point tests at production data.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Parts and test levels
Table: file, part type (server component, client component, action, route handler, logic), test level, reason.
## Seams
Any extraction diff.
## Tests
Unit, route handler, component and end-to-end tests.
## Check
Commands run and results.
## Gaps
What is not covered and why.
</output_format>
