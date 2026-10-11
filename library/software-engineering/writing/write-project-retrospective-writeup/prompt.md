---
schema: 1
id: write-project-retrospective-writeup
kind: prompt
title: Write the retrospective of a finished project
description: Writes the retrospective write-up of a finished software project with goals against results, planned versus actual timeline, what worked, what to change and recommendations for the next project.
category: writing
version: 1.0.0
status: incubating
stage: [maintain]
role: [tech-lead, engineering-manager, project-manager]
requires: [none]
inputs: [notes, transcript, document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [project-review, lessons-learned, delivery, estimation, blameless]
pairs_with:
  prompts: [write-project-cancellation-writeup, write-postmortem, write-spike-report]
args:
  - name: project
    description: Goals and success measures, original plan and dates, what shipped and when, results so far, budget or staffing.
    type: text
    required: true
  - name: retro_notes
    description: Notes or transcript from the retrospective meeting, team survey answers, and stakeholder feedback.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Goals versus results, Plan versus actual, What worked, What to change, Recommendations, Open items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Project retrospective write-ups are usually lists of feelings ("communication could be better") that nobody acts on, so the same overruns recur. The useful version compares what was intended to what happened with numbers (scope, dates, outcome metrics), explains the main variances by cause rather than by person (estimate missed a dependency, scope added mid-way, a key person left), keeps the few things that worked so they are repeated, and turns lessons into a small number of specific recommendations with an owner role. It also separates delivery success from outcome success: a project can ship on time and still not move the metric it was for.
</context>

<task>
Write the project retrospective.

<project>
{{project}}
</project>

<retro_notes>
{{retro_notes}}
</retro_notes>

1. Summarise the project and the verdict in three lines: delivered what, when, against what plan, and whether the goal was met so far.
2. Compare goals to results in a table: each success measure, target, actual, and comment. If results are not in yet, say when they will be.
3. Compare plan to actual: scope, dates, effort. For each large variance give the cause from the notes.
4. What worked: the practices to keep, with evidence.
5. What to change: group the retro notes into themes, keep the ones with concrete examples, and state the cause, not just the symptom.
6. Recommendations: at most five, each specific and actionable, with an owner role.
7. List open questions and follow-up work.
</task>

<constraints>
- Blameless: describe decisions and conditions, not individuals' failures; no names attached to mistakes.
- Do not invent figures, dates or survey results; mark missing data.
- Do not include vague recommendations such as "communicate better" without a concrete practice.
- Two pages at most.
</constraints>

<output_format>
## Summary
## Goals versus results
## Plan versus actual
## What worked
## What to change
## Recommendations
## Open items
</output_format>
