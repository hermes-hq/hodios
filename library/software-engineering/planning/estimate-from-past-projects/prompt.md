---
schema: 1
id: estimate-from-past-projects
kind: prompt
title: Estimate from past projects
description: Estimates a new engineering project by reference class, comparing it with the team's finished projects and their real overruns, then adjusting for differences into a dated range.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, project-manager]
stack: []
requires: [none]
inputs: [text, notes, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: expert
depth: advanced
tags: [reference-class-forecasting, estimation, historical-data, planning-fallacy]
pairs_with:
  prompts: [estimate-with-ranges, forecast-roadmap-dates-with-ranges, run-pre-mortem]
args:
  - name: new_project
    description: The project to estimate - scope, team, tech, known risks and any bottom-up estimate already made.
    type: text
    required: true
  - name: past_projects
    description: Finished projects with their original estimate, actual duration, team size and what made them slip or go well.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Reference class, Historical overrun, Adjustments, Estimate, Cross-check, What would improve this]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bottom-up estimates are built from the inside view: the tasks we can see. They miss the work nobody foresaw, which is a main reason software projects overrun. Reference class forecasting takes the outside view first: how long did similar projects actually take, and by how much did they exceed their estimates? That distribution is the starting point; the new project is then adjusted only for differences that are real and specific. The method fails when the reference class is chosen to flatter the answer, when one-off disasters are dismissed as irrelevant, or when the sample is too small to mean much and nobody says so.
</context>

<task>
<new_project>
{{new_project}}
</new_project>
<past_projects>
{{past_projects}}
</past_projects>

1. Choose the reference class: which past projects are comparable in kind, size and team, and which are excluded and why. Say how many remain and how much weight that sample can bear.
2. Compute each comparable project's ratio of actual to estimated duration, then the median and the worst ratio. Show the arithmetic.
3. List the specific differences between the new project and the class (team experience, new technology, external dependencies, scope clarity) and the direction each pushes, keeping adjustments modest and explained.
4. Produce the estimate: take the inside-view estimate if there is one and apply the historical ratios, giving a likely and a pessimistic duration, and the confidence that goes with each.
5. Cross-check against the bottom-up estimate and explain any gap, rather than averaging it away.
6. Say what data to record from now on so the next estimate is better.
</task>

<constraints>
- Use only the historical numbers given; never invent industry averages or benchmark figures.
- If fewer than three comparable projects exist, say the estimate is weak and widen the range.
- Do not exclude a past project only because it went badly; exclude only for a real difference in kind.
- Give ranges, not single dates.
</constraints>

<output_format>
## Reference class
Included and excluded projects with reasons.
## Historical overrun
Table: project | estimated | actual | ratio; then median and worst.
## Adjustments
Table: difference | direction | size of effect | reason.
## Estimate
Likely and pessimistic durations with confidence.
## Cross-check
Two to four sentences.
## What would improve this
Bullets.
</output_format>
