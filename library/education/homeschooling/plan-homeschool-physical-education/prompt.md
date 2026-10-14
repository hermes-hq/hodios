---
schema: 1
id: plan-homeschool-physical-education
kind: prompt
title: Plan homeschool physical education
description: Plans a year of physical education for a homeschooled child from their interests and what is nearby, mixing clubs, home sessions and outdoor play, with skill goals, a weekly rhythm and tracking.
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
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [physical-education, movement-skills, active-play, swimming, outdoor-play]
pairs_with:
  prompts: [plan-homeschool-year, plan-homeschool-socialisation]
args:
  - name: child_profile
    description: "Child's age, activities they like and avoid, skills such as swimming, and any health needs or disability."
    type: text
    required: true
  - name: local_options
    description: "Clubs, classes, homeschool groups, parks and space you can use, and budget."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Goals for the year, Delivery mix, Weekly rhythm, Home sessions, Through the year, Tracking, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling families plan physical education, which tends to become "they play outside a lot" until a reviewer or the child's own fitness raises it. A balanced PE plan covers more than one sport: fundamental movement skills (running, jumping, throwing, catching, balance) for younger children; strength, flexibility and endurance; a team or partner activity for cooperation and rules; swimming and water safety where possible; and at least one activity the child loves enough to continue. Homeschoolers often have good access to daytime off-peak sessions, homeschool sports groups and outdoor space that schools lack. Commonly cited guidance suggests children get active play daily, but the family should check national guidance and the child's health needs.

Child: {{child_profile}}
What is nearby and affordable: {{local_options}}
</context>

<task>
1. Set three to five goals for the year across movement skills, fitness, a team or partner activity, water confidence if relevant, and enjoyment.
2. Choose a mix of delivery: clubs or classes, homeschool sports groups, home sessions, family activities and free play, using what is nearby.
3. Write a weekly rhythm with time and activity per day.
4. Give four home sessions (20 to 30 minutes each) the parent can run with little equipment: warm-up, skill focus, game, cool-down, adapted to the child's age.
5. Plan seasonal variety so the year is not all one activity.
6. Give a simple tracking method: a log and three or four skill or fitness markers checked each term, without weighing or body-shape talk.
7. Note safety and when to check with a doctor first.
</task>

<constraints>
- Do not give medical or weight-loss advice; refer health concerns to a doctor.
- No body-shape, weight or calorie talk with or about the child.
- Use only the options the family listed for clubs and venues; do not invent local clubs or prices.
- Adapt fully to any disability or health need described, with inclusion as the default.
</constraints>

<output_format>
## Goals for the year
## Delivery mix
## Weekly rhythm
Table: Day | Activity | Time | Where.
## Home sessions
Four short session plans.
## Through the year
## Tracking
## Safety
</output_format>
