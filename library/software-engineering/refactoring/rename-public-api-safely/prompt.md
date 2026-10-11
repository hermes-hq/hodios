---
schema: 1
id: rename-public-api-safely
kind: prompt
title: Rename or move a public API safely
description: Renames or moves a function, class, module, config key or CLI flag that other code depends on, keeping the old name as a deprecated alias with warnings and a removal plan.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [maintainer, software-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [plan, diff, docs]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [deprecation, backwards-compatibility, semver, public-api, renames]
pairs_with:
  prompts: [improve-naming, review-api-breaking-changes, write-changelog]
  personas: [refactoring-specialist]
args:
  - name: change
    description: What to rename or move, from what to what, for example "move utils.parse_date to dates.parse", "rename config key cacheTTL to cache.ttlSeconds", "rename CLI flag --out to --output".
    type: text
    required: true
  - name: consumers
    description: Who depends on it today, for example "published npm package, about 300 dependents", "three internal services", "users' config files".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What depends on the old name, Compatibility approach, Diff, Deprecation notice, Removal plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a maintainer who knows that a rename inside one codebase is a refactor, but a rename of something other people call is a breaking change unless it is done in two releases: add the new name and keep the old one working with a deprecation warning, then remove the old one in a later major version (or after an announced window for internal APIs). The details differ by kind of name:
- Functions and classes: the old name becomes an alias or thin wrapper that warns once (`warnings.warn(..., DeprecationWarning, stacklevel=2)` in Python, `@deprecated` JSDoc plus a one-time `process.emitWarning` in Node.js, `@Deprecated` in Java, `[Obsolete]` in C#, `#[deprecated]` in Rust) so type checkers and editors flag it too.
- Modules and import paths: re-export from the old path.
- Config keys, environment variables and CLI flags: accept both, prefer the new one when both are set, warn about the old one, and fail clearly on conflicting values.
- Serialised names (JSON fields, database columns, event names, queue topics): these are data, not code; old producers and stored data keep the old name, so both must be read for as long as old data exists.
Semantic versioning puts removals in major releases; changelogs and migration notes tell people what to do.
</context>

<task>
Plan and apply this rename safely.

Change:
{{change}}

Consumers:
{{consumers}}

1. Find every use of the old name in the repository: code, tests, docs, examples, config templates, scripts, type stubs, and string-based uses (reflection, dependency injection names, serialised data). Say which consumers outside the repository you cannot see.
2. Choose the compatibility approach for this kind of name from the context above. If it is a serialised name with stored data, say that and plan reading both names instead of a simple alias.
3. Apply the change: introduce the new name as the real implementation, make the old name a deprecated alias that warns once and points to the new one, and update all internal uses, docs and examples to the new name. Add a test that the old name still works and warns.
4. Write the deprecation notice for the changelog and docs: what changed, the exact replacement, from which version the old name warns, and when it will be removed.
5. Write the removal plan: the release or date, the check that usage has dropped (download stats, logs of the warning, internal search), and the steps to remove it.
</task>

<constraints>
- Never remove or change the behaviour of the old name in the same release that adds the new one, unless the user confirms there are no outside consumers.
- The alias must behave identically to the new name, including return types, errors and side effects.
- Do not invent version numbers or dates; use placeholders if the user did not give the release plan.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What depends on the old name
Uses found, grouped by kind, plus unseen outside consumers.
## Compatibility approach
The approach and why it fits.
## Diff
The change, including the alias test.
## Deprecation notice
Changelog and docs text.
## Removal plan
When and how the old name goes away.
</output_format>
