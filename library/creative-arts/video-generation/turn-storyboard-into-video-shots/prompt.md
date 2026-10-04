---
schema: 1
id: turn-storyboard-into-video-shots
kind: prompt
title: Turn a storyboard into video shot prompts
description: Turns a storyboard or shot list into per-shot video-generation prompts that share locked character, wardrobe, set and lighting wording, so the shots cut together without drift.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, artist]
requires: [none]
inputs: [text, notes]
output: [prompt, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [shot-list, continuity, style-lock, storyboard]
pairs_with:
  prompts: [create-storyboard, write-video-generation-prompt, fix-video-generation-drift]
args:
  - name: storyboard
    description: "The storyboard frames or shot list: for each shot the action, framing and any dialogue or sound. Numbered frames work best; a pasted table from a storyboard tool is fine."
    type: text
    required: true
  - name: style_lock
    description: "The look every shot must share: medium (live action, 3D, 2D animation), palette, lighting, lens feel, grain or grade, era and mood, plus fixed descriptions of recurring characters, outfits and locations if you have them."
    type: text
    required: true
  - name: shot_seconds
    description: The length of one generated clip in your tool, in seconds. Shots longer than this are split.
    type: number
    default: 5
  - name: aspect_ratio
    description: "Frame shape for every shot, e.g. 16:9, 9:16, 1:1, 2.39:1."
    type: string
    default: "16:9"
output_contract:
  format: markdown
  sections: [Lock sheet, Shot prompts, Continuity table, Generation order, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Video models generate each clip independently. Between two prompts that describe "the same" woman in "a red coat", the model will change her face, the coat's cut, the street, the light and the colour grade, and the edit falls apart. Continuity comes from three things the storyboard alone does not give: descriptors written once and pasted word for word into every shot, one clear action per shot sized to the clip length, and continuity facts (screen direction, eyelines, time of day, prop state) tracked from shot to shot. You are working as a continuity supervisor and prompt writer between the storyboard artist and the person running the generator.
</context>

<task>
Convert this storyboard into generation-ready shot prompts.

<storyboard>
{{storyboard}}
</storyboard>

<style_lock>
{{style_lock}}
</style_lock>

Clip length: {{shot_seconds}} seconds. Aspect ratio: {{aspect_ratio}}.

1. Read every frame. If a recurring character, outfit or location appears in the storyboard but neither the storyboard nor the style lock says what it looks like, list those gaps and ask for them in one message, then stop. Do not invent a look for the main character. Minor background elements you may define yourself; label them as your choice.
2. **Lock sheet.** Write fixed descriptor blocks, each with a short tag (for example CHAR-A, SET-1, LOOK):
   - each character: apparent age range, build, skin tone, hair, face shape, distinguishing marks, outfit item by item with colours and materials;
   - each location: layout, key props and their positions, time of day, weather;
   - the look: medium, palette, lighting key and direction, lens and depth of field, grain or grade, frame-rate feel;
   Write them as concrete visual phrases, 1 to 3 lines each. These exact words will be pasted into every prompt that needs them.
3. **Split and size shots.** Give each storyboard frame one main action. If a frame holds two actions or would need more than {{shot_seconds}} seconds, split it into numbered sub-shots (4a, 4b) and say why.
4. **Shot prompts.** For each shot, write one standalone prompt in this order: shot size and angle; camera behaviour with speed; the relevant lock blocks pasted verbatim; the single action with a precise verb and its start and end state; background activity; the LOOK block; {{aspect_ratio}}. Phrase things positively. Leave readable text, signs and logos out of the frame and note them for the edit.
5. **Continuity table.** For each cut, track: screen direction of movement, eyeline direction, which side of the line the camera is on, time of day and light direction, prop and costume state (a cup half full, a coat now wet). Flag any cut in the storyboard that breaks the 180-degree line or jumps prop state without a reason, and suggest the fix.
6. **Generation order.** Recommend the order to generate in: usually a reference still for each character and set first, then the shots that define the look, then the rest. Say which shots should start from an image (the reference still, or the last frame of the previous clip) where the tool supports image-to-video, and which can run from text alone.
7. **Checks.** Before you answer, confirm and report: every prompt that shows a character contains that character's lock block word for word; no prompt contains two main actions; the shot count and total running time match the storyboard; every frame from the storyboard is accounted for.
</task>

<constraints>
- Characters are original. Do not describe or name a real, identifiable person or a copyrighted character, even if the storyboard does; replace them with an original description and say so.
- Never paraphrase a lock block between shots. Small wording changes are the main cause of drift.
- Do not promise identical results. State that generators still drift and that reference images and keeping seeds where the tool allows reduce, but do not remove, variation.
- Use no tool, model or version names; describe settings generically (motion strength, seed, reference image).
</constraints>

<output_format>
## Lock sheet
One code block with every tagged block.
## Shot prompts
Table: Shot | Storyboard frame | Seconds | Shot and camera | Action | Starts from (text, reference still, previous frame).
Then one code block per shot with the full prompt.
## Continuity table
Table: Cut | Direction | Eyeline | Light | Props and costume | Issue and fix.
## Generation order
Numbered list.
## Checks
The four checks from step 7, each marked pass or with what you changed.
</output_format>

<examples>
<example>
A shot prompt built this way:
"Medium close-up, eye level, slow push-in. CHAR-A: woman in her early 30s, slim, warm brown skin, shoulder-length black curls, small scar above left eyebrow, mustard wool coat with wooden toggles over a grey turtleneck. SET-1: narrow cobbled alley, wet stones, single wall lamp on the right. She lifts her gaze from the letter in her hands and looks toward camera left, startled. Light drizzle in the background. LOOK: 35mm film feel, soft teal-and-amber grade, low-key lamp light from the right, shallow depth of field, gentle grain. 16:9."
</example>
</examples>
