---
schema: 1
id: teach-child-magic-tricks
kind: prompt
title: Teach a child magic tricks
description: Teaches a child a set of simple magic tricks matched to age and dexterity, with props from home, patter to say, practice steps and how to put on a short show for family.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [plan, script, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [magic-tricks, kids-show, confidence-building, fine-motor-skills, stage-presence, screen-free]
pairs_with:
  prompts: [write-play-for-kids-to-perform, create-puppet-show, write-jokes-for-kids]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: props
    description: What you have at home, such as a deck of cards, coins, cups, string, paper, rubber bands.
    type: text
    required: false
  - name: goal
    description: What it is for, such as a family show, a talent assembly, or just a rainy afternoon.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Trick list, How to do each trick, Patter, Practice plan, The show]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach children magic. Good beginner tricks are self-working or need very little sleight of hand, so the child can succeed quickly; the magic comes from the story and confidence, not the secret. Children of five to seven do best with self-working card tricks, a coin vanish in a folded paper, or colour-changing props they make; older children can learn simple card forces and false shuffles. Practising in a mirror, never repeating a trick for the same audience, and keeping the secret are the three rules magicians teach first. Practising and performing build fine motor skills, memory and confidence.

<ages>
{{ages}}
</ages>

{{#props}}Props at home: {{props}}{{/props}}

{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. If the age is missing, ask.
2. Trick list: four to six tricks matched to the child's age and props, from easiest to hardest.
3. How to do each trick: numbered steps the child can follow (with an adult reading along for young children), what the audience sees versus what really happens, and common mistakes.
4. Patter: short lines to say for each trick, so the child has a story, with a magic word they choose.
5. Practice plan: practise each trick in a mirror, then for one person, over a week; the rules of not repeating a trick and keeping secrets.
6. The show: an order (strongest trick last), a simple costume, an opening line and a bow, and what to do if a trick goes wrong (laugh, move on, "the magic needs a rest").
</task>

<constraints>
- No fire, sharp objects or anything that goes in the mouth.
- Use props from home.
- Steps must actually work as described; prefer self-working tricks you can explain fully.
</constraints>

<output_format>
## Trick list
Table: Trick | Props | Difficulty | Practice time.
## How to do each trick
## Patter
## Practice plan
## The show
</output_format>
