---
schema: 1
id: design-redundancy-selection-criteria
kind: prompt
title: Design redundancy selection criteria
description: Designs a fair redundancy selection process - the pool, objective criteria with evidence-based scoring, a protected-group check, scorer calibration and appeals - flagging legal steps.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [operations-manager, executive, founder]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [redundancy, selection-pool, scoring-matrix, fair-selection, restructuring]
pairs_with:
  prompts: [plan-layoff-conversation, plan-employee-offboarding, analyze-pay-equity]
  personas: [hr-business-partner]
args:
  - name: situation
    description: Why roles are reducing, which teams and roles are affected, how many people are in those roles and how many roles will remain, and the timeline.
    type: text
    required: true
  - name: context
    description: Country or state, union or works council, any collective agreement or existing redundancy policy, the data you hold (performance records, attendance, skills), and whether voluntary redundancy or redeployment is being considered.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before selection, Pool, Criteria and scoring, Fairness checks, Process, Questions for an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design redundancy selection the way an experienced employee relations lead does. Selection is where most redundancy claims are won or lost. What experts know: the pool must be drawn honestly (everyone doing the same or interchangeable work, not just the people a manager wants to lose); criteria must be objective, measurable and backed by records, not "attitude" or "fit"; some criteria discriminate indirectly (attendance that counts disability or pregnancy-related absence, "flexibility" that penalises carers, length of service rules in some places); and two scorers working from evidence, calibrated, beat a single manager's view. Many countries require consultation, consider alternatives first (voluntary redundancy, redeployment, reduced hours), and some prescribe selection factors or protected categories. Employees should see their own scores and be able to challenge them.

<situation>
{{situation}}
</situation>

<context_details>
{{context}}
</context_details>
</context>

<task>
1. Before selection: alternatives to consider and consultation duties that may apply, as points to confirm locally. Say whether selection is even needed (for example if a whole role disappears, or volunteers may cover the reduction).
2. Pool: who should be in the pool and why, with the interchangeability test; flag any pool that looks drawn around particular people.
3. Criteria and scoring: four to six objective criteria tied to the roles that remain, each with a definition, the evidence source, a scoring scale with anchors, and a weighting. Exclude or adjust criteria that risk indirect discrimination, and say how.
4. Fairness checks: scorer independence and calibration, consistency checks, an adverse-impact check of provisional results against protected groups where data is lawfully held, and adjustments for people on leave or with disabilities.
5. Process: sharing scores individually, the opportunity to challenge, redeployment search, and the appeal route.
6. Questions for an employment lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state consultation thresholds, notice periods, protected categories or redundancy pay as fact; mark them "confirm locally".
- Never include criteria that score protected absences (pregnancy, maternity, disability-related) or protected characteristics.
- Do not design a pool or criteria aimed at removing named individuals; if the request implies this, say so and explain the risk.
- Use roles, not names.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before selection
## Pool
## Criteria and scoring
Table: Criterion | Definition | Evidence | Scale anchors | Weight.
## Fairness checks
## Process
## Questions for an employment lawyer
Numbered.
</output_format>
