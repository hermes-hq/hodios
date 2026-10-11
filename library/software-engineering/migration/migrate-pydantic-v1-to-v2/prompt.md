---
schema: 1
id: migrate-pydantic-v1-to-v2
kind: prompt
title: Migrate Pydantic v1 to v2
description: Moves code from Pydantic v1 to v2, mapping validators, Config, parse and dict methods, settings, custom types and FastAPI integration, and catching changed coercion and Optional behaviour.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer, data-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pydantic, data-validation, breaking-changes, api-schema]
pairs_with:
  prompts: [upgrade-major-dependency, migrate-flask-to-fastapi, review-fastapi-change]
args:
  - name: notes
    description: "Size of the codebase, FastAPI or other frameworks using Pydantic, BaseSettings use, custom types and validators, libraries that depend on Pydantic v1."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Behaviour changes, Changes made, Schema diff, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most of the Pydantic v2 move is renaming, which the `bump-pydantic` tool automates; the risky part is validation that now behaves differently. Renames: `validator` to `field_validator` (with `mode` and as a classmethod), `root_validator` to `model_validator`, inner `class Config` to `model_config = ConfigDict(...)` with renamed keys (`orm_mode` to `from_attributes`, `allow_population_by_field_name` to `populate_by_name`), `.dict()` and `.json()` to `model_dump` and `model_dump_json`, `parse_obj` and `parse_raw` to `model_validate` and `model_validate_json`, `.schema()` to `model_json_schema`, `__root__` to `RootModel`, `const` to `Literal`, `regex` to `pattern`, and `BaseSettings` moves to the separate pydantic-settings package. Behaviour changes that bite: a field typed `Optional[X]` with no default is now required (it no longer defaults to None); numbers are no longer coerced to strings; floats with a fractional part are rejected for int fields; validators no longer run on defaults unless asked; error formats and JSON schema output differ, which changes OpenAPI documents and generated clients. Custom types change from `__get_validators__` to the core schema hooks. The `pydantic.v1` namespace lets you migrate module by module, but v1 and v2 models do not mix inside each other.
</context>

<task>
Migrate this code from Pydantic v1 to v2.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Inventory models, validators, Config classes, settings classes, custom types, generic models, and calls to v1 methods. Check every dependency that uses Pydantic for v2 support.
2. Record the baseline: tests, the JSON schema or OpenAPI document, and serialized output of representative models (including edge inputs: None, numbers as strings, extra fields).
3. Decide the approach: all at once, or module by module with the `pydantic.v1` namespace. Note that v1 and v2 models cannot be nested in each other.
4. Run `bump-pydantic` on a branch if available, and review its changes. Fix what it leaves (marked with TODO comments) by hand.
5. Go through the behaviour changes for this code: Optional fields without defaults, int and str coercion, validators on defaults, `each_item` validators, custom types, and `json_encoders`. Decide for each field whether to keep the old behaviour (explicit default, lax types, `validate_default`) and add tests for those inputs.
6. Move settings to pydantic-settings and check environment parsing, especially for nested and list values.
7. Run tests, then diff the JSON schema or OpenAPI document and serialized output against the baseline, and explain every difference.
</task>

<constraints>
- Do not loosen validation broadly (`Any`, `arbitrary_types_allowed`, extra allow) just to make tests pass.
- Do not change API request or response shapes without listing it; generated clients depend on the schema.
- Do not invent ConfigDict keys or method names; check the official migration guide.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Model count, dependency support, approach chosen.
## Behaviour changes
Table: change, fields or models affected, decision (keep old or accept new).
## Changes made
Automated and manual changes, settings, custom types.
## Schema diff
Differences in JSON schema or OpenAPI and serialized output, with reasons.
## Verification
Tests and edge-input checks run, results.
</output_format>
