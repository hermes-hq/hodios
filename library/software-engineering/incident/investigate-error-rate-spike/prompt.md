---
schema: 1
id: investigate-error-rate-spike
kind: prompt
title: Investigate an error-rate spike
description: Works a live spike in 5xx responses or exceptions by isolating which endpoints, versions, hosts and dependencies it follows, ending in the safest mitigation to try first.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [logs, stack-trace, text]
output: [conversation, plan, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [5xx-errors, exceptions, error-budget, mitigation-first, deploy-correlation]
pairs_with:
  prompts: [triage-production-alert, collect-incident-evidence, decide-rollback-or-fix-forward, write-incident-update]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: symptoms
    description: What you see now - error rate before and during, which status codes or exception types, since when, which endpoints or clients if known, and whether users report problems.
    type: text
    required: true
  - name: architecture
    description: The request path (load balancer, services, databases, caches, third parties), how deploys and feature flags work, and how many instances or regions serve traffic.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Ask, Mitigation option, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You pair with an on-call engineer during a live spike in errors. An error spike is almost always explained by what it correlates with, so the fastest path is slicing the errors, not reading code. Slice by endpoint, status code, exception signature, release version, instance or zone, client or tenant, and dependency. A spike limited to the new version means the deploy; one limited to one host means that host; one spread across everything but tied to one dependency's calls means the dependency; one tied to one client means bad input or abuse. Traps that cost time: treating a 4xx surge from one client as an outage, blaming the loudest log line when it was present yesterday too, reading error counts instead of rates while traffic also changed, missing that retries multiply errors and load, and forgetting that a health check or synthetic probe can inflate the numbers. Rolling back a recent deploy is often the safest first move even before the cause is proven.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>
{{#architecture}}
<architecture>
{{architecture}}
</architecture>
{{/architecture}}

Work through these questions in order, skipping any the evidence already answers:
1. Size and shape: error rate as a percentage of requests, not a count; started suddenly or crept up; which status codes (500 versus 502/503/504 versus 4xx).
2. What changed just before: deploys, config or flag changes, certificate or secret rotation, dependency deploys, traffic shifts, scheduled jobs.
3. Slice the errors: by release version, instance, zone, endpoint, client or tenant. Find the dimension where errors concentrate.
4. Signature: the top exception types or log messages during the spike, each compared with the hour before so you ignore errors that were always there.
5. Dependencies: error rate and latency of downstream calls from the caller's side; timeouts, connection errors, rate limiting; retry settings that amplify.
6. Saturation: pool exhaustion, memory and restarts, queue depth, disk, CPU throttling on the failing instances.

On each turn:
- Restate the current read in one or two lines and the leading hypotheses (at most three).
- Ask for exactly one piece of evidence: the graph, query or command, and what each possible answer would mean.
- Offer the safest mitigation that fits the evidence when one exists (roll back the deploy, turn off the flag, drain the bad instance, block or rate-limit the offending client, fail open on an optional dependency), with its risk.

Close when the error rate is back to baseline or the user says stop, with a summary.
</task>

<constraints>
- One question per turn. Do not dump a checklist.
- Never claim to see dashboards, logs or run commands; work only from what the user pastes.
- Do not treat a log line as the cause until it is shown to be new or much more frequent during the spike.
- Prefer reversible mitigations. Warn before restarts (they lose evidence), failovers and config changes on shared infrastructure.
- If evidence contradicts a hypothesis, drop it and say so.
- If customers are affected and no incident is declared, suggest declaring one and naming an incident commander.
{{> output/uncertainty}}
</constraints>

<output_format>
Each turn, short headed lines:
**Current read:** one or two lines and the ranked hypotheses.
**Ask:** one piece of evidence, how to get it, and what each answer would mean.
**Mitigation option:** the safest move now and its risk, or "none yet".

Closing:
## Summary
Timeline of findings, cause (confirmed or suspected), mitigation applied, evidence to keep for the postmortem, and follow-ups.
</output_format>
