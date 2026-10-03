---
schema: 1
id: create-kids-craft
kind: prompt
title: Create a kids' craft project
description: Designs a craft project for a child's age from household materials, with numbered steps split between child and adult, mess level, safety notes, a learning angle and easier or harder versions.
category: kids-activities
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [crafts-at-home, recycled-materials, fine-motor-skills, screen-free, preschool, art-projects]
pairs_with:
  prompts: [plan-rainy-day-activities, design-kids-science-experiment, plan-kids-summer]
  personas: [parenting-coach]
args:
  - name: child_age
    description: The child's age, or ages if siblings will do it together, for example "3", "5 and 9".
    type: string
    required: true
  - name: materials_on_hand
    description: What you have, for example "cereal boxes, toilet rolls, glue stick, felt tips, string, paper plates". Optional; household basics are assumed if empty.
    type: text
  - name: theme
    description: A theme or interest, for example "dinosaurs", "space", "Mother's Day", "autumn". Optional.
    type: string
output_contract:
  format: markdown
  sections: [The project, You will need, Steps, Safety, Learning angle, Make it easier or harder, Two quick alternatives]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design craft projects the way an experienced early-years practitioner or primary teacher would: the child does as much of the making as their age allows, the adult does the steps that need strength, sharp tools or heat, the materials are ones the family already has, and the activity quietly builds a skill (fine motor control, sequencing, counting, colour mixing, storytelling). Process matters more than a perfect product, especially for young children.

Child's age: {{child_age}}
{{#materials_on_hand}}Materials on hand: {{materials_on_hand}}{{/materials_on_hand}}
{{#theme}}Theme: {{theme}}{{/theme}}
</context>

<task>
1. Choose one main project that fits the age, the materials and the theme. Give it a name, the time it takes (set-up, making, drying), the mess level (low, medium, high, with what makes it messy), and how much adult help it needs.
2. You will need: materials from what they listed first, with substitutions for anything missing, and household basics marked as assumed. If no materials were listed, use common household items and recyclables.
3. Steps: numbered, short, each marked [child] or [adult] or [together], written so the adult can read them aloud. Include drying times and a tip at the step where things usually go wrong.
4. Safety: notes specific to this project and age: for under-3s, avoid anything that fits inside a toilet-roll tube and anything with button batteries, magnets, balloons or loose beads; scissors suited to age with supervision; hot glue and craft knives by adults only; non-toxic, washable paints and glue; ventilation for anything with fumes.
5. Learning angle: the skill it builds and two questions or prompts to talk about while making it.
6. Make it easier or harder: one simpler version for younger children or tired days, and one extension for older children; if siblings of different ages are doing it, show how each can take part.
7. Two quick alternatives with the same materials, one line each.
</task>

<constraints>
- Use only materials that are safe for the age; if something they listed is unsafe for the age (for example small beads for a 2-year-old), say so and swap it.
- Do not require buying anything unless they ask; if a purchase would really help, mark it optional.
- Keep steps achievable for the age; a 3-year-old cannot cut precise shapes, a 9-year-old can plan and measure.
- No branded products; describe materials generically.
- Short and practical; the whole thing should be readable in a minute.
</constraints>

<output_format>
## The project
Name, time, mess level, adult help.
## You will need
Checklist.
## Steps
Numbered with [child], [adult] or [together].
## Safety
## Learning angle
## Make it easier or harder
## Two quick alternatives
</output_format>
