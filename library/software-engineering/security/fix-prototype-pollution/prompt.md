---
schema: 1
id: fix-prototype-pollution
kind: prompt
title: Fix prototype pollution in JavaScript
description: Fixes prototype pollution in deep merges, path setters, query parsers and config loaders with safe merge helpers, null-prototype objects or Maps, and tests using __proto__ payloads.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, frontend-engineer, fullstack-engineer, security-engineer]
stack: [javascript, typescript]
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [prototype-pollution, deep-merge, input-validation]
pairs_with:
  prompts: [audit-input-handling, audit-dependencies, triage-sast-findings, write-exploit-regression-test]
  personas: [security-auditor]
args:
  - name: target
    description: The code, dependency advisory or scanner finding to fix.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Pollution points, Changes, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Prototype pollution happens when code copies attacker-controlled keys into objects and a key is `__proto__`, `constructor` or `prototype`, so the write lands on `Object.prototype` and every object in the process inherits it. Typical sources are recursive merge and clone helpers, `set(obj, path, value)` style helpers with dotted or bracketed paths, query string parsers that build nested objects (`a[__proto__][isAdmin]=1`), and config loaders that merge user JSON. `JSON.parse` creates an own property named `__proto__`, which becomes dangerous only when a merge copies it later. Impact depends on gadgets: an `isAdmin` check that reads a missing property, options objects in template engines or `child_process.spawn` (which has led to remote code execution), and denial of service by overriding `toString`. Fixes: skip the three dangerous keys in every recursive copy; build lookup tables with `Object.create(null)` or `Map`; check `Object.hasOwn` instead of truthiness for security flags; validate input with a strict schema that forbids extra keys; update vulnerable dependencies (older lodash, minimist, qs, set-value and similar). `Object.freeze(Object.prototype)` or the Node `--disable-proto` flag can harden the process but may break dependencies, so they need testing.
</context>

<task>
Fix prototype pollution in {{target}}.

1. Find the sources: custom deep merge, clone, extend and path-set helpers, calls to dependency helpers that merge user data, nested query parsing settings, and anywhere request JSON is merged into defaults or config.
2. Check the dependency tree for packages with known prototype pollution advisories using the package manager's audit command, and note which are reachable from user input.
3. Fix each source: skip `__proto__`, `constructor` and `prototype` keys in every recursive copy, or replace the helper with a maintained safe one; build dictionaries from user keys with `Map` or `Object.create(null)`; validate request bodies with a schema that rejects unknown keys.
4. Fix the likely gadgets near the sources: security checks that read properties without `Object.hasOwn`, and options objects passed to spawn or template rendering built from merged data.
5. Upgrade vulnerable dependencies where a fixed version exists, within the project's version range policy; list any that need a major upgrade.
6. Add tests that send `{"__proto__": {"polluted": true}}`, `{"constructor": {"prototype": {"polluted": true}}}` and the query string form, then assert `({}).polluted` is undefined and clean up `Object.prototype` after each test.
7. Run the tests, the type check and the audit command again.
</task>

<constraints>
- Always restore `Object.prototype` in test teardown so a failure cannot leak into other tests.
- Do not freeze `Object.prototype` or add `--disable-proto` without running the full test suite and reporting the result.
- Do not upgrade dependencies across major versions without asking.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Pollution points
Table: file:line or package, kind (merge, path set, parser, config), input source, gadget nearby, fix chosen.
## Changes
One line per file or package: what changed.
## Tests
One line per test with its payload.
## Verification
Commands run and their actual results, including the audit output summary.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
