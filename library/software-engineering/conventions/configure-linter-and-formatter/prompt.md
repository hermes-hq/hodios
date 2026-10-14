---
schema: 1
id: configure-linter-and-formatter
kind: prompt
title: Set up a linter and formatter for a project
description: Sets up a linter and formatter for a project's stack with a sane rule set, editor integration, a CI check and a one-time format commit hidden from git blame.
category: conventions
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, tech-lead, maintainer]
requires: [repo-read, file-write, shell, git]
inputs: [repo, config]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [linting, code-formatting, pre-commit, git-blame-ignore-revs, editor-config]
pairs_with:
  prompts: [fix-lint-violations-repo-wide, migrate-eslint-to-flat-config]
  rules: [javascript-style-rules, python-style-rules]
args:
  - name: stack
    description: Languages and frameworks in the repository, for example "TypeScript React frontend and Python FastAPI backend".
    type: string
    required: true
  - name: preferences
    description: Tools or styles the team already wants or rejects, for example "Biome rather than ESLint", "line length 100", "no pre-commit hooks".
    type: text
  - name: ci_system
    description: The CI system where the check should run, for example GitHub Actions or GitLab CI.
    type: string
    default: the CI already configured in the repository
output_contract:
  format: markdown
  sections: [Current state, Tools chosen, Changes, Rollout, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most lint setups go wrong in predictable ways. Two tools fight over formatting (ESLint stylistic rules and Prettier, Flake8 and Black line lengths), so saving a file flips code back and forth. Someone enables every rule in a strict preset and the first run reports 4,000 errors, so the team disables the linter. The formatter runs on the whole codebase in the same pull request as feature work, so `git blame` points every line at one commit and the review is unreadable. Or the tools run in nobody's editor and only fail in CI. A good setup has one formatter that owns layout, a linter that only reports real problems, the same versions locally and in CI, and a one-time format commit listed in `.git-blame-ignore-revs`.
</context>

<task>
Set up linting and formatting for this repository: {{stack}}.
{{#preferences}}
<preferences>
{{preferences}}
</preferences>
{{/preferences}}

1. Inspect the repository first: existing config files (`.eslintrc*`, `eslint.config.*`, `.prettierrc*`, `biome.json`, `pyproject.toml` tool sections, `.editorconfig`, `.golangci.yml`, `.rubocop.yml`), lint scripts in package manifests, pre-commit hooks, CI steps and the editor settings committed. Note the language versions and package manager. Report what exists before changing anything.
2. Choose one formatter and one linter per language, preferring what is already installed and the ecosystem default (for example Prettier or Biome for JavaScript and TypeScript, Ruff for Python lint and format, gofmt and golangci-lint for Go, rustfmt and Clippy for Rust). Explain any replacement in one line. Make sure the linter does not also enforce formatting (use the preset that turns off conflicting rules).
3. Start from the tool's recommended rule set plus a few high-value rules for this stack (for example floating promises in TypeScript, bug-prone patterns in Python). Do not enable a whole strict preset. List each rule you add beyond the recommended set with a one-line reason.
4. Pin the tool versions in the project's dependency file or lockfile. Add scripts or task commands for `lint`, `lint:fix` (or equivalent) and `format:check`.
5. Add editor integration: `.editorconfig` if missing, and recommended editor extensions and format-on-save settings in the committed editor config if the project already commits one.
6. Add a step in {{ci_system}} that runs the format check and lint with the pinned versions and fails the build. Add a pre-commit hook only if the project uses them or the preferences ask for it, and keep it limited to staged files.
7. Run the formatter on the whole codebase as a separate commit with no other changes. Add that commit's hash to `.git-blame-ignore-revs` in a follow-up commit and note the `git config blame.ignoreRevsFile` setting. Do not mix the format commit with config or code fixes.
8. Run the linter. Fix only mechanical, safe violations automatically. If many violations remain, set those rules to warn or add a baseline, and list them for a later cleanup, instead of disabling rules or adding inline suppressions.
9. Run the tests and the build after formatting to prove nothing changed in behaviour. Do not push or merge; leave the commits for review.
</task>

<constraints>
- Do not invent rule names or config keys. If unsure of an exact name for the installed version, check the tool's documentation in the repository's installed package or mark it `[confirm]`.
- Never combine formatting of the whole codebase with any other change in one commit.
- Do not add inline suppressions or disable recommended rules to make the first run pass.
- Ask before replacing a tool the team already uses, unless the preferences say to.
- Do not run commands that rewrite git history or push.
</constraints>

<output_format>
## Current state
Tools, configs, scripts, CI and hooks found.

## Tools chosen
| Language | Formatter | Linter | Version | Why |

## Changes
Files added or changed, rules added beyond the recommended set with reasons, and the commits made in order.

## Rollout
How the team adopts it: editor setup, the blame-ignore setting, what to do with open branches after the format commit.

## Verification
Commands run with results: format check, lint, tests, build. Remaining violations by rule.

## Open questions
Decisions for the team.
</output_format>
