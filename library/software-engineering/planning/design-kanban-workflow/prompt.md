---
schema: 1
id: design-kanban-workflow
kind: prompt
title: Design a kanban workflow
description: Designs a kanban board for an engineering team from how work really flows, with columns and their exit rules, WIP limits, classes of service, flow metrics and a review routine.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, project-manager]
stack: []
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [kanban, wip-limits, flow-metrics, team-process, cycle-time]
pairs_with:
  prompts: [write-definition-of-done, plan-team-capacity, design-interrupt-rotation]
args:
  - name: team
    description: Team size and skills, the kinds of work it handles (features, bugs, support, ops) and their rough proportions.
    type: text
    required: true
  - name: current_flow
    description: How work moves today from request to production, where it waits, and the pains, for example "lots in review, nothing finishes".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Board, Column policies, WIP limits, Classes of service, Flow metrics, Operating routine, First month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Kanban works by limiting work in progress so that items finish instead of piling up half-done. Boards fail when columns copy job titles instead of the real states work passes through, when "waiting" states such as "ready for review" are hidden inside "in progress", when WIP limits are set so high they never bite, and when nobody looks at cycle time. Little's law ties the numbers together: average cycle time equals work in progress divided by throughput, so cutting WIP is the fastest way to shorten delivery. Expedite lanes and classes of service let urgent work through without blowing up the system, as long as they are rare and capped.
</context>

<task>
<team>
{{team}}
</team>
<current_flow>
{{current_flow}}
</current_flow>

1. Map the real states work passes through, separating active states from waiting states (for example "In review" versus "Ready for review"). Keep the board to the fewest columns that show where work waits.
2. Write an explicit exit rule for each column: what must be true to pull an item to the next one.
3. Set starting WIP limits from team size (a common start is about one item per person in active columns, plus a small limit on waiting columns), and explain what the team should do when a limit is hit: swarm, review, unblock, not start new work.
4. Define classes of service such as expedite, fixed date, standard and intangible (debt), each with a cap or share and a rule for who can use expedite.
5. Choose flow metrics: cycle time with the 85th percentile, throughput per week, WIP, and item age. Say how to read each and what pattern signals trouble.
6. Give the operating routine: a daily stand-up that walks the board right to left, a replenishment meeting, and a monthly flow review.
7. Plan the first month: what to measure before tightening limits and the experiments to try.
</task>

<constraints>
- Do not prescribe a tool; describe the board so it works in any tracker or on a wall.
- Do not import sprint ceremonies the team did not ask for.
- Keep expedite rare: cap it at one item at a time unless the input justifies more.
- If team size or work mix is missing, state the assumption you used.
</constraints>

<output_format>
## Board
Columns in order, marked active or waiting.
## Column policies
Table: column | exit rule.
## WIP limits
Table: column or group | limit | reason; plus what to do when a limit is hit.
## Classes of service
Table: class | when to use | cap | rule.
## Flow metrics
Table: metric | how to measure | warning sign.
## Operating routine
Bullets per meeting.
## First month
Numbered steps.
</output_format>
