---
schema: 1
id: write-developer-cheat-sheet
kind: prompt
title: Write a developer cheat sheet
description: Writes a one-page cheat sheet of the commands, patterns and gotchas for a tool, framework or repository, checked against the installed version or the repo itself.
category: docs
version: 1.0.0
status: incubating
stage: [build, learn]
role: [software-engineer, developer-advocate, tech-lead, technical-writer]
stack: []
requires: [repo-read, shell]
inputs: [repo, topic, notes]
output: [docs, table]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [quick-reference, command-reference, one-pager, gotchas]
pairs_with:
  prompts: [write-onboarding-guide, write-cli-reference, write-how-to-guide]
args:
  - name: subject
    description: What the cheat sheet covers - a tool and version (for example kubectl 1.30), a framework, or this repository's own scripts and workflows.
    type: text
    required: true
  - name: audience
    description: Who uses it and what they already know, for example new hires who know Git but not this monorepo.
    type: text
  - name: format
    description: Where it will live - a Markdown file in the repo, a printable one-pager, or a wiki page.
    type: text
    default: Markdown file in the repo
output_contract:
  format: markdown
  sections: [Cheat sheet, Verified against, Left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A cheat sheet is for the second week, not the first hour: the reader knows roughly what they want and needs the exact incantation. The good ones are organised by task ("undo the last commit but keep changes"), not by command name, show the command with realistic placeholders, and spend space on the things people get wrong (flags whose defaults surprise, commands that are destructive, the order that matters). The bad ones list every subcommand alphabetically, copy flags from an older version, and leave out the one dangerous command or mark it no differently from the safe ones. For a repository, the most valuable cheat sheet is the set of commands the team actually runs, taken from the package scripts, Makefile, task runner and CI config, not from memory.
</context>

<task>
Write a cheat sheet for: {{subject}}
{{#audience}}Audience: {{audience}}{{/audience}}
Format: {{format}}

1. Establish the source of truth. For a tool, check the installed version (`<tool> --version`) and read its help output for the commands you include. For a repository, read the package scripts, Makefile or task runner, CI workflows and contributing docs to find the commands people actually run.
2. List the 15 to 40 tasks this audience does most, grouped into four to eight task-based sections. For each: the task in plain words, the exact command or snippet with `<placeholders>`, and a short note only where it adds something (a surprising default, a required order, a common error).
3. Add a "Gotchas" section with the mistakes people actually make with this subject, and mark every destructive or irreversible command (data deletion, force push, production deploy) with a clear warning and the safer alternative where one exists.
4. Keep it to one printed page or one screen of scrolling where possible: cut tasks before you cut the gotchas.
5. Check each command's syntax against the help output or the repo files. Run only harmless commands (`--help`, `--version`, dry-run or list commands).
</task>

<constraints>
- Never run commands that change state to test them; verify syntax from help output and source files.
- Do not include flags or subcommands you could not confirm for the stated version; list unconfirmed items under "Left out".
- Prefer the repo's own wrappers (for example `npm run test`) over the raw tool when the repo provides one.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Cheat sheet
The finished cheat sheet in Markdown, with task-based sections, a Gotchas section and warnings on destructive commands.
## Verified against
The version, files and help output each section was checked against.
## Left out
Tasks or flags left out and why (unconfirmed, rare, or too long).
</output_format>
