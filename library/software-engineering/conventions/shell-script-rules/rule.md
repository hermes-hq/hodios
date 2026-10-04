---
schema: 1
id: shell-script-rules
kind: rule
title: Shell script rules
description: Standing rules for Bash and POSIX shell an assistant writes, covering strict mode, quoting every expansion, no parsing of ls, mktemp with trap cleanup, ShellCheck-clean code and a usage message.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre, software-engineer, backend-engineer]
stack: [bash]
requires: [none]
risk: read-only
level: intermediate
tags: [shellcheck, strict-mode, quoting, posix-sh, scripting]
applies_to: ["**/*.sh", "**/*.bash", "**/bin/*"]
pairs_with:
  prompts: [write-github-actions-workflow, design-coding-agent-hooks]
  rules: [iac-style-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change a shell script:

**Pick the shell on purpose**
- Start every script with a shebang. Use `#!/usr/bin/env bash` when you use Bash features (arrays, `[[ ]]`, `local`, process substitution); use `#!/bin/sh` only if the script is strictly POSIX, and then use no Bash features at all.
- Match the project's existing scripts and the shell available where the script runs (minimal containers often have only `sh`; macOS ships an old Bash 3.2). Say which shell and version you assume.
- If the logic needs data structures, JSON handling or more than about 150 lines, say so and suggest the project's scripting language instead.

**Fail loudly**
- In Bash, start with `set -euo pipefail` and set `IFS` only if you need to. In POSIX sh, use `set -eu`.
- Know where `set -e` does not help (commands in conditions, in `&&` chains, in subshells of command substitution) and check exit codes explicitly where it matters.
- Send errors to standard error with a clear message and exit non-zero: `die() { printf '%s\n' "$*" >&2; exit 1; }`.

**Quote everything**
- Quote every variable and command substitution: `"$file"`, `"$(pwd)"`, `"${array[@]}"`. Leave something unquoted only when word splitting is the point, and comment why.
- Use `"$@"` to pass arguments through, never `$*` unquoted.
- Use `[[ ]]` in Bash and `[ ]` with quoted operands in sh. Use `$(...)`, not backticks.
- Use `printf` rather than `echo` for anything that may start with `-` or contain backslashes.

**Files and loops**
- Never parse the output of `ls`. Use globs (`for f in ./*.log; do [ -e "$f" ] || continue; ...`) or `find ... -print0 | while IFS= read -r -d '' f`.
- Read lines with `while IFS= read -r line`. Do not use `for line in $(cat file)`.
- Prefix relative globs with `./` so filenames starting with `-` are not taken as options, and use `--` before file arguments where the command supports it.

**Temporary files and cleanup**
- Create temporary files and directories with `mktemp` (`tmp=$(mktemp -d)`), never fixed names in `/tmp`.
- Register cleanup straight after creating them: `trap 'rm -rf -- "$tmp"' EXIT`. Keep the trap idempotent.
- Guard destructive commands: never `rm -rf "$dir/"` when `dir` could be empty; use `${dir:?}` or check it first.

**Dependencies and interface**
- Check required commands at the start (`command -v jq >/dev/null || die "jq is required"`) and list them in the header comment.
- Give every script that takes arguments a `usage` function, handle `-h` and `--help`, parse options with `getopts` or a simple `case` loop, and exit with code 2 on wrong usage.
- Read configuration from arguments or environment variables with defaults (`: "${PORT:=8080}"`), not from edits inside the script.
- Make scripts safe to re-run: check before creating, use `mkdir -p`, and avoid appending the same line twice.

**Safety**
- Never use `eval` on input. Never build commands by concatenating strings; use arrays in Bash.
- Never put secrets in the script or echo them; read them from the environment or a secret store, and do not enable `set -x` around them.
- Never download a script and pipe it straight into a shell. Download to a file, verify a checksum or signature, then run it.
- Ask before writing scripts that delete data, change system configuration or run with `sudo`, and include a dry-run option for them.

**Before you finish**
- Make the script pass ShellCheck with no warnings, or disable a specific check on one line with a comment explaining why.
- Format consistently (`shfmt` if the project uses it) and keep functions small with `local` variables in Bash.
