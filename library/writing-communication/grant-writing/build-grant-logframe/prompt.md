---
schema: 1
id: build-grant-logframe
kind: prompt
title: Build a logframe for a grant proposal
description: Builds a logical framework matrix for a grant proposal with goal, outcomes, outputs and activities, each with indicators, baselines, targets, means of verification and assumptions.
category: grant-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, writer, consultant, researcher]
subject: [nonprofit]
requires: [none]
inputs: [text, document]
output: [table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [logframe, results-framework, indicators, means-of-verification, assumptions, international-development]
pairs_with:
  prompts: [build-theory-of-change, write-grant-evaluation-plan, build-grant-work-plan]
  personas: [grant-writer]
args:
  - name: project
    description: The problem, the change sought, activities, expected outputs, target groups and numbers, timeline, any baseline data and data sources available, and known risks.
    type: text
    required: true
  - name: donor_format
    description: The donor's logframe template or results framework terms (for example impact, outcome, output; or goal, purpose, results) and any required indicators. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Logic check, Logframe, Activities and inputs, Indicator notes, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a monitoring and evaluation specialist. Many institutional donors require a logical framework: a matrix with rows for the goal (or impact), outcomes (or purpose), outputs and activities, and columns for indicators, baselines, targets, means of verification and assumptions. It is read vertically (if these activities happen and the assumptions hold, the outputs follow; if the outputs are delivered and the assumptions hold, the outcomes follow) and horizontally (each statement has a measurable indicator and a real data source). Common faults: outcomes that are just bigger outputs, indicators that measure activity ("number of trainings held") at outcome level, targets without baselines, means of verification that nobody will collect, assumptions that are really risks the project could manage, and too many indicators to monitor. Donors use different labels for the same levels, so follow the donor's terms when given.
</context>

<task>
Build the logframe.

<project>
{{project}}
</project>
{{#donor_format}}
<donor_format>
{{donor_format}}
</donor_format>
{{/donor_format}}

1. Logic check: write the chain in one line per level (activities lead to outputs lead to outcomes lead to goal) and flag any weak link, missing step, or level confusion before building the matrix.
2. Logframe: one goal, one to three outcomes, outputs under each outcome. For each statement: one to three indicators (specific, measurable, disaggregated by sex, age or disability where relevant), baseline with source and date or [NEEDED], target with date, means of verification (the document or dataset, who collects it, how often), and assumptions (external conditions outside the project's control).
3. Activities and inputs: main activities under each output with the key inputs or resources; keep them short.
4. Indicator notes: for each outcome indicator, a short definition (how it is calculated, unit, numerator and denominator), and flag any indicator that will be costly or hard to collect.
5. Gaps: missing baselines, targets and data sources, as [NEEDED: ...].
</task>

<constraints>
- Never invent baselines, targets or statistics; use placeholders and suggest how to obtain them (baseline survey, existing records).
- Put conditions the project can manage into the risk register, not the assumptions column; say which ones you moved.
- Keep to a monitorable number of indicators (usually two or three per outcome).
- Use the donor's level names and required indicators where given.
</constraints>

<output_format>
## Logic check
## Logframe
Table: Level | Statement | Indicators | Baseline | Target | Means of verification | Assumptions.
## Activities and inputs
## Indicator notes
## Gaps
</output_format>
