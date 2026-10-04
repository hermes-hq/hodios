---
schema: 1
id: adopt-strict-typing-track
kind: workflow
title: Adopt strict type checking module by module
description: Moves a Python or TypeScript codebase to strict type checking one module at a time, fixing real bugs found and ratcheting config so coverage never slides back. Use to adopt strict mode safely.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, verify]
role: [software-engineer, tech-lead]
stack: [python, typescript]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [strict-mode, type-checking, mypy, ratchet, incremental-adoption]
pairs_with:
  prompts: [migrate-javascript-to-typescript, plan-incremental-migration]
args:
  - name: language
    description: The language of the codebase.
    type: enum
    enum: [python, typescript]
    default: typescript
  - name: type_check_command
    description: The command that runs the type checker today, for example "npx tsc --noEmit", "mypy src" or "pyright".
    type: string
    required: true
  - name: first_module
    description: The module or directory to convert first. Leave empty and step 1 picks a leaf module with few dependents and few errors.
    type: string
  - name: test_command
    description: The command that runs the tests, so each module's changes are proven not to alter behaviour.
    type: string
    default: the project's documented test command
steps:
  - {id: baseline, file: steps/01-baseline.md, stage: plan, gate: approve, artifact: "strict-typing/01-baseline.md"}
  - {id: ratchet, file: steps/02-ratchet.md, stage: build, gate: none}
  - {id: convert-module, file: steps/03-convert-module.md, stage: build, gate: approve, artifact: "strict-typing/03-module-log.md"}
  - {id: report, file: steps/04-report.md, stage: verify, gate: none, artifact: "strict-typing/04-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Adopts strict type checking in this {{language}} codebase without a big-bang change. Turning strict on for the whole project at once produces thousands of errors, and teams answer with blanket suppressions that hide the bugs strict mode exists to find. This track measures first, puts a ratchet in place so strict coverage can only grow, then converts one module at a time, stopping after each for review.

Rules for every step:
- The type checker run with `{{type_check_command}}` and the tests are the only evidence. Report real error counts, never estimates.
- A type change must not change runtime behaviour. When strict mode exposes a real bug (a possible None, a wrong argument, an unhandled union member), record it separately; fix it only when the fix is small and covered by a test, and list it either way.
- Suppressions are a last resort: `any`, `as` casts, non-null assertions, `# type: ignore`, `cast()` and `@ts-ignore` each need a one-line reason next to them and are counted in every report. Prefer `@ts-expect-error` and error-code-specific `# type: ignore[code]` so they fail once they are no longer needed.
- Do not edit generated code or vendored code; exclude it from the checker instead and say so.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
