---
schema: 1
id: plan-around-blocked-dependency
kind: prompt
title: Plan around a blocked dependency
description: Plans how to keep work moving when it waits on another team, a vendor or an approval, with an agreed contract to build against, stubs, parallel work, an escalation path and a fallback.
category: planning
version: 1.0.0
status: incubating
stage: [plan, build]
role: [tech-lead, software-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [text, ticket]
output: [plan, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [blocked-work, dependency-management, contract-first, escalation, stubs]
pairs_with:
  prompts: [map-cross-team-dependencies, plan-cross-service-change, replan-slipping-project]
args:
  - name: blocked_work
    description: What your team is building and what exactly it waits for - an API, a decision, access, a vendor feature, a review.
    type: text
    required: true
  - name: dependency_status
    description: Who owns the dependency, what they have said about timing, and how long you have been waiting.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What exactly is blocked, Contract to build against, Work that can proceed now, Escalation, Fallback, Message to the owner]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most "blocked" work is only partly blocked. Teams waiting on another team or a vendor often stop entirely when they could agree the interface now, build against a stub, write the tests, and leave only the final integration for later. The real risk is late integration: the stub drifts from what the other side builds, and the mismatch surfaces on launch week. Good leads pin the contract in writing with the owner, add a contract test, set a date by which the dependency must be ready before a fallback kicks in, and escalate early with facts and a specific ask, not frustration. A fallback (a simpler interim path, a manual process, a different provider, or a reduced scope) turns a hostage situation into a choice.
</context>

<task>
<blocked_work>
{{blocked_work}}
</blocked_work>
<dependency_status>
{{dependency_status}}
</dependency_status>

1. Say exactly what is blocked and what is not, splitting the work into parts that need the dependency and parts that do not.
2. Define the contract to build against: the interface or decision needed, written precisely enough to stub, and how to confirm it with the owner. Add a contract test or check that will catch drift.
3. List work that can proceed now: stubs or fakes, tests, the UI with placeholder data, feature-flagged code paths, documentation, and other backlog items to pull in.
4. Set the escalation path: a need-by date for the dependency and the reason, who to talk to at each step, and the evidence to bring.
5. Define a fallback and the date at which you switch to it if the dependency is not ready.
6. Draft a short, friendly message to the dependency owner that confirms the contract, states the need-by date and why, and asks one specific question.
</task>

<constraints>
- Do not assume bad faith from the other team or vendor; keep the message factual and collaborative.
- Do not invent the other side's API or timelines; mark guessed interface details for confirmation.
- Keep stubs behind flags or in test code so they cannot reach production by accident.
- If nothing can proceed, say so and recommend pulling other work rather than inventing busywork.
</constraints>

<output_format>
## What exactly is blocked
Two lists: blocked, not blocked.
## Contract to build against
The interface or decision, plus the drift check.
## Work that can proceed now
Bullets.
## Escalation
Table: date | step | who | evidence.
## Fallback
The fallback and its switch date.
## Message to the owner
The draft, under 150 words.
</output_format>
