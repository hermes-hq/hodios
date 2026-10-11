---
schema: 1
id: consolidate-team-roadmaps
kind: prompt
title: Consolidate team roadmaps
description: Combines several teams' roadmaps into one portfolio view, linking items to shared goals and exposing duplicates, conflicts, gaps and overloaded dependencies for leadership to decide.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, review]
role: [product-manager, executive, engineering-manager, project-manager]
requires: [none]
inputs: [document, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [portfolio-view, multi-team-planning, duplicate-work, goal-alignment, conflicts, program-roadmap]
pairs_with:
  prompts: [map-cross-team-dependencies, run-quarterly-planning, critique-roadmap, brief-board-on-roadmap]
  personas: [technical-program-manager]
args:
  - name: team_roadmaps
    description: Each team's roadmap in whatever form it exists, labelled by team, with horizons or dates and owners where known.
    type: text
    required: true
  - name: company_goals
    description: The company or product-line goals for the period that the roadmaps should serve.
    type: text
    required: true
  - name: horizon
    description: Optional. The period the combined view should cover.
    type: text
output_contract:
  format: markdown
  sections: [Normalised portfolio, Coverage of goals, Duplicates and overlaps, Conflicts, Dependency hot spots, Decisions for leadership, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn several team roadmaps into one view a leadership group can decide from. Each team plans in its own format and language, so the problems only show when they are put side by side: two teams building similar things under different names, goals with no work behind them, work with no goal, one platform team that every other plan depends on in the same month, and items that contradict each other (one team deprecating what another is extending). The job is not to rewrite the teams' plans; it is to make these problems visible and turn them into a short list of decisions, each with an owner.

{{#horizon}}Horizon: {{horizon}}{{/horizon}}
</context>

<task>
<team_roadmaps>
{{team_roadmaps}}
</team_roadmaps>

<company_goals>
{{company_goals}}
</company_goals>

1. Normalise: one row per item with team, item in plain words, goal it serves (or "none stated"), horizon or date, status, size if given, and dependencies on other teams. Give each item a short id.
2. Coverage of goals: for each goal, the items serving it and a rough share of total planned work. Flag goals with little or no work and work tied to no goal.
3. Duplicates and overlaps: items in different teams that solve the same problem or build similar capabilities, quoting both, with a note on whether merging or a clear split is better.
4. Conflicts: items that contradict each other, compete for the same users' attention in the same window, or assume different decisions.
5. Dependency hot spots: teams or systems that many items depend on in the same period, with a rough count and the window.
6. Decisions for leadership: three to seven decisions, each with options, the trade-off and a suggested owner. Do not make the decisions.
</task>

<constraints>
- Use only what the roadmaps state. When it is unclear whether two items overlap, say so and list it as a question, not a finding.
- Do not rank teams or judge their quality; focus on the combined portfolio.
- Keep each team's wording traceable: every normalised item keeps its team and id.
- If fewer than two roadmaps or no goals are given, ask for them and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Normalised portfolio
Table: id | team | item | goal | horizon | status | depends on.

## Coverage of goals
Table: goal | items | rough share | gap note.

## Duplicates and overlaps
Bullets quoting both items.

## Conflicts
Bullets.

## Dependency hot spots
Table: team or system | items depending on it | window.

## Decisions for leadership
Numbered decisions with options, trade-off, suggested owner.

## Questions
What to confirm.
</output_format>
