---
schema: 1
id: audit-web-accessibility
kind: prompt
title: Audit web accessibility against WCAG 2.2
description: Audits markup or components against WCAG 2.2 and reports each issue by success criterion with user impact, severity and a concrete code fix. Use before a release or a compliance review.
category: accessibility
version: 1.0.0
status: incubating
stage: [review, verify]
role: [frontend-engineer, qa-engineer, designer]
stack: [html-css]
requires: [repo-read, web]
inputs: [file, url, repo]
output: [report]
risk: network
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [wcag, aria, assistive-technology, audit]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-keyboard-navigation, fix-form-accessibility, review-color-contrast]
args:
  - name: target
    description: Markup, component source, a repo path or a URL to audit.
    type: text
    required: true
  - name: conformance
    description: WCAG 2.2 conformance level to audit against. Each level includes the ones below it.
    type: enum
    enum: [A, AA, AAA]
    default: AA
output_contract:
  format: markdown
  sections: [Summary, Issues, Needs manual testing, Not covered]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An accessibility audit is useful when each finding names who is blocked, cites the exact success criterion, and comes with a fix a developer can paste. It is harmful when it pads the report with false positives, such as an `aria-label` "missing" on an element whose visible text already names it, or when it implies a page conforms because code review found nothing. Automated checkers catch only a minority of WCAG failures. Judgement and assistive-technology testing cover the rest.
</context>

<task>
Audit {{target}} against WCAG 2.2 level {{conformance}}.

1. Get the material. Read the code, or fetch and inspect the rendered page if given a URL. If you can only see part of it (one component, no CSS, no scripts), say so and limit your claims to that part.
2. Work through every criterion at the target level. These are the ones most often failed, grouped the way users meet them; also check media (1.2.x), timing (2.2.x), flashing (2.3.1), resize text (1.4.4) and input purpose (1.3.5) whenever the target contains them:
   - **Perceivable:** text alternatives (1.1.1), info and relationships (1.3.1), meaningful sequence, use of colour (1.4.1), contrast (1.4.3, 1.4.11), reflow (1.4.10), text spacing (1.4.12), content on hover or focus (1.4.13).
   - **Operable:** keyboard (2.1.1) and no keyboard trap (2.1.2), bypass blocks (2.4.1), page titled, focus order (2.4.3), link purpose, focus visible (2.4.7), focus not obscured (2.4.11), pointer gestures, dragging movements (2.5.7), target size minimum of 24 by 24 CSS pixels (2.5.8), label in name (2.5.3).
   - **Understandable:** language of page, on focus and on input (3.2.1, 3.2.2), consistent help (3.2.6), error identification and suggestion (3.3.1, 3.3.3), labels or instructions (3.3.2), redundant entry (3.3.7), accessible authentication (3.3.8).
   - **Robust:** name, role, value (4.1.2) and status messages (4.1.3). Note that 4.1.1 Parsing is obsolete in WCAG 2.2.
3. Confirm each suspected issue against the code before reporting it. Check what the accessibility tree would really expose: native semantics, ARIA overrides, and hidden or `inert` content.
4. Rate severity by user impact:
   - **Blocker:** some users cannot complete the task.
   - **Serious:** the task is possible only with great effort or a workaround.
   - **Moderate:** a confusing or tiring experience.
   - **Minor:** polish.
5. Write the fix for each issue as code in the target's own framework. Prefer native HTML over ARIA.
</task>

<constraints>
- Report only criteria at or below {{conformance}}. Mention higher-level wins in one line at the end, if any.
- Never state or imply that the target "is compliant" or "conforms". Say what you checked and what you found.
- Group repeats of one root cause into a single issue that lists every location.
- Leave out personal opinions on visual design unless they map to a criterion.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Issue counts by severity, then the three changes that unblock the most users.

## Issues
Numbered, most severe first. Each one:
- **SC x.x.x Name (level)** — severity
- Where: `path:line` or selector
- Who is affected and what happens to them
- Fix: a code block

## Needs manual testing
What cannot be judged from the code alone, with the assistive technology or method to use (screen reader, 400% zoom, keyboard only, voice control).

## Not covered
Parts of the target you could not see or did not check.
</output_format>
