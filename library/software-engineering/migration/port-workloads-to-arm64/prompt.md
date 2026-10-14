---
schema: 1
id: port-workloads-to-arm64
kind: prompt
title: Port workloads to Arm64
description: Plans moving services, containers and CI to Arm64 servers or Apple silicon, finding native dependencies, single-arch images, x86 intrinsics and memory-ordering bugs, with a mixed-arch canary rollout.
category: migration
version: 1.0.0
status: incubating
stage: [plan, operate, maintain]
role: [devops-engineer, backend-engineer, sre]
stack: [docker]
requires: [repo-read]
inputs: [repo, config, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [arm64, multi-arch-images, native-dependencies, price-performance, canary-rollout]
pairs_with:
  prompts: [plan-cloud-migration, review-dockerfile, analyze-load-test-results]
  personas: [migration-engineer]
args:
  - name: workloads
    description: The services to move, their languages and runtimes, how images are built, where they run (VMs, Kubernetes, serverless) and the reason for moving (cost, developer laptops, performance).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Readiness by workload, Build changes, Code risks, Rollout plan, Performance check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most managed-runtime code (Java, .NET, Go, Python, Node.js) runs on Arm64 unchanged. What fails is around it: native packages with no aarch64 build (Python wheels, Node native addons, JNI libraries), images built for one architecture ("exec format error" at start), Dockerfiles and scripts that download x86 binaries by hard-coded URL, old runtime versions with weak Arm support, and C or C++ code using x86 intrinsics (SSE, AVX). A subtler class: Arm has a weaker memory model than x86, so lock-free code with missing barriers or data races that never showed on x86 can start failing. Emulated multi-arch builds are slow, so CI usually needs native Arm runners. The price-performance gain is workload-specific and must be measured, not assumed. The safe rollout runs mixed architectures side by side, with scheduling that keeps each image on a node that can run it.
</context>

<task>
Workloads:
{{workloads}}

1. For each workload, check readiness: runtime version, native dependencies (list each and whether an Arm64 build is known), base images and whether they are multi-arch, binaries fetched in Dockerfiles or scripts, and any agent or sidecar (monitoring, security) that must also run on Arm.
2. Plan build changes: multi-arch image builds and manifest lists, native Arm CI runners versus emulation and the time cost of each, architecture-aware download steps, and lockfiles or wheels that differ per architecture.
3. List code risks to inspect: intrinsics or inline assembly, unaligned access assumptions, lock-free code and data races (run race detectors or thread sanitizers on Arm), floating-point results compared for exact equality in tests, and anything reading CPU features at runtime.
4. Write the rollout: build multi-arch images first while still running on x86; then a canary on Arm nodes with scheduling constraints by architecture; shift traffic in steps with error rate and latency compared per architecture; keep x86 capacity for rollback until a stated date.
5. Define the performance check: the same load test on both architectures at equal cost, comparing throughput, p95 and p99 latency and cost per request, and the decision rule.
</task>

<constraints>
- Do not state that a specific package or image supports Arm64 unless it is listed as such in the input or you are sure; mark it "to verify".
- Do not promise cost savings; give the measurement that decides.
- Keep x86 rollback available until the performance check passes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Readiness by workload
Table: workload | runtime | native dependencies | images | status (ready, needs work, blocked).
## Build changes
Bullets.
## Code risks
Bullets with how to check each.
## Rollout plan
Numbered steps with the metric that gates each.
## Performance check
Test design and decision rule.
## Open questions
Bullets.
</output_format>
