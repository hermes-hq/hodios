---
schema: 1
id: set-up-automated-accessibility-checks
kind: prompt
title: Set up automated accessibility checks
description: Adds layered automated accessibility checks to a web or mobile project (editor lint, component tests, CI page scans with a baseline) and states what automation cannot catch.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, mobile-engineer, qa-engineer]
requires: [none]
inputs: [config, file, text]
output: [config, tests, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [axe-core, ci-checks, linting, regression-testing, baseline, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [write-screen-reader-test-plan, audit-web-accessibility, prioritize-accessibility-findings]
  workflows: [accessibility-fix-sweep-track]
args:
  - name: tech_stack
    description: Framework, test runner and build tools, for example "Next.js 14, Jest, Playwright" or "SwiftUI with XCTest" or "Jetpack Compose with Espresso".
    type: string
    required: true
  - name: ci_system
    description: The CI system, for example "GitHub Actions", "GitLab CI", "CircleCI". Leave empty to show a generic job.
    type: string
  - name: existing_tests
    description: Relevant existing config or test files (lint config, a sample component test, the end-to-end setup), so new checks fit in.
    type: text
output_contract:
  format: markdown
  sections: [Layers, Configuration, Baseline and rollout, What automation misses]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Automated checks catch a meaningful share of accessibility issues (missing names, invalid ARIA, contrast, missing labels and alt attributes) cheaply and early, and stop regressions. They also fail in predictable ways when set up badly: a CI scan added to an app with 400 existing violations blocks every merge on day one, so someone disables it; scans that only load the page miss everything behind a click; snapshot-style assertions break on every copy change; and a green check is taken as proof of accessibility. Experienced teams layer the checks (editor, component, page), scan interactive states, use a baseline so only new violations fail, and write down what still needs manual testing.
</context>

<task>
Set up automated accessibility checks for: {{tech_stack}}. CI: {{ci_system}} (generic job if empty).

{{#existing_tests}}
<existing_tests>
{{existing_tests}}
</existing_tests>
{{/existing_tests}}

1. Choose layers that fit the stack and say what each catches:
   - Editor and lint: for example `eslint-plugin-jsx-a11y` (React), `eslint-plugin-vuejs-accessibility`, `@angular-eslint` template accessibility rules, Svelte's built-in a11y warnings; Android Lint accessibility checks; SwiftLint has little here, so lean on tests for iOS.
   - Component tests: an accessibility engine on rendered components (for example axe-core via `jest-axe` or `vitest-axe`, or Storybook's accessibility addon in test runs); for mobile, the Accessibility Test Framework (Espresso `AccessibilityChecks.enable()`) or `XCUIApplication().performAccessibilityAudit()` on recent Xcode.
   - Page or flow scans: axe-core in Playwright or Cypress end-to-end tests, run on key routes and in key states (menu open, dialog open, form errors shown, dark mode, narrow viewport), or a crawler such as pa11y-ci for many static pages.
2. Write the configuration and one example test per layer, following the existing test style. Pin the WCAG tags to scan (for example `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`) and say how to add best-practice rules separately.
3. Baseline: record current violations by rule and target, fail CI only on new ones, and print the remaining count so it trends down. Never hide violations with blanket rule disables; any disable needs a comment with the reason and an issue link.
4. Rollout: start the page scan as non-blocking for one or two weeks, fix the top shared-component violations, then make it blocking. Keep runtime reasonable (parallelise or limit to key routes).
5. Reporting: make failures readable in CI (rule, element, help link) and attach artifacts.
</task>

<constraints>
- Use only tools and APIs you are confident exist for this stack; mark anything uncertain [check version].
- Do not claim that passing these checks means conformance. Be explicit about the gap.
- Fit the existing test setup; do not introduce a second test runner unless there is none.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Layers
Table: Layer | Tool | Runs when | Catches | Misses.

## Configuration
Install commands, config files and one example test per layer, plus the CI job.

## Baseline and rollout
The baseline mechanism with code, and a dated rollout plan in weeks.

## What automation misses
Bullets of what still needs manual or assistive-technology testing (meaningful alt text and names, focus order and management, screen reader announcements, reflow and zoom, cognitive load, captions quality), and how often to do it.
</output_format>
