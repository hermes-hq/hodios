---
schema: 1
id: run-7s-organisation-diagnosis
kind: prompt
title: Run a 7S organisation diagnosis
description: Runs a McKinsey 7S diagnosis of an organisation, finding where strategy, structure, systems, shared values, style, staff and skills pull against each other, with fixes.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, review]
role: [executive, consultant, manager, operations-manager]
requires: [none]
inputs: [text, notes, document]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [mckinsey-7s, organisational-alignment, change-readiness, org-diagnosis, organisational-culture]
pairs_with:
  prompts: [cascade-strategy-to-team-goals, diagnose-strategic-challenge, run-yearly-company-health-check]
  personas: [management-consultant]
args:
  - name: organisation
    description: The organisation or unit - strategy, structure and reporting lines, key processes and systems, how leaders behave, culture and values (stated and real), staffing and skills - plus survey results, exit interview themes or complaints if you have them.
    type: text
    required: true
  - name: change
    description: The change the organisation is trying to make or the problem it faces (a new strategy, a merger, slow decisions, missed targets). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Current state by element, Misalignments, Target state, Priority fixes, Evidence gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You use the 7S model to diagnose organisational alignment. Its value is in the connections, not the seven boxes: a strategy built on fast customer response fails if structure needs three sign-offs, systems reward volume over service, and leaders punish mistakes. The "hard" elements (strategy, structure, systems) are easy to change on paper; the "soft" ones (shared values, style, staff, skills) decide whether change sticks. Shared values sit in the centre: what people actually believe is rewarded, which often differs from the values on the wall. A useful diagnosis finds the few misalignments that explain the symptoms and fixes those, rather than redesigning everything.
</context>

<task>
Diagnose this organisation:

<organisation>
{{organisation}}
</organisation>
{{#change}}

<change>
{{change}}
</change>
{{/change}}

1. Describe the current state of each element (strategy, structure, systems, shared values, style, staff, skills) from the material, separating stated from observed, and labelling evidence.
2. Build an alignment check: for each important pair of elements, say whether they support or undermine each other, focusing on pairs relevant to the change or the symptoms. Name the misalignments in plain words and link each to a symptom.
3. Describe the target state for each element that the change or strategy needs; leave elements that are fine as "keep".
4. Choose 3 to 5 priority fixes that resolve the most important misalignments, ordered by dependency (for example fix incentives before launching a new process), each with owner role, first step and a measure.
5. List evidence gaps and how to fill them (short staff survey, interviews, process walk-through, decision log).
</task>

<constraints>
- Use the material; do not invent survey results, quotes or staff numbers. Mark inferences.
- Avoid blaming individuals; describe behaviours and systems.
- Restructuring or role changes affect people's jobs; flag that HR and local employment law apply before any change to roles.
- Keep fixes proportionate to the organisation's size.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current state by element
Table: Element | Stated | Observed | Evidence label.

## Misalignments
Numbered: elements involved, how they conflict, symptom it explains.

## Target state
Table: Element | Target | Change needed (or keep).

## Priority fixes
Numbered with owner, first step, measure.

## Evidence gaps
Bullets.
</output_format>
