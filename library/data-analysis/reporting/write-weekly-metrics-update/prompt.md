---
schema: 1
id: write-weekly-metrics-update
kind: prompt
title: Write a weekly metrics update
description: Writes a weekly business metrics update that explains movements against targets, the likely causes and the next actions. Use for the Monday update to leadership or the team channel.
category: reporting
version: 1.0.1
status: incubating
stage: [operate]
role: [data-analyst, operations-manager, product-manager, founder]
inputs: [dataset, notes]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [weekly-update, kpi, variance-analysis]
pairs_with:
  prompts: [define-metric, write-insight-report]
args:
  - name: metrics
    description: This week's numbers and at least the previous week's (more history is better), with metric names and units.
    type: text
    required: true
  - name: targets
    description: Targets or plan values for the week, month or quarter, if any.
    type: text
  - name: context
    description: What happened this week that could explain movements (launches, campaigns, outages, holidays, pricing or tracking changes).
    type: text
output_contract:
  format: markdown
  sections: [Summary, Scorecard, What moved and why, Actions, Data notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Status for metrics without a target."}
---
<context>
You write the weekly metrics update that a leadership team actually reads. It is short, it leads with what needs attention, and it separates signal from noise: a 3% wobble in a metric that moves 5% every week is not news, while a steady slide that has crossed a threshold is. Explanations are offered as likely causes with their evidence, never as certainties, and every flagged problem comes with an owner or a next step.
</context>

<task>
Write this week's update.

<metrics>
{{metrics}}
</metrics>

<targets>
{{targets}}
</targets>

<context_this_week>
{{context}}
</context_this_week>

1. For each metric compute: the value, change against last week (absolute and percent), change against the same week last year or a four-week average if available, and position against target (on track, at risk, off track) with the gap, or "no target" when none is given. For targets set for a month or quarter, compare progress to date with the expected pace rather than the full target.
2. Judge significance: use the metric's usual week-to-week variation when history allows (for example a change larger than the typical range of the last eight weeks). Call movements within normal variation "flat" and do not explain them.
3. For each meaningful movement, give the most likely cause, tying it to an item in the context or to a breakdown in the data, and say how confident you are. If nothing in the context explains it, say "cause unknown" and suggest the check that would find out.
4. Watch for artefacts: holidays, partial weeks, tracking or definition changes, and outages. Say when a movement is probably an artefact.
5. Propose actions only for metrics that are at risk or off track, or for unexplained moves.
6. Write the summary last: two or three sentences a reader can stop after.
</task>

<constraints>
- Use only the numbers provided and arithmetic on them; never invent a figure, a breakdown or a cause.
- Do not over-explain noise. At most one sentence for metrics that were flat and on track.
- Keep the whole update under about 250 words excluding the scorecard, so it reads in two minutes.
- Use consistent signs and units; mark percentage points (pp) vs percent (%) correctly.
- If there is no prior-period data, say that movements cannot be assessed and report levels only.
</constraints>

<output_format>
## Summary
Two or three sentences: overall status, the one thing that most needs attention, and the main action.

## Scorecard
A table: metric | this week | vs last week | vs target | status.

## What moved and why
Bullets for meaningful movements only: the movement, the likely cause and evidence, confidence.

## Actions
Numbered, each with an owner if known or "owner needed".

## Data notes
Artefacts, missing data or definition changes; "None" if clean.
</output_format>
