---
schema: 1
id: review-cli-tool-change
kind: prompt
title: Review a command-line tool change
description: Reviews a change to a CLI for exit codes, stdout versus stderr, flag and output compatibility for scripts, non-interactive use, signals and help text accuracy.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, devops-engineer, maintainer]
requires: [none]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cli, exit-codes, backward-compatibility, scripting, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [write-cli-tests, write-cli-tool]
args:
  - name: diff
    description: The change to the command, flags, output or help text, with file paths.
    type: text
    required: true
  - name: context
    description: Who runs the tool (people, CI, other scripts), whether its output is parsed, the argument parsing library, and the compatibility promise to users.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Contract changes, Findings, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A CLI's real interface is not its help text; it is its exit codes, its stdout and its flags, because scripts and CI depend on them. Generic reviews miss the contract. The usual breakages: an error printed but exit code 0, so CI carries on; progress messages, warnings or prompts written to stdout, corrupting output that is piped to `jq` or another tool; a renamed or removed flag with no deprecation alias; a changed default; a column added to tabular output that a script splits on; an interactive confirmation that hangs in CI because there is no `--yes` flag and no TTY check; colour codes printed when output is not a terminal or when `NO_COLOR` is set; a destructive command with no dry run; Ctrl-C leaving temp files or half-written output; and help text or README examples that no longer match the flags. Machine-readable output (`--json`) should be stable and versioned like an API.
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

1. List the contract changes: commands, flags, defaults, environment variables, config files, stdout format, stderr messages, exit codes. Mark each as additive, changed or removed.
2. Check exit codes: every failure path exits non-zero, distinct codes where the tool documents them, partial failure handled deliberately.
3. Check streams: data to stdout, diagnostics, progress and prompts to stderr; output stays clean when piped; colour and spinners disabled when not a TTY or when `NO_COLOR` is set.
4. Check compatibility: removed or renamed flags keep an alias with a deprecation warning, default changes are called out, existing output formats unchanged unless versioned, machine-readable output stable.
5. Check non-interactive use: prompts skipped or failing clearly without a TTY, a flag to confirm, no reliance on the current directory or home directory without saying so.
6. Check safety: destructive operations confirm or offer a dry run, signals clean up temp files and child processes, paths and arguments quoted correctly when passed to shells.
7. Check docs: help text, usage examples, man page or README and changelog match the new behaviour.
8. For each finding, show the command line that breaks and what a calling script would see.
</task>

<constraints>
- Every finding includes a concrete invocation (for example `tool export --format csv | cut -d, -f3`) and its wrong behaviour.
- Treat a silent exit code 0 on failure and a removed flag without an alias as high severity.
- Do not run the tool against real data or with destructive flags to verify a finding.
- At most 10 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Contract changes
Table: item, before, after, additive/changed/removed.
## Findings
Numbered: severity, `path:line`, invocation, wrong behaviour, fix.
## Tests to add
Bullets: invocation, expected exit code, expected stdout and stderr.
</output_format>
