---
schema: 1
id: write-devcontainer-config
kind: prompt
title: Write a dev container config
description: Writes a devcontainer.json and Dockerfile for VS Code, Codespaces or other dev container tools, with the project's toolchain, extensions, services, port forwarding and fast rebuilds.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, devops-engineer, fullstack-engineer]
stack: [docker]
requires: [repo-read, file-write]
inputs: [repo]
output: [config, docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [devcontainer, codespaces, developer-onboarding, reproducible-environment]
pairs_with:
  prompts: [write-docker-compose, review-dockerfile, write-onboarding-guide]
args:
  - name: project
    description: What the project needs to develop and test (languages and versions, CLIs, databases or other services, editor extensions), or "infer from the repo".
    type: text
    required: true
  - name: tool
    description: Where it will be used.
    type: enum
    enum: [vscode-local, codespaces, both]
    default: both
output_contract:
  format: markdown
  sections: [Assumptions, Files, First run, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A dev container should give a new contributor a working environment from one click, but common configs are slow and fragile: every rebuild reinstalls everything because steps that change often sit early in the Dockerfile; tools are installed by piping unpinned remote install scripts into a shell instead of using dev container Features; the container runs as root so files created in the bind-mounted workspace end up root-owned on the host; dependency folders are installed inside the bind mount, which is very slow on macOS and Windows; and services like databases are crammed into the same container. Use an official base image (`mcr.microsoft.com/devcontainers/<language>` with a version tag), Features for CLIs, `remoteUser` set to the non-root user, `postCreateCommand` for dependency installs, a named volume for heavy dependency directories, and Docker Compose when services are needed. Codespaces adds machine size (`hostRequirements`), prebuilds, and secrets that arrive as environment variables.
</context>

<task>
Write a dev container setup for {{tool}}:
{{project}}

1. Read the repository first: runtime version files, dependency manifests and lockfiles, the scripts used to build, test and lint, existing Dockerfiles or compose files, `.vscode/extensions.json` and settings, and the README setup steps. Reuse what exists and match versions exactly.
2. Choose single container or Docker Compose (needed when the project uses a database, cache or queue) and say why.
3. Write `.devcontainer/devcontainer.json`: `name`, base image or build or compose reference, Features with pinned major versions for extra CLIs, `remoteUser` non-root, `forwardPorts` with labels, `customizations.vscode.extensions` and minimal settings, `postCreateCommand` that installs dependencies with the lockfile, `mounts` for a named volume over heavy dependency directories where useful, and `hostRequirements` for Codespaces if the build needs memory.
4. If a Dockerfile is needed, order layers from least to most often changed, pin versions, and clean package caches.
5. If compose is used, give services health checks, pinned images and named volumes, with the app container waiting for them.
6. Environment: list required environment variables, provide a `.env.example` or Codespaces secrets list, and never write real values.
7. If the dev container CLI is available, build it and run the project's test command inside; otherwise say it was not run.
</task>

<constraints>
- Only use Features and base images you are confident exist; mark any you are unsure of.
- No secrets or tokens in any file.
- Do not change the project's own build files or scripts; only add `.devcontainer/` files and the env example.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Assumptions
Bullets, including versions matched from the repo.
## Files
Fenced blocks with paths: `devcontainer.json`, and the Dockerfile and compose file if used.
## First run
Steps for VS Code and for Codespaces, and how long the first build is expected to take relative to rebuilds.
## Gaps
Anything that differs from production or from the team's local setup, and verification status.
</output_format>
