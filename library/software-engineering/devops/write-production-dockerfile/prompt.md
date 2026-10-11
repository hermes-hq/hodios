---
schema: 1
id: write-production-dockerfile
kind: prompt
title: Write a production Dockerfile
description: Writes a production Dockerfile with a multi-stage build, pinned base image, cache-friendly layers, build secrets kept out of layers, a non-root user, clean signal handling and a build-and-run check.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, backend-engineer, fullstack-engineer]
stack: [docker]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [multi-stage-build, container-image, non-root]
pairs_with:
  prompts: [review-dockerfile, build-container-image-in-ci, containerize-app-track]
args:
  - name: app
    description: Which app or service to containerise (path in the repo if a monorepo) and how it runs in production.
    type: string
    required: true
  - name: notes
    description: "Where the image runs (Kubernetes, ECS, Cloud Run, a VM), private package registries, required system libraries, target architectures, size or base image policy."
    type: text
output_contract:
  format: markdown
  sections: [Dockerfile, dockerignore, Decisions, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most Dockerfiles work; few are good in production. What separates them: a multi-stage build so compilers, dev dependencies and source maps stay out of the final image; copying only the dependency manifests and lockfile before installing, so the dependency layer is cached until the lockfile changes; BuildKit cache mounts for package manager caches; a `.dockerignore` that keeps `.git`, `node_modules`, local env files and build output out of the context. Base images should be pinned to a specific version, ideally with a digest, and chosen deliberately: Alpine uses musl, which breaks or slows many Python wheels and some native Node modules; slim Debian-based images avoid that; distroless images have no shell, which is safer but changes how you debug. Secrets passed as `ARG` or `ENV` stay readable in the image history; build-time secrets belong in `--mount=type=secret`. The process should run as a non-root user with a numeric UID (Kubernetes `runAsNonRoot` checks the number). `CMD` and `ENTRYPOINT` in exec form let PID 1 receive `SIGTERM`; shell form or a wrapper script without `exec` means the container is killed after the grace period instead of shutting down cleanly. `HEALTHCHECK` is used by Docker and Compose but ignored by Kubernetes, which uses probes.
</context>

<task>
Write a production Dockerfile for {{app}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the repository: language and version files, lockfiles, build and start commands, environment variables the app reads, ports, files it writes at runtime, existing Dockerfiles or Compose files and CI image builds. Follow existing conventions.
2. Choose the base images for build and runtime stages with reasons, pinned to a version (and a digest if the team pins digests). Match the language version the project declares.
3. Write the build stage: copy manifests and lockfile, install dependencies with a cache mount, copy source, build. Use secret mounts for private registry credentials.
4. Write the runtime stage: copy only the built output and production dependencies, create or use a non-root user with a numeric UID, set ownership only where the app writes, set `WORKDIR`, `EXPOSE` and production environment defaults, and start the app in exec form (add an init such as `tini` if the app spawns child processes or does not handle signals).
5. Add a `HEALTHCHECK` if the target uses it, and OCI labels for source and version if the team uses them.
6. Write or update `.dockerignore`.
7. If Docker is available, build the image, run it, hit the health or main endpoint, check it runs as non-root, stop it and confirm it exits promptly on `SIGTERM`, and report the image size. Run `hadolint` if available.
</task>

<constraints>
- Never put secrets, tokens or `.env` files into the image or into `ARG`/`ENV`.
- Do not use `latest` or unpinned base image tags.
- Do not install debugging tools or package manager caches in the runtime stage.
- Do not change the app's code or start command beyond what the container needs; list anything that should change as a follow-up.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Dockerfile
Path and full contents, with short comments on non-obvious lines.
## dockerignore
Full contents.
## Decisions
One bullet each for base images, user, signal handling, caching, secrets and health check.
## Verification
Build, run, endpoint check, user check, stop time, image size and hadolint result, or "not run" with the commands to run.
</output_format>
