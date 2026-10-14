---
schema: 1
id: plan-generated-scene-coverage
kind: prompt
title: Plan coverage for a generated scene
description: Plans coverage for a scene built from generated shots, fixing screen sides, the 180-degree line, eyelines and light direction in shared wording so independent shots cut together.
category: video-generation
version: 1.0.0
status: incubating
stage: [plan, design]
role: [content-creator, artist, writer]
requires: [none]
inputs: [text, notes]
output: [plan, prompt, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coverage, screen-direction, eyeline-match, 180-degree-rule]
pairs_with:
  prompts: [turn-storyboard-into-video-shots, write-dialogue-scene-video-prompts, write-action-sequence-prompts]
  workflows: [ai-short-film-track]
args:
  - name: scene
    description: What happens in the scene, in a paragraph or as script, including entrances, exits and key moments.
    type: text
    required: true
  - name: characters
    description: Each character's fixed look (face, hair, clothing, props).
    type: text
    required: true
  - name: setting
    description: The location, time of day, main light source and mood.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scene map, Shot list, Locked wording, Shot prompts, Edit order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
On a film set, coverage cuts together because every shot is filmed in the same physical space: the line of action is respected, characters stay on their side of frame, eyelines meet, and the light comes from the same window. Generated shots share no space; each one is invented from scratch. Unless the prompts state positions and directions explicitly ("Ana on frame left, facing right; window light from frame right"), characters swap sides between shots, look past each other, and the light jumps. Planning coverage for generated video therefore means deciding the geography first, writing it into fixed wording, and choosing shots that are forgiving to cut: a master to establish, singles and over-the-shoulders for exchanges, inserts and reactions to cover cuts.
</context>

<task>
Plan coverage for this scene.

<scene>
{{scene}}
</scene>

<characters>
{{characters}}
</characters>

<setting>
{{setting}}
</setting>

1. **Scene map.** Describe the space as a simple top-down layout in words: where each character stands or sits, the line of action between them, the camera side, the main light source and its direction, and any movement through the space (entrances, exits, crossings). If the scene changes the geography (someone crosses the line), plan a shot that shows the move.
2. **Shot list.** Choose the coverage: an establishing or master shot, then singles, over-the-shoulders, inserts of key objects, and at least two reaction shots. Keep the camera on one side of the line throughout unless a move resets it. Give each shot a purpose in the story.
3. **Locked wording.** Write fixed phrases to paste into every relevant shot: each character's look, each character's screen side and facing direction for the camera side, the light direction relative to frame, and the set description.
4. **Shot prompts.** One prompt per shot, combining the framing, the locked wording, the action and the eyeline ("looks toward frame right, slightly above lens"). One action per shot.
5. **Edit order.** The cut order, with where reactions or inserts hide joins and which shots are most likely to need regenerating.
6. Before answering, check every shot keeps each character on the stated side, the eyelines in reverse shots point at each other, and the light comes from the same side in every prompt.
</task>

<constraints>
- No tool, model or version names.
- Use original characters, or real people only with their consent.
- Do not add story events the user did not describe; flag gaps instead.
</constraints>

<output_format>
## Scene map
Short paragraph and a bullet list of positions and directions.
## Shot list
Table: Shot | Type | Framing | Purpose.
## Locked wording
Code block.
## Shot prompts
Numbered code blocks.
## Edit order
Numbered list with notes.
</output_format>
