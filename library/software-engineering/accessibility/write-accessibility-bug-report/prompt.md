---
schema: 1
id: write-accessibility-bug-report
kind: prompt
title: Write an accessibility bug report
description: Turns a rough accessibility finding into a bug report developers can reproduce, with the assistive technology and browser, steps, expected and actual announcements, WCAG criterion and user impact.
category: accessibility
version: 1.0.0
status: incubating
stage: [verify, review]
role: [qa-engineer, frontend-engineer, designer]
requires: [none]
inputs: [notes, text]
output: [report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: "off"
level: beginner
depth: specific
tags: [bug-report, issue-tracker, assistive-technology, reproduction-steps, wcag, severity]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [prioritize-accessibility-findings, write-screen-reader-test-plan, write-actionable-bug-report]
args:
  - name: finding
    description: What you found, in your own words, plus anything you know about the setup (screen reader, browser, device, page, component, screenshots described in text).
    type: text
    required: true
  - name: tracker_template
    description: Optional. Your issue template's fields, so the report fits it.
    type: text
output_contract:
  format: markdown
  sections: [Title, Report, Missing details]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Accessibility bugs get closed as "cannot reproduce" or "works for me" more than most, because the reproduction depends on the exact assistive technology, browser and mode (NVDA browse versus focus mode, VoiceOver with Safari versus Chrome, TalkBack with explore by touch), and because developers who do not use a screen reader do not know what "it reads wrong" means. A good report states the setup, the exact keystrokes or gestures, what was announced word for word versus what should have been, the WCAG success criterion as a reference rather than a verdict, who is blocked and whether there is a workaround. Severity should follow user impact on the task (blocker: cannot complete; major: completes with difficulty or only with help; minor: annoying), not the WCAG level.
</context>

<task>
<finding>
{{finding}}
</finding>
{{#tracker_template}}
Fit this template:
{{tracker_template}}
{{/tracker_template}}

1. Write a title in the form "[Component] [problem] for [who] on [where]", for example "Date picker: selected date not announced to screen readers on checkout".
2. Write the environment: assistive technology and version, browser or app and version, operating system, device, and mode or setting used. Leave unknown items as "not stated", never guessed.
3. Write numbered reproduction steps with exact keys or gestures, starting from a URL or screen.
4. Write "Actual": what happened, with announcements quoted. Write "Expected": what should happen, with the expected announcement or behaviour.
5. Add the likely WCAG success criterion (number and name) with a one-line reason, and a severity with its reason in user terms, plus any workaround.
6. Add a suggested fix only if the cause is clear from the finding, labelled as a suggestion.
7. List the details that are missing and would make the report reproducible.
</task>

<constraints>
- Do not invent versions, URLs, announcements or steps the finding does not support; mark gaps.
- Use neutral, specific language; no blame, no "violates the law".
- One problem per report; if the finding contains several, split them and say so.
</constraints>

<output_format>
## Title
One line.

## Report
Environment, Steps, Actual, Expected, WCAG reference, Severity, Workaround, Suggested fix.

## Missing details
Bullets, or "none".
</output_format>
