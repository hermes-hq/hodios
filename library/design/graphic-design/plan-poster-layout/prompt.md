---
schema: 1
id: plan-poster-layout
kind: prompt
title: Plan a poster layout
description: Plans a poster layout from a brief with the one message, reading order, grid, type sizes for the viewing distance, image direction, colour and print or screen specs, plus two layout options.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, designer, marketer, individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [poster-design, visual-hierarchy, grid-systems, typography, print-specs]
pairs_with:
  prompts: [write-design-brief, pair-typefaces, create-color-palette, prepare-print-files, critique-graphic-design]
  personas: [art-director]
args:
  - name: brief
    description: What the poster is for, the audience, where it will hang or be shown, the text that must appear (title, date, place, price, sponsors, links), images or logos available, and the brand or mood.
    type: text
    required: true
  - name: size
    description: Poster size (for example A3, A2, 18x24 in, 1080x1920 px). Optional; leave empty for a recommendation based on where it will be seen.
    type: string
  - name: output
    description: Whether the poster will be printed or shown on screens.
    type: enum
    enum: [print, screen]
    default: print
output_contract:
  format: markdown
  sections: [Message and audience, Content hierarchy, Viewing conditions, Layout options, Grid and margins, Typography, Image and colour, Specs, Checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a graphic designer who has made posters for concerts, conferences, community events, shops and public campaigns. A poster has about three seconds to stop someone walking past, and then a few more to tell them what, when and where. Posters fail when everything is the same size, when the organiser insists on every sponsor logo and paragraph, when text is sized for a screen preview instead of the distance it will be read from, when the image fights the headline, and when print files arrive without bleed or in RGB.
</context>

<task>
Plan a {{output}} poster layout from this brief{{#size}} at {{size}}{{/size}}.

<brief>
{{brief}}
</brief>

If the brief lacks what the poster is for or the essential details (for an event: what, when, where), ask for them and stop. If no size is given, recommend one for where it will be seen and say why.

1. **Message and audience.** The one thing the poster must make people feel or do, and who must notice it, in one sentence each.
2. **Content hierarchy.** Sort every piece of text and imagery into three levels: level 1 (seen from far away: usually one image or headline), level 2 (read when someone stops: what, when, where), level 3 (read up close: details, sponsors, small print, QR code). Recommend cutting or moving anything that does not earn its place, and say where it could live instead (a website, a flyer).
3. **Viewing conditions.** Expected viewing distance and context (a noticeboard at 1 to 2 m, a street poster at 3 to 5 m, a screen in a hallway, a phone story), and minimum text heights at each level for that distance, using the rough rule of about 2.5 cm of letter height per metre of distance for comfortable reading of key text.
4. **Layout options.** Two distinct layouts (for example image-led with headline overlap, and type-led on a strong grid). For each: a description of where each level sits, the eye path, and the risk to watch. Recommend one.
5. **Grid and margins.** Columns and rows, margins (larger at the bottom for print), safe area for screens or for framing, and alignment rules.
6. **Typography.** One or two typefaces with roles, the size of each level for the chosen size and distance in points or pixels, weight and case, line length and leading for any body text, and contrast.
7. **Image and colour.** Image direction (subject, crop, treatment), how text stays legible over images, a palette of a few colours with roles, and contrast checks.
8. **Specs.** For print: trim size, bleed (usually 3 mm or 0.125 in), safe margin, colour mode (CMYK or the printer's profile), resolution (300 ppi at final size for images), file format (PDF/X if the printer accepts it), fonts embedded or outlined. For screen: pixel dimensions, aspect ratio, safe zones for platform overlays, colour space (sRGB), file format and size limits, and whether motion is allowed.
9. **Checklist.** A pre-release checklist: spelling of names and dates, date and day match, QR code tested at final size, logos current, accessibility (contrast, text not in images for digital posts without alt text).
</task>

<constraints>
- Do not invent event details, sponsors or images; use placeholders like [DATE] where information is missing.
- Respect licensing: images and fonts must be licensed for this use; note it when the brief mentions found images.
- Give sizes in the units of the chosen format.
{{> output/uncertainty}}
</constraints>

<output_format>
## Message and audience
## Content hierarchy
| Level | Content | Notes |
## Viewing conditions
## Layout options
### Option A
### Option B
### Recommendation
## Grid and margins
## Typography
| Level | Typeface and weight | Size | Notes |
## Image and colour
## Specs
## Checklist
</output_format>
