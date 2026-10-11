---
schema: 1
id: write-quality-control-checklist
kind: prompt
title: Write a quality control checklist
description: Writes an inspection checklist for a product or service output with measurable criteria, tolerances, sample sizes, defect classes and clear pass, hold or reject rules.
category: operations
version: 1.0.0
status: incubating
stage: [build, operate]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, document, text]
output: [checklist, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [quality-control, inspection, defect-classification, acceptance-criteria, final-inspection]
pairs_with:
  prompts: [write-sop, run-five-whys, plan-acceptance-sampling]
args:
  - name: output_checked
    description: What is being inspected - a product, a batch, a finished job or a service delivery - and the stage (incoming goods, in process, final, before dispatch, after a job).
    type: text
    required: true
  - name: requirements
    description: The specification, drawings, customer requirements, standards or past complaints that define "good". Paste dimensions, tolerances and photos described in words if you have them.
    type: text
  - name: volume
    description: How many units, jobs or batches are made per day or week, and who will inspect (operator self-check, a separate inspector, the owner).
    type: string
output_contract:
  format: markdown
  sections: [Scope, Inspection checklist, Defect classes, Sampling and frequency, Decision rules, Record sheet, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A quality checklist works only if two inspectors looking at the same item reach the same verdict. That means every check is observable or measurable ("gap between door and frame 2-4 mm, feeler gauge", not "door fits well"), says the method and tool, and names what happens on a fail. Experienced quality people separate defects by consequence: critical (safety, legal, or the item cannot be used), major (likely to cause a return or complaint) and minor (cosmetic, within what customers accept), and they set different rules for each, typically zero tolerance for critical. They also check the things that caused past complaints first, use limit samples or photos for appearance checks, and record results so trends show up. Novices write long lists of vague checks, inspect everything at the end where defects are expensive, and have no rule for what to do with a batch that fails.
</context>

<task>
Output being checked:
<output_checked>
{{output_checked}}
</output_checked>

{{#requirements}}Requirements and known problems:
<requirements>
{{requirements}}
</requirements>{{/requirements}}

{{#volume}}Volume and inspectors: {{volume}}{{/volume}}

1. State the scope: what is inspected, at which stage, by whom, and what is out of scope.
2. Write the checklist grouped by characteristic (identity and labelling, dimensions or quantity, function, appearance, packaging, documents). For each check give: what to check, the acceptance criterion with tolerance, the method and tool, and the defect class.
3. Put checks linked to past complaints or safety first and mark them.
4. Where a criterion is subjective (colour, finish, cleanliness), describe a limit sample or reference photo to agree, instead of an adjective.
5. Propose sampling and frequency: 100% for critical characteristics, and a sampling approach for the rest scaled to the volume given. If a formal sampling plan is needed, say so and leave the numbers as `[CONFIRM]` rather than guessing a standard table.
6. Write decision rules: pass, hold and quarantine, rework, reject, and who decides on concessions. Include what to do with items made since the last good check.
7. Add a record sheet layout that captures date, lot or job, inspector, results and actions.
8. List every value you could not take from the requirements as a point to confirm.
</task>

<constraints>
- Never invent tolerances, dimensions, legal limits or customer specifications. Use `[CONFIRM: what is needed]`.
- Every check must be observable or measurable by the named inspector with the named tool. Rewrite vague checks.
- Keep the checklist usable at the workstation: at most about 25 checks; move the rest to a periodic audit if needed.
- If the output involves food, electrical, medical, child or lifting safety, flag that sector rules may apply and must be confirmed with the relevant standard or regulator.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
## Inspection checklist
Table: # | Check | Criterion and tolerance | Method and tool | Class (critical / major / minor).
## Defect classes
Short definitions with one example each from this output.
## Sampling and frequency
## Decision rules
Table: Result | Action | Who decides.
## Record sheet
Column layout for the log.
## Points to confirm
Numbered list.
</output_format>
