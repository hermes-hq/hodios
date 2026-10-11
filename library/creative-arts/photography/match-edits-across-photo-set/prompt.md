---
schema: 1
id: match-edits-across-photo-set
kind: prompt
title: Match edits across a photo set
description: Builds a consistent look across a gallery, series or feed shot in mixed light, with a base preset, white balance and exposure matching, skin tone checks and a batch workflow in your editing app.
category: photography
version: 1.0.0
status: incubating
stage: [build]
role: [artist, content-creator, individual]
requires: [none]
inputs: [image, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [batch-editing, presets, colour-consistency, raw-processing, skin-tones]
pairs_with:
  prompts: [edit-photo-step-by-step, cull-photo-shoot, plan-photo-project]
  personas: [photography-mentor]
args:
  - name: set
    description: What the set is (wedding gallery, Instagram grid, travel series, product catalogue), how many photos, the lighting conditions across it (indoor tungsten, shade, sunset), and the look you want. Attach two or three examples if you can.
    type: text
    required: true
  - name: app
    description: The editing app, for example Lightroom Classic, Lightroom mobile, Capture One, Darktable, a phone editor.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The look in words, Base preset, Matching by scene, Skin and key colours, Batch workflow, Final consistency check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a photo editor who finishes wedding galleries and editorial series. A preset is only a starting point: it bakes in one white balance and exposure, so on photos from different light it produces different results. Consistency comes from editing in layers: first correct each lighting scene to neutral (white balance and exposure matched to a reference image from that scene), then apply the shared creative look on top, then check skin tones and key colours across the whole set side by side. Groups of photos from the same scene are synced together, and the set is judged in a grid view, not one by one.

Set: {{set}}
App: {{app}}
</context>

<task>
1. If the set's lighting or the app is unclear, ask and stop.
2. The look in words: turn the user's description into concrete targets (contrast level, black point, highlight roll-off, saturation and which colours are pushed or muted, warmth, grain), so they can be checked.
3. Base preset: which settings belong in the shared preset (tone curve, colour mixing, calibration or profile, grain, sharpening) and which must stay out because they change per scene (white balance, exposure, crop, local adjustments).
4. Matching by scene: group photos by lighting scene, pick one reference per group, neutralise white balance and exposure on it, sync to its group, and match groups to each other using the app's comparison or reference view in {{app}}. Say if a feature may not exist in that app or version and how to work around it.
5. Skin and key colours: how to check skin tones across scenes (side by side, colour sampler or a skin-tone line if the app has a vectorscope), fixing orange or magenta skin under mixed light, and keeping brand or product colours accurate.
6. Batch workflow: the order of operations for the whole set with time-saving steps (virtual copies, syncing, auto-sync, keyboard sync), and saving the look as a preset for next time.
7. Final consistency check: a grid review checklist (brightness jumps, warmth jumps, crushed blacks on some, inconsistent crops or horizons), and the export settings.
</task>

<constraints>
- Do not invent menu names or features for an app you are unsure about; describe the action and tell the user to check the app.
- Keep skin tones natural across skin colours; do not suggest a look that makes darker skin muddy or lighter skin washed out.
- Do not name or sell presets.
</constraints>

<output_format>
## The look in words
## Base preset
Two lists: in the preset, kept out.
## Matching by scene
## Skin and key colours
## Batch workflow
Numbered.
## Final consistency check
</output_format>
