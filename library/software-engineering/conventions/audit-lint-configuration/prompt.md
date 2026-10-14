---
schema: 1
id: audit-lint-configuration
kind: prompt
title: Audit a project's lint and formatter setup
description: Audits an existing lint and formatter setup for conflicting tools, disabled rules, inline suppressions, version drift and missing high-value rules, with a ranked cleanup plan.
category: conventions
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [tech-lead, software-engineer, maintainer]
requires: [repo-read, shell]
inputs: [repo, config]
output: [report, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [linting, code-formatting, lint-suppressions, tooling-audit, technical-debt]
pairs_with:
  prompts: [fix-lint-violations-repo-wide, configure-linter-and-formatter, write-team-coding-standards]
args:
  - name: scope
    description: The part of the repository to audit, such as the whole repository or one package in a monorepo.
    type: string
    default: the whole repository
  - name: concerns
    description: What prompted the audit, for example "CI lint passes but editors show different errors" or "too many eslint-disable comments".
    type: text
output_contract:
  format: markdown
  sections: [Summary, Tooling map, Findings, Suppressions, Cleanup plan, Not checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lint configurations decay quietly. Rules get turned off to unblock one pull request and never come back. Inline `eslint-disable`, `noqa`, `@ts-ignore`, `#[allow]` and `rubocop:disable` comments pile up, many without a reason and some hiding real bugs. Different packages in a monorepo extend different presets. The CI runs one tool version and editors run another, so the same file passes in one place and fails in the other. Some checks that catch real bugs (unawaited promises, unused results, bare excepts, shadowed variables) were never enabled. An audit is useful only if it measures these from the repository itself and ranks the fixes by value, not by listing every possible rule.
</context>

<task>
Audit the lint and formatting setup in {{scope}}.
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}

1. Map the tooling: every linter, formatter and type checker configured, their config files and how configs inherit or override each other (presets, per-directory overrides, monorepo packages), the versions in the lockfile, and where each runs (scripts, pre-commit, CI, committed editor settings).
2. Check for conflicts: two tools formatting the same files, linter stylistic rules that fight the formatter, different settings in different packages for no reason, and different versions or commands between CI and local scripts.
3. Run the linters and type checker read-only (no `--fix`) and record counts of errors and warnings by rule. Note rules set to warn that have hundreds of hits nobody acts on.
4. Find disabled and weakened rules in config, and for each say whether disabling it looks deliberate (comment, documented reason) or like a past workaround.
5. Count inline suppressions by rule and directory. Sample them and classify: justified with a reason, unjustified but harmless, or hiding a likely bug. Flag blanket suppressions (file-wide or rule-less disables).
6. List high-value rules for this stack that are missing, only where they catch real defects, with the expected violation count if you can measure it.
7. Rank the cleanup into a plan: quick wins (conflicts, version alignment), then rules to re-enable, then suppressions to remove, then new rules, each with effort, risk and a suggested order of pull requests.
8. Do not change any files. This is an audit.
</task>

<constraints>
- Base every finding on files or command output from the repository, with paths and counts. Do not guess counts.
- Do not invent rule names; if unsure of an exact name for the installed version, describe the check and mark it `[confirm rule name]`.
- Do not recommend enabling a whole strict preset; recommend individual rules with reasons.
- Run only read-only commands. No `--fix`, no installs that change the lockfile.
</constraints>

<output_format>
## Summary
Three to five sentences: overall health and the most valuable fixes.

## Tooling map
| Tool | Version | Config | Applies to | Runs in (local, hook, CI, editor) |

## Findings
Numbered, each with severity (high, medium, low), evidence (file and line or command output) and the fix.

## Suppressions
| Rule | Count | Directories | Classification | Example |

## Cleanup plan
Ordered pull requests with effort and risk.

## Not checked
What the audit could not verify and why.
</output_format>
