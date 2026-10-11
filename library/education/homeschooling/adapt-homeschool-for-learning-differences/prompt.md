---
schema: 1
id: adapt-homeschool-for-learning-differences
kind: prompt
title: Adapt homeschool for learning differences
description: Adapts a homeschool plan for a child with dyslexia, ADHD, autism or another known difference, with methods, pacing, environment and accommodations to use at home, and when to seek specialists.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [notes, document]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
advice_risk: [medical]
tags: [dyslexia, adhd, autism, accommodations, neurodiversity]
pairs_with:
  prompts: [plan-reading-accommodations, evaluate-homeschool-curriculum]
  personas: [homeschool-mentor]
args:
  - name: child_profile
    description: "Child's age, strengths, interests, difficulties, and any diagnosis or suspected difference."
    type: text
    required: true
  - name: current_plan
    description: "What you use and do now, and what is hard."
    type: text
    required: true
  - name: reports
    description: "Optional: what assessments, therapists or doctors have said, in your own words."
    type: text
output_contract:
  format: markdown
  sections: [Profile, Methods by area, Everyday accommodations, Current resources, Building on strengths, Tracking progress, Who to involve]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling parents teach a child with a known or suspected learning difference, such as dyslexia, dyscalculia, dysgraphia, ADHD, autism, developmental language disorder, or processing difficulties. Home education can suit these children well because pace, environment and method can be changed for one child, but parents often copy school accommodations without the teaching methods behind them, or choose a curriculum that fights the child's profile. What works is well known in outline: structured, explicit, cumulative teaching for reading and maths difficulties; reducing writing load while building writing separately; short focused blocks, movement and clear routines for attention difficulties; predictability, low sensory load and interest-based entry points for many autistic children; and building on strengths, not only fixing weaknesses. Every child differs, and a professional assessment gives the most useful starting point.

Child: {{child_profile}}
Current plan and what is hard: {{current_plan}}
{{#reports}}What any assessments or professionals said: {{reports}}{{/reports}}
</context>

<task>
1. Summarise the child's profile as the parent describes it: strengths, difficulties, and what helps already. If there is no assessment, say what an assessment could add and who usually does it, without diagnosing.
2. For each area of difficulty, give teaching methods suited to it (for example structured phonics, concrete-pictorial-abstract maths, oral or typed output, chunked tasks) and how to pace them at home.
3. Give accommodations for everyday learning: how work is presented, how the child shows learning, breaks and movement, environment and sensory needs, routines and transitions.
4. Review the current curriculum or resources against the profile: keep, adapt or replace, with a reason.
5. Build on strengths: where the child's interests and strengths can carry learning.
6. Plan how to track progress over a term in a way that shows small gains.
7. List when and whom to involve: assessment, speech and language, occupational therapy, a doctor, specialist tutors, support groups.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose, and do not suggest medication or dosing; refer medical questions to a doctor.
- Do not promise a method will cure or fix a difference; describe what it is designed to do.
- Do not name specific commercial programmes as best; describe what to look for in one.
- Respect the child's dignity: no deficit-only language, and include the child's own preferences.
</constraints>

<output_format>
## Profile
## Methods by area
Table: Area | Methods | Pacing at home.
## Everyday accommodations
## Current resources
Table: Resource | Keep, adapt or replace | Why.
## Building on strengths
## Tracking progress
## Who to involve
</output_format>
