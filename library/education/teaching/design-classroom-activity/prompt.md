---
schema: 1
id: design-classroom-activity
kind: prompt
title: Design an active-learning activity
description: Designs an active-learning activity such as a jigsaw, think-pair-share or gallery walk, with timing, grouping, materials, teacher script and individual accountability.
category: teaching
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
requires: [none]
inputs: [text, topic]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [active-learning, cooperative-learning, jigsaw, gallery-walk]
pairs_with:
  prompts: [write-lesson-plan, generate-discussion-questions]
args:
  - name: objective
    description: What students should be able to do by the end, plus the content, e.g. "compare the causes of the American and French revolutions".
    type: text
    required: true
  - name: class_size
    description: Number of students.
    type: number
    default: 25
  - name: duration_minutes
    description: Time available for the activity.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Choice of structure, Setup, Run sheet, Teacher script, Accountability and check, If things go wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Active learning works when the structure fits the thinking the objective requires and every student has to do that thinking. It fails when groups let one student do the work, when the timing is a guess, or when the instructions take ten minutes to explain. Each structure suits a purpose: think-pair-share for quick reasoning on one question, jigsaw for spreading a body of content across experts, gallery walk for comparing many products or sources, structured academic controversy for weighing positions, and peer instruction for confronting misconceptions with a concept question.
</context>

<task>
Design an activity for {{class_size}} students in {{duration_minutes}} minutes toward this objective:

<objective>
{{objective}}
</objective>

1. Choose the structure that best fits the objective's kind of thinking, and explain the choice in two sentences, naming one alternative and why it is weaker here.
2. Work out the grouping arithmetic for exactly {{class_size}} students: group size, number of groups, and what to do with the remainder. For a jigsaw, the expert and home group sizes must both work.
3. Write a minute-by-minute run sheet whose times add up to exactly {{duration_minutes}} minutes, including transitions and a closing synthesis.
4. Write the materials: the actual prompts, cards, sources or task sheet content, or a precise description if they would be too long.
5. Write the teacher script for launching the activity: instructions in under 90 seconds, numbered, with the success criteria.
6. Build in individual accountability (roles, a personal written response, random reporter) so no student can coast, and a check that shows the teacher whether the objective was met.
7. Plan for problems: early finishers, a silent group, an absent expert, and running out of time.
</task>

<constraints>
- If {{duration_minutes}} is too short for the best structure, choose a simpler one and say why.
- Use materials a normal classroom has unless the objective says otherwise.
- If the objective is too vague to design for ("learn about plants"), restate it as a measurable objective, say you did, and design for that.
</constraints>

<output_format>
## Choice of structure
Two or three sentences.
## Setup
Group size and count, room layout, materials list.
## Run sheet
A table: Minutes | Phase | Students do | Teacher does. Times sum to {{duration_minutes}}.
## Teacher script
Numbered launch instructions, ready to read aloud.
## Accountability and check
Bullets.
## If things go wrong
Problem → response.
</output_format>
