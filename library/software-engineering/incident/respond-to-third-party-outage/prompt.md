---
schema: 1
id: respond-to-third-party-outage
kind: prompt
title: Respond to a third-party provider outage
description: Handles an outage at a critical SaaS or API provider - confirms it, degrades gracefully, queues work, keeps users informed and recovers the backlog when it returns.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [logs, text]
output: [plan, checklist, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [dependency-outage, graceful-degradation, circuit-breaker, backlog-recovery, vendor-outage]
pairs_with:
  prompts: [escalate-incident-to-vendor, write-incident-update, drain-queue-backlog]
  personas: [incident-commander]
args:
  - name: situation
    description: Which provider (payments, email, SMS, auth, maps, an AI API, cloud service), what fails and how (errors, timeouts, partial), since when, what the provider's status page says, and the user impact so far.
    type: text
    required: true
  - name: integration
    description: How your system calls the provider - synchronous in the request path or from background jobs, timeouts and retries, any queue, fallback provider, or cached data, and what features depend on it.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Contain now, Degrade gracefully, Communicate, Recover the backlog, Afterwards, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team whose product is hurt by someone else's outage. You cannot fix the provider, but you control the blast radius. First confirm it is the provider and not you: an expired API key, a rate limit you hit, a regional endpoint, a DNS or egress change on your side all look like a provider outage. Provider status pages lag reality, so trust your own error rates. The biggest damage often comes from your own reaction: synchronous calls with long timeouts tie up request threads and take down unrelated pages; retries without backoff hammer the provider and your own queues; and when the provider returns, a backlog replayed at full speed hits its rate limits or sends duplicates. Experts keep critical paths alive (let users finish what they can, queue what can wait, switch to a fallback where one exists and was tested), make failures explicit to users instead of spinning, and plan the replay: idempotency keys so retried payments or messages are not doubled, rate-limited drain, and a check for work that went through on the provider side even though you recorded a timeout.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#integration}}
<integration>
{{integration}}
</integration>
{{/integration}}

1. Current read: is it confirmed on the provider side (their status, errors across all your regions and keys, community reports) or possibly yours. Give the one check that would rule out your side if not done.
2. Contain now: stop the outage spreading into your system - shorten timeouts, open a circuit breaker or disable the feature with a flag, stop or slow retries, protect thread and connection pools.
3. Degrade gracefully: per affected feature, what users can still do (queue and confirm later, cached data, fallback provider, manual process, a clear message) and the risk of each choice.
4. Communicate: what to tell users and support, whether to name the provider (usually say "a provider we rely on"), and the update cadence; open a case with the provider if the contract gives support.
5. Recover the backlog: when to resume (provider confirms plus your own successful test calls), order of replay, rate limit, idempotency, and how to reconcile operations that timed out but may have succeeded.
6. Afterwards: timeouts and breakers on this dependency, a tested fallback or queue, alerting on its error rate, and the provider's SLA terms for credits.
</task>

<constraints>
- Do not assume the provider is at fault until evidence rules out your side.
- Never recommend replaying payments, charges, refunds or outbound messages without idempotency or a reconciliation check against the provider's records.
- Do not suggest switching to an untested fallback provider in the middle of an incident without stating the risk; prefer degrading.
- Do not quote SLA terms or credits you have not been given; tell the user to check the contract.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current read
Confirmed provider outage or not yet, and impact.

## Contain now
Numbered actions.

## Degrade gracefully
Table: Feature | Fallback | Risk.

## Communicate
Audience, message points and cadence.

## Recover the backlog
Steps, rate, idempotency and reconciliation.

## Afterwards
Hardening actions.

## Summary
State now and next decision point.
</output_format>
