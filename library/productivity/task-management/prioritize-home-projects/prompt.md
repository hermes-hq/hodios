---
schema: 1
id: prioritize-home-projects
kind: prompt
title: Prioritize home projects
description: Orders a list of home repairs and improvements by safety, damage risk, cost, season and dependencies into a realistic schedule, with what to do yourself, what needs a trade and what can wait.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [home-projects, house-repairs, sequencing, seasonal-timing, homeowner, renovation-order]
pairs_with:
  prompts: [plan-diy-project, budget-for-home-repairs]
  workflows: [home-renovation-track]
args:
  - name: projects
    description: Every repair or improvement on your list, with anything you know about each (rough cost, how bad it is, whether it is getting worse).
    type: text
    required: true
  - name: constraints
    description: Budget per year or month, DIY skill and free time, climate or region, whether you own or rent, and any plans to sell. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Do now, Priority order, Schedule, Dependencies, Questions to answer first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeowners decide what order to tackle a long list of house jobs. People tend to start with the visible, pleasant projects (a new kitchen, paint) while the dull ones cause the real cost: a small roof leak or failing gutter becomes rot and damp, a dripping pipe becomes a ceiling. The usual expert order is safety first (electrics, gas, structural cracks, trip hazards), then anything letting water in or getting worse, then the building envelope and systems (roof, windows, heating, insulation), then layout changes, and finishes last, because finishes get damaged by work done after them. Season matters: outside work and roofing in dry months, heating checks before winter. Bundling jobs that share a trade, scaffolding or a messy phase saves money.

Projects:
<projects>
{{projects}}
</projects>
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Flag anything that may be a safety hazard or causing ongoing damage, and put it in "Do now" with the reason and whether it needs a qualified professional.
2. Score every other project on urgency (getting worse or not), cost band (as given or "unknown, get quotes"), season fit, dependency on other jobs, and value to the user.
3. Order the projects: safety, water and damage, systems and envelope, layout, finishes, nice-to-haves. Within a tier, put cheap quick wins first.
4. Build a schedule by season or month within the budget and free time, bundling jobs that share a trade or disruption.
5. Show dependencies (for example "rewire before plastering", "fix roof before ceiling repair").
6. List questions to answer before committing money: inspections or quotes to get, permits or landlord permission to check.
</task>

<constraints>
- Do not invent costs; use the user's figures or mark "get quotes". Say that local prices vary widely.
- Electrical, gas, structural and roof work beyond simple tasks: say it needs a qualified professional and that local rules may require it; do not give instructions for it.
- Do not state permit or building-code rules for a place; say "check whether this needs permission where you live".
- If the user rents, separate landlord responsibilities from tenant jobs and say to check the lease.
- If the list is too vague to judge a hazard (for example "crack in wall"), ask for the detail that decides it and say what makes it urgent.
</constraints>

<output_format>
## Do now
Bullets: item, why, DIY or professional.

## Priority order
Table: Rank | Project | Tier | Urgency | Cost band | Season | Who.

## Schedule
By month or season, bullets, within budget.

## Dependencies
Bullets: A before B, because.

## Questions to answer first
Numbered list.
</output_format>
