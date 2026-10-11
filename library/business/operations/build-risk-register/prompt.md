---
schema: 1
id: build-risk-register
kind: prompt
title: Build an operational risk register
description: Builds an operational risk register for a business with cause-event-effect risk statements, likelihood and impact scores, owners, existing controls, actions and review dates.
category: operations
version: 1.0.0
status: incubating
stage: [plan, review]
role: [operations-manager, founder, manager, executive]
requires: [none]
inputs: [notes, text]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [risk-register, risk-assessment, risk-management, operational-risk, controls]
pairs_with:
  prompts: [plan-business-continuity, map-supply-risk, run-fmea]
args:
  - name: business
    description: What the business does, size, sites, key customers and suppliers, systems, people, and any recent incidents, near misses or worries.
    type: text
    required: true
  - name: focus
    description: Optional focus area (for example IT and data, suppliers, people, premises, finance, compliance) or leave empty for a whole-business register.
    type: string
  - name: scoring
    description: Your existing scoring scheme or risk appetite, if any. Leave empty to use a simple 1 to 5 by 1 to 5 scale.
    type: string
output_contract:
  format: markdown
  sections: [Scoring method, Risk register, Top risks, Actions, Review routine, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A useful risk register is short, specific and owned. Each risk is written as cause, event and effect ("Because only one person can run payroll, if they are unavailable at month end, staff are paid late"), not as a vague label like "staff risk". Risks are scored twice: inherent (before controls) and residual (with the controls that actually operate today), so the register shows which controls matter and where the gap is. Every risk has one owner and a decision: treat, tolerate, transfer (for example insurance or contract) or terminate the activity. Registers fail when they list 80 generic risks copied from a template, when controls are described as hoped-for rather than tested, when scores are never revisited, and when nobody acts on the top five. For a small business, 15 to 30 risks is usually enough.
</context>

<task>
Business:
<business>
{{business}}
</business>

{{#focus}}Focus: {{focus}}{{/focus}}
{{#scoring}}Scoring scheme: {{scoring}}{{/scoring}}

1. State the scoring method: the one given, or likelihood 1 to 5 and impact 1 to 5 with short anchors for each level, and the score bands (low, medium, high) with the action expected at each.
2. Identify 15 to 30 risks specific to this business across relevant areas (people and key persons, suppliers, customers and concentration, IT and data, premises and equipment, finance and cash, health and safety, legal and compliance, reputation), weighting toward incidents and worries mentioned.
3. Write each as cause, event, effect.
4. Score inherent risk, list the existing controls described, and score residual risk. Where a control is assumed rather than stated, mark it "(assumed)".
5. Give each risk an owner role, a response (treat, tolerate, transfer, terminate), actions with due date placeholders, and a review date.
6. Pull out the top five residual risks with the reason and the single most useful next action for each.
7. Propose a review routine: who meets, how often, what triggers an update.
8. List the points to confirm.
</task>

<constraints>
- No generic filler risks; each must tie to something in the description or a realistic risk for this type of business, stated as such.
- Do not invent controls, insurance cover or contract terms; mark them as assumed or to confirm.
- Do not give legal or insurance advice; where a risk depends on a legal duty or a policy wording, say who to check with.
- Keep scores consistent with the stated anchors; explain any score of 20 or more.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scoring method
## Risk register
Table: ID | Risk (cause, event, effect) | Area | L | I | Inherent | Existing controls | L | I | Residual | Owner | Response | Actions | Review date.
## Top risks
## Actions
Table: Action | Risk ID | Owner | Due.
## Review routine
## Points to confirm
</output_format>
