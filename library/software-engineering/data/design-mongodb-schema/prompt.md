---
schema: 1
id: design-mongodb-schema
kind: prompt
title: Design a MongoDB schema
description: Designs a MongoDB document model from the app's access patterns, choosing embed versus reference, bounding arrays, and defining indexes, schema validation and example documents.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, fullstack-engineer, architect]
stack: [mongodb]
requires: [none]
inputs: [text, spec]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [document-modelling, embedding-vs-referencing, unbounded-arrays, schema-validation, access-patterns]
pairs_with:
  prompts: [write-mongodb-aggregation, choose-database-for-workload]
args:
  - name: app
    description: What the app does, its main entities, and the screens or API calls with how often each runs and what it reads or writes.
    type: text
    required: true
  - name: scale
    description: Optional. Document counts and growth, the largest one-to-many relationships (for example comments per post), and whether the cluster is or will be sharded.
    type: text
output_contract:
  format: markdown
  sections: [Access patterns, Collections, Example documents, Indexes, Validation, Trade-offs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The usual MongoDB mistake is copying a relational schema into collections and then joining with `$lookup` on every request, or the opposite, embedding everything into one document that grows without limit. The rule experts use: data that is read together is stored together, and the shape follows the queries, not the entities. Embed when the child belongs to one parent, is read with it, and is bounded (addresses on a customer, line items on an order). Reference when the child is shared, read on its own, updated independently, or unbounded (comments on a viral post, events per device); the 16 MB document limit and the cost of rewriting large documents make unbounded arrays a production problem. Patterns like subset (embed the latest 10 reviews, reference the rest), extended reference (copy the few fields of a related document you display) and bucket (group time-series by hour) handle the middle ground, at the cost of keeping duplicated fields in sync. Indexes follow the equality, sort, range order for compound keys. JSON Schema validation on the collection keeps documents consistent.
</context>

<task>
App: {{app}}
{{#scale}}Scale: {{scale}}{{/scale}}

1. List the access patterns as a table: operation, frequency, the fields read or written, and the filter and sort.
2. Design the collections: what is embedded and what is referenced, each with the reason tied to an access pattern and to bounds on size. Use subset, extended reference or bucket patterns where they fit, and say which duplicated fields must be kept in sync and how.
3. Write an example document for each collection with realistic but invented values.
4. Indexes: compound indexes ordered by equality, sort, range for each pattern, unique indexes, TTL indexes where data expires, and which pattern each serves.
5. Validation: a `$jsonSchema` validator per collection with required fields and types, and the validation level and action.
6. Trade-offs: what this design makes slow or awkward, multi-document transaction needs, and the shard key consideration if sharding is planned.
</task>

<constraints>
- Never leave an array that can grow without bound embedded in a frequently updated document; say how it is bounded.
- Do not design around `$lookup` for hot read paths without stating the cost.
- Use only features available in current MongoDB versions; mark version-dependent ones to verify.
- Example values are invented; no real personal data.
{{> output/uncertainty}}
</constraints>

<output_format>
## Access patterns
Table: operation | frequency | reads/writes | filter and sort.

## Collections
Bullets per collection with embed or reference decisions and reasons.

## Example documents
JSON per collection.

## Indexes
Index definitions with the pattern each serves.

## Validation
Validator JSON.

## Trade-offs
Bullets.
</output_format>
