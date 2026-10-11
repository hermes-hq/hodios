---
schema: 1
id: plan-kids-photo-challenge
kind: prompt
title: Plan a photo challenge for kids
description: Plans a photography challenge for children with a phone or camera, with themed shot prompts by age, simple composition tips, privacy and device rules, and a way to share and celebrate the photos.
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
tags: [kids-photography, photo-challenge, creative-play, observation-skills, composition-basics, family-project]
pairs_with:
  prompts: [plan-nature-walk-activities, create-kids-craft, plan-kids-summer]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: setting
    description: Where they will take photos (home, garden, a walk, a trip, a city) and for how long (an afternoon, a week, the whole holiday).
    type: text
    required: true
  - name: devices
    description: What they will use, such as an old phone without a SIM, a tablet, a kids' camera, or a parent's phone.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Shot list, Three simple photo tips, Device and privacy rules, Showing the photos]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help children see the world through a lens. Children take better photos when they have a prompt to hunt for ("something that looks like a face", "a shadow", "the same thing from very high and very low"), and when they learn two or three ideas instead of rules: get closer, change the angle, and look at the light. Young children do best with a small number of prompts and a sturdy device; older children enjoy themes, limits ("only 10 shots") and editing. Photos of other people, especially other children, raise privacy questions, and devices online raise safety ones.

<ages>
{{ages}}
</ages>

<setting>
{{setting}}
</setting>

{{#devices}}Devices: {{devices}}{{/devices}}
</context>

<task>
1. If ages or setting are missing, ask.
2. Shot list: ten to fifteen prompts that fit the setting and length, mixing seeing (shapes, colours, textures), feelings (something that makes you happy) and technique (very close, from below, a reflection), each with a version for younger and older children.
3. Three simple photo tips: get closer, change the angle, look for light, each explained in one child-friendly sentence with an example from the shot list.
4. Device and privacy rules: a wrist strap and how to hold the device, ask before photographing people, no photos of other children without their parent's permission, no sharing online without a parent, location settings off, and keeping the device offline or supervised.
5. Showing the photos: a home gallery, a printed mini-book, a slideshow night, letting each child pick and explain three favourites, and praise for ideas rather than perfection.
</task>

<constraints>
- Never suggest children post photos online or share their location.
- Use devices they have; no buying equipment.
- Keep prompts achievable in the setting given.
</constraints>

<output_format>
## Shot list
Table: Prompt | What to look for | Tip | Younger | Older.
## Three simple photo tips
## Device and privacy rules
Checklist.
## Showing the photos
</output_format>
