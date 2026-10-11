---
schema: 1
id: set-up-dbt-project
kind: prompt
title: Set up a dbt project
description: Sets up a new dbt project with staging, intermediate and mart layers, naming and folder conventions, sources with freshness, packages, environment targets and slim CI that builds only changed models.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer, data-analyst]
stack: [dbt]
requires: [repo-read, file-write, shell]
inputs: [spec, schema, text]
output: [code, config, docs]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [analytics-engineering, project-structure, slim-ci, environments, sources]
pairs_with:
  prompts: [write-dbt-model, refactor-dbt-project, write-dbt-incremental-model]
  personas: [analytics-engineer]
args:
  - name: context
    description: Warehouse, dbt Core or dbt Cloud and version, the source systems and how they are loaded (Fivetran, Airbyte, custom), team size, and the CI system.
    type: text
    required: true
  - name: first_use_case
    description: The first report or dataset the project must deliver, to shape the first models.
    type: text
output_contract:
  format: markdown
  sections: [Structure, Files, Environments and CI, Conventions, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The early structure of a dbt project decides whether it is still readable at 500 models. The widely used layout is staging (one model per source table, only renaming, casting and light cleaning, `stg_<source>__<table>`), intermediate (reusable joins and logic, `int_` prefix, not exposed), and marts (business-facing `fct_` and `dim_` models by domain). Common early mistakes: business logic in staging, marts selecting straight from sources, no sources file so freshness and lineage are missing, hardcoded schema names instead of `generate_schema_name` and targets, every developer writing to the same schema, all models materialised as tables, and CI that rebuilds the whole project on every pull request. Slim CI uses state comparison against production artifacts (`--select state:modified+ --defer --state`) to build only changed models and their children in a temporary schema. Packages such as `dbt_utils` should be pinned. Profiles and credentials stay out of the repo.
</context>

<task>
Context: {{context}}
{{#first_use_case}}First use case: {{first_use_case}}{{/first_use_case}}

1. Read what already exists in the repo (an empty folder, an existing project, SQL scripts to migrate) and adapt rather than overwrite. Ask about anything in the context that is unclear, such as dbt Core versus Cloud.
2. Create the structure: `dbt_project.yml` with per-folder materialisations (staging as views, marts as tables, incremental where justified), folder layout by layer and by source or domain, `packages.yml` with pinned versions, and a `generate_schema_name` macro if the team needs custom schema naming.
3. Declare sources in YAML per source system with `loaded_at_field` and freshness thresholds, and write the staging models for the first use case's tables.
4. Define targets: per-developer dev schemas, a CI schema, and production, with credentials from environment variables and `profiles.yml` kept out of git (or the dbt Cloud equivalent).
5. Set up CI on the stated system: `dbt deps`, `dbt build` for modified models and children with state deferral to production artifacts, source freshness in the production job, and schema cleanup after the run.
6. Write a short conventions section for the README: naming, layers, tests required per model, and how to add a source.
7. Run `dbt deps`, `dbt parse` and `dbt build` against a dev target, and report results.
</task>

<constraints>
- Never commit credentials or a populated `profiles.yml`.
- Do not create speculative models for data nobody asked for; build the first use case only.
- Use only features available in the stated dbt version and adapter.
- Do not run against the production target.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Structure
Folder tree.
## Files
Each file in a fenced block preceded by its path.
## Environments and CI
Targets, CI workflow file and how state deferral works.
## Conventions
Short rules for the README.
## Next steps
Commands run with results, then what to build next.
</output_format>
