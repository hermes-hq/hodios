---
schema: 1
id: write-image-edit-prompt
kind: prompt
title: Write an image-edit prompt
description: Writes precise AI image-edit instructions for inpainting, background changes, style transfer or object removal that state what must not change, with mask guidance and checks. Use before an edit.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [designer, graphic-designer, content-creator, artist]
stack: [stable-diffusion, midjourney, dall-e]
requires: [none]
inputs: [text, image]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [inpainting, image-editing, background-replacement, style-transfer]
pairs_with:
  prompts: [write-image-prompt, write-product-photo-prompt, build-image-style-guide]
args:
  - name: image_description
    description: What is in the image now (subject, setting, framing, lighting, style), or attach the image and describe what matters. Mention text, logos or faces that must stay exactly as they are.
    type: text
    required: true
  - name: desired_change
    description: The edit you want, e.g. "replace the grey sky with a sunset", "remove the person on the left", "make it look like a watercolour", "change the jacket to red leather".
    type: text
    required: true
  - name: tool
    description: "instruction: chat-style editors told in plain sentences. inpainting: a mask plus a prompt for the masked area (Stable Diffusion interfaces, Generative Fill). region-editor: select a region and prompt it, as in Midjourney's editor. generic: any tool."
    type: enum
    enum: [instruction, inpainting, region-editor, generic]
    default: generic
output_contract:
  format: markdown
  sections: [Edit plan, Preserve list, Prompts, Mask and settings, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Image edits go wrong in predictable ways: the model "improves" things it was not asked to touch (faces change, text garbles, the framing shifts), the inserted element does not match the light, perspective or grain of the original, removed objects leave smears or ghost shadows, and a single prompt that asks for several changes does none of them well. Good edit instructions name the one change, describe exactly what must stay the same, specify how the new content should match the existing image (light direction, colour temperature, shadows, perspective, texture), and break complex edits into passes. Mask-based tools add another rule: the prompt describes what should fill the masked area, not the whole picture.
</context>

<task>
Write {{tool}} edit instructions.

<image>
{{image_description}}
</image>

<change>
{{desired_change}}
</change>

1. **Edit plan:** restate the change in one line and split it into passes if it involves more than one change (for example remove the bin first, then change the sky). If the description of the image is too thin to know what must be preserved or how the light falls, ask up to three questions and stop.
2. **Preserve list:** everything that must not change: identity and facial features, pose, framing and crop, the product or logo, any text, the lighting direction and colour temperature, background elements, image style and grain. Be specific to this image.
3. **Prompts:** one per pass, formatted for {{tool}}:
   - **instruction:** plain sentences: the change first ("Replace the overcast sky with a warm sunset sky with soft pink and orange clouds"), then a matching instruction ("Adjust the light on the building to warm, low sun from the left to match"), then "Keep everything else exactly the same:" followed by the preserve list.
   - **inpainting:** a prompt describing only what fills the masked area, in the same style and light as the surrounding image, plus a negative prompt if the interface has one.
   - **region-editor:** a short prompt for the selected region that describes the new content and how it matches its surroundings, with a note on which area to select.
   - **generic:** a clear instruction paragraph, then "Preserve:" and the list.
   For removals, describe what should be behind the removed object (continuing pavement, the rest of the wall pattern), not the object. For background changes, keep the subject's edges, add contact shadows and match light direction and colour temperature. For style transfer, keep composition and identity and state how strong the stylisation should be.
4. **Mask and settings:** for mask-based tools: what to mask (include shadows and reflections of removed objects; mask slightly beyond the edges for clean blending, but not into areas that must stay), and starting values for denoising or strength (about 0.3 to 0.5 for subtle changes, 0.6 to 0.8 to replace content, higher only to generate something new). For others: any useful settings, and to start from the original image each time rather than re-editing an already edited result when quality drifts. Tell the user settings vary by tool.
5. **Checks:** a checklist for reviewing the result: preserved items unchanged (compare side by side at 100 percent zoom), light and shadow direction consistent, edges clean, no repeated textures or artefacts, text and logos intact, and what to try if each check fails.
</task>

<constraints>
- One change per pass. Do not add improvements the user did not ask for.
- Do not write instructions to remove watermarks or credits from images the user does not own, to alter identity documents or evidence, or to place a real, identifiable person into a compromising, sexual or deceptive scene.
- If the edit would make a product photo misrepresent the real product (colour, size, features) for a listing, flag it.
</constraints>

<output_format>
## Edit plan
## Preserve list
## Prompts
One code block per pass, labelled Pass 1, Pass 2.
## Mask and settings
## Checks
A checklist.
</output_format>
