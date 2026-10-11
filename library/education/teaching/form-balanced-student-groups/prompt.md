---
schema: 1
id: form-balanced-student-groups
kind: prompt
title: Form balanced student groups
description: Forms groups for collaborative work from class notes on attainment, skills, friendships and conflicts, with a role for each student and the reasoning behind every group.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [group-work, cooperative-learning, grouping-strategy, collaborative-tasks]
pairs_with:
  prompts: [plan-seating-chart, design-classroom-activity, design-pbl-project]
args:
  - name: task
    description: What the groups will do and for how long, e.g. "3-week research project", "one-lesson lab", "debate prep".
    type: string
    required: true
  - name: students
    description: Students by first name or initials with relevant notes (attainment band, strengths, who works well or badly together, language needs, absences). Only what grouping needs.
    type: text
    required: true
  - name: group_size
    description: Target group size.
    type: number
    default: 4
  - name: approach
    description: Grouping approach. mixed for heterogeneous groups, similar for groups by similar need or level, or let-model-choose.
    type: enum
    enum: [mixed, similar, let-model-choose]
    default: let-model-choose
output_contract:
  format: markdown
  sections: [Approach, Groups, Roles, Watch points, Check-in plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
How groups are formed should follow from the task. Mixed groups suit rich tasks that need different strengths, but extremes often fail: the strongest student does all the work and the weakest disengages, so many teachers avoid putting the top and bottom of the range in one group and mix within a band instead. Similar-level groups suit targeted practice. Friends can work well for short tasks and badly for long ones. Students who are isolated socially need at least one accepting peer in their group. Roles with real jobs (not "encourager") and individual accountability prevent free-riding. Groups of three or four are usually best; five or more invites passengers.
</context>

<task>
Form groups of about {{group_size}} for: **{{task}}**. Approach: {{approach}}.
<students>
{{students}}
</students>

1. Choose and justify the approach for this task (if let-model-choose), including how wide an attainment spread to allow in a group.
2. Apply hard constraints first (separations, language partners, access needs), then balance attainment, skills and social dynamics.
3. List the groups, with a two- or three-line rationale for each.
4. Assign task-specific roles that rotate if the task lasts more than one lesson, with a one-line job for each and an individual accountability piece (each student submits or presents something of their own).
5. Name watch points: groups at risk of one person dominating, an isolated student, a pairing that may clash, and what the teacher does if a group stalls.
6. Plan a short check-in: when to review groups and the signs that a change is needed.
</task>

<constraints>
- Every student appears in exactly one group; count and confirm. Make group sizes as even as possible and say how uneven numbers are handled.
- Use only identifiers and notes given; do not infer traits or add labels.
- Do not publish attainment bands in anything students see; keep rationales for the teacher only.
</constraints>

<output_format>
## Approach
Chosen approach and why.
## Groups
A table: Group | Students | Rationale. Then a count check.
## Roles
Role → job; accountability piece; rotation.
## Watch points
Bullets.
## Check-in plan
Bullets.
</output_format>
