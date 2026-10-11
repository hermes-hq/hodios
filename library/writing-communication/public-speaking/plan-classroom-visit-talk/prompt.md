---
schema: 1
id: plan-classroom-visit-talk
kind: prompt
title: Plan a talk to a class about your job
description: Plans a visit to a school class to talk about your job or expertise, such as a careers day, with a hands-on hook, age-right words, questions to expect and a timed plan.
category: public-speaking
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [education-sector]
requires: [none]
inputs: [topic, notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [careers-day, school-visit, parent-volunteer, stem-outreach, children]
pairs_with:
  prompts: [practise-explaining-work-simply, plan-school-assembly-talk]
args:
  - name: job
    description: Your job or the subject you are bringing, and what a normal day looks like, for example "nurse in an emergency department", "software developer at a bank", "beekeeper", "civil engineer on a bridge project".
    type: string
    required: true
  - name: class_info
    description: "Age or year group, class size, how long you have, what the teacher asked for (careers, a curriculum link, fun), and what you can bring (props, photos, equipment)."
    type: string
    required: true
  - name: minutes
    description: Time with the class.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Big idea, Plan, What to say, Hands-on activity, Questions to expect, Check with the teacher]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Visitors to a classroom usually overestimate how long children will listen and underestimate how much they want to touch, try and ask. Teachers who invite parents and professionals to careers days say the visits that work have a real object or tool in the first minute, a story of one actual day or problem rather than a job description, something every child does with their hands, and long time for questions, which are often the best part (and are often personal or funny: "How much do you earn?", "Have you seen someone die?", "Do you know my uncle?"). Older pupils want honest talk about the route into the job, including what did not go to plan, and they notice when a visitor oversells. Slides full of text lose all ages. Visitors also need to know school basics: the teacher stays in charge of behaviour, nothing that could be unsafe or frightening, no photos of pupils, and a careful line on sensitive parts of some jobs (medicine, police, the military).
</context>

<task>
Plan a {{minutes}}-minute class visit about: {{job}}. Class: {{class_info}}.

1. Write the big idea the children should leave with in one sentence at their level, for example "Engineers are people who test things until they are sure they are safe".
2. Plan the visit with timings: hook with a real object or picture (first two minutes); a story of one real day or problem from the job, using placeholders for the visitor's real example; hands-on activity; how you got the job (short, honest, adjusted to age); questions; close. Give at least a third of the time to activity and questions.
3. Write what to say for the hook, the story outline and the route into the job, in words suited to the age given.
4. Design one hands-on activity every child can do with simple materials that the visitor can bring or the school is likely to have; include how to set it up and how to finish it in time.
5. List questions this age group is likely to ask about this job, including awkward or personal ones, with a short honest answer approach for each.
6. List what to check with the teacher beforehand.
</task>

<constraints>
- Do not invent facts about the visitor's career; use `[your example: …]` placeholders for their real stories, numbers and route.
- Keep anything about danger, injury, death or crime age-appropriate and non-graphic; suggest the visitor agree the line with the teacher.
- Activities must be safe for the age group, with no sharp tools, heat, chemicals or allergens unless the teacher has approved them.
- No pupil photos, and no collecting personal details.
</constraints>

<output_format>
## Big idea
One sentence.
## Plan
Table: Time | Activity | What you need.
## What to say
Hook, story outline and route into the job.
## Hands-on activity
Materials, steps, timing.
## Questions to expect
Question and how to answer.
## Check with the teacher
Short checklist.
</output_format>
