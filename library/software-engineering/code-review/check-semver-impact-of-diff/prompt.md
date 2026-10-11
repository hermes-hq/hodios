---
schema: 1
id: check-semver-impact-of-diff
kind: prompt
title: Decide the semver bump for a library change
description: Decides whether a library change needs a major, minor or patch release by listing every public surface and behaviour change in the diff, with the evidence for each.
category: code-review
version: 1.0.0
status: incubating
stage: [review, ship]
role: [maintainer, software-engineer]
requires: [repo-read]
inputs: [diff, repo]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [semver, versioning, public-api, libraries]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-api-breaking-changes, write-versioning-policy, write-release-notes]
args:
  - name: diff
    description: The diff or the range since the last release tag, with file paths.
    type: text
    required: true
  - name: context
    description: Language and ecosystem, the current version, what the project declares public (exports, documented modules, a stability policy), and supported runtime versions.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Public surface changes, Behaviour changes, Uncertain]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Semantic versioning is a promise to downstream users: patch for compatible fixes, minor for compatible additions, major for anything that can break a correct caller. Most accidental breaks are not removed functions. They are: a new required parameter or a reordered positional one; a narrowed parameter type or widened return type (in TypeScript, adding a member to a union that callers switch over exhaustively; adding a method to an interface users implement); a new abstract method or a new field in a Go struct users build positionally; changed exception or error types; a changed default; a raised minimum runtime, language or peer dependency version; a removed re-export or changed package `exports` map; behaviour changes callers rely on (ordering, rounding, null handling, error on input previously accepted). Below 1.0.0, many ecosystems treat minor as breaking (Cargo and npm caret ranges do). Internal-only changes are patch even when large. Deprecations are minor.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Establish what is public: exported symbols, documented modules, the package entry points or `exports` map, CLI flags or config keys if shipped, and the project's stated stability policy. Read them from the repository rather than assuming.
2. List every change to the public surface: added, removed or renamed symbols; signature changes (parameters, types, defaults, generics, async-ness); type changes for implementers versus callers; exceptions or error values; entry points and re-exports.
3. List behaviour changes visible to a correct caller even where signatures are unchanged: outputs, ordering, validation that now rejects input, side effects, performance characteristics that change complexity class, logging to stdout.
4. List environment changes: minimum runtime or language version, peer and transitive dependency ranges, platform support, bundle format (ESM or CJS).
5. Classify each change as breaking, additive or fix, with the reason and the caller code that would break.
6. Recommend the bump, applying the ecosystem's rules for 0.x versions, and list what the changelog must call out.
</task>

<constraints>
- Every breaking classification includes a short example of caller code that worked before and fails or behaves differently after.
- Do not classify private or internal symbols as public unless they are reachable from an entry point or documented.
- When a change could be breaking depending on how callers use it, put it under Uncertain with the deciding question.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Recommendation
One line: major | minor | patch, the new version number, and the deciding change.
## Public surface changes
Table: symbol or entry point, change, classification, example caller impact.
## Behaviour changes
Table: behaviour, before, after, classification.
## Uncertain
Bullets: change, the question that decides it.
</output_format>
