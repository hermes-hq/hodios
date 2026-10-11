---
schema: 1
id: run-fmea
kind: prompt
title: Run an FMEA
description: Runs a failure mode and effects analysis on a process or product - failure modes, effects, causes, current controls, severity, occurrence and detection ratings - and ranks the actions.
category: operations
version: 1.0.0
status: incubating
stage: [design, review]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, document, text]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fmea, failure-modes, risk-priority, process-risk, quality-planning]
pairs_with:
  prompts: [map-business-process, mistake-proof-a-process, write-capa-report]
args:
  - name: subject
    description: The process steps or the product and its functions to analyse. For a process, list the steps in order; for a product, its parts and what each must do.
    type: text
    required: true
  - name: history
    description: Known failures, complaints, scrap, near misses and existing controls (inspections, checks, alarms, tests). Leave empty if new.
    type: text
  - name: scale
    description: Rating scale to use, if your customer or company specifies one. Leave empty to use a generic 1 to 10 scale.
    type: string
output_contract:
  format: markdown
  sections: [Scope and team, Rating scales, FMEA table, Priorities, Recommended actions, Assumptions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An FMEA asks, before things go wrong, how each step or part can fail, what the customer or next process would experience, why it would happen and how likely current controls are to catch it. Practitioners rate severity (S), occurrence (O) and detection (D), usually 1 to 10. The classic risk priority number (RPN = S x O x D) is easy to compute but misleading on its own: a severity 9 or 10 failure needs action even with a low RPN, and newer guidance (such as the AIAG and VDA action priority approach) ranks by severity first, then occurrence, then detection. Common mistakes are confusing the failure mode (what goes wrong) with the effect (what the customer sees) and the cause (why), rating detection as good because "the operator checks", and treating the table as finished paperwork instead of a list of actions that should lower the ratings. Ratings are team judgement and must come from people who know the process; an AI draft is a starting point for that meeting.
</context>

<task>
Subject:
<subject>
{{subject}}
</subject>

{{#history}}History and existing controls:
<history>
{{history}}
</history>{{/history}}

{{#scale}}Rating scale: {{scale}}{{/scale}}

1. State the scope (process or design FMEA, start and end, boundaries) and the people who should rate it with you.
2. Give the rating scales used: the one provided, or a short generic 1 to 10 table for S, O and D with plain-language anchors.
3. For each step or function, list realistic failure modes. For each: effect on the customer or next step, cause, current prevention control, current detection control, then draft S, O and D.
4. Base O and D on the history given where possible; where there is no data, mark the rating as "(draft)" and say what would firm it up.
5. Prioritise: list all items with severity 9 or 10 first regardless of RPN, then rank the rest by severity then occurrence, and show RPN as supporting information.
6. Recommend actions that lower occurrence (prevent the cause) before actions that improve detection; prefer mistake-proofing over inspection. Give each action an owner role, a due date placeholder and the expected new ratings.
7. List the assumptions the team must check in the review meeting.
</task>

<constraints>
- Keep failure mode, effect and cause in separate columns and do not mix them.
- Do not rate detection better than 7 (on a 10-is-worst scale) when the only control is human visual inspection, unless evidence is given.
- Never present draft ratings as validated; the team signs them off.
- If a failure could injure someone or breach a legal requirement, flag it as a safety or regulatory item and say a competent person must review it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and team
## Rating scales
Compact tables for S, O, D.
## FMEA table
Table: Step or function | Failure mode | Effect | S | Cause | Prevention control | O | Detection control | D | RPN.
## Priorities
Ordered list with the reason for each position.
## Recommended actions
Table: Item | Action | Type (prevent / detect) | Owner | Due | Expected S, O, D.
## Assumptions to check
</output_format>
