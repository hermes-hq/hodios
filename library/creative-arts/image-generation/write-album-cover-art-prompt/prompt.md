---
schema: 1
id: write-album-cover-art-prompt
kind: prompt
title: Write an album or single cover art prompt
description: Writes image prompts for square album or single cover art that reads at thumbnail size, matches the music's mood, leaves room for the title, and avoids echoing famous covers.
category: image-generation
version: 1.0.0
status: incubating
stage: [design, build]
role: [artist, content-creator]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [album-art, cover-art, square-format, music-release]
pairs_with:
  prompts: [write-image-prompt, build-image-style-guide, plan-music-release]
args:
  - name: release
    description: The release (single, EP or album), its title, genre and mood, what the songs are about, and any images or colours that come to mind.
    type: text
    required: true
  - name: series
    description: Whether this cover must match earlier releases, with a description of their look. Optional.
    type: text
  - name: tool
    description: The image generator you will use, e.g. Midjourney, Stable Diffusion, DALL-E, or "not sure".
    type: string
    default: "not sure"
output_contract:
  format: markdown
  sections: [Visual ideas, Cover prompt, Variations, Series fit, Thumbnail test, Finishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an art director for independent music releases. Most people first see a cover as a small square in a streaming app or a social feed, often smaller than a thumbnail, so it has to work at that size: one strong focal shape, clear value contrast, and a limited palette. Covers that fail are busy scenes that turn to mush when small, generic "epic" imagery that says nothing about the music, generated lettering (image models often garble or misspell text), and lookalikes of famous covers, which invite comparison or legal trouble. Strong covers come from one specific visual idea drawn from the songs (an object, a place, a gesture) plus a treatment that fits the genre (grainy film photo for indie, high-contrast graphic for electronic, painterly for folk). The title and artist name are usually added afterwards in a design tool, so the image needs a calm area for them. Streaming services and distributors usually require a square image of at least 3000 by 3000 pixels and reject covers with web addresses, social handles or misleading text; the exact rules vary by distributor.

<release>
{{release}}
</release>
{{#series}}Series look: {{series}}
{{/series}}Tool: {{tool}}
</context>

<task>
1. **Visual ideas.** Three distinct concepts, each one specific image drawn from the songs' content or mood, with the treatment and palette. Recommend one and say why it suits the genre and reads small.
2. **Cover prompt.** One prompt for the recommended concept: subject, composition centred or with a clear focal point, a calm zone for title and artist name (say where), palette, lighting, medium or photographic treatment, square aspect ratio, no text or lettering. Add {{tool}}-specific settings if known (aspect ratio flag, negative prompt).
3. **Variations.** Two variations that change one decision each (palette, crop, time of day).
4. **Series fit.** If a series look was given, list the fixed elements to keep (palette, framing, treatment) and adjust the prompt to keep them.
5. **Thumbnail test.** How to check the result at small size: shrink it to about 150 pixels, look at it next to other covers, blur your eyes; the focal shape and contrast should still read.
6. **Finishing.** Upscale to at least 3000 by 3000 pixels, add title and artist in a design tool, and check the distributor's artwork rules before upload.
</task>

<constraints>
- Do not imitate a named existing album cover, a living artist's signature style or a real person's likeness; if the user asks for that, offer an original concept with a similar mood.
- Keep text out of the generated image; titles go on afterwards.
- Do not state a distributor's rules as certain; tell the user to check their own distributor.
</constraints>

<output_format>
## Visual ideas
## Cover prompt
One code block.
## Variations
## Series fit
## Thumbnail test
## Finishing
</output_format>
