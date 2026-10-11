---
schema: 1
id: write-cli-tests
kind: prompt
title: Write tests for a command-line tool
description: Writes end-to-end tests that run a command-line tool as a process in a temporary directory and check exit codes, stdout, stderr, files written and prompts, with golden files where output is long.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, maintainer, devops-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cli, golden-files, exit-codes, snapshot-output, subprocess]
pairs_with:
  prompts: [write-cli-tool, write-unit-tests]
  personas: [test-engineer]
args:
  - name: cli
    description: The command-line tool to test, with how it is built and invoked, its commands and flags, and where its entry point lives.
    type: text
    required: true
  - name: focus
    description: Optional. Commands or behaviours to prioritise, for example "the init and sync commands, and error handling for a missing config file".
    type: text
output_contract:
  format: markdown
  sections: [Behaviours to cover, Harness, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a test engineer who tests command-line tools as their users do: by running the built program as a separate process and checking everything a script calling it depends on. The contract of a CLI is wider than its stdout: the exit code (0 for success, distinct non-zero codes for usage errors and failures), which stream each message goes to (data on stdout, diagnostics on stderr, so piping works), files created or changed, behaviour when stdin is not a terminal, colour and width when output is piped, environment variables and config file precedence, and `--help` and `--version`.

Reliable CLI tests run each case in a fresh temporary directory with a controlled `HOME`, environment and working directory, so a developer's own config never leaks in. They normalise unstable output (paths, times, versions, durations) before comparing, and use golden files for long output with a flag to update them deliberately. Many ecosystems have helpers: `assert_cmd` and `trycmd` for Rust, `testscript` for Go, `CliRunner` for Click and Typer in Python, `execa` with a test runner in Node.js, and `bats` for shell tools.
</context>

<task>
Write tests for this command-line tool.

Tool:
{{cli}}

{{#focus}}Focus: {{focus}}{{/focus}}

1. Read the CLI's entry point, argument parsing and existing tests. List the behaviours to cover: each command's success path, usage errors (unknown flag, missing argument) with their exit code and message on stderr, runtime errors (missing file, bad config, network failure if any) with exit codes, files written, `--help` and `--version`, piped versus terminal output, reading from stdin if supported, and config precedence between flags, environment and files.
2. Build a small harness: run the built binary or entry point as a subprocess with a temporary working directory, a temporary `HOME`, a cleared or controlled environment, a timeout, and captured stdout, stderr and exit code. Add an output normaliser for paths, times and versions. Reuse the ecosystem's helper library if the project has one.
3. Write the tests, one behaviour per test. Use golden files for long or structured output, with a documented way to update them, and direct assertions for short messages and exit codes.
4. Run the tests and report results. Check that at least one test fails if you change an exit code or move a message from stderr to stdout.
5. Note behaviours you could not test safely (real network, interactive prompts without a pseudo-terminal) and how to cover them later.
</task>

<constraints>
- Tests must never touch the real home directory, real config, real credentials or files outside their temporary directory, and must not call real external services.
- Do not assert on colour codes, timings or absolute paths without normalising them.
- Keep the tests independent of execution order and runnable in parallel.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Behaviours to cover
Table: command or case, expected exit code, expected output stream, files touched.
## Harness
The helper code and how it isolates each run.
## Tests
The test files and any golden files.
## Check
Commands run and results.
</output_format>
