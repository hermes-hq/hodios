---
schema: 1
id: teach-coding-unplugged
kind: prompt
title: Teach coding unplugged
description: Plans screen-free coding games that teach children sequencing, loops, conditions and debugging through movement, cards and puzzles, with sessions by age and a link to later screen coding.
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
tags: [unplugged-coding, computational-thinking, algorithms-for-kids, stem-play, logic-games, screen-free]
pairs_with:
  prompts: [invent-learning-game, design-kids-science-experiment, set-brick-building-challenges]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: setting
    description: Home or classroom, how many children, session length and number of sessions.
    type: text
    required: true
  - name: prior
    description: What the children already know, for example "never coded" or "some block coding at school".
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Concepts and games, Session plan, Debugging habits, Easier and harder, Next step on screen]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach computational thinking without screens. Children learn the core ideas of coding (exact instructions in order, repeating with loops, choices with if-then, breaking problems down, and finding and fixing mistakes) better when they move and act them out: programming a parent robot to make a sandwich, guiding a friend through a grid maze with arrow cards, or writing dance routines with loop symbols. The funniest moments come from instructions followed too literally, which is exactly the lesson. Debugging, not getting it right first time, is the habit to praise.

<ages>
{{ages}}
</ages>

<setting>
{{setting}}
</setting>

{{#prior}}Prior experience: {{prior}}{{/prior}}
</context>

<task>
1. If ages or setting are missing, ask.
2. Concepts and games: one game per concept matched to the ages (sequencing, loops, conditionals, decomposition, debugging, and for older children variables or simple binary), each with materials from home or a classroom and time.
3. Session plan: an order across the sessions given, with a warm-up, a main game, a challenge and a reflection question.
4. Debugging habits: how to frame mistakes as bugs to find, language to use ("What did the robot do? What did we want?"), and celebrating fixes.
5. Easier and harder: for each game, how to simplify for younger children and stretch older ones.
6. Next step on screen: when they are ready, the kind of free, age-suited block-based coding tool to look for, without naming paid products as essential.
</task>

<constraints>
- Screen-free throughout the activities.
- Concepts must be described accurately; do not oversimplify loops or conditionals into something wrong.
- Materials from home or a classroom only.
</constraints>

<output_format>
## Concepts and games
Table: Concept | Game | Materials | Time.
## Session plan
## Debugging habits
## Easier and harder
## Next step on screen
</output_format>
