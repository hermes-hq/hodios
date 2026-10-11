---
schema: 1
id: write-clip-extension-prompt
kind: prompt
title: Write a clip extension prompt
description: Writes prompts that extend a generated clip from its last frame, anchoring the join, continuing the same motion and deciding when to cut instead of extending again.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, artist]
requires: [none]
inputs: [text, image]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [clip-extension, last-frame, continuity, long-takes]
pairs_with:
  prompts: [fix-video-generation-drift, write-first-last-frame-prompts, turn-storyboard-into-video-shots]
args:
  - name: current_clip
    description: "The prompt you used and what happens in the clip, ending with a precise description of the last frame: framing, where the subject is, what is moving and in which direction."
    type: text
    required: true
  - name: what_next
    description: "What should happen in the extended part, e.g. 'she reaches the door and opens it'."
    type: text
    required: true
  - name: extensions
    description: How many extensions you plan to chain.
    type: number
    default: 1
output_contract:
  format: markdown
  sections: [Last-frame anchor, Extension prompts, Join check, When to cut instead]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Extending a clip from its last frame looks like an easy way to make long shots, but every extension inherits the previous clip's small errors and adds its own. Faces soften, colours shift and outfits wander, so the third or fourth extension often no longer matches the first. Joins also fail in predictable ways: the motion stops and restarts, the camera speed changes, or the exposure jumps on the first new frame. Experienced users write each extension as the continuation of a moving shot (same direction, same speed, same camera), repeat the locked description of the subject every time, introduce at most one new event per extension, and plan where a cut would serve better than another extension.
</context>

<task>
Write extension prompts for this clip.

<current_clip>
{{current_clip}}
</current_clip>

<what_next>
{{what_next}}
</what_next>

Planned extensions: {{extensions}}.

1. If the description does not say where the subject is in the last frame and what is moving in which direction, ask for that in one message and stop; the join depends on it.
2. **Last-frame anchor.** Restate the last frame as a short block: framing, subject position and pose, motion in progress (direction and speed), camera motion in progress, light. Add a locked description of the subject (face, hair, clothing, props) copied from the original prompt, to repeat in every extension.
3. **Extension prompts.** Split {{what_next}} across {{extensions}} extension(s), one new event each. Each prompt opens by continuing the motion in progress at the same speed and camera behaviour, then introduces its one event, then states where things end so the next extension has an anchor. Repeat the locked description word for word.
4. **Join check.** A short checklist for each join: no pause or restart in motion, same camera speed, no exposure or colour jump on the first frames, subject still matches the locked description. Suggest trimming a few frames at the join if the tool adds a settle-in at the start.
5. **When to cut instead.** Say after which extension drift is likely to show and recommend a cut point (to a cutaway, a reaction or a new angle) that resets the look. If {{extensions}} is more than three, recommend re-anchoring with the original reference image or a fresh start frame before continuing.
6. Before answering, confirm every extension repeats the locked description and adds only one event.
</task>

<constraints>
- Do not promise that a chain of extensions will hold identity; say plainly that drift accumulates.
- No tool, model or version names; describe settings generically.
- Keep each extension prompt within what one clip can show; no scene changes or time jumps inside an extension.
</constraints>

<output_format>
## Last-frame anchor
Anchor block and locked description in code blocks.
## Extension prompts
One numbered code block per extension, with a line on its end state.
## Join check
Checklist.
## When to cut instead
Two to four sentences.
</output_format>
