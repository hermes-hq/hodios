---
schema: 1
id: set-up-game-build-pipeline
kind: prompt
title: Set up a game build pipeline
description: Sets up automated multi-platform game builds with headless engine builds, asset and library caching, build numbering, symbol upload, smoke tests and distribution to testers or store betas.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [game-developer, devops-engineer]
stack: []
requires: [none]
inputs: [text, config]
output: [config, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [game-builds, build-automation, asset-cache, crash-symbols, playtest-builds, console-builds]
pairs_with:
  prompts: [design-ci-cd-pipeline, speed-up-ci-pipeline]
args:
  - name: engine
    description: Engine and exact version, for example "Unity 6000.0.23f1", "Godot 4.3" or "Unreal 5.4", plus the render pipeline or notable plugins.
    type: string
    required: true
  - name: platforms
    description: Target platforms, for example "Windows, macOS, Linux on Steam; Android; Switch later".
    type: string
    required: true
  - name: ci_system
    description: CI system and runners, for example "GitHub Actions with a self-hosted Windows PC" or "GitLab CI". Leave empty for advice on choosing.
    type: string
  - name: project_notes
    description: Team size, repo size and whether you use Git LFS or another VCS, current build time, how builds reach testers today, and budget for runners.
    type: text
output_contract:
  format: markdown
  sections: [Pipeline overview, Runners and licences, Build steps per platform, Caching, Versioning and symbols, Smoke tests, Distribution, Config, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up automated builds for a small game team so every change produces playable builds for every platform without someone babysitting the editor. The usual pain: a full asset import takes an hour on a clean runner because the engine's library or derived-data cache is not kept; builds work only on one person's machine because the engine version drifts; crash reports from testers are useless because debug symbols were never uploaded; console and some engine builds need licences or SDKs that cannot run on hosted runners; and large binary assets blow past repository and cache limits.

Engine: {{engine}}
Platforms: {{platforms}}
{{#ci_system}}CI: {{ci_system}}{{/ci_system}}
</context>

<task>
{{#project_notes}}
<project_notes>
{{project_notes}}
</project_notes>
{{/project_notes}}

1. Pipeline overview: triggers (every push to main builds the fast platform; nightly builds all platforms; tags build release candidates), and which jobs run in parallel.
2. Runners and licences: hosted versus self-hosted per platform (macOS and iOS need Apple hardware; consoles need the platform holder's SDK under NDA and usually a self-hosted, access-controlled machine). Engine licence activation in CI (for example a build-server or serial activation for Unity, none needed for Godot), stored as secrets. Flag anything the user must check with the engine vendor or platform holder.
3. Build steps per platform, run headless from the command line with the exact engine version pinned (a container image or an installed version checked at job start): import, build, package, and the artefact name.
4. Caching: the engine's import cache (for example Unity's `Library` folder keyed on engine version and lock files, Unreal derived data cache, Godot's `.godot/imported`), Git LFS objects, and package caches; warn about cache size limits on hosted CI and when a shared network cache is worth it.
5. Versioning and symbols: version from tags plus a build number from the CI run, written into the build and shown on the title screen; debug symbols (PDB, dSYM, Android native symbols) uploaded to the crash reporter in the same job, kept for every distributed build.
6. Smoke tests: launch the built game headless or in batch mode, load the first scene, run a scripted short play-through or engine test runner, check it exits without errors within a timeout, and capture logs. Add engine unit and play-mode tests where they exist.
7. Distribution: internal testers (Steam beta branch via its build upload tool, itch.io via butler, TestFlight, Google Play internal testing), with release notes from commit messages and a channel notification. Store production releases stay manual.
8. Write the config for the CI system, or a neutral sketch with one example if none is named.
</task>

<constraints>
- Use the exact engine version given; never mix editor versions between jobs.
- Do not include console SDK details covered by NDAs; describe only the public shape and point to the platform holder's documentation.
- Licences, store credentials and signing keys are secrets in the CI secret store and never in the repo or logs.
- Do not invent runner prices or build times; ask or give how to measure them.
</constraints>

<output_format>
## Pipeline overview
Triggers and jobs as a short list or diagram.
## Runners and licences
Table: platform | runner | licence or SDK needs | notes.
## Build steps per platform
Numbered per platform with the command line.
## Caching
Bullets with cache keys.
## Versioning and symbols
Bullets.
## Smoke tests
Bullets with pass criteria.
## Distribution
Table: audience | channel | trigger.
## Config
Fenced blocks.
## Open questions
Bullets, or "None".
</output_format>
