---
schema: 1
id: exclude-files-from-agent-context
kind: prompt
title: Decide what to hide from coding agents
description: Works out which files a coding agent should not read or index, such as secrets, customer data, generated code and large artefacts, and writes the ignore and deny rules with their limits stated.
category: meta
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [software-engineer, tech-lead, security-engineer]
requires: [repo-read]
inputs: [repo, text]
output: [config, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, ignore-files, secrets, context-engineering]
pairs_with:
  prompts: [audit-agent-permissions, write-agents-md, design-agent-sandbox]
args:
  - name: tree
    description: The repository layout with notable large or sensitive folders, or "read the repo".
    type: text
    required: true
  - name: tools
    description: The coding agent tools in use, so the rules use the right files and permission formats.
    type: string
output_contract:
  format: markdown
  sections: [Classification, Rules, What this does not protect, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
There are two reasons to keep files from an agent, and they need different tools. Privacy: secrets, keys, customer data exports and anything under contract must not be read or sent to a model provider. Context quality: generated code, minified bundles, lockfiles, snapshots, vendored dependencies and large fixtures waste tokens and pollute search, so the agent copies patterns from code nobody writes by hand. Ignore files in agent tools usually only control indexing and automatic context; an agent with a shell can still print the file. So ignore files help context quality but are not a security boundary: for secrets, the real protections are keeping them out of the working tree, permission deny rules for read tools and shell, and a sandbox. Hiding too much hurts too: the agent may need generated types, migration history or the lockfile to answer correctly.
</context>

<task>
Decide what to exclude for this repository:
<tree>
{{tree}}
</tree>
{{#tools}}Tools in use: {{tools}}{{/tools}}

1. If you can read the repository, list its top-level folders, large files and files matching sensitive patterns (environment files, keys, certificates, credential files, database dumps, exports). Do not open files that look like secrets; identify them by name.
2. Classify each candidate: block for privacy, exclude for context quality, keep readable but do not index, or keep. Give the reason, and note files the agent needs despite being generated (for example types it must import).
3. Write the rules: an ignore file in the format the tools use, and permission deny rules for read and shell access to the privacy-class paths. Mark syntax you are not sure of "check against the tool's documentation".
4. State plainly what these rules do not stop, for each tool: shell commands, subprocesses, tests that load the files, other agents or extensions.
5. List follow-ups: secrets that are committed or in the working tree should be moved out and rotated; data exports should leave the repository.
</task>

<constraints>
- Never print the contents of a secret or data file; refer to it by path only.
- Do not describe an ignore file as protecting secrets.
- Do not exclude files the agent needs for correct work without saying what it loses.
{{> output/uncertainty}}
</constraints>

<output_format>
## Classification
Table: path or pattern, class (privacy, context, read-not-index, keep), reason.
## Rules
Fenced blocks per file, each with its path.
## What this does not protect
Bullets per tool or access path.
## Follow-ups
Numbered actions such as moving and rotating secrets.
</output_format>
