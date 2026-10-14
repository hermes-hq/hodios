---
schema: 1
id: move-prompts-into-versioned-templates
kind: prompt
title: Move prompts into versioned templates
description: Moves LLM prompts hard-coded in application strings into versioned template files with declared variables, a loader, render tests and a prompt version logged on every call.
category: ai-ml
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [backend-engineer, ml-engineer, software-engineer, tech-lead]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [code, tests, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [prompt-management, templates, prompt-versioning, maintainability]
pairs_with:
  prompts: [write-llm-eval-suite, reduce-llm-costs]
args:
  - name: scope
    description: Which part of the codebase to cover (directories or features), and the template engine or format the team prefers, if any.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Layout, Code, Tests, Check, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Prompts written as f-strings or template literals scattered through the code cause real trouble once a product depends on them: nobody can see every prompt in one place, small edits slip into unrelated commits, the same instruction drifts between copies, user input is concatenated without delimiters, and when quality drops there is no record of which prompt version produced a given answer. Moving prompts into files is a refactor, so the bar is that the rendered text stays byte-for-byte identical unless a change is intended, and that the move does not add a framework the team did not ask for.
</context>

<task>
Move the prompts in {{scope}} into versioned templates.

1. Inventory every prompt in scope: file and line, what it is for, the variables it interpolates, where user or retrieved content enters, and duplicates or near-duplicates. Include system prompts, tool descriptions and few-shot examples.
2. Choose a layout that fits the project: one file per prompt in a `prompts/` directory, with a header or sidecar for id, version, description and declared variables. Use the template engine the project already has (Jinja2, Handlebars, Mustache, plain format strings); add none if a simple loader will do.
3. Write a loader: load by id, render with a dict of variables, fail loudly on a missing or unknown variable, and return the text plus the prompt id and version. Cache loaded files.
4. Replace each hard-coded prompt with a loader call. Keep user and retrieved content inside clear delimiters as before, or add them if they were missing and note it as a behaviour change.
5. Log the prompt id and version with each model call through the project's existing logging or tracing.
6. Tests: for each prompt, a snapshot test that the rendered text with fixed variables equals the old hard-coded output (proving the move changed nothing), plus tests for missing and extra variables.
7. Run the tests and the project's checks, and report.
8. Describe the versioning rule for the team: bump the version on any text change, and require an eval run in the PR when a prompt changes.
</task>

<constraints>
- Do not reword, fix or "improve" prompt text during the move. Collect suggested wording changes in Follow-ups instead.
- Merge duplicates only when they render identically; otherwise keep both and list them.
- No prompt-management platform or new dependency unless the user asked for one.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: prompt id | old location | variables | user content enters? | notes.
## Layout
The directory structure and file header format.
## Code
Loader and changed call sites, with file paths.
## Tests
Snapshot and variable tests, with file paths.
## Check
Commands run with real results.
## Follow-ups
Duplicates, missing delimiters and wording issues noticed but not changed.
</output_format>
