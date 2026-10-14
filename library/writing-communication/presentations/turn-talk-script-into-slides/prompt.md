---
schema: 1
id: turn-talk-script-into-slides
kind: prompt
title: Turn a talk script into slides
description: Turns a finished speech or talk script into a small set of slides that support the speaker rather than repeat them, with the exact line in the script where each slide changes.
category: presentations
version: 1.0.0
status: incubating
stage: [design]
role: [individual, manager, researcher, writer]
requires: [none]
inputs: [text]
output: [outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [script-to-slides, slide-cues, visual-support, keynote-style, minimal-slides]
pairs_with:
  prompts: [plan-slide-visuals, write-speech, plan-slide-builds-and-reveals]
  personas: [presentation-designer]
args:
  - name: script
    description: The full text you will say, as written.
    type: text
    required: true
  - name: style
    description: How much should be on the slides.
    type: enum
    enum: [minimal-visual, key-words, data-heavy]
    default: minimal-visual
  - name: max_slides
    description: Maximum number of slides, if you have a limit. Optional.
    type: number
output_contract:
  format: markdown
  sections: [Approach, Slides, Cue sheet, Script lines to adjust]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a written talk into slides for people who wrote the words first. This is the opposite of a document-to-slides conversion: the script already carries the content, so the slides should not repeat it. Slides earn their place where the eye beats the ear: a number to remember, a comparison, a picture of something hard to describe, a quote worth seeing, a structure (three steps) or a reminder of where we are. Elsewhere a blank or neutral slide keeps attention on the speaker. A slide that shows the next sentence before it is said kills the moment, so cues matter: each slide change is tied to an exact line. Keynote-style talks often use one image or a few words per slide; data talks need charts with one message each.

<script>
{{script}}
</script>

Style: {{style}}
{{#max_slides}}Maximum slides: {{max_slides}}{{/max_slides}}
</context>

<task>
1. Read the script and mark the moments where a visual helps the listener: numbers, comparisons, lists, structure, things to picture, quotes, section changes. Say briefly why each one helps.
2. Design one slide for each chosen moment in the {{style}} style: a short title or none for minimal-visual, three to six key words for key-words, one chart with an assertion title for data-heavy. Describe images and charts in words with what they must show; never invent data not in the script.
3. Put a neutral or section slide where the speaker should hold attention, such as a personal story.
4. Write the cue sheet: for each slide, the exact words in the script at which to advance, quoted.
5. Note any script lines that should change because a slide now carries the information (for example, a long list of numbers that the slide shows), and suggest the shorter spoken line.
{{#max_slides}}6. Stay within {{max_slides}} slides; say which moments were dropped.{{/max_slides}}
</task>

<constraints>
- Do not put full sentences from the script on slides, except a quote meant to be read.
- Use only facts and numbers from the script.
- Do not reveal a punchline or number on a slide before the line that says it.
</constraints>

<output_format>
## Approach
Two or three lines on how many slides and why.

## Slides
Table: # | Slide content | Visual description | Why it helps.

## Cue sheet
Table: # | Advance on the words.

## Script lines to adjust
Original and suggested line, if any.
</output_format>
