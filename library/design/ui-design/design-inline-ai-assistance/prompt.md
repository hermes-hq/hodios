---
schema: 1
id: design-inline-ai-assistance
kind: prompt
title: Design inline AI assistance
description: Designs AI help embedded in an existing screen, such as suggestions, autocomplete, rewrite or summarise actions, with triggers, accept and undo, uncertainty cues, errors and user control.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [text, spec]
output: [docs, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-ux, inline-suggestions, autocomplete, human-in-the-loop, undo]
pairs_with:
  prompts: [design-chat-interface, write-ai-feature-requirements, define-ai-feature-metrics, spec-motion-and-microinteractions]
  personas: [product-designer]
args:
  - name: feature
    description: The screen and task, and what the AI does there, for example "suggest replies in a support ticket view" or "summarise a long form submission for a reviewer".
    type: text
    required: true
  - name: stakes
    description: What happens if the AI is wrong (cosmetic, costly, harmful), how fast responses come back, and any limits on data the model may see. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Job and stakes, Trigger and placement, Presenting the output, Accept, edit and undo, Uncertainty and sources, States, User control, Copy, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AI help inside an existing screen works when it fits the person's flow: it appears where the work is, is easy to ignore, never overwrites their work without consent, and is cheap to accept, edit or undo. It fails when suggestions pop up unasked and steal focus, when generated text is indistinguishable from what the person wrote, when there is no way back, when wrong output looks as confident as right output, and when the feature cannot be turned off. The higher the stakes, the more the design must make review the default: show the source, require explicit acceptance, and keep a record of what was AI-generated where that matters.
</context>

<task>
<feature>
{{feature}}
</feature>
{{#stakes}}

<stakes>
{{stakes}}
</stakes>
{{/stakes}}

1. Job and stakes: the task, how often, and the cost of a wrong output; choose a pattern (passive suggestion, on-demand action, draft for review) to match.
2. Trigger and placement: when the help appears (on request, on pause, on a specific event), where it sits, and how it avoids stealing focus or covering content.
3. Presenting the output: visual difference between suggested and user content, preview before applying, length and format.
4. Accept, edit and undo: keyboard and pointer actions, partial acceptance, undo that restores the previous state exactly.
5. Uncertainty and sources: showing sources or the input used, flagging low-confidence output where the system can tell, and never implying verification it did not do.
6. States: loading (and slow), streaming if used, nothing useful to suggest, error, rate limit, content the model declines.
7. User control: turn off or tune, per-user and admin levels, data use explained.
8. Copy for actions, labels and disclosure.
9. What to measure: acceptance, edits after acceptance, undo rate, time saved, and harm signals.
</task>

<constraints>
- AI output never replaces the user's content without an explicit action.
- Do not invent model capabilities such as confidence scores; if the system does not produce them, design without them.
- Keep the AI disclosure honest and visible where the output leaves the person's hands (sent to customers, stored in records).
</constraints>

<output_format>
## Job and stakes
## Trigger and placement
## Presenting the output
## Accept, edit and undo
## Uncertainty and sources
## States
| State | What the person sees | Action |
## User control
## Copy
## What to measure
</output_format>
