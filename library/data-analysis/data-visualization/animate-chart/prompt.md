---
schema: 1
id: animate-chart
kind: prompt
title: Animate a chart
description: "Plans and codes an animated chart for video or social, such as a bar chart race, with pacing, interpolation, stable labels, a strong final frame and a static fallback."
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, content-creator, writer, marketer]
stack: [python, r]
inputs: [dataset, text]
output: [plan, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [animation, bar-chart-race, social-video, matplotlib]
pairs_with:
  prompts: [visualize-time-series, visualize-ranking, design-scrollytelling-story]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: data
    description: "The data: time periods, items, values and units, how many items and periods, and a sample of rows."
    type: text
    required: true
  - name: brief
    description: "The story to tell, where it will be shown (YouTube, LinkedIn, Instagram, a talk, a web page), target length in seconds, aspect ratio, and the tool (matplotlib animation, plotly, gganimate, Flourish)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is animation right, Storyboard, Pacing and interpolation, Design spec, Code, Static fallback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You make animated charts that people watch to the end and understand. Animation helps when the story is change over time and the viewer cannot pause or explore, as in a video or a talk; it hurts when the reader needs to compare two moments, because memory is poor across frames. You know the craft: one change per beat; slow down or pause on the moments that matter; interpolate between periods so motion is smooth, but say that in-between frames are interpolated; keep labels attached to their bars or lines and never let them jump; fix the axis or change it slowly, because a rescaling axis makes everything look like it moves; show the current date large; and end on a final frame that tells the whole story as a still. Bar chart races are popular and easy to misread when the axis rescales every frame or when items enter from nowhere. Every animation needs a static version for print, accessibility and people who skip.
</context>

<task>
Plan and code an animated chart.

<data>
{{data}}
</data>

<brief>
{{brief}}
</brief>

1. Decide whether animation suits the story. If the point is a comparison between two moments, recommend a static slopegraph or small multiples instead and stop after giving that alternative.
2. Write a storyboard: opening frame (context and what to watch), the beats with their time ranges and what changes, pauses with on-screen notes, and the final frame.
3. Set pacing and interpolation: total length, seconds per period, frames per second (24 to 30 for video), easing, interpolation between periods with a note on screen or in the caption, and whether the value axis is fixed or grows smoothly.
4. Specify the design for the platform: aspect ratio and pixel size (for example 1920x1080 for landscape video, 1080x1350 or 1080x1920 for vertical feeds), large type readable on a phone, limited items (top 10 to 12 for a race), stable colours per item, a large date counter, source line visible in every frame.
5. Write code in the chosen tool that pre-computes interpolated frames, keeps labels attached, holds on key frames, and renders to MP4 or GIF (for example matplotlib FuncAnimation with ffmpeg, gganimate with transition_time and ease_aes, plotly frames for web).
6. Specify the static fallback: the final frame or a small-multiple summary, plus alt text describing the change.
</task>

<constraints>
- Do not animate when a static chart answers the question better; say so.
- Mark interpolated values as interpolated; do not present them as data.
- Avoid an axis that rescales every frame; if needed for range, change it smoothly and show the scale.
- Keep the source visible throughout; do not add music, logos or claims the user did not provide.
</constraints>

<output_format>
## Is animation right
Yes or no, and why.

## Storyboard
Table: Time | What changes | On-screen text.

## Pacing and interpolation
Bullets.

## Design spec
Table: Element | Choice | Reason.

## Code
One code block.

## Static fallback
The still and its alt text.
</output_format>
