---
schema: 1
id: design-train-the-trainer
kind: prompt
title: Design a train-the-trainer programme
description: Designs a train-the-trainer programme for people who will deliver a set course, with content mastery, facilitation practice, teach-backs, observed sign-off, a trainer kit and quality checks.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [manager, teacher]
requires: [none]
inputs: [text, document]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [train-the-trainer, facilitation-skills, teach-back, trainer-certification, cascade-training, learning-and-development]
pairs_with:
  prompts: [write-instructor-guide, design-workshop, evaluate-training-effectiveness]
args:
  - name: course
    description: The course the new trainers will deliver - outline, length, audience, and any parts that must be delivered exactly (safety, compliance, licensed content).
    type: text
    required: true
  - name: trainers
    description: Who will become trainers (subject experts, supervisors, peer champions, teachers), how many, and their experience of teaching or presenting.
    type: text
    required: true
  - name: time
    description: Optional. Time available to prepare the trainers, for example "two days plus one observed delivery".
    type: string
output_contract:
  format: markdown
  sections: [Trainer profile, Programme outline, Content mastery, Facilitation practice, Teach-back and sign-off, Trainer kit, Quality and support]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design cascade training: preparing people to deliver a course others designed. Train-the-trainer programmes fail in predictable ways. Subject experts know the content but lecture, skip the practice and cannot handle questions from beginners; confident presenters deliver smoothly but drift from the content and drop the safety points; and once trained, nobody watches a session again, so quality decays with each cascade. A good programme builds two strands, content mastery (including the questions learners always ask and the misconceptions to expect) and facilitation (running activities, timing, managing a group, checking understanding), makes trainers practise by teaching back real segments of the course with structured feedback, signs off trainers on an observed delivery, separates the parts that must be delivered as written from parts they may adapt, and keeps quality up with observation, refreshers and a trainer community.

<course>
{{course}}
</course>
<trainers>
{{trainers}}
</trainers>
{{#time}}Time available: {{time}}{{/time}}
</context>

<task>
1. **Trainer profile:** what a trainer must know and be able to do, and a short self-assessment for candidates covering content and facilitation.
2. **Programme outline:** sessions in order with timings, fitting the time available, from experiencing the course as a learner, to understanding its design, to practice and sign-off.
3. **Content mastery:** for each course section, the key points, the likely learner questions with good answers to prepare, common misconceptions, and which parts must be delivered exactly as written.
4. **Facilitation practice:** the facilitation skills to practise (opening, giving instructions for activities, timing, asking questions, handling difficult participants, adapting for mixed levels) with a short practice exercise for each.
5. **Teach-back and sign-off:** how teach-backs run (segment length, peer and lead feedback using a checklist), the observation checklist used for sign-off, the standard to pass, and what happens if a trainer is not ready.
6. **Trainer kit:** what each trainer receives (facilitator guide, slides, timings, materials list, FAQ, evaluation forms, a delivery-day checklist).
7. **Quality and support:** observation of early deliveries, learner feedback and results to monitor, a refresher cadence, how content updates reach trainers, and a channel for trainer questions.
</task>

<constraints>
- Mandatory content (safety, legal, compliance, licensed material) is marked "deliver as written" and is checked in the sign-off.
- Do not add content to the course; the programme prepares trainers for the course as given and lists any gaps found for the course owner.
- Sign-off is based on observed delivery, not attendance.
- If the course or trainer group is unclear, ask and stop.
</constraints>

<output_format>
## Trainer profile
Bullets, then the self-assessment.
## Programme outline
Table: Session | Minutes | Purpose | Activity.
## Content mastery
Table: Section | Key points | Likely questions | Misconceptions | Deliver as written?
## Facilitation practice
Table: Skill | Practice exercise.
## Teach-back and sign-off
Process, then the observation checklist as checkboxes.
## Trainer kit
Checklist.
## Quality and support
Bullets.
</output_format>
