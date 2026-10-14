---
schema: 1
id: design-medallion-layers
kind: prompt
title: Design medallion data layers
description: Defines bronze, silver and gold layers (or raw, clean, curated) for a lakehouse or warehouse, with what each layer guarantees, who owns it, retention, access and the rules for promoting data.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [data-engineer, architect]
stack: []
requires: [none]
inputs: [spec, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [medallion-architecture, lakehouse, data-layers, data-ownership, retention]
pairs_with:
  prompts: [design-lakehouse-table-layout, design-data-pipeline, write-data-contract]
  personas: [data-engineer]
args:
  - name: platform
    description: The platform and tools in use or planned, for example Databricks with Delta, Snowflake with dbt, or Iceberg on S3 with Spark and Trino.
    type: text
    required: true
  - name: sources_and_consumers
    description: The main sources (databases, SaaS APIs, event streams, files) and who consumes the data (BI dashboards, data science, reverse ETL, external sharing).
    type: text
    required: true
  - name: constraints
    description: Team size, compliance needs such as personal data rules or audit, cost limits, and anything already built.
    type: text
output_contract:
  format: markdown
  sections: [Layer definitions, Promotion rules, Ownership and access, Naming and storage, Migration from today, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bronze, silver and gold are labels; the value comes from what each layer promises. Teams that skip that step end up with a "silver" that some pipelines clean and others do not, gold tables built straight from bronze, and nobody sure which layer a dashboard may read. Useful definitions are contracts. Raw or bronze keeps source data as delivered, append-only with load metadata, so anything can be reprocessed; it is not cleaned and rarely queried by analysts. Silver or clean is conformed: typed, deduplicated, keyed, with personal data handled, one table per business entity or event, with tests. Gold or curated is shaped for use: facts, dimensions, aggregates and feature tables owned by a domain, with documented definitions. Promotion rules (what checks must pass to move up a layer), retention (bronze often has the longest legal and cost implications), access (who can read bronze with raw personal data) and ownership (platform team versus domain teams) matter more than folder names. Small teams often need only two layers; adding layers adds latency and cost.
</context>

<task>
Platform: {{platform}}
Sources and consumers: {{sources_and_consumers}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Decide how many layers this team needs and what to call them, and say why. Do not add a layer that has no distinct promise.
2. For each layer, define: what it contains, its guarantees (schema enforced, deduplicated, keyed, tested, documented), the write pattern (append, merge, overwrite), latency target, retention, and who may read it.
3. Write promotion rules: the checks that must pass before data reaches each layer, what happens to records that fail (quarantine table, alert), and how schema changes from sources flow up.
4. Assign ownership: who builds and is on call for each layer, and where domain teams take over.
5. Define personal and sensitive data handling per layer: where it is masked, tokenised or dropped, and how deletion requests reach every layer.
6. Give naming and storage conventions for the platform (catalogs, schemas or databases per layer and environment, table naming).
7. If something exists today, map current tables into the layers and list the migration steps in order, starting with the highest-value consumer.
</task>

<constraints>
- Fit the design to the stated platform's features; do not assume Delta, Iceberg or Unity Catalog features on platforms that lack them.
- Do not copy a vendor reference architecture without checking it fits the team size and consumers.
- Where a compliance rule matters, describe the design choice and flag that the rule itself needs confirmation for the user's jurisdiction.
</constraints>

<output_format>
## Layer definitions
Table: layer | contains | guarantees | write pattern | latency | retention | readers.
## Promotion rules
Checks per boundary and failure handling.
## Ownership and access
Who owns each layer and who can read it, including sensitive data handling.
## Naming and storage
Conventions with examples.
## Migration from today
Ordered steps, or "Greenfield".
## Open questions
Numbered, or "None".
</output_format>
