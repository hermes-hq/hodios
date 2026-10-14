---
schema: 1
id: triage-unfinished-projects
kind: prompt
title: Triage unfinished projects
description: Takes your pile of half-finished projects and decides finish, pause or abandon for each, sets a limit on how many run at once, and gives the active ones a next step and the rest a clean close.
category: task-management
version: 1.0.0
status: incubating
stage: [review]
role: [individual, writer, artist, software-engineer]
requires: [none]
inputs: [text, preferences]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [unfinished-projects, wip-limit, abandon, sunk-cost, focus, side-projects]
pairs_with:
  prompts: [prune-commitments, plan-personal-quarter, break-down-big-task]
args:
  - name: projects
    description: Every half-finished project you can think of - work, home, creative, learning - with roughly how far along each is and when you last touched it.
    type: text
    required: true
  - name: capacity
    description: Hours a week you can really give to projects outside your core job and duties. Optional.
    type: string
  - name: priorities
    description: What matters most to you this year. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdicts, Active now, Paused with restart conditions, Abandon cleanly, The limit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people deal with a pile of started-but-not-finished projects. Too many open projects split attention so finely that none of them finish, and each one adds a background hum of guilt. The tests experts use: would you start this today if it were not already started (sunk cost is not a reason); does it still serve something the person cares about; how much is really left, not how much is done; and is there an external reason or deadline. Most people can run two or three personal projects at once. Abandoning on purpose, with the useful parts saved, is a decision, not a failure; pausing only counts if it has a restart condition.

Projects:
<projects>
{{projects}}
</projects>
{{#capacity}}Capacity: {{capacity}}{{/capacity}}
{{#priorities}}Priorities: {{priorities}}{{/priorities}}
</context>

<task>
1. For each project, estimate the hours left (marked as estimate), note the reason it stalled if visible, and apply the tests: start it today, serves a priority, remaining effort, external reason.
2. Give a verdict: finish now, pause with a restart condition, shrink to a smaller finish, or abandon. Say why in one line.
3. Set a work-in-progress limit from the capacity (two or three unless capacity says otherwise) and pick the active projects, putting the closest-to-done high-value ones first.
4. For each active project, give the next physical step and a weekly time slot.
5. For each paused project, write the restart condition (a date or an event) and where its notes are parked.
6. For each abandoned project, list what to salvage (notes, materials, skills, parts to reuse or give away) and a closing action.
7. State the rule for adding a new project: one finishes or is dropped first.
</task>

<constraints>
- Do not keep more active projects than the limit; if the user insists on more, show what that does to finish dates.
- Do not judge the user's choices or interests; use their priorities, and ask if none are given.
- If a project involves other people or money (a promised gift, a paid course, a shared build), flag that abandoning it may need a message or a refund check.
- Hours left are estimates; say so.
</constraints>

<output_format>
## Verdicts
Table: Project | Hours left (est.) | Stalled because | Verdict | Why.

## Active now
Table: Project | Next step | Weekly slot.

## Paused with restart conditions
Bullets: project, restart condition, where notes live.

## Abandon cleanly
Bullets: project, salvage, closing action.

## The limit
WIP limit and the rule for new projects.
</output_format>
