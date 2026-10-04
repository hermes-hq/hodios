---
schema: 1
id: build-report-deck-from-analysis
kind: prompt
title: Build a slide deck file from analysis results
description: Builds a slide deck file from analysis results with a script, one finding per slide, charts rendered from the data, speaker notes and a source appendix. Use to present finished analysis.
category: reporting
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, business-analyst, data-scientist, consultant]
requires: [repo-read, file-write, shell]
inputs: [dataset, text, file]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pptx-generation, action-titles, speaker-notes, slide-automation]
pairs_with:
  prompts: [write-insight-report, tell-data-story, critique-slide-deck, generate-docx-report-from-template]
  workflows: [data-report-build-track]
  rules: [chart-design-rules]
args:
  - name: results
    description: The analysis results, as a path to a results file (JSON, CSV, a notebook output folder) or pasted findings with their numbers and sources.
    type: text
    required: true
  - name: template
    description: Path to a presentation template (.potx or .pptx) whose layouts and theme the deck must use. Leave empty for a clean default.
    type: string
  - name: slides
    description: Target number of slides in the main deck, excluding the appendix.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Storyline, Slides, Build script, Checks, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Analysis decks fail in recognisable ways: topic titles ("Q3 revenue") instead of the point ("Q3 revenue grew 8%, all of it from returning customers"), several findings crammed onto one slide, charts pasted as screenshots from an older run, numbers that differ between the chart and the text, and nothing left to say for the presenter. Building the deck with a script from the same results file fixes the drift; a clear storyline fixes the rest.
</context>

<task>
Build a presentation file from these analysis results, with a script.

<results>
{{results}}
</results>
Template: {{template}} (if empty, use a clean default with readable fonts and a neutral palette).
Target length: {{slides}} main slides plus an appendix.

1. Read the results and list every finding with its numbers and source. If a finding has no number or source behind it, mark it and leave it out of the deck rather than guess. If the results are too thin for the target length, make a shorter deck and say why.
2. Write the storyline before building: a title slide, an executive summary slide that answers the question in three bullets or fewer, one slide per finding in an order that builds the argument, a "what we recommend or need to decide" slide, and an appendix with method, definitions, data sources and backup charts.
3. For each finding slide: an action title stating the finding as a full sentence; one chart or one table that proves it; at most three short supporting points; and a source line under the chart.
4. Build the deck with a script, using the presentation library already in the project or a standard one for its language (for example python-pptx or PptxGenJS). With a template, use its slide layouts and placeholders instead of drawing text boxes, so the theme, fonts and footers apply.
5. Charts: create native, editable chart objects from the results data where the library supports the chart type; otherwise render images from the same data with a plotting library at sufficient resolution. Label axes and units, start bar axes at zero, highlight the series that carries the finding, and use colour-blind-safe colours. Add alt text to every chart and image.
6. Speaker notes for every slide: what to say in two to four sentences, the exact numbers with their source, and the likely question with its answer.
7. Check the built file: reopen it with the library and confirm slide count, that every title and placeholder is filled, no leftover template prompt text, and that every number on a slide matches the results. If a local office suite is available, convert the deck to PDF or images and look at each slide for text overflow or overlapping shapes; fix and rebuild.
</task>

<constraints>
- Every number in the deck comes from the results. No rounding that changes meaning, and the same rounding everywhere.
- One finding per slide. Move extra detail to the appendix or the notes.
- Do not modify the template file; write a new deck and say where.
- Do not upload the deck or data anywhere.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Storyline
Numbered list: slide number, action title, the result it uses.

## Slides
Table: Slide | Layout | Chart or table | Notes summary.

## Build script
Where it is, the library used, and the rebuild command.

## Checks
Each automated and visual check with its result and anything fixed.

## Verification
Commands run, real results, and the output file path.
</output_format>
