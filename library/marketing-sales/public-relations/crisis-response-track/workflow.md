---
schema: 1
id: crisis-response-track
kind: workflow
title: Crisis response track
description: Runs communications through a live crisis - triage, first statement, stakeholders and media, updates to resolution, and an after-action review - pausing for approval at each step.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan, build, operate, review]
role: [executive, marketer, founder, operations-manager]
requires: [none]
inputs: [text, notes, message]
output: [plan, copy, table, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [crisis-communications, incident-response, holding-statement, stakeholder-updates, after-action-review]
pairs_with:
  prompts: [write-holding-statement, write-public-apology-statement, reply-to-journalist-request, build-crisis-comms-plan]
  personas: [pr-strategist]
args:
  - name: situation
    description: What is happening as far as you know, when it started, who is affected, what is already public, and what is being done.
    type: text
    required: true
  - name: confirmed_facts
    description: Only the facts confirmed by the people responsible. Keep rumours and suspicions in the situation field.
    type: text
    required: true
  - name: organisation
    description: Who you are, your sector and country, the crisis team you have, and any existing crisis plan. Optional.
    type: text
  - name: slug
    description: Short kebab-case name for the incident, used for the folder the step artifacts are saved in.
    type: string
    default: incident
steps:
  - {id: triage, file: steps/01-triage.md, stage: plan, gate: approve, artifact: "crisis/{{slug}}/01-triage.md"}
  - {id: first-statement, file: steps/02-first-statement.md, stage: build, gate: approve, artifact: "crisis/{{slug}}/02-first-statement.md"}
  - {id: stakeholders-and-media, file: steps/03-stakeholders-and-media.md, stage: operate, gate: approve, artifact: "crisis/{{slug}}/03-stakeholders-and-media.md"}
  - {id: updates, file: steps/04-updates.md, stage: operate, gate: approve, artifact: "crisis/{{slug}}/04-updates.md"}
  - {id: after-action, file: steps/05-after-action.md, stage: review, gate: none, artifact: "crisis/{{slug}}/05-after-action.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs the communications side of a live crisis the way an experienced crisis adviser would: triage first, say something true quickly, tell the right people in the right order, keep updates on a promised rhythm until the matter is resolved, then learn from it. Each step writes one artifact and stops for approval, because facts change fast and a human must decide what goes out. Later steps build on approved artifacts and on any new confirmed facts the user adds.

<situation>
{{situation}}
</situation>

<confirmed_facts>
{{confirmed_facts}}
</confirmed_facts>
{{#organisation}}
<organisation>
{{organisation}}
</organisation>
{{/organisation}}

Rules for every step:
- People's safety comes before reputation. If anyone may be in danger, the first line of every artifact says what they should do.
- Only confirmed facts go into anything external. Keep a running list of what is confirmed, what is unconfirmed and who is checking it, and ask for updated confirmed facts at the start of each step.
- No speculation about cause, scale or blame; no "no comment"; no reassurance the facts do not support.
- Recommend legal review of external statements, and flag regulatory, insurer or authority notification duties for the user to confirm with advisers. Never state a legal deadline as fact.
- Never name or describe affected individuals, and never draft anything meant to mislead, conceal or deny something that happened.
