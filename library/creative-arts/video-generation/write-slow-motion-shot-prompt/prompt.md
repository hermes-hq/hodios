---
schema: 1
id: write-slow-motion-shot-prompt
kind: prompt
title: Write a slow-motion shot prompt
description: Writes a prompt for a generated slow-motion shot and decides whether to ask the model for slow motion or generate at real speed and retime in the edit, with physics cues for splashes, hair and cloth.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, artist]
requires: [none]
inputs: [text, image]
output: [prompt, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [slow-motion, retiming, high-speed-look, speed-ramp]
pairs_with:
  prompts: [write-video-generation-prompt, write-food-video-prompts, plan-generated-video-finishing]
args:
  - name: action
    description: "The action to show in slow motion, e.g. 'a water balloon bursting on a fence', 'a dancer's skirt swirling as she spins'."
    type: text
    required: true
  - name: seconds
    description: Length of the final slow-motion moment on screen, in seconds.
    type: number
    default: 4
  - name: slowdown
    description: "How slow it should feel: gentle (about half speed), strong (about a quarter speed), extreme (frozen-moment, high-speed camera look)."
    type: enum
    enum: [gentle, strong, extreme]
    default: strong
output_contract:
  format: markdown
  sections: [Approach, Prompt, Retime plan, Physics cues]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Real slow motion comes from filming at a high frame rate and playing back at normal speed, so every fraction of a second has crisp detail: droplets hold their shape, hair moves in waves, cloth ripples. Video models generate at a normal frame rate; asked for "slow motion", some produce a convincing high-speed look, others produce sluggish real-time motion or a jerky clip. The alternative is to generate the action at real speed with crisp detail (fast shutter, little motion blur) and slow it in the edit with frame interpolation, which works for gentle slowdowns and smooth motion but produces smeared or warped frames on chaotic splashes and overlapping limbs. The right route depends on the action and how slow it must feel. A short action also needs less real time: a balloon bursting lasts a fraction of a second, so a four-second slow-motion moment covers very little of it.
</context>

<task>
Plan a slow-motion shot.

Action: {{action}}
On-screen length: {{seconds}} seconds. Slowdown: {{slowdown}}.

1. **Approach.** Work out how much real time {{seconds}} seconds of {{slowdown}} slow motion covers and whether the action fits. Choose: prompt the slow motion directly, generate at real speed and retime, or both (generate directly, retime a little further). Explain the choice in two sentences for this action.
2. **Prompt.** Write the main prompt for the chosen route. For direct slow motion: describe it as a high-speed camera look with crisp, frozen detail, the single action from start to end, the moments that should linger, and a locked or very slow camera. For the retime route: real-time action with a fast-shutter look, minimal motion blur, an uncluttered background, and a few extra seconds before and after.
3. **Retime plan.** If retiming: the speed setting, where to ramp from real speed into slow motion and back (ramps hide the start and end), and which frames to check for interpolation smears. If prompting directly: how to trim and whether a ramp in the edit helps.
4. **Physics cues.** Three to five specific cues for this action: droplet shapes and spray direction, hair and fabric moving in waves and following the motion, debris arcing under gravity, light catching surfaces, no objects merging.
5. Before answering, check the action fits the on-screen length at this slowdown and the prompt has one action only.
</task>

<constraints>
- No tool, model or version names; describe frame rate and interpolation settings generically and tell the user to check their editor.
- Do not show injury, violence to people or animals, or dangerous stunts presented as safe to copy.
</constraints>

<output_format>
## Approach
Real-time coverage calculation, then the chosen route and why.
## Prompt
Code block.
## Retime plan
Bullets with speed and ramp points.
## Physics cues
Bullets.
</output_format>
