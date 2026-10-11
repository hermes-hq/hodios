---
schema: 1
id: implement-health-checks
kind: prompt
title: Implement liveness and readiness checks
description: Adds liveness, readiness and startup endpoints that check the right dependencies without causing cascading restarts. Use when deploying a service behind Kubernetes or a load balancer.
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
effort: quick
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [health-checks, readiness-probe, liveness-probe, load-balancer, reliability]
pairs_with:
  prompts: [implement-graceful-shutdown, write-kubernetes-manifests, diagnose-crashlooping-pod]
  personas: [backend-engineer]
args:
  - name: service
    description: What the service does and its dependencies (database, cache, queues, other services), and which ones it cannot work without.
    type: text
    required: true
  - name: platform
    description: Where it runs, for example Kubernetes, ECS behind an ALB, Cloud Run, or a VM behind nginx. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer adding health endpoints. Badly designed health checks cause outages: when the database blips, every pod fails its liveness check, gets restarted at once, and the restart storm turns a short blip into a long outage. The rules:
- Liveness answers "is this process stuck and better restarted?". It checks only the process itself (the event loop or server responds) and never external dependencies.
- Readiness answers "should this instance receive traffic now?". It checks the dependencies the service cannot serve without, with short timeouts, and returns failure during startup warm-up and during shutdown. Optional dependencies (a recommendations service, a cache with a database fallback) do not fail readiness.
- A startup probe, or a long initial delay, covers slow boot (migrations, cache warm-up) so liveness does not kill an instance before it starts.
- Checks must be cheap: reuse the existing connection pool with a trivial query, cache the result for a few seconds, and keep each check's timeout below the probe timeout. Health checks that open new connections can exhaust the pool under load.
- Load balancer health checks behave like readiness.
- Endpoints are unauthenticated but reveal nothing sensitive: no versions of dependencies, hostnames or error messages. A detailed status for humans can live on a separate, protected endpoint.
- Probe settings (period, timeout, failure threshold) decide how fast a bad instance leaves rotation and how tolerant the service is of brief blips; set them deliberately.
</context>

<task>
Add health checks to this service:
{{service}}

{{#platform}}Platform: {{platform}}{{/platform}}

1. Read the server setup, dependency clients, startup sequence, shutdown handling and deployment configuration. Find any existing health endpoint and what calls it.
2. Classify each dependency as critical or optional, and state what each endpoint checks.
3. Implement the liveness, readiness and (if needed) startup endpoints with timeouts and short caching, wire readiness to fail during shutdown, and update the probe or load balancer configuration in the repo with justified settings.
4. Write tests for each endpoint with dependencies up, down and slow. Run them and the type check.
</task>

<constraints>
- Never put external dependency checks in liveness.
- Do not apply configuration to a running cluster or cloud account; change the files in the repo and list what must be deployed.
- If an existing endpoint is used by other systems (monitoring, a load balancer), keep its path working or list the callers to update.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Endpoint | Checks | Failure meaning | Probe settings.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results.
</output_format>
