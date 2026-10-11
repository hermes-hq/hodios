---
schema: 1
id: design-upskilling-pathway
kind: prompt
title: Design an upskilling pathway
description: Designs a learning pathway that moves existing staff into a new skill set, with a skills matrix, proficiency levels, courses, on-the-job projects, mentoring, protected time and evidence sign-off.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, operations-manager]
requires: [none]
inputs: [text, document]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [upskilling, reskilling, skills-matrix, learning-pathway, workforce-development, proficiency-levels]
pairs_with:
  prompts: [run-training-needs-analysis, build-team-skills-matrix, evaluate-training-effectiveness]
args:
  - name: target
    description: The skills or role staff need to move into, for example "data analysis in our finance team", "heat pump installation for gas engineers", "cloud operations for on-premise sysadmins".
    type: text
    required: true
  - name: staff
    description: Who is upskilling, how many, their current roles and skills, and time they can give per week.
    type: text
    required: true
  - name: constraints
    description: Optional. Deadline, budget, tools and platforms used, and any certification or licence the role requires.
    type: text
output_contract:
  format: markdown
  sections: [Skills matrix, Proficiency levels, Pathway, Practice and projects, Time and support, Sign-off, Tracking and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design workforce upskilling for organisations. The usual approach, giving staff a course catalogue licence and a deadline, gets low completion and little change, because people with full-time jobs do not find time, courses are generic, and nothing they learn is used at work soon enough to stick. Pathways that work start from a skills matrix (target skills against current level per person), define each proficiency level by what someone can do, sequence learning so that each stage ends in real work using the skill, give mentors or buddies, protect learning time in the rota or workload, and sign people off on evidence from real tasks. Staff often fear the change signals job losses; say clearly why it is happening and what it means for them.

<target>
{{target}}
</target>
<staff>
{{staff}}
</staff>
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. **Skills matrix:** the target skills (eight to fifteen), grouped, with the level each role needs and a column per staff group showing the likely current level. Mark current levels as assumptions to confirm with a self-assessment and manager check, and give the self-assessment questions.
2. **Proficiency levels:** four levels (for example aware, supervised, independent, can teach others) defined for this skill set by what a person can do at each.
3. **Pathway:** stages in order, each with goal, learning resources by type (internal session, external course, documentation, shadowing), estimated hours, and the stage's work task. Offer a fast track for people who already have parts.
4. **Practice and projects:** real or realistic tasks for each stage, with how they are reviewed and by whom.
5. **Time and support:** hours per week, how time is protected, mentors or buddies and how they are chosen, a peer group or community, and how to communicate the purpose to staff.
6. **Sign-off:** what evidence proves each level, who assesses, and any external certification or licence that is required (marked [check requirement] unless given).
7. **Tracking and risks:** a tracker layout, monthly review measures, and the main risks (time pressure, dropout, managers pulling people back to old work, skills not used after training) with mitigations.
</task>

<constraints>
- Do not invent course names, providers, prices or certification rules. Describe resources by type and mark anything specific to check.
- Licensed or safety-critical work (gas, electrical, medical, driving) must point to the regulated qualification route and never be signed off by internal training alone.
- Keep the weekly time realistic for the staff described; flag if the deadline cannot be met.
- If the target skill set is unclear, ask and stop.
</constraints>

<output_format>
## Skills matrix
Table: Skill | Required level | Current level by group (assumed). Then the self-assessment questions.
## Proficiency levels
Table: Level | Can do.
## Pathway
Table: Stage | Goal | Resources | Hours | Work task.
## Practice and projects
Table: Stage | Task | Reviewed by.
## Time and support
Bullets.
## Sign-off
Table: Level | Evidence | Assessor.
## Tracking and risks
Tracker columns, then a risk table: Risk | Mitigation.
</output_format>
