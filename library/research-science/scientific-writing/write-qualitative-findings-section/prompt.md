---
schema: 1
id: write-qualitative-findings-section
kind: prompt
title: Write a qualitative findings section
description: Writes a qualitative findings section presenting each theme with its definition, interpretation and verbatim quotes in balance, keeping quotes exact and attributed to participant codes.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [notes, transcript, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [social-sciences]
tags: [qualitative-research, themes, participant-quotes, coreq, manuscript]
pairs_with:
  prompts: [run-thematic-analysis, write-discussion-section, check-manuscript-reporting]
  personas: [research-methodologist]
args:
  - name: analysis
    description: Your themes and subthemes with definitions, your analytic notes, and the coded quotes with participant codes (and any relevant characteristics), plus the analytic approach used.
    type: text
    required: true
  - name: format
    description: Optional. Whether findings and discussion are separate or combined, word limit, and the journal or thesis style.
    type: text
output_contract:
  format: markdown
  sections: [Findings, Theme overview table, Quote check, Notes for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Qualitative findings sections fail in two opposite ways. Some are strings of quotes with little analysis, so the reader does the interpretive work; others are pure abstraction with no data, so the reader cannot judge the claims. Experienced qualitative writers use a rhythm for each theme: a sentence stating the analytic claim, interpretation that develops it, a short quote or two that show it (not prove it), then what the quote reveals, including variation and contrasting cases. Themes are named as claims ("Caring as unpaid overtime") rather than topics ("Workload"). Counting ("12 of 20 participants") is used sparingly and only if consistent with the approach; reflexive thematic analysis in particular discourages treating frequency as importance. Quotes must be verbatim, attributed with participant codes, trimmed with marked ellipses, and spread across participants so a few voices do not dominate.
</context>

<task>
Write the findings section from:
<analysis>
{{analysis}}
</analysis>
{{#format}}
Format: {{format}}
{{/format}}

1. Open with a short overview of the themes and how they relate, pointing to a table or figure of the thematic structure.
2. For each theme, write a heading that states its central idea, a definition sentence, then paragraphs that interpret it with one to three short quotes each, introduced and followed by analysis.
3. Show variation within each theme: participants whose experience differed, and negative or contrasting cases if given.
4. Spread quotes across participants and note if any participant is quoted much more than others.
5. Keep interpretation inside the data; move comparisons with literature to notes for the discussion unless the format combines findings and discussion.
6. Check every quote against the supplied material.
</task>

<constraints>
- Quotes must be copied word for word from the input with their participant codes. Never invent, merge or "smooth" a quote; mark trims with [...] and clarifications in square brackets.
- Do not add themes, participants or characteristics not in the input.
- Avoid quantifying with numbers unless the author's approach uses them; prefer "several", "most" only where the analysis supports it.
- Do not include identifying details beyond the codes and characteristics supplied.
</constraints>

<output_format>
## Findings
The section with a heading per theme.
## Theme overview table
Table: theme, definition, subthemes, participants quoted.
## Quote check
Each quote used, its code, and confirmation it appears verbatim in the input.
## Notes for the author
Imbalances, thin themes and points for the discussion.
</output_format>
