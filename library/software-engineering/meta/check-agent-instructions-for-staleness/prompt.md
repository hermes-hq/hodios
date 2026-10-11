---
schema: 1
id: check-agent-instructions-for-staleness
kind: prompt
title: Check agent instructions for stale claims
description: Verifies every command, path, version and convention claimed in a repo's agent instruction files against the code, fixes the wrong ones and adds a CI check that catches drift.
category: meta
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [software-engineer, tech-lead, maintainer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [report, diff, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, agent-instructions, docs-drift, ci-checks]
pairs_with:
  prompts: [prune-agent-instructions, write-agents-md, consolidate-agent-instruction-files, fix-ignored-agent-instruction]
args:
  - name: files
    description: Which instruction files to check (for example AGENTS.md, CLAUDE.md, rule folders). Leave empty to find them all.
    type: text
  - name: ci
    description: The CI system and whether adding a check job is allowed.
    type: text
output_contract:
  format: markdown
  sections: [Claims checked, Fixes, Drift check, Not verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agents follow instruction files literally and confidently. A command that was renamed, a directory that moved, a "we use library X" after the switch to Y, or a version that is two majors behind produces wrong work that looks deliberate. Instruction files go stale because nobody runs them: the code changes in a pull request, the instruction file does not. Pruning removes noise; this job checks truth. Each line is a claim of one kind: a command (does it exist and succeed), a path (does it exist), a convention (does the code actually follow it), a version or tool (does the lockfile or config agree), or a prohibition (does it still refer to something real). The checks that can be automated (paths exist, named scripts exist) belong in CI so the file cannot silently rot again.
</context>

<task>
Check the agent instruction files in this repository.
{{#files}}Files: {{files}}{{/files}}
{{#ci}}CI: {{ci}}{{/ci}}

1. Find the instruction files (repository root, nested folders, tool-specific rule folders). List them.
2. Extract every checkable claim and classify it: command, path, convention, version or tool, prohibition.
3. Verify each claim against the repository: look up paths, find named scripts in the task runner files, compare versions with lockfiles and configs, and sample two or three files for each convention. Run commands only if they are clearly safe checks (test, lint, type-check, build, format check). Never run commands that deploy, publish, migrate, reset data or push; list them as "not run" instead.
4. Mark each claim true, false, partly true or not verified, with the evidence (file and line, command output summary).
5. Fix false and partly true claims in place with the smallest edit. Do not rewrite the file's structure or remove lines that are only unverified.
6. Add a drift check: a small script or CI step that extracts referenced paths and script names from the instruction files and fails if any no longer exist. Use only tools already in the repository. If adding CI is not allowed, put the script in place and explain how to run it.
</task>

<constraints>
- Evidence for every verdict; never mark a claim true because it sounds right.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Claims checked
Table: file, line, claim, type, verdict, evidence.
## Fixes
The diff of instruction file changes.
## Drift check
The script or CI step in a fenced block, where it lives, and its first run result.
## Not verified
Claims that could not be checked and why.
</output_format>
