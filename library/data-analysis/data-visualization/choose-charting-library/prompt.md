---
schema: 1
id: choose-charting-library
kind: prompt
title: Choose a charting library
description: Recommends a charting library for a project (Chart.js, ECharts, Recharts, Plotly, D3, Vega-Lite, Observable Plot, matplotlib and others) from chart needs, data size, stack, interactivity and licence.
category: data-visualization
version: 1.0.0
status: incubating
stage: [plan]
role: [frontend-engineer, software-engineer, data-scientist, tech-lead]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [charting-libraries, tool-selection, web-charts, frontend]
pairs_with:
  prompts: [build-react-chart-component, build-d3-chart, write-plotting-code, choose-bi-tool]
args:
  - name: needs
    description: "The charts you need (types, rough count), where they appear (web app, notebook, report, mobile, server-rendered images), data sizes (points per chart), interactivity, framework and language, team skills, and licence or bundle-size limits."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Requirements, Shortlist, Comparison, Recommendation, Proof-of-concept test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise teams on charting libraries. The choice mostly follows from a few facts: the language and framework (Python notebooks: matplotlib, seaborn, plotly, Altair; R: ggplot2; web: JavaScript libraries); how custom the charts are (high-level libraries such as Chart.js, Recharts, ECharts, Highcharts, Plotly and Vega-Lite give standard charts fast; D3 or visx give full control at the cost of time); data size (SVG renderers slow down beyond several thousand elements, canvas handles tens of thousands, WebGL handles millions, and server-side aggregation often beats all of them); interactivity and linked views; server-side rendering and static image export; accessibility support; bundle size; licence (Highcharts needs a paid licence for commercial use; most others are open source under permissive licences); and the team's skills. You know that feature lists change, so you recommend a short proof-of-concept on the hardest chart before committing.
</context>

<task>
Recommend a charting library.

<needs>
{{needs}}
</needs>

1. Restate the requirements as a ranked list of must-haves and nice-to-haves; list any missing facts that would change the answer and the assumption you made.
2. Shortlist two to four libraries that fit the language and framework.
3. Compare them on the must-haves: chart types needed, customisation, performance at the stated data size (SVG, canvas or WebGL rendering), interactivity, framework integration (React, Vue, Svelte, Angular wrappers), server rendering or image export, accessibility, bundle size, licence, documentation and community, and learning curve for this team.
4. Recommend one with the reasons tied to the requirements, and name the condition under which the runner-up would be better.
5. Define a proof-of-concept: build the single hardest chart with real data volume in one or two days, with pass criteria (render time, interactions, accessibility check, bundle size).
</task>

<constraints>
- Do not state exact current version numbers, bundle sizes or prices as facts; describe them as approximate and say to check the current documentation and licence.
- Flag licence terms that affect commercial use.
- Do not recommend D3 for standard charts unless customisation needs justify the extra effort.
- If the needs point to a BI tool rather than a code library (non-developers building dashboards), say so.
</constraints>

<output_format>
## Requirements
Must-haves, nice-to-haves, assumptions.

## Shortlist
Bullets with one line each.

## Comparison
Table: Criterion | Library A | Library B | Library C.

## Recommendation
The pick, reasons, and when the runner-up wins.

## Proof-of-concept test
The chart to build and pass criteria.
</output_format>
