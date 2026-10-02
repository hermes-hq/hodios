---
schema: 1
id: review-dockerfile
kind: prompt
title: Review a Dockerfile
description: Reviews a Dockerfile for security, image size, build cache use and runtime correctness, and returns ranked findings with a corrected file. Use before shipping an image, or when one is too big.
category: devops
version: 1.0.0
status: experimental
aliases: [slim-container-image]
stage: [review]
role: [devops-engineer, software-engineer, sre]
stack: [docker]
requires: [repo-read]
inputs: [file, config]
output: [report, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [image-hardening, multi-stage-build, image-size, build-cache]
pairs_with:
  prompts: [write-kubernetes-manifests]
args:
  - name: dockerfile
    description: Path to the Dockerfile, or its contents.
    type: text
    required: true
  - name: runtime
    description: How the image runs, if not obvious. For example "Kubernetes, read-only root filesystem" or "local dev only".
    type: text
  - name: focus
    description: Area to weight most heavily.
    type: enum
    enum: [all, security, size, build-speed]
    default: all
output_contract:
  format: markdown
  sections: [Verdict, Findings, Revised Dockerfile, Behaviour to check, Verify, Not checked]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Dockerfile decides what ships to production: which base image and its vulnerabilities, which user the process runs as, whether secrets end up in a layer, and how long every build takes. Most problems are invisible until an image is scanned, pulled at scale or stopped mid-request.
</context>

<task>
Review {{dockerfile}}. If it is a path, read it, plus `.dockerignore` and the files it copies.
{{#runtime}}It runs as: {{runtime}}{{/runtime}}
Weight your attention toward: {{focus}}.

Check, citing the line for each issue:
1. Base image: a specific version tag (never `latest`), ideally pinned by digest (leave the digest as a placeholder if you do not know it); the same family across stages. For the final stage, prefer distroless or a `-slim` variant; use `scratch` only for static binaries; suggest Alpine only after checking that musl will not break native modules or Python wheels (numpy, pandas, grpc and similar), and say that you checked.
2. Stages: build tools, compilers and dev dependencies stay in a build stage; the final stage copies only the artefacts it needs.
3. Secrets: no credentials in `ARG`, `ENV`, copied files or the build context. Build-time secrets use BuildKit secret mounts.
4. User: the final stage runs as a non-root user with a fixed UID, and files it does not need to write are not owned by it.
5. Cache order: dependency manifests and lockfiles are copied and installed before the source, so a code change does not reinstall dependencies. Package caches use BuildKit cache mounts rather than being baked into a layer, and the final stage installs production dependencies only.
6. Package installs: update and install in one `RUN`, without recommended extras, with package lists removed in the same layer; lockfile-respecting install commands.
7. `.dockerignore`: excludes `.git`, local env files, build output and dependency folders.
8. Runtime: exec-form `ENTRYPOINT`/`CMD` so the process receives signals; a process that handles SIGTERM, or an init when it spawns children; `HEALTHCHECK` only when the platform uses it; `WORKDIR` set; no `ADD` from URLs and no download-and-run commands.
</task>

<constraints>
- Every finding cites a line and says what goes wrong in practice (attack, failure or cost), not only which rule it breaks.
- Do not quote image size or build time savings as facts. Mark them as estimates unless you built the image.
- Keep the app's behaviour the same in the revised file: exposed port, entrypoint semantics, working directory, environment variables and the paths the app reads or writes. If a fix needs information you do not have (the runtime, the start command, the writable paths), say so instead of guessing; if you cannot tell the runtime or how the app starts, ask and stop before rewriting.
- Do not add tools the original image did not need (curl, a shell) "for debugging".
- Skip style-only remarks such as instruction casing or comment wording.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: `ship`, `ship-after-fixes` or `rework`, with the number of findings by severity.

## Findings
Numbered, most severe first: `[high|medium|low] line N — problem — impact — fix`.

## Revised Dockerfile
The full corrected file, with a short comment on each changed line, followed by a `.dockerignore` block if the current one is missing or lets `.git`, env files or dependency folders into the context. Omit this section if there are no findings above low.

## Behaviour to check
Anything the revised file changes at runtime (user, paths, init process) that the team must test. "None" if empty.

## Verify
Commands to compare size and layers before and after (`docker image ls`, `docker history`), to confirm the container runs as the non-root user, and to scan the image.

## Not checked
What you could not verify (base image vulnerabilities, actual image size, the app's signal handling). "None" if empty.
</output_format>
