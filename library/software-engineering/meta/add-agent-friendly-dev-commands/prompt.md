---
schema: 1
id: add-agent-friendly-dev-commands
kind: prompt
title: Add agent-friendly dev commands
description: Adds fast, quiet, non-interactive commands to run one test, type-check or lint changed files and build, so coding agents get quick readable feedback instead of long noisy runs.
category: meta
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, tech-lead, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [config, code, docs]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, developer-experience, test-commands, feedback-loop]
pairs_with:
  prompts: [write-agents-md, write-agent-environment-setup, design-coding-agent-hooks]
args:
  - name: pain
    description: What goes wrong today, such as the full test suite takes 12 minutes, output floods the context, a watch mode hangs the agent, lint has no way to target one file.
    type: text
  - name: no_touch
    description: Scripts, CI files or tool configs that must not be changed.
    type: text
output_contract:
  format: markdown
  sections: [Current commands, Added commands, Verification, Instruction file lines, Not changed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An agent learns whether its change worked from command output, and it pays for every line of that output in context. Commands designed for humans fail agents in specific ways: a test runner that defaults to watch mode never exits; a full suite that takes ten minutes gets run after every edit or skipped entirely; progress bars, colour codes and passing-test listings bury the one failing assertion; a lint command that only works on the whole repository reports hundreds of old warnings unrelated to the change. Good agent commands run one target (a file, a package, a test name), exit with a meaningful code, print failures and a short summary, and never prompt for input. They should reuse the project's existing tools and flags rather than add new ones.
</context>

<task>
Add agent-friendly commands to this repository.
{{#pain}}
<pain>
{{pain}}
</pain>
{{/pain}}
{{#no_touch}}
<no_touch>
{{no_touch}}
</no_touch>
{{/no_touch}}

1. Read the repository's task runner files (package scripts, Makefile, task files, tool configs, CI workflows) and list the existing test, lint, type-check, format and build commands. Note which already support targeting and quiet output.
2. Time the existing commands that are safe to run (tests, lint, type-check, build). Do not run commands that deploy, publish, migrate a shared database or delete data; if unsure what a script does, read it first or ask.
3. Add the missing variants using the tools already installed: run one test file or test name, type-check or lint only changed or given files, a non-interactive test run that cannot enter watch mode, a quiet reporter that prints failures and a summary, and one "check" command that runs the fast checks in order and stops at the first failure.
4. Do not add dependencies. If a variant is impossible with the current tools, say so and say what would enable it.
5. Run every new command once against a real target and record time, exit code and how many lines it printed. Introduce a deliberate failure in a scratch copy only if needed to prove failures are readable, and remove it.
6. Add the new commands to the repository's agent instruction file under a commands section, one line each with when to use it.
</task>

<constraints>
- Keep the existing commands working unchanged; add, do not replace, unless the user asked.
- Respect the no-touch list.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current commands
Table: command, what it does, time, output lines, targetable (yes, no).
## Added commands
Table: name, definition, use for.
## Verification
Each new command with the target used, time, exit code, output lines.
## Instruction file lines
The lines added, in a fenced block.
## Not changed
What could not be added and why.
</output_format>
