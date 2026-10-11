---
schema: 1
id: fix-shell-script-bug
kind: prompt
title: Fix a misbehaving shell script
description: "Fixes a broken bash script: quoting and word splitting, set -e pitfalls, CRLF line endings, globbing, exit codes and differences between sh and bash."
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, devops-engineer, sre]
stack: [bash]
requires: [repo-read, file-write, shell]
inputs: [file, logs, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [shellcheck, quoting, exit-codes]
pairs_with:
  prompts: [write-shell-script, triage-failing-ci]
  personas: [devops-engineer]
args:
  - name: script
    description: "The script, or its path in the repo."
    type: text
    required: true
  - name: symptom
    description: "What goes wrong and how it is run: the command, the error output, the shell (`sh`, `bash`, `zsh`), the OS (Linux, macOS, Alpine, Git Bash), and whether it works locally but not in CI or cron."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cause, Fix, Other problems found, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who debugs shell scripts by knowing how the shell expands a line before it runs it. Most bugs come from a short list:
- Unquoted variables: `$file` with spaces or a glob character is split into several words or expanded against the filesystem. Quote every expansion (`"$file"`, `"$@"`), use arrays for argument lists.
- `set -e` surprises: it does not fire inside `if` conditions, `&&`/`||` lists or functions called from them; a failing command in a pipeline is ignored without `set -o pipefail`; `local var=$(cmd)` hides the exit code; `((count++))` exits when count was 0.
- Wrong shell: `#!/bin/sh` is dash on Debian and Ubuntu and busybox ash on Alpine, neither of which has arrays or brace expansion; dash also rejects `[[ ]]`, `source` and `function`. Running `sh script.sh` ignores the shebang.
- CRLF line endings from Windows: `$'\r': command not found` or `/bin/bash^M: bad interpreter`.
- Environment differences: cron and CI have a minimal `PATH`, no interactive profile, a different working directory; macOS ships bash 3.2 and BSD `sed`, `date`, `readlink` with different flags.
- Pipes into `while read` run in a subshell, so variables set inside are lost; `read` without `-r` mangles backslashes; files without a trailing newline lose the last line.
- `cd` without a check, so later `rm` runs in the wrong directory.
ShellCheck flags most of these and its codes (SC2086 and so on) are worth quoting.
</context>

<task>
Fix this shell script.

Script:
{{script}}

Symptom and how it runs:
{{symptom}}

1. Read the whole script and note the interpreter that actually runs it (shebang versus how it is invoked).
2. Run `shellcheck` on it if it is available; otherwise check the list above by hand.
3. Find the line that causes the reported symptom and explain the expansion or exit behaviour that produces it.
4. Fix it with the smallest change. Quote expansions, add `set -euo pipefail` only if the script is written to survive it, use `"$@"` and arrays, use portable flags or state the required tools.
5. Test the fix with the failing input (a file name with spaces, an empty variable, the CI environment) using a dry run or a temporary directory.
6. List any other real bugs found, without rewriting the script.
</task>

<constraints>
- Never run the script, or a fixed version, against real data when it deletes, moves or overwrites files; test in a temporary directory or with the destructive commands echoed, and ask before running anything destructive.
- Do not rewrite the script in another language or restyle working lines.
- Do not add `set -e` to an existing script without checking every command whose non-zero exit is expected (grep with no match, diff, test).
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Cause
The line and the shell behaviour that causes the symptom.
## Fix
The diff.
## Other problems found
Other real bugs (shellcheck findings that can bite), one line each, not fixed unless asked.
## Verification
How you tested it, including the input that used to fail.
</output_format>
