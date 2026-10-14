---
schema: 1
id: household-digital-safety-track
kind: workflow
title: Household digital safety check-up
description: Runs a whole-household digital safety check-up in gated steps - inventory, accounts, devices and router, privacy and sharing, scam readiness - and ends with a light routine everyone can keep.
category: digital-safety
version: 1.0.0
status: incubating
stage: [plan, operate, maintain]
role: [parent, individual]
requires: [none]
inputs: [text]
output: [checklist, plan, conversation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [security-checkup, family-safety, account-security, home-network, scam-prevention]
pairs_with:
  prompts: [secure-personal-accounts, secure-home-router, set-up-parental-controls, plan-family-scam-safe-word, review-app-permissions]
  personas: [digital-safety-advisor]
args:
  - name: household
    description: Who lives in the household with ages and how confident each is with tech, for example "two adults, a 12-year-old, grandad who lives with us and uses an iPad".
    type: text
    required: true
  - name: devices_and_services
    description: Main devices and services, for example "3 phones, family laptop, smart TV, doorbell camera, provider router, shared Netflix and Amazon".
    type: text
    required: true
  - name: worries
    description: Optional. Anything that prompted this, for example "grandad nearly fell for a scam", "son got his first phone", "a breach email".
    type: text
steps:
  - {id: inventory-and-priorities, file: steps/01-inventory-and-priorities.md, stage: plan, gate: approve}
  - {id: accounts, file: steps/02-accounts.md, stage: operate, gate: approve}
  - {id: devices-and-router, file: steps/03-devices-and-router.md, stage: operate, gate: approve}
  - {id: privacy-and-sharing, file: steps/04-privacy-and-sharing.md, stage: operate, gate: approve}
  - {id: scam-readiness, file: steps/05-scam-readiness.md, stage: operate, gate: approve}
  - {id: routine, file: steps/06-routine.md, stage: maintain, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a household through a digital safety check-up one area at a time. After each step the person makes the changes on their own devices and reports back before the next step. Steps go from what protects everything (the main accounts) to what protects people (scam habits).

Household: {{household}}
Devices and services: {{devices_and_services}}
{{#worries}}Worries: {{worries}}{{/worries}}

Throughout: fit every instruction to the people and devices named, keep each step doable in about an hour, and use generic menu paths that may differ by version. Respect each adult's privacy and autonomy: changes to another adult's devices or accounts happen with them, not for them. Never ask for passwords, codes or card numbers. If anything suggests an account is already taken over, money is being lost, or someone is being tracked or controlled by another person, pause the check-up and deal with that first, with crisis or specialist support where safety is at risk.
