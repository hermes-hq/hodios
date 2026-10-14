---
schema: 1
id: build-succession-plan
kind: prompt
title: Build a succession plan for critical roles
description: Builds a succession plan for an organisation's critical roles - which roles matter most, ready-now and ready-later successors, emergency cover, readiness gaps and development actions with owners.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, operations-manager, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [succession-planning, talent-pipeline, critical-roles, leadership-bench, talent-review]
pairs_with:
  prompts: [plan-key-person-cover, build-career-ladder, design-mentoring-program, run-career-conversation]
  personas: [hr-business-partner]
args:
  - name: roles
    description: The roles you are considering, with what each does, why it matters, the incumbent's likely time in role (retirement, flight risk, promotion) in general terms, and how hard it is to hire externally.
    type: text
    required: true
  - name: talent
    description: Possible internal candidates by code or role (not names), with current role, evidence of performance, skills and experience gaps, and their stated career interest if known.
    type: text
    required: true
  - name: context
    description: Strategy changes that will reshape these roles, budget for development, and whether external hiring is acceptable. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Critical roles, Successor map, Emergency cover, Gaps and development, Risks and fairness, Review cadence, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build succession plans the way an experienced talent management lead does. What experts know: not every senior role is critical - criticality comes from impact on the business combined with how hard the role is to fill, and some critical roles are specialists, not managers; successors should be assessed against what the role will need in future, not a copy of the incumbent; readiness is usually split into ready now, ready in one to two years and ready in three or more, and an honest plan often shows no ready-now successor; emergency cover (who steps in tomorrow) is different from a long-term successor; plans fail when candidates are chosen by similarity to leaders (which narrows diversity), when development actions have no owner or date, and when nobody asks candidates whether they want the role. Naming successors publicly can create entitlement or disappointment, so communication needs care.

<roles>
{{roles}}
</roles>

<talent>
{{talent}}
</talent>
{{#context}}
<context_details>
{{context}}
</context_details>
{{/context}}
</context>

<task>
1. Critical roles: score each role on business impact and difficulty to fill (high, medium, low) and on the likelihood of a vacancy, then rank. Say which roles are out of scope and why.
2. Successor map: for each critical role, the future requirements of the role, then candidates rated ready now, ready in one to two years or ready later, with the evidence for each rating and the main gap. Where there is no internal candidate, say so and give the external hiring option.
3. Emergency cover: an interim plan per role for an unplanned vacancy tomorrow, including who holds decisions and access.
4. Gaps and development: for each candidate, two or three development actions (stretch assignment, project, mentoring, training, exposure to the board or clients) with an owner and date, and the check that shows progress.
5. Risks and fairness: single points of failure, roles with only one candidate, candidates who appear on several lists, flight risk, and a check that the candidate pool is not drawn only from people similar to current leaders.
6. Review cadence: how often the plan is refreshed, who sees it, and how candidates are told (career conversations, not promises).
7. Questions for leadership.
</task>

<constraints>
- Use only the evidence given; do not rate readiness without evidence, and mark gaps as [X].
- Use codes or roles, not names, and do not record health, age, family plans or protected characteristics as factors.
- Do not promise roles to candidates in suggested communication.
{{> output/uncertainty}}
</constraints>

<output_format>
## Critical roles
Table: Role | Impact | Difficulty to fill | Vacancy likelihood | Priority.
## Successor map
Table per role: Candidate | Readiness | Evidence | Main gap.
## Emergency cover
## Gaps and development
Table: Candidate | Action | Owner | Date | Progress check.
## Risks and fairness
## Review cadence
## Questions
Numbered.
</output_format>
