---
schema: 1
id: edit-step-by-step-instructions
kind: prompt
title: Edit step-by-step instructions
description: Edits existing instructions such as setup steps, a recipe method or a handover note so a first-timer can follow them - one action per step, right order, warnings before the risky step.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, technical-writer, individual]
requires: [none]
inputs: [text, document]
output: [rewrite, report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [instructions, how-to, followability, procedures, clarity]
pairs_with:
  prompts: [review-document-for-ambiguity, write-how-to-guide, simplify-to-plain-language]
  personas: [editor]
args:
  - name: instructions
    description: The instructions as they are now.
    type: text
    required: true
  - name: reader
    description: Who will follow them and in what situation, for example a new colleague on their first day, a parent at a stove, a customer assembling furniture.
    type: text
    required: true
  - name: format_limits
    description: Where they will be read (printed card, phone screen, wiki, label) and any length limit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Problems found, Edited instructions, Questions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Instructions fail in predictable ways, and an editor who knows them can fix most without knowing the subject. Steps bundle three actions into one sentence, so readers skip the middle one. The order follows how the author thinks, not how the reader acts ("press Save, after checking the box"). Things needed before starting (tools, logins, ingredients at room temperature) appear halfway down. Warnings come after the step they apply to. Steps describe the goal but not the action ("configure the router") or the action but not the result, so the reader cannot tell if it worked. Branches ("if you have the older model") are buried in prose. The author's private names for things do not match the labels on the screen or the box. Good instructions let the reader act, check and continue without rereading.

<reader>
{{reader}}
</reader>
{{#format_limits}}Read on: {{format_limits}}{{/format_limits}}

<instructions>
{{instructions}}
</instructions>
</context>

<task>
1. Read the instructions as the stated reader, doing each step in your head, and note every point where that reader would stall, guess or make a mistake.
2. List the problems by type: bundled steps, wrong order, missing prerequisites, late warnings, vague actions, missing expected results, hidden branches, inconsistent names, and steps that assume knowledge the reader lacks.
3. Rewrite: a one-line goal, a "before you start" list, then numbered steps with one action each in imperative form, the expected result where it helps the reader check, warnings placed before the step they protect, and branches made explicit. Keep the author's wording where it already works.
4. Ask the author about anything you could not resolve from the text, such as a missing step, an unclear label or a safety point.
</task>

<constraints>
- Do not add technical steps, quantities, settings or safety facts that are not in the original. Where something seems missing, mark it [CHECK: …] in the edit and ask.
- Keep every instruction the author gave, unless it duplicates another; list any you merged.
- Use the exact labels a reader will see, as given in the original; do not rename buttons or parts.
- Fit the stated format; for small spaces, shorten the wording rather than dropping steps.
</constraints>

<output_format>
## Problems found
Table: Where | Problem | Fix made.
## Edited instructions
Goal line, "Before you start" list, numbered steps.
## Questions for the author
Numbered.
</output_format>
