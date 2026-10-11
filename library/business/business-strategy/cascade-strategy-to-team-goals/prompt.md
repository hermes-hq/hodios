---
schema: 1
id: cascade-strategy-to-team-goals
kind: prompt
title: Cascade strategy to team goals
description: Translates company strategy into each team's priorities and goals, then checks alignment, conflicts between teams, shared dependencies and missing owners.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, manager, operations-manager, founder]
requires: [none]
inputs: [text, document]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [goal-cascade, alignment, team-goals, cross-team-dependencies, strategy-execution]
pairs_with:
  prompts: [set-okrs, build-strategy-map, build-strategy-presentation, build-annual-operating-plan]
args:
  - name: strategy
    description: The company priorities or goals for the period, with any targets.
    type: text
    required: true
  - name: teams
    description: The teams or departments, their size and remit, and any goals they have already drafted. Paste drafts as they are.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Company priorities, Contribution matrix, Team goals, Conflicts and dependencies, Gaps and overload, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help leadership turn strategy into team goals. Cascading fails in familiar ways: every team copies the company goals word for word so nobody knows what they own; teams set goals for their own work that support no company priority; two teams have goals that pull against each other (sales chasing volume, operations cutting cost); a priority depends on a team that never agreed to it; or one team ends up with twelve goals. A good cascade asks each team what it uniquely contributes to each priority, keeps a few goals per team, makes shared goals explicit with one owner, and leaves room for essential business-as-usual work.
</context>

<task>
Cascade this strategy:

<strategy>
{{strategy}}
</strategy>

<teams>
{{teams}}
</teams>

1. Restate the company priorities as a numbered list with their targets. Flag any that are vague or unmeasurable.
2. Build a contribution matrix: priorities as rows, teams as columns, marking each cell as lead, contributes, or none, with a one-line description of the contribution.
3. Write 2 to 4 goals per team that express its specific contribution, each measurable with a target and date. Where a team has drafted goals, keep them if they fit, rewrite them if they are vague, and flag the ones that link to no priority.
4. List conflicts between teams' goals and suggest how to resolve each (shared metric, guardrail metric, sequencing, leadership decision).
5. List dependencies: where a team's goal needs another team's work, and whether that team has a matching goal.
6. Show gaps and overload: priorities with no lead team, teams with too many goals or no capacity for business-as-usual, and goals no priority needs.
7. Give next steps for agreeing the goals with team leads.
</task>

<constraints>
- Use the priorities and teams given; do not invent teams, targets or baselines. Leave unknown targets as [X].
- Every priority has exactly one lead team.
- No more than four goals per team.
- Do not copy company goals word for word into team goals.
</constraints>

<output_format>
## Company priorities
Numbered, with flags.

## Contribution matrix
Table: Priority | one column per team.

## Team goals
One subsection per team: goals with measure, target, date and the priority each serves.

## Conflicts and dependencies
Two tables: Conflict | Teams | Resolution; Dependency | From | To | Matching goal (yes/no).

## Gaps and overload
Bullets.

## Next steps
Numbered.
</output_format>
