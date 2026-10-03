---
schema: 1
id: draft-school-improvement-plan
kind: prompt
title: Draft a school improvement plan
description: Drafts a school or department improvement plan from supplied data, with a few priorities, root causes, actions, owners, milestones, resources and how impact will be evaluated.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, manager, executive]
requires: [none]
inputs: [dataset, document, notes]
output: [plan, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [school-improvement, school-leadership, department-planning, data-informed, monitoring-and-evaluation]
pairs_with:
  prompts: [analyze-class-assessment-results, design-student-voice-survey, evaluate-training-effectiveness]
  personas: [instructional-coach]
args:
  - name: data
    description: The evidence available - attainment and progress results, attendance, behaviour, survey results, inspection or review findings, staffing - with group sizes where you have them.
    type: text
    required: true
  - name: priorities
    description: Optional priorities already set by leadership, the trust, district or authority.
    type: text
  - name: year
    description: Optional plan period, e.g. "2026-27 academic year".
    type: string
output_contract:
  format: markdown
  sections: [What the data says, Priorities, Action plan, Resources, Monitoring and evaluation, Risks, Data caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Improvement plans fail by doing too much: a dozen priorities, actions that are really activities ("hold a training day"), no owner, and success measured by whether the activity happened. Effective plans pick two or three priorities that the evidence supports, diagnose the cause before choosing an action, choose a few well-evidenced approaches, implement them deeply with staff development and time, and track leading indicators (changes in classroom practice, attendance at interventions) during the year as well as lagging outcomes (results) at the end. Data in schools is noisy: small groups swing wildly from year to year and one year's dip is not a trend.
</context>

<task>
Draft an improvement plan{{#year}} for {{year}}{{/year}}.

<data>
{{data}}
</data>

{{#priorities}}
<priorities>
{{priorities}}
</priorities>
{{/priorities}}

1. **What the data says:** summarise the 4 to 6 most important findings, each with the figure, the comparison (previous years, similar schools, national or district figures if supplied) and how confident you are given group size and trend. Mark which findings are reliable patterns and which may be noise.
2. **Priorities:** choose no more than three. If leadership priorities were given, keep them and check them against the data; say respectfully if the data points elsewhere. For each priority state the problem, the likely root causes (with what evidence would confirm each), and the intended outcome by the end of the period.
3. **Action plan:** for each priority, 3 to 5 actions that address a root cause, each with an owner (by role, not name unless given), a start date and milestones, the staff development needed, and the leading indicator that shows it is working. Prefer fewer actions done well; note well-evidenced approaches where relevant (for example explicit vocabulary instruction, structured feedback, attendance follow-up) without inventing statistics about their effect.
4. **Resources:** time, money, staffing and training needs, and what will stop or be reduced to make room.
5. **Monitoring and evaluation:** a schedule of checks (half-termly or quarterly) with leading and lagging indicators, the data source, who reviews it, and the decision rule if an indicator is off track.
6. **Risks:** the top risks to delivery (staff turnover, workload, competing initiatives) with mitigations.
7. **Data caveats:** what the data cannot tell you and what extra evidence to gather (lesson visits, student and staff voice, work scrutiny).
</task>

<constraints>
- Use only the data supplied. Do not invent figures, national averages or inspection judgements. If a comparison would help but is missing, name it under data caveats.
- Treat small groups with care: with fewer than about 10 students in a group, describe numbers, not percentages, and avoid conclusions.
- Owners are roles; never assign blame to individuals or name staff in a negative context.
- Keep the plan to what a school can realistically do in the period; flag workload implications.
- If the data is too thin to set priorities (for example, only one figure), say what else is needed and draft a provisional plan clearly marked as such.
</constraints>

<output_format>
## What the data says
Table: Finding | Figure and comparison | Confidence (pattern / possible noise).
## Priorities
A `###` per priority: problem, root causes with confirming evidence, intended outcome.
## Action plan
Per priority, a table: Action | Root cause addressed | Owner (role) | Start | Milestones | Staff development | Leading indicator.
## Resources
Bullets, including what stops.
## Monitoring and evaluation
Table: When | Indicator (leading or lagging) | Source | Reviewed by | If off track.
## Risks
Table: Risk | Mitigation.
## Data caveats
Bullets.
</output_format>
