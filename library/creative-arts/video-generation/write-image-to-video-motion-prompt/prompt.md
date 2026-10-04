---
schema: 1
id: write-image-to-video-motion-prompt
kind: prompt
title: Write an image-to-video motion prompt
description: Writes a motion prompt that animates a still image, naming what moves, what stays fixed, the camera move and the pace, so faces, text and logos do not warp.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, artist]
requires: [none]
inputs: [image, text]
output: [prompt]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [image-to-video, camera-movement, motion-control, animate-still]
pairs_with:
  prompts: [write-video-generation-prompt, write-looping-video-prompt, fix-video-generation-drift]
args:
  - name: image
    description: "The still to animate (attach it) or a description of it: subject, layout, foreground and background, and any faces, hands, text or logos in the frame."
    type: text
    required: true
  - name: motion
    description: "What you want to happen, e.g. 'steam rises from the cup and her hair moves in a breeze', or 'make it feel alive'."
    type: text
    required: true
  - name: seconds
    description: Clip length in seconds.
    type: number
    default: 5
  - name: camera
    description: "Camera behaviour: static (locked off), slow-push (gentle move in), pan (sideways turn), orbit (arc around the subject), handheld (small organic shake)."
    type: enum
    enum: [static, slow-push, pan, orbit, handheld]
    default: slow-push
output_contract:
  format: markdown
  sections: [Frame map, Motion prompt, Settings, Gentler and bolder versions, If it warps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In image-to-video, the image already fixes the subject, composition and look. The prompt's only job is motion: what moves, how far, how fast, and what the camera does. Most failed animations come from asking for too much: a face that turns and speaks, a camera that orbits a product with a printed label, several things happening at once. The model then invents pixels it cannot see and faces melt, text scrambles and logos bend. A good motion prompt spends a small motion budget on a few elements, protects the fragile ones explicitly and describes the end state.
</context>

<task>
Write a motion prompt for this still.

<image>
{{image}}
</image>

<motion>
{{motion}}
</motion>

Length: {{seconds}} seconds. Camera: {{camera}}.

1. If the image is not attached and the description does not say what the subject is and where the faces, hands, text or logos sit, ask for those details in one message and stop.
2. **Frame map.** Sort what is in the frame into:
   - **Moves:** at most two or three elements, each with a type of motion (drift, sway, ripple, rise, blink, turn) and an amount (subtle, moderate, strong);
   - **Stays fixed:** the rest of the composition;
   - **Protected:** faces, hands, readable text, logos, product labels, fine patterns. For each, choose a protection: keep it still, keep motion away from it, or plan to restore it in the edit (overlay the original still or composite the logo afterwards).
   If the requested motion conflicts with a protected element (for example "she says hello" on a close-up face, or a full orbit around a labelled bottle), say so plainly and propose the nearest motion that will hold up.
3. **Motion prompt.** Write one paragraph in this order: camera behaviour ({{camera}}) with direction and speed over {{seconds}} seconds; the moving elements with precise verbs, amounts and pace; an explicit statement of what stays still; the end state of the shot. Do not re-describe the whole image; mention only what moves or must hold. Phrase it positively ("the bottle and its label stay still and sharp") rather than as a list of negatives, unless the tool has a separate negative field.
4. **Settings.** Recommend a motion amount (low, medium, high) if the tool exposes one, keep the source image's aspect ratio, and suggest reusing the seed across retries where possible. Tell the user to check their tool's current controls rather than assuming names.
5. **Gentler and bolder versions.** One version with half the motion and one with more, each with a line on the risk it trades.
6. **If it warps.** Three fixes specific to this image, each changing one thing only.
7. Before answering, check that the prompt moves no more than three elements, names every protected element as still or handled, and fits {{seconds}} seconds at the stated pace.
</task>

<constraints>
- Do not animate an image of a real, identifiable person to make them say or do things, or any image of a minor in a sexualised way; decline and offer a non-identifying alternative.
- Do not ask the model to change readable text or logos; restoring them in the edit is the reliable route.
- No tool, model or version names.
</constraints>

<output_format>
## Frame map
Three short lists: Moves, Stays fixed, Protected (with the protection chosen).
## Motion prompt
Code block.
## Settings
## Gentler and bolder versions
Two code blocks with a one-line note each.
## If it warps
Three numbered fixes.
</output_format>

<examples>
<example>
Image: a ceramic mug of coffee on a wooden table by a rainy window, the café's logo printed on the mug. Motion: "cosy, alive". Camera: slow-push.
Motion prompt: "Very slow push-in toward the mug over five seconds. Thin steam curls upward from the coffee and drifts left. Raindrops slide down the window glass behind. The mug, its printed logo and the table stay completely still and sharp. Ends on a slightly closer framing of the mug with steam still rising."
</example>
</examples>
