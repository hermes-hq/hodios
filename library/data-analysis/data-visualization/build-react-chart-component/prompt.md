---
schema: 1
id: build-react-chart-component
kind: prompt
title: Build a React chart component
description: "Writes a typed React chart component with Recharts or Chart.js, with responsive sizing, loading, empty and error states, formatted tooltips, accessibility and tests."
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, software-engineer]
stack: [react, typescript]
requires: [repo-read, file-write, shell]
inputs: [repo, dataset, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [recharts, chartjs, react-components, web-charts]
pairs_with:
  prompts: [build-d3-chart, make-data-visualization-accessible, design-chart-interactions, choose-charting-library]
  rules: [chart-design-rules]
args:
  - name: chart_request
    description: "What the chart shows (type, measures, dimensions, the message), the data shape from the API or props (a TypeScript type or sample JSON), and where it sits in the app."
    type: text
    required: true
  - name: library
    description: "Charting library to use; if the project already has one, use that."
    type: enum
    enum: [recharts, chartjs, project-default]
    default: project-default
output_contract:
  format: markdown
  sections: [Findings in the codebase, Component design, Changes made, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer adding a chart to a React app. Chart components break in predictable ways: they render at zero height because the parent has no fixed height (Recharts' ResponsiveContainer needs a sized parent); they crash or show a blank axis when data is empty or still loading; dates arrive as ISO strings and are formatted in the wrong time zone; tooltips show raw floats; colours are hard-coded instead of coming from the design system's tokens and break in dark mode; Chart.js instances are not destroyed on unmount (react-chartjs-2 handles this, raw Chart.js does not); every parent render re-creates data arrays and options and causes needless re-renders; and screen readers get nothing. You read the codebase first and follow its patterns for components, styling, data fetching and tests.
</context>

<task>
Build a chart component for this request.

<chart_request>
{{chart_request}}
</chart_request>

Library: {{library}}

1. Read the codebase first: find existing chart components, the charting library already installed (do not add a second one without reason), the design tokens for colours and fonts, number and date formatting helpers, data-fetching and state patterns, and the test setup. Report what you found.
2. Design the component: a typed props interface (data, loading, error, optional height and formatters), transformation of the API shape into the chart's shape in a memoised pure function, and states for loading (skeleton at the final height), empty (a message, not an empty axis), and error.
3. Implement: responsive container with an explicit height; axes with formatted ticks using the project's formatters; tooltips with formatted values and units; colours from tokens, working in light and dark themes; legend only when more than one series, or direct labels; memoised options to avoid re-renders; cleanup on unmount where the library needs it.
4. Make it accessible: a visible or visually hidden text summary of the main point, role and aria-label on the chart wrapper, an optional data table toggle, no information carried by colour alone, and reduced motion respected.
5. Add tests in the project's style: the transform function (dates, empty input, missing fields), and rendering of loading, empty and error states. Run the tests and type check.
6. Report the changes, what was verified and what was not.
</task>

<constraints>
- Follow existing patterns; do not install a new charting library if one exists unless asked.
- Make the smallest set of file changes that delivers the component; do not refactor unrelated code.
- Do not run destructive commands or change lockfiles beyond adding a dependency the user approved.
- Do not claim tests passed unless you ran them; report failures honestly.
</constraints>

<output_format>
## Findings in the codebase
Bullets: library, tokens, formatters, patterns, test setup.

## Component design
Props interface and states.

## Changes made
Files created or changed, with a one-line purpose each.

## Verification
Commands run and results.

## Follow-ups
Bullets, or "None".
</output_format>
