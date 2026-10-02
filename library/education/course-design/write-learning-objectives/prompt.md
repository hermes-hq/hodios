---
schema: 1
id: write-learning-objectives
kind: prompt
title: Write measurable learning objectives
description: Writes measurable learning objectives with Bloom verbs, conditions and criteria, each aligned to an assessment method that would show mastery. Use when planning a lesson, module or course.
category: course-design
version: 1.0.0
status: incubating
stage: [design]
role: [teacher, consultant]
requires: [none]
inputs: [topic, text]
output: [table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [blooms-taxonomy, constructive-alignment, outcomes]
pairs_with:
  prompts: [design-course-outline, create-rubric]
args:
  - name: topic
    description: The content or unit the objectives cover, optionally with the goal behind it.
    type: text
    required: true
  - name: audience
    description: Optional audience and level, e.g. "Grade 6", "nursing students in year 2", "new sales hires".
    type: string
  - name: count
    description: Number of objectives.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Objectives, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An objective is useful only if you could watch a learner and decide whether they have met it. "Understand", "know", "appreciate" and "be familiar with" fail that test, so do objectives that describe what the teacher will do ("cover the causes of…"). A measurable objective names the learner, one observable verb at the intended cognitive level, the content, and where it matters the conditions and the standard. It also points straight to how it will be assessed.
</context>

<task>
Write {{count}} learning objectives for the topic below{{#audience}}, for {{audience}}{{/audience}}.

<topic>
{{topic}}
</topic>

1. Identify what someone who has mastered this topic can do that a novice cannot. Use that as the source of the objectives, not the list of content.
2. Choose cognitive levels suited to the audience and topic, using Bloom's revised taxonomy (remember, understand, apply, analyse, evaluate, create). Spread the objectives across levels, with most at apply or above unless the audience is new to the field.
3. Write each objective as: "By the end, learners will be able to [verb] [content] [condition, if relevant] [criterion, if relevant]."
   - One verb per objective. No "understand", "know", "learn", "appreciate", "be aware of".
   - Use a verb that matches the level and can be observed: identify, explain, calculate, compare, diagnose, justify, design, critique.
   - Add a condition ("given a patient case", "using a calculator") or criterion ("with no more than one error", "within 10 minutes") when it changes what mastery means.
4. For each objective, give the assessment method that would show it and the specific evidence a marker would look for. The method must match the verb: "design" is assessed by making something, not by a multiple-choice question.
5. Check the set: no two objectives overlap, together they cover the topic's core, and each is achievable for this audience.
</task>

<constraints>
- If the topic is too vague to write measurable objectives for, ask up to two questions about the goal and the audience, then stop.
- Keep the topic's terminology, and keep objectives to one sentence each.
- If {{count}} is too many for a narrow topic, write fewer and say so instead of padding with trivial recall objectives.
</constraints>

<output_format>
## Objectives
A table: # | Objective | Bloom level | Assessment method | Evidence of mastery.
## Notes
Up to 3 bullets: coverage gaps, assumptions about the audience, and any objective that needs a resource or condition the teacher should confirm.
</output_format>
