---
schema: 1
id: annotate-config-file
kind: prompt
title: Annotate a config file
description: Adds comments to a config file such as Kubernetes YAML, nginx, tsconfig or a CI pipeline, explaining each non-default setting, its default and why it is set.
category: docs
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [software-engineer, devops-engineer, sre]
requires: [repo-read, file-write]
inputs: [config, file]
output: [config, diff]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [config-comments, yaml, inline-comments]
pairs_with:
  prompts: [document-configuration-options]
args:
  - name: config
    description: The config file to annotate (path or pasted content), including its tool and version if known.
    type: text
    required: true
  - name: notes
    description: Known reasons for specific settings, such as incidents, vendor advice or performance tests.
    type: text
output_contract:
  format: markdown
  sections: [Annotated file, Settings with no known reason, Settings worth reviewing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Deployed config files collect settings nobody dares to touch: a `proxy_read_timeout 300`, a `maxSurge: 0`, `"skipLibCheck": true`, a CI cache key with a version suffix. The useful comment says what the setting changes, what the default would be, and why this value was chosen, so a future reader can tell a deliberate choice from a copied one. Defaults differ between tool versions, so a claim about a default must be tied to the version in use or marked uncertain. Some formats cannot hold comments at all (strict JSON, many generated files); those need a sidecar note instead of a broken file.
</context>

<task>
Annotate this config file:

<config>
{{config}}
</config>
{{#notes}}
Known reasons: {{notes}}
{{/notes}}

1. Identify the tool, its version (from lockfiles, image tags, `apiVersion` or the notes) and whether the format supports comments. tsconfig and VS Code settings accept comments; strict JSON such as `package.json` does not, and generated files will be overwritten.
2. Read the repo for context where you can: the code or services the config affects, commit messages for odd values, and related docs or runbooks.
3. For each setting that is not self-explanatory or differs from the default, add a short comment above it: what it controls, the default for this version, and why this value. Group related settings under a one-line section comment when the file is long.
4. For settings left at their default or obvious from the key name, add nothing.
5. If the format does not accept comments, keep the file unchanged and produce the same notes as a Markdown table to put beside it.
6. Validate the result with the tool's own check if available (for example `nginx -t`, `kubectl apply --dry-run=client`, `tsc --showConfig`, a YAML linter) and report what you ran.
</task>

<constraints>
- Do not change any value, key or ordering. Comments only.
- State a default only when you are confident for this tool version; otherwise write "default: check docs for <version>".
- Never invent why a value was chosen. If no reason is found, write a neutral comment on what it does and list it under "Settings with no known reason".
- Do not expose or comment on secret values; if a secret is committed in the file, flag it instead.
{{> output/uncertainty}}
</constraints>

<output_format>
## Annotated file
The full file with comments, in a code block with the right language tag (or the sidecar table if comments are not allowed).
## Settings with no known reason
Settings whose purpose you explained but whose value you could not justify, as questions for the owner.
## Settings worth reviewing
Values that look risky, deprecated or contradictory, each with the reason. Write "None" if there are none.
</output_format>
