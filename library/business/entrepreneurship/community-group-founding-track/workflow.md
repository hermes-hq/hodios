---
schema: 1
id: community-group-founding-track
kind: workflow
title: Found a community group
description: Founds a community group or small nonprofit in gated steps - the need and existing groups, a founding team, a simple structure and bank account to check, a pilot activity and first funding.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, plan, build, ship]
role: [founder, individual]
subject: [nonprofit]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, docs, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [community-group, grassroots, founding-team, constitution, pilot-project, small-grants]
pairs_with:
  prompts: [recruit-volunteers, write-grant-application, write-case-for-support, design-social-enterprise-model]
  personas: [nonprofit-advisor, social-entrepreneur-mentor]
args:
  - name: cause
    description: The need you want to meet and for whom (for example "isolated older people on our estate", "free bike repairs for refugees", "a youth football club"), what you have seen that shows the need, and who is already helping.
    type: text
    required: true
  - name: country
    description: Country and town or area, used only to frame what to check about structures, registration and safeguarding.
    type: string
    required: true
steps:
  - {id: need, file: steps/01-need-and-landscape.md, stage: discover, gate: approve, artifact: "community-group/01-need.md"}
  - {id: team, file: steps/02-founding-team.md, stage: plan, gate: approve, artifact: "community-group/02-team.md"}
  - {id: structure, file: steps/03-structure-and-bank.md, stage: build, gate: approve, artifact: "community-group/03-structure.md"}
  - {id: pilot, file: steps/04-pilot.md, stage: ship, gate: approve, artifact: "community-group/04-pilot.md"}
  - {id: funding, file: steps/05-first-funding.md, stage: plan, gate: none, artifact: "community-group/05-funding.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a person or a few neighbours from "someone should do something about this" to a small, running community group with a pilot activity and its first funding. It deliberately starts light: test the need and the activity before registering a formal charity or company, and decide on a heavier structure once the group knows what it does. Each step stops for approval.

<cause>
{{cause}}
</cause>

Country and area: {{country}}

Rules for every step:
- Use only facts the founder gives. Never invent local organisations, funders, grant amounts or legal rules; mark gaps as [X].
- Structures, registration thresholds, tax, insurance and safeguarding rules differ by country; list them as checks with the official regulator, a local voluntary-sector support body or a lawyer.
{{> guardrails/professional-limits}}
- Design with the people the group serves, not only for them.
- If the work involves children or adults at risk, safeguarding checks and a policy come before any activity.
- End every step with open questions.
