---
schema: 1
id: consolidate-duplicate-type-definitions
kind: prompt
title: Consolidate duplicate TypeScript types
description: Merges near-duplicate TypeScript interfaces and types into one source of truth with derived types (Pick, Omit, Partial, mapped types), and updates usages without changing runtime behaviour.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, backend-engineer, fullstack-engineer]
stack: [typescript]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [type-definitions, utility-types, single-source-of-truth, type-drift]
pairs_with:
  prompts: [replace-loose-types, simplify-typescript-types, share-types-across-client-and-server]
  personas: [typescript-engineer]
args:
  - name: types
    description: The duplicated types (names or paths, for example "User, UserDTO, UserProfile, AdminUser in four folders") or a folder to scan.
    type: text
    required: true
  - name: check_command
    description: The type check command, if not the usual one (for example "npm run typecheck").
    type: string
output_contract:
  format: markdown
  sections: [Copies and drift, Source of truth, Derived types, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a TypeScript engineer. Hand-copied types drift: `User` in one folder has `email: string`, the copy in another has `email?: string | null`, a third added `role` and nobody updated the others. The compiler stays quiet because each copy is internally consistent, and the drift surfaces as runtime bugs at the seams.

The fix is one source of truth per concept, with the variations derived from it: `Pick<User, 'id' | 'name'>` for summaries, `Omit<User, 'id'>` or `Partial<...>` for create and update inputs, intersections for extensions, and mapped types where a shape is systematically transformed. Derived types change automatically when the source changes, which is the point.

Judgement calls: not every similar shape is the same concept. A database row, an API response and a form's state may share fields today but have different reasons to change (the API must stay stable when the table changes); merging them couples layers that should be decoupled, and the right fix there is an explicit mapping function, not one shared type. Also, where the copies disagree (optional versus required, `null` versus `undefined`), one of them is wrong about reality; decide which from the code that produces the data, not from which copy is more convenient. Over-derived types (`Omit<Pick<Partial<...>>>` three levels deep) hurt readability; name intermediate types.
</context>

<task>
Consolidate {{types}}.

1. Find every copy and near-copy of each type (search by name, by field sets and by usage) and list them with their fields side by side. Mark each field difference as drift or a real difference.
2. For each concept, decide whether the copies are the same concept (merge) or different layers that should stay separate with a mapping function. Pick where the source of truth lives, following the project's conventions. Wait for approval.
3. For drifted fields, check the code that produces the data to decide the true type (required, optional, nullable), and list each place where the stricter or looser truth exposes a bug.
4. Define the source type and derive the variants with utility types or named intermediates; replace the copies and update imports. Run the type check{{#check_command}} with `{{check_command}}`{{/check_command}} and the tests, and fix the new errors where they reflect real gaps, reporting each.
</task>

<constraints>
- No runtime behaviour change; types only, plus fixes for real bugs the stricter types expose, each reported separately.
- Do not merge types that belong to different layers just because their fields match today.
- No `as` casts or `any` to make errors disappear.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Copies and drift
Table: field, per-copy type, drift or real difference.
## Source of truth
Each concept, where it lives, and copies kept separate with mapping.
## Derived types
Each variant and how it is derived.
## Diff
The change.
## Check
Type check and tests, and errors that exposed real gaps.
</output_format>
