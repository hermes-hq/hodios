---
schema: 1
id: scaffold-new-service
kind: prompt
title: Scaffold a new service or library
description: Creates the minimal production-ready skeleton for a new service or library (layout, config, lint, tests, CI, README) and justifies each choice. Use when starting a new repo or package.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build]
role: [software-engineer, backend-engineer, tech-lead, devops-engineer]
requires: [file-write, shell]
inputs: [spec, text]
output: [code, config, docs]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [project-setup, boilerplate, ci]
args:
  - name: description
    description: What the service or library does, who consumes it, and any hard requirements (database, queue, public API).
    type: text
    required: true
  - name: language_or_framework
    description: Language or framework, for example "Go", "FastAPI", "NestJS" or "Rust library".
    type: string
    required: true
  - name: deploy_target
    description: Where it runs, for example "container on Kubernetes", "AWS Lambda" or "published to npm". Leave empty for a library or if undecided.
    type: string
output_contract:
  format: markdown
  sections: [Tree, Files, Why each piece, Left out on purpose, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Starter templates fail in two directions. Some are a hello-world with no tests, CI or config handling, so every production concern gets bolted on later in a different style. Others ship an ORM, a message bus, three layers of abstraction and twenty dependencies for a service that has one endpoint. The goal is the smallest skeleton that is safe to deploy and easy to grow, where every file earns its place.
</context>

<task>
Scaffold a new {{language_or_framework}} project:

{{description}}

Deploy target: {{deploy_target}} (if empty, treat it as undecided and keep the skeleton deploy-neutral).

1. If the description does not say whether this is a long-running service, a job, a function or a library, ask that one question and stop.
2. Use the ecosystem's official generator where one is standard (`cargo new`, `go mod init`, `uv init`, `npm init`, the framework CLI), then trim what it adds that the project does not need. Follow the ecosystem's conventional layout.
3. Include only these, adapted to the ecosystem:
   - A manifest with a lockfile and a pinned runtime or toolchain version.
   - The ecosystem's standard formatter and linter (ruff, eslint with prettier, golangci-lint, rustfmt with clippy) with default rules plus anything the description requires.
   - A test runner with one real test of real behaviour.
   - Configuration read from environment variables, validated at start-up, failing fast with a clear message. Include a `.env.example` with no secrets.
   - For services: structured logging, a health endpoint and a separate readiness endpoint, and graceful shutdown on SIGTERM.
   - A CI workflow stub that installs from the lockfile, lints, type checks, tests and builds, on pull requests and the main branch.
   - If the target is a container: a multi-stage Dockerfile with a pinned base image that runs as a non-root user, plus a `.dockerignore`.
   - `.gitignore`, `.editorconfig` and a README covering what it is, how to run, test and configure it (a table of environment variables), and how it deploys.
4. Run install, lint, test and build (and start the service if it is one, then hit the health endpoint). Fix anything that fails.
</task>

<constraints>
- No database layer, auth, queue, DI container or generic "utils" module unless the description requires it.
- Do not choose a licence; leave a README note asking the owner to add one.
- Pin versions you know are current and supported. If unsure of the latest version of a tool, say so instead of inventing a version number.
- Use no placeholder code that pretends to work. Mark intentional stubs with a TODO naming the owner decision they wait on.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Tree
The file tree.

## Files
Each file in its own code block, headed by its path. Generated lockfiles are summarised in one line, not printed.

## Why each piece
| File or tool | Why it is here | What to change later |

## Left out on purpose
Common additions you did not include and when to add them.

## Verification
Each command run and its actual result.
</output_format>
