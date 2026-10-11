---
schema: 1
id: write-fashion-lookbook-video-prompts
kind: prompt
title: Write fashion lookbook video prompts
description: Writes generated lookbook clips for real garments that keep cut, colour, print and fabric movement accurate, using garment references and safe moves, with checks before the clips are used to sell.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, content-creator, designer]
requires: [none]
inputs: [image, text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [lookbook, garment-accuracy, fabric-motion, apparel-marketing]
pairs_with:
  prompts: [write-product-video-prompt, write-image-to-video-motion-prompt, review-generated-video-takes]
args:
  - name: garments
    description: "Each garment exactly as made: type, cut, fabric and weight (e.g. heavy wool, light silk), colour, print or pattern, closures, logo placement. Attach product photos if you have them."
    type: text
    required: true
  - name: use
    description: "Where the clips go, e.g. 'product pages', 'social launch', 'internal line review'."
    type: text
    required: true
  - name: setting
    description: The look of the shoot, e.g. 'white studio cyclorama', 'city street at dusk'.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Garment lock, Move plan, Shot prompts, Accuracy checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A lookbook clip has to show how a garment moves, but in generated video garments drift: prints rearrange, buttons multiply, hems change length, colours shift with the light, and a turn invents a back that does not exist. Fabric behaviour is a tell: silk flows and catches light, heavy wool barely sways, denim creases rather than ripples; a wrong description makes the garment look like a different product. Stylists describe fabric by weight and behaviour, keep moves simple (a walk toward camera, a slow half turn, a hand brushing the fabric), and start from photos of the real garment. When clips are used to sell, the garment on screen must match the garment shipped, including colour under neutral light, and many platforms and places expect generated models or imagery to be disclosed.
</context>

<task>
Write lookbook clips for these garments.

<garments>
{{garments}}
</garments>

Use: {{use}}
Setting: {{setting}}

1. **Garment lock.** For each garment, a fixed description block: type, cut and length, fabric with weight and how it moves, exact colour in plain words, print or pattern with scale and placement, closures and details, and any logo (to be composited in the edit, not generated). Ask for the back view or a photo if a turn is planned and the back is not described.
2. **Move plan.** For each garment, one or two moves that show its fabric without inventing unseen parts: a walk toward camera, a slow quarter or half turn only if the back is known, a sleeve or hem detail with a hand, a breeze for light fabrics. Note moves to avoid (full spins of printed pieces, fast motion on fine patterns).
3. **Shot prompts.** One prompt per clip: framing that shows the garment clearly, the garment lock word for word, the move, neutral light that keeps colour true, the setting, and a model described generically (or a consenting real model's reference). Recommend starting from a product photo as the first frame where the tool allows.
4. **Accuracy checks.** A checklist to compare each clip with the real garment: colour under neutral light, print scale and placement, number of buttons and pockets, length and fit, logo intact, back view matches if shown. Add: label generated imagery where the platform or local rules require it, and do not use a clip that misrepresents the product.
5. Before answering, check every prompt repeats the garment lock exactly and no move reveals an undescribed part.
</task>

<constraints>
- Do not make garments look different from what will be sold (colour, fit, fabric quality, details).
- No real, identifiable people as models without their consent; do not alter body shapes to unrealistic proportions.
- No tool, model or version names; do not name other brands or designers as style references.
</constraints>

<output_format>
## Garment lock
One code block per garment.
## Move plan
Table: Garment | Moves | Avoid.
## Shot prompts
Numbered code blocks.
## Accuracy checks
Checklist.
</output_format>
