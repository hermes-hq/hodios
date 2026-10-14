---
schema: 1
id: pick-starter-tasks-for-new-engineer
kind: prompt
title: Pick starter tasks for a new engineer
description: Picks a graded sequence of first tasks for an engineer joining a team, from a first-day merge to a real feature, chosen from your backlog to cover the codebase and the people they need.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [text, ticket, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [new-hire, ramp-up, starter-tasks, buddy-system]
pairs_with:
  prompts: [write-onboarding-guide, plan-team-capacity, reduce-bus-factor]
  personas: [engineering-manager]
args:
  - name: new_engineer
    description: Their experience level, the languages and areas they know, and the role they are joining for.
    type: text
    required: true
  - name: backlog
    description: Candidate tickets with a line each, and the main areas of the codebase.
    type: text
    required: true
  - name: weeks
    description: How many weeks the starter sequence should cover.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Principles for this hire, Task sequence, Coverage map, Support plan, Signals to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first tasks shape how fast a new engineer becomes productive and whether they feel trusted. The common mistakes are giving them only trivial typo fixes for weeks, dropping them on a critical-path feature in week one, or picking work that only touches one corner of the system. A good starter sequence gets a change merged and deployed on day one or two to prove the toolchain works, then grows in size and risk, deliberately visits the main areas of the codebase and the release process, and puts the new person in contact with the colleagues they will rely on. Tasks should have a clear done state and no hard deadline.
</context>

<task>
<new_engineer>
{{new_engineer}}
</new_engineer>
<backlog>
{{backlog}}
</backlog>
Sequence length: {{weeks}} weeks.

1. State three or four principles for this hire based on their experience (for example: a senior gets ownership of a small design decision by week three; a junior pairs on every task in week one).
2. Choose a sequence of five to eight tasks from the backlog for {{weeks}} weeks: a first-day or second-day change that goes all the way to production, then tasks of growing scope and risk, ending in a small feature they own. For each, say why it is in that position.
3. Map coverage: which codebase areas, systems (CI, deploy, monitoring, data) and people each task exposes them to, and point out any important area left uncovered.
4. Give a support plan: a buddy, pairing for the first tasks, review turnaround expectations, and check-ins.
5. List signals that the pace is wrong (too slow or too fast) and how to adjust.
</task>

<constraints>
- Choose tasks only from the backlog given; if suitable ones are missing, describe the kind of ticket to write and mark it as new.
- No task on the team's critical path or with an external deadline in the first two weeks.
- Avoid tasks that need access the person will not have yet, or flag the access to arrange.
- Do not make assumptions about the person beyond the information given.
</constraints>

<output_format>
## Principles for this hire
Bullets.
## Task sequence
Table: order | task | size | what it teaches | why here.
## Coverage map
Table: area or system | covered by task | gap.
## Support plan
Bullets.
## Signals to watch
Bullets with the adjustment.
</output_format>
