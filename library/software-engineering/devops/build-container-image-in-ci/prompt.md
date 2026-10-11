---
schema: 1
id: build-container-image-in-ci
kind: prompt
title: Build and push a container image in CI
description: Writes the CI job that builds and pushes a container image with layer caching, optional multi-arch output, commit and version tags, an SBOM and registry login without stored passwords.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, backend-engineer]
stack: [docker, github-actions, gitlab-ci]
requires: [repo-read, file-write]
inputs: [repo, config]
output: [config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [container-images, buildx, image-tagging, layer-caching, sbom, container-registry]
pairs_with:
  prompts: [review-dockerfile, set-up-keyless-ci-deploys, scan-container-images-in-ci]
args:
  - name: image
    description: What image to build (Dockerfile path, build context), which registry it goes to (GHCR, ECR, Artifact Registry, ACR, Docker Hub) and when to push.
    type: text
    required: true
  - name: platforms
    description: Target CPU architectures if not just amd64, for example "linux/amd64 and linux/arm64".
    type: string
output_contract:
  format: markdown
  sections: [Job, Tagging, Decisions, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Image builds in CI usually go wrong in the same ways: no layer cache, so every build reinstalls dependencies; only a `latest` tag, so nobody can tell what is running or roll back; a registry password stored as a long-lived secret; images pushed from pull requests opened by forks; and multi-arch builds done under emulation that take ten times longer than they need to. A good job builds on every pull request without pushing, pushes only from trusted refs, tags each image with the immutable commit SHA plus a version tag on releases, caches layers in the registry or the CI cache, and attaches an SBOM and provenance so the image can be audited later.
</context>

<task>
Write the CI job that builds this image: {{image}}
{{#platforms}}
Platforms: {{platforms}}
{{/platforms}}

1. Read the Dockerfile, `.dockerignore`, the existing CI files and any deploy manifests that reference image tags. Note the base image and whether the Dockerfile uses multi-stage builds and cache mounts.
2. Use BuildKit through buildx (the official Docker actions in GitHub Actions, or `docker buildx` in other CI). Build on pull requests without pushing; push only on the default branch and release tags.
3. Tags: the full commit SHA always; the semantic version (and major and minor aliases if the team wants them) on release tags; a moving branch tag only if something deploys from it. Add OCI labels for source, revision and version.
4. Cache: registry cache (`type=registry` with a dedicated cache ref) or the CI provider's cache backend, with `mode=max` for multi-stage builds. Explain the choice.
5. Multi-arch: only if asked. Prefer native runners per architecture merged into one manifest list; use QEMU emulation only when native runners are unavailable, and say the cost.
6. Registry auth: OIDC federation to the cloud registry, or the CI provider's built-in token for its own registry. Fall back to a stored token only if neither exists, and say so.
7. Enable SBOM and provenance attestations, and output the pushed image digest for later deploy steps.
8. Write the file and run the provider's linter if available.
</task>

<constraints>
- Never push images from untrusted fork pull requests or expose registry credentials to them.
- Deploy steps must reference the image by digest or SHA tag, never `latest`.
- Do not invent action names, inputs or registry URLs; use placeholders for account ids and say which to fill.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Job
The file path and full CI configuration.

## Tagging
A table of the tags produced per trigger (PR, main, release tag).

## Decisions
One bullet each for cache backend, auth method and multi-arch approach.

## Verify
Linter output or "not run", and how to confirm the first push (digest, tags, attestations in the registry).

## Follow-ups
Cloud trust setup, registry retention policy and Dockerfile improvements noticed. "None" if empty.
</output_format>
