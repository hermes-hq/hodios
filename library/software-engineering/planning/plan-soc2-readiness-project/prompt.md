---
schema: 1
id: plan-soc2-readiness-project
kind: prompt
title: Plan a SOC 2 readiness project
description: Plans a SOC 2 readiness project for a small engineering organisation with scope, a control gap list, policies, evidence collection, owners, tooling choices and the audit timeline.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, security-engineer, founder, devops-engineer]
stack: []
advice_risk: [legal]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [soc2, security-compliance, audit-readiness, trust-services-criteria, evidence-collection, type-ii-report]
pairs_with:
  prompts: [build-project-risk-register, write-project-raci]
args:
  - name: company
    description: The company and product, team size, cloud and tools used (code hosting, identity provider, HR system, ticketing), current security practices, and why SOC 2 now (a customer deal, a deadline).
    type: text
    required: true
  - name: target
    description: What you are aiming for and by when, for example "Type I by March, then Type II".
    type: string
output_contract:
  format: markdown
  sections: [Scope and report type, Gap list, Workstreams and owners, Timeline, Evidence and tooling, Ongoing operation, What to check with the auditor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SOC 2 is an attestation by a licensed CPA firm against the AICPA Trust Services Criteria; security is always in scope and availability, confidentiality, processing integrity and privacy are optional. A Type I report covers control design at a point in time; a Type II report covers operating effectiveness over an observation period, typically three to twelve months, which is why the timeline is driven by when controls start running, not when the audit starts. Small companies underestimate the non-engineering controls (HR onboarding and offboarding, background checks where lawful, security training, vendor management, risk assessment, board or management oversight) and the evidence burden: every control needs proof it ran, every time. Scoping tightly (the production system that customers' data touches) and choosing which optional criteria to include are the biggest levers on effort.

{{> guardrails/professional-limits}}
</context>

<task>
Company: {{company}}
{{#target}}Target: {{target}}{{/target}}

1. Scope and report type: systems, data and teams in scope, which Trust Services Criteria to include and why, Type I versus going straight to Type II, given the customer driver and dates.
2. Gap list: group typical control areas (governance and risk assessment, policies, access management and reviews, onboarding and offboarding, change management and code review, vulnerability management and patching, logging and monitoring, incident response, backups and disaster recovery, vendor management, encryption, endpoint security, security awareness training, availability) and mark each as likely in place, partial or missing based on the input, with what is needed to close it. Say these are typical areas, not the auditor's control list.
3. Workstreams and owners: policies, engineering controls, HR controls, vendor and risk, evidence; each with an owner role and the effort as a range.
4. Timeline: readiness work, controls operating, a readiness assessment (optional), auditor selection and kickoff, Type I fieldwork, the Type II observation window, and report delivery. Show the critical path and whether the target date is realistic.
5. Evidence and tooling: how evidence will be collected (manual with a shared tracker, or a compliance automation platform), trade-offs of each, and the evidence that is easiest to get wrong (access reviews on schedule, offboarding within the stated time, change approvals).
6. Ongoing operation: the recurring control calendar (quarterly access reviews, annual risk assessment and policy review, training, restore tests).
7. What to check with the auditor and advisers: scope, criteria, observation period, and anything legal (background checks, data processing terms).
</task>

<constraints>
- Do not name specific auditor firms or vendors as recommendations; describe the selection criteria.
- Do not claim a control set is what the auditor will require; controls are agreed with the auditor.
- Do not promise pass or timing outcomes; give realistic ranges and dependencies.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and report type
## Gap list
Table: Area | Status (in place, partial, missing) | What is needed | Owner.
## Workstreams and owners
## Timeline
Table: Month | Milestone | Depends on.
## Evidence and tooling
## Ongoing operation
Table: Control activity | Frequency | Owner.
## What to check with the auditor
</output_format>
