---
schema: 1
id: make-multi-step-form-accessible
kind: prompt
title: Make a multi-step form or wizard accessible
description: Makes a multi-step form or wizard accessible, with a progress indicator people can understand, focus and titles on step change, per-step errors, back navigation and saved progress.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [wizard, multi-step-form, progress-indicator, focus-management, error-handling]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-form-accessibility, review-cognitive-accessibility, manage-focus-after-ui-updates]
args:
  - name: wizard
    description: The wizard code or file paths, its steps, whether each step is a route or in-page state, how validation works, and whether progress is saved.
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Problems found, Step changes, Progress indicator, Errors and data, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Single-form fixes (labels, errors, autocomplete) are necessary but not enough for a wizard. The wizard-specific failures: pressing "Next" swaps the content but leaves focus on a button that no longer exists, so keyboard users land at the top of the page and screen-reader users hear nothing; the progress bar is a row of coloured circles with no text, or a `progressbar` role misused for steps; the step heading and the document title do not change; errors from server-side validation appear on a step the user already left; "Back" loses the entered data; a session timeout throws away twenty minutes of work (WCAG 2.2.1 and 2.2.5); and the same information is asked for twice, which WCAG 2.2 addresses in 3.3.7 (redundant entry). The reliable pattern: on step change, update the title ("Step 2 of 4: Delivery, Checkout") and move focus to the step's heading (`tabindex="-1"`); show progress as an ordered list with text and `aria-current="step"`; validate on Next, then show an error summary at the top of the step that receives focus and links to each field; keep data across Back and refresh.
</context>

<task>
Make this {{framework}} multi-step form accessible.

<wizard>
{{wizard}}
</wizard>

1. Read the wizard, its step components and validation. List problems against the context; mark inferences.
2. Step changes: update the document title and the visible step heading; move focus to the heading after the new step renders; make browser Back behave predictably if steps are routes.
3. Progress indicator: an ordered list with text for each step, the current step marked `aria-current="step"`, completed steps exposed in text ("completed"), and links to completed steps only if editing them is supported.
4. Errors: validate on Next; if a step has errors, keep the user on it, show an error summary that receives focus and links to each field, and tie messages to fields with `aria-describedby` and `aria-invalid`. Route server-side errors back to the step and field they belong to.
5. Data: keep entered values on Back and refresh, prefill information already given (3.3.7), and warn before a timeout with a way to extend, or save progress.
6. Review step: a summary with "Change" links named with context ("Change delivery address") that return to the right field and back to the summary.
7. Write tests for focus and title on step change, the error summary and data kept on Back; run them. Give a short manual keyboard and screen-reader check.
</task>

<constraints>
- Do not split a short form into steps or merge steps; fix the existing flow.
- Do not use `role="progressbar"` for a list of named steps.
- Reuse the project's form and error components; fix them at the source when they are the problem.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Numbered, with WCAG criterion.

## Step changes
Diffs.

## Progress indicator
Diff and the markup it renders.

## Errors and data
Diffs.

## Tests and manual check
Test code, command result, manual steps.
</output_format>
