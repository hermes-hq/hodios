---
schema: 1
id: write-image-prompt
kind: prompt
title: Write an image-generation prompt
description: Turns a rough idea into a detailed image-generation prompt (subject, composition, lighting, style, lens) in the chosen tool's syntax, with settings and variations. Use before generating an image.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [artist, content-creator, designer, marketer]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [text, topic]
output: [prompt]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [composition, lighting, negative-prompts, aspect-ratio]
pairs_with:
  prompts: [build-image-style-guide, create-storyboard]
args:
  - name: idea
    description: What you want to see, in your own words, plus where the image will be used (e.g. blog header, poster, game concept).
    type: text
    required: true
  - name: tool
    description: "Target syntax. midjourney: parameters such as --ar and --no. stable-diffusion: positive and negative prompt fields with optional weights (also FLUX and other open models). chat-based: tools you brief in plain sentences, such as ChatGPT images, Gemini or Firefly. generic: any tool."
    type: enum
    enum: [midjourney, stable-diffusion, chat-based, generic]
    default: generic
  - name: aspect_ratio
    description: Width to height, e.g. 1:1, 16:9, 4:5, 9:16.
    type: string
    default: "1:1"
output_contract:
  format: markdown
  sections: [Interpretation, Prompt, Settings, Variations, Tuning tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Weak image prompts are either too thin ("a cat in space") so the model fills every gap with its defaults, or stuffed with filler ("masterpiece, 8k, trending, ultra detailed") that current models mostly ignore. Strong prompts describe the picture a photographer or illustrator would plan: the subject and what it is doing, the setting, the framing and camera, the light, the medium and style, the palette and mood. They also respect how each tool reads text: some take parameters, some take a separate negative prompt, some read only plain sentences.
</context>

<task>
Write a {{tool}} prompt at aspect ratio {{aspect_ratio}} for this idea:

<idea>
{{idea}}
</idea>

1. **Interpretation:** in 2 to 3 lines, say what image you are aiming for and any choices you made where the idea was open (subject details, setting, style). If the idea is so open that the result could go in very different directions (for example "something cool for my brand"), ask up to three questions and stop.
2. Build the description in this order, using concrete visual words:
   - **Subject:** who or what, appearance, pose or action, expression;
   - **Setting:** place, time of day, weather, background elements;
   - **Composition:** shot size (close-up, medium, wide), angle (eye level, low, overhead), subject placement, depth of field, negative space for text if the use needs it;
   - **Light:** source, direction, quality and colour (soft window light from the left, golden hour backlight, hard noon sun);
   - **Medium and style:** photograph, oil painting, flat vector, 3D render, ink, and so on, described by technique and era rather than by naming a living artist;
   - **Camera or rendering details** where they help: lens focal length, film stock look, aperture for photographs; brush or line quality for illustration;
   - **Palette and mood.**
3. Format it for {{tool}}:
   - **midjourney:** one descriptive prompt in natural language, most important elements first, then parameters at the end: `--ar {{aspect_ratio}}`, and where useful `--no` for unwanted elements, `--style raw` for a more literal photographic look, or `--stylize` to tune how much the model's own aesthetic applies. Parameter names and ranges change between versions; tell the user to check them for their version.
   - **stable-diffusion:** a positive prompt and a separate negative prompt. Use concise comma-separated phrases; mention that attention weights like `(golden light:1.2)` work in common interfaces such as AUTOMATIC1111 and ComfyUI, and that newer models (SD3, FLUX) follow full sentences better and may ignore or not support negative prompts. Give suggested width and height in multiples of 64 that match the ratio near the model's native resolution, plus typical steps and guidance (CFG) values as starting points.
   - **chat-based:** plain, complete sentences, as you would brief an illustrator. No parameter syntax, no weights. State the orientation and aspect ratio in words, and tell the user to pick the matching size setting if the tool has one. Phrase exclusions positively ("an empty beach") because there is no negative prompt field. Put any text that must appear in the image in quotes, exactly as it should be spelled, and keep it short.
   - **generic:** a clear natural-language paragraph, then an "Avoid:" line, then the aspect ratio.
4. Give 2 variations that change one decision each (composition, light or style) and say what each changes.
5. Give 3 tuning tips specific to this image: what to change if the result is too busy, wrong in mood, or misses a detail.
</task>

<constraints>
- Do not add filler quality tags ("masterpiece", "8k", "best quality") unless the tool is stable-diffusion with a model known to respond to them, and say so if you do.
- Do not name living artists as a style to copy. Describe the stylistic qualities instead.
- Do not write prompts for realistic images of real, identifiable people in false or sexual situations, or for images that imitate a real organisation's branding to deceive.
- Keep the main prompt under about 75 words for midjourney and stable-diffusion; detail beyond that is often ignored.
</constraints>

<output_format>
## Interpretation
## Prompt
The prompt in a code block, ready to paste. For stable-diffusion, two code blocks labelled Positive and Negative.
## Settings
Aspect ratio and any tool settings, or "none needed".
## Variations
Two code blocks, each with a one-line note.
## Tuning tips
</output_format>

<examples>
<example>
Idea: "cosy reading nook for a bookshop's Instagram", tool generic, 4:5.
Prompt: "A cosy reading nook in a small independent bookshop on a rainy afternoon. A deep green velvet armchair beside a tall wooden bookshelf, a knitted blanket and a steaming mug of tea on a side table. Soft warm lamplight from the left, rain on the window behind, shallow depth of field. Photograph, 35 mm lens, muted warm palette of green, amber and cream, calm and inviting. Empty space at the top for a caption." Avoid: people, visible logos, text. Aspect ratio 4:5.
</example>
</examples>
