---
schema: 1
id: fix-command-injection
kind: prompt
title: Fix OS command injection
description: Replaces shell commands built from user input with argument arrays or library calls, validates the values that must remain, and tests each fix with hostile inputs.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer, devops-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [command-injection, injection, argument-injection, owasp]
pairs_with:
  prompts: [audit-input-handling, triage-sast-findings, write-exploit-regression-test, write-semgrep-rule]
  personas: [security-auditor]
  rules: [secure-coding-rules]
args:
  - name: target
    description: The code, endpoints or scanner findings that run external commands.
    type: text
    required: true
  - name: stack
    description: Language and runtime. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Command calls, Changes, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Command injection comes from handing a single string to a shell: `os.system`, `subprocess` with `shell=True`, `child_process.exec`, `Runtime.exec` with `sh -c`, PHP `exec`, `system`, `shell_exec` and backticks, Ruby backticks and `system` with one string, and `Process.Start` running `cmd.exe /c`. The first fix is often to not run a process at all: image resizing, archive handling, DNS lookups and file copies all have libraries. When a process is needed, pass the program and an argument array with no shell (`execFile`, `spawn` without `shell`, `subprocess.run([...])`), so metacharacters lose their meaning. That still leaves argument injection: a value starting with `-` can become an option (`--output=/etc/...`, `-o ProxyCommand=`, git's `--upload-pack`), so put `--` before positional arguments where the tool supports it and validate values against a strict pattern. Quoting functions (`escapeshellarg`, `shlex.quote`) are a last resort for the rare case that truly needs a shell.
</context>

<task>
Fix command injection in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Search for every process execution call and every shell string built from variables, including build scripts and admin tools that receive input from users, job payloads or file names.
2. For each call, record the command, which parts come from input, and whether a shell is involved.
3. Fix each call, preferring in this order:
   - replace the process with a library call in the same language;
   - run the program directly with an argument array and no shell, using an absolute path or a fixed program name;
   - validate each input value against a strict allowlist pattern, reject values starting with `-`, and add `--` before positional arguments when the tool supports it.
4. Set a timeout and avoid passing secrets on the command line, where other local users can read them in the process list.
5. Add a test per fix with inputs such as `; id`, `$(id)`, backticks, `| echo INJECTED`, a newline, and a value starting with `--`, and assert no extra command runs and the input is rejected or treated as data. Use harmless markers, not destructive commands.
6. Run the tests and the linter.
</task>

<constraints>
- Never use destructive commands (`rm`, `shutdown`, writes outside a temp directory) as test payloads.
- Do not rely on blocklisting characters as the main defence.
- Keep the command's behaviour the same for valid input; say if output parsing changes.
- If a shell is truly required, explain why and quote every interpolated value with the language's quoting function.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Command calls
Table: file:line, command, input parts, shell involved (yes or no), fix chosen, status.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test with its payload.
## Verification
Commands run and their actual results.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
