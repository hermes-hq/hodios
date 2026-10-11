---
schema: 1
id: extract-data-from-figures
kind: prompt
title: Extract numbers from published figures
description: Plans extracting numbers from published plots when tables are missing, with digitiser setup, axis calibration, error bar and survival curve handling, checks and how to report it.
category: literature-review
version: 1.0.0
status: incubating
stage: [build]
role: [researcher]
requires: [none]
inputs: [image, document]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [data-extraction, plot-digitising, meta-analysis, kaplan-meier]
pairs_with:
  prompts: [extract-data-for-meta-analysis, plan-meta-analysis, write-search-log]
  personas: [research-methodologist]
args:
  - name: figure
    description: A description of the figure - chart type, axes and scales, what is plotted, legend text including what the error bars show, and the caption. Attach the image too if your tool accepts images.
    type: text
    required: true
  - name: needed
    description: The numbers you need from it, for example "mean and SD of HbA1c at 12 weeks per group" or "survival at 1, 2 and 3 years".
    type: text
    required: true
  - name: tool
    description: The digitising tool you have or prefer, if any.
    type: string
output_contract:
  format: markdown
  sections: [Before digitising, Setup and calibration, Extraction steps, Error bars and curves, Quality checks, How to report it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In meta-analysis and secondary analysis, the numbers needed are often only in a figure. Digitising software can recover them with good accuracy when done carefully, and badly when not. Careful extractors first try to get the real numbers (supplementary files, trial registry results, data repositories, the authors). When digitising, they use the highest-resolution image available (vector graphics from the PDF where possible), calibrate each axis with two well-separated labelled ticks, set log scales correctly, check calibration against values printed in the text, and read error bars only after confirming from the legend whether they are standard deviations, standard errors or confidence intervals, converting with the group size as needed. Survival curves need specific handling: reading survival at chosen time points, or reconstructing approximate individual data with published algorithms (such as the Guyot method) using numbers at risk. Extraction is best done twice, independently, and reported in the methods with the tool, and a sensitivity analysis can test whether digitised studies change the result.
</context>

<task>
Plan extraction of these numbers from this figure.
<figure>
{{figure}}
</figure>
Numbers needed: {{needed}}
{{#tool}}Tool: {{tool}}{{/tool}}

1. Before digitising: list places to look for the actual numbers first, and what to ask authors for, in case the figure can be avoided.
2. Check whether the figure can give what is needed at all (for example, a box plot gives medians and quartiles, not means and SDs; a bar chart without error bars gives no spread) and say what conversion or assumption would be needed.
3. Setup and calibration: image source and resolution, choosing calibration points on each axis, log or broken axes, and checking calibration against any value printed in the text or labels.
4. Extraction steps: the order to click points or bars, how many repeat readings, recording group, time point and raw coordinates, and naming files so the work is traceable. If a tool is named, describe its general workflow without inventing menu paths you are unsure of; widely used options include WebPlotDigitizer and Engauge Digitizer, and R packages exist for this.
5. Error bars and curves: how to read error bars and convert between SE, SD and CI using the group size, with the formulas; for survival curves, reading time points and when an individual-data reconstruction method is worth it, which inputs it needs (numbers at risk, total events).
6. Quality checks: duplicate independent extraction and an agreement rule, plausibility checks against reported totals or p-values, and a record of every assumption.
7. How to report it: a methods sentence naming the tool and process, and a plan for a sensitivity analysis excluding digitised data.
</task>

<constraints>
- Do not read values off an image and present them as final; any values you estimate from an attached image are rough checks only, labelled as such, and the user must digitise with a tool.
- Never assume what error bars show; if the legend does not say, flag it and plan to ask the authors or test both in a sensitivity analysis.
- Show every conversion formula with its inputs.
- Say plainly when the figure cannot supply the needed statistic.
- Recommend verifying current tool versions and features in their own documentation.
</constraints>

<output_format>
## Before digitising
Bullets.
## Setup and calibration
Numbered steps.
## Extraction steps
Numbered steps and a recording table: study | figure | group | time point | x | y | upper bar | lower bar | reader.
## Error bars and curves
Formulas and rules.
## Quality checks
Checklist.
## How to report it
A methods sentence and the sensitivity analysis.
</output_format>
