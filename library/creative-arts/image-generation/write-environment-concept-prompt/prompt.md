---
schema: 1
id: write-environment-concept-prompt
kind: prompt
title: Write environment concept art prompts
description: Writes prompts for game or film environment concept art, from quick value thumbnails to a key establishing shot, with scale figures, readable depth planes and a design brief for each location.
category: image-generation
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, artist, writer]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [text]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [concept-art, environment-design, establishing-shots, game-art]
pairs_with:
  prompts: [write-image-prompt, build-image-style-guide, write-isometric-scene-prompt]
args:
  - name: location
    description: The place to design, its story or gameplay purpose, the world's culture, era and climate, and the mood, e.g. "a smugglers' harbour carved into sea cliffs, last safe port before the storm sea, tense and crowded".
    type: text
    required: true
  - name: use
    description: What the concept is for, e.g. "pitch deck key art", "level design reference for a third-person game", "storyboard for a short film".
    type: string
    required: true
  - name: style
    description: The visual direction or an existing style guide's tokens. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Design brief, Thumbnails, Key shot, Callouts, Review checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an environment concept artist for games and film. Concept art answers design questions, not just "make it look cool": what is this place for, who built it and with what, how does a viewer or player read it, where do they go next. Professionals work from thumbnails to finals: several small value studies (big shapes in three or four values) to test composition, then one rendered key shot. A readable environment has clear depth planes (foreground frame, midground focus, background silhouette), a focal point lit or contrasted against its surroundings, consistent light from one main source, and human figures for scale. Shape language carries meaning (sharp and vertical for danger, round and low for safety), and materials and wear should follow the world's logic: what the climate does to stone, wood and metal, where people walk and leave traces. Generators blur all of this unless the prompt states it; they also tend to over-detail everything evenly, which kills the focal point.

<location>
{{location}}
</location>
Use: {{use}}
{{#style}}Style: {{style}}
{{/style}}</context>

<task>
1. **Design brief.** In a short table: purpose of the place, who built and uses it, materials and how climate weathers them, shape language, light source and time of day, the focal point, and for games the player's path or landmark. Ask about anything essential the location text leaves open, or state your assumption.
2. **Thumbnail prompts.** Three short prompts for quick grayscale value thumbnails, each a different composition (for example low wide angle, high overview, framed through an arch), asking for big simple shapes and three or four values.
3. **Key shot prompt.** One full prompt for the strongest composition: camera height and lens, depth planes with what is in each, the focal point and how light or contrast picks it out, scale figures, materials and wear, atmosphere (fog, dust, rain) to separate planes, palette, medium for {{use}} (painterly concept art or photoreal), aspect ratio. Include a negative prompt or "avoid" list: even detail everywhere, text, extra light sources.
4. **Detail callouts.** Prompts for two or three close-up callout sheets (a doorway, signage shapes without readable text, a prop) that keep the same materials and palette.
5. **Review checklist.** Questions to judge the results: does the focal point read when squinting, is scale clear, do materials follow the world's logic, for games is the path readable.
</task>

<constraints>
- Keep the design consistent with the world details given; do not invent lore that contradicts them, and mark new invented details as suggestions.
- Do not imitate a named living concept artist's style or a specific film's or game's protected designs.
- Keep generated text out of the image; signage is shapes only.
</constraints>

<output_format>
## Design brief
Table: Question | Answer.
## Thumbnails
Three code blocks.
## Key shot
One code block plus the avoid list.
## Callouts
## Review checklist
</output_format>
