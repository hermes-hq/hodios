---
schema: 1
id: write-grant-evaluation-plan
kind: prompt
title: Write a grant evaluation plan
description: Writes the evaluation plan for a grant proposal - evaluation questions, indicators with baselines and targets, methods, roles, budget, ethics and how findings will be used - sized to the grant.
category: grant-writing
version: 1.0.0
status: incubating
stage: [design, build]
role: [manager, researcher, executive]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [evaluation-plan, outcome-indicators, monitoring-and-evaluation, data-collection, baseline]
pairs_with:
  prompts: [write-grant-application, build-theory-of-change, write-grant-report]
  personas: [grant-writer]
args:
  - name: project
    description: The project's aims, activities, participants, duration and the outcomes you expect, plus any logic model or theory of change.
    type: text
    required: true
  - name: grant_size_and_rules
    description: Grant amount and duration, and what the funder asks about evaluation (required indicators, external evaluation, budget share, reporting).
    type: text
    required: true
  - name: existing_data
    description: Data you already collect (attendance, case records, surveys) and your capacity to collect more. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Evaluation questions, Indicator table, Methods and data collection, Roles budget and timeline, Ethics and data protection, Use and reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an evaluation specialist who writes evaluation plans that reviewers trust and small teams can actually run. Reviewers look for questions that matter, indicators that measure outcomes (changes for people) as well as outputs (activities delivered), baselines captured before the work starts, data collection that fits the team's capacity, honest language about contribution rather than proof of attribution, and a clear route from findings to decisions. Proportionality matters: a small one-year grant needs simple, routine measures, not a randomised trial; a large multi-year programme may justify an external evaluator, often budgeted at a modest share of the grant, though funders set their own expectations.

<project>
{{project}}
</project>

<grant_size_and_rules>
{{grant_size_and_rules}}
</grant_size_and_rules>
{{#existing_data}}
<existing_data>
{{existing_data}}
</existing_data>
{{/existing_data}}
</context>

<task>
1. Evaluation questions: three to five questions covering process (was it delivered as planned, to whom), outcomes (what changed for participants), and learning (what worked, for whom, and why). Include any questions the funder requires.
2. Indicator table: for each outcome and key output, one or two indicators, the baseline (or how and when it will be captured), the target, the data source, frequency and who collects it. Prefer validated short measures where they exist, named only if the user gave them or described generically otherwise.
3. Methods and data collection: the design that fits the grant size (for example before-and-after with follow-up, comparison with routine data, case studies, participant feedback), sampling, how qualitative data will be collected and analysed, how to reach people who drop out, and the limits of the design stated plainly.
4. Roles, budget and timeline: internal versus external evaluation and the reason, evaluation tasks and hours, a budget line marked as an estimate, and a timeline from baseline to final report.
5. Ethics and data protection: consent, anonymity, safe storage, data-sharing with the funder, burden on participants, and special care for children or vulnerable adults; say to check local ethics and data-protection requirements.
6. Use and reporting: how findings feed decisions during the grant, when the funder gets reports, and how participants hear about results.
</task>

<constraints>
- Do not invent baselines, targets or evidence; mark targets as proposals for the applicant to confirm and baselines as to be collected.
- Keep the design proportionate to the grant size and the team's capacity; say if the funder's expectations exceed what the budget allows.
- Use contribution language ("contributed to", "associated with") unless the design supports causal claims.
- Do not recommend collecting personal data that the evaluation does not need.
</constraints>

<output_format>
## Evaluation questions
## Indicator table
A table: Outcome or output | Indicator | Baseline | Target | Source | Frequency | Who collects.
## Methods and data collection
## Roles budget and timeline
## Ethics and data protection
## Use and reporting
</output_format>
