---
schema: 1
id: write-scoped-agent-rules
kind: prompt
title: Write path-scoped agent rules
description: Writes path-scoped instruction files for coding agents, such as nested AGENTS.md or glob-matched rule files, so each package or file type gets only the rules that apply to it.
category: meta
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, tech-lead]
requires: [repo-read]
inputs: [repo, text]
output: [docs, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, agent-instructions, monorepo, context-engineering]
pairs_with:
  prompts: [write-agents-md, prune-agent-instructions, consolidate-agent-instruction-files]
args:
  - name: areas
    description: The parts of the repository that work differently (packages, apps, migrations, tests, generated code) and what is special about each, or "read the repo" to work it out.
    type: text
    required: true
  - name: tools
    description: The coding agent tools the team uses, so the files use formats they read. Leave empty for portable nested AGENTS.md files only.
    type: string
output_contract:
  format: markdown
  sections: [Scope map, Files, Root file changes, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A root instruction file loads on every session, so a rule that only matters for database migrations or the mobile app costs context everywhere and gets applied where it does not belong. Path scoping fixes that: a nested AGENTS.md read when the agent works in that directory (the closest file usually wins), or a rule file whose glob decides when it loads. Tools differ in how they scope and the details change between versions, so the content should stay portable and any tool-specific syntax should be marked for checking. Scope by path only what depends on the path. Rules tied to a task ("when cutting a release") belong in a command or skill, and rules that apply everywhere stay in the root file.
</context>

<task>
Write path-scoped agent rules for these areas:
<areas>
{{areas}}
</areas>
{{#tools}}Tools in use: {{tools}}{{/tools}}

1. Read the root instruction file, if any, and the directories named. For each area, find what an agent must do differently there: its own build and test commands, framework or language version, patterns to follow (name a real example file), things never to touch (generated files, applied migrations), and review expectations.
2. Keep only rules that differ from the root file or would be wrong elsewhere. Drop anything the root file already says.
3. Decide the scope for each rule: a directory (nested AGENTS.md) or a file pattern across directories (a glob rule, for example every `*.sql` migration or every test file). Do not create a scoped file for an area with fewer than two real rules; put a single line in the root file instead.
4. Write each file short: commands first, then conventions with one example path, then boundaries. Every command must come from the repo (package scripts, Makefile, CI config). If you cannot find a command, write it as a question, not a guess.
5. Propose the changes to the root file: rules to move out into scoped files, and one line telling the agent that nested files exist and take precedence for their directory.
6. If a tool in use needs its own rule format, write that file too, and mark any frontmatter key you are not certain of "check against the tool's documentation".
</task>

<constraints>
- No generic advice ("write clean code", "follow best practices"). Every line must change what an agent does in that path.
- Do not invent paths, commands or versions. Mark anything inferred.
- Scoped files must not contradict the root file. If a real exception exists, say in the scoped file that it overrides the root rule and why.
- Keep each scoped file under about 40 lines.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope map
Table: path or glob, file to create, rules it carries (count), why it is scoped.
## Files
Each file as a fenced block with its path as the first line in a comment.
## Root file changes
Lines to remove or move, and the line to add.
## Checks
How to confirm each file loads (start a session in that directory and ask the agent which instructions it sees), plus open questions.
</output_format>
