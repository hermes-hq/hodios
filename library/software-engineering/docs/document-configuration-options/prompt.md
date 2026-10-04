---
schema: 1
id: document-configuration-options
kind: prompt
title: Document configuration options
description: Writes a configuration reference from code or a schema, with every option and env var, its type, default, allowed values, precedence, restart needs and old names, kept in sync by generation.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [maintainer, technical-writer, devops-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [config, schema, file, text]
output: [docs, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [configuration-reference, environment-variables, settings, defaults, deprecations]
pairs_with:
  prompts: [extract-configuration-from-code, write-cli-reference, document-public-api]
args:
  - name: config_source
    description: The code or schema that defines configuration - a settings class, config struct with tags, JSON Schema, env var parsing, default config file, and how config files, env vars and flags are loaded.
    type: text
    required: true
  - name: format
    description: markdown-table for one reference page, reference-pages for one section per option group, yaml-annotated for a fully commented example config file.
    type: enum
    enum: [markdown-table, reference-pages, yaml-annotated]
    default: markdown-table
output_contract:
  format: markdown
  sections: [Precedence, Reference, Deprecated names, Discrepancies, Keeping it in sync]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Operators read a configuration reference when something is already wrong: a setting does not take effect, a default surprised them, or an upgrade broke a renamed key. References fail when they copy the code's field names but not the environment variable or file key users type, list a default that differs from the code, never say which source wins when a value is set twice, omit units ("timeout: 30" - seconds or milliseconds?), and drift because they are written by hand. Output format: {{format}}.
</context>

<task>
<config_source>
{{config_source}}
</config_source>

1. Work out how configuration is loaded: sources (defaults, config files and their search paths, environment variables with prefix, command-line flags, remote config) and the precedence order. If the code does not make precedence clear, say so.
2. Extract every option. For each: the key as users write it in each source (file key, env var name, flag), type, default exactly as in code, unit, allowed values or range, whether required, whether a change needs a restart or is reloaded live, whether it is sensitive (secret), and what it does in one or two sentences focused on behaviour.
3. Group options by task (server, storage, auth, logging, limits) rather than alphabetically, and order each group by how often people change them, most first, if you can tell.
4. Give one realistic example per group, and one complete minimal configuration that starts the service.
5. Collect deprecated or renamed options: old name, new name, the version it changed if the code says so, and what happens when the old name is used (ignored, warning, mapped).
6. List discrepancies: options read in code but missing from the schema, defaults that differ between sources, options that are documented in comments but never read, and unclear units.
7. Propose how to keep the reference in sync: generate it from the schema or settings class (name the mechanism that fits the language), check in CI that the generated file is up to date, and add descriptions to the source so generation produces good text.
</task>

<constraints>
- Defaults, names and allowed values come only from the source given. Never fill a default from typical values; write "not set in code" or [X].
- Mark sensitive options and never print real secret values in examples; use placeholders such as `<your-api-key>`.
- State units explicitly for every duration, size and rate.
- If the source is partial (for example only the env var parser, not the file loader), say what is missing and document only what you can see.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Precedence
Numbered list from highest to lowest priority, plus config file search paths.
## Reference
For markdown-table: one table per group with columns option, env var, flag, type, default, allowed values, restart, description.
For reference-pages: one heading per option with a key-value block and description.
For yaml-annotated: one YAML code block with every option commented with type, default and allowed values.
Then the minimal complete example.
## Deprecated names
Table: old name, new name, since, behaviour when used. Or "None found".
## Discrepancies
Bullets with the file or line where each was seen. Or "None found".
## Keeping it in sync
Three to six bullets with the generation and CI check approach.
</output_format>
