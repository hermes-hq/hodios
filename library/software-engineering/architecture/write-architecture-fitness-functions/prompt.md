---
schema: 1
id: write-architecture-fitness-functions
kind: prompt
title: Write architecture fitness functions
description: Turns architecture decisions and quality goals into automated fitness functions, such as dependency rules, latency budgets and coupling limits, that run in CI and fail when the design erodes.
category: architecture
version: 1.0.0
status: incubating
stage: [design, verify]
role: [architect, tech-lead, backend-engineer]
requires: [none]
inputs: [repo, document, text]
output: [code, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [fitness-functions, evolutionary-architecture, dependency-rules, architecture-tests, ci-checks]
pairs_with:
  personas: [software-architect]
  prompts: [write-adr, review-codebase-architecture, untangle-circular-dependencies]
args:
  - name: decisions
    description: The architecture decisions or quality goals to protect, for example ADRs, "the domain layer never imports the web framework", "p95 checkout latency under 300 ms".
    type: text
    required: true
  - name: codebase
    description: Language, build tool, module or package layout, CI system, and any architecture or lint tooling already in use. Paste the module tree if you can.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fitness functions, Code, Rollout, Not automatable]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Architecture erodes one reasonable-looking pull request at a time: a controller that queries the database directly, a shared module that quietly grows a dependency on a feature, a new synchronous call that breaks a latency budget. ADRs record intent but do not stop drift. A fitness function is an objective, automated check of one architectural characteristic, run where it gives fast feedback: a unit-test-style dependency rule in CI, a build-time size or cycle check, a performance budget in a nightly job, or a production metric with an alert. Good ones are specific, cheap, owned and explain how to fix a failure. Rules adopted on a codebase that already violates them must start with a frozen baseline of known violations, or the team will disable them on day one.
</context>

<task>
<decisions>
{{decisions}}
</decisions>

<codebase>
{{codebase}}
</codebase>

1. Restate each decision or goal as a measurable characteristic. If one is too vague to measure ("the code should be modular"), propose a concrete proxy and label it as your proposal.
2. For each, design a fitness function: what it measures, the threshold, whether it is atomic (one characteristic) or holistic (several together), where it runs (pre-commit, CI on every PR, nightly, production monitoring), and why that trigger fits its cost and speed.
3. Choose tooling that matches the stack and what is already in use: architecture test libraries or import linters for dependency rules, build graph queries for module cycles, bundle or binary size checks, API diff tools for compatibility, load test thresholds for latency budgets, metric alerts for runtime properties. Prefer extending existing tools over adding new ones, and name tools only if you are confident they exist for this stack; otherwise describe the check generically.
4. Write the code or configuration for the three most valuable functions, with a failure message that names the rule, the ADR it protects and how to fix the violation.
5. Plan the rollout: measure current violations first, freeze them as an explicit baseline or allow-list that may only shrink, make new violations fail the build, assign an owner per function, and set a review date for each threshold.
6. List decisions that cannot be checked automatically and the lightweight human check that replaces them (for example a review checklist item).
</task>

<constraints>
- Every function has a numeric or boolean pass condition; no "should be fast".
- Do not invent APIs of a library you are unsure about; write a generic version or mark the call to verify.
- Keep CI functions fast enough for every pull request; move slow ones to nightly and say so.
- Do not propose more than eight functions; rank them by the cost of the erosion they prevent.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Fitness functions
Table: characteristic, decision protected, check, threshold, trigger, owner, rank.
## Code
The top three checks as code blocks, each with the file it lives in and its failure message.
## Rollout
Numbered steps, including the baseline of existing violations.
## Not automatable
Bullets: decision, why, the human check instead.
</output_format>
