---
schema: 1
id: create-chore-chart
kind: prompt
title: Create a chore chart
description: Creates an age-appropriate chore chart for a family's children, with effort points for a fair rotation, a clear definition of done for each job and a simple reward system.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [household-chores, rewards, responsibility, rotation]
pairs_with:
  prompts: [coordinate-family-calendar, plan-behavior-approach]
  personas: [parenting-coach]
args:
  - name: children
    description: Each child's name or initial and age, for example "Mia 4, Leo 9, Sam 13".
    type: text
    required: true
  - name: household_tasks
    description: The jobs you want shared, for example "dishes, laundry, bins, feed the cat, vacuum". Optional; typical jobs are suggested if empty.
    type: text
output_contract:
  format: markdown
  sections: [Who does what, Job guide, Four-week rotation, Rewards, Getting started, Safety notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design chore charts that children can follow and parents can keep up with. Charts last when jobs match what each child can actually do, "done" is defined (with pictures for non-readers), the workload feels fair, and rewards are simple. Typical abilities by age: 2–3 put toys in a box, clothes in the basket; 4–5 set the table, feed a pet with help, match socks; 6–7 empty the cutlery from the dishwasher, sweep, water plants; 8–10 load the dishwasher, vacuum, fold laundry, take out bins, make a simple snack; 11–13 clean a bathroom, cook a simple meal, run a laundry load; 14 and up shop from a list and cook a family meal. Children learn a job in stages: watch the adult, do it together, then do it alone.

Children: {{children}}
{{#household_tasks}}Jobs to share: {{household_tasks}}{{/household_tasks}}
</context>

<task>
1. List each child with their age. If any age is missing, ask for it.
2. Use the jobs given, or propose a typical set. Split them into personal jobs (own room, own plate, own bag) and family jobs (shared spaces, meals, pets).
3. Give each family job effort points (1 light, 2 medium, 3 heavy), a minimum age, and a one-line "done means" definition ("done means: dishes in the rack, counter wiped, sink empty").
4. Assign jobs to each child by age, then build a four-week rotation so the less popular jobs move around and each child's weekly points are balanced relative to their age. Show each child's weekly points.
5. Design a simple reward system: points or stickers that add up to small privileges or family activities, with clear rules. Keep personal jobs as expected without a reward, and keep it simple enough to run for a month.
6. How to launch it: a short family meeting where children have some choice, teaching each new job in stages, and a review after two weeks.
</task>

<constraints>
- Safety by age: no bleach, oven cleaner or other harsh chemicals for children; sharp knives, the hob or oven, and electrical appliances only with supervision and when the child is ready; lawnmowers not for young children (child-safety guidance commonly says 12 or older for push mowers and 16 or older for ride-on mowers).
- Fair is not identical: fair means effort matched to age. For children of the same age, make points equal.
- Never use chores as punishment, and do not take away points already earned.
- Keep the chart printable: plain tables, short job names.
</constraints>

<output_format>
## Who does what
Table: Child | Age | Daily jobs | Weekly jobs | Weekly points.
## Job guide
Table: Job | Points | Done means | From age.
## Four-week rotation
Table: Job | Week 1 | Week 2 | Week 3 | Week 4.
## Rewards
Rules in bullets.
## Getting started
## Safety notes
</output_format>
