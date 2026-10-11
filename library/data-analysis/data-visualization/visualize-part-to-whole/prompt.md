---
schema: 1
id: visualize-part-to-whole
kind: prompt
title: Visualise parts of a whole
description: Picks and specifies a composition chart (sorted bars, stacked or 100% bars, pie, waffle, treemap) for shares of a total, including how the mix changes over time. Use for share-of-total questions.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, business-analyst, marketer, manager]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [stacked-bar, pie-chart, share-of-total, chart-design]
pairs_with:
  prompts: [choose-chart-type, visualize-hierarchy, write-plotting-code]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: composition
    description: "The total and its parts: what is being split (revenue by channel, budget by department, time by activity), the values or shares, units, how many parts, and whether there are several periods or groups."
    type: text
    required: true
  - name: message
    description: "What the reader should see, for example 'Paid search now brings half of new customers, up from a third'."
    type: text
    required: true
  - name: tool
    description: "Where it will be built: Excel, Sheets, Power BI, Tableau, Python, R, Datawrapper or slides."
    type: string
output_contract:
  format: markdown
  sections: [Data checks, Recommended chart, Category handling, Design spec, Wording, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visualisation designer who is asked for pie charts every week and knows when they are fine. A pie or donut works for two to about four parts when the message is "this part is about half" or "most of it"; past that, angles and areas are hard to compare and a sorted bar chart wins. A 100% stacked bar compares mix across a few groups, but only the bottom segment shares a baseline, so the segment that matters goes at the base. Stacked areas over time make middle layers unreadable; for composition over time, small multiples of each share or a 100% stacked bar per period usually read better. Waffle charts work for one share shown to lay readers. Treemaps suit many parts or nested parts, but compare poorly. Common data faults matter more than chart choice: parts that do not add up to the total, overlapping categories (multi-select survey answers) that cannot be shown as parts of a whole, negative values, and a long tail of tiny parts.
</context>

<task>
Design a part-to-whole chart.

<composition>
{{composition}}
</composition>

<message>
{{message}}
</message>

{{#tool}}
Tool: {{tool}}
{{/tool}}

1. Check the data: do the parts sum to the total (show the arithmetic); are categories mutually exclusive (multi-select answers are not parts of a whole and need a bar chart of percentages that do not add to 100%); any negative values (these break stacked and pie forms); are shares or absolute values the point, or both.
2. Choose the form from the number of parts, the number of groups or periods, and the message: pie or donut for 2 to 4 parts and one group; sorted horizontal bars for more parts; 100% stacked bars for mix across up to about 6 groups; stacked bars when both total and mix matter; waffle for one share to lay readers; treemap for many or nested parts; small multiples or a line chart of shares for mix over time. Name the rejected alternative and why.
3. Handle categories: order by size or a natural order, put the key part at the baseline or first, group parts below about 3 to 5% into "Other" with a footnote listing them, and keep category colours consistent with other charts.
4. Specify labels: percentages with consistent rounding (note when rounded shares do not sum to 100), absolute values where they matter, direct labels on segments instead of a legend, the total stated in the subtitle.
5. Write an action title and subtitle, then build notes for the tool.
</task>

<constraints>
- Never draw a pie or stacked chart for categories that overlap or for values that do not sum to a meaningful total; say why and offer the right chart.
- No 3D, exploded or multi-ring pies.
- Do not change the parts' values to make shares sum to 100; note rounding instead.
- Keep at most about 6 coloured parts; the rest go grey or into "Other".
</constraints>

<output_format>
## Data checks
The sum check and any problems.

## Recommended chart
Form, why, and the alternative rejected.

## Category handling
Table: Category | Value | Share | Shown or grouped | Order.

## Design spec
Table: Element | Choice | Reason.

## Wording
Title, subtitle, labels and footnote.

## Build notes
Numbered steps or one code block.
</output_format>
