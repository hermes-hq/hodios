---
schema: 1
id: write-e2e-test
kind: prompt
title: Write a resilient end-to-end test
description: Writes an end-to-end browser test for a user flow with role-based locators, auto-waiting assertions and isolated test data, never fixed sleeps. Use when adding UI coverage for a critical path.
category: testing
version: 1.0.1
status: incubating
aliases: [test-e2e]
stage: [verify]
role: [qa-engineer, frontend-engineer, software-engineer]
stack: []
requires: [repo-read]
inputs: [spec, text, repo]
output: [tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [e2e, playwright, cypress, selenium, flaky-tests, locators]
pairs_with:
  personas: [test-engineer, frontend-engineer]
args:
  - name: flow
    description: The user flow to cover, step by step, plus the URL, routes or page source if you have them.
    type: text
    required: true
  - name: tool
    description: End-to-end framework to write the test for.
    type: enum
    enum: [playwright, cypress, selenium]
    default: playwright
output_contract:
  format: markdown
  sections: [Test plan, Test, Assumptions to verify, How to run]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id test-e2e."}
---
<context>
End-to-end tests are the most expensive tests to keep green. They become flaky when they locate elements by CSS structure or generated class names, wait with fixed sleeps, share data between runs, or assert on things a user never sees. A resilient test finds elements the way a user or assistive technology does (role and accessible name, label, visible text), waits on conditions instead of time, owns its data, and checks the outcome the user cares about.
</context>

<task>
Write a {{tool}} test for this flow:
{{flow}}

1. Restate the flow as numbered user actions, each with the observable outcome that proves it worked. If a step's expected outcome is not stated, ask for it or mark your assumption.
2. If you have the repository, read the relevant pages or components and any existing e2e setup (config, fixtures, page objects, auth helpers, test-data factories) and reuse them. Match the existing style. If the project already uses a different end-to-end framework than {{tool}}, say so and ask which to use before writing.
3. Locators, in this order of preference:
   - Playwright: `getByRole` with name, then `getByLabel`, `getByPlaceholder`, `getByText`, then `getByTestId` as a last resort.
   - Cypress: Testing Library queries (`findByRole`, `findByLabelText`) if the project has them, otherwise `cy.contains` scoped to a container, then `data-testid`/`data-cy`.
   - Selenium: accessible attributes, labels and visible text via stable XPath or CSS on `data-testid`; never absolute XPath.
   Never use generated class names, nth-child chains or DOM position.
4. Waiting: use auto-retrying, web-first assertions (Playwright `expect(locator).toBeVisible()`/`toHaveText()`, Cypress `should`, Selenium `WebDriverWait` with expected conditions). Wait for a specific network response or UI state when an action triggers one. No `waitForTimeout`, `cy.wait(<ms>)` or `Thread.sleep`.
5. Isolation: create the data the test needs through an API, fixture or seed helper, with unique values per run, and clean it up or make it disposable. Log in through a stored session or API helper rather than the login form, unless login is the flow under test.
6. Assert the user-visible outcome at each checkpoint, plus one durable side effect if it matters (the saved record, the confirmation email stub), not implementation details.
</task>

<constraints>
- Do not invent selectors, routes or accessible names you have not seen. When the page source is not available, write the most likely role and name, and list each one under "Assumptions to verify".
- One flow per test. Keep the test independent of test order.
- If a step depends on a third-party service (payments, email, maps), stub it at the network layer and say so.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Test plan
Numbered steps: action, then expected outcome.
## Test
The complete test file in one code block, including setup and teardown helpers it needs.
## Assumptions to verify
Bullets: each selector, route or data assumption you could not confirm. Or "None".
## How to run
The command to run this one test headed and headless, and how to see the trace or screenshots on failure.
</output_format>
