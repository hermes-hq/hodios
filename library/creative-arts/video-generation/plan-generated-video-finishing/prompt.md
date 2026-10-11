---
schema: 1
id: plan-generated-video-finishing
kind: prompt
title: Plan finishing for generated video
description: Plans the finishing pass for an edit built from generated clips, with frame-rate conform, upscaling, deflicker, grade and grain in the right order, plus the delivery spec and a QC checklist.
category: video-generation
version: 1.0.0
status: incubating
stage: [ship]
role: [content-creator, editor, artist]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [post-production, upscaling, frame-rate-conform, colour-grade]
pairs_with:
  prompts: [review-generated-video-takes, write-vfx-element-prompts, write-slow-motion-shot-prompt]
  workflows: [ai-short-film-track]
args:
  - name: clips
    description: "The clips in the edit with what you know about each: resolution, frame rate, length, source (generated, filmed, stock) and visible issues."
    type: text
    required: true
  - name: delivery
    description: "Where it will be shown and any spec you were given, e.g. 'vertical social, 1080x1920' or 'festival screener, spec attached'."
    type: text
    required: true
  - name: tools
    description: What you edit and finish with, described generically (for example 'a free editor with basic colour tools'), so the plan fits.
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Finishing order, Per-issue fixes, Delivery spec, QC checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An edit made of generated clips usually mixes resolutions, frame rates and looks: one clip is sharp and saturated, the next soft and flat, a third shimmers. Finishing makes them read as one film. Order matters. Conform frame rates first so motion is consistent; lock the edit before upscaling so you only upscale what you use; deflicker and clean up before grading so the grade does not exaggerate problems; grade to match shots to each other, then apply the overall look; add a uniform layer of grain across everything at the end to unify textures and hide small artefacts; put titles and graphics on last, at final resolution. Upscalers and frame interpolation can add their own artefacts (waxy faces, invented detail, warping), so each needs a check.
</context>

<task>
Plan the finishing pass.

<clips>
{{clips}}
</clips>

Delivery: {{delivery}}
{{#tools}}Tools: {{tools}}{{/tools}}

1. **Inventory.** List each clip with resolution, frame rate and issues as given; mark unknowns the user should check in their editor. Choose the project frame rate and resolution from the delivery target and the majority of clips.
2. **Finishing order.** A numbered order of operations for this project: conform frame rates (how to handle clips at other rates: retime, frame blend or interpolate, with the trade-offs), lock the edit, upscale only the used ranges (which clips need it), deflicker and clean up, match grade shot to shot, apply the overall look, add uniform grain, add titles and graphics, mix and master audio, export.
3. **Per-issue fixes.** For each issue in the inventory, the fix at the right step and what to watch for (for example waxy skin after upscaling, warping after interpolation, banding after heavy grading of compressed clips).
4. **Delivery spec.** Resolution, aspect ratio, frame rate, a sensible codec family and bitrate approach, audio level target described generically, captions file, and any disclosure label for generated content the platform or client may require. Mark what must be confirmed with the platform or client.
5. **QC checklist.** A final watch-through checklist: flicker and pops at cuts, frame rate stutter, upscale artefacts on faces and text, colour jumps between shots, safe areas for titles, audio sync and levels, captions timing, correct export settings.
6. Before answering, check the order puts upscaling after the locked edit and grain after the grade.
</task>

<constraints>
- No tool, model, plugin or version names; describe operations generically so the user can find them in their own software.
- Do not invent platform specifications; where the user has no spec, give common practice and say to confirm.
</constraints>

<output_format>
## Inventory
Table: Clip | Resolution | Frame rate | Issues | Unknowns. Then the project settings.
## Finishing order
Numbered steps.
## Per-issue fixes
Table: Issue | Clips | Fix | Step | Watch for.
## Delivery spec
Table: Item | Value | Confirm with platform or client (yes or no).
## QC checklist
Checklist.
</output_format>
