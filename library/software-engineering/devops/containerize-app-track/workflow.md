---
schema: 1
id: containerize-app-track
kind: workflow
title: Containerise an existing app
description: Containerises an existing app in gated steps, detecting the stack, writing a multi-stage Dockerfile and compose file, then building, running and documenting it. Use when an app has no containers yet.
category: devops
version: 1.0.0
status: incubating
stage: [discover, build, verify]
role: [software-engineer, devops-engineer]
stack: [docker]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [config, docs, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [multi-stage-build, health-checks, non-root, containerization]
pairs_with:
  prompts: [review-dockerfile, write-docker-compose]
  personas: [devops-engineer]
args:
  - name: app_path
    description: Path to the app inside the repository, for example "." or "services/api".
    type: string
    required: true
  - name: services
    description: Backing services the app needs locally, such as "PostgreSQL 16, Redis". Leave empty and step 1 detects them from config and code.
    type: text
  - name: target
    description: What the images are for. local-dev adds hot reload and dev tools; production builds a lean, locked-down image; both builds separate targets from one Dockerfile.
    type: enum
    enum: [local-dev, production, both]
    default: local-dev
steps:
  - {id: detect, file: steps/01-detect.md, stage: discover, gate: approve, artifact: "containerize/01-detect.md"}
  - {id: dockerfile, file: steps/02-dockerfile.md, stage: build, gate: none}
  - {id: compose, file: steps/03-compose.md, stage: build, gate: none}
  - {id: run-and-document, file: steps/04-run-and-document.md, stage: verify, gate: none, artifact: "containerize/04-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Puts the app at `{{app_path}}` into containers that build reproducibly and actually start, for {{target}} use. The common failures are a Dockerfile that copies the whole repo before installing dependencies (slow, cache-busting builds), runs as root, bakes secrets or `.env` files into a layer, ignores the lockfile, or has no health check, so compose starts the app before its database is ready. This track detects how the app really builds and runs, writes the files, proves them with a local build and run, and documents them.

Rules for every step:
- Derive commands, ports, versions and environment variables from the repository (manifests, scripts, config, CI). Ask instead of guessing when something cannot be found.
- Never copy secrets, `.env` files, credentials or private keys into an image. Use build secrets for private package registries and runtime environment variables for configuration, with an example env file holding placeholders only.
- Do not push images, log in to registries or deploy anything.
- Follow the repo's existing conventions if container files already exist; improve them rather than adding parallel ones, and say what changed.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
