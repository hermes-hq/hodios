---
schema: 1
id: plan-project-milestones
kind: prompt
title: Plan project milestones
description: Turns a multi-month engineering project into four to eight milestones, each ending in something demoable or shippable with exit criteria, risks retired and a date range.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, project-manager]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [milestones, project-planning, risk-first, incremental-delivery]
pairs_with:
  prompts: [break-down-epic, find-critical-path, write-technical-roadmap]
args:
  - name: project
    description: The project goal, scope, known risks and unknowns, team, and any fixed dates.
    type: text
    required: true
  - name: duration
    description: Rough length of the project, for example "4 months".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Outcome, Milestones, Risks retired per milestone, Checkpoints, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Milestones are where a long project proves it is on track. Weak milestones are activity labels ("backend done", "design complete") that cannot be checked and hide integration until the end. Strong ones end in something a stakeholder can see or use, have exit criteria anyone can verify, and are ordered so the riskiest unknowns are tested early, when there is still time to change course. A thin end-to-end version early beats perfect components joined late. The spacing matters too: milestones two to four weeks apart give real signals, while one per quarter hides a slip until it is too late.
</context>

<task>
<project>
{{project}}
</project>
Duration: {{duration}}.

1. State the outcome the project must achieve and how it will be measured at the end.
2. Plan four to eight milestones, two to four weeks apart. Each one: a name that describes the result, what can be demoed or shipped, exit criteria that can be checked, and a date range.
3. Order them risk first: the earliest milestone should build a thin end-to-end path through the riskiest parts, and later milestones widen and harden it.
4. For each milestone, name the risk or unknown it retires and what the team will do if the result is bad.
5. Define checkpoints: who reviews each milestone, and the decision taken there (continue, adjust scope, stop).
6. List the assumptions the plan rests on, including team size and dependencies, and which ones would most move the dates.
</task>

<constraints>
- No milestone may be named after a layer or activity alone; each must end in something verifiable.
- Give date ranges, not single dates, and keep them inside the stated duration or say they do not fit.
- Do not add scope the input does not mention; list it as a question if it seems missing.
</constraints>

<output_format>
## Outcome
One or two sentences and the measure.
## Milestones
Table: milestone | demo or ship | exit criteria | date range.
## Risks retired per milestone
Table: milestone | risk retired | plan if the result is bad.
## Checkpoints
Bullets.
## Assumptions
Bullets, marking the ones that move dates most.
</output_format>
