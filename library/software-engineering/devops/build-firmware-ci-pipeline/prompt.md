---
schema: 1
id: build-firmware-ci-pipeline
kind: prompt
title: Build a firmware CI pipeline
description: Designs firmware CI with pinned containerised toolchains, a per-board build matrix, static analysis, host unit tests, per-PR size reports, signed artefacts and optional hardware-in-the-loop.
category: devops
version: 1.0.0
status: incubating
stage: [build, verify]
role: [embedded-engineer, devops-engineer]
stack: [c]
requires: [none]
inputs: [text, config]
output: [config, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [firmware, embedded-ci, hardware-in-the-loop, reproducible-builds, misra, binary-size]
pairs_with:
  prompts: [design-ci-cd-pipeline, design-device-ota-updates, speed-up-ci-pipeline]
args:
  - name: project_notes
    description: The firmware project - MCU families and boards, build system (CMake, Make, PlatformIO, Zephyr west, vendor IDE project), toolchain and version, RTOS or bare metal, existing tests, flash and RAM budgets, how releases are produced today, and any test hardware available.
    type: text
    required: true
  - name: ci_system
    description: CI system, for example GitHub Actions, GitLab CI or Jenkins. Leave empty for a CI-neutral design with one example.
    type: string
output_contract:
  format: markdown
  sections: [Pipeline overview, Toolchain image, Build matrix, Checks, Size report, Artefacts and signing, Hardware-in-the-loop, Config, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design CI for a firmware team. Firmware CI differs from web CI in ways that bite: the compiler version changes the binary, so an unpinned toolchain makes a bug irreproducible; one source tree builds for several boards and a change can break only one; flash and RAM are hard budgets, so a 2 KB growth matters; and the real tests need hardware that is slow, shared and flaky. The pipeline should prove every change builds for every board with the same toolchain the release uses, catch what can be caught on the host, and keep hardware tests honest about their flakiness.

{{#ci_system}}CI system: {{ci_system}}{{/ci_system}}
</context>

<task>
<project_notes>
{{project_notes}}
</project_notes>

1. Toolchain image: a container with the exact compiler (for example a pinned Arm GNU toolchain release), build system, vendor SDK or HAL version, and analysis tools, built from a versioned Dockerfile and referenced by digest. Developers use the same image locally (dev container or a wrapper script) so local and CI builds match. Explain how to upgrade the toolchain deliberately (a pull request that bumps the image and shows size and test diffs).
2. Build matrix: one job per board or product variant times build type (debug, release), with warnings as errors for new code. Fail fast on the cheapest board first only if the matrix is large.
3. Checks, in order of cost: formatting (clang-format), static analysis (cppcheck or clang-tidy, plus a MISRA or CERT checker only if the project requires it, with a baseline so old findings do not block), host unit tests of hardware-independent logic with fakes for the HAL (Unity, CppUTest or GoogleTest), and sanitizers on the host build.
4. Size report on every pull request: flash and RAM per board from the map or `size` output, the delta against the target branch, the biggest symbol changes, and a failing threshold near the budget (for example fail when free flash drops below 5%).
5. Artefacts: ELF with symbols kept privately for debugging, the flashable image (bin or hex), the map file, and a manifest with version, git commit, toolchain digest and board. Version from git tags. Release builds are signed in a protected job with the key in a secret store or HSM, never on a developer machine.
6. Hardware-in-the-loop (if hardware exists): a self-hosted runner with boards attached through a debug probe and a controllable power switch; flash, run a smoke suite over serial or a test harness, and power-cycle between runs. Run on merge to main and nightly rather than on every push if capacity is short; quarantine and track flaky tests instead of retrying silently.
7. Write the config for the named CI (or a neutral sketch plus one example), with caching of build outputs keyed on the toolchain digest and source hashes.
</task>

<constraints>
- Use the boards, tools and versions given; where a version is missing, write a placeholder and ask. Do not invent vendor SDK names or versions.
- Signing keys never enter pull request jobs or fork builds.
- Keep the pull request pipeline under about 10 to 15 minutes; move slow work to merge or nightly and say so.
- If the toolchain is a licensed vendor compiler, flag licensing in containers and CI as something to check with the vendor.
</constraints>

<output_format>
## Pipeline overview
Stages and triggers (pull request, merge, tag, nightly) as a list or small diagram.
## Toolchain image
Dockerfile sketch and the upgrade process.
## Build matrix
Table: board | build types | notes.
## Checks
Bullets: tool, what it catches, blocking or not.
## Size report
How it is produced and the threshold rule.
## Artefacts and signing
Bullets.
## Hardware-in-the-loop
Setup and schedule, or "Not now" with the trigger for adding it.
## Config
One fenced block for the CI.
## Open questions
Bullets, or "None".
</output_format>
