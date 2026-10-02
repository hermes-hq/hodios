---
schema: 1
id: remove-dead-code
kind: prompt
title: Remove dead code safely
description: Finds unused functions, files, flags and dependencies, proves each one is unreachable, including dynamic and external uses, and removes only what is proven dead. Use to shrink a codebase.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, maintainer]
stack: []
requires: [repo-read, file-write, shell, git]
inputs: [repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dead-code, unused-dependencies]
pairs_with:
  prompts: [retire-unused-code-paths]
args:
  - name: scope
    description: The directory, package or module to clean up.
    type: text
    required: true
  - name: public_api
    description: Whether code in scope is used outside this repository, for example a published library or a service other teams import.
    type: enum
    enum: ["yes", "no", "unknown"]
    default: unknown
output_contract:
  format: markdown
  sections: [Removed, Kept, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dead code costs reading time, build time and false leads when debugging. But "no references found" is not proof of death: code is also reached through reflection, dependency injection, string lookups, routing tables, templates, serialization, plugins, scheduled jobs and callers in other repositories. Removing live code is an outage; leaving dead code is only clutter. When in doubt, keep it.
</context>

<task>
Find and remove dead code in {{scope}}. Used outside this repository: {{public_api}}.
1. **Find candidates:** unreferenced functions, classes, exports and files; branches that can never run; feature flags that are always on or always off; configuration nobody reads; dependencies nothing imports. Use the language's tooling where it exists (compiler warnings, unused-export or unused-dependency tools) and text search.
2. **Prove each candidate dead.** Search the whole repository, not only the scope, for the name as a string as well as a symbol. Check dynamic dispatch and reflection, DI containers, routes, templates, config files, build scripts, cron and job definitions, serialization or ORM mappings, and tests.
3. **Classify:**
   - **dead**: no path reaches it, and it is not public API used elsewhere;
   - **likely dead**: no reference found, but it is reachable dynamically or by external callers;
   - **alive**: a reference was found.
4. Remove only **dead** items, in small commits grouped by kind, so each can be reverted alone. When a test exists only to exercise dead code, remove the test with it.
5. Run the build, type checker, linter and tests after the removal.
</task>

<constraints>
- If {{public_api}} is `yes` or `unknown`, treat exported or public symbols as **likely dead** at most, and do not remove them. Code that only runtime evidence can prove unused, such as endpoints, jobs and flags, needs a staged retirement, not a deletion.
- Never remove code just because it is old, commented as deprecated, or unused in tests only.
- Do not refactor or reformat code that stays.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Removed
A table: Item | Where | Evidence it was dead.
## Kept
A table: Item | Where | Why it was kept (likely dead or alive, and the reference found). Or "None".
## Verification
Build, type-check, lint and test commands with results.
</output_format>
