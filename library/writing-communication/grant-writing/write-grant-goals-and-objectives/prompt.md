---
schema: 1
id: write-grant-goals-and-objectives
kind: prompt
title: Write grant goals and objectives
description: Writes a grant's goals and SMART objectives section, linking each objective to activities, measures and targets and to the funder's priorities, and separating outcomes from outputs.
category: grant-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [writer, manager, founder, researcher]
subject: [nonprofit]
requires: [none]
inputs: [text, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [smart-objectives, outcomes, outputs, indicators, logic-model]
pairs_with:
  prompts: [write-grant-evaluation-plan, write-needs-statement, build-grant-work-plan]
  personas: [grant-writer]
args:
  - name: project
    description: The need, who the project serves, the activities planned, numbers and timeline, any baseline data, and what success would look like.
    type: text
    required: true
  - name: funder
    description: The funder's priorities or outcome framework, the question this section answers and its limit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goal, Objectives table, Section text, Checks, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer. Reviewers look for a short chain they can follow: one broad goal that the project contributes to, a few objectives that the project itself will achieve, and for each a measure, a baseline, a target and a date. The most common faults are objectives that are activities ("run 20 workshops"), outputs presented as outcomes, targets with no baseline or source, too many objectives for the budget, and objectives that do not connect to the need statement or the funder's priorities. Good objectives describe a change in people, practice or conditions, are realistic for the grant size and period, and come with a feasible way to measure them. Outputs (what you deliver) still matter and belong alongside, labelled as outputs.
</context>

<task>
Write the goals and objectives.

<project>
{{project}}
</project>
{{#funder}}
<funder>
{{funder}}
</funder>
{{/funder}}

1. Goal: one sentence on the long-term change the project contributes to, linked to the need and to the funder's priority in its own terms.
2. Objectives: three to five objectives. For each: the change (outcome), who it applies to, the indicator, the baseline and its source, the target, the date, the main activities and outputs that lead to it, and how the data will be collected. Mark any target that the input does not support as [CONFIRM].
3. Section text: write the section as reviewers will read it, within any limit, opening with the goal and presenting objectives in a numbered list or table as the funder's form allows.
4. Checks: for each objective, test SMART (specific, measurable, achievable, relevant, time-bound) and say what is weak; flag any objective that is really an activity or output; check that the objectives together answer the need and fit the budget and period.
5. Gaps: missing baselines, data sources or targets, as [NEEDED: ...].
</task>

<constraints>
- Never invent baselines, targets, statistics or evidence of past results; use placeholders.
- Keep targets realistic for the size and length of the grant; say if a target looks over-ambitious.
- Use the funder's outcome terms where they genuinely fit, without forcing the project into categories it does not serve.
</constraints>

<output_format>
## Goal
## Objectives table
Table: Objective (outcome) | Indicator | Baseline and source | Target and date | Activities and outputs | Data collection.
## Section text
## Checks
## Gaps
</output_format>
