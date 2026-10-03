---
schema: 1
id: plan-flipped-lesson
kind: prompt
title: Plan a flipped lesson
description: Designs a flipped lesson with a short pre-class video or reading plus check questions, and an in-class application activity that builds on what students learned at home.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [flipped-classroom, blended-learning, pre-class-video, active-learning, homework-design]
pairs_with:
  prompts: [write-lesson-plan, design-formative-assessment, design-station-rotation]
args:
  - name: topic
    description: What students learn before class and apply in class, e.g. "balancing chemical equations" or "the structure of a persuasive letter".
    type: text
    required: true
  - name: grade_level
    description: Grade, year or course, e.g. "Grade 9 chemistry", "Year 6".
    type: string
    required: true
  - name: class_minutes
    description: Length of the in-class session in minutes.
    type: number
    default: 50
  - name: tech_access
    description: Optional notes on devices and internet at home and school, e.g. "most have phones; about 5 have no home internet; class set of tablets".
    type: text
output_contract:
  format: markdown
  sections: [Overview, Pre-class content, Pre-class check, Access plan, In-class lesson, Assessment and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Flipping moves first exposure to new content out of class so class time can go on the harder part: applying it with the teacher there to help. It only works if the pre-class part is short and focused (students' attention drops quickly on long videos, so keep it to a few minutes, shorter for younger students), includes a check that tells the teacher who engaged and who understood, and if the in-class session genuinely depends on it rather than re-teaching everything. It fails when some students cannot access the material at home, when no one checks the pre-work, or when the class session repeats the video. The in-class session should open by using the check data to sort students, then move into application with the teacher targeting those who need it.
</context>

<task>
Plan a flipped lesson on **{{topic}}** for **{{grade_level}}** with a {{class_minutes}}-minute in-class session.
{{#tech_access}}
Technology access:
<tech_access>
{{tech_access}}
</tech_access>
{{/tech_access}}

1. **Overview:** split the topic into what students can learn on their own beforehand (definitions, a procedure, a worked example) and what needs class time (application, problem solving, discussion, misconceptions). State the objective for each part.
2. **Pre-class content:** a script or tight outline for a teacher-made video of a few minutes, suited to the age, with one worked example and clear on-screen text, or a short reading with the same content. If the teacher may prefer an existing video, give selection criteria (length, accuracy, matches your method) rather than a link; do not invent titles or URLs.
3. **Pre-class check:** 3 to 5 questions students answer after watching or reading (at least one applying the idea to a new example and one asking what confused them), with answers. Add a one-line summary prompt and a "question I still have" prompt.
4. **Access plan:** how students without devices or internet at home get the content (printout, a school-based viewing slot, an in-class catch-up station) and what happens in class for students who did not do the pre-work, without punishing the whole lesson or re-teaching everyone.
5. **In-class lesson:** a timed sequence adding up to {{class_minutes}} minutes: an entry check that reuses the pre-class idea (2 or 3 questions), grouping based on the results, the main application activity with tasks at two or three levels of challenge, what the teacher does with each group (reteach group, conferencing, stretch), and a closing check.
6. **Assessment and follow-up:** how the in-class work shows mastery, and what the next pre-class task builds on.
</task>

<constraints>
- Keep the pre-class content short and focused on one idea; flag if the topic is too large for one flipped cycle.
- Content must be accurate and suit {{grade_level}}. Check the worked example.
- Plan for unequal access. Never assume every student has a device and home internet unless the teacher said so.
- Do not depend on a specific platform or app unless the teacher named one.
</constraints>

<output_format>
## Overview
Objectives for pre-class and in-class parts, and assumptions.
## Pre-class content
Video script with timings (or reading), including the worked example.
## Pre-class check
Numbered questions with answers, plus summary and question prompts.
## Access plan
Bullets.
## In-class lesson
Table: Minutes | Phase | Teacher | Students. Then the tiered tasks.
## Assessment and follow-up
Bullets.
</output_format>
