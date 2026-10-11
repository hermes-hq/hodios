---
schema: 1
id: set-up-coverage-gate
kind: prompt
title: Set up a coverage gate in CI
description: Configures coverage reporting with sensible exclusions and a CI gate on changed lines (diff coverage) plus a no-drop rule, instead of an arbitrary global percentage.
category: testing
version: 1.0.0
status: incubating
stage: [build, ship]
role: [software-engineer, tech-lead, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [config]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [coverage, diff-coverage, ci-gates, quality-gates]
pairs_with:
  prompts: [test-coverage-campaign-track, set-up-testing-in-new-project, run-mutation-testing]
  personas: [test-engineer]
args:
  - name: project
    description: The project, its test framework and CI system, and any coverage tooling or service already in use.
    type: text
    required: true
  - name: target
    description: The changed-lines target you want (for example 80%), or leave empty for a recommendation.
    type: string
output_contract:
  format: markdown
  sections: [Current coverage, Configuration, CI gate, Exclusions, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A global coverage threshold either blocks nobody (set below the current number) or blocks the unlucky person who touches a poorly covered legacy file, and it invites tests written to execute lines rather than check behaviour. Gating on the coverage of changed lines in each pull request (diff or patch coverage) asks the right question: is the new code tested? Pair it with a rule that overall coverage must not drop by more than a small tolerance. Exclusions decide whether the number means anything: generated code, migrations, type-only files, vendored code and test files themselves should be excluded, but excluding hard-to-test business logic to raise the number defeats the gate. Branch coverage reveals untested conditions that line coverage hides. Coverage still does not prove assertions exist; mutation testing does that.
</context>

<task>
Set up a coverage gate for:
{{project}}
{{#target}}
Changed-lines target: {{target}}
{{/target}}

1. Read the test configuration, CI pipeline and any existing coverage config or service integration. Run the test suite with coverage to get the current line and branch numbers; report them.
2. Configure the coverage tool for the stack: enable branch coverage where supported, set the source roots, and write a machine-readable report (LCOV, Cobertura XML or the tool's JSON) for CI.
3. Define exclusions with a one-line reason each: generated code, migrations, vendored code, test files, type-only or interface-only files, entry-point bootstrapping. Do not exclude business logic.
4. Add the diff coverage gate in CI: compute coverage on lines changed relative to the target branch using the project's existing coverage service if there is one, or a diff-coverage tool for the stack otherwise. Set the target (default 80% of changed lines if none given) and make the check fail the pipeline with a message pointing to the uncovered lines.
5. Add the no-drop rule: overall coverage may not fall more than a stated tolerance (for example 0.5 points) below the target branch, or below a floor set just under today's number.
6. Make sure the CI job fetches enough git history for the diff and handles pull requests from forks without leaking secrets (no token-based upload where secrets are unavailable, or use the service's tokenless mode).
7. Verify: run the check locally or in a test pull request against a branch with a deliberately uncovered change, and confirm it fails, then covered, and confirm it passes. Report anything you could not run.
</task>

<constraints>
- Do not set a global threshold above today's coverage that would block all work.
- Do not add exclusions to raise the number.
- No coverage service tokens in the repository; reference CI secrets by name.
- Keep the CI change limited to coverage; do not restructure unrelated jobs.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current coverage
Line and branch numbers measured, with the command.

## Configuration
Diff of the coverage tool config.

## CI gate
Diff of the CI change, the diff-coverage target and the no-drop rule.

## Exclusions
Table: path or pattern | reason.

## Verification
How the gate was shown to fail and pass, or what remains to check.
</output_format>
