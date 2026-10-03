---
schema: 1
id: write-visual-regression-tests
kind: prompt
title: Write visual regression tests
description: Writes visual regression tests for UI components with deterministic snapshots, tight diff thresholds, a state matrix and CI setup. Use when CSS changes keep breaking screens nobody rechecked.
category: testing
version: 1.0.0
status: incubating
stage: [verify]
role: [frontend-engineer, qa-engineer, designer]
stack: []
requires: [repo-read, file-write]
inputs: [repo, file, text]
output: [tests, config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [visual-regression, screenshot-testing, snapshots, ui-components]
pairs_with:
  prompts: [write-e2e-test]
args:
  - name: components
    description: Components or pages to cover, their important states (empty, loading, error, long content, disabled, hover, focus) and how they render today (Storybook stories, routes, test harness).
    type: text
    required: true
  - name: tool
    description: Visual testing tool, for example Playwright screenshots, Storybook test runner with Chromatic, Percy, Loki or BackstopJS. Leave empty to have one recommended from the stack.
    type: string
output_contract:
  format: markdown
  sections: [Approach, State matrix, Tests, Stabilisation, CI, Baseline workflow]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Visual tests fail for two reasons: the UI really changed, or the screenshot is not deterministic. The second kind kills suites, because once a team learns to click "update all baselines", real regressions get approved too. Nondeterminism comes from fonts rendering differently across operating systems, animations and carets caught mid-frame, dates, random or remote data, lazy images, scrollbars and viewport size. A suite that lasts captures the states that matter, removes every source of noise before setting a threshold, and makes baseline updates a reviewed change.
</context>

<task>
Write visual regression tests for:
<components>
{{components}}
</components>
{{#tool}}Use {{tool}}.{{/tool}}

1. If you can read the repository, find how components are rendered in isolation (Storybook, a test harness, routes) and any existing visual setup, and build on it. If no tool is given, recommend one from the stack in one sentence: Playwright `toHaveScreenshot` when Playwright is present, the Storybook test runner or a hosted service when stories already exist.
2. Build a state matrix: each component by its meaningful states, plus viewport widths (one narrow, one wide unless told otherwise) and themes the product supports (light, dark, right-to-left). Cap the matrix at what someone will actually review; explain what you left out.
3. Stabilise before snapshotting:
   - fix viewport and device scale factor;
   - wait for web fonts (`document.fonts.ready`) and images to load;
   - disable animations and transitions and hide the text caret;
   - freeze time and seed or mock data and network responses;
   - mask or hide regions that are legitimately dynamic (avatars from a CDN, timestamps, ads), and say what each mask covers.
4. Prefer component-level screenshots of the element over full pages; take full pages only for layout-level checks.
5. Set the diff threshold last, small and explicit (for example a max diff pixel ratio around 0.01), and explain that a larger threshold hides regressions.
6. Configure CI to render in one pinned environment (the same container image locally and in CI), so font rendering matches, and to upload the diff images as artifacts when a test fails.
7. Describe the baseline workflow: baselines are generated in that same environment, updated only in a commit that reviewers can see, and never updated in bulk to make CI green.
</task>

<constraints>
- Do not snapshot states you cannot make deterministic; list them as manual checks instead.
- Do not fold functional assertions into visual tests; keep behaviour checks in the existing unit or end-to-end suites.
- Name screenshots after component, state, viewport and theme so a failing diff explains itself.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Approach
Tool, where tests live and why, in three or four bullets.
## State matrix
Table: component, states, viewports, themes.
## Tests
Code blocks with file paths.
## Stabilisation
Bullets: each noise source and how it is removed.
## CI
The CI job or config, with the pinned image.
## Baseline workflow
Numbered steps for creating, reviewing and updating baselines.
</output_format>
