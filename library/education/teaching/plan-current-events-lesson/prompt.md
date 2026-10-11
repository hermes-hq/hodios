---
schema: 1
id: plan-current-events-lesson
kind: prompt
title: Plan a current events lesson
description: Plans a lesson around a current news story with age-appropriate framing, sources to compare, links to the curriculum and a discussion or writing task, without stating unverified facts.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [current-events, news-in-class, curriculum-links, discussion-task]
pairs_with:
  prompts: [plan-lesson-on-sensitive-topic, plan-media-literacy-lesson, generate-discussion-questions]
args:
  - name: story
    description: The news story, ideally with a summary or pasted article text and its date. The model may not know about recent events.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: subject
    description: The subject this lesson belongs to, e.g. "geography", "economics", "science", "English".
    type: string
    required: true
  - name: duration_minutes
    description: Lesson length in minutes.
    type: number
    default: 50
output_contract:
  format: markdown
  sections: [Overview, Facts to verify, Lesson plan, Sources to compare, Task, Sensitivity notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Current events lessons are worth doing when the story is used to teach the subject, not just to talk about the news: a flood teaches river processes, an interest-rate rise teaches inflation, a court ruling teaches how laws are made. The traps are teaching details that later turn out wrong (early reporting is often inaccurate), pitching the framing wrong for the age (frightening younger children, or flattening complexity for older ones), and the AI or teacher filling gaps with assumptions. A language model may not know about recent events at all, so the lesson must rest on what the teacher provides and on sources the teacher checks.
</context>

<task>
Plan a {{duration_minutes}}-minute **{{subject}}** lesson for **{{grade_level}}** around this story.
<story>
{{story}}
</story>

1. Summarise only what the provided text says. Do not add details from memory about a recent event; if you know background (the place, the underlying science or system), label it as background and keep it separate from claims about the event.
2. List the facts the teacher should verify before the lesson and note that early reports may change.
3. Identify the subject concepts the story illustrates and write one or two measurable objectives that are about those concepts.
4. Plan the lesson with timings adding to {{duration_minutes}}: an opener that finds out what students already know or have heard (and corrects rumours gently), concept teaching using the story as the example, a source comparison, and a discussion or writing task.
5. Describe 2 or 3 types of sources to compare (e.g. a news report, an official statement, a data source, a perspective from people affected) and the questions students ask of each. The teacher chooses the actual sources.
6. Write the discussion or writing task with success criteria.
7. Add sensitivity notes: framing for the age group, students who may be affected, and how to handle worry or strong opinions.
</task>

<constraints>
- Never invent quotes, casualty figures, names, dates or outcomes. Use only what the story text says, and mark anything else [verify].
- Teach the subject concept accurately; the story is the example, not the content.
- For political stories, present contested positions fairly and do not tell students what to think.
- For distressing events, avoid graphic detail and offer reassurance appropriate to the age.
</constraints>

<output_format>
## Overview
Story in two sentences (from the text given), subject concepts, objectives.
## Facts to verify
Bullets.
## Lesson plan
A table: Time | Activity | Teacher | Students, adding to {{duration_minutes}}.
## Sources to compare
Source types and questions.
## Task
Task and success criteria.
## Sensitivity notes
Bullets.
</output_format>
