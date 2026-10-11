---
schema: 1
id: plan-maintenance-window
kind: prompt
title: Plan a production maintenance window
description: Plans a planned production maintenance with a minute-by-minute run sheet, go or no-go checks, a point of no return, a tested rollback, verification and a customer notice schedule.
category: incident
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [sre, devops-engineer, dba, backend-engineer]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [planned-maintenance, run-sheet, go-no-go, change-management, customer-notice]
pairs_with:
  prompts: [write-runbook, write-incident-update, decide-rollback-or-fix-forward]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: change
    description: What the maintenance does, for example "move the primary database to a new instance class" or "upgrade the message broker cluster", and the systems it touches.
    type: text
    required: true
  - name: constraints
    description: Allowed window and time zone, expected downtime or degradation, who must be present, customer notice commitments, and anything rehearsed already.
    type: text
    required: true
  - name: customers
    description: Who is affected and where they are, so the window and notices fit their time zones.
    type: string
---
<context>
You plan a planned maintenance so it is boring. Maintenances that go badly share causes: steps that were never rehearsed; no agreed point at which the team stops and rolls back; a rollback that was assumed but not tested, or that becomes impossible after a certain step; the window overrun because the slowest step was timed on a small dataset; cron jobs, queues or integrations that hit the system mid-change; monitoring silenced too broadly and left silenced; and customers told late or in the wrong time zone. A good plan names a go or no-go check before starting, a point of no return, a time-boxed decision to roll back, and an owner for every step.

<change>
{{change}}
</change>

<constraints_given>
{{constraints}}
</constraints_given>

{{#customers}}Customers: {{customers}}{{/customers}}
</context>

<task>
1. Summarise the change, the expected user impact and the risk. List the assumptions you are making and what must be confirmed.
2. List the preparation: rehearsal on production-like data with timings, backups taken and restore-tested, rollback rehearsed, access and credentials verified, dependent jobs and integrations identified, stakeholders and on-call informed, status page and notices scheduled.
3. Write the go or no-go checklist for the start of the window: system health, backup completed, people present, no active incident, no conflicting change.
4. Write the run sheet: numbered steps with an owner role, expected start time and duration, the command or action in words, how to verify it worked, and the rollback for that step. Mark the point of no return and what changes after it.
5. Set the rollback decision rule: the time by which, if not at a given step, the team rolls back, so the rollback fits in the remaining window.
6. Handle the edges: pause and resume of scheduled jobs and consumers, alert silences scoped narrowly with an expiry, cache and DNS effects, traffic drain and restore.
7. Write the verification and close-out: smoke tests, metrics to watch for a stated period, silences removed, notices updated, and a short note for the change log.
8. Draft the customer notices: advance notice, start, completion, and an overrun or rollback message, with times in the customers' time zones.
</task>

<constraints>
- Do not invent commands, versions or durations. Give durations as placeholders unless the user provided rehearsal timings, and say timings must come from a rehearsal.
- If there is no tested rollback for a step, say so plainly and treat that step as the point of no return.
- Do not promise customers a downtime length that the plan does not support.
- Keep silences scoped to affected alerts with an expiry; never suggest silencing everything.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary and assumptions
Short paragraph and bullets.
## Preparation
Checklist with owner roles.
## Go or no-go
Checklist.
## Run sheet
Table: step | owner | start | duration | action | verify | rollback. Point of no return marked.
## Rollback rule
Two or three sentences.
## Edges
Bullets.
## Verify and close
Checklist.
## Customer notices
Each notice with when it goes out.
</output_format>
