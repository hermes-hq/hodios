---
schema: 1
id: design-pbl-project
kind: prompt
title: Design a project-based learning unit
description: Designs a project-based learning unit around a driving question, with weekly milestones, scaffolds, team roles, a public product and assessment checkpoints tied to standards.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher]
requires: [none]
inputs: [topic, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [project-based-learning, driving-question, inquiry, collaboration, authentic-assessment]
pairs_with:
  prompts: [design-unit-plan, create-rubric, align-lesson-to-standards]
  personas: [instructional-coach]
args:
  - name: topic_and_standards
    description: The topic and the standards or outcomes the project must teach and assess. Paste standard codes and text if you have them.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course, e.g. "Grade 7 science", "Year 5", "first-year engineering".
    type: string
    required: true
  - name: weeks
    description: Length of the project in weeks.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Project overview, Driving question, Public product and audience, Learning goals, Week-by-week plan, Scaffolds and mini-lessons, Teams and roles, Assessment checkpoints, Logistics and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Project-based learning fails in two predictable ways: the "dessert project", a poster or model made after the real teaching is over, and the unstructured project where students are busy for weeks and the standards never get taught. Strong PBL makes the project the vehicle for the learning: a driving question students cannot answer without the target knowledge and skills, sustained inquiry with explicit teaching as students need it, critique and revision cycles, student voice in how they work and what they produce, and a public product for a real audience. Individual accountability inside team work, and assessment checkpoints along the way, keep the learning visible and fair.
</context>

<task>
Design a {{weeks}}-week project for **{{grade_level}}**.

<topic_and_standards>
{{topic_and_standards}}
</topic_and_standards>

1. Write the driving question: open-ended, engaging for this age, rooted in a real problem or audience, and impossible to answer well without the standards. Offer two alternatives and say why you chose the first.
2. Define the public product and audience: what students make or do, who sees it (another class, families, a local organisation, an online audience), and how students get some choice in the format.
3. List the learning goals: the given standards as student-facing success criteria, plus 1 or 2 success skills (collaboration, presentation, critical thinking) that will actually be taught and assessed.
4. Plan week by week: the entry event that launches the project, inquiry and need-to-know questions, mini-lessons placed when students need them, work time, milestone deliverables, critique and revision points (for example gallery critique, peer feedback protocol), and the final presentation. Each week has one milestone students hand in.
5. Scaffolds and mini-lessons: the explicit teaching of content and skills, with when each happens and for whom (whole class, small group, optional workshop). Include supports for students who struggle with reading, organisation or group work, and extension routes.
6. Teams and roles: team size, how teams are formed, rotating roles with clear duties, a team contract outline, and how individual contributions are tracked so one student does not carry the team.
7. Assessment checkpoints: formative checks per week, individual assessments of the standards (not only the team product), the final product rubric outline, and self and peer assessment.
8. Logistics and risks: materials, technology, outside contacts to arrange in advance, permissions, and the three most likely ways the project could stall, with a plan for each.
</task>

<constraints>
- Every standard given is taught explicitly and assessed individually somewhere in the plan; if one cannot fit authentically, say so instead of forcing it.
- Keep the scope realistic for {{weeks}} weeks of ordinary lessons; flag anything that needs extra time or adults.
- Do not promise involvement from real organisations; describe the kind of partner and how to approach one.
- If the standards or topic are too broad for the time, propose a narrower focus and design for it.
- If no standards are given, infer age-appropriate goals from the topic, mark them "inferred" and suggest the teacher check them against their curriculum.
</constraints>

<output_format>
## Project overview
Title, grade, length, one-paragraph summary.
## Driving question
The question, two alternatives, why the first.
## Public product and audience
Product, audience, student choice.
## Learning goals
Standards as success criteria; success skills.
## Week-by-week plan
Table: Week | Focus | Mini-lessons | Student work | Milestone | Checkpoint.
## Scaffolds and mini-lessons
Bullets by need.
## Teams and roles
Team size and formation, roles table, contract outline, individual accountability.
## Assessment checkpoints
Formative, individual summative, product rubric outline, self and peer assessment.
## Logistics and risks
Materials and arrangements; risk → plan.
</output_format>
