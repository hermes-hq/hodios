---
schema: 1
id: prepare-talent-review
kind: prompt
title: Prepare your team for a talent review
description: Prepares a manager for a talent or succession review, assessing each report's performance, growth potential, flight risk and next move from evidence, with bias checks and talking points.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, executive]
requires: [none]
inputs: [notes, document]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [talent-review, succession-planning, nine-box, flight-risk, bias-check]
pairs_with:
  prompts: [run-calibration-session, plan-key-person-cover, write-promotion-nomination]
  personas: [hr-business-partner]
args:
  - name: team
    description: For each report (initials only), their role and level, recent performance with examples, what they have shown beyond their current role, their stated ambitions, and any retention concerns.
    type: text
    required: true
  - name: review_format
    description: The format your company uses (for example a nine-box grid, ready-now or ready-later succession slates, high-potential nominations) and what you will be asked. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Team summary, Person by person, Succession for key roles, Bias check, Talking points, Actions after the review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers prepare for talent reviews, where leaders discuss each person's performance, potential, readiness for bigger roles and risk of leaving. These meetings shape who gets opportunities, so preparation matters. Common failures: confusing potential with confidence, visibility or similarity to the people in the room; rating potential low for people who work part-time, are on leave or are quieter; treating "potential" as a fixed trait instead of evidence of learning agility, scope beyond the role and ambition; ignoring stated ambitions; and leaving the meeting without development actions. Good preparation uses specific evidence for each claim, separates current performance from readiness for a next role, names what the person wants, flags flight risk with reasons, and ends with a development action per person. Talent review labels are sensitive and should be handled under company policy on what is shared with the employee.

<team>
{{team}}
</team>
{{#review_format}}
<review_format>
{{review_format}}
</review_format>
{{/review_format}}
</context>

<task>
1. Team summary: a short view of the team's bench strength, concentration of risk (one person holding critical knowledge), and overall flight risk.
2. Person by person: for each report, performance assessment with evidence, growth evidence (learning speed, scope beyond role, influence), stated ambition, readiness (ready now, ready in 1 to 2 years, develop in role) for a named next role if any, flight risk with reasons, and one development action. Mark any rating without evidence as [needs evidence].
3. Succession for key roles: for the manager's own role and any critical roles, possible successors and their readiness, and gaps if there is no one.
4. Bias check: check each assessment for proximity, recency, halo, similarity, visibility and part-time or leave effects, and for consistency across people; note anything to revisit.
5. Talking points: two or three sentences per person the manager can say in the meeting, evidence first.
6. Actions after the review: development actions, retention conversations, and what to tell each person about outcomes under company policy.
</task>

<constraints>
- Use only facts given; do not invent achievements or ambitions. Mark gaps [X].
- Assess work evidence, not personality, age, family plans, health or other protected characteristics.
- Do not mark someone lower in potential for working part-time, being on leave or having caring responsibilities.
- Keep the output suitable for a confidential management meeting; do not draft messages that disclose labels to employees unless company policy allows it.
</constraints>

<output_format>
## Team summary
## Person by person
Table: Person | Performance | Growth evidence | Ambition | Readiness | Flight risk | Development action.
## Succession for key roles
## Bias check
## Talking points
## Actions after the review
</output_format>
