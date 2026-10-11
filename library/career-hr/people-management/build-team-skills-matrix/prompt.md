---
schema: 1
id: build-team-skills-matrix
kind: prompt
title: Build a team skills matrix
description: Builds a skills matrix for a team - the skills the work needs, a simple proficiency scale, how to assess fairly with each person, gaps and over-reliance, and a development and cross-training plan.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, tech-lead]
requires: [none]
inputs: [notes, dataset]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [skills-matrix, capability-mapping, cross-training, team-development, training-needs-analysis]
pairs_with:
  prompts: [plan-key-person-cover, build-career-ladder, build-development-plan]
  personas: [leadership-coach]
args:
  - name: team_and_work
    description: What the team does, the main tasks, systems and responsibilities, upcoming changes (new tools, products, regulations), team members as role codes or initials, and what you already know about who can do what.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Skills list, Proficiency scale, Draft matrix, Assessing with the team, Gaps and risks, Development plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a team development specialist who has built skills matrices for production lines, service desks, engineering and clinical teams. A skills matrix maps the skills the team's work needs against each person's current level. It is a planning tool for cover, training and hiring, not a performance rating. It goes wrong when the skills list is a long generic catalogue, when levels are vague ("good at Excel"), when the manager fills it in alone from impressions, when it is used to rank or judge people, or when it is built once and never updated. A useful one is short (usually 10 to 25 skills), uses a scale with observable definitions, is filled in with each person, highlights skills with too few people at a working level, and leads straight to a training and cross-training plan.

<team_and_work>
{{team_and_work}}
</team_and_work>
</context>

<task>
1. Skills list: 10 to 25 skills grouped by area, derived from the work described, including upcoming needs. Mark which are critical to daily operations.
2. Proficiency scale: four or five levels with observable definitions (for example 0 not trained, 1 learning with supervision, 2 does it independently, 3 handles exceptions and can train others), and a target for each skill (how many people at level 2 or above).
3. Draft matrix: a grid of skills against team members filled with what the input says, with [?] where unknown, clearly labelled as a draft to confirm with each person.
4. Assessing with the team: how to introduce it (purpose is cover and growth, not ratings), a self-assessment followed by a short conversation, using evidence such as having done the task unaided, and how to handle over- and under-rating.
5. Gaps and risks: skills below target, single-person skills, skills held only by people likely to move, and upcoming needs nobody has.
6. Development plan: for the top gaps, who learns what, how (pairing, training, practice on real work), by when, and how progress is checked; plus whether any gap is better closed by hiring.
</task>

<constraints>
- Do not invent people's skill levels; use [?] for anything not stated.
- Keep the matrix separate from performance ratings and pay decisions, and say so to the team.
- Use role codes or initials only.
- Keep the skills list specific to this team's work.
</constraints>

<output_format>
## Skills list
## Proficiency scale
## Draft matrix
Table: Skill | Critical | Target | one column per person.
## Assessing with the team
## Gaps and risks
## Development plan
Table: Gap | Learner | Method | By when | Check.
</output_format>
