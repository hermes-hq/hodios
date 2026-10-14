---
schema: 1
id: write-agent-custom-command
kind: prompt
title: Write a custom agent command
description: Turns a request you keep typing into a coding agent into a reusable custom command with named arguments, steps, a definition of done and safe defaults. Use when you repeat the same session opener.
category: meta
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [text]
output: [prompt]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [coding-agents, custom-commands, reusable-prompts]
pairs_with:
  prompts: [write-agent-skill, write-subagent-brief, define-specialist-subagent]
args:
  - name: request
    description: The request you keep repeating, with two or three real examples of how you phrase it and what you then have to correct.
    type: text
    required: true
  - name: tool
    description: The coding agent the command is for, so the file location and argument syntax match. Leave empty for a portable prompt file.
    type: string
output_contract:
  format: markdown
  sections: [Fit check, Command file, Usage, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A custom command is a saved prompt the user triggers by name, usually with arguments. It earns its place when the same request is typed every week and the same corrections follow ("also run the type check", "don't touch the lockfile"). The corrections are the valuable part: they are what the command must say up front. Commands differ from skills, which the model loads on its own when a description matches and which can carry reference files; if the task should trigger without being asked, or needs long reference material, a skill fits better. Argument syntax and file locations differ between tools, so a portable command uses clearly named placeholders the user can map.
</context>

<task>
Turn this repeated request into a command:
<request>
{{request}}
</request>
{{#tool}}Target tool: {{tool}}{{/tool}}

1. Fit check: say whether this should be a user-triggered command, a skill, a subagent or simply a line in the instruction file. Continue with the command only if it fits; otherwise say which and why in two sentences.
2. Find the variable parts across the examples and make them named arguments with a sensible default where one exists. Keep it to three arguments or fewer.
3. Turn the corrections from the examples into explicit steps and constraints: what to read first, what to change, what never to touch, which checks to run.
4. Add a definition of done the agent can check, and what to report at the end (changed files, commands run with their real results, anything skipped).
5. Choose safe defaults: no pushing, publishing, deleting or installing dependencies unless an argument says so.
6. Write the command file. If a target tool is named above, use its file location and argument syntax and mark anything you are unsure of "check against the tool's documentation". Otherwise use double-brace named placeholders in lower_snake_case and say how to map them.
</task>

<constraints>
- The command must be self-contained: it cannot rely on the conversation it was written in.
- No positional placeholders unless the target tool requires them; prefer named ones.
- Keep it under about 40 lines. A command that needs more is probably a skill or a workflow.
- Do not embed secrets, personal paths or shell commands that download and run code.
</constraints>

<output_format>
## Fit check
Command, skill, subagent or instruction line, with the reason.
## Command file
Path, then one fenced block with the full file.
## Usage
Two example invocations with arguments.
## Test
Two checks to run the first time: one normal use and one where an argument is missing or wrong.
</output_format>
