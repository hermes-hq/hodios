---
schema: 1
id: write-test-strategy
kind: prompt
title: Write a test strategy for a codebase or team
description: Writes a test strategy for a codebase or team covering test levels, what each level owns, tooling, environments, CI gates and ownership. Use when tests grew without a plan.
category: testing
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, qa-engineer, engineering-manager, software-engineer]
requires: [none]
inputs: [text, repo]
output: [plan, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [test-pyramid, ci-gates, quality-engineering, test-ownership]
pairs_with:
  prompts: [write-test-plan, speed-up-test-suite, review-test-quality]
  personas: [test-engineer]
args:
  - name: system
    description: What the system is (services, apps, data pipelines), its languages and frameworks, how it is deployed, and how often it ships.
    type: text
    required: true
  - name: current_state
    description: What testing exists today - suites by level, rough counts, runtimes, flakiness, coverage, manual testing, what runs in CI and what escapes to production.
    type: text
  - name: constraints
    description: Team size and skills, whether there is a dedicated QA function, budget for tools or devices, regulatory or audit needs, deadlines.
    type: text
output_contract:
  format: markdown
  sections: [Goals and quality risks, Test levels, Tooling, Environments and data, CI gates, Ownership, Migration path, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A test strategy is the standing agreement on how a team gets confidence to ship, as distinct from a test plan for one release. Most teams never write one, so tests accumulate where it was easiest: thousands of mocked unit tests that pass while integrations break, or a slow end-to-end suite that catches everything late and flakes. A useful strategy starts from the failures the team actually suffers (what escaped to production, what slows merges), assigns each kind of risk to the cheapest level that can catch it, defines exactly what each level may and may not touch (real database or not, network or not), and sets CI gates that are fast enough that people do not bypass them. The shape (pyramid, trophy, honeycomb) matters less than these boundaries being explicit. A strategy that needs a team twice the current size will not happen; it must include a path from today's state.
</context>

<task>
Write a test strategy for:
{{system}}
{{#current_state}}

Current testing: {{current_state}}
{{/current_state}}
{{#constraints}}

Constraints: {{constraints}}
{{/constraints}}

1. State the goals in terms of outcomes: which defects must not reach production (money, data loss, security, outages, critical journeys), target time from push to merge-ready signal, and acceptable flake rate. Tie each goal to an observed problem from the current state where one is given.
2. Define the test levels the system needs (for example unit, component, integration, contract, end-to-end, non-functional, manual exploratory). For each level give: what it is for, what it is allowed to use (in-process only, real database in a container, real network, deployed environment), what it must not test, the expected speed per test, and the rough share of the suite.
3. Map the main quality risks to levels: each risk goes to the cheapest level that can catch it. Call out risks that only a higher level can catch (configuration, wiring between services, browser behaviour, migrations) and risks no automated level catches (usability, exploratory edge cases).
4. Choose tooling per level for the stated stack, preferring what the team already uses. Name a replacement only with a concrete reason.
5. Describe environments and test data: ephemeral versus shared environments, how data is created and reset, how third parties are faked or sandboxed, and the rule that no real personal data is used.
6. Define CI gates: what runs on every push, on pull requests, on merge to main, before deploy and nightly, with a time budget for each stage. Include rules for flaky tests (quarantine with an owner and a deadline) and for coverage (changed lines, not a global number).
7. Assign ownership: who writes tests at each level, who owns shared fixtures and environments, who triages failures and how fast.
8. Write a migration path from today's state in three to five ordered steps, each small enough for one quarter, starting with the step that removes the most pain.

If the system description gives no idea of architecture or stack, ask for it and stop.
</task>

<constraints>
- Do not prescribe a ratio between levels as a rule; justify the shape from the system's risks.
- Do not recommend replacing working tools or rewriting suites without a stated reason and cost.
- Every gate must have a time budget and a stated action on failure.
- Do not invent current metrics; mark estimates as estimates.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals and quality risks
Bullets, each goal tied to an observed problem.

## Test levels
Table: level | purpose | may use | must not test | speed per test | share of suite.

## Tooling
Table: level | tool | why.

## Environments and data
Bullets.

## CI gates
Table: trigger | what runs | time budget | on failure.

## Ownership
Bullets by role.

## Migration path
Numbered steps, ordered by pain removed.

## Open questions
Only questions whose answers change the strategy.
</output_format>
