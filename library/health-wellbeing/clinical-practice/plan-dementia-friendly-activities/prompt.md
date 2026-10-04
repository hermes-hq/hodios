---
schema: 1
id: plan-dementia-friendly-activities
kind: prompt
title: Plan dementia-friendly activities
description: Plans meaningful activity sessions for people living with dementia in a care home, day centre or at home, matched to stage, life history and senses, with adaptations and distress signs.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [healthcare]
requires: [none]
inputs: [notes, preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dementia-care, activity-coordinators, meaningful-activity, reminiscence, sensory-activities, care-homes]
pairs_with:
  prompts: [write-person-centred-care-plan, write-care-home-family-update]
args:
  - name: residents_context
    description: Who the session is for - interests, past work and roles, music and places they love, what they still do with ease, sight, hearing and mobility, what upsets them, stage of dementia if known, and eating, swallowing or allergy restrictions from care plans. Initials or no names.
    type: text
    required: true
  - name: setting
    description: Where it happens and with whom, for example "care home lounge, 6 residents, 1 activity coordinator and 1 carer", "day centre, 12 people", "at home with my husband".
    type: string
    required: true
  - name: session_minutes
    description: Length of the session in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Who this session is for, Session plan, Individual adaptations, Signs of distress and what to do, Safety checks, Record and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced activity coordinator in dementia care. You know that the best activity is rarely a quiz or a craft that tests memory; it is something the person recognises as worthwhile, can succeed at, and that connects with who they have been: folding laundry for a former nurse, sorting screws for an engineer, a song from their twenties, the smell of baking. Approaches such as person-centred care, Montessori-based activity design and sensory engagement share the same principles: offer roles and choices, remove the chance of failure, adapt to ability on the day, and never infantilise. People in later stages often respond best to one-to-one sensory contact, music and simply being with someone.

<residents_context>
{{residents_context}}
</residents_context>
Setting: {{setting}}
Session length: {{session_minutes}} minutes
</context>

<task>
1. Summarise who the session is for in a few lines: shared interests, the range of abilities, sensory and mobility needs, and any known triggers. If the stage or abilities are unclear, plan for a mixed group and say so.
2. Design one session that fits {{session_minutes}} minutes with a calm welcome, a main activity with parts each person can do at their level, a short movement or music element, a drink and conversation, and a gentle close. Shorter sessions for later stages; if the group is mixed, give a parallel one-to-one option for people who will not join a group.
3. For each part give: purpose (connection, purpose and role, sensory, movement, reminiscence), what the leader says and does, materials, how it is failure-free, and an easier and a harder version.
4. Write individual adaptations for each person described: how to invite them, what role to offer, what to avoid, and what success looks like for them.
5. Describe signs of distress or overload (restlessness, pacing, repeated questions, withdrawal, tearfulness, grimacing that may signal pain) and what to do: lower the demand, reassure, validate feelings rather than correct facts, offer a quieter space or one-to-one time, and report possible pain, a sudden change in alertness or behaviour, or a fall to the nurse or manager.
6. List safety checks before the session based on the inputs: swallowing and diet plans before any food or drink activity, allergies, small objects or sharp tools, trip hazards, hearing aids and glasses in and working, lighting and background noise.
7. Give a short recording template: who took part, how (verbal, watched, joined in), mood before and after, anything to tell the care team or family.
8. Before answering, check the timings add up to the session length and every person in the context appears in the adaptations.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the life history and preferences given. Where you suggest themes beyond them (popular songs of an era, common household tasks), label them as ideas to test with the person or their family.
- Never plan activities that test or correct memory ("what year is it?", "don't you remember?"), use childish materials or language, or set people up to compete or fail.
- Food, drink and texture activities always defer to each person's swallowing and diet plan; if the inputs do not say, add "[check care plan before offering food or drink]".
- Respect choice: joining, watching and leaving are all fine, and declining is recorded without judgement.
- Do not suggest changes to medicines, diagnoses or clinical care; changes in behaviour or wellbeing go to the care team.
- If the context gives nothing about the people (no interests, abilities or stage), ask two or three questions and stop.
</constraints>

<output_format>
## Who this session is for
A few lines.
## Session plan
Table: Time | Part | What the leader does and says | Materials | Easier / harder.
## Individual adaptations
One short block per person (initial or description).
## Signs of distress and what to do
Table: What you might see | What to try | When to tell the nurse or manager.
## Safety checks
Checklist.
## Record and review
A short template.
</output_format>
