---
schema: 1
id: implement-graceful-shutdown
kind: prompt
title: Implement graceful shutdown for a service
description: Makes a service stop cleanly on SIGTERM by leaving rotation, draining in-flight requests and jobs, and closing connections before a deadline. Use when deploys drop requests or lose work.
category: implementation
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, devops-engineer, sre, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [code, config, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [graceful-shutdown, sigterm, zero-downtime, deployments, reliability]
pairs_with:
  prompts: [implement-health-checks, implement-message-queue-consumer, write-kubernetes-manifests]
  personas: [backend-engineer]
args:
  - name: service
    description: What the process runs (HTTP server, queue consumers, scheduled jobs, websockets) and the symptoms seen during deploys.
    type: text
    required: true
  - name: platform
    description: Where it runs and how it is started, for example "Kubernetes, Dockerfile CMD npm start". Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Shutdown sequence, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer fixing errors and lost work during deploys. The orchestrator sends SIGTERM, waits a grace period (30 seconds by default in Kubernetes), then sends SIGKILL. A clean shutdown, in order:
1. Fail readiness so no new traffic is routed. Load balancers and endpoint lists take a few seconds to notice, so keep serving during a short delay (a `preStop` sleep or an in-app wait) before closing the listener.
2. Stop accepting new connections and requests; let in-flight requests finish; close idle keep-alive connections.
3. Stop consumers from fetching, finish or release in-flight messages, then commit or acknowledge. Stop schedulers from starting new runs; long jobs either finish within the deadline or checkpoint and requeue their work.
4. Flush logs, metrics and traces; close database pools and clients.
5. Exit within the deadline, leaving margin before SIGKILL. A second signal or the deadline forces exit.

Common reasons it never runs: the app is not PID 1 and the shell or `npm start` does not forward signals (use the exec form of `CMD`, run the binary directly, or use an init such as `tini` or `docker run --init`); the handler is registered after a slow startup; or a library swallows the signal. Framework specifics: Go's `http.Server.Shutdown` with `signal.NotifyContext`; Node's `server.close()` plus closing idle connections; Spring Boot's `server.shutdown=graceful` with `spring.lifecycle.timeout-per-shutdown-phase`; gunicorn and uvicorn graceful timeouts; ASP.NET Core's host shutdown timeout. Long-lived connections (WebSockets, server-sent events) need an explicit close with a reconnect hint.
</context>

<task>
Implement graceful shutdown for:
{{service}}

{{#platform}}Platform: {{platform}}{{/platform}}

1. Read the entry point, server setup, consumers, schedulers, Dockerfile and deployment configuration. Check how the process is started and whether it receives signals.
2. Write the shutdown sequence for this service with timings that fit inside the platform's grace period.
3. Implement the signal handling, readiness flip, draining of each component in order, the forced-exit deadline, and the container and deployment changes (exec form, init, grace period, `preStop`).
4. Write a test that starts the service, sends SIGTERM during an in-flight request or job, and asserts it completes and the process exits cleanly. Run it and the type check.
</task>

<constraints>
- Do not send signals to processes other than ones the test itself started.
- Do not apply deployment changes to a live cluster; change the files and list what must be deployed.
- Never invent library functions or configuration keys; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Shutdown sequence
Numbered steps with the time budget for each and the total against the grace period.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results.
</output_format>
