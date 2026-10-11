---
schema: 1
id: upgrade-typescript-version
kind: prompt
title: Upgrade TypeScript to a newer version
description: Upgrades the TypeScript compiler across versions, including the native compiler, fixing new type errors, changed defaults, deprecated tsconfig options and tool compatibility without weakening types.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, backend-engineer, fullstack-engineer]
stack: [typescript]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [tsconfig, type-checking, compiler, typescript-eslint]
pairs_with:
  prompts: [fix-typescript-type-error, speed-up-typescript-type-checking, upgrade-major-dependency]
args:
  - name: target_version
    description: The TypeScript version to move to, for example "5.9", "6.0" or the native "7.0" compiler.
    type: string
    required: true
  - name: notes
    description: "Current TypeScript version, tsconfig files, frameworks with a pinned TypeScript range (Angular and others), linters, test runners and tools that use the compiler API."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Compatibility, Errors by cause, Changes made, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
TypeScript does not follow semantic versioning: minor releases routinely add stricter checks and update the bundled `lib` declarations (DOM types especially), so `5.x` to `5.y` can produce hundreds of new errors. That is why projects pin it with `~` or an exact version. Options get deprecated in one release and removed later: 5.0 deprecated `importsNotUsedAsValues`, `preserveValueImports` (replaced by `verbatimModuleSyntax`), `target: ES3` and others, and `"ignoreDeprecations"` only buys time. The 6.0 line is the bridge to the native, Go-based compiler planned as 7.0: it deprecates options and changes defaults ahead of their removal, so fixing every deprecation warning on 6.0 is the safe path to 7.0. The native compiler's release status and tool support change quickly; check the current state rather than assuming. It is much faster but tools that use the TypeScript compiler API or language service plugins (some lint rules, transformers, doc generators, framework compilers) may not support it yet. Frameworks such as Angular accept only a specific TypeScript range, and typescript-eslint, ts-jest and ts-node each publish a supported range. Most new errors are real bugs the old checker missed; casting them away hides them.
</context>

<task>
Upgrade TypeScript to {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read every `tsconfig*.json` (and what they extend), the installed TypeScript version, how it is pinned, and the tools that depend on it: framework compiler, linter, test transformers, bundler plugins, `@types` packages, codegen. Read the release notes for every version between current and target.
2. Check each tool's supported TypeScript range and list the ones that must be upgraded first or do not support the target yet. For the native compiler, list which tools use the compiler API and whether they work with it. Stop for a decision on blockers.
3. Install the target version pinned with `~` or exactly, and run `tsc --noEmit` (or the project's type-check command) for every project. Save the error list and group it by error code and cause: new strictness, `lib` changes, changed defaults, removed options, `@types` drift.
4. Fix tsconfig first: replace deprecated options with their successors and set any default that changed explicitly, so behaviour stays the same unless a change is wanted.
5. Fix code errors by cause in small commits. Prefer correct types and narrowing; where an error reveals a real bug, fix and note it. Use `// @ts-expect-error` with a reason only for third-party type bugs, never `as any`.
6. Run the build, linter, tests and emit comparison (for libraries, diff the generated `.d.ts`). Record type-check time before and after.
</task>

<constraints>
- Do not weaken `strict` flags, turn on `skipLibCheck` to hide errors, or mass-insert `any` or `@ts-ignore` to get a clean build.
- Do not leave `ignoreDeprecations` in place without a follow-up to remove the deprecated options.
- For published libraries, flag any change to emitted declarations as a potential breaking change for consumers.
- Only cite option changes and defaults confirmed in the release notes or by the compiler's own messages.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Current version and pin, tsconfig files, versions skipped.
## Compatibility
Table: tool, supported range, action needed.
## Errors by cause
Table: error code or cause, count, example, fix approach, real bugs found.
## Changes made
tsconfig changes, code fixes, tool upgrades.
## Verification
Type-check, build, lint, test results, declaration diff, type-check time before and after.
</output_format>
