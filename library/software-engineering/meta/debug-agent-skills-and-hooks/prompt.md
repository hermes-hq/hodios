---
schema: 1
id: debug-agent-skills-and-hooks
kind: prompt
title: Debug agent skills, commands and hooks
description: Diagnoses why an agent skill, custom command, subagent or hook never triggers or fails, checking file location, frontmatter, descriptions, matchers, permissions and exit codes.
category: meta
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [software-engineer, tech-lead, devops-engineer]
requires: [none]
inputs: [config, file, logs, text]
output: [checklist, config, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [coding-agents, agent-skills, agent-hooks, custom-commands, subagents]
pairs_with:
  prompts: [write-agent-skill, design-coding-agent-hooks, define-specialist-subagent, write-agent-custom-command]
args:
  - name: extension
    description: The skill, command, subagent or hook definition (full file or config block), its path, and which agent and version you use.
    type: text
    required: true
  - name: symptom
    description: What you expected and what happens, such as never triggers, shows up but errors, blocks everything, or runs only sometimes. Include any error or debug output.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Checks, Fixed definition, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agent extensions fail quietly. A skill or subagent with invalid frontmatter is usually skipped without an error; one in the wrong directory, with the wrong file name or case, or added after the session started is simply not loaded. Skills and subagents that load on their own are chosen by matching their description against the task, so a vague description ("helps with code") rarely fires while an overly broad one fires everywhere. Custom commands break on location and argument syntax. Hooks have their own failure set: a matcher that does not match the tool name exactly (names are case-sensitive and some tools have several names), a script without execute permission, a script that works in your shell but not with the agent's working directory and PATH, invalid JSON written to stdout, a timeout, or an exit code that means something different from what the author assumed (in several agents only one specific code blocks and feeds stderr back to the model; others are logged and ignored).
</context>

<task>
Find out why this extension does not work.
<extension>
{{extension}}
</extension>
<symptom>
{{symptom}}
</symptom>

1. Identify the extension type and the agent. If you do not know that agent's exact rules for this type, say so and give checks rather than guesses.
2. Check loading: path and scope (project or user), file name and case, frontmatter syntax (indentation, quoting, colons in values, unknown or missing required keys), and whether the session was restarted or the extension list reloaded.
3. Check triggering: for skills and subagents, whether the description says when to use it in words a real request would contain; for commands, the invocation name and arguments; for hooks, the event name and whether the matcher matches the exact tool name.
4. Check execution: for hooks and anything that runs a script, test it by hand with a captured sample of the input the agent sends, from the repository root and with a minimal PATH; check permissions, interpreter line, stdout versus stderr, the exit code and run time.
5. Rank the likely causes and write a corrected definition. Mark exact keys or exit-code meanings you are not sure of with "check against the tool's documentation".
6. Give a short test: one input that should trigger it, one that should not, and what output proves each.
</task>

<constraints>
- Do not rewrite the extension's purpose; fix only what stops it working, and mention other issues in one line.
- For hooks that block or modify commands, keep the fix fail-safe: an error in the hook must not silently allow what it was meant to block, unless the user chooses that.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
Most likely cause first, with the evidence, then other candidates.
## Checks
Numbered, each with the action and what each result means.
## Fixed definition
One fenced block with the corrected file or config, then what changed.
## Test
The trigger test, the non-trigger test and the expected output of each.
</output_format>
