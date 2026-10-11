---
schema: 1
id: design-job-levelling-framework
kind: prompt
title: Design a company job levelling framework
description: Designs a company-wide job architecture - job families, career tracks, levels with factor descriptions, title conventions and the rules for mapping every current role onto it.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design]
role: [operations-manager, executive, founder]
requires: [none]
inputs: [text, dataset]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [job-architecture, job-levels, job-families, title-conventions, career-tracks]
pairs_with:
  prompts: [build-career-ladder, evaluate-job-for-grading, design-salary-bands, prepare-for-pay-transparency-rules]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: Headcount, functions, current titles and roughly how many people hold each, how titles and pay are decided today, and where it hurts (title inflation, unclear promotions, pay inconsistency).
    type: text
    required: true
  - name: goals
    description: What the framework must support (pay bands, promotions, hiring, pay transparency), whether you want separate individual contributor and manager tracks, and any external survey levelling you must map to. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Design choices, Job families and tracks, Level guide, Title conventions, Mapping rules, Rollout, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design job architectures the way an experienced compensation and organisation design lead does. What experts know: one set of levels across the company, described by generic factors (scope and impact, complexity and problem solving, autonomy, knowledge, influence and leadership), is what makes pay bands, promotions and transparency consistent; function-specific career ladders sit on top of it; a separate individual contributor track that reaches senior levels lets experts progress without managing; the number of levels should match the organisation's size and depth (too many levels invite tiny promotions and arguments, too few force big jumps); titles should follow the level, not negotiation, and title inflation is hard to undo; mapping must be done on the role's content, not the person's performance or current pay; and the first mapping always surfaces anomalies that need a decision, plus people who feel demoted, so communication matters. Survey providers have their own levelling, so a crosswalk helps market pricing.

<organisation>
{{organisation}}
</organisation>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. Design choices: number of levels and why, whether to use separate individual contributor and management tracks and where they split, and how executive levels are treated. Give the trade-offs.
2. Job families and tracks: the families (and sub-families where needed) for the functions given, each with a one-line definition.
3. Level guide: for each level, a description against each factor (scope and impact, complexity, autonomy, knowledge, influence and leadership), written so two people would place the same role at the same level. Include typical examples of roles at each level.
4. Title conventions: the title pattern per track and level, rules for prefixes (junior, senior, lead, principal, head of), and what to do with external-facing titles such as sales titles.
5. Mapping rules: how to map current roles (from the role's content, using job descriptions and manager input, then calibrated across functions), how to handle anomalies and people whose title would change, and a crosswalk to survey levels if mentioned.
6. Rollout: sequence (draft, test on a sample, calibrate, approve, communicate, link to pay and promotion processes), and how the framework is maintained.
7. Questions that need a decision.
</task>

<constraints>
- Base levels on role content, never on the current holder's pay, performance or personal characteristics.
- Do not invent survey provider level codes; ask for them if a crosswalk is needed.
- Flag where changes to titles or grades may need consultation or contract changes, to confirm locally.
{{> output/uncertainty}}
</constraints>

<output_format>
## Design choices
## Job families and tracks
## Level guide
Table: Level | Scope and impact | Complexity | Autonomy | Knowledge | Influence and leadership | Example roles.
## Title conventions
Table: Level | Individual contributor title | Manager title.
## Mapping rules
## Rollout
## Questions
Numbered.
</output_format>
