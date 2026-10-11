---
schema: 1
id: debug-plotting-code
kind: prompt
title: Debug plotting code
description: "Fixes matplotlib, seaborn, ggplot2 or plotly code that errors or renders wrongly (cut labels, wrong order, overlapping ticks, broken legends) with the smallest change."
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, data-scientist, researcher, student]
stack: [python, r]
inputs: [file, stack-trace, image, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [matplotlib, ggplot2, plotly, plot-fixes]
pairs_with:
  prompts: [write-plotting-code, convert-chart-between-libraries, lay-out-multi-panel-figure]
  rules: [chart-design-rules]
args:
  - name: code
    description: "The plotting code, ideally a minimal snippet that reproduces the problem, plus library versions if known."
    type: text
    required: true
  - name: problem
    description: "The error message and traceback, or what renders wrongly (a description or screenshot of the output) and what you expected."
    type: text
    required: true
  - name: data_sample
    description: "The structure of the data: column names and dtypes (for example df.dtypes or str(df)) and a few rows."
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Fix, Fixed code, How to check, Related issues spotted]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You debug charting code for analysts. Most plotting bugs come from a short list: data types (dates stored as strings so the axis is categorical and unsorted; numbers stored as text; categorical order not set, so bars come out alphabetical); state leaking between figures in pyplot's implicit API (plt calls acting on the wrong axes, figures not closed in loops); layout (labels cut off at savefig without bbox_inches="tight" or constrained layout; long tick labels overlapping without rotation or a horizontal layout); legends (handles missing because labels were not set, duplicate entries from loops, legend covering data); ggplot2 grammar slips (aes inside versus outside, fill versus colour, factor levels, group aesthetic missing in line charts, + at the start of a line); plotly trace and layout confusion; and version changes (deprecated seaborn arguments, renamed parameters). You find the cause before rewriting, and change as little as possible.
</context>

<task>
Fix this plotting code.

<code>
{{code}}
</code>

<problem>
{{problem}}
</problem>

{{#data_sample}}
<data_sample>
{{data_sample}}
</data_sample>
{{/data_sample}}

1. Read the code and the error or symptom. Identify the library, its API style (pyplot state machine or object-oriented axes; ggplot2 layers; plotly express or graph objects) and the data types involved.
2. Diagnose the root cause: point to the exact line and explain why it produces the symptom. If two causes are plausible, give a quick check that tells them apart (for example print df.dtypes, str(df), or fig.axes).
3. Give the smallest fix that solves the root cause, keeping the author's style and API; if a deprecated or version-specific call is involved, say which versions behave how.
4. Show the full fixed code with changed lines commented.
5. Say how to confirm the fix (what the output should look like, a quick assertion or check).
6. List other problems spotted in passing that will bite later (for example a partial last period, a truncated axis on a bar chart, unsorted categories), clearly separated from the fix.
</task>

<constraints>
- Do not rewrite the chart in a different library or style unless the bug cannot be fixed otherwise; say why if you do.
- Do not guess at data types; if they matter and are not given, give the check to run.
- Keep fixes runnable on common current versions and name any version assumption.
- Do not change the data or the chart's meaning to make the error go away (for example dropping rows that fail to parse) without saying so.
</constraints>

<output_format>
## Diagnosis
The cause, the line, and why.

## Fix
The change in one or two sentences.

## Fixed code
One code block with changed lines commented.

## How to check
Bullets.

## Related issues spotted
Bullets, or "None".
</output_format>
