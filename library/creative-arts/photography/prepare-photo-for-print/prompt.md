---
schema: 1
id: prepare-photo-for-print
kind: prompt
title: Prepare a photo for print
description: Prepares a photo for printing at home or at a lab, covering print size from resolution, crop to aspect ratio, screen brightness, soft proofing, paper choice, sharpening and a test strip.
category: photography
version: 1.0.0
status: incubating
stage: [ship]
role: [individual, artist]
requires: [none]
inputs: [image, text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [photo-printing, print-resolution, soft-proofing, monitor-calibration, fine-art-print]
pairs_with:
  prompts: [edit-photo-step-by-step, plan-family-photo-book, prepare-photo-competition-entry]
  personas: [photography-mentor]
args:
  - name: photo
    description: The photo's pixel dimensions (or camera and crop), what it shows, and how it was edited. Attach it if you can.
    type: text
    required: true
  - name: print_plan
    description: The size you want, where it will hang or be shown, and whether you print at home (which printer type) or use a lab or online service.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Can it print this size, Crop and aspect ratio, Make the screen honest, Paper and finish, Sharpening and export, Test before the final, Why prints come out dark]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a printmaker who runs a photo lab. The most common complaint, "my print is too dark", comes from editing on a phone or monitor at full brightness: paper reflects light and cannot match a glowing screen, so files need a calibrated, dimmer screen or a brightness lift. Print size depends on pixels and viewing distance, not on the "dpi" field in the file: around 300 pixels per inch is ideal for close viewing, while large prints seen from across a room look fine at much less. Aspect ratios differ (a 3:2 camera file does not fit an 8x10 without cropping), and the lab may crop for you if you do not. Paper type changes contrast, colour and how sharpening looks.

Photo: {{photo}}
Print plan: {{print_plan}}
</context>

<task>
1. If the pixel dimensions (or camera and crop) or the print size are missing, ask and stop.
2. Can it print this size: pixels divided by inches at a few pixel-per-inch values, with the arithmetic shown; say whether the size is fine for its viewing distance, and options if not (smaller print, careful upscaling, accept softness from far away).
3. Crop and aspect ratio: the ratio of the file vs the print, what will be cut, and how to crop it yourself so the lab does not, or to add a border instead.
4. Make the screen honest: lower screen brightness to a typical print-matching level, calibration with a device if they print often, and what to do without one (compare a test print in good light).
5. Paper and finish: gloss, lustre or semi-gloss, matte and fine art papers, what each does to blacks, colour and glare, and which suits this photo and where it will hang.
6. Sharpening and export: output sharpening for the print size and paper, colour space and profile (what to ask the lab, soft proofing with the lab's or paper's profile if available), file format and quality, and turning off the lab's auto-correction if the file is already edited.
7. Test before the final: a small test print or test strip of a key area, and what to compare.
8. Why prints come out dark: a short checklist of the usual causes and fixes, in case the first print disappoints.
</task>

<constraints>
- Show the resolution arithmetic and keep units consistent (pixels, inches or centimetres as the user uses them).
- Do not invent a lab's specifications or profiles; tell the user to download or ask for them.
- Do not name printer, paper or lab brands unless the user did.
</constraints>

<output_format>
## Can it print this size
## Crop and aspect ratio
## Make the screen honest
## Paper and finish
## Sharpening and export
## Test before the final
## Why prints come out dark
Checklist.
</output_format>
