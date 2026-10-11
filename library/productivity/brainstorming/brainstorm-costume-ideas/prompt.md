---
schema: 1
id: brainstorm-costume-ideas
kind: prompt
title: Brainstorm costume ideas
description: Generates costume ideas for Halloween, a themed party or a school dress-up day, matched to budget, group size, DIY skill and comfort, with how to make the best few from everyday items.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [parent, individual, student]
requires: [none]
inputs: [text, preferences]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [costumes, halloween, fancy-dress, diy-costumes, group-costumes, dress-up-day]
pairs_with:
  prompts: [cosplay-build-track, plan-kids-party]
args:
  - name: occasion
    description: The event and theme, for example "Halloween party, no theme", "World Book Day at school", "80s night", "office party, 'something beginning with P'".
    type: string
    required: true
  - name: who
    description: Who needs a costume - ages, how many, any group or couple idea, and what they like, for example "me and three friends, we love bad horror films" or "my 6-year-old, loves trains, hates face paint".
    type: text
    required: true
  - name: limits
    description: Budget, time left, sewing or craft skill, and comfort needs, for example "almost no money, two days, can glue but not sew, must be able to sit and dance".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Ideas, Top three and how to make them, Safety notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most costume stress comes from picking an idea that needs skills, time or money the person does not have, or that is uncomfortable for hours. Good costume ideas start from what is already in the wardrobe and recycling bin, are recognisable at a glance (one or two signature items do most of the work), and suit how the person will spend the evening: sitting, dancing, eating, being outside in the cold, or a child who hates masks and face paint. Group costumes work best when each person's piece is simple and the group makes the joke. Costumes that use another culture's dress, religious items, or real tragedies, or that involve blackface or other skin-darkening, cause real offence and are a common, avoidable mistake. Safety for children: visible after dark, no tripping hems, masks that do not block vision, non-toxic face paint tested on a small patch.

Occasion: {{occasion}}
Who: {{who}}
Limits: {{limits}}
</context>

<task>
1. If the occasion's theme or who is dressing up is unclear, ask one question and stop.
2. Generate 12 to 15 ideas fitted to the theme and the people, spanning: from-the-wardrobe, simple DIY, pun or wordplay, pop culture, and group or couple ideas if more than one person.
3. For each idea, give the signature items that make it recognisable, what can come from home, difficulty (easy, medium, hard), budget level, and comfort notes.
4. Remove ideas that exceed the stated skill, time or budget.
5. Pick the top three and give short making instructions for each using everyday materials, with time needed.
6. Add safety notes where children, darkness, cold or crowds are involved.
</task>

<constraints>
- No costumes based on cultural or religious dress, racial stereotypes, skin-darkening, real tragedies or disabilities.
- No exact prices or named shops; keep to budget levels.
- Respect stated dislikes such as face paint or masks.
- Use only techniques within the stated skill level.
</constraints>

<output_format>
## Ideas
Table: Costume | Signature items | From home | Difficulty | Budget | Comfort.
## Top three and how to make them
## Safety notes
</output_format>
