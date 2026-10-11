---
schema: 1
id: write-page-objects-for-e2e
kind: prompt
title: Structure an E2E suite with page objects
description: Restructures an end-to-end suite with page objects or fixtures so locators and user flows live in one place, without hiding assertions or building a deep class hierarchy.
category: testing
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [qa-engineer, frontend-engineer, software-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [tests, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [e2e, page-object-model, test-maintainability, locators]
pairs_with:
  prompts: [write-e2e-test, refactor-test-suite, set-up-playwright-in-ci]
  personas: [test-engineer]
args:
  - name: suite
    description: The end-to-end suite or files to restructure, the framework (Playwright, Cypress, Selenium, WebdriverIO), and the pages or flows involved.
    type: text
    required: true
  - name: pain
    description: What hurts today, for example a UI change breaking 40 tests, copy-pasted login steps, unreadable tests.
    type: text
output_contract:
  format: markdown
  sections: [Current problems, Design, Changes, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When locators and multi-step interactions are copied into every test, one UI change breaks dozens of files. Page objects (or component objects, or framework fixtures and custom commands) fix this by owning how to find and operate a page or component, so tests read as user intent. They go wrong in predictable ways: deep inheritance trees of base pages, god objects for a whole app, page objects that make assertions so tests no longer show what they check, methods that return nothing and force sleeps, and wrappers around every single click. The useful shape is thin: one object per page or significant component, locators defined once using roles and labels, methods for meaningful user actions that wait on the resulting state, and assertions left in the test (or exposed as locators the test asserts on). In Playwright, fixtures that construct page objects keep setup out of tests; in Cypress, custom commands or plain modules are the idiom rather than classes.
</context>

<task>
Restructure this suite:
{{suite}}
{{#pain}}

Pain today: {{pain}}
{{/pain}}

1. Read the suite: test files, helpers, config and any existing page objects or commands. List the duplicated locators and step sequences with counts, and the most change-prone selectors.
2. Design the structure in the framework's idiom: which page or component objects to create, the methods each exposes (named for user actions, such as `addToCart(product)`), where locators live, and how tests obtain the objects (fixtures, constructors, commands). Keep it flat; composition for shared components (header, modals), no base-class chains.
3. Show the design for review before changing many files. On approval, implement it on the most duplicated flow first.
4. Migrate tests incrementally: replace duplicated locators and steps with the objects, keep each test's assertions visible in the test, and replace brittle selectors with role, label or test-id locators while moving them.
5. Make action methods wait on the resulting state (navigation, a visible element, a response) so tests need no sleeps.
6. Run the affected tests after each migrated group; behaviour and pass rate must be unchanged. If a test was already failing, note it and leave it failing rather than changing its assertions.
7. Report what remains to migrate, if anything.
</task>

<constraints>
- No assertions hidden inside page objects except waits that confirm an action completed.
- No inheritance hierarchies deeper than one level, and no single object for the whole app.
- Do not change what tests verify; this is a structural change.
- No fixed sleeps.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current problems
Duplication and brittle selectors found, with counts.

## Design
The objects, their methods and how tests get them.

## Changes
Diffs: new objects, then migrated tests.

## Verification
Test runs before and after, and what remains to migrate.
</output_format>
