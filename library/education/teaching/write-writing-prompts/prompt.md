---
schema: 1
id: write-writing-prompts
kind: prompt
title: Write classroom writing prompts
description: Writes a set of writing prompts for a genre and age, each with a stimulus, a real audience and purpose, success criteria, a support version and a stretch version.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
subject: [english]
tags: [writing-tasks, audience-and-purpose, success-criteria, writing-instruction]
pairs_with:
  prompts: [plan-writing-workshop-minilesson, write-annotated-exemplars, create-rubric]
args:
  - name: genre
    description: The text type, e.g. "persuasive letter", "narrative opening", "explanation text", "diary entry".
    type: string
    required: true
  - name: grade_level
    description: Grade or age.
    type: string
    required: true
  - name: count
    description: How many prompts.
    type: number
    default: 5
  - name: context
    description: Optional link to current learning, e.g. "we are studying the Romans", "our class pet", "climate unit in science".
    type: text
output_contract:
  format: markdown
  sections: [Prompts, Shared success criteria, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students write better when the prompt gives them something to say, someone to say it to and a reason to say it. "Write a persuasive essay about school uniforms" produces the same tired arguments; "Write to the head teacher proposing one change to the lunch hall, using evidence from your class survey" gives a real audience, purpose and content. Strong prompts include a stimulus (an image described, a short scenario, data, a fact sheet), fit the genre's features, can be completed in the time available, and allow choice. They also avoid prompts that require personal disclosure or assume experiences some students have not had (holidays abroad, pets, a particular family set-up).
</context>

<task>
Write {{count}} **{{genre}}** prompts for **{{grade_level}}**.
{{#context}}
Link to: {{context}}
{{/context}}

1. For each prompt give: a title, the task in student language, the audience and purpose stated explicitly, a stimulus you write (scenario, mini fact sheet, data, or an image described in words), and suggested length and time.
2. Add a support version (sentence starters, a planning frame, a narrower choice) and a stretch version (a twist on audience, form or constraint) for each.
3. Vary the prompts: different audiences, real versus imaginative, and at least one with genuine choice.
4. Write shared success criteria for the genre at this level (structure, language features, audience awareness), in student-friendly "I can" statements.
5. Add teacher notes: which prompt suits a first attempt, which suits assessment, and any prompt that needs care for some students.
</task>

<constraints>
- No prompts that require students to disclose personal trauma, family circumstances, or experiences not all students have had; offer an imagined alternative where a personal prompt is used.
- Facts in stimulus material must be accurate, or clearly fictional; label fictional data as fictional.
- Keep prompts age-appropriate and free of real brand or celebrity endorsements.
</constraints>

<output_format>
## Prompts
Numbered, each with Title · Task · Audience and purpose · Stimulus · Length and time · Support version · Stretch version.
## Shared success criteria
"I can" statements.
## Teacher notes
Bullets.
</output_format>
