---
schema: 1
id: write-grant-renewal-application
kind: prompt
title: Write a grant renewal application
description: Writes a continuation or renewal application to a current funder, showing results against the original objectives, what was learned, and the case and plan for the next phase.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, manager, executive, researcher]
subject: [nonprofit]
requires: [none]
inputs: [text, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [grant-renewal, continuation-funding, results-reporting, next-phase, funder-relationship]
pairs_with:
  prompts: [write-grant-report, plan-funder-stewardship, write-grant-sustainability-plan]
  personas: [grant-writer]
args:
  - name: current_grant
    description: The current grant - amount, period, original objectives and targets - and what was achieved against each, with numbers, plus what did not go to plan and why, and spending against budget.
    type: text
    required: true
  - name: next_phase
    description: What you propose next - changes, scale, new elements, the amount and period requested, and why the funder should continue.
    type: text
    required: true
  - name: funder
    description: The renewal guidance or questions and limits, any change in the funder's priorities, and anything the programme officer has said. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Results against plan, Renewal application, Change summary, Gaps and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer handling renewals. A renewal is judged differently from a first application: the funder already knows the organisation and has its reports, so it asks whether the grant delivered what was promised, whether the organisation learned and adapted, and whether the next phase is a better use of money than funding someone new. Strong renewals report results against the original targets honestly (including shortfalls with reasons and what changed in response), show what the first grant made possible that would not otherwise exist, and present the next phase as a development built on evidence rather than more of the same. Funders often limit how long they fund the same work or expect a falling share or an exit plan, and priorities may have shifted since the first award. Inconsistency with earlier reports is noticed.
</context>

<task>
Write the renewal application.

<current_grant>
{{current_grant}}
</current_grant>

<next_phase>
{{next_phase}}
</next_phase>
{{#funder}}
<funder>
{{funder}}
</funder>
{{/funder}}

1. Results against plan: a table of each original objective, target, result achieved, and comment (met, exceeded, partly met with reason, not met with reason).
2. Renewal application, in the funder's questions and limits if given. Otherwise: summary of the request; what the grant achieved (headline results, one short consented story if supplied, and what the grant made possible); what was learned and changed (problems faced and how the work adapted); the case for continuing (remaining need with current evidence, why this organisation, why now); the next phase (objectives, activities, what is new or different, targets based on actual performance); budget summary and how it relates to the current budget; sustainability (how dependence on this funder reduces, other income, exit or handover).
3. Change summary: what is different from the current grant and why.
4. Gaps and risks: missing data, any inconsistency with the original proposal or earlier reports to check, and questions for the programme officer (such as limits on repeat funding).
</task>

<constraints>
- Use only results given; never invent outcomes, stories or numbers.
- Report shortfalls openly with reasons; do not hide or reframe a missed target as a success.
- Base new targets on actual performance in the current grant, not on the original targets if they were missed.
- Do not assume the funder allows renewal or repeat funding; tell the user to confirm it if the guidance does not say so.
</constraints>

<output_format>
## Results against plan
Table: Objective | Target | Achieved | Comment.
## Renewal application
## Change summary
## Gaps and risks
</output_format>
