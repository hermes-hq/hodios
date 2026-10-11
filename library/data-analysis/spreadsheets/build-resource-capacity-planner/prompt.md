---
schema: 1
id: build-resource-capacity-planner
kind: prompt
title: Build a resource capacity planner
description: Builds a spreadsheet that allocates people to projects week by week, showing hours booked against each person's real capacity, overloads, free time and unstaffed project demand.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [project-manager, operations-manager, manager, consultant]
stack: [excel, google-sheets]
requires: [none]
inputs: [text]
output: [table, code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [resource-planning, team-capacity, utilisation, workload-heatmap, project-allocation]
pairs_with:
  prompts: [build-gantt-chart-in-sheets, build-leave-tracker-spreadsheet, write-conditional-formatting-rules]
  personas: [spreadsheet-expert]
args:
  - name: team
    description: The people (or roles), their contracted hours per week, part-time patterns, typical non-project time (admin, support rota, meetings), and known leave.
    type: text
    required: true
  - name: projects
    description: The projects or clients, their start and end dates, and the estimated hours or people needed per week or in total, by role if relevant.
    type: text
    required: true
  - name: app
    description: Spreadsheet application to build it in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Assumptions, Workbook layout, Formulas, Heatmap and checks, How to use it weekly, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build capacity planners that managers actually keep up to date. Most fail for predictable reasons: capacity is set to contracted hours, so everyone looks free when in reality 20 to 30% of time goes on meetings, admin, support and leave; allocations are typed into a big grid of weeks with no link to project totals, so nobody sees when a project is under- or over-staffed; dates are entered inconsistently so weekly sums break; and the sheet is so detailed that it is abandoned after a month. A sound design separates input tables (people and their capacity, projects and their demand, allocations as a long table of person, project, week and hours) from calculated views (a person by week grid of booked hours against available hours, a project by week grid of planned against needed hours), uses week-commencing dates as the key, and colours overloads and free capacity so problems jump out. Planning in hours or in percentage of a week both work; mixing them does not.

<team>
{{team}}
</team>

<projects>
{{projects}}
</projects>
</context>

<task>
Build the planner in {{app}}.

1. State assumptions: planning unit (hours per week), the planning horizon, how available capacity is calculated (contracted hours minus a non-project allowance minus leave), and any gaps in the input to confirm.
2. Lay out the workbook: a Settings sheet (horizon start, week list, default non-project percentage); a People table (name, role, contracted hours, non-project percentage, start and end dates); a Leave table (person, week, hours off); a Projects table (project, role, start week, end week, hours needed per week); an Allocations table in long format (person, project, week commencing, hours); and two calculated grids: Person by week and Project by week.
3. Give the exact formulas: week-commencing date from any date; available hours per person per week; booked hours per person per week with `SUMIFS` over Allocations; utilisation percentage; remaining capacity; needed versus planned hours per project per week; and totals per role. Use structured references or named ranges, and make formulas fill across weeks and down people without editing.
4. Add checks and visuals: conditional formatting for the person grid (over 100% red, 85 to 100% amber, under 60% highlighted as spare), project gaps where planned is below needed, allocations to a person outside their start and end dates, and allocations in weeks with full leave. Add a summary block showing the most overloaded people and the most understaffed projects for the next four weeks.
5. Explain the weekly routine: update leave, adjust allocations, review the heatmap, and roll the horizon forward.
6. State the limits of a spreadsheet planner (concurrent editing, scale beyond about 50 people, skills matching) and when dedicated tools make sense.
</task>

<constraints>
- Use only the people, hours and projects given; use clearly marked sample rows where the input is incomplete.
- Every number in a formula comes from a named cell or table, not a hard-coded constant.
- Formulas must work in the chosen app; note any function that differs between Excel and Google Sheets.
- Keep person-level data minimal; do not add performance or personal information.
</constraints>

<output_format>
## Assumptions
## Workbook layout
Table: Sheet | Columns | Purpose.
## Formulas
Each with the cell it goes in and a one-line explanation, in code blocks.
## Heatmap and checks
## How to use it weekly
## Limits
</output_format>
