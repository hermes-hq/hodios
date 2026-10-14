---
schema: 1
id: embed-git-version-in-build
kind: prompt
title: Embed the git version in builds
description: Stamps builds with git describe output, the commit SHA and a dirty flag so every binary, package, image and running service reports exactly which source it came from.
category: git
version: 1.0.0
status: incubating
stage: [build, ship]
role: [software-engineer, devops-engineer]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [code, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [build-metadata, version-endpoint, git-describe, traceability]
pairs_with:
  prompts: [fix-git-in-ci-pipelines, sign-release-artifacts, cut-hotfix-from-release-tag]
args:
  - name: build
    description: The language and build tool, and where the version should show, for example "Go service, show in /version and logs" or "Node CLI, --version flag" or "Docker image labels".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Version string, Changes, CI, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
During an incident, the first question is "what exactly is running?", and a version number alone often cannot answer it. `git describe --tags --always --dirty` gives a string such as `v2.4.1-17-g3f2a9c1-dirty`: the nearest tag, commits since it, the abbreviated SHA, and whether the tree had uncommitted changes. Combined with the full SHA and build time, it identifies the source exactly. The usual failure points: CI checkouts are shallow and have no tags, so describe fails or falls back to a bare SHA; Docker builds run without the `.git` directory, so the value must be passed in as a build argument; and stamping the build time into every build breaks reproducible builds and caching, so it should come from the commit time (or `SOURCE_DATE_EPOCH`) where reproducibility matters. Each ecosystem has an idiomatic injection point: Go `-ldflags -X`, a generated version file in Python or JavaScript, Rust `build.rs` environment variables, Java resource filtering, and OCI image labels such as `org.opencontainers.image.revision`.
</context>

<task>
<build>
{{build}}
</build>

1. Read how the project builds today: build scripts, Dockerfile, CI config, and any existing version constant or `--version` handling. Reuse what exists.
2. Define the version fields: `version` (from `git describe --tags --always --dirty`), `commit` (full SHA from `git rev-parse HEAD`), `dirty` flag, and `build_time` from the commit time (`git log -1 --format=%cI`) unless the user wants wall-clock time.
3. Implement the injection in the project's idiom, with a safe fallback such as `dev` when git is unavailable, so local builds without git still work.
4. Expose it where requested: `--version` output, a `/version` or health endpoint, a startup log line, image labels, and package metadata if relevant.
5. Fix the CI side: fetch enough history and tags for describe to work (for example `fetch-depth: 0` or fetching tags), and pass values into Docker builds as build arguments because `.git` is usually excluded from the build context.
6. Build locally, run the artifact and show the version output. Make a throwaway uncommitted change, rebuild and confirm the dirty flag appears, then discard the change only with the user's agreement.
</task>

<constraints>
- Do not copy the `.git` directory into images to make this work.
- Do not expose more than version, commit and build time on public endpoints unless the user asks.
- Follow the existing build tool and code style; no new build dependencies for something a shell command or the build tool already does.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Version string
The fields and an example value.
## Changes
Each file changed and why.
## CI
Checkout and build-argument changes.
## Check
The version output from a clean build and from a dirty one.
</output_format>
