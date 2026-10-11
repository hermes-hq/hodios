---
schema: 1
id: write-tests-for-diff
kind: prompt
title: Write tests for a diff
description: Writes tests for the behaviour a pull request or diff changes, covering new branches, edge cases and the bug it fixes, and proves they fail without the change.
category: testing
version: 1.0.0
status: incubating
stage: [verify, review]
role: [software-engineer, qa-engineer]
requires: [repo-read, file-write, shell, git]
inputs: [diff, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pull-request, test-gaps, changed-code, regression]
pairs_with:
  prompts: [fill-test-gaps, add-regression-test, review-test-quality]
  personas: [test-engineer]
args:
  - name: change
    description: The diff, branch or pull request to cover, plus its intent (the ticket or PR description) if not in the commits.
    type: text
    required: true
  - name: test_command
    description: The command that runs the relevant tests, if not obvious from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Behaviour changed, Tests added, Proof they detect the change, Not covered]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tests written after a change tend to restate the implementation: they call the new function with the values the author had in mind and assert whatever it returns, so they pass with or without the change and protect nothing. Tests for a diff should start from the behaviour change, not the lines: what can the system do now, or do differently, that it could not before, and which new branches, conditions and error paths were introduced. The strongest check is cheap: run the new tests against the code before the change (or with the change reverted) and confirm they fail. A bug-fix diff needs at least one test that reproduces the original bug.
</context>

<task>
Write tests for this change:
{{change}}
{{#test_command}}
Run tests with: {{test_command}}
{{/test_command}}

1. Read the diff in full and the surrounding code, plus the existing tests for the touched modules. Identify the test framework, helpers and conventions to follow.
2. Write down the behaviour change in a few bullets: new capabilities, changed outputs, new branches and conditions, new error handling, and for a fix, the input that used to fail.
3. Check which of these existing tests already cover. Do not duplicate them.
4. Write tests for the uncovered behaviour, at the level where the existing tests for that module live: each new branch, the boundaries of new conditions, the error paths, and a reproduction of the fixed bug. Assert on observable outcomes, not on internal calls, unless the interaction is the behaviour.
5. Run the new tests on the changed code; they must pass.
6. Prove they detect the change: temporarily revert or stash the production-code part of the diff (never the tests, and never by discarding uncommitted work you did not create), run the new tests, and record which fail. Then restore the change and confirm everything passes again. If you cannot do this safely, ask before touching the working tree and explain how the user can run the check.
7. If a test cannot fail without the change, rewrite it or drop it and say why.
8. Run the module's full test file or suite to check nothing else broke.
</task>

<constraints>
- Change only test files unless a testability problem blocks you; then stop and describe it rather than changing production code.
- Do not lose or overwrite the user's uncommitted work; prefer a separate worktree or a stash you restore, and confirm before any step that alters the working tree.
- If the change looks wrong while you test it, report it as a possible defect instead of asserting the wrong behaviour.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Behaviour changed
Bullets.

## Tests added
Diff of the test files, each test with a one-line comment or name stating the behaviour.

## Proof they detect the change
Table: test | passes with change | fails without change.

## Not covered
Behaviour left untested and why, plus any suspected defects.
</output_format>
