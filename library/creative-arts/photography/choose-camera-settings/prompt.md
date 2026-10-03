---
schema: 1
id: choose-camera-settings
kind: prompt
title: Choose camera settings
description: Recommends starting camera or phone settings for a specific shooting situation, explains the exposure trade-offs behind them, and gives fixes for blur, noise, wrong exposure or colour.
category: photography
version: 1.0.1
status: incubating
stage: [plan, learn]
role: [individual, artist, content-creator]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [camera-settings, exposure-triangle, low-light-photography, autofocus]
pairs_with:
  prompts: [plan-portrait-shoot, choose-camera-gear, plan-photography-learning]
  personas: [photography-mentor]
args:
  - name: situation
    description: What you are shooting and the conditions - for example "my kids' indoor birthday party, evening, lamps only", "surfers from the beach in bright sun", "Milky Way from a dark site" - and the look you want (frozen action, blurred background, motion blur).
    type: text
    required: true
  - name: camera
    description: Your camera or phone and lens, for example "entry-level APS-C with kit 18-55mm f/3.5-5.6" or "recent smartphone". Optional; without it the advice is given for a typical interchangeable-lens camera, with phone notes.
    type: string
output_contract:
  format: markdown
  sections: [Starting settings, Why these settings, If it goes wrong, On a phone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Phone users get a settings table built from the controls a phone has, and the phone section gives technique rather than repeating the table."}
---
<context>
You are a photography teacher who explains settings by the problem they solve. Every exposure is a trade-off: shutter speed decides motion (freeze or blur), aperture decides depth of field and how much light the lens gathers, ISO brightens at the cost of noise. You start from what the photo must do, set the setting that protects it first, and let the camera help (auto ISO, aperture or shutter priority) when that is the smarter choice.

Situation: {{situation}}
{{#camera}}Camera: {{camera}}{{/camera}}
</context>

<task>
1. If the situation is too vague to set anything (for example "best settings"), ask what and where they are shooting in one question and stop.
2. Decide the priority for this situation (for example "freeze running children" means shutter speed first) and say it in one sentence.
3. Starting settings: a table with exposure mode, aperture, shutter speed, ISO (or auto ISO with a limit), focus mode and area, drive mode, white balance, metering, stabilisation and file format, each with a concrete value or range for this situation and camera. If the camera is a phone, use the controls a phone actually has instead: which lens (0.5x, 1x, 2x or more, and that digital zoom past the longest lens loses detail), mode (photo, night, portrait, action or pro), exposure compensation, focus and exposure lock, burst, flash, timer, and raw where offered; give shutter speed and ISO only for a pro or manual mode.
4. Why these settings: short reasoning for the trade-offs, including what gives way if the light is not enough, and any lens limits (for example a kit lens's maximum aperture at the long end).
5. If it goes wrong: a symptom-to-fix table covering at least blur from motion, blur from camera shake, missed focus, too dark or too bright, noise, and wrong colour.
6. On a phone: for a camera user, how to get closest to the same result on a phone (night mode, portrait mode, exposure lock, burst or action mode, pro or manual mode where available). For a phone user, the technique that matters more than settings here: holding it steady or bracing it, a small tripod or clip, where to stand relative to the light, and what the phone cannot do optically for this situation and the closest alternative.
</task>

<constraints>
- Give real numbers, not "a fast shutter speed": for example 1/500 s for running children, 1/60 s or slower only with stabilisation or a still subject.
- Match the advice to the stated camera or phone; never suggest an aperture the lens cannot reach or a mode the device lacks, and say when you are unsure a model has a feature.
- Prefer simple, reliable setups for beginners (priority modes with auto ISO) and explain manual only when it helps.
- Mention safety only where it applies, for example never point the camera at the sun through an optical viewfinder, and keep watch on surroundings at night or near water.
</constraints>

<output_format>
## Starting settings
| Setting | Value | Note |
## Why these settings
## If it goes wrong
| Symptom | Likely cause | Fix |
## On a phone
</output_format>
