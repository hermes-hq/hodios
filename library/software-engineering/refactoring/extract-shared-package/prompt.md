---
schema: 1
id: extract-shared-package
kind: prompt
title: Extract copied code into a shared package
description: Turns code copied between services, apps or repositories into one versioned internal package, reconciling drifted copies, defining a small public API and moving each consumer over one at a time.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain, plan]
role: [software-engineer, tech-lead, backend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [plan, diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [internal-packages, code-reuse, versioning, monorepo, drift]
pairs_with:
  prompts: [reduce-duplication, rename-public-api-safely]
  personas: [refactoring-specialist]
args:
  - name: copies
    description: Where the copies live (repositories, services, folders), what the code does (for example "auth token validation", "money formatting", "event schemas"), and how consumers are built and deployed.
    type: text
    required: true
  - name: distribution
    description: How shared code can be distributed here, for example "monorepo with npm workspaces", "private PyPI index", "Maven repository", "Go modules on our Git server". Say if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Copies and drift, Decision, Package design, Migration plan, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who has seen both sides of shared code. Copies drift: a security fix lands in one service and not the other three, and after a year nobody knows which copy is right. A shared package fixes that, but brings coupling: every consumer now depends on a release process, a version, and the package's dependencies. It pays off when the code is a stable, well-bounded capability (validation, formatting, protocol clients, schemas, auth checks) and the copies must behave the same. It does not pay off for code that only looks alike but serves different purposes, or for code that changes weekly in step with one service.

Done well: the copies are compared first and differences resolved on purpose; the package has a small public API, its own tests, semantic versioning and a changelog; its dependencies are minimal and declared as peers where consumers bring their own framework; and consumers move one at a time, each verified, with the old copy deleted in the same change. In a monorepo, a workspace package with a single version policy avoids a release step. Across repositories, a private registry and automated dependency updates keep consumers from falling behind.
</context>

<task>
Extract the copied code into a shared package.

Copies:
{{copies}}

{{#distribution}}Distribution: {{distribution}}{{/distribution}}

1. Find and compare every copy. Show the differences between them (a diff against the most common version), and classify each difference as a bug fix one copy has, a deliberate local variation, or accidental drift.
2. Decide whether a shared package is right, using the criteria above. If it is not, say so and suggest the alternative (keep copies with a sync check, or merge only the stable part). Stop if the answer is no.
3. Design the package: name, the small public API (only what consumers use), what stays out of it, dependencies and peer dependencies, how deliberate variations become parameters, its tests (start from the union of the copies' tests and the differences found), versioning and changelog, and how it is published given the distribution method. If the distribution method is unknown, ask.
4. List the drift decisions the user must make before code is merged (which behaviour wins where copies differ) and wait for them.
5. Plan the migration one consumer at a time: add the package, switch imports, run that consumer's tests, delete its copy, deploy. Start with the consumer with the best tests. Say how consumers will get future updates (automated dependency updates, a version policy).
6. Create the package and migrate the first consumer, running its tests, and report results.
</task>

<constraints>
- Never merge drifted copies by picking one silently; every behavioural difference is a decision for the user.
- Keep the package's public API as small as current consumers need; no speculative options.
- Do not publish to a public registry; internal code stays on the internal distribution channel.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Copies and drift
Table: location, version or last change, differences from the common version, classification.
## Decision
Package or not, with reasons.
## Package design
Name, public API, dependencies, tests, versioning, publishing.
## Migration plan
Order of consumers and steps per consumer, plus drift decisions needed.
## Check
Results for the first migrated consumer.
</output_format>
