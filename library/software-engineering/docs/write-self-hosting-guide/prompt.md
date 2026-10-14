---
schema: 1
id: write-self-hosting-guide
kind: prompt
title: Write a self-hosting guide
description: Writes the self-hosting guide for a server application, covering requirements, install with Docker or packages, configuration, TLS, upgrades, backups and restore, and monitoring.
category: docs
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [technical-writer, devops-engineer, maintainer]
stack: []
requires: [repo-read, file-write]
inputs: [repo, config, text]
output: [docs]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [self-hosting, install-guide, backups, version-upgrades, reverse-proxy]
pairs_with:
  prompts: [document-configuration-options, write-troubleshooting-guide]
args:
  - name: app
    description: The application and how it is shipped (Docker image, Compose file, Helm chart, binaries, packages), its dependencies (database, cache, object storage, mail) and where its config lives.
    type: text
    required: true
  - name: install_methods
    description: Install methods to document.
    type: string
    default: Docker Compose, plus any other method the repo supports
output_contract:
  format: markdown
  sections: [Guide written, Verified, Operational risks, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Self-hosters are responsible for running your app for months, not just starting it once. Install-only docs leave them stuck on day two. The questions that cause the most pain are: what hardware and versions are actually needed, which data must persist (volumes, database, uploaded files) and how to back it up and restore it, how to upgrade safely (read the release notes, back up, migrations run automatically or by command, can you skip versions, can you roll back), how to put it behind a reverse proxy with TLS and the right forwarded headers and public URL setting, how to send email, and what to monitor. Common traps: secrets left at example defaults, the database exposed on a public port, the `latest` tag pulled on restart causing an unplanned upgrade, and backups never tested by restoring.
</context>

<task>
Write the self-hosting guide for:

<app>
{{app}}
</app>

Install methods: {{install_methods}}.

1. Read the Dockerfile, Compose or Helm files, config loading code, migration mechanism and health endpoints. Note every required setting and every path that holds persistent data.
2. Write "Requirements": CPU, memory and disk guidance if known (otherwise "to confirm"), supported OS or container runtime, and dependency versions.
3. Write install steps for each method, pinned to a specific version tag, with the minimum required configuration and how to generate secrets.
4. Write "Configuration essentials": public URL, secrets, database, email, storage, and a link to the full configuration reference if one exists.
5. Write "Reverse proxy and TLS" with a generic example and the forwarded headers or trusted proxy setting the app needs.
6. Write "Backups and restore": what to back up (database, volumes, files, config and secrets), an example backup and restore procedure, and advice to test restores.
7. Write "Upgrading": the safe sequence, how migrations run, whether versions can be skipped, and rollback limits.
8. Write "Monitoring and logs": health endpoint, logs location, metrics if exposed.
9. If you can run the install locally without touching shared systems, do so and note what you verified.
</task>

<constraints>
- Every setting name, path, port and command must come from the repo. Mark unknowns "to confirm".
- Pin versions in examples; do not tell users to run `latest` in production.
- Do not suggest exposing the database or admin ports publicly, or keeping example secrets.
- Mark destructive restore steps clearly and tell users to back up first.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the guide. Then reply with:
## Guide written
Path and sections.
## Verified
What you ran and what worked. Write "Nothing run" if you could not run it.
## Operational risks
Problems a self-hoster would hit that the app itself should fix (no health endpoint, migrations without rollback). Write "None" if there are none.
## Questions for the owners
Facts to confirm (hardware sizing, version skipping, rollback).
</output_format>
