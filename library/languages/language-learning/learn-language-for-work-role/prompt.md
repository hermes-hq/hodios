---
schema: 1
id: learn-language-for-work-role
kind: prompt
title: Build a job-specific language course
description: Builds a job-specific language course for roles such as nursing, hospitality or construction, with real workplace scenarios, key phrases, practice dialogues and safety-critical language.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [language-learner, teacher]
requires: [none]
inputs: [preferences, text]
output: [plan, conversation, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [workplace-language, language-for-specific-purposes, scenarios, vocational, migrant-workers]
pairs_with:
  prompts: [roleplay-real-situation, build-vocabulary-list, learn-survival-phrases]
  personas: [language-teacher, business-english-coach]
args:
  - name: target_language
    description: The language used at work, with the country (for example "German (Germany)", "English (Canada)").
    type: string
    required: true
  - name: job_role
    description: The job and setting, as specifically as possible (for example "care assistant in a nursing home", "line cook in a hotel kitchen", "scaffolder on building sites").
    type: string
    required: true
  - name: level
    description: The learner's current CEFR level in the target language.
    type: enum
    enum: [a1, a2, b1, b2]
    required: true
  - name: weeks
    description: Length of the course in weeks; one main scenario per week.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Needs, Course map, Week 1, How to practise, Checkpoints]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design language courses for specific purposes. Workers need the language of their actual shifts, not a general textbook: the handful of conversations they have every day, the forms they fill in, the instructions they must understand the first time, and the phrases that keep people safe. A course built from real workplace scenarios, at the learner's level, gets them functioning at work weeks earlier than a general course.

Language and country: {{target_language}}
Job: {{job_role}}
Level (CEFR): {{level}}
Course length: {{weeks}} weeks
</context>

<task>
1. Needs. If the job is too vague to choose scenarios (for example "healthcare" or "factory"), ask in one message: the exact role and workplace, who they speak with most (patients, guests, customers, colleagues, supervisors), what they must read or write (forms, notes, labels, rotas), and which situations worry them. Then stop. Otherwise, state the needs you assume in five lines and continue.
2. Course map. Choose {{weeks}} scenarios, ordered from most frequent and most urgent to less frequent, each one a real task in this job (for a care assistant: greeting and introducing yourself to a resident, helping with meals and asking about preferences, reporting a change in a resident's condition to the nurse, shift handover, talking to family members). For each week list the scenario, the communicative goal ("can report a fall clearly to the nurse"), 10 to 15 key phrases or chunks, the grammar that the phrases need (only as much as the level allows), and a reading or writing task from the job.
3. Week 1 in full:
   - Key phrases table with meaning and a pronunciation hint for hard words.
   - A short model dialogue for the scenario, at {{level}}, with realistic workplace speech (including the shortened or informal forms colleagues actually use).
   - Three practice tasks: a gap-fill on the key phrases, a "what do you say when..." task, and a role-play brief you can run with them now.
   - The job's reading or writing item for that week (a label, form, short note), with a model.
4. Safety-critical language: list the phrases this role must understand and produce reliably (warnings, emergencies, allergies, pain, refusal, "stop", reporting incidents), with the exact wording used in that country where it is standardised.
5. How to practise: a daily 15-minute routine and how to use real shifts as practice (collect three phrases a day you hear and did not know).
6. Checkpoints: a can-do checklist per week, then offer to run the Week 1 role-play now.
</task>

<constraints>
- Use the terms and conventions of that country's workplaces (for example the handover structure used in local hospitals, local units and form names), and say when you are unsure that a term is the local standard.
- In health, care and safety-critical jobs, add one line saying the course supports but does not replace employer training and protocols, and that professional registration may require a specific language exam.
- Keep the grammar load within the level; teach chunks first and analyse them later.
- Do not invent the learner's workplace details; use placeholders in [brackets].
</constraints>

<output_format>
## Needs
Assumptions or the questions.
## Course map
Table: Week | Scenario | Goal | Key phrases (examples) | Grammar | Read/write task.
## Week 1
### Key phrases, ### Dialogue, ### Practice, ### Read and write.
## Safety-critical language
Table: Situation | Phrase | Meaning.
## How to practise
## Checkpoints
Can-do list per week, then the offer.
</output_format>
