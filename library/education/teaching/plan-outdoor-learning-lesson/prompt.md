---
schema: 1
id: plan-outdoor-learning-lesson
kind: prompt
title: Plan an outdoor learning lesson
description: Plans a curriculum lesson taught outdoors, with site setup, timed activities, behaviour and safety routines, a risk checklist, wet-weather plans and how learning is captured.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [outdoor-learning, forest-school, risk-assessment, outdoor-classroom, weather-plan]
pairs_with:
  prompts: [plan-field-trip, write-lesson-plan, differentiate-lesson]
args:
  - name: subject
    description: The subject, e.g. "maths", "science", "English", "art".
    type: string
    required: true
  - name: objective
    description: The curriculum objective for the lesson, e.g. "measure and compare lengths using standard units" or "identify and classify invertebrates using a key".
    type: string
    required: true
  - name: age_group
    description: Age or year group and class size if known, e.g. "Year 3, 28 pupils" or "ages 13-14".
    type: string
    required: true
  - name: site
    description: Where the lesson happens. school-grounds is the playground or field; park, woodland and city mean leaving school, which brings trip procedures into play.
    type: enum
    enum: [school-grounds, park, woodland, city]
    default: school-grounds
output_contract:
  format: markdown
  sections: [Objective and why outdoors, Site and setup, Lesson sequence, Behaviour and boundaries, Risk checklist, Weather plans, Capturing learning, Back in class]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Outdoor lessons work when the outdoors does something the classroom cannot: real measurements at full scale, living things in their habitat, materials to handle, space to move, a place to write about. They fail when they are a classroom lesson moved outside, when routines are invented on the spot, or when the weather wins. Teachers also need the safety side ready to show a leader: a simple risk checklist and clear boundaries.

Subject: {{subject}}. Objective: {{objective}}. Learners: {{age_group}}. Site: `{{site}}`.
</context>

<task>
Plan one outdoor lesson that meets the objective.

1. **Objective and why outdoors:** restate the objective as one or two success criteria pupils can show, and say in a sentence what the outdoor setting adds for this objective. If the objective would be taught just as well indoors, say so and suggest how to change the task so the outdoors earns its place.
2. **Site and setup:** what the site needs (space, features, shelter, toilets), a boundary plan, a base point, what to check on a walk-through beforehand, and equipment, including clipboards or alternatives that survive weather. For `park`, `woodland` or `city`, note that the school's off-site visit procedures, consent and ratios apply.
3. **Lesson sequence:** a timed plan covering moving out, a hook, teaching input, two or three active tasks in pairs or small groups with clear roles, regrouping signals, a plenary, and the return. Include how adults are deployed and what they ask pupils.
4. **Behaviour and boundaries:** routines taught before going out and rehearsed at the start: the gather signal, physical boundaries, buddy pairs, how to handle and return equipment, how to treat plants and animals, and what happens if someone needs the toilet or feels unwell.
5. **Risk checklist:** a table of the hazards that apply to this site and activity (trips and slips, weather and sun, plants, fungi and animals, allergies and stings, water, traffic and public, lost pupil, handwashing, tools if used), controls and who checks. State that it supplements, not replaces, the school's own risk assessment.
6. **Weather plans:** what changes in rain, wind, heat and cold, the point at which the lesson moves indoors, and a version of the activity that works under cover or inside.
7. **Capturing learning:** how pupils record (photos, sketches, data sheets, voice notes, natural materials collected where allowed), and how the teacher assesses against the success criteria during the lesson.
8. **Back in class:** a short follow-up that uses what was gathered.
</task>

<constraints>
- The objective drives the plan; the outdoors serves it.
- Include every pupil: plan access for wheelchair users and pupils with sensory, medical or behavioural needs on this site, and an option for pupils who are anxious about being outside.
- Keep active time high: avoid long talks outside, and keep groups small enough that no one waits idly.
- Do not invent facts about a specific site. Use placeholders such as [check: is the pond fenced?] for anything the teacher must confirm.
- Ratios, consent and first-aid requirements vary by school and country; present them as items to check against policy, not as rules.
- If the objective or age group is missing or unclear, ask before planning.
- Before finishing, check that each task produces evidence of the success criteria and that the risk table covers every activity in the sequence.
</constraints>

<output_format>
## Objective and why outdoors
Success criteria and one sentence on the outdoor advantage.
## Site and setup
Bullets, including the pre-check walk-through and equipment list.
## Lesson sequence
Table: Time | Phase | What pupils do | What adults do.
## Behaviour and boundaries
Bullets.
## Risk checklist
Table: Hazard | Controls | Who checks.
## Weather plans
Bullets per condition, and the move-indoors point.
## Capturing learning
Bullets.
## Back in class
A short follow-up activity.
</output_format>
