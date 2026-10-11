---
schema: 1
id: review-observability-in-diff
kind: prompt
title: Review logs, metrics and traces in a diff
description: Reviews the logging, metrics and tracing in a change, checking that the new path can be debugged in production without leaking personal data, exploding metric cardinality or flooding logs.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, sre, software-engineer]
requires: [none]
inputs: [diff, file]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [logging, telemetry, metric-cardinality, tracing, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [design-alerting-rules, design-service-dashboard, review-diff-for-personal-data, review-error-handling]
args:
  - name: diff
    description: The code change, with file paths.
    type: text
    required: true
  - name: conventions
    description: Your logging and metrics setup, for example structured JSON logs, log levels policy, metrics library, tracing system, and what is forbidden in logs.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Can we debug it, Findings, Suggested additions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Telemetry is reviewed least and needed most at 3 a.m. A change can pass every test and still be undebuggable: the new failure path logs "error occurred" with no ids, a retry loop logs at error level on every attempt and buries the real alert, a metric label holds user ids or URLs and multiplies time series until the metrics backend falls over or the bill spikes, a log line prints a whole request object including tokens and email addresses, or an async hop drops the trace context so the trace stops at the queue. The useful question is: when this code misbehaves in production, which signal tells us, and does it tell us enough to act?
</context>

<task>
<diff>
{{diff}}
</diff>

{{#conventions}}
<conventions>
{{conventions}}
</conventions>
{{/conventions}}

1. Identify the new or changed behaviours that could fail or slow down in production (external calls, queues, background jobs, new endpoints, feature-flagged paths).
2. For each, answer: would we know it is failing (a metric or log at the right level), could we find a specific occurrence (correlation, request or entity ids), and could we tell why (error cause, inputs that matter, timing)?
3. Check logs: structured fields rather than interpolated strings, levels that match severity (expected business outcomes are not errors), volume in hot loops or retries, exceptions logged once with stack trace rather than at every layer, and no secrets, tokens or personal data (log ids, not emails or bodies).
4. Check metrics: names and units following conventions, counters versus gauges versus histograms used correctly, latency as histograms rather than averages, and label values from a small bounded set (never user ids, raw URLs with ids, free text or error messages).
5. Check traces: spans around new external calls, context propagated across threads, queues and async jobs, and useful span attributes without personal data.
6. Rate each finding: high (personal data or secret leak, unbounded cardinality, failure invisible), medium, low.
</task>

<constraints>
- Cite `path:line` and give the corrected log or metric call in the code's own language and library.
- Do not demand telemetry on trivial code; tie each addition to a failure it would reveal.
- Follow the given conventions over generic advice.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Can we debug it
Table: behaviour, would we know, could we find it, could we tell why.
## Findings
Numbered: severity, `path:line`, problem, fix.
## Suggested additions
Bullets: the metric, log or span to add and the failure it reveals.
</output_format>
