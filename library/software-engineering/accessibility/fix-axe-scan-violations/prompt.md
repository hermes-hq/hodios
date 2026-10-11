---
schema: 1
id: fix-axe-scan-violations
kind: prompt
title: Fix automated accessibility scan violations
description: Takes axe, Lighthouse or WAVE output, explains each violation, fixes the code at its source and flags false positives and what the scan could not see.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, qa-engineer]
stack: [html-css]
requires: [repo-read, file-write]
inputs: [logs, repo, text]
output: [code, table, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [axe-core, lighthouse, wave, wcag, scan-results]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [set-up-automated-accessibility-checks, fix-accessible-names, review-color-contrast, prioritize-accessibility-findings]
  workflows: [accessibility-fix-sweep-track]
args:
  - name: scan_output
    description: The scan report as text or JSON (axe, Lighthouse, WAVE, Pa11y or a browser extension), including rule ids, selectors and HTML snippets.
    type: text
    required: true
  - name: framework
    description: The UI framework or templating system, so fixes land in components rather than rendered HTML.
    type: string
    default: react
  - name: scope_note
    description: Which pages or components were scanned and anything you already know is out of your control, such as a third-party widget.
    type: text
output_contract:
  format: markdown
  sections: [Violations grouped by cause, Fixes, Needs review and false positives, What the scan did not check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Automated scanners catch only part of WCAG failures (published estimates vary widely with how issues are counted), and the ones they catch cluster: one button component without a name shows up as 140 violations across a page. Fixing the rendered HTML node by node, or silencing a rule with `aria-label` everywhere, makes the count drop while the experience stays broken. The useful move is to group violations by the component or pattern that produces them, fix that source once, and treat "needs review" items (contrast over images, `aria-hidden` content that might be focusable, duplicate ids from portals) as questions a human must answer. Common traps: `color-contrast` failures on text over gradients are often unverifiable by the tool; `region` and `landmark-one-main` point to page structure, not to the flagged node; `aria-allowed-attr` usually means the wrong role, not a stray attribute; `nested-interactive` needs a redesign, not a role change.
</context>

<task>
Fix the violations in this scan of a {{framework}} codebase:

<scan_output>
{{scan_output}}
</scan_output>
{{#scope_note}}
Scope: {{scope_note}}
{{/scope_note}}

1. Parse the report. For each rule id, list the count, the WCAG success criterion it maps to, and the selectors. Group nodes that come from the same component, template or style token; name that source by searching the repository for the class names, test ids or text in the snippets.
2. For each group, explain in one or two sentences what a user experiences (for example "screen reader says 'button' with no name on every product card").
3. Fix each group at its source with the smallest correct change: visible text before `aria-label`, native elements before ARIA roles, corrected design tokens before per-element colour overrides, structural fixes (landmarks, heading order) in the layout component. Show each change as a diff or replaced block with file paths.
4. Separate items the tool marked as incomplete or needs review, and items you believe are false positives. For each, say why and what a person must check by hand. Never suppress a rule globally; if a rule must be disabled for a node, scope it to that selector with a comment giving the reason.
5. Flag violations inside third-party code you cannot change and suggest the realistic option (configuration, wrapper, upstream issue, replacement).
6. Rerun the scanner or the existing accessibility tests if available and report the before and after counts. If you cannot run them, say so.
7. List what this scan could not have checked for the scanned pages: keyboard order and traps, focus visibility, meaningful alt text, announcement of dynamic changes, reading order, zoom and reflow.
</task>

<constraints>
- Do not add ARIA to make a rule pass when a native element or visible text fixes the cause.
- Do not invent violations that are not in the report or components that are not in the repository; mark guesses about the source as inferred.
- Do not claim the page is accessible or WCAG-conformant because the scan is clean.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Violations grouped by cause
Table: rule id | WCAG criterion | count | source component or file | user impact.

## Fixes
Per group: the change with file path, as a diff or replaced block.

## Needs review and false positives
Bullets: item, why, what to check by hand.

## What the scan did not check
A short checklist of manual tests for these pages, and the before and after counts if the scan was rerun.
</output_format>
