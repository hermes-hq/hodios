---
schema: 1
id: scope-intern-project
kind: prompt
title: Scope a software intern project
description: Scopes a software intern's project for a fixed term with a real outcome, weekly milestones, mentor check-ins, a fallback scope, stretch goals and a final demo.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, software-engineer]
stack: []
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [internship, intern-project, intern-mentor, early-careers, project-scoping]
pairs_with:
  prompts: [pick-starter-tasks-for-new-engineer, plan-spike]
args:
  - name: idea
    description: The project idea or problem, the codebase or stack involved, and why it matters to the team.
    type: text
    required: true
  - name: intern
    description: What you know about the intern (year of study, languages, interests) and the mentor's available time.
    type: text
  - name: weeks
    description: Length of the internship in weeks.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Project in one paragraph, Is it a good intern project, Scope levels, Week by week, Mentoring, Risks and fallback, Final demo]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good intern projects are real (they matter to the team and could ship), separable (the intern can make progress without blocking on three teams or touching the most critical path), have a demonstrable result by the end, and fit in about two thirds of the term because the first weeks go to setup and learning and the last week to the handover and demo. Bad intern projects are throwaway prototypes nobody will use, vague research with no definition of done, or work on the riskiest production system with no safety net. Scoping in three levels (minimum that still has value, target, stretch) protects the intern from ending with nothing to show.
</context>

<task>
Idea: {{idea}}
{{#intern}}Intern and mentor: {{intern}}{{/intern}}
Length: {{weeks}} weeks.

1. Restate the project in one paragraph: the user or team it helps, the outcome, and how it will be used after the internship.
2. Check it against the criteria (real, separable, demonstrable, sized, safe) and say what to change if it fails any. If the idea is too big or too vague, propose a narrower version.
3. Scope levels: minimum (valuable even if everything goes wrong), target, stretch. Each with concrete deliverables and what "done" means (tested, reviewed, deployed or merged, documented).
4. Week by week: setup and first small merged change in week one, design review early, a mid-point check where scope is adjusted, a code freeze before the end, handover and demo in the last week.
5. Mentoring: check-in cadence, code review expectations, who to ask when the mentor is out, and the growth goals for the intern (one or two skills).
6. Risks and fallback: dependencies, access delays, the mid-point decision rule for falling back to the minimum scope.
7. Final demo: audience, what to show, and who owns the work afterwards.
</task>

<constraints>
- Do not assume skills the intern was not described as having; plan learning time.
- Keep the intern off unsupervised production-critical changes; reviews and safeguards are required.
- The project must have an owner after the internship ends; say who, or flag that it needs one.
{{> output/uncertainty}}
</constraints>

<output_format>
## Project in one paragraph
## Is it a good intern project
## Scope levels
Table: Level | Deliverables | Done means.
## Week by week
Table: Week | Goal | Checkpoint.
## Mentoring
## Risks and fallback
## Final demo
</output_format>
