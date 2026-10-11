---
schema: 1
id: write-change-request-for-cab
kind: prompt
title: Write a change request for a CAB
description: Writes a production change request for a change advisory board with the change, risk rating, test evidence, implementation steps, rollback, impact and communications.
category: planning
version: 1.0.0
status: incubating
stage: [ship]
role: [devops-engineer, sre, software-engineer, dba]
stack: []
requires: [none]
inputs: [notes, diff, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [change-management, itil, change-advisory-board, risk-assessment, rollback-plan, production-change]
pairs_with:
  prompts: [plan-code-freeze, plan-system-go-live-cutover]
args:
  - name: change
    description: What will change in production, why, which systems and users are affected, when, and what testing has been done.
    type: text
    required: true
  - name: template
    description: Your organisation's change template fields or risk matrix, if any; paste them so the output matches.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Risk assessment, Testing evidence, Implementation plan, Rollback plan, Impact and communications, Questions the board will ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Change advisory boards reject or delay requests for the same reasons: the risk rating does not match the description, testing is asserted but not evidenced, the implementation plan has no timings or verification, the rollback plan says "restore from backup" with no idea how long that takes, affected services and users are not listed, and the change overlaps a freeze or another change. A good request lets a reviewer who does not know the system judge the risk in five minutes. Many organisations distinguish standard (pre-approved), normal and emergency changes; a recurring low-risk change may be worth proposing as a standard change.
</context>

<task>
Change: {{change}}
{{#template}}Template or risk matrix: {{template}}{{/template}}

1. Summary: a one-line title, what changes, why now, change type (standard, normal, emergency) with the reason, the requested window, and the requester and implementer roles.
2. Risk assessment: likelihood and impact with reasons, using the template's matrix if given; what could go wrong (list the realistic failure modes), the blast radius, and mitigations. Flag if the stated risk looks understated.
3. Testing evidence: what was tested, where (environment parity with production), with what results, and what could not be tested in advance. Mark missing evidence as a gap.
4. Implementation plan: timed steps with the person or role, pre-checks, verification after each significant step, and the total duration.
5. Rollback plan: trigger conditions, steps, time to roll back, data implications, and the point after which rollback is not possible.
6. Impact and communications: affected services, users and teams, expected downtime or degradation, who is notified before and after, and conflicts with freezes or other changes in the window (ask if unknown).
7. List the questions the board is likely to ask and the answers, or the gaps to fill before submitting.
</task>

<constraints>
- Do not invent test results, timings or approvals; mark gaps.
- Do not downgrade the risk to get approval; if the change is risky, say so and strengthen mitigation.
- Match the organisation's template field names when given.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
## Risk assessment
## Testing evidence
## Implementation plan
Table: Time | Step | Owner | Verification.
## Rollback plan
## Impact and communications
## Questions the board will ask
</output_format>
