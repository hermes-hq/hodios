---
schema: 1
id: write-logo-sting-prompt
kind: prompt
title: Write an animated logo sting prompt
description: Writes prompts and a timing plan for a short animated logo sting, with a motion concept, frame-accurate timing, a sound cue and an end frame that keeps the real logo geometry exact.
category: video-generation
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, marketer]
requires: [none]
inputs: [image, text]
output: [prompt, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [logo-animation, intro-sting, brand-motion, compositing]
pairs_with:
  prompts: [write-jingle, write-sound-effect-prompts, design-logo-concepts]
args:
  - name: logo_description
    description: "The logo (attach it) or a description: mark and wordmark, shapes, colours, any gradients, and the brand's personality in a few words."
    type: text
    required: true
  - name: seconds
    description: Sting length in seconds, including the hold on the final logo. Most stings run 2 to 5 seconds.
    type: number
    default: 3
  - name: mood
    description: "Overall feel: playful (bouncy, elastic), premium (slow, light and reflections), tech (precise, digital, grid and particles), warm (soft, organic, hand-made)."
    type: enum
    enum: [playful, premium, tech, warm]
    default: premium
output_contract:
  format: markdown
  sections: [Motion concepts, Timing sheet, Generation prompts, Sound cue, Compositing plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A logo sting is a few seconds of motion that ends on the logo, used at the start or end of videos, ads and streams. Video generators cannot be trusted with the logo itself: they redraw letterforms, bend proportions and shift colours, which no brand can accept on its final frame. The reliable approach is to generate the motion around the logo (light sweeps, particles, ink, paper, liquid, a background move) and composite the real vector logo on top, revealed by masks or matched to the generated motion, so the end frame is pixel-exact. The motion should express one idea that fits the brand, and the timing should be exact to the frame because stings are cut against music and sound.
</context>

<task>
Plan a {{seconds}}-second {{mood}} logo sting.

<logo>
{{logo_description}}
</logo>

1. If the logo's shapes and colours are not described or attached, ask for them in one message and stop.
2. **Motion concepts.** Propose three concepts that grow out of the logo's own shapes or meaning (a circle that rolls in, strokes that draw on, a fold that opens), each in two lines with how the real logo is revealed. Recommend one for {{mood}} and say why.
3. **Timing sheet.** For the recommended concept, at 24 and at 30 frames per second, break the {{seconds}} seconds into: anticipation, main motion, resolve into the logo, and a hold on the final logo of at least one second (or most of the length if the sting is very short). Give each phase in seconds and frames, and the frame where the sound hit lands.
4. **Generation prompts.** Write prompts only for elements a generator can make safely: the background plate, light sweeps, particles, textures, the transition elements. Each prompt states that the centre area stays clear for the logo, fixes the palette to the logo's colours, sets a static or simple camera, and gives duration and aspect ratio (16:9 by default, plus 9:16 and 1:1 versions if useful). Include one optional prompt for a motion reference (a rough of the movement) that a motion designer can follow, clearly marked as not for the final frame.
5. **Sound cue.** Describe the sound in words: type (whoosh, chime, thump, pluck, riser), sync points to the timing sheet, length, and tail. Keep it short enough that the last note decays during the hold. Point out that a separate jingle or sonic logo is a different deliverable.
6. **Compositing plan.** Steps in the editor or motion software: place the real vector logo, reveal it with a mask, wipe or opacity tied to the generated motion, match light and shadow, keep the final frame identical to the master logo, and export versions (with and without background, light and dark).
7. Before answering, check that no prompt asks the generator to draw the logo or its text, that phase timings add up to {{seconds}} seconds, and that the hold is long enough to read the logo.
</task>

<constraints>
- Never let generated pixels replace the real logo on the final frame.
- Do not imitate another company's sting, mascot or sonic logo.
- No tool, model or version names.
</constraints>

<output_format>
## Motion concepts
## Timing sheet
Table: Phase | Seconds | Frames at 24 | Frames at 30 | What happens.
## Generation prompts
One code block per element, each with a one-line purpose.
## Sound cue
## Compositing plan
Numbered steps.
</output_format>
