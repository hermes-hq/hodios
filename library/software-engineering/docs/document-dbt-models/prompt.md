---
schema: 1
id: document-dbt-models
kind: prompt
title: Document dbt models
description: Writes dbt model and column descriptions in YAML with reusable doc blocks, stated grain, keys and tests, checked against the SQL, so the generated docs site answers analysts' questions.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [data-engineer, data-analyst]
stack: [dbt]
requires: [repo-read, file-write, shell]
inputs: [repo, schema]
output: [docs, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [schema-yml, doc-blocks, data-catalog, column-descriptions, model-grain]
pairs_with:
  prompts: [write-dbt-model, write-dataset-documentation]
args:
  - name: models
    description: Which models to document (a folder such as models/marts, a selector, or a list).
    type: string
    default: the marts models
  - name: business_notes
    description: Business definitions you know (what counts as an active customer, revenue rules) that the SQL alone does not explain.
    type: text
    default: none given
output_contract:
  format: markdown
  sections: [Models documented, Tests proposed, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Analysts open dbt docs to answer three questions: what does one row mean, can I trust this column, and how is this number defined. Descriptions like "customer id" or "the orders table" answer none of them. Useful model docs state the grain (one row per order line per day), the primary key, filters applied (test accounts excluded, only paid orders), freshness and the upstream sources. Useful column docs give the business definition, units and currency, time zone, null meaning, and allowed values. Definitions repeated across models (customer_id, revenue) belong in `{% docs %}` blocks referenced with `doc()` so they cannot drift. Documentation and tests go together: a stated grain should be backed by a uniqueness test.
</context>

<task>
Document {{models}}.

Business notes:
<business_notes>
{{business_notes}}
</business_notes>

1. Read each model's SQL, its refs and sources, and existing YAML files and doc blocks. Follow the project's YAML layout (one file per model or per folder).
2. For each model, write a description with purpose, grain, primary key, key filters and exclusions, upstream models, and refresh or materialisation if relevant.
3. For each column, write the definition, units, time zone, null meaning and allowed values where the SQL shows them. Derive definitions from the SQL expression; mark business meaning you cannot infer "to confirm".
4. Move definitions used in more than one model into doc blocks in a docs `.md` file and reference them.
5. Propose tests that back the documentation: `unique` and `not_null` on the grain key, `accepted_values` for status columns, `relationships` for foreign keys. Add them only where the data contract is clear.
6. Run `dbt parse` (or `dbt docs generate` if a connection is configured) to confirm the YAML is valid. Do not run models against production without asking.
</task>

<constraints>
- Every description must match the SQL. Do not invent business rules.
- Do not change model SQL.
- Do not add tests that would fail on known data without flagging them.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the YAML and doc blocks. Then reply with:
## Models documented
Each model with its stated grain and the file changed.
## Tests proposed
Tests added and tests suggested but not added, with reasons.
## Questions for the owners
Business definitions to confirm.
</output_format>
