---
schema: 1
id: plan-morning-meeting
kind: prompt
title: Plan a week of morning meetings
description: Plans a week of elementary morning meetings with a greeting, sharing, a group activity and a morning message each day, tied to the class's current goals and kept to time.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [preferences]
output: [plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [morning-meeting, classroom-community, elementary, daily-routine]
pairs_with:
  prompts: [plan-sel-lesson, design-classroom-management-plan, plan-first-week-of-school]
args:
  - name: grade_level
    description: Grade or age, e.g. "Kindergarten", "Grade 3".
    type: string
    required: true
  - name: minutes
    description: Minutes available each day.
    type: number
    default: 20
  - name: class_goals
    description: Optional current focus, e.g. "listening to each other", "kindness at recess", "this week's maths is time".
    type: text
  - name: notes
    description: Optional class details, e.g. "several shy students", "two wheelchair users", "very energetic after the bus".
    type: text
output_contract:
  format: markdown
  sections: [This week's focus, Daily plans, Teacher tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A morning meeting is a short daily routine that builds community and readiness to learn, often in four parts: a greeting where every child is named and greeted, a share where a few students speak and others ask questions, a quick group activity, and a morning message the class reads together. It works through predictability and inclusion: every child is greeted every day, the share rotates so no one dominates, and nobody is forced to share personal things. Meetings drift when they run long, when the share becomes show-and-tell of possessions, or when activities are too competitive and leave children out.
</context>

<task>
Plan five morning meetings for **{{grade_level}}**, {{minutes}} minutes each.
{{#class_goals}}
Current goals: {{class_goals}}
{{/class_goals}}
{{#notes}}
Class notes: {{notes}}
{{/notes}}

1. Choose one focus for the week drawn from the goals (or a general community skill if none) and say how each day connects to it.
2. For each day give: a greeting (with how it is modelled and a fallback for students who do not want to touch or speak loudly), a share (format and prompt, how many students share, how others respond with questions or comments), a group activity (rules, time, how everyone participates), and a morning message written out in full at the grade's reading level with one interactive element.
3. Give minute timings for each part that add up to {{minutes}}.
4. Vary greetings and activities across the week while keeping the structure the same.
5. Add teacher tips: how to keep it on time, how to handle a share that becomes personal or upsetting, and how to include students named in the notes.
</task>

<constraints>
- Activities must be inclusive and adaptable for students with disabilities, shy students and those new to the language; no elimination games where students sit out for long.
- Share prompts must be safe to answer and offer a pass option; do not prompt for family, money, religion or trauma.
- If a student shares something that suggests harm or a safeguarding concern, the tips say to follow up privately and follow the school's safeguarding procedure.
- Keep the morning message short and readable for {{grade_level}}.
</constraints>

<output_format>
## This week's focus
One paragraph.
## Daily plans
Monday to Friday, each with Greeting · Share · Activity · Morning message and minutes.
## Teacher tips
Bullets.
</output_format>
