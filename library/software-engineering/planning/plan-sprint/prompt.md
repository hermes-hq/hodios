---
schema: 1
id: plan-sprint
kind: prompt
title: Plan a sprint
description: Builds a sprint plan from a backlog and real capacity, with a sprint goal, committed and stretch items, dependencies, risks and what it deliberately leaves out. Use before sprint planning.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, project-manager, product-manager]
requires: [none]
inputs: [ticket, text, notes]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [scrum, sprint-planning, capacity-planning, sprint-goal, agile]
pairs_with:
  prompts: [refine-backlog-ticket, break-down-epic, estimate-with-ranges]
args:
  - name: backlog
    description: The prioritised backlog items under consideration, with estimates, owners or skills needed, and dependencies if known.
    type: text
    required: true
  - name: capacity
    description: Who is available and for how many days, known absences, on-call or support rotations, meetings, and recent velocity or throughput if you track it.
    type: text
    required: true
  - name: sprint_length
    description: Length of the sprint.
    type: string
    default: 2 weeks
  - name: carry_over
    description: Unfinished work from the last sprint and how much of it remains.
    type: text
output_contract:
  format: markdown
  sections: [Sprint goal, Capacity, Committed, Stretch, Not this sprint, Dependencies and risks, Questions for planning]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sprints fail in planning more often than in execution: the team commits to the sum of everyone's nominal hours, forgets on-call and holidays, ignores carry-over, picks unrelated items with no goal tying them together, and discovers on day six that an item depended on another team. A good plan starts from realistic capacity, picks a single goal worth achieving, commits to less than the maximum, and says out loud what it is not doing.
</context>

<task>
Draft a {{sprint_length}} sprint plan from the backlog and capacity below, ready for the team to challenge in planning.

<backlog>
{{backlog}}
</backlog>

<capacity>
{{capacity}}
</capacity>

{{#carry_over}}
<carry_over>
{{carry_over}}
</carry_over>
{{/carry_over}}

1. Compute realistic capacity. Start from the people and days available, subtract absences, on-call or support rotations and recurring meetings, then apply a focus factor (if no history is given, assume 60 to 70% of remaining time is available for sprint work and say so). If velocity or throughput history is given, cross-check against the average of the last three sprints and use the lower number. Show the arithmetic.
2. Account for carry-over first: re-estimate what remains, and decide with a reason whether each item continues, is split or goes back to the backlog.
3. Propose one sprint goal: a single outcome, written as what users or the business will have by the end, that most committed items serve. If the backlog has no coherent goal, say so and propose the best candidate.
4. Select committed items in priority order up to about 80% of realistic capacity. Prefer finishing over starting, and items that serve the goal. Flag items that are not ready (no acceptance criteria, unresolved questions, missing designs, estimates too large for one sprint) and either propose a split or move them out.
5. Pick stretch items that fill the remaining capacity, labelled clearly as not committed.
6. Check the plan against people, not only points: no one is overloaded, specialist skills are not a bottleneck, and work that needs reviews, QA or another team has time for it.
7. List dependencies (other teams, vendors, environments, decisions) with what is needed and by which day, and the main risks with a mitigation each.
8. List what is deliberately left out and why, so stakeholders hear it before the sprint, not after.
</task>

<constraints>
- Use the backlog's own estimates and units. Do not re-estimate items unless asked, but flag estimates that look inconsistent.
- Do not change the backlog's priority order silently. If the plan skips a higher-priority item, give the reason.
- Do not invent team members, dates, velocities or dependencies. Mark assumptions.
- The plan is a proposal for the team to decide on, not a commitment made for them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Sprint goal
One sentence, then one line on why this goal.
## Capacity
Table: person or role, days available, deductions, sprint capacity. Then total capacity and the focus factor used.
## Committed
Table: item, estimate, owner or skill, serves goal (yes or no), ready (yes or what is missing). Total against capacity.
## Stretch
Same table, labelled as not committed.
## Not this sprint
Bullets: item and reason.
## Dependencies and risks
Table: dependency or risk, needed by, owner, mitigation.
## Questions for planning
Numbered questions the team must answer in the planning meeting.
</output_format>
