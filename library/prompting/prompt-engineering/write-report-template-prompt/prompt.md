---
schema: 1
id: write-report-template-prompt
kind: prompt
title: Write a report template prompt
description: Writes a reusable prompt that turns raw notes into a fixed recurring report - weekly status, incident, site visit or shift handover - under exact headings, with missing inputs flagged, never filled.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [project-manager, operations-manager, manager, individual]
requires: [none]
inputs: [text, notes]
output: [prompt, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [report-template, recurring-report, status-report, missing-information, reusable-prompt]
pairs_with:
  prompts: [write-task-prompt, turn-chat-into-prompt, write-summarization-prompt]
  personas: [prompt-engineer]
args:
  - name: report_type
    description: The report you write again and again, who reads it and how often, for example "weekly project status for the steering group".
    type: text
    required: true
  - name: template
    description: The headings or form the report must follow. Paste an existing good report if there is no formal template (personal data removed).
    type: text
    required: true
  - name: sample_notes
    description: Optional - the kind of raw notes you start from (bullets, chat messages, a call transcript), to test the prompt on.
    type: text
output_contract:
  format: markdown
  sections: [Field rules, Prompt, Example run, Maintenance tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts that fill a fixed report from rough notes. Recurring reports have a template for a reason: readers scan the same place each week for status, risks and decisions needed. Assistants drift from it: they rename or merge headings, turn status into upbeat prose, move a red status to amber because the notes sound positive, fill empty sections with generic text ("No major risks at this time") that the notes never stated, and drop the one blocker mentioned in passing. A good report prompt reproduces the template exactly, gives each field a rule (source, allowed values, length, and what to write when the notes say nothing), keeps the author's judgement (status colours, owners, dates) unchanged, and ends with a list of missing inputs so the author can fill gaps before sending.

Report type: {{report_type}}

<template>
{{template}}
</template>
{{#sample_notes}}

<sample_notes>
{{sample_notes}}
</sample_notes>
{{/sample_notes}}
</context>

<task>
1. Write field rules for every heading or field in the template: what goes there, the allowed values (for example status: Green, Amber, Red only as stated by the author), length, tone, and the exact text to use when the notes have nothing ("Not provided - author to confirm").
2. Write the prompt. It tells the assistant to: copy the headings exactly and in order; fill each field only from the notes; keep owners, dates, numbers and status as written; never upgrade or soften a status or a risk; put information that fits no heading under "Other notes" rather than dropping it; and finish with a "Missing before sending" list. Raw notes go in delimited tags; variable parts use placeholders such as [PERIOD] and [NOTES].
3. If sample notes were given, show the filled report and the missing-inputs list it should produce. If not, write short realistic sample notes marked as invented and run them.
4. Maintenance tips: how to update the prompt when the template changes, how to keep a "last week" report in the prompt for continuity (carry over open actions, mark them done or still open), and how to save it as a reusable prompt in the user's assistant.
</task>

<constraints>
- Do not change, add or remove template headings; if the template looks flawed, suggest changes separately.
- Never invent progress, numbers, risk ratings, dates or owners.
- For incident, safety or clinical reports, keep the facts-only rule strict: no causes or blame unless stated in the notes, and a reminder that the organisation's official reporting rules take precedence.
- Plain language; no filler phrases.
</constraints>

<output_format>
## Field rules
Table: Field | Rule | If missing.
## Prompt
In a fenced code block.
## Example run
The filled report and the missing-inputs list.
## Maintenance tips
Short bullets.
</output_format>
