---
schema: 1
id: plan-outsourced-work-package
kind: prompt
title: Plan an outsourced work package
description: Plans handing a piece of engineering work to an agency or contractor team, with clear boundaries, interfaces, acceptance criteria, code standards, check-ins and a handback your team can own.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, project-manager]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [outsourcing, vendor-management, acceptance-criteria, handback, contractors]
pairs_with:
  prompts: [break-down-epic, write-definition-of-done, write-ownership-handover-doc]
args:
  - name: work
    description: The work to hand over, why it is being outsourced, and the deadline or budget.
    type: text
    required: true
  - name: setup
    description: Your codebase and team setup - repos, environments, CI, review practice - and what the external team will be allowed to access.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Package boundary, Interfaces and contracts, Acceptance criteria, Engineering standards, Access and security, Cadence and checkpoints, Handback, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Outsourced engineering work fails less often on code quality than on boundaries. Typical failures: the package touches too much of the core codebase so the external team blocks on internal reviewers, acceptance is described as "works like the design" and argued about at the end, nobody from the internal team reviews early, and the handback arrives as a large drop that nobody inside can maintain. Engineering leads who do this well cut a package with a clear interface, agree acceptance criteria and standards before work starts, review small increments every week, give least-privilege access, and plan from day one who will own the code afterwards. Commercial and legal terms belong in the contract and are outside this plan, but the plan should say which engineering points the contract must reflect.
</context>

<task>
<work>
{{work}}
</work>
<setup>
{{setup}}
</setup>

1. Define the package boundary: what is in, what is out, and which parts of your codebase the external team may change. Suggest reshaping the package if it reaches deep into core systems.
2. Specify interfaces and contracts: APIs, events, data shapes and mocks or stubs so the external team can work without waiting on yours.
3. Write acceptance criteria that can be checked, including non-functional ones (performance, accessibility, security, browser or device support) and the acceptance test procedure.
4. Set engineering standards: code style, tests and coverage expectations, review rules, branching, documentation and the definition of done.
5. Plan access and security: least-privilege access to repos and environments, no production data, secrets handling, and offboarding at the end.
6. Set the cadence: kickoff, weekly demos of merged increments, a named internal reviewer with time reserved, and checkpoints where scope or the arrangement can be changed.
7. Plan the handback: knowledge transfer sessions, documentation, a period of overlap or warranty fixes, and the internal owner.
8. List risks and the engineering points the contract should cover (acceptance, ownership of code, warranty period), marked for the people who handle the contract.
</task>

<constraints>
- Do not give legal or contract advice beyond listing engineering points for the contract owners to handle.
- Do not assume tools or access levels that were not mentioned; use placeholders.
- Never plan for the external team to use production personal data.
- Keep acceptance criteria verifiable; no "high quality" or "like the design" without specifics.
</constraints>

<output_format>
## Package boundary
In, out, allowed areas.
## Interfaces and contracts
Bullets.
## Acceptance criteria
Checklist plus the acceptance procedure.
## Engineering standards
Bullets.
## Access and security
Checklist.
## Cadence and checkpoints
Table: when | what | who.
## Handback
Bullets.
## Risks
Table: risk | mitigation; plus engineering points for the contract.
</output_format>
