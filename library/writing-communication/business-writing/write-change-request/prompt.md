---
schema: 1
id: write-change-request
kind: prompt
title: Write a project change request
description: Writes a formal project change request with the change, the reason, its impact on scope, time, cost, quality and risk, the options and the approval needed from the sponsor or change board.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [project-manager, business-analyst, manager, consultant]
requires: [none]
inputs: [notes, text, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [change-control, change-request, project-governance, scope-change, impact-assessment]
pairs_with:
  prompts: [write-status-report, write-decision-memo, write-requirement-change-request, write-construction-change-order]
args:
  - name: change
    description: What would change and why, who asked for it, and the facts you have on impact, such as extra days, cost, people, affected deliverables and dependencies.
    type: text
    required: true
  - name: project_baseline
    description: The current approved baseline, such as scope summary, key dates, budget and contingency left, so impact can be measured against it.
    type: text
    required: true
  - name: approver
    description: Who approves changes and any thresholds, for example "change board approves anything over 10k or 2 weeks". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Change request, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Change control exists so that a project's scope, time and cost only move by a deliberate decision. Change requests fail in predictable ways: the impact is assessed only for cost and not for schedule, quality, risk or other projects; the knock-on effects (testing, training, documentation, contracts) are forgotten; contingency is quietly spent without saying so; the "do not make the change" option is missing; and the approver cannot tell whether the request is within their authority. Experienced project managers measure every impact against the approved baseline, show the effect on the critical path rather than just the task, and record what is being traded away.
</context>

<task>
Write a change request.

<change>
{{change}}
</change>

<project_baseline>
{{project_baseline}}
</project_baseline>
{{#approver}}Approver and thresholds: {{approver}}{{/approver}}

1. If the change itself is unclear, ask up to two short questions and stop. If the baseline is thin, write the request and list what is missing.
2. Header: change reference placeholder, project, title, raised by, date, priority, type (scope, schedule, cost, quality, or a mix).
3. Description of the change in plain words, and the reason: business need, defect, external requirement, or stakeholder request.
4. Impact assessment against the baseline, each as "baseline → with change": scope and deliverables, schedule (including whether the critical path or a key milestone moves), cost (including use of contingency), quality, resources, risks added or removed, and dependencies on other projects, contracts or suppliers. Mark any impact you cannot assess from the input `[NEEDED: …]`.
5. Knock-on work: testing, training, documentation, contract variations, communications.
6. Options: at least (a) approve as requested, (b) reject or defer with its consequence, and (c) a reduced or phased version where sensible, with the impact of each.
7. Recommendation and the approval needed: who, by when, and whether it is within their threshold.
8. Decision block for the approver: approve, reject, defer, with conditions, signature and date lines.
</task>

<constraints>
- Use only figures given. Never invent days, costs or dates; mark gaps.
- State plainly when the change consumes contingency and how much remains afterwards, if the figures allow.
- Neutral tone: do not argue for the change beyond the evidence; the "reject" option must be described fairly.
- For changes that touch a supplier contract, note that a contract variation may be needed and should be checked with whoever owns the contract.
</constraints>

<output_format>
## Change request
Header table; Description and reason; Impact assessment table (Area · Baseline · With change · Comment); Knock-on work; Options table (Option · Impact · Risk); Recommendation; Approval needed; Decision block.
## Gaps to fill
Each `[NEEDED: …]` and who could provide it. "None" if none.
</output_format>
