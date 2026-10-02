---
schema: 1
id: reduce-bundle-size
kind: prompt
title: Reduce JavaScript bundle size
description: Measures a web app's JavaScript bundles, finds the largest avoidable contributors, and shrinks them with verified changes ranked by bytes saved. Use when page load is slow or a size budget is blown.
category: performance
version: 1.0.0
status: experimental
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript, typescript]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report, table]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bundle-size, code-splitting, tree-shaking, web-vitals]
args:
  - name: target
    description: The app, page or entry point to shrink.
    type: text
    required: true
  - name: budget
    description: The size budget, for example "initial JavaScript under 170 KB compressed".
    type: string
    default: "as small as the changes below allow; report the savings"
output_contract:
  format: markdown
  sections: [Result, Biggest contributors, Changes made, Proposals not applied, How to measure again]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
JavaScript is the most expensive byte on the web: it has to be downloaded, parsed and executed before the page responds. Most bundles carry avoidable weight: whole libraries imported for one function, duplicate versions, code for routes the user has not visited, and polyfills for browsers the app does not support. Savings only count when measured on the production build, compressed.
</context>

<task>
Reduce the bundle size of: {{target}}
Budget: {{budget}}.

1. Identify the bundler and build. Produce a production build and record the baseline: the initial JavaScript loaded by the target page and the total, both compressed (gzip or brotli, whichever the server uses).
2. Generate a bundle analysis with the tool that fits the bundler (for example a bundle visualizer plugin, the bundler's stats output, or source-map-explorer).
3. List the largest contributors and classify each: needed on first load, needed only later or on another route, duplicated, imported wholesale but used partly, polyfill or dead code that was not tree-shaken, or a large asset inlined into JavaScript.
4. Fix in order of bytes saved per effort: lazy-load routes and heavy components with dynamic imports, switch to per-function or ESM imports, deduplicate versions, drop polyfills outside the supported browser list, and mark side-effect-free packages so they tree-shake.
5. Rebuild after each change and record the size difference. Run the tests and check that the affected pages still work.
</task>

<constraints>
- Do not remove features or change behaviour to save bytes.
- Replacing a dependency with another is a proposal, not a change, unless the swap is trivial and fully covered by tests.
- Report compressed sizes from real builds. Never estimate savings you did not build.
- Keep lazy-loading changes from causing layout shift or an empty screen; add a loading state where one is needed.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: initial JavaScript before and after (compressed), total before and after, and whether the budget is met.
## Biggest contributors
Table: module or package, compressed size, classification.
## Changes made
Numbered: change — bytes saved (compressed) — verification.
## Proposals not applied
Bullets: proposal — expected saving as a hypothesis — trade-off.
## How to measure again
The exact commands.
</output_format>
