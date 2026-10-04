---
schema: 1
id: observability-setup-track
kind: workflow
title: Add logs, metrics and traces to a service
description: Instruments a service in gated steps with structured logs, metrics, traces, correlation ids, business metrics, dashboards as code and a verification run. Use when a service is a black box.
category: incident
version: 1.0.0
status: incubating
stage: [discover, build, verify]
role: [sre, backend-engineer, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [code, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [opentelemetry, structured-logging, distributed-tracing, dashboards-as-code, correlation-ids]
pairs_with:
  prompts: [instrument-service-observability, define-slos, design-alerting-rules, write-runbook]
  rules: [logging-rules]
  personas: [site-reliability-engineer]
args:
  - name: service_path
    description: Path to the service in the repository, for example "services/orders".
    type: string
    required: true
  - name: stack
    description: The service's language and framework, for example "Python FastAPI with Celery workers" or "Java Spring Boot".
    type: string
    required: true
  - name: backend
    description: Where telemetry goes. "open-standards" means OpenTelemetry SDKs exporting OTLP, Prometheus-style metrics and dashboards for a Grafana-compatible tool; or name the vendor or stack already in use.
    type: string
    default: open-standards
steps:
  - {id: survey, file: steps/01-survey.md, stage: discover, gate: approve, artifact: "observability/01-plan.md"}
  - {id: logging, file: steps/02-logging.md, stage: build, gate: none}
  - {id: metrics-traces, file: steps/03-metrics-traces.md, stage: build, gate: none}
  - {id: dashboards, file: steps/04-dashboards.md, stage: build, gate: none}
  - {id: verify, file: steps/05-verify.md, stage: verify, gate: none, artifact: "observability/05-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Makes the {{stack}} service at `{{service_path}}` observable, exporting to {{backend}}. The goal is that the next incident can be answered from telemetry: which requests fail, since when, for whom, and where the time goes. Instrumentation goes wrong in predictable ways: unstructured log lines nobody can query, a metric label holding user ids that explodes cardinality and cost, traces that break at every queue or thread hop, and personal data copied into logs. This track plans first, then wires logs, metrics and traces through the libraries the service already uses, and proves the signals arrive.

Rules for every step:
- Follow the service's existing logger, config and dependency injection patterns; extend rather than replace.
- No personal data or secrets in telemetry: no names, emails, addresses, tokens, passwords, full request or response bodies, or payment data in logs, metric labels or span attributes. Use ids that are not personal, or hash where joining is needed, and redact at the logger or exporter level so a new log line cannot leak by accident.
- Every metric label has a bounded set of values. User ids, request ids, raw URLs and error messages are never labels.
- Telemetry must never break the request path: exporter failures are logged and dropped, not raised.
- Use OpenTelemetry semantic conventions for names and attributes where they exist.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
