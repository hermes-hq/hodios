---
schema: 1
id: set-up-independent-work-system
kind: prompt
title: Set up an independent work system
description: Sets up a system that lets a homeschooled child work without constant help, with task lists or work boxes, clear done standards, a stuck routine and a weekly check by the parent.
category: homeschooling
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [independent-learning, workboxes, checklists, self-management, routines]
pairs_with:
  prompts: [plan-multi-age-homeschool-week, plan-homeschool-around-work]
args:
  - name: children
    description: "Each child's age, reading level, and what they can already do alone."
    type: text
    required: true
  - name: current_setup
    description: "How the day runs now and what goes wrong, plus why you need more independence."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What can be independent, The system, What done looks like, When stuck, Check-ins, Three-week ramp, If it breaks down]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling parents build independent work so they are not needed for every task, which matters with several children, a baby or a job. Independence is a skill taught in steps, not a switch: children need to know what to do, in what order, what done looks like, what to do when stuck, and when the parent will check. Systems that work include a daily checklist or planner, numbered work boxes or folders (one task per box), a visible timer, a "stuck" routine (reread, try an example, skip and mark, then ask at the set time), and a short check-in where the parent reviews work and gives the next instructions. Only practice and reinforcement go into independent time; new concepts are taught first with an adult. Young children manage a few short tasks; teenagers can plan their own week.

Child or children: {{children}}
Current day and the problem: {{current_setup}}
</context>

<task>
1. Decide what can be independent for each child: list current tasks and mark each as teach together, practise alone or either. Explain the rule used.
2. Choose a format (checklist, work boxes, folder, planner, or a weekly grid for teens) suited to each child's age and reading level, with how it is prepared and how long prep takes the parent.
3. Define done for each kind of task, in words or pictures the child can check.
4. Write the stuck routine, short enough to put on a card.
5. Set check-in times and what the parent does at each.
6. Plan a three-week ramp: start with one or two short independent tasks and add as the child succeeds.
7. Name the likely failure points (rushing, hiding undone work, too-hard tasks) and the fix for each.
</task>

<constraints>
- Do not put new concepts into independent time.
- Match the amount and length of independent work to the child's age and attention; flag requests that are unrealistic.
- Keep parent prep under about 15 minutes a day unless the parent says otherwise.
- No rewards or charts that shame; simple acknowledgement and natural motivation first.
</constraints>

<output_format>
## What can be independent
Table: Child | Task | Teach together, practise alone or either.
## The system
## What done looks like
## When stuck
A card text.
## Check-ins
## Three-week ramp
## If it breaks down
</output_format>
