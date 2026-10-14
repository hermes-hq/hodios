---
schema: 1
id: speed-up-typescript-type-checking
kind: prompt
title: Speed up slow TypeScript type checking
description: Speeds up slow tsc runs and editor IntelliSense by tracing the compiler, fixing expensive types, and using project references, incremental builds and skipLibCheck where they fit.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, backend-engineer, fullstack-engineer]
stack: [typescript]
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
tags: [tsc, type-checking, project-references, compiler-trace, editor-performance]
pairs_with:
  prompts: [speed-up-frontend-build, simplify-typescript-types, speed-up-monorepo-builds, speed-up-ci-pipeline]
  personas: [typescript-engineer, frontend-engineer]
args:
  - name: project
    description: TypeScript version, repo layout (single package or monorepo), current `tsc --noEmit` time and memory, whether the editor is slow too, and key libraries (ORMs, schema validators, styled systems) with heavy types.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Hot spots, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
`tsc --extendedDiagnostics` gives the first split: files and lines checked, and time in parse, bind, check and emit. If check time dominates, `tsc --generateTrace <dir>` followed by `@typescript/analyze-trace` points to the specific files and type expressions that are expensive. The repeat offenders are deeply recursive conditional and mapped types, large unions (thousands of members, especially from template literal types) compared against each other, inferred return types of huge object literals or schema builders exported without annotations (so every importer re-infers them), and library types from ORMs, schema validators and styled-component systems used in generic-heavy ways. Annotating exported function return types and naming intermediate types with `interface` instead of intersections often cuts check time sharply. Structural levers: `skipLibCheck: true` skips re-checking `.d.ts` files (safe for most apps, less so for library authors); `incremental` with a `tsBuildInfoFile` reuses prior work; project references with `composite` split a monorepo so only changed projects are rechecked; `isolatedDeclarations` (TS 5.5+) enables parallel declaration emit. `include` globs that pull in build output, `node_modules` copies or generated files inflate the file count silently.
</context>

<task>
Speed up type checking for: {{project}}

1. Read the tsconfig files, `include`/`exclude`, references, and package scripts. Note the TypeScript version.
2. Run `tsc --noEmit --extendedDiagnostics` (or per project with `-b`) and record total time, check time, memory and file count. Check for files that should not be included.
3. If check time dominates, generate a trace, analyse it, and list the top expensive files and type expressions with file:line.
4. Fix in this order: wrong `include` scope; `skipLibCheck` and `incremental` if suitable; explicit annotations on expensive exported inferences; simplified or named types replacing deep conditional or intersection chains; project references for monorepos. Re-measure after each.
5. Confirm no new type errors appear and none are hidden: compare the error count before and after, run tests, and check editor responsiveness on the worst file if the editor was slow.
</task>

<constraints>
- Never speed up checking by loosening `strict` flags, adding `any`, or `@ts-ignore`; types must stay at least as strict.
- State the trade-off of `skipLibCheck` for packages that publish types.
- Report times from the same machine and a clean or stated cache state.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Diagnostics output: total, check time, memory, file count.
## Hot spots
Expensive files and types from the trace, with file:line.
## Changes
One line per file: `path`, what changed.
## Results
Diagnostics after, error count comparison, editor check.
</output_format>
