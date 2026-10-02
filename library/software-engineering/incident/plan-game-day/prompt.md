---
schema: 1
id: plan-game-day
kind: prompt
title: Plan a game day or chaos exercise
description: Plans a game day or chaos exercise with failure scenarios, hypotheses, blast-radius limits, abort criteria, roles, an observation checklist and a follow-up review. Use to test resilience.
category: incident
version: 1.0.0
status: experimental
stage: [plan, verify]
role: [sre, devops-engineer, engineering-manager, tech-lead]
requires: [none]
inputs: [spec, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chaos-engineering, resilience-testing, failure-injection, incident-response]
pairs_with:
  prompts: [write-runbook, define-slos, plan-disaster-recovery, write-postmortem]
  personas: [incident-commander]
args:
  - name: system
    description: The system under test - architecture, critical user journeys, dependencies, redundancy, current alerts and runbooks, and past incidents.
    type: text
    required: true
  - name: scenarios_of_interest
    description: Failures the team worries about or wants to rehearse (a zone outage, a slow dependency, a bad deploy, credential expiry, a full disk).
    type: text
  - name: environment
    description: Where the faults will be injected. Production requires extra prerequisites and approvals.
    type: enum
    enum: [staging, production]
    default: staging
output_contract:
  format: markdown
  sections: [Goals, Scenarios, Prerequisites, Blast radius and abort criteria, Roles, Run sheet, Observation checklist, Follow-up review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A game day tests two things at once: whether the system degrades the way the team believes it will, and whether people detect, diagnose and recover the way the runbooks say. It is an experiment, so each scenario needs a hypothesis written down before the fault is injected, and a way to stop immediately if reality diverges. Exercises go wrong when the blast radius is not limited, nobody owns the abort decision, monitoring is not working before the start, or findings are written up and never acted on.
</context>

<task>
Plan a game day for this system, injecting faults in {{environment}}:
{{system}}
{{#scenarios_of_interest}}

Scenarios the team cares about: {{scenarios_of_interest}}
{{/scenarios_of_interest}}

1. Set the goals: which resilience claims and which response skills are being tested, and what the team wants to learn. Keep it to what fits in one session of two to four hours.
2. Choose three to five scenarios. Draw them from the team's concerns, past incidents, single points of failure and critical dependencies. Order them from least to most disruptive. For each:
   - The fault and how it is injected (stopping instances or pods, adding latency or errors between services, blocking a dependency's network access, filling a disk, expiring a credential, failing over a database), named as a technique with examples of tools.
   - The steady state: the user-facing metrics that define "working" and their normal values.
   - The hypothesis: "When this happens, users see X, alert Y fires within N minutes, and runbook Z restores service within M minutes."
   - Whether responders know the scenario in advance (a rehearsal) or not (a detection test).
3. Limit the blast radius: the smallest scope that tests the hypothesis (one instance, one zone, a small traffic share, internal or test accounts), a time limit per scenario, and how the fault is removed. Test the removal mechanism before the session starts.
4. Write abort criteria that any participant can call: user impact beyond an agreed threshold, an error budget burn rate, data integrity doubts, an unrelated real incident, or behaviour nobody can explain. Say who executes the abort and how.
5. List the prerequisites: monitoring and alerting confirmed working, backups recent, rollback ready, a quiet period with no deploys, stakeholders and support informed, and a communication channel. For production, add approval from the service owner, error budget remaining, customer-facing teams on alert, and a start in staging first unless the same scenario has already passed there.
6. Assign roles: facilitator, fault operator, incident commander for the responders, responders, scribe with a timeline, observers, and a safety owner with abort authority.
7. Write the run sheet: a timed sequence with checks between scenarios and a reset to steady state before the next one.
8. Write the observation checklist: time to detect, which alert fired (or did not), whether dashboards pointed to the cause, runbook accuracy, escalation and handoffs, communication, time to recover, data correctness after recovery, and surprises.
9. Plan the follow-up review within a week: each hypothesis confirmed or refuted, action items with owners and dates, and which scenarios to repeat or automate.

If the system description is missing the critical user journeys or how redundancy works, ask for them before choosing scenarios.
</task>

<constraints>
- No scenario without a written hypothesis, a removal mechanism and abort criteria.
- In production, never inject a fault whose removal is untested or whose blast radius cannot be bounded; say which scenarios must stay in staging and why.
- Do not plan anything that risks permanent data loss or corrupts customer data; simulate those scenarios on copies.
- Name tools only as examples; the plan must work with whatever the team uses.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals
Three to five bullets.

## Scenarios
Per scenario: fault and injection technique, steady state, hypothesis, rehearsal or detection test, blast radius, removal.

## Prerequisites
Checklist with an owner per item.

## Blast radius and abort criteria
Table: scenario | scope | time limit | abort if | who aborts and how.

## Roles
Table: role | responsibilities | person (left blank).

## Run sheet
Timed table: time | step | owner | check before continuing.

## Observation checklist
Checklist the scribe fills in per scenario.

## Follow-up review
Agenda, the action-item template, and the date to schedule it.
</output_format>
