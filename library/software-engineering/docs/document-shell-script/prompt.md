---
schema: 1
id: document-shell-script
kind: prompt
title: Document a shell script
description: Adds a usage header, a --help option, examples, environment variables, dependencies and exit codes to a shell script so someone else can run it safely, without changing what it does.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [devops-engineer, sre, software-engineer]
stack: [bash]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [code, docs]
risk: runs-commands
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [usage-header, help-text, exit-codes, ops-scripts, runbook-ready]
pairs_with:
  prompts: [write-shell-script, write-cli-reference, write-runbook]
args:
  - name: script
    description: The path to the script in the repository, or its full contents pasted in.
    type: text
    required: true
  - name: notes
    description: Anything the script cannot tell you, such as who runs it, when, and on which machines.
    type: text
output_contract:
  format: markdown
  sections: [Changes, What the script touches, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shell scripts tend to get run by someone other than their author, often under pressure. That person needs to know what the script does, what it changes or deletes, which tools and environment variables it expects, whether it can be re-run, whether there is a dry run, and what the exit code means. Common mistakes: the help path runs after the script has already done something, help is printed to stderr with a failing exit code, usage errors exit 1 like any other failure (exit 2 is the usual convention), and the header lists options the parser no longer accepts. Documentation must describe the script as it is. If it has a dangerous behaviour, say so loudly rather than quietly fixing it.
</context>

<task>
<script>
{{script}}
</script>
{{#notes}}
Notes: {{notes}}
{{/notes}}

1. Read the whole script. List its arguments and flags (from getopts, a case loop or positional use), the environment variables it reads and their defaults, the external commands it needs, the files and directories it writes or deletes, network calls, remote hosts it touches, and every `exit` with its code.
2. Add a header comment after the shebang: purpose in one or two sentences, usage line, options, environment variables, requirements (tools and versions if checked), what it changes, whether it is safe to re-run, exit codes, and two or three examples.
3. If there is no help option, add a `usage` function and `-h`/`--help` handling that prints to stdout and exits 0, placed before any side effect. Follow the script's existing parsing style; do not rewrite the parser. Unknown options print usage to stderr and exit 2, unless the script already uses a different code that callers may depend on.
4. Check syntax with `bash -n` (or the shell in the shebang) and with `shellcheck` if installed. Run `--help` only after reading the code to confirm the help path exits before anything else runs.
</task>

<constraints>
- Never run the script's real action, and never run it with arguments other than `--help`.
- Do not change behaviour beyond adding help handling. Report risky behaviour (unquoted variables in `rm`, no `set -u`, missing confirmation before deletes) under open questions instead of fixing it.
- Document only options and variables the code actually reads.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Changes
What was added, with the new header shown in full.
## What the script touches
Bullets: files, directories, services and remote hosts it reads or changes.
## Verification
Commands run and real results, or "Not run" and why.
## Open questions
Risky behaviour and unknowns for the owner, as a checklist.
</output_format>
