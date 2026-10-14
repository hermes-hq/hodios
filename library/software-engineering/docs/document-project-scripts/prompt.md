---
schema: 1
id: document-project-scripts
kind: prompt
title: Document a repo's task scripts
description: Documents a repo's existing Makefile targets, npm scripts, justfile recipes or scripts folder with grouped descriptions, a help command and a developer commands section, without changing behaviour.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, maintainer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [docs, diff]
risk: runs-commands
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [makefile, npm-scripts, justfile, developer-commands, help-target]
pairs_with:
  prompts: [write-makefile, write-onboarding-guide, document-shell-script]
args:
  - name: task_files
    description: Which task files to document (Makefile, package.json scripts, justfile, Taskfile, scripts/ folder).
    type: string
    default: every task file in the repo
output_contract:
  format: markdown
  sections: [Commands documented, Dangerous commands, Dead or broken commands, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Repos accumulate task scripts until nobody knows which ones matter: forty npm scripts with names like `build:ci2`, Makefile targets that wrap other targets, and a `scripts/` folder where one file resets the database. New contributors guess, and sometimes run the dangerous one. Good task documentation groups commands by job (setup, develop, test, lint, build, release, database, maintenance), gives each one line saying what it does and when to use it, flags anything destructive or that talks to shared environments, and is discoverable from the terminal (`make help`, `just --list`, a comment convention the help reads) as well as in the docs. The descriptions must come from reading what each command actually runs, following chains of scripts that call other scripts.
</context>

<task>
Document {{task_files}}.

1. List every target, script and recipe. For each, follow what it runs (including scripts that call other scripts and files it executes) and note required env vars, services it needs and side effects.
2. Classify each into groups: setup, develop, test, lint and format, build, release, database, maintenance, CI-only, and unknown.
3. Add descriptions in place using the tool's convention: `## description` comments after Makefile targets read by a `help` target, comments or doc lines on just recipes so `just --list` shows them, and for npm scripts a table in the docs (package.json has no comments). Add a `help` target to a Makefile only if none exists, using the common self-documenting grep pattern.
4. Write or update a "Developer commands" section in the README or CONTRIBUTING with the grouped table and the five commands a new contributor needs first.
5. Mark destructive commands (dropping data, deleting files, force pushes, deploys, touching shared environments) clearly, in both the task file comment and the docs.
6. Run only safe, read-only commands to confirm descriptions (`make help`, `just --list`, `npm run` with no args). Do not run commands to see what they do.
</task>

<constraints>
- Do not change what any command does, rename or delete commands. Report dead or broken ones instead.
- Descriptions must be based on the code they run, not the name.
- Never run destructive or deploy commands.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
Make the edits. Then reply with:
## Commands documented
Files changed and count of commands per group.
## Dangerous commands
Each destructive or shared-environment command and what it affects.
## Dead or broken commands
Commands that reference missing files, tools or scripts. Write "None" if there are none.
## Questions for the owners
Commands whose purpose you could not determine.
</output_format>
