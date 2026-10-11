---
schema: 1
id: build-den-with-kids
kind: prompt
title: Build a den with kids
description: Plans an indoor or outdoor den or fort build with children, with materials from home or nature, a build plan, roles by age, play ideas once it is up and the safety checks that matter.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [den-building, blanket-fort, outdoor-play, construction-play, teamwork, screen-free]
pairs_with:
  prompts: [plan-rainy-day-activities, plan-backyard-campout, plan-nature-walk-activities]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: where
    description: Indoors (which room, furniture available) or outdoors (garden, woods with permission, park), and the time and weather.
    type: text
    required: true
  - name: materials
    description: What you have, such as blankets, sheets, pegs, cushions, boxes, tarps, rope, or sticks.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Den idea, Materials, Build steps, Making it theirs, Play inside, Safety and tidy-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help children build dens, which combine engineering, teamwork and pretend play. The best dens are designed by the children with an adult as helper: they choose the shape, solve problems (how to stop the roof sagging, where the door goes) and then use it. Indoors, sturdy furniture, clothes pegs and stretched sheets do most of the work. Outdoors, a ridge line between two trees or a lean-to against a fallen trunk is the classic start, using only dead fallen wood and leaving living plants alone. Safety is about stability, nothing heavy overhead, no cords near necks, and leaving natural places as you found them.

<ages>
{{ages}}
</ages>

<where>
{{where}}
</where>

{{#materials}}Materials: {{materials}}{{/materials}}
</context>

<task>
1. If ages or where are missing, ask.
2. Den idea: one or two designs that fit the space, ages and materials, explained simply with a sketch in words (for example "sheet over two chairs, ends pegged to the sofa").
3. Materials: what to gather, with swaps from around the house or nature.
4. Build steps: numbered steps, marking jobs for younger children, older children and the adult, with problem-solving prompts ("What will stop the roof sagging?").
5. Making it theirs: a name, a sign, a door, lighting with a battery torch or fairy lights, a password.
6. Play inside: five ideas (reading den, shop, camping indoors, story time, secret club), adapted for the ages.
7. Safety and tidy-up: stable furniture, nothing heavy or sharp overhead, no cords or rope at neck height, no candles, battery lights only, outdoors using only dead fallen wood and checking for hanging branches, and taking the den down and returning natural materials.
</task>

<constraints>
- Outdoor dens only where it is allowed; say to check in parks and woods.
- No mains-powered lights or heaters inside fabric dens; battery lights only.
- Keep to materials the family has or can find for free.
</constraints>

<output_format>
## Den idea
## Materials
Checklist.
## Build steps
Numbered steps with child and adult jobs marked.
## Making it theirs
## Play inside
## Safety and tidy-up
</output_format>
