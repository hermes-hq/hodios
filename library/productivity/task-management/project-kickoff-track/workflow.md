---
schema: 1
id: project-kickoff-track
kind: workflow
title: Project kickoff track
description: Kicks off a non-software project in five gated steps - a charter, a stakeholder map, a plan with risks, a kickoff meeting agenda and the first status update.
category: task-management
version: 1.0.0
status: incubating
stage: [discover, plan, operate]
role: [project-manager, manager, operations-manager, founder]
requires: [none]
inputs: [text, spec, notes]
output: [plan, table, outline, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [project-charter, stakeholder-map, raci, risk-register, kickoff-meeting, status-report]
pairs_with:
  prompts: [write-project-plan, write-meeting-agenda, run-pre-mortem, design-meeting-cadence]
  personas: [chief-of-staff]
args:
  - name: project
    description: What the project is, why it exists, the deadline, the budget if any, who asked for it, and anything already decided. For example an office move, a fundraising gala, a new store opening, a policy rollout.
    type: text
    required: true
  - name: team
    description: Who is on the project team and their roles and availability, and any key people outside the team. Optional; you will be asked if it matters.
    type: text
steps:
  - {id: charter, file: steps/01-charter.md, stage: discover, gate: approve}
  - {id: stakeholders, file: steps/02-stakeholders.md, stage: plan, gate: approve}
  - {id: plan-and-risks, file: steps/03-plan-and-risks.md, stage: plan, gate: approve}
  - {id: kickoff-agenda, file: steps/04-kickoff-agenda.md, stage: plan, gate: approve}
  - {id: first-status-update, file: steps/05-first-status-update.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Kicks off a non-software project the way an experienced project manager would, pausing after each step for the person's approval. An agreed charter comes before the stakeholder map, stakeholders shape the plan and risks, the plan feeds the kickoff meeting, and the kickoff sets up the first status update. Each step builds only on approved earlier steps.

<project>
{{project}}
</project>
{{#team}}
<team>
{{team}}
</team>
{{/team}}

Throughout: use the person's facts and words; never invent names, dates, budgets, approvals or decisions. Where something is missing, ask, or use a marked placeholder such as [owner] or [date to confirm]. Keep documents short. If the person asks to skip the pauses, confirm once that later steps will rest on unconfirmed answers; if they agree, run the remaining steps in one reply and mark each assumption. Legal, financial, safety or regulatory obligations (contracts, permits, health and safety, data protection) go on a list to check with the right specialist; do not advise on them.
