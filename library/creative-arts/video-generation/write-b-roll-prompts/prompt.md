---
schema: 1
id: write-b-roll-prompts
kind: prompt
title: Write b-roll generation prompts
description: Writes generated b-roll prompts matched to a video's script beats and existing footage look, with lens, grade and motion cues so clips blend in, and flags beats that need real footage.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator]
requires: [none]
inputs: [text, notes]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [b-roll, footage-matching, colour-grade, cutaways]
pairs_with:
  prompts: [write-youtube-script, create-paper-edit, write-video-generation-prompt]
args:
  - name: script_beats
    description: The parts of your script that need cutaways, with the line being said and roughly how long each runs. Timestamps from your edit are ideal.
    type: text
    required: true
  - name: footage_look
    description: "How your real footage looks: camera and lens feel (phone, mirrorless, wide or tight), frame rate, colour grade, contrast, grain, typical light, handheld or tripod."
    type: text
    required: true
  - name: clips
    description: Maximum number of b-roll clips to write.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Look match block, B-roll plan, Clip prompts, Use real footage here, Blending tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
B-roll illustrates what the speaker is saying, covers cuts and keeps the eye moving. Generated b-roll stands out when its look does not match the A-roll: a glossy, perfectly lit, slow-motion clip dropped into handheld phone footage reads as fake at once. It also creates an honesty problem when it stands in for something the viewer will take as a record of real events: a news scene, a real place, a customer, a product test. Good generated b-roll copies the real footage's camera and grade, illustrates ideas and generic actions, and leaves documentary moments to real footage.
</context>

<task>
Write up to {{clips}} b-roll clip prompts for these script beats.

<script_beats>
{{script_beats}}
</script_beats>

<footage_look>
{{footage_look}}
</footage_look>

1. If the footage look is too vague to match (for example "normal"), ask for camera, frame rate, grade and light in one message, or for a frame from the footage, and stop.
2. **Look match block.** Turn the footage look into a reusable block: lens and field of view, sensor feel (phone, cinema camera), frame rate and motion feel (real-time, no slow motion unless the footage uses it), camera support (handheld micro-shake, tripod), colour temperature and grade, contrast, grain or sharpening, typical light source.
3. **B-roll plan.** For each beat, decide what picture best supports the line: a concrete action, a detail, a place or a metaphor. Prefer specific, ordinary images over stock clichés. Size each clip to the beat's length. If there are more beats than {{clips}}, prioritise beats where the speaker is static longest or where an edit needs covering.
4. **Honesty check.** Mark any beat where generated footage would mislead because the viewer would take it as real: news or historic events, a named real place shown as it is now, real people or customers, testimonials, product results or tests, data shown on a screen, anything presented as evidence. For those, recommend real footage, licensed stock with accurate captions, or a clearly stylised illustration instead.
5. **Clip prompts.** For each clip: the look match block pasted verbatim, shot size and angle, one action, setting, light consistent with the A-roll, duration. No readable text, screens with legible content or logos.
6. Before answering, check that every prompt includes the look block unchanged and that no flagged beat received a realistic generated clip.
</task>

<constraints>
- No real, identifiable people and no real brands' products or logos in generated clips.
- Do not suggest labelling generated clips as real footage. Suggest disclosure where the platform or the content calls for it, and tell the user to check their platform's current rules on synthetic media.
- No tool, model or version names.
</constraints>

<output_format>
## Look match block
Code block.
## B-roll plan
Table: # | Beat or timestamp | Line | Picture | Seconds | Generated or real.
## Clip prompts
One code block per generated clip.
## Use real footage here
The flagged beats, each with why and what to use instead.
## Blending tips
Three to five tips for matching in the edit (grain, colour match, frame rate conform, speed, crop).
</output_format>
