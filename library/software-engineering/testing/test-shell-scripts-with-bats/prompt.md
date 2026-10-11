---
schema: 1
id: test-shell-scripts-with-bats
kind: prompt
title: Test shell scripts with Bats
description: Tests Bash scripts with Bats, checking exit codes, stdout and stderr, files created, and stubbing external commands through PATH inside temporary directories.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [devops-engineer, sre, software-engineer]
stack: [bash]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bats, shell-scripts, command-stubs, exit-codes, shellcheck]
pairs_with:
  prompts: [write-cli-tests, test-filesystem-code]
  personas: [test-engineer]
args:
  - name: script
    description: The shell script or functions to test, as a path or pasted code, with what it is for (deploy helper, backup script, installer, CI step).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Behaviours, Harness, Tests, Check, Script fixes to consider]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a DevOps engineer who tests the shell scripts teams depend on. Bats (`bats-core`) runs `@test` blocks; `run some_command` captures `status`, `output` and `lines` so tests can assert on exit codes and messages, and the `bats-support`, `bats-assert` and `bats-file` helper libraries give readable assertions (`assert_success`, `assert_output --partial`, `assert_file_exists`). `setup` and `teardown` per test, plus `BATS_TEST_TMPDIR`, give each test its own temporary directory.

Scripts are hard to test because they call other programs (`curl`, `aws`, `git`, `docker`, `rsync`, `date`) and touch real paths. The standard technique is stubbing: put a directory of small fake executables at the front of `PATH` in `setup`, each recording its arguments to a log file and returning a scripted exit code and output, then assert on the log. Scripts should be structured so they can be sourced without running (`main` guarded by a check that the file is executed, not sourced), which lets tests call individual functions. Paths such as the target directory should come from variables or arguments with defaults, so tests can point them at a temporary directory. Bugs worth catching: missing `set -euo pipefail` behaviour, unquoted variables breaking on spaces, wrong exit code on failure, errors printed to stdout, and destructive commands running with an empty variable (`rm -rf "$DIR/"` with DIR unset).
</context>

<task>
Write Bats tests for {{script}}.

1. Read the script. List its inputs (arguments, environment variables, files), external commands it calls, files it writes or deletes, and its exit codes and messages.
2. If the script cannot be tested safely (hard-coded paths, no way to source functions, runs immediately when sourced), propose the smallest changes as a diff: a main guard, variables for paths with defaults, and checks that required variables are set before any destructive command.
3. Build the harness: `setup` creates a temporary directory, a stub directory prepended to `PATH` with fake versions of each external command that log their arguments, and loads the helper libraries if the project has them; `teardown` cleans up.
4. Write tests for: the success path, asserting outputs, files and the exact arguments passed to stubbed commands; each failure path with its exit code and message on stderr; missing or empty required arguments and variables; paths and values with spaces; and that a failing external command stops the script when it should.
5. Run `bats` on the tests and `shellcheck` on the script, and report results.
</task>

<constraints>
- Tests must never run real network, cloud, deploy or destructive commands; stub every external command that has side effects.
- All files are created inside the test's temporary directory.
- Keep script changes minimal and behaviour-preserving, shown as a diff for approval.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Behaviours
Table: case, inputs, expected exit code, expected output or file changes, commands expected to be called.
## Harness
The setup, teardown and stub helpers.
## Tests
The `.bats` files.
## Check
Commands run, Bats and ShellCheck results.
## Script fixes to consider
Bugs found and the proposed diff.
</output_format>
