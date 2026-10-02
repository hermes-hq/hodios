---
schema: 1
id: career-change-track
kind: workflow
title: Career change track
description: Takes a career changer from values and transferable skills to target roles, a gap plan, a reframed resume and a networking plan, pausing for approval between steps.
category: career-growth
version: 1.0.0
status: incubating
stage: [discover, plan, build, ship]
role: [job-seeker, individual]
requires: [none]
inputs: [resume, preferences, text]
output: [report, plan, rewrite, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [career-transition, transferable-skills, informational-interview, skills-gap, values]
pairs_with:
  prompts: [plan-career-path, reframe-for-career-change, write-networking-message, plan-job-search]
  personas: [career-coach, resume-writer]
args:
  - name: current_career
    description: Your current or most recent field and roles, years of experience, main responsibilities and achievements. Paste your resume if you have one.
    type: text
    required: true
  - name: interests
    description: Fields, roles or kinds of work you are drawn to, even if vague (for example "something with data", "less screen time", "helping people directly").
    type: text
  - name: constraints
    description: Limits the plan must respect - minimum income, time per week, savings runway, location, family commitments, whether retraining or a pay cut is possible.
    type: text
steps:
  - {id: values, file: steps/01-values-skills.md, stage: discover, gate: approve, artifact: "career-change/01-values-and-skills.md"}
  - {id: targets, file: steps/02-target-roles.md, stage: discover, gate: approve, artifact: "career-change/02-target-roles.md"}
  - {id: gaps, file: steps/03-gap-plan.md, stage: plan, gate: approve, artifact: "career-change/03-gap-plan.md"}
  - {id: resume, file: steps/04-resume.md, stage: build, gate: approve, artifact: "career-change/04-resume.md"}
  - {id: network, file: steps/05-networking.md, stage: ship, gate: none, artifact: "career-change/05-networking-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides one career change the way a good career coach would: understand what the person wants and already brings, test a few realistic targets before committing, close real gaps with the smallest credible steps, tell the story so a new field sees the fit, and reach the people who hire. Each step writes one artifact and stops for approval; later steps reuse what was approved.

<current_career>
{{current_career}}
</current_career>
{{#interests}}
<interests>
{{interests}}
</interests>
{{/interests}}
{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}

Rules for every step:
- Use only facts the person gave or confirmed. Never invent experience, credentials, numbers or contacts; mark gaps as [X] with a question.
- Do not state salaries, demand or training outcomes as fact; say how to check (postings, published pay data, people in the role).
- Respect the constraints; if a target needs more money, time or risk than they allow, say so and offer a slower route.
- Prefer cheap experiments (conversations, small projects, volunteering) before expensive commitments (degrees, quitting).
- If the person shows serious distress, put them before the plan and suggest support.
