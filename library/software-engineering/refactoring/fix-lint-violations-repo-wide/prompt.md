---
schema: 1
id: fix-lint-violations-repo-wide
kind: prompt
title: Enable a lint rule and fix every violation
description: Enables a new lint or formatter rule and fixes its violations across a repository in small commits, keeping mechanical fixes apart from risky ones. Use when adopting a rule on an existing codebase.
category: refactoring
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, tech-lead, maintainer]
requires: [repo-read, file-write, shell, git]
inputs: [repo, config]
output: [diff, commit-message, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [linting, code-formatting, codemod, git-blame-ignore-revs, mechanical-change]
pairs_with:
  prompts: [reduce-duplication, remove-dead-code]
args:
  - name: rule
    description: The lint or formatter rule to enable, as the tool names it, for example "eqeqeq", "@typescript-eslint/no-floating-promises", "ruff B006" or "prettier on all Markdown".
    type: string
    required: true
  - name: lint_command
    description: The command that runs the linter or formatter check, for example "npx eslint ." or "ruff check .".
    type: string
    required: true
  - name: commit_size
    description: The most files per commit, so each commit stays reviewable.
    type: number
    default: 50
  - name: test_command
    description: The command that runs the tests after each commit.
    type: string
    default: the project's documented test command
output_contract:
  format: markdown
  sections: [Rule, Violations, Commits, Needs human review, Suppressions, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Turning on a new rule across a whole repository produces hundreds of changes. Most are mechanical and safe; a few look mechanical but change behaviour. Examples: `==` to `===` changes how `null` and `undefined` compare; awaiting a previously floating promise changes timing and error propagation; replacing a mutable default argument changes what callers that relied on shared state see; `prefer-const` is safe but `no-param-reassign` fixes can alter aliasing. A reviewer cannot find those few inside one giant diff, and a blanket `eslint-disable` or `noqa` hides the problem the rule was enabled to catch.
</context>

<task>
Enable `{{rule}}` and fix its violations across the repository.

1. Read the lint configuration and confirm the rule's exact name and options for the tool and version installed. If the rule does not exist in that version, or needs a plugin that is not installed, say so and stop.
2. Enable the rule in the config at the level the team uses for enforced rules, and run `{{lint_command}}` to count violations per file and per directory. Save the list.
3. Classify every violation:
   - **Mechanical, auto-fixable**: the tool's own fix produces an equivalent program (formatting, import order, `prefer-const`).
   - **Mechanical, manual**: needs a hand edit but cannot change behaviour.
   - **Possibly behaviour-changing**: the fix can change what the program does in some input or timing. Explain the difference for each pattern.
4. Commit in this order, each commit at most {{commit_size}} files, grouped by directory or package:
   a. The config change alone, with the rule set to warn if the tool allows, so the build does not break mid-way.
   b. Auto-fixable violations, using the tool's fix command. If the commits are pure formatting, add their hashes to `.git-blame-ignore-revs` (create it if missing and mention the git config line developers need).
   c. Manual mechanical fixes.
   d. Behaviour-changing fixes, each pattern in its own commit, with a test where the behaviour is covered or reachable; skip any you cannot verify and list it for review instead.
   e. Raise the rule to error once the count is zero (or only reviewed, listed exceptions remain).
5. After every commit run `{{lint_command}}` and `{{test_command}}`; a commit that breaks tests is reverted and its pattern moved to the review list.
6. Where a violation is intentional, add a per-line suppression naming the rule with a short reason. Never add file-wide or repo-wide suppressions, and never exclude directories from the linter to reduce the count.
</task>

<constraints>
- Change only what the rule requires; no unrelated refactors, renames or formatting of untouched lines in the same commits.
- Do not touch generated, vendored or third-party code; exclude it through the linter's existing ignore mechanism if it is not already excluded, and say so.
- Commit messages say what rule and which kind of fix, for example "Apply eqeqeq auto-fixes in packages/api".
- If the violation count is so large that the commit plan exceeds about twenty commits, stop after the config and auto-fix commits and report the plan for the rest.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Rule
Name, options, level before and after, and tool version.

## Violations
Total at start and at end, and a table: Kind | Count | Example pattern.

## Commits
Table: Commit | Kind | Files | Lint result | Test result.

## Needs human review
Table: File and line | Pattern | Why it may change behaviour | Suggested fix.

## Suppressions
Each per-line suppression with its reason, and the total.

## Verification
The final lint and test runs and their real results.
</output_format>
