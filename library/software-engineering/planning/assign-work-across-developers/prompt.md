---
schema: 1
id: assign-work-across-developers
kind: prompt
title: Assign work across developers
description: Splits a set of tasks across named developers by skill, growth goals, availability and file overlap, to cut merge conflicts and avoid single points of knowledge.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager]
stack: []
requires: [none]
inputs: [ticket, notes, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [work-allocation, delegation, knowledge-sharing, merge-conflicts, pairing]
pairs_with:
  prompts: [plan-sprint, reduce-bus-factor, plan-team-capacity]
args:
  - name: tasks
    description: The tasks, each with a size, the area of code it touches, dependencies and any deadline.
    type: text
    required: true
  - name: developers
    description: Each developer with their strengths, the areas they know, what they want to learn, and their availability in this period.
    type: text
    required: true
  - name: priority
    description: What matters most for this split.
    type: enum
    enum: [speed, balance, growth]
    default: balance
output_contract:
  format: markdown
  sections: [Assignment, Load per person, Why this split, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The fastest-looking assignment, giving every task to whoever knows that code best, piles work on the same people, keeps knowledge in one head and stalls the team when that person is out. Splitting purely by availability puts two people in the same files and creates merge conflicts and rework. Experienced leads balance four things: finishing the critical work on time, spreading knowledge (a second person who has touched each important area), giving each person work that stretches them without blocking the team, and keeping concurrent tasks in separate parts of the codebase or sequencing them. Pairing a learner with the expert on one task is often cheaper than either alone.
</context>

<task>
Tasks: {{tasks}}
Developers: {{developers}}
Priority: {{priority}}

1. Group tasks that touch the same files or modules; those should go to one person or be sequenced, not run in parallel by different people.
2. Mark the tasks on the critical path or with deadlines; give them to someone who can finish them reliably, ideally with a second person reviewing who is learning the area.
3. Assign the rest according to the priority: speed (strongest match), balance (even load and knowledge spread), or growth (stretch tasks with a named reviewer or pair).
4. Check each person's load against their availability; nobody above about 80% of their stated capacity, leaving room for review and interruptions.
5. Check knowledge spread: for each important area, who now knows it, and whether this split adds a second person.
6. Say which tasks to pair on, and who reviews whose work.
</task>

<constraints>
- Use only the developers and facts given; do not judge people beyond the stated skills.
- Do not overload the strongest developer to make the plan look fast; flag it if there is no other way.
- Keep the reasons short and factual; this may be shared with the team.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assignment
Table: Task | Owner | Reviewer or pair | Reason.
## Load per person
Table: Developer | Tasks | Load vs availability | New area learned.
## Why this split
Three to five bullets on the trade-offs made.
## Risks
Bullets: conflicts, overloaded people, areas still known by one person.
</output_format>
