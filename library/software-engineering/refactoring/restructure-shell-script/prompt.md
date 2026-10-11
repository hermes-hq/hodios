---
schema: 1
id: restructure-shell-script
kind: prompt
title: Restructure a long shell script
description: Restructures a long Bash script into functions with strict mode, argument parsing, quoting fixes and usage text, or says plainly when it should be rewritten in Python.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [devops-engineer, sre, software-engineer]
stack: [bash]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [diff, explanation]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [script-structure, strict-mode, shellcheck, argument-parsing]
pairs_with:
  prompts: [write-shell-script, fix-shell-script-bug]
  rules: [shell-script-rules]
args:
  - name: script
    description: The script, as a path or pasted text, where it runs (cron, CI, developer laptops, containers), the shells and OSes it must support (Bash version, macOS, BusyBox) and how it is called.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What it does, Keep or rewrite, Restructured script, Behaviour changes, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long shell scripts grow by appending commands, and their failure modes are well known: unquoted variables that split on spaces and glob, commands whose failure is ignored, `cd` that fails and then `rm` runs in the wrong place, positional arguments nobody documented, and temp files never cleaned up. The structure that works: a header with `set -euo pipefail` (understanding its gaps: `set -e` is ignored inside functions called in conditions, and with `pipefail` a reader that exits early, such as `grep -q` or `head`, can make the writer die of SIGPIPE and fail the pipeline), a `usage` function, argument parsing with `getopts` or a `while case` loop, small functions with `local` variables, a `main "$@"` at the bottom, `trap` cleanup on EXIT, and `mktemp` for temp files.

Adding strict mode to an existing script changes behaviour: commands that used to fail silently now stop the script, unset variables that defaulted to empty now abort. That can be the fix or a regression, so each one must be found and decided, using `${VAR:-default}` or `|| true` explicitly where failure is intended. Portability matters: macOS ships Bash 3.2 (no associative arrays, no `mapfile`), `sed -i` and `date` differ between GNU and BSD, and `/bin/sh` may be dash or BusyBox. When a script parses JSON, does arithmetic on floats, handles complex data structures or exceeds a few hundred lines of logic, a Python script is usually cheaper to maintain.
</context>

<task>
Restructure {{script}}.

1. Read the script and summarise what it does, its inputs (arguments, environment variables, files), outputs, exit codes and side effects.
2. Decide keep or rewrite: if it mostly orchestrates commands, keep it in shell; if it is mostly data handling, recommend Python with reasons and stop for the user's decision.
3. Run ShellCheck if available, otherwise review for the same classes of bugs, and list findings.
4. Restructure: strict mode, `usage`, argument parsing that accepts the existing call forms, functions with `local`, `main "$@"`, quoting fixes, `trap` cleanup, `mktemp`. Keep existing argument order, environment variable names, output format and exit codes so callers do not break.
5. For every place where strict mode or quoting changes behaviour, say what used to happen and what happens now.
6. Test with `bash -n`, ShellCheck, and a dry run or the user's usual invocation in a safe environment. Never run destructive paths (deletes, deploys, pushes) to test; describe how to test them.
</task>

<constraints>
- Keep the command-line interface, environment variables, output and exit codes compatible unless the user approves a change.
- Stay within the shell and OS versions the user named; do not use Bash 4+ features if macOS default Bash must work.
- Do not execute the script's destructive commands to test it.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What it does
Inputs, outputs, side effects, exit codes.
## Keep or rewrite
Decision with reasons.
## Restructured script
The full script or diff.
## Behaviour changes
Table: line, before, after, intended (yes or no).
## Check
Syntax check, ShellCheck and test runs with results.
</output_format>
