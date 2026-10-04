---
schema: 1
id: accessibility-fix-sweep-track
kind: workflow
title: Accessibility fix sweep for a web app
description: Fixes accessibility issues across a web app with a scan, keyboard and accessibility-tree checks, small fixes, a re-scan and a list for human testing. Use to clear accessibility debt in a sprint.
category: accessibility
version: 1.0.0
status: incubating
stage: [discover, verify, build]
role: [frontend-engineer, software-engineer]
stack: [html-css]
requires: [repo-read, file-write, shell]
inputs: [repo, url]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [wcag, axe, keyboard-navigation, screen-reader, aria, a11y-fixes]
pairs_with:
  prompts: [audit-web-accessibility, fix-keyboard-navigation, fix-form-accessibility, write-screen-reader-test-plan]
  personas: [accessibility-specialist]
  rules: [frontend-accessibility-rules]
args:
  - name: app_url_or_routes
    description: The local URL of the running app and the routes or user flows to cover, most important first, for example "http://localhost:3000 - sign up, checkout, account settings".
    type: text
    required: true
  - name: scan_command
    description: An existing accessibility scan command, for example an axe or pa11y script. Leave empty to use what the project already has or a local axe-based run.
    type: string
  - name: standard
    description: The conformance target to measure against.
    type: string
    default: WCAG 2.2 AA
steps:
  - {id: scan, file: steps/01-scan.md, stage: discover, gate: none, artifact: "a11y-sweep/01-scan.md"}
  - {id: manual-checks, file: steps/02-manual-checks.md, stage: verify, gate: approve, artifact: "a11y-sweep/02-findings-and-plan.md"}
  - {id: fix, file: steps/03-fix.md, stage: build, gate: none}
  - {id: rescan-report, file: steps/04-rescan-report.md, stage: verify, gate: none, artifact: "a11y-sweep/04-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Fixes accessibility problems in this web app against {{standard}}, at the source. Automated scanners find only part of the problems, mostly missing names, contrast and invalid ARIA; keyboard traps, confusing focus order and unannounced updates need a person or an agent driving the page. This track combines both, fixes issues in the shared components they come from, and ends with an honest list of what still needs testing with real assistive technology.

Rules for every step:
- Report only what a scan or a check actually showed, with the route, element and how it was found.
- Fix at the source: the shared component, design token or layout, not one instance at a time.
- Prefer native HTML elements and attributes over ARIA. Add ARIA only where no native element fits, and then follow the ARIA Authoring Practices pattern for that widget.
- Never claim the app conforms to {{standard}}. Automated and agent checks support a conformance review; they do not replace one.
- Do not silence scanner rules, add `aria-hidden` to hide failures, or exclude routes to improve the numbers.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
