---
schema: 1
id: execute-region-failover
kind: prompt
title: Execute a region or zone failover
description: Runs a failover to another region or zone during a provider outage, with go or no-go checks, data-loss assessment, traffic shift, verification and a failback plan.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [text, config]
output: [checklist, plan, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [failover, multi-region, disaster-recovery, rpo, failback]
pairs_with:
  prompts: [design-multi-region-architecture, plan-disaster-recovery, write-incident-update]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: situation
    description: What is down (a zone, a region, a provider service), since when, what the provider says, current user impact, and how long you expect it to last if known.
    type: text
    required: true
  - name: topology
    description: The standby region or zone and its state (warm, cold, active-active), how data replicates (async or sync, lag right now), how traffic is routed (DNS, global load balancer, anycast), and the failover runbook if one exists.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Go or no-go, Data-loss assessment, Failover steps, Verify, Failback plan, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an incident team decide on and run a failover. Failing over is a decision, not a reflex: it costs data with asynchronous replication (whatever had not replicated is lost or must be reconciled later), it has a risk of its own (an untested standby, missing capacity, configuration drift, secrets or quotas not present in the other region), and it is often slower than the provider's recovery. Experts decide with three numbers: expected outage duration, failover time including warm-up and verification, and data at risk (current replication lag). They also guard against split-brain: if the old primary comes back while the new one takes writes, two databases diverge. That means fencing the old primary (stopping writes or cutting its traffic) before promoting the new one. Traffic shifts via DNS are slowed by TTLs and client caching; global load balancers shift faster. Plan failback before failing over, since returning is a second migration with the same risks.
</context>

<task>
<situation>
{{situation}}
</situation>

<topology>
{{topology}}
</topology>

1. Go or no-go: weigh expected outage duration against failover time and risk, and data at risk from replication lag. List the checks that must pass in the standby before committing: capacity and quotas, latest deploy version and config, secrets and certificates, dependent services available there, replication state. Give a recommendation and ask the incident commander to decide.
2. Data-loss assessment: what may be lost or diverge given the replication type and lag, and how it will be recorded for later reconciliation.
3. Failover steps in order, each with an owner placeholder and a check before moving on: freeze or stop writes in the failing region where possible, fence the old primary, promote the standby database, scale up standby compute, switch background jobs and schedulers so they run in one region only, shift traffic (with the TTL or propagation expectation), and announce.
4. Verify: synthetic checks and real user journeys from outside, error rates and latency in the new region, job and queue processing, data writes landing in the new primary.
5. Failback plan: conditions to return, how to resync the old region from the new primary, the reconciliation of diverged data, and a scheduled window rather than an immediate return.
</task>

<constraints>
- Never present failover as the default; say plainly when waiting is the better option.
- Every step that changes production is marked and requires the incident commander's go-ahead; do not phrase steps as already done.
- Always include fencing of the old primary before promotion, and say what happens if it is skipped.
- Do not invent provider commands, region names or recovery estimates; use placeholders and the user's runbook.
- Ask for current replication lag if it is not given; do not assume zero.
{{> output/uncertainty}}
</constraints>

<output_format>
## Go or no-go
The three numbers, standby checks as a checklist, and a recommendation.

## Data-loss assessment
What may be lost, how much, and how it will be reconciled.

## Failover steps
Numbered, each with owner placeholder, action and check.

## Verify
Checks and expected results.

## Failback plan
Conditions, resync, reconciliation, timing.

## Summary
Decision, current step, next checkpoint.
</output_format>
