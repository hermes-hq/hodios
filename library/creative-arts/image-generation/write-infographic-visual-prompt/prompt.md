---
schema: 1
id: write-infographic-visual-prompt
kind: prompt
title: Write an infographic visual prompt
description: Writes image prompts for text-free infographic artwork with sections, matching icons and a palette, then lists every label and number to add afterwards in a design tool.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, teacher]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [text, notes]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [infographics, icons, text-free-artwork, visual-explainers]
pairs_with:
  prompts: [design-infographic, write-icon-set-prompt, write-educational-diagram-prompt]
args:
  - name: message
    description: The one idea a reader should take away, in a sentence.
    type: string
    required: true
  - name: sections
    description: The content of each section, in order (a step, a fact, a comparison), with any numbers and their sources.
    type: text
    required: true
  - name: palette
    description: Brand colours (names or hex codes), or "brand-neutral" for a calm palette chosen to suit the message.
    type: string
    default: brand-neutral
output_contract:
  format: markdown
  sections: [Visual concept, Layout, Base artwork prompt, Section icon prompts, Labels to add, Data note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an information designer who uses image generators for the illustrative layer of infographics. Generated images are good at mood, icons, characters and decorative structure, and bad at the things an infographic depends on: spelling, numbers, and charts whose bars and slices match the data. A model asked for "an infographic about X" invents labels, misspells words and draws charts that mean nothing. So the artwork is generated without any text, with clear empty panels, banners and icon spots, and every word, number and chart is added in a design or slide tool where it can be checked. This prompt covers the artwork. Planning the full layout and copy is a separate job.

Message: {{message}}

<sections>
{{sections}}
</sections>

Palette: {{palette}}
</context>

<task>
1. **Visual concept.** One central metaphor or structure that carries the message (a path with stops for a process, a split scene for a comparison, a cutaway for parts of a whole), in two lines. If the sections are missing or contradict the message, ask up to two questions and stop.
2. **Layout.** The orientation and aspect ratio for the likely use (portrait 4:5 or 2:3 for social and print, 16:9 for slides), and the zones in reading order: a title band, one zone per section, and a footer for sources.
3. **Base artwork prompt.** A prompt for the whole background artwork: the metaphor, the zones as empty panels or blank banners in that reading order, consistent flat illustration style, the palette ({{palette}}; if brand-neutral, choose four colours plus a neutral and name them), generous white space, and "no text, no letters, no numbers, no charts".
4. **Section icon prompts.** One icon per section in a shared style (same line weight, same corner radius, same palette, plain background) so they can be placed on the base artwork; reuse one style sentence verbatim in each.
5. **Labels to add.** A table of every piece of text and number with its zone, taken from the sections as given.
6. **Data note.** Which sections contain numbers that should be shown as a real chart built in a design or spreadsheet tool from the data, and a reminder to keep the source line.
</task>

<constraints>
- Never ask the model to render words, numbers, chart values or logos.
- Use only facts and figures from the sections. Do not add statistics; if a section claims something without a source, flag it in the labels table.
- One metaphor for the whole graphic; do not mix several unrelated visual ideas.
- Keep the reading order obvious: top to bottom or left to right, numbered zones where order matters.
</constraints>

<output_format>
## Visual concept
## Layout
Aspect ratio, then the zones as a numbered list.
## Base artwork prompt
One code block.
## Section icon prompts
One code block per icon.
## Labels to add
Table: Zone | Text | Notes (source, needs checking).
## Data note
</output_format>
