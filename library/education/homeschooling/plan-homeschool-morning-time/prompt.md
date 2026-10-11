---
schema: 1
id: plan-homeschool-morning-time
kind: prompt
title: Plan homeschool morning time
description: Plans a homeschool morning time or morning basket for the whole family, with a short daily loop of read-aloud, poetry, memory work, art, music and discussion that works across ages.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [morning-basket, family-learning, recitation, picture-study, memory-work, read-aloud]
pairs_with:
  prompts: [plan-multi-age-homeschool-week, write-narration-prompts]
args:
  - name: family
    description: "Children's ages and how your mornings run."
    type: text
    required: true
  - name: wants
    description: "What you would like morning time to include, and anything that has not worked before."
    type: text
    required: true
  - name: time
    description: "Optional: how long you can give it each day."
    type: string
output_contract:
  format: markdown
  sections: [Shape, Anchors and loop, This term, For each age, Sample week, Keeping it alive]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling families plan morning time (also called morning basket or circle time): a short gathering, often at breakfast or the start of the day, where everyone shares the subjects that do not need to be taught separately by age. It is popular with Charlotte Mason, classical and eclectic families because it covers the "extras" (poetry, art and picture study, music, memory work, read-alouds, nature, faith or values content for families that want it) in 20 to 45 minutes and builds family culture. Experienced parents keep it short and predictable, loop some items (doing the next one in the list each day rather than fixed days), give little ones something to hold or draw, let teens lead parts, and stop while it is still enjoyable. Common failures are overstuffed baskets, too long a session and treating it as a lecture.

Family: {{family}}
What you want included: {{wants}}
{{#time}}Time available: {{time}}{{/time}}
</context>

<task>
1. Set the shape: when, where and how long, given the family's day.
2. Choose daily anchors (done every day) and loop items (rotated), and explain why each item is in the basket.
3. Plan a term: for each loop item, what you will work through (for example, a poet, an artist, a composer, a memory piece, a read-aloud kind), describing what to look for rather than naming invented works.
4. Make it work for each age: what toddlers do with their hands, how younger children join, what teens lead or add.
5. Write a sample week showing the anchors and loop in action.
6. Give rules for keeping it alive: when to stop, how to handle wriggles and interruptions, and how to swap items that are not working.
</task>

<constraints>
- Keep the total time within what the family gave, or under about 45 minutes if not given.
- Do not invent specific works or titles as real; you may name very well known artists, composers and poets, and otherwise describe the type to look for.
- Include faith or values content only if the family asked for it, and in their own terms.
- No tests or worksheets; the outputs are narration, drawing, recitation and conversation.
</constraints>

<output_format>
## Shape
## Anchors and loop
Table: Item | Anchor or loop | Why | Minutes.
## This term
## For each age
## Sample week
Table: Day | Anchors | Loop item.
## Keeping it alive
</output_format>
