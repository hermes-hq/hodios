---
schema: 1
id: speed-up-cpp-compile
kind: prompt
title: Cut C++ compile and link times
description: Cuts C++ compile and link times by measuring which headers and translation units cost most, then fixing include hygiene, adding precompiled headers, ccache, unity builds and a faster linker.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, game-developer, embedded-engineer]
stack: [cpp]
requires: [repo-read, file-write, shell]
inputs: [repo, config, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [compile-time, include-hygiene, precompiled-headers, ccache, cmake]
pairs_with:
  prompts: [speed-up-ci-pipeline, speed-up-monorepo-builds, profile-hot-path]
  personas: [cpp-engineer, game-developer]
args:
  - name: build
    description: Build system (CMake, Bazel, Make, MSBuild), compiler and version, platform, codebase size, which build is slow (clean, incremental, link, CI) with times, and heavy dependencies (Boost, Qt, Eigen, protobuf).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Where time goes, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In C++ the dominant cost is usually parsing the same headers thousands of times. Clang's `-ftime-trace` produces per-file traces that ClangBuildAnalyzer aggregates into the most expensive headers, template instantiations and functions across the build; MSVC has `/Bt+` and `/d1reportTime` or Build Insights; the build system's own timing (Ninja's `.ninja_log`, viewable with ninjatracing) shows slow translation units and parallelism. The fixes: include what you use and forward-declare instead of including in headers; move heavy includes (Windows.h, Boost, Eigen, `<regex>`, big generated protobuf headers) out of widely included headers; pimpl or type erasure at module boundaries so private members do not leak includes; precompiled headers for stable, widely used headers (CMake `target_precompile_headers`); unity or jumbo builds for clean builds (can cause name clashes between anonymous-namespace symbols); `extern template` for templates instantiated everywhere; ccache or sccache for repeat builds and CI; and a faster linker (lld, mold on Linux) plus split debug info for incremental link time, which often dominates after a one-file change. Make sure the build actually runs in parallel: Ninja over Make, and no serialising custom commands.
</context>

<task>
Cut build times for: {{build}}

1. Read the build files, target layout, compiler flags, and the most included project headers.
2. Measure on a fixed machine: clean build, incremental build after editing a widely used header and after editing a leaf `.cpp`, and link time. Record parallelism.
3. Collect evidence with `-ftime-trace` and ClangBuildAnalyzer (or the compiler's equivalent) and the build log: top headers by total parse time, top template instantiations, slowest translation units, link time.
4. Apply the cheapest high-value fixes first: compiler cache, faster linker and split debug info, Ninja and correct parallelism, precompiled headers for stable heavy headers. Re-measure after each.
5. Then fix include hygiene in the worst headers: forward declarations, moving includes to `.cpp` files, pimpl where a header drags in heavy dependencies, `extern template` for hot templates. Re-measure.
6. Offer unity builds for CI or clean builds if still needed, noting name-clash risks. Run the full test suite and confirm the binaries behave the same.
</task>

<constraints>
- Keep changes behaviour-preserving; include removals must still compile on every supported platform and configuration.
- Do not lower optimisation or warning levels to gain build speed.
- Compiler and linker changes must work on every platform the project supports; document setup for teammates and CI.
- Report times from repeated runs on the same machine and cache state.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Times per scenario and parallelism.
## Where time goes
Top headers, instantiations, slow translation units and link time.
## Changes
One line per file: `path`, what changed, time saved.
## Results
Times after, platforms and tests checked.
</output_format>
