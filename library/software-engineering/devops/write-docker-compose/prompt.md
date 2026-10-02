---
schema: 1
id: write-docker-compose
kind: prompt
title: Write a Docker Compose dev environment
description: Writes a Docker Compose local development setup that mirrors production dependencies, with health checks, named volumes, seed data, env files and a one-command start. Use when onboarding developers.
category: devops
version: 1.0.0
status: experimental
stage: [build]
role: [software-engineer, backend-engineer, devops-engineer, fullstack-engineer]
stack: [docker]
requires: [repo-read, file-write]
inputs: [spec, repo, config]
output: [config, docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [compose-file, local-development, developer-onboarding, health-checks]
pairs_with:
  prompts: [review-dockerfile, generate-realistic-seed-data, write-onboarding-guide]
  personas: [devops-engineer]
args:
  - name: services
    description: The application services and every dependency they need locally (databases, caches, queues, object storage, email, search, third-party APIs), with how each app service is built and run.
    type: text
    required: true
  - name: stack
    description: Languages and frameworks of the app services, and the package manager.
    type: string
  - name: production_notes
    description: What production runs - engine versions, managed services, configuration that matters (extensions, auth, TLS) - so local can match it.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, compose.yaml, .env.example, Seed data, Commands, Differences from production, Troubleshooting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A local environment earns its keep when a new developer can clone the repo, run one command and have a working app with realistic data in minutes, and when "works on my machine" bugs stop coming from version drift. Compose files usually fall short in the same ways: `latest` images that differ from production, apps that start before the database accepts connections, data lost on every restart, secrets committed in the file, ports exposed on every network interface, and no seed data, so everyone builds their own by hand.
</context>

<task>
Write a Docker Compose development environment for:
{{services}}
{{#stack}}

Stack: {{stack}}
{{/stack}}
{{#production_notes}}

Production: {{production_notes}}
{{/production_notes}}

1. If the repository is available, read the existing Dockerfiles, dependency manifests, environment variable usage and any current compose file first, and build on them.
2. Pin every dependency image to the same major and minor version as production (for example `postgres:16.4`), never `latest`. Where production uses a managed service with no local equivalent, choose a compatible local stand-in and record the gap.
3. Write `compose.yaml` following the current Compose Specification (no top-level `version:` key):
   - App services built from the repo's Dockerfile, using a development target or stage if one exists, with the source bind-mounted for hot reload (or a `develop.watch` section), and dependency folders kept inside the container so host and container builds do not clash.
   - A `healthcheck` on every dependency using its own readiness command (`pg_isready`, `redis-cli ping`, an HTTP health endpoint), and `depends_on` with `condition: service_healthy` on the app services.
   - Named volumes for all persistent data; no anonymous volumes for data that should survive a restart.
   - Ports published on `127.0.0.1` only, with defaults that avoid common clashes and can be overridden from the env file.
   - Optional services (admin UIs, observability, workers that are not always needed) behind `profiles`.
4. Put configuration in an env file: write `.env.example` with every variable, safe local defaults and a comment per variable; the real `.env` stays git-ignored. Never put production credentials or real secrets anywhere.
5. Provide seed data: database init scripts or a one-shot seed service that runs after the database is healthy (`condition: service_completed_successfully` for services that depend on it), is idempotent, and creates a few realistic, clearly fake records, including a known login for local use.
6. Give the one-command start (`docker compose up --wait` or a `make dev` / script wrapper), plus reset, logs, shell and test commands.
7. List every remaining difference from production and its consequence, and a short troubleshooting section (port in use, CPU architecture mismatches on ARM machines, stale volumes, file-watching on mounted folders).

If a service's build or start command is unknown and the repository is not available, ask for it rather than inventing one.
</task>

<constraints>
- Every image is pinned. Every dependency has a health check. Every data store has a named volume.
- No secrets, tokens or real personal data in any file. Local passwords are obviously local (for example `localdev`).
- Do not add services that were not asked for, except a local stand-in for a dependency that has none; say why each was added.
- Keep it runnable on macOS, Linux and Windows with WSL; call out anything that is not.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Assumptions
Bullets, only those that shaped the setup.

## compose.yaml
One `yaml` code block, with short comments on non-obvious lines.

## .env.example
One code block.

## Seed data
The seed scripts or seed service, and what records they create.

## Commands
A table: task | command. Include start, stop, reset data, logs, shell, run tests.

## Differences from production
Table: area | production | local | consequence.

## Troubleshooting
Short bullets: symptom, then fix.
</output_format>
