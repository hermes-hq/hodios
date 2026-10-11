---
schema: 1
id: build-training-slides
kind: prompt
title: Build slides for a training session
description: Builds slides for an internal training session with learning objectives, short explanation chunks, worked examples, practice moments, checks for understanding and a recap people can use.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, operations-manager, teacher, consultant]
requires: [none]
inputs: [topic, document, notes]
output: [outline, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [workplace-training, learning-objectives, practice-activities, facilitation, worked-examples]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, plan-lunch-and-learn-session, convert-slides-to-handout]
  personas: [presentation-designer]
args:
  - name: topic
    description: What people need to learn, for example "how to log a customer complaint in the new CRM" or "giving feedback to direct reports".
    type: text
    required: true
  - name: learners
    description: Who attends, how many, what they already know and why they are there (chose to, or were told to).
    type: text
    required: true
  - name: duration
    description: Session length and format, for example "90 minutes in a room" or "60 minutes on video call".
    type: string
    required: true
  - name: source_material
    description: Process documents, policies, existing slides or notes the training must follow. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Learning objectives, Session plan, Slide plan, Practice activities, Checks for understanding, Recap and job aid, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who know a subject turn it into a training session. The usual failure is a lecture deck: forty dense slides read aloud, no practice, and a quiz at the end that tests recall of terms rather than the skill. Adults learn a work skill when they see why it matters to them, see it done (a worked example), try it themselves with feedback, and leave with something to use on the job. Attention drops after about 10 to 15 minutes of listening, so explanation comes in short chunks, each followed by doing something. Objectives should be observable ("log a complaint with the right category"), not "understand the CRM". On video calls, practice needs clear instructions on a slide, a timer and a plan for breakout rooms or chat.

Topic: {{topic}}
Learners: {{learners}}
Duration and format: {{duration}}
{{#source_material}}
<source_material>
{{source_material}}
</source_material>
{{/source_material}}
</context>

<task>
1. Write two to four learning objectives as observable actions the learners can do by the end. If the topic is too big for {{duration}}, say what to cut or move to a second session.
2. Plan the session in blocks: opening (why this matters to them, a quick question to surface what they already know), then for each objective an explanation chunk of at most 10 to 15 minutes, a worked example, and a practice activity, then a recap and close. Give minutes per block that add up to {{duration}}, with a few minutes of slack.
3. Plan the slides. Keep explanation slides light (one idea, a diagram or screenshot placeholder, few words); put detail in speaker notes and the job aid. Give every practice activity its own instruction slide with the task, time, group size and what "done" looks like.
4. Design the practice activities from realistic work situations: scenarios, sorting tasks, spot-the-error, role-plays or hands-on steps in the real tool. Include the answers or what good looks like for the trainer.
5. Write checks for understanding during the session (not only at the end), such as a show-of-hands question, a quick scenario or a "what would you do" poll, each tied to an objective.
6. Draft a one-page job aid or recap: the steps, rules or checklist people will need on the job.
7. List what you need from the user: process details not in the source, screenshots, examples from their workplace.
</task>

<constraints>
- Base procedures, rules and policy on the source material only. Where the source is silent, write [check with process owner] rather than inventing steps.
- No slide should carry more than about 30 words of on-screen text except activity instructions.
- Practice must be at least a third of the session time unless the user says the session is information-only, in which case say what that will cost in skill transfer.
- Do not invent statistics about learning or retention to justify the design.
- Plan for the stated format; for online sessions include how practice works remotely.
</constraints>

<output_format>
## Learning objectives
Numbered, observable.

## Session plan
Table: Block | Minutes | What happens | Objective.

## Slide plan
Table: # | Slide title | On screen | Speaker notes summary.

## Practice activities
For each: instructions as shown on the slide, materials, time, answers or what good looks like.

## Checks for understanding
Bullets: the check, when, the objective it tests.

## Recap and job aid
The one-page reference.

## Open questions
What to confirm or supply before the session.
</output_format>
