---
schema: 1
id: create-sanitized-dev-database
kind: prompt
title: Create a sanitized dev database from production
description: Builds a smaller, masked copy of a production database for development, with a referentially consistent subset, deterministic masking of personal data and a repeatable refresh.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, dba, devops-engineer, data-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [schema, repo, text]
output: [code, plan, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [data-masking, subsetting, personal-data, dev-environment, pseudonymisation]
pairs_with:
  prompts: [generate-realistic-seed-data, implement-user-data-deletion]
  personas: [database-administrator]
args:
  - name: database
    description: Engine and version, the schema or where it lives in the repo, rough table sizes, and which tables hold personal, payment or secret data.
    type: text
    required: true
  - name: goal
    description: What developers need from the copy, for example "reproduce customer bugs", "realistic volumes for performance work" or "a 5 GB database that restores in minutes".
    type: text
    required: true
  - name: constraints
    description: Rules that apply, such as data must not leave a region, who may run the job, or a privacy policy reference.
    type: text
output_contract:
  format: markdown
  sections: [Data classification, Subset rules, Masking rules, Pipeline, Checks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Copying production to laptops is how many data leaks start, but purely synthetic data misses the shapes that cause real bugs. A sanitized copy sits between them, and it fails in predictable ways. Masking is applied to the obvious columns (`email`, `name`) and misses free text, JSON blobs, audit logs, file paths, IP addresses and third-party tokens. Random masking breaks joins and uniqueness: the same customer email must become the same fake email everywhere it appears, so masking should be deterministic, using a keyed hash with a secret kept outside the dev copy. Subsetting by "first 10,000 rows of each table" produces orphaned foreign keys; a consistent subset starts from root entities and follows references in both directions. Raw production data must never be written to a less protected place on the way, so masking happens inside the protected environment, and secrets such as API keys, password hashes and webhook URLs are replaced, not masked. Note that pseudonymised data can still be personal data under laws such as the GDPR; this reduces risk, it does not remove legal duties.
</context>

<task>
Database: {{database}}
What developers need: {{goal}}
{{#constraints}}Rules that apply: {{constraints}}{{/constraints}}

1. Read the schema, models and migrations. Classify every table and column: direct identifiers, quasi-identifiers (birth date, postcode), free text, secrets and credentials, payment data, and safe operational data. Flag JSON and text columns that may hold personal data and ask about any you cannot judge.
2. Define the subset: root entities and how they are chosen (for example a random sample of accounts plus named test accounts), the reference graph followed from them, lookup tables copied whole, and tables excluded (sessions, audit logs, outbound email queues).
3. Define masking per column: deterministic keyed pseudonyms for identifiers that join, format-preserving fakes where validation needs them, nulling or replacement for free text and secrets, date shifting with a consistent offset per entity, and the rule for tables that must keep uniqueness.
4. Design the pipeline so raw data never leaves the protected environment: restore or snapshot into an isolated instance, subset and mask there, then dump only the result. Use an existing tool already in the stack if there is one, otherwise SQL scripts the team can read.
5. Write the scripts or configuration, plus a refresh command that is repeatable and fails if a new column appears without a classification.
6. Write checks: a scan of the output for patterns of real data (email domains other than the fake one, card-number patterns, phone formats), foreign key integrity, row counts per table, and a smoke run of the app's test suite against the copy.
</task>

<constraints>
- Do not connect to or read from a production database yourself. Write the pipeline for the user to run in the protected environment.
- Never place the masking secret, production credentials or unmasked samples in the repo, the dev dump or your answer.
- Fail closed: an unclassified column blocks the refresh rather than passing through unmasked.
- Do not claim the result is anonymous or legally compliant; say what residual risk remains and who should sign off.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data classification
Table: table | column | class | treatment.
## Subset rules
Roots, followed references, whole tables, excluded tables.
## Masking rules
Per column rule, and how determinism and uniqueness are kept.
## Pipeline
Steps and code blocks with file paths, including the refresh command.
## Checks
Leak scan, integrity checks and results if run.
## Open questions
Numbered, or "None".
</output_format>
