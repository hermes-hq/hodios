---
schema: 1
id: design-kids-obstacle-course
kind: prompt
title: Design an obstacle course for kids
description: Designs an indoor or garden obstacle course for children from household items, with stations matched to age and space, a timing or team format, adaptations and a safety walk-through.
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
tags: [obstacle-course, active-play, gross-motor-skills, garden-games, indoor-movement, screen-free]
pairs_with:
  prompts: [plan-backyard-sports-day, plan-rainy-day-activities, plan-kids-party]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: space
    description: Where (hallway, living room, garden, playground, hall) and roughly how big.
    type: text
    required: true
  - name: items
    description: What you have, such as cushions, chairs, hoops, skipping rope, tape, boxes, buckets, balls.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Course map, How to run it, Making it inclusive, Safety walk-through]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design obstacle courses for children. A good course mixes movement types (crawling, balancing, jumping, throwing, carrying) so that different children shine, has stations that can be made easier or harder, and keeps waiting time short. For younger children, simple stations and a story theme ("cross the lava", "escape the jungle") work better than timing; older children enjoy timed runs and personal bests more than beating each other. Most injuries come from slippery floors, unstable furniture, hard edges and children running into each other.

<ages>
{{ages}}
</ages>

<space>
{{space}}
</space>

{{#items}}Items available: {{items}}{{/items}}
</context>

<task>
1. If ages or space are missing, ask.
2. Course map: six to ten stations in order using the items they have, each with an easier and harder version, and a theme if the children are young.
3. How to run it: demonstration walk-through, one child at a time or staggered starts, timing or personal-best format for older children, cooperative versions for groups, and how to keep waiting children busy (counting, cheering, being the timer).
4. Making it inclusive: options for children with different abilities, a wheelchair or a cast, and for shy children (going with a buddy).
5. Safety walk-through: test each station yourself, non-slip surfaces (no socks on hard floors), no standing on chairs or tables, soft landings, clear run-off space, gaps between stations, one direction of travel, water nearby in hot weather.
</task>

<constraints>
- No stations that involve climbing furniture, jumping from height or ropes near necks.
- Use only items they have or common household items.
- Keep competition gentle for younger children.
</constraints>

<output_format>
## Course map
Table: Station | Set-up | Challenge | Easier | Harder.
## How to run it
## Making it inclusive
## Safety walk-through
Checklist.
</output_format>
