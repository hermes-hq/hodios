---
schema: 1
id: write-aerial-shot-prompt
kind: prompt
title: Write an aerial shot prompt
description: Writes a prompt for a generated drone-style aerial shot, naming the move, altitude, speed, camera tilt and scale cues so the landscape keeps its size and shape, with honest limits on real places.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, artist, marketer]
requires: [none]
inputs: [text, image]
output: [prompt]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [drone-shot, establishing-shot, camera-movement, parallax]
pairs_with:
  prompts: [write-video-generation-prompt, write-b-roll-prompts, write-timelapse-video-prompt]
args:
  - name: location
    description: "What the shot flies over: terrain, buildings, water, time of day, weather. Say whether it is invented or meant to evoke a real kind of place."
    type: text
    required: true
  - name: move
    description: "The aerial move: reveal (rise over an edge to show the view), orbit (circle a point), top-down (straight down), fly-through (forward through a gap), tracking (follow a moving subject), pull-back (retreat to show scale)."
    type: enum
    enum: [reveal, orbit, top-down, fly-through, tracking, pull-back]
    default: reveal
  - name: seconds
    description: Clip length in seconds.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Move spec, Prompt, Scale cues, Variations, Real places]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Aerial shots sell scale, and scale comes from parallax and reference objects: foreground ridges sliding past faster than distant mountains, a car or a person tiny on a road, trees of known size. Generated aerials go wrong when the prompt says only "drone shot of mountains": the camera speed is wrong for the altitude, the terrain reshapes itself as the camera moves, buildings drift or multiply, and nothing tells the eye how big anything is. Real drone operators plan the move, the start and end altitude, the speed and the gimbal tilt, and keep the move to one action. A slow move at height reads as grand; a fast low move reads as energetic.
</context>

<task>
Write an aerial prompt.

<location>
{{location}}
</location>

Move: {{move}}. Length: {{seconds}} seconds.

1. **Move spec.** Define the {{move}} move: start position and altitude (low, medium, high, described in relation to the terrain), end position, speed (slow, steady, fast), camera tilt (looking down, angled, horizon level), and direction. One move only.
2. **Prompt.** One paragraph: aerial camera, the move with start and end, speed and tilt over {{seconds}} seconds; the terrain and features in order of what is revealed; light and weather; the end frame. State that the landscape and buildings keep their shape and position.
3. **Scale cues.** Add two or three reference elements (a road with a single car, a footpath with walkers, a boat, a lone tree, a cabin) and the foreground and background layers that create parallax.
4. **Variations.** Two alternatives: a calmer version and a more energetic one, each with the move adjusted.
5. **Real places.** If the location is a real, named place, say that the generator will invent geography and landmarks will be inaccurate, so the result should be presented as an impression, not as footage of that place; recommend real footage or licensed stock where accuracy matters.
6. Before answering, check there is only one move and that speed suits the altitude.
</task>

<constraints>
- Do not write prompts to depict identifiable private homes, military sites or other sensitive locations as if surveilled.
- Do not present generated aerials as real footage of a named place, event or disaster.
- No tool, model or version names.
</constraints>

<output_format>
## Move spec
Table: Start | End | Altitude | Speed | Tilt.
## Prompt
Code block.
## Scale cues
Bullets.
## Variations
Two code blocks with a one-line note each.
## Real places
One or two sentences, or "Not applicable: invented location."
</output_format>
