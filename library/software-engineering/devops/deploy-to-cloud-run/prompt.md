---
schema: 1
id: deploy-to-cloud-run
kind: prompt
title: Deploy a container to Cloud Run
description: Deploys a container to Google Cloud Run with concurrency and instance limits, secrets from Secret Manager, a dedicated service identity, a database connection, revision traffic splits and a domain.
category: devops
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [backend-engineer, devops-engineer, fullstack-engineer]
stack: [gcp, docker]
requires: [repo-read, file-write]
inputs: [repo, text]
output: [config, script, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cloud-run, serverless-containers, secret-manager, traffic-splitting, service-identity]
pairs_with:
  prompts: [build-container-image-in-ci, set-up-keyless-ci-deploys, choose-app-hosting]
args:
  - name: service
    description: The service (language, port, whether it holds websockets or long requests, background work), its database and other dependencies, and expected traffic.
    type: text
    required: true
  - name: iac
    description: How the user manages GCP resources, for example gcloud scripts, Terraform or a service YAML.
    type: string
output_contract:
  format: markdown
  sections: [Settings, Config, Identity and secrets, Rollout, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cloud Run runs any container that listens on the injected `PORT`, but its defaults surprise people. With request-based billing, CPU is throttled outside requests, so background threads and fire-and-forget work after the response stall or vanish; that needs instance-based billing or a different design (Cloud Tasks, Cloud Run jobs). Each instance handles many concurrent requests (the default is high), so connection pools must be sized as instances times pool size against the database's connection limit, and `max-instances` is what protects the database. Min instances avoid cold starts at a standing cost. Services run as the default compute service account with broad rights unless a dedicated identity is set. Revisions with traffic tags allow deploying with no traffic, testing, then shifting gradually.
</context>

<task>
Deploy this service to Cloud Run:
<service>
{{service}}
</service>
{{#iac}}
Manage resources with: {{iac}}
{{/iac}}

1. Read the repository: Dockerfile, port handling, startup time, background work after responses, database driver and pool settings, environment variables and secrets used.
2. Fix blockers with small changes: read `PORT`, handle SIGTERM for graceful shutdown, and flag any work done after the response.
3. Choose settings with reasons: region, CPU and memory, request-based or instance-based billing, concurrency, min and max instances, request timeout, and startup probe if startup is slow.
4. Size the database connection pool against max instances times concurrency and the database limit, and connect to Cloud SQL through the connector or the built-in Cloud SQL connection, not a public IP.
5. Create a dedicated service account with only the roles the service needs, and mount secrets from Secret Manager as environment variables or files pinned to versions.
6. Ingress and auth: public, internal or behind a load balancer; whether unauthenticated invocations are allowed.
7. Deploy flow: deploy a new revision with no traffic and a tag, smoke test the tagged URL, then shift traffic (all at once or in steps), and keep the previous revision for rollback.
8. Write the deploy as the chosen IaC or a CI job using workload identity federation, and validate it (for example `terraform validate`) if available.
</task>

<constraints>
- Do not use the default compute service account for the service or for CI.
- Do not put secret values in environment variables in config files; reference Secret Manager.
- Do not invent flags or Terraform arguments; say when unsure.
- Cost statements are estimates with assumptions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Settings
A table: setting, value, reason.

## Config
Deploy files or commands with paths.

## Identity and secrets
The service account, roles and secret references.

## Rollout
No-traffic deploy, smoke test, traffic shift and rollback commands.

## Verify
What was validated and what to check after the first deploy.

## Follow-ups
App changes still needed, quotas, alerts and budget. "None" if empty.
</output_format>
