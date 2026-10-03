---
schema: 1
id: write-thumbnail-background-prompt
kind: prompt
title: Write a video thumbnail background prompt
description: Writes image prompts for video thumbnail backgrounds with one focal point, strong contrast and a clean zone for the title, sized to the platform and checked at phone-feed size.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator]
stack: [youtube, midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [topic]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [thumbnails, click-through, composition, text-space]
pairs_with:
  prompts: [package-video-title-thumbnail, write-image-prompt]
args:
  - name: video_topic
    description: What the video is about and what the viewer gets from it, plus the thumbnail concept if you already have one (for example from a title and thumbnail brainstorm).
    type: string
    required: true
  - name: emotion
    description: The feeling the thumbnail should trigger at a glance, e.g. curiosity, urgency, calm, awe, amusement.
    type: string
    default: curiosity
  - name: text_space
    description: Where the title text will sit, so that side stays clean.
    type: enum
    enum: [left, right, top]
    default: right
  - name: aspect_ratio
    description: Width to height. 16:9 for standard video, 9:16 for vertical shorts, 1:1 for some feeds.
    type: string
    default: "16:9"
output_contract:
  format: markdown
  sections: [Concept, Prompt, Variations, Composite plan, Small-size check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design thumbnails for video creators. Most viewers see a thumbnail at a few centimetres wide in a phone feed, next to a dozen others, for well under a second. What survives at that size: one focal subject, no more than three elements, a big difference between light and dark, one or two saturated colours against a quieter background, and a clean area where large title words will go. Fine detail, busy scenery and small objects turn to noise. The background image is only one layer: the creator's own face cut-out, the title and any arrows are added afterwards in an editor, so the generated image must leave room for them. Platforms place a timestamp over the bottom-right corner of standard video thumbnails, so nothing important goes there.

Video topic: {{video_topic}}
Emotion: {{emotion}}
Text space: {{text_space}}
Aspect ratio: {{aspect_ratio}}
</context>

<task>
1. **Concept.** In two lines, the single visual idea that makes someone feel {{emotion}} about this topic and that matches what the video actually delivers. If the topic is too vague to picture (for example "my new video"), ask one question and stop.
2. **Prompt.** Write one prompt that states: the focal subject and where it sits (the third opposite the {{text_space}} side, or the lower two thirds if the text is on top); a background that stays simple and darker or lighter than the subject so it pops; lighting that separates subject from background (rim light, a bright subject on a dark ground, or the reverse); a palette of one strong accent colour plus neutrals; shallow depth of field if photographic; a clean, low-detail area on the {{text_space}} side with no objects; nothing important in the bottom-right corner; aspect ratio {{aspect_ratio}}; no text, letters or logos.
3. **Variations.** Two alternatives that change one decision each (the focal object, or the colour and light scheme), with one line on what each tests. These give the creator options for an A/B thumbnail test if their platform offers one.
4. **Composite plan.** Where the creator's face cut-out (if used) and the title go, the size of the title (it should fill most of the clean zone, three to five words), and a reminder to use their own photo rather than a generated face.
5. **Small-size check.** How to test the result: shrink it to about 10 percent on screen or view it on a phone next to other thumbnails, and what to change if the subject disappears.
</task>

<constraints>
- Never generate the face of a real, identifiable person, including the creator or a celebrity. Faces come from the creator's own photos.
- The image must not promise something the video does not contain; no fake reactions, fake events or misleading objects.
- No text in the generated image; titles are set in an editor where spelling and font are controlled.
- Avoid filler quality tags ("8k", "masterpiece"); use visual descriptions instead.
</constraints>

<output_format>
## Concept
## Prompt
One code block, then the suggested pixel size (1280 x 720 for 16:9, 1080 x 1920 for 9:16, 1080 x 1080 for 1:1).
## Variations
Two code blocks, each with a one-line note.
## Composite plan
## Small-size check
A short checklist.
</output_format>
