---
schema: 1
id: visualize-event-timeline
kind: prompt
title: Visualise an event timeline
description: "Lays out a timeline of dated events and periods with lanes, true time spacing, readable labels and uncertain dates, as a spec or code. Use for project, history or incident timelines."
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, project-manager, writer, researcher]
inputs: [dataset, text, document]
output: [plan, code, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [timeline, milestones, gantt-style, chart-design]
pairs_with:
  prompts: [build-timeline-from-documents, build-gantt-chart-in-sheets, write-plotting-code]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: events
    description: "The dated events or periods: date or start and end, a short label, and any category (team, country, phase). Note any dates that are approximate."
    type: text
    required: true
  - name: purpose_and_medium
    description: "What the timeline should show (sequence, overlap, gaps, pace) and where it goes: slide, report page, web page, poster. Name the tool if fixed (Mermaid, matplotlib, Excel, Flourish, Vega-Lite)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Event table, Layout choice, Design spec, Labels and overlaps, Build notes or code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design timelines for reports, decks and articles. Most timelines fail by spacing events evenly, which hides gaps and bursts, the very things readers need; by cramming labels until they overlap; by mixing instant events and long periods in one style; and by presenting approximate dates as exact. You know the options: a horizontal axis with true time spacing and labels alternating above and below; a vertical list for many events on narrow screens; lanes (swimlanes) by category so parallel streams and overlaps show; bars for periods and points for instants; a broken axis or zoomed inset when a long quiet stretch precedes a dense burst; and shaded eras or phases behind events. Mermaid's timeline diagram spaces sections evenly and suits simple sequences, while a Gantt diagram or plotting code respects real durations.
</context>

<task>
Design a timeline for these events.

<events>
{{events}}
</events>

<purpose_and_medium>
{{purpose_and_medium}}
</purpose_and_medium>

1. Normalise the events into a table: date or start-end, label (at most about 6 words), category, instant or period, exact or approximate. List any event with no usable date as excluded, with the reason.
2. Choose the layout from the count and the purpose: horizontal true-scale axis (up to about 15 to 20 events), vertical list (many events, mobile), lanes by category (parallel streams), bars for periods, or a broken axis or inset when density varies a lot. State whether spacing is true-scale and why.
3. Specify the design: axis ticks at sensible intervals, colour by category only if categories matter (otherwise one colour), distinct marks for instants versus periods, hollow or dashed marks for approximate dates, shaded eras, a "today" marker for plans.
4. Handle labels: alternate above and below, stagger heights, use leader lines, shorten to the essential words, move detail into a numbered note list when needed; highlight the few events the reader must notice.
5. Give build notes or code for the tool named, or the best fit for the medium (Mermaid gantt or timeline for docs, matplotlib or Vega-Lite for reports, Flourish or Datawrapper for web).
</task>

<constraints>
- Use only the dates given; mark approximate ones and never fill a missing date by guessing.
- Do not space events evenly when the gaps carry meaning, unless the medium forces it, and then say so on the chart.
- Keep labels factual and short; do not add events that were not provided.
</constraints>

<output_format>
## Event table
Table: Date or range | Label | Category | Type | Exact or approximate.

## Layout choice
The layout, spacing and why.

## Design spec
Table: Element | Choice | Reason.

## Labels and overlaps
How labels are placed and which events are highlighted.

## Build notes or code
Numbered steps or one code block.
</output_format>
