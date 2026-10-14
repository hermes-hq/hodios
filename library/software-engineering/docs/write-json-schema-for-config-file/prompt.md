---
schema: 1
id: write-json-schema-for-config-file
kind: prompt
title: Write a JSON Schema for a config file
description: Writes a JSON Schema with descriptions, defaults and examples for a tool's YAML, JSON or TOML config file, so editors validate and autocomplete it, matched to what the code accepts.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, maintainer, developer-advocate]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [config, docs, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [json-schema, editor-validation, config-reference, developer-experience]
pairs_with:
  prompts: [document-configuration-options, annotate-config-file, write-cli-reference]
args:
  - name: config
    description: The config file name and format, and where the code that loads and validates it lives.
    type: text
    required: true
  - name: notes
    description: Target JSON Schema draft if one is required, where the schema will be published, and whether the tool already validates with a schema library.
    type: text
output_contract:
  format: markdown
  sections: [Files written, Coverage, Mismatches found, Editor setup, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A JSON Schema for a config file gives users validation, hover docs and autocomplete in VS Code, JetBrains IDEs and any editor using the YAML or JSON language servers, often worth more than a prose reference. Hand-written schemas go wrong in familiar ways: they drift from the loader, so the editor flags valid configs as errors (the fastest way to get the schema disabled); they set `additionalProperties: false` on objects the code treats as open maps; they miss deprecated keys the code still accepts; they declare defaults that differ from the code; and they skip descriptions, which is where most of the value is. The best source is the code that parses the config: a typed struct, a pydantic or zod model, or a validator. If the project already uses such a model, generating the schema from it beats writing it by hand.
</context>

<task>
Write a JSON Schema for: {{config}}
{{#notes}}Notes: {{notes}}{{/notes}}

1. Read the loader: the type or model the config parses into, defaults, validation, deprecated or renamed keys, environment variable interpolation, and how unknown keys are treated (rejected, ignored, warned).
2. If the code defines the config with a model library that can emit JSON Schema (for example pydantic, zod with a converter, schemars, or Go struct tags with a generator), generate from it, adding descriptions in the model so they stay in sync. Otherwise write the schema by hand.
3. For each key: type, `description` written for users (behaviour, units, effect), `default` exactly as in code, `enum` or ranges where the code enforces them, `examples`, and `deprecated: true` with the replacement named in the description. Use `$defs` for repeated shapes.
4. Set `additionalProperties` to match the loader: false only where the code rejects unknown keys. Set `$schema` to the draft the target editors support (2020-12 or draft-07) and an `$id` at the planned published location.
5. Validate the schema against the meta-schema, and validate every config file in the repo (examples, fixtures, docs snippets) against it. Investigate each failure: fix the schema if the code accepts the file, report it if the file is actually invalid.
6. Describe editor setup: a `$schema` key or `# yaml-language-server: $schema=` comment, the VS Code `json.schemas` or `yaml.schemas` setting, and SchemaStore submission if the tool is public.
</task>

<constraints>
- The schema must accept everything the current code accepts; never make it stricter than the loader without saying so.
- Do not invent keys, defaults or allowed values; unknowns go under mismatches.
- Do not change the loader's behaviour in this task; report bugs found instead.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Files written
Schema path, any generator script or model changes, and the `$id`.
## Coverage
Keys covered, keys with descriptions, deprecated keys included.
## Mismatches found
Differences between code, docs and example files, and which was treated as correct.
## Editor setup
How users enable validation, as snippets.
## Verification
Meta-schema validation and repo config files validated, with real results.
</output_format>
