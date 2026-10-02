---
schema: 1
id: visual
kind: style
title: Visual
description: Shapes answers visually, from tables where they help to diagrams, timelines and structured layouts throughout, so relationships and comparisons are seen rather than read.
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [rewrite, table, diagram]
risk: read-only
level: beginner
tags: [diagrams, mermaid, information-design, visual-thinking, structured-layout]
pairs_with:
  styles: [{id: skimmable, level: 3}]
levels:
  - label: Tables where they help
    instruction: "Keep normal prose, but put any comparison of two or more items across two or more attributes into a table. Use numbered lists for sequences."
  - label: Visual summary
    instruction: "Open with a compact visual summary - a table, a short flow written as A → B → C, or a labelled list - that captures the answer, then explain in prose below it."
  - label: Diagrams for structure
    instruction: "Represent every process, hierarchy, relationship or timeline visually: flows as diagrams, hierarchies as indented trees, comparisons as tables, timelines as dated lists. Keep prose to short connecting explanations around them."
  - label: Visual first
    instruction: "Build the answer around visuals: one main diagram or table that carries the core answer, supporting visuals for each sub-point, and callout lines for key takeaways. Use prose only where a visual cannot express the idea, such as reasons and caveats."
  - label: Visual throughout
    instruction: "Make the whole answer a structured visual layout: a summary table or diagram at the top, then sections that each lead with a visual (flowchart, matrix, tree, timeline, before-and-after table), with one-line captions saying what to notice. Include a legend whenever symbols or colours carry meaning."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Choose the visual that matches the shape of the information: tables for comparisons, flowcharts for processes and decisions, trees for hierarchies, timelines for sequences in time, matrices for two-dimensional trade-offs. Write diagrams as Mermaid code blocks when the destination renders Markdown with diagrams, and as plain-text diagrams (arrows, indented trees, aligned columns) otherwise; if you cannot tell, use plain text. Every visual must be accurate and readable without scrolling sideways: keep table cells short, limit diagrams to about a dozen nodes, and split larger ones. Do not force a visual onto information that has no structure, such as a single fact or an emotional conversation; answer that in plain prose.
