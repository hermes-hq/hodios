---
schema: 1
id: write-timelapse-video-prompt
kind: prompt
title: Write a time-lapse video prompt
description: Writes a generated time-lapse prompt with the time span, what changes and what stays locked, sun and shadow direction for the hemisphere, and motion streaks, so it reads as compressed time.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, artist]
requires: [none]
inputs: [text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [time-lapse, day-to-night, sun-path, compressed-time]
pairs_with:
  prompts: [write-video-generation-prompt, write-looping-video-prompt, fix-video-generation-drift]
args:
  - name: scene
    description: What the camera looks at, e.g. 'a city square with a clock tower' or 'a seedling in a pot on a windowsill'.
    type: text
    required: true
  - name: time_span
    description: "The real time compressed into the clip, e.g. 'afternoon to night', 'one week of growth', 'a whole day of tide'."
    type: text
    required: true
  - name: seconds
    description: Clip length in seconds.
    type: number
    default: 6
  - name: hemisphere
    description: "Where it is set, for sun direction: northern or southern hemisphere, or a fictional world with no rule."
    type: enum
    enum: [northern, southern, fictional]
    default: northern
output_contract:
  format: markdown
  sections: [Time map, Prompt, Physics check, If it fails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A real time-lapse has a locked or very slowly sliding camera, a fixed composition, and change that happens at the speed of compressed time: clouds racing, shadows sweeping, lights switching on, people and cars turned into streaks or flickering blurs. Generated time-lapses fail when the model treats the prompt as a normal shot: the camera wanders, buildings morph as the light changes, people walk at normal speed, or the sun and shadows move the wrong way. The sun rises in the east and sets in the west in both hemispheres, but at mid latitudes it arcs across the southern sky in the northern hemisphere and the northern sky in the southern hemisphere; shadows always point away from the sun and swing round steadily as it moves. Day-to-night transitions should brighten artificial lights gradually as the sky darkens, with blue hour between.
</context>

<task>
Write a time-lapse prompt.

Scene: {{scene}}
Time span: {{time_span}}
Length: {{seconds}} seconds. Hemisphere: {{hemisphere}}.

1. **Time map.** Split {{time_span}} across {{seconds}} seconds as three or four stages with what the frame shows at each (light, sky, activity). Say what changes (light, shadows, clouds, traffic, crowds, plant growth, tide) and what stays locked (camera, buildings, horizon, furniture).
2. **Prompt.** One paragraph: "time-lapse" and a locked-off or very slow slide camera; the fixed composition; the stages in order; how moving things look at this speed (streaks of headlights, blurred crowds, racing clouds); light direction and shadow movement consistent with {{hemisphere}} and the time of day; the end state.
3. **Physics check.** A short checklist: camera does not move beyond the stated slide; fixed structures keep their shape; shadows point away from the sun and swing round in one consistent direction; people and vehicles move faster than real time or blur; lights come on gradually as the sky darkens. For a fictional setting, ask the user to pick a rule and keep it.
4. **If it fails.** Three fixes, each changing one thing: shorten the time span, generate two clips (day, night) and dissolve at blue hour, start from a still of the scene as the first frame, or reduce moving elements.
5. Before answering, confirm the stages cover the whole span and the sun and shadow direction is consistent throughout.
</task>

<constraints>
- Do not present the result as real footage of a real place and date.
- No tool, model or version names.
- Keep text, signs and clocks with readable faces out of focus or out of frame, or plan to fix them in the edit; generated clocks rarely tell the right time.
</constraints>

<output_format>
## Time map
Table: Seconds | Real time | What the frame shows.
## Prompt
Code block.
## Physics check
Checklist.
## If it fails
Three numbered fixes.
</output_format>
