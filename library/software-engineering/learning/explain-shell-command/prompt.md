---
schema: 1
id: explain-shell-command
kind: prompt
title: Explain a shell command
description: Breaks down a shell one-liner or pipeline flag by flag and stage by stage, says exactly what it will read, change or delete, and warns before anything destructive or risky.
category: learning
version: 1.0.0
status: incubating
stage: [learn, operate]
role: [software-engineer, devops-engineer, student]
stack: [bash]
requires: [none]
inputs: [text]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [command-line, pipelines, unix-tools, copy-paste-safety]
pairs_with:
  prompts: [check-git-command-before-running, write-shell-script, fix-shell-script-bug, emulate-linux-shell]
args:
  - name: command
    description: The command, one-liner or short pipeline exactly as you would run it.
    type: text
    required: true
  - name: environment
    description: Shell and OS where it will run (bash on Ubuntu, zsh on macOS, Git Bash on Windows, a container). GNU and BSD tools take different flags.
    type: string
  - name: source
    description: Where the command came from (a README, Stack Overflow, an AI answer, a colleague) and what it is supposed to do.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, What it does, Piece by piece, What it changes, Safer way to run it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People paste commands they do not understand, and the dangerous part is rarely the first word. It is an unquoted variable that expands to nothing in `rm -rf "$DIR"/`, a `find ... -delete` placed before the filters, `sed -i` without a backup, a `>` that truncates the file being read, `xargs` splitting on spaces in filenames, a downloaded script piped straight into a shell, running whatever the server sends, `sudo` widening the damage, or `chmod -R 777`. Flags also differ between GNU and BSD versions of the same tool, so a command that works on Linux can fail or behave differently on macOS.
</context>

<task>
Explain this command{{#environment}} for {{environment}}{{/environment}}:

```
{{command}}
```
{{#source}}
Where it came from and what it should do: {{source}}
{{/source}}

1. If the environment is not given, assume bash with GNU tools on Linux, say so, and mention any flag that behaves differently on macOS (BSD) or in other shells.
2. Give a verdict line first: safe to run, run with care, or do not run as is, with the one reason that decides it.
3. Say in two sentences what the whole command does when it succeeds.
4. Break it down in the order the shell processes it: expansions and quoting (variables, globs, command substitution), then each command in the pipeline with every flag explained, then redirections, `&&`, `||` and `;`. Say what flows between stages of a pipe.
5. List exactly what it reads, writes, deletes, installs, sends over the network or runs with elevated privileges, and whether it can be undone. Point out what happens if a variable is empty, a filename contains spaces, the path does not exist, or it is run from the wrong directory.
6. If anything is destructive or risky, give a safer way: a dry run (for example `find` without `-delete`, `rsync -n`, `echo` in front), quoting fixes, `sed -i.bak`, downloading a script to read it before running, or a narrower path. For a downloaded script piped into a shell, say to save and read the script first and do not recommend running it unseen.
7. If the source states a purpose and the command does not do that, say how it differs.
</task>

<constraints>
- Do not run the command, and never suggest running a destructive command without a dry run or backup first.
- Be exact about flags; if a flag's meaning depends on the tool version, say so instead of guessing.
- Do not invent files, hosts or output; describe effects in terms of the command's arguments.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: safe, run with care, or do not run as is, and why.
## What it does
Two sentences.
## Piece by piece
Numbered, in processing order, each with the fragment quoted.
## What it changes
Bullets: reads, writes, deletes, network, privileges, reversible or not.
## Safer way to run it
A safer command and why, or "Already safe as written."
</output_format>
