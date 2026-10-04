---
schema: 1
id: write-data-methodology-note
kind: prompt
title: Write a methodology and caveats note for a report or dashboard
description: Writes the methodology and caveats note for a report or dashboard, covering sources, definitions, cleaning, known biases and how to read the numbers, for the audience who will use them.
category: reporting
version: 1.0.0
status: incubating
stage: [ship, review]
role: [data-analyst, researcher, business-analyst]
requires: [none]
inputs: [notes, text, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [methodology-note, data-caveats, metric-definitions, transparency, dashboard-documentation]
pairs_with:
  prompts: [build-metrics-glossary, define-metric, write-insight-report, explain-metric-discrepancy]
  personas: [data-journalist, data-analyst]
args:
  - name: analysis
    description: What the report or dashboard shows and how it was built - data sources with owners and dates, metric definitions, filters and exclusions, cleaning, joins, weighting or modelling, refresh schedule, and any known problems.
    type: text
    required: true
  - name: audience
    description: Who reads the note and what they do with the numbers, for example "regional managers checking targets", "the public reading a council report" or "analysts reusing the data".
    type: string
    required: true
  - name: length
    description: short is a box readers can scan in about a minute, placed beside the numbers; full is an appendix with every definition and decision.
    type: enum
    enum: [short, full]
    default: short
output_contract:
  format: markdown
  sections: [Methodology note, Gaps found]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most misreadings of a report come from things the methodology note should have said: that "active users" excludes trials, that the latest month is incomplete, that a region changed its recording system, that percentages are of respondents rather than of the population, or that a change of two points is within the margin of error. Notes fail when they are missing, buried, written in analyst jargon, or so long that nobody reads them. A good note tells this audience where the numbers come from, what each one means, what was done to the data, what could make them wrong, and how to read them, in the order a reader needs it.
</context>

<task>
Write a {{length}} methodology note for {{audience}}.

<analysis>
{{analysis}}
</analysis>

1. Read the analysis and list every source, metric, filter, transformation and known issue it mentions.
2. Write the note in this order, leaving out headings that have nothing under them:
   - What this shows: the scope (population, places, period) and the question it answers, in one or two sentences.
   - Sources: each source, its owner, the date range and when it was extracted or refreshed.
   - Definitions: each metric in plain words, with the formula where it helps, and what is included and excluded.
   - What was done to the data: cleaning, exclusions with counts if given, imputation, weighting, joins, and any modelling.
   - Limitations and known biases: coverage gaps, self-selection, measurement or recording changes, incomplete recent periods, revisions, small numbers and suppression, each with its likely effect on the figures (direction and rough size where known).
   - How to read the numbers: rounding, percentages versus percentage points, which comparisons are valid and which are not (across regions, across years with a definition change), and uncertainty such as confidence intervals or margins of error if they apply.
   - Changes since the last version, and a contact, as placeholders if not given.
3. For short: keep only what this audience needs to avoid misreading the numbers, in plain bullets, and point to the full note for the rest. For full: include every definition and decision, still in plain language, with technical detail in clearly marked sub-points.
4. List gaps: anything the note should say but the analysis does not tell you (for example no extraction date or no definition of a key metric), as questions for the analyst.
5. Before you answer, check that every statement in the note is supported by the analysis text and that the vocabulary suits {{audience}}.
</task>

<constraints>
- Never invent a source, date, count, definition or limitation; use a bracketed placeholder and list it under gaps.
- Write for {{audience}}: no unexplained jargon, and no reassurance that hides a real limitation.
- State limitations plainly and specifically ("the latest month is missing about a fifth of late-arriving claims"), not as generic disclaimers.
- If the analysis description is too thin to write any definitions, ask for the metric definitions and sources and stop.
</constraints>

<output_format>
## Methodology note
The note, ready to paste beside the report or dashboard.
## Gaps found
Numbered questions for the analyst, or "None".
</output_format>
