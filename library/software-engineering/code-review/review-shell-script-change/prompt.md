---
schema: 1
id: review-shell-script-change
kind: prompt
title: Review a shell script change
description: Reviews a Bash or POSIX shell script change for unquoted variables, missing or misunderstood strict mode, dangerous rm and globs, ignored exit codes and non-portable syntax.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [devops-engineer, software-engineer, sre]
stack: [bash]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [shellcheck, quoting, portability, error-exit, pull-request]
pairs_with:
  personas: [devops-engineer]
  prompts: [review-pull-request, write-shell-script, review-ci-workflow-change]
  rules: [shell-script-rules]
args:
  - name: diff
    description: The diff with file paths, including the shebang line and how the script is invoked (CI step, cron, Makefile, by hand).
    type: text
    required: true
  - name: context
    description: Where the script runs (CI image, macOS laptops, Alpine or Debian containers), which shell actually executes it, what inputs and environment variables it receives, and what it can touch.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shell scripts fail on inputs nobody tested: a filename with a space, an empty variable, a command that fails halfway through a pipe. Unquoted expansions are split on whitespace and expanded as globs, so `rm $file` deletes the wrong files when the name has a space or a `*`; `"$@"` keeps arguments intact where `$*` and `$@` unquoted do not. `rm -rf "$DIR"/*` with an unset or empty `DIR` becomes `rm -rf /*`, which GNU `rm --preserve-root` does not stop; `"${DIR:?}"` aborts instead. `cd` without `|| exit` continues in the wrong directory. Strict mode helps but has rules: `set -e` is ignored inside functions called from an `if` or `&&` chain, does not see failures in the left side of a pipe without `set -o pipefail`, and `local x=$(cmd)` hides `cmd`'s exit status behind `local`; `((count++))` returns non-zero when `count` is 0 and kills the script under `set -e`. `for f in $(ls)` or `$(find ...)` breaks on spaces; use globs or `find -print0` with `read -r -d ''`. A glob that matches nothing stays literal unless `nullglob` is set. `read` without `-r` mangles backslashes. Temporary files need `mktemp` and a `trap` to clean up. Portability: `#!/bin/sh` runs dash on Debian and Ubuntu and BusyBox on Alpine, so `[[`, arrays, `function`, `==` in `[` and `source` fail there; `sed -i`, `date -d`, `readlink -f` and `grep -P` differ between GNU and macOS. `curl` without `-f` treats an HTTP 500 as success. Secrets passed as arguments are visible in the process list. ShellCheck catches most of these.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open the whole script, not only the changed lines, check the shebang and how it is invoked, and run `shellcheck` on it if available, reporting the result. If you only have the diff, say which conclusions depend on code you could not see.
2. Check every variable expansion and command substitution for quoting, and every destructive command (`rm`, `mv`, `chmod -R`, `chown`, `find -delete`, truncating redirects) for what it does when a variable is empty, unset or contains spaces or glob characters.
3. Check error handling: presence of `set -euo pipefail` or explicit checks, failures masked by pipes, `local` assignments, `|| true`, functions used in conditions, `cd` without a failure exit, and arithmetic that returns non-zero under `set -e`.
4. Check loops and input parsing: iteration over `ls` or unquoted command output, `read` without `-r` or `IFS` handling, unmatched globs, and parsing of tool output that changes with locale or version.
5. Check portability against where it runs: shebang versus syntax used (bashisms under `sh`), GNU-only flags on macOS or BusyBox, and assumptions about tools that may be missing in the CI image.
6. Check side effects and safety: temp files without `mktemp` and `trap` cleanup, secrets in arguments or `set -x` output, `curl` or `wget` without failure flags, re-running the script twice (idempotency), and `sudo` or production targets reached without a confirmation or dry-run option.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (deletes or overwrites the wrong files, continues after a failure into destructive steps, leaks secrets), medium (breaks on filenames with spaces or on another OS, silently skips work), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Do not run the script or any destructive command from it to test a finding; reason from the code, ShellCheck output and safe dry runs only.
- Fix in the shell the script targets; do not propose rewriting it in another language unless the user asks or the script has clearly outgrown shell, and then say so in one line.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the line, the defect, the triggering input (a filename, empty variable, failing command or platform), the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
