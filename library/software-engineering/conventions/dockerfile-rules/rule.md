---
schema: 1
id: dockerfile-rules
kind: rule
title: Dockerfile rules
description: Standing rules for writing Dockerfiles covering pinned base images, multi-stage builds, cache-friendly layer order, non-root users, no secrets in layers, small images and signal handling.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, backend-engineer]
stack: [docker]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [container-images, multi-stage-builds, image-size, layer-caching, non-root]
applies_to: ["**/Dockerfile", "**/Dockerfile.*", "**/*.dockerfile", "**/.dockerignore"]
pairs_with:
  rules: [secure-coding-rules, dependency-hygiene-rules]
  prompts: [review-dockerfile, fix-docker-build-failure, write-docker-compose]
  personas: [devops-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change a Dockerfile in this project:

**Base images**
- Use an official or organisation-approved base image with an explicit version tag, never `latest`. Pin by digest (`image:tag@sha256:...`) for production images if the project does, and let a dependency bot update it.
- Pick the smallest base that works for the runtime (slim or distroless for the final stage). Match the libc (glibc versus musl/Alpine) to what the language's native packages need; Alpine breaks some Python and Node native modules.

**Multi-stage builds**
- Build and compile in a builder stage with the full toolchain; copy only the built artefacts and runtime dependencies into the final stage. Compilers, package manager caches, test files and source maps do not ship.
- Name stages (`FROM node:22-slim AS build`) and reference them by name.

**Layer order and cache**
- Copy dependency manifests and lockfiles first, install dependencies, then copy the source. A code change must not reinstall all dependencies.
- Use the lockfile with a frozen install (`npm ci`, `pip install` with hashes or a lock, `go mod download`, `bundle install` with frozen settings).
- Combine `apt-get update` and `apt-get install` in one `RUN`, pin packages where it matters, use `--no-install-recommends`, and clean the package lists in the same layer. Use BuildKit cache mounts for package caches if the project uses BuildKit.
- Keep a `.dockerignore` that excludes `.git`, `node_modules`, build output, local env files and secrets.

**Secrets**
- Never put secrets in `ARG`, `ENV`, copied files or the build context; they persist in image layers and history. Use BuildKit secret mounts (`RUN --mount=type=secret,...`) at build time and runtime environment or secret stores at run time.

**Runtime**
- Run as a non-root user: create one (or use the image's, such as `node` or a distroless `nonroot`) and set `USER` before `CMD`. Files the app writes go to a directory that user owns.
- Use exec form for `ENTRYPOINT` and `CMD` (`["node", "server.js"]`) so the process gets signals and shuts down on `SIGTERM`. Use a minimal init (`--init` or tini) if the process does not reap children.
- Set `WORKDIR` explicitly. Use `COPY`, not `ADD`, unless you need archive extraction. Copy with `--chown` instead of a later `chown -R` layer.
- Document the port with `EXPOSE` and add a `HEALTHCHECK` only if the orchestrator does not do its own health checks.
- Configure the app through environment variables at runtime; do not bake environment-specific config into the image.

**Supply chain**
- Do not pipe downloaded installer scripts straight into a shell. If you must download, pin the version and verify a checksum.
- Add OCI labels (source, revision) if the project uses them.

**Before you finish**
- Build the image, run it, check that the container starts as non-root and stops cleanly, and compare image size before and after. Run hadolint and the project's image scanner if present. Say what you ran.
