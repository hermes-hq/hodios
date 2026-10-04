---
schema: 1
id: write-onboarding-guide
kind: prompt
title: Write a developer onboarding guide
description: Writes an onboarding guide for a repository covering setup, an architecture map, first tasks and known gotchas, with every command checked against the repo. Use for new hires or contributors.
category: docs
version: 1.0.1
status: incubating
aliases: [doc-onboarding]
stage: [build]
role: [tech-lead, engineering-manager, maintainer, technical-writer]
stack: []
requires: [repo-read, shell]
inputs: [repo]
output: [docs]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [developer-experience, getting-started, new-hire]
pairs_with:
  personas: [technical-writer]
args:
  - name: repo
    description: The repository to document (path or name), plus anything the code cannot tell you, such as team channels, access to request or the review process.
    type: text
    required: true
  - name: audience
    description: Who the guide is for. new-hire = an employee with access to internal systems; contributor = an outside contributor with only the public repository.
    type: enum
    enum: [new-hire, contributor]
    default: new-hire
output_contract:
  format: markdown
  sections: [Guide, Verification log, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id doc-onboarding."}
---
<context>
Onboarding guides rot because they are written from memory: a setup step was changed in CI but not in the README, a required environment variable was never written down, and the architecture section describes the system as it was planned. A useful guide is derived from the repository itself, its commands are run or cross-checked against CI, and it is honest about what the writer could not verify. It gets a new person to a running system, a passing test suite and a first merged change, and tells them where the traps are.
</context>

<task>
Write an onboarding guide for {{repo}}, for a {{audience}}.

1. Read the sources of truth before writing: README and docs folder, manifests and lockfiles, version files (.nvmrc, .tool-versions, rust-toolchain and the like), Makefile or task runner, Dockerfile and compose files, environment templates (.env.example), CI workflows, contributing guide, code owners, and the top-level directory layout.
2. Derive setup from what CI actually runs, not only from the README. Where they disagree, follow CI and note the discrepancy.
3. If you can run commands, run the setup, build, test and lint commands in a clean state and record what happened. Do not run commands that deploy, push, migrate shared databases or spend money. If you cannot run them, mark each command "not run".
4. Build the architecture map: entry points, main modules and what each owns, how a typical request or job flows through the code, where data is stored, and external services the code calls. Link to the files.
5. Pick 3 to 5 first tasks that touch different areas and are small: a labelled good-first issue, a missing test, a docs gap you found. Say what each teaches.
6. Collect gotchas from evidence: discrepancies you found, scripts with surprising side effects, required services or secrets, slow or flaky test suites, generated files that must not be edited, platform-specific steps.
7. For a contributor, cover only what is possible with public access (fork, DCO or CLA, how to run CI locally). For a new hire, include placeholders for access requests and people to ask, written as `TODO(owner): …` rather than invented names or links.
</task>

<constraints>
- Every command in the guide must come from the repository or be one you ran. Do not invent scripts, environment variables, URLs, channels or people.
- Keep it scannable: numbered setup steps, one command per code block, expected output where it helps the reader know it worked.
- Write for someone smart who knows the language but not this codebase. Define internal terms on first use.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Guide
The guide in Markdown with these sections: Prerequisites (with versions), Setup, Run it, Tests and checks, Architecture map, How work flows (branches, reviews, CI, release), First tasks, Gotchas, Where to get help.
## Verification log
Table: Command | Ran? | Result. Then any README and CI discrepancies.
## Open questions
What the maintainers must fill in or confirm, as a checklist.
</output_format>
