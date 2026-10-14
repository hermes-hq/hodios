---
schema: 1
id: write-first-last-frame-prompts
kind: prompt
title: Write start and end frame prompts
description: Plans a start frame and an end frame for tools that animate between two images, keeping the pair close enough to move between instead of morphing, plus the motion prompt that links them.
category: video-generation
version: 1.0.0
status: incubating
stage: [design, build]
role: [content-creator, artist, designer]
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
depth: specific
tags: [keyframes, start-frame, end-frame, frame-interpolation]
pairs_with:
  prompts: [write-image-to-video-motion-prompt, write-transition-shot-prompts, fix-video-generation-drift]
args:
  - name: shot_goal
    description: "What should happen between the first and last moment, e.g. 'the flower bud opens fully' or 'camera moves from the doorway to a close-up of the desk'."
    type: text
    required: true
  - name: start_frame
    description: The start image (attach it) or a description of it, if you already have one. Leave empty to have both frames planned.
    type: text
  - name: end_frame
    description: The end image or a description of it, if you already have one.
    type: text
  - name: seconds
    description: Clip length in seconds.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Frame pair check, Start frame prompt, End frame prompt, Motion prompt, If it morphs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tools that take a first and a last frame fill in the motion between them. They move convincingly when the two frames share a lens, lighting, palette and identity and differ in one clear way: the camera has moved, the subject has changed pose, or something has changed state. When the two frames differ in several ways at once (a new angle, new light and a new pose), the model cannot find a physical path and falls back to a cross-dissolve or a morph. The most reliable way to get a matching pair is to make the end frame by editing the start frame rather than generating it from scratch, and to keep the distance between frames proportional to the clip length.
</context>

<task>
Plan the frame pair and motion for this shot.

<shot_goal>
{{shot_goal}}
</shot_goal>
{{#start_frame}}
<start_frame>
{{start_frame}}
</start_frame>
{{/start_frame}}
{{#end_frame}}
<end_frame>
{{end_frame}}
</end_frame>
{{/end_frame}}

Length: {{seconds}} seconds.

1. **Frame pair check.** List what differs between the frames under these headings: camera (position, angle, lens), subject (pose, position, identity), state (open or closed, day or night, full or empty), light and colour. If frames were supplied, judge them as given; if not, plan them. Allow one major change and, at most, one minor one. If the goal needs more, say so and split it into two clips that share a middle frame.
2. **Start frame prompt.** If no start frame exists, write an image prompt for it with the lens, framing, light direction, palette and the exact appearance of anything that must survive the move. If it exists, write nothing new and note what to keep.
3. **End frame prompt.** Write it as an edit of the start frame: "same image, same lens and light, change only ...". Give a from-scratch prompt only as a fallback, repeating the start frame's wording word for word for everything that does not change.
4. **Motion prompt.** One short paragraph describing the path between the frames: direction, pace (ease in, constant, ease out), what moves first, and what stays fixed. Check that the amount of change fits {{seconds}} seconds; a camera move across a room in two seconds reads as a jump.
5. **If it morphs.** Three fixes, each changing one thing: reduce the difference between frames, add a middle frame and split the clip, or lengthen or shorten the clip.
6. Before answering, confirm the pair differs in no more than one major way and that the end frame prompt repeats the unchanged wording exactly.
</task>

<constraints>
- Do not plan a pair whose only link is a dissolve unless the user asks for a morph as an effect; say that this is what they will get.
- Faces, hands, readable text and logos should keep the same size and angle across the pair, or be restored in the edit.
- Do not use a real, identifiable person's image without their consent.
- No tool, model or version names; tell the user to check their tool for the name of its start and end frame controls.
</constraints>

<output_format>
## Frame pair check
Table: Aspect | Start | End | Change size (none, minor, major). Verdict in one line.
## Start frame prompt
Code block, or "Use the existing frame" with what to keep.
## End frame prompt
Code block for the edit route, then the fallback.
## Motion prompt
Code block.
## If it morphs
Three numbered fixes.
</output_format>
