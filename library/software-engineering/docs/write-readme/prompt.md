---
schema: 1
id: write-readme
kind: prompt
title: Write a README
description: Writes or improves a project README from what the code actually does, with an install and quick start that work when copied. Use for a new project or a README that has drifted.
category: docs
version: 1.0.1
status: experimental
aliases: [doc-readme]
stage: [ship, maintain]
role: [software-engineer, maintainer, technical-writer]
requires: [repo-read, file-write]
inputs: [repo]
output: [docs]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [readme, open-source]
pairs_with:
  personas: [technical-writer]
args:
  - name: audience
    description: Who the README is mainly for.
    type: enum
    enum: [users, contributors, both]
    default: users
  - name: notes
    description: Anything the code cannot tell you, such as why the project exists, its status or who maintains it.
    type: text
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id doc-readme."}
---
<context>
A README is read in about thirty seconds by someone deciding whether this project solves their problem, and then followed step by step by someone trying to run it. Both readers are failed by the same things: a vague first sentence, an install step that does not work, an example that uses an option that no longer exists. Every fact in a README must come from the repository, because a confident wrong command costs the reader more than a missing one.
</context>

<task>
Write the README for the repository in the working directory, mainly for {{audience}}.
{{#notes}}
Notes from the author: {{notes}}
{{/notes}}

1. Gather facts before writing. Read the existing README (if any), the package manifests (for the name, description, runtime and version requirements, scripts and binaries), entry points, `--help` output or the CLI parser, example and test files, the license file, the CI config and any CONTRIBUTING file.
2. Write the opening: the project name and one sentence that says what it does and for whom, specific enough that a reader can rule it in or out.
3. Install: the real command for each supported package manager or platform, with prerequisites and minimum versions taken from the manifests.
4. Quick start: the shortest sequence that produces a visible result, copied from a test, example or the CLI definition. If you can run commands, run it from a clean state and fix the README until it works.
5. Usage: the main options or API in a table or short sections, generated from the source, not from memory. Link to fuller docs if they exist instead of duplicating them.
6. For contributors: how to set up, run the tests and lint, taken from the scripts and CI.
7. Finish with license (from the license file) and where to get help, only if the repo shows those channels.
8. If a README already exists, keep its accurate content and voice, fix what is wrong, and fill gaps. Do not rewrite sections that are correct.
</task>

<constraints>
- Every command, flag, default, version and URL must come from the repository or the notes. Mark anything you cannot confirm with `TODO(author): ...` instead of guessing.
- Do not add badges, benchmarks, logos, comparisons or testimonials that the repository does not already provide.
- No marketing language (simple, blazing fast, seamless, powerful, easy) and no emoji unless the existing README uses them.
- Code blocks have a language tag; commands have no shell prompt so they paste cleanly.
- Keep it scannable: the quick start should be visible without much scrolling.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
Write `README.md` (or edit the existing one). Then reply with:
1. A list of the commands you ran to check the quick start and their real results, or "Not run" and why.
2. Every `TODO(author)` you left, as a checklist.
3. Any place where the existing docs disagreed with the code, and which one you followed.
</output_format>
