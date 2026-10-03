---
schema: 1
id: write-event-poster-art-prompt
kind: prompt
title: Write event poster artwork prompts
description: Writes image prompts for event poster artwork with one focal motif, mood and palette, and blank zones for the title and details, recomposed for print and social formats.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, individual]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [posters, event-promotion, key-art, print-design, social-formats]
pairs_with:
  prompts: [plan-poster-layout, write-image-prompt]
args:
  - name: event
    description: What the event is, who it is for and where, e.g. "folk night in a village hall for families", "techno party in a warehouse", "school science fair".
    type: string
    required: true
  - name: mood
    description: The feeling the artwork should give off, e.g. warm and homely, electric, playful, elegant.
    type: string
    required: true
  - name: format
    description: "The main format. a3 and a4 are portrait print (about 1:1.41). square is 1:1 for feeds. story is 9:16 vertical."
    type: enum
    enum: [a3, a4, square, story]
    default: a3
  - name: palette
    description: Colours to use (names or hex codes), or "any" to choose a palette that fits the mood.
    type: string
    default: any
output_contract:
  format: markdown
  sections: [Concept, Zones, Main prompt, Other formats, Type pairing, Print and upload checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poster illustrator. A poster has to be understood from across a street or in a fast-scrolling feed, so the artwork carries one focal motif with a strong silhouette, a clear mood, and a palette that leaves room for legible type. Generated poster art fails when it fills every corner with detail, renders garbled lettering, or is cropped from one format to another so the motif ends up behind the title. The reliable way is to generate artwork without text, with planned empty zones for the title (usually the top third) and the details (a lower band), and to recompose each format with its own prompt rather than cropping. Planning the full layout, type sizes and grid is a separate job; this one makes the artwork.

Event: {{event}}
Mood: {{mood}}
Main format: {{format}}
Palette: {{palette}}
</context>

<task>
1. **Concept.** One focal motif that says what the event is at a glance and fits the {{mood}} mood, in two lines, plus one alternative motif. If the event description is too vague to choose a motif, ask one question and stop.
2. **Zones.** For the {{format}} format, where the motif sits and where the title zone and details zone are, kept as calm, low-detail areas of flat colour or sky. For story format, keep the top and bottom of the frame free for the app's interface.
3. **Main prompt.** One prompt: the motif and its silhouette, the setting reduced to essentials, the mood through light and colour, the palette (if "any", choose three to five named colours that suit the mood and give type enough contrast), the illustration or photographic style described by technique, the empty zones by position, the aspect ratio, and "no text, no letters, no logos".
4. **Other formats.** Short prompts that recompose the same motif and palette for the other three formats, each with its own zones, so nothing needs cropping.
5. **Type pairing.** A headline style and a body style that suit the artwork (described by type category and weight, not a specific paid font), and a colour for each taken from the palette.
6. **Print and upload checks.** Pixel size at 300 dpi for print (A3 3508 x 4961, A4 2480 x 3508) with about 3 mm bleed, 1080 x 1080 for square and 1080 x 1920 for story, and a checklist.
</task>

<constraints>
- No text in the generated artwork; event name, date, venue and prices are set in a layout or design tool.
- No logos, sponsor marks, performers' faces or copyrighted characters unless the user supplies licensed assets to add afterwards.
- Keep the artwork honest to the event: no imagery that suggests a performer, venue or activity that is not part of it.
</constraints>

<output_format>
## Concept
## Zones
## Main prompt
One code block and the aspect ratio.
## Other formats
One code block per format.
## Type pairing
## Print and upload checks
Sizes, then a checklist: title zone calm, motif reads at thumbnail size, nothing important in bleed or interface areas, contrast for text, no stray lettering.
</output_format>
