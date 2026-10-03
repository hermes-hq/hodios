---
schema: 1
id: write-technical-roadmap
kind: prompt
title: Write a technical roadmap
description: Writes an engineering roadmap from goals and known tech debt, with themes, sequencing, dependencies, capacity assumptions and what is deliberately left out. Use for quarterly or half-year planning.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, architect, executive]
stack: []
requires: [none]
inputs: [notes, spec, text]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [engineering-roadmap, tech-debt, sequencing, capacity-planning, trade-offs]
pairs_with:
  personas: [staff-engineer]
  prompts: [write-tech-debt-proposal, break-down-epic, estimate-with-ranges, explain-tech-to-executives]
args:
  - name: goals
    description: Business and product goals for the period, with any dates or commitments already made to customers or leadership.
    type: text
    required: true
  - name: systems_and_debt
    description: The systems involved, known tech debt, reliability and security issues, upgrades with deadlines, and team size and other commitments (on-call, support).
    type: text
  - name: horizon
    description: Period the roadmap covers.
    type: enum
    enum: [quarter, half-year, year]
    default: half-year
output_contract:
  format: markdown
  sections: [Summary, Themes, Sequenced plan, Dependencies, Capacity assumptions, Not doing, Risks and decision points, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An engineering roadmap exists to make trade-offs visible: what the team will do, in what order, why that order, and what it will not do. Most roadmaps fail by listing every wish at full capacity, mixing outcomes with tasks, hiding tech debt in a separate list nobody funds, and ignoring that on-call, support and hiring eat a third of the time. A credible roadmap ties each item to a goal or a risk, sequences by dependency and learning value, plans to well under full capacity, and names the decision points where it will be revisited.
</context>

<task>
Write a {{horizon}} technical roadmap.
<goals>
{{goals}}
</goals>
{{#systems_and_debt}}
<systems_and_debt>
{{systems_and_debt}}
</systems_and_debt>
{{/systems_and_debt}}

1. If team size or current commitments are missing, state the capacity you assume and mark it as an assumption. If the goals are too vague to sequence against (no measurable outcome, no date), list what you need under Open questions and proceed with marked assumptions.
2. Turn the goals and the debt into 3 to 6 themes. Each theme states the outcome in measurable terms (for example "p95 checkout latency under 400 ms" or "deploy any service in under 15 minutes"), the goal or risk it serves, and the evidence for the risk.
3. Treat tech debt as first-class: include debt work inside the themes it unblocks, and include standalone debt only when it carries a concrete risk (end-of-life runtime, security exposure, incident history, a deadline).
4. Break each theme into initiatives sized in team-weeks as ranges (S: under 2, M: 2 to 6, L: 6 to 12; split anything larger). Sequence them with these rules: hard dependencies and external deadlines first, then work that removes the most risk or teaches the most early, then the rest. Keep at most two large initiatives in flight per team.
5. Compute capacity: people times weeks, minus on-call, support, holidays and interrupts (default 30% if not given), and plan to at most 80% of what remains. Show the arithmetic. If the plan does not fit, cut and move items to Not doing rather than compressing estimates.
6. Draw the sequence as a Mermaid Gantt chart by month or sprint, and name 2 to 4 decision points where the roadmap will be re-planned based on what is learned.
</task>

<constraints>
- Every initiative traces to a goal or a named risk. Remove anything that does not.
- Estimates are ranges, never single numbers, and are labelled as estimates.
- Do not invent team sizes, dates, metrics or incidents; use the input or mark assumptions.
- Write so a non-engineering leader can follow the Summary and Themes without the rest.
- Prefer outcomes over outputs in theme names ("Faster, safer deploys", not "Migrate to new CI").
</constraints>

<output_format>
## Summary
Five sentences at most: what the roadmap delivers, the biggest bet, the main thing not done, and the main risk.
## Themes
For each: name, outcome metric, goal or risk served, initiatives with size ranges.
## Sequenced plan
A table: period, initiative, theme, size, depends on, owner placeholder. Then a Mermaid `gantt` block.
## Dependencies
Bullets of cross-team, vendor and sequencing dependencies with the date each must be resolved by.
## Capacity assumptions
The arithmetic and the assumptions behind it.
## Not doing
Items deliberately left out and why, including requests that did not fit.
## Risks and decision points
A table of risks with mitigation, then the dated decision points.
## Open questions
Numbered, each with who should answer it.
</output_format>
