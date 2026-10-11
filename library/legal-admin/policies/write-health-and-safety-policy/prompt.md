---
schema: 1
id: write-health-and-safety-policy
kind: prompt
title: Write a health and safety policy
description: Drafts a health and safety policy for a small or mid-sized employer in three parts - statement of intent, who is responsible for what, and the practical arrangements for its real hazards.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, manager, operations-manager]
requires: [none]
inputs: [text]
output: [docs, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [health-and-safety, statement-of-intent, safety-responsibilities, first-aid, safety-arrangements]
pairs_with:
  prompts: [write-workplace-risk-assessment, write-emergency-procedures-for-staff, write-toolbox-talk]
args:
  - name: workplace
    description: What the business does, number of staff and sites, shifts, the work done (office, warehouse, kitchen, site work, driving, lone or home working), equipment and substances used, and any accidents or near misses.
    type: text
    required: true
  - name: jurisdiction
    description: Country or state, because the duty to have a written policy and its threshold differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Statement of intent, Responsibilities, Arrangements, Gaps to act on, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A useful health and safety policy has three parts: a short statement of intent signed by the most senior person, a responsibilities section that names roles rather than vague "management", and arrangements that say how each real hazard is controlled (risk assessments, training, equipment checks, first aid, fire, accidents and reporting, consultation with workers). Inspectors and insurers look past the statement to the arrangements: does the policy match the work actually done, are the named people real, and are risk assessments referenced? Copied policies fail by covering hazards the business does not have and missing those it does, such as driving for work, lone working, manual handling in a small shop or stress. Many countries require a written policy above a staff threshold and require worker consultation, accident recording and reporting of certain incidents to an authority; the details differ by country and state.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Workplace:
<workplace>
{{workplace}}
</workplace>

1. Statement of intent: half a page, plain language, signed by [NAME, ROLE], with the commitments and review date.
2. Responsibilities: a table of roles (owner or director, managers or supervisors, a competent person or adviser, first aiders, fire wardens, all staff, contractors) and what each is responsible for. Use roles; names go in [BRACKETS].
3. Arrangements, one short section per relevant topic, only for hazards that exist here: risk assessment and review, consultation with workers, training and induction, equipment and maintenance, substances, manual handling, work at height, driving, lone and home working, workplace stress and violence, first aid, fire and emergencies, accident and near-miss recording and reporting to the authority, contractors and visitors, monitoring.
4. Gaps to act on: anything in the description that suggests a missing control (no first aider for a shift, an accident with no record, untrained forklift drivers), prioritised.
5. Points to confirm: whether a written policy is required at this size, incident reporting duties and timescales, first aid requirements, marked "confirm for [jurisdiction]".
</task>

<constraints>
{{> guardrails/professional-limits}}
- If the description shows an immediate serious danger (for example unguarded machinery in use, a gas smell, an untrained person operating a lift truck), say to stop that activity and get competent help before anything else.
- Do not include arrangements for hazards the business does not have; do not leave out the ones it does.
- Do not state legal thresholds, reporting deadlines or ratios as fact unless supplied; mark them to confirm.
- A policy does not replace risk assessments; reference them and say which are needed.
- Use roles and [BRACKETS] for names; never invent people or certificates.
{{> output/uncertainty}}
</constraints>

<output_format>
## Statement of intent
Short signed statement.

## Responsibilities
Table: role | responsibilities | [name].

## Arrangements
One subsection per relevant topic.

## Gaps to act on
Numbered, most urgent first.

## Points to confirm
Numbered.
</output_format>
