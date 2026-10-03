---
schema: 1
id: design-alerting-rules
kind: prompt
title: Design actionable alerting rules
description: Designs actionable alerts from SLOs and user-facing symptoms, with thresholds, routing, runbook links, and a list of noisy alerts to delete. Use when pages are noisy or real outages go unnoticed.
category: incident
version: 1.0.0
status: incubating
stage: [design, operate]
role: [sre, devops-engineer, backend-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [config, text, logs]
output: [config, table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [alerting, burn-rate, slo-alerts, alert-fatigue, prometheus]
pairs_with:
  personas: [site-reliability-engineer]
  prompts: [define-slos, write-runbook, design-on-call-rotation, instrument-service-observability]
args:
  - name: service_and_metrics
    description: The service, its users and SLOs if any, the metrics available (names and labels), current alert rules, and recent page history (which alerts fired, how often, and whether anyone acted).
    type: text
    required: true
  - name: format
    description: Rule format to write.
    type: enum
    enum: [prometheus, datadog, cloudwatch, generic]
    default: generic
output_contract:
  format: markdown
  sections: [Assumptions, Alert design, Rules, Routing, Delete or demote, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A page should mean "users are hurt or soon will be, and a human must act now". Pages on causes (CPU at 80%, a pod restarted, a queue non-empty) fire when nothing is wrong and stay silent when something new breaks. Alerts on symptoms users feel (errors, latency, freshness, availability) tied to SLOs catch every cause. Multi-window, multi-burn-rate alerts on the error budget page fast for severe problems and open tickets for slow burns, with few false positives. Everything else is a ticket, a dashboard, or deleted.
</context>

<task>
Design the alerts for:
<service_and_metrics>
{{service_and_metrics}}
</service_and_metrics>
Write rules in {{format}} format.

1. State the SLOs you will alert on. If none are given, propose provisional SLIs and targets from the service's purpose (availability as successful requests over valid requests, latency as the share of requests under a threshold, freshness for pipelines), mark them as assumptions, and recommend confirming them.
2. Design burn-rate alerts per SLO. Default for a 30-day window: page when 2% of the budget burns in 1 hour (burn rate 14.4, checked over 1 hour and 5 minutes), page when 5% burns in 6 hours (burn rate 6, over 6 hours and 30 minutes), and open a ticket when 10% burns in 3 days (burn rate 1, over 3 days and 6 hours). Show the arithmetic for this service's target. Adjust if traffic is too low for ratios to be meaningful, and say how (minimum request counts, longer windows, synthetic probes).
3. Add the few cause-based alerts that are worth paging on because they predict imminent user harm with no symptom yet: certificate expiry within days, disk full within hours at the current growth rate, a dead-letter queue growing, a job that has not succeeded within its window. Prefer predictive forms (time to full) over static thresholds.
4. For every alert define: name, expression, `for` duration, severity (page or ticket), owner, a summary that says what users are experiencing, and a runbook link placeholder.
5. Routing: page versus ticket, quiet hours for non-urgent alerts, grouping and inhibition so one outage produces one page, and dependency-aware suppression.
6. Review the existing rules and page history: list alerts to delete, demote to a ticket or dashboard, or merge, with the reason (fired without action, duplicate, cause not symptom, threshold never meaningful).
</task>

<constraints>
- Use only metric names and labels from the input; where you need one that is not there, write it as a placeholder and list it under Gaps.
- Every paging alert must be actionable and have an owner and a runbook placeholder. If you cannot say what the responder would do, it does not page.
- Do not alert on averages for latency; use percentiles or threshold ratios.
- Keep the total number of paging alerts small; justify each one beyond the SLO burn-rate alerts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets, including provisional SLOs.
## Alert design
A table: alert, type (burn-rate, predictive, cause), severity, why it pages or tickets, what the responder does.
## Rules
One fenced block with all rules in the chosen format.
## Routing
Bullets or a routing config sketch.
## Delete or demote
A table: existing alert, action (delete, demote, merge), reason.
## Gaps
Missing metrics or instrumentation needed, or "None".
</output_format>
