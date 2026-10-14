---
schema: 1
id: plan-eye-tracking-study
kind: prompt
title: Plan an eye-tracking study
description: Plans a UX eye-tracking study only where gaze data answers the question, with areas of interest, tasks, calibration, sample size, metrics and honest limits on heatmaps.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [ux-researcher, designer]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [eye-tracking, gaze-data, areas-of-interest, visual-attention, heatmaps]
pairs_with:
  prompts: [write-usability-test-plan, plan-first-click-test, analyze-session-recordings]
  personas: [ux-researcher]
args:
  - name: question
    description: What the team wants to learn and why gaze would help, for example "do people notice the delivery fee before paying?".
    type: text
    required: true
  - name: setup
    description: Equipment available (screen-based tracker, glasses, webcam-based tool) and what is shown (website, app, packaging, shelf, signage). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is eye tracking the right method, Areas of interest, Tasks, Participants, Procedure and calibration, Metrics, Analysis and limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Eye tracking shows where people looked, not whether they understood or why. It earns its cost for questions about noticing (did they see the fee, the warning, the shelf label), reading patterns and visual search, especially combined with behaviour and a retrospective interview. It is overused for questions a usability test answers better. Common failures: heatmaps from a handful of people presented as truth, aggregating across different tasks, ignoring calibration quality and participants with glasses or certain eye conditions, concurrent think-aloud distorting gaze, and webcam trackers used for fine-grained questions they cannot resolve.
</context>

<task>
<question>
{{question}}
</question>
{{#setup}}

<setup>
{{setup}}
</setup>
{{/setup}}

1. Is eye tracking the right method: say whether gaze data answers the question better than a usability test, a first-click test or a five-second test, and recommend those instead if so.
2. Areas of interest: define them before data collection, sized with margins for tracker accuracy.
3. Tasks: scenario tasks that do not direct attention to the area of interest, free-viewing versus task-based, order counterbalanced.
4. Participants: numbers for heatmaps and quantitative comparisons (stable heatmaps are commonly said to need roughly 30 to 40 or more per condition) versus qualitative gaze replays (fewer), plus exclusion criteria for poor calibration.
5. Procedure and calibration: calibration and validation thresholds, recalibration, retrospective think-aloud with gaze replay rather than concurrent, lighting and posture.
6. Metrics: time to first fixation, fixation count and dwell on areas of interest, proportion who fixated at all, revisits, paired with task success.
7. Analysis and limits: per-task analysis, how heatmaps will be presented (with sample size and task), what the data cannot say (understanding, peripheral vision).
</task>

<constraints>
- Do not oversell; state when the question does not need eye tracking.
- Do not state device accuracy figures as facts; refer to the manufacturer's specification.
- Do not present heatmaps without the number of participants and task.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is eye tracking the right method
## Areas of interest
## Tasks
## Participants
## Procedure and calibration
## Metrics
| Metric | Area of interest | What it tells us |
## Analysis and limits
</output_format>
