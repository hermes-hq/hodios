---
schema: 1
id: set-up-git-hooks
kind: prompt
title: Set up shared git hooks
description: Sets up git hooks a whole team gets automatically, covering formatting, linting, secret scanning and commit messages, kept fast and mirrored in CI. Use when bad commits keep reaching review.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, tech-lead, devops-engineer, maintainer]
stack: [git]
requires: [repo-read, file-write]
inputs: [repo, text]
output: [config, docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [git-hooks, pre-commit, secret-scanning, commit-messages, developer-experience]
pairs_with:
  rules: [conventional-commits-rules]
  prompts: [speed-up-ci-pipeline]
args:
  - name: stack
    description: Languages, package managers, formatters and linters in the repository, the operating systems the team uses, and whether it is a monorepo.
    type: text
    required: true
  - name: tool
    description: Hook manager to use, for example pre-commit, Husky with lint-staged, or Lefthook. Leave empty to have one chosen for the stack.
    type: string
output_contract:
  format: markdown
  sections: [Choice, Hooks, Config files, Team setup, CI parity, Troubleshooting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Git does not version the `.git/hooks` folder, so hooks only reach a team through a hook manager committed to the repository and installed automatically during setup. Hooks fail teams in two ways: they are slow (running the whole test suite on every commit), so people learn to skip them with `--no-verify`; or they are the only enforcement, so anything skipped reaches main. Fast hooks on staged files catch mistakes early; CI runs the same checks and is what actually enforces them. Secret scanning belongs in the pre-commit stage, because a secret in a pushed commit has to be rotated, not just removed.
</context>

<task>
Set up shared git hooks for:
<stack>
{{stack}}
</stack>
{{#tool}}Use {{tool}}.{{/tool}}

1. If you can read the repository, find the existing formatters, linters, their configs and any hook setup, and reuse them. If no tool is given, choose one in a sentence: Husky with lint-staged for JavaScript-first repositories, pre-commit for Python or mixed-language repositories, Lefthook when speed or a polyglot monorepo matters.
2. Hooks:
   - **pre-commit**: format and lint only staged files, auto-fixing where the tool can and re-staging the fixes; scan staged changes for secrets (gitleaks or detect-secrets with a committed baseline); block files over a size limit and merge conflict markers. Target under five seconds on a typical commit.
   - **commit-msg**: enforce the team's message convention (for example Conventional Commits with commitlint) only if the team has one; otherwise ask.
   - **pre-push** (optional): type check or a fast test subset, under a minute; skip if CI covers it cheaply.
3. Pin every hook and tool version in config so everyone runs the same thing.
4. Automatic install: a `prepare` script, a setup or bootstrap command, or documented `pre-commit install`, depending on the tool. Make it work on macOS, Linux and Windows (Git Bash or WSL), and inside dev containers if the team uses them.
5. CI parity: a CI job that runs the same checks on all changed files (for pre-commit, `pre-commit run --all-files` or on the diff), so skipped hooks are still caught.
6. Document the escape hatch (`--no-verify` for emergencies) and how to update the secret-scanning baseline after a false positive.
</task>

<constraints>
- Never run the full test suite or network-dependent checks in pre-commit.
- Hooks must not change files that are not staged.
- Do not add a second formatter or linter that overlaps with existing ones.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Choice
Tool and why, in one or two sentences.
## Hooks
Table: hook, checks, scope (staged or all), expected time.
## Config files
Fenced blocks with file paths.
## Team setup
What a new teammate runs, and what happens automatically.
## CI parity
The CI job snippet.
## Troubleshooting
Bullets: slow hooks, Windows line endings or paths, false positives in secret scanning, bypassing in an emergency.
</output_format>
