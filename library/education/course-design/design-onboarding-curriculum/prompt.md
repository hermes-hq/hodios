---
schema: 1
id: design-onboarding-curriculum
kind: prompt
title: Design a role-based onboarding curriculum
description: Designs a cohort onboarding curriculum for one role with week-by-week modules, practice tasks, sign-offs and a readiness check. Use when several new hires start together and must reach proficiency.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [manager, operations-manager, teacher, consultant]
requires: [none]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [new-hire-onboarding, corporate-training, time-to-proficiency, cohort-learning, sign-off]
pairs_with:
  prompts: [run-training-needs-analysis, design-branching-scenario, evaluate-training-effectiveness, plan-new-hire-onboarding]
  personas: [corporate-trainer, instructional-designer]
args:
  - name: role
    description: The job the cohort is being onboarded into, with level and setting, e.g. "Tier 1 customer support agent, SaaS, remote".
    type: string
    required: true
  - name: tools_and_processes
    description: "The systems, processes and tasks a new hire must handle, ideally with what they do with each and how often, e.g. 'ticketing tool - triage and reply to tickets, 40 a day'."
    type: text
    required: true
  - name: weeks
    description: Length of the structured onboarding in weeks.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Overview, Readiness definition, Week-by-week plan, Practice tasks, Sign-offs, Readiness check, Support and roles, Assumptions and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most onboarding fails the same way: the first week is a firehose of slides, policies and system tours, and new hires are then left to "learn on the job" with no clear picture of what good looks like. Strong onboarding works back from the tasks a proficient person does, sequences them from frequent and low-risk to rare and high-stakes, and moves each task through a progression: see it done, do it with support, do it alone, then do it under normal workload. A cohort adds peer practice and shared debriefs, which cut the load on managers and speed up learning. Readiness is shown by observed performance on real or realistic work, not by attendance or a quiz.
</context>

<task>
Design a {{weeks}}-week cohort onboarding curriculum for the role **{{role}}**.

<tools_and_processes>
{{tools_and_processes}}
</tools_and_processes>

1. **Check the input first.** If the tools and processes are only a list of names with no indication of what a new hire does with them, or the role's core outputs are unclear, ask up to 4 short questions (core tasks, volume, what errors cost, who supports the cohort) and stop. Otherwise proceed and record any assumption.
2. **Task analysis.** List the 8 to 15 tasks a proficient person in this role performs. Rate each for frequency (daily, weekly, rare), risk if done wrong (low, medium, high) and difficulty. Use this to decide order: frequent, low-risk tasks first; high-risk tasks only after supervised practice; rare tasks go to a job aid rather than heavy training.
3. **Readiness definition.** Write 4 to 6 observable statements of what a new hire can do, unaided, at the end of week {{weeks}}, including any quality or speed standard (e.g. "resolves a standard billing ticket within the SLA with no QA errors"). Mark which standards you assumed.
4. **Week-by-week plan.** For every week give the focus, the modules, the share of time spent on live cohort sessions, self-paced work and supervised real work, and the shift in responsibility (shadow → assisted → independent with review → independent). Week 1 must include real hands-on practice by day 2 or 3, not only orientation. Spread policy and compliance content across the weeks next to the tasks they govern.
5. **Practice tasks.** For each module, one practice task that mirrors the real job, with the setup (sandbox, sample data, shadowed live work), what "done well" looks like and who gives feedback.
6. **Sign-offs.** For each task rated medium or high risk, a sign-off: the evidence (observed, work sample, review of N real cases), the standard, who signs and what happens if the standard is not met (re-practice, extra shadowing, extended supervision) without shaming.
7. **Readiness check.** A final check at the end of week {{weeks}}: a realistic scenario or observed live work with a short checklist, plus the 30/60/90-day measures that show the onboarding worked (quality, volume, time to first independent task, early attrition).
8. **Support and roles.** Who does what: cohort facilitator, buddy, manager, subject-matter experts. Include a weekly cohort debrief, buddy check-ins and manager one-to-ones, with time each role must budget.
</task>

<constraints>
- Do not invent the organisation's policies, SLAs, legal requirements or system features. Where they matter, write a clearly marked placeholder such as [SLA: confirm with team lead].
- Keep the total weekly load realistic for a full-time new hire (no more than about 60% structured training by week 3; the rest is supervised real work).
- Prefer job aids and checklists over memorisation for rare or reference-heavy tasks, and say which job aids to build.
- Any safety-critical or regulated task must not be done unsupervised before its sign-off; say so in the plan.
- Avoid filler such as company history lectures beyond a short welcome; justify every module by a task in the analysis.
</constraints>

<output_format>
## Overview
Role, cohort, length, and a 3-sentence summary of the approach.
## Readiness definition
Numbered, observable statements.
## Week-by-week plan
Table: Week | Focus | Modules | Live / self-paced / real work (%) | Responsibility level. A short note per week below the table.
## Practice tasks
Table: Module | Practice task | Setup | Done well looks like | Feedback from.
## Sign-offs
Table: Task | Evidence | Standard | Signed by | If not yet met.
## Readiness check
The final scenario or observation, the checklist, and the 30/60/90-day measures.
## Support and roles
Bullets per role with time commitment.
## Assumptions and questions
What you assumed and what the team should confirm.
</output_format>
