---
schema: 1
id: build-test-data-from-production
kind: prompt
title: Build a test dataset from production
description: Plans and scripts a safe test dataset derived from production - subsetting with referential integrity, masking of personal and secret data, and a repeatable refresh.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, data-engineer, dba, qa-engineer]
requires: [repo-read, file-write]
inputs: [schema, repo, text]
output: [plan, code]
risk: edits-files
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [test-data, data-masking, data-subsetting, privacy]
pairs_with:
  prompts: [generate-realistic-seed-data, anonymize-dataset, write-test-data-factories]
  personas: [test-engineer]
args:
  - name: database
    description: The database engine and schema (DDL, ORM models or migrations), approximate table sizes, and which tables hold personal, payment or secret data.
    type: text
    required: true
  - name: purpose
    description: What the dataset is for - a staging environment, performance tests, reproducing a class of bugs, UAT - and the target size.
    type: text
    required: true
  - name: obligations
    description: Applicable privacy or compliance rules you know of (for example GDPR, HIPAA, PCI DSS, internal policy) and who must approve.
    type: text
output_contract:
  format: markdown
  sections: [Data classification, Subset plan, Masking rules, Pipeline, Checks before release, Approvals needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Production-shaped data finds bugs that hand-written fixtures never do: real distributions, skew, legacy rows from old versions and odd encodings. Copying production wholesale into test environments, though, is one of the most common causes of data leaks, because test systems have weaker access controls, logs and third-party integrations. The safe approach subsets (start from a sample of root entities such as accounts, then follow foreign keys so every reference resolves), masks every personal, payment and secret field in a way that keeps formats and relationships (the same email masked the same way everywhere, valid-looking but non-routable), and removes things that can act on the real world: real email addresses, phone numbers, webhook URLs, API keys and tokens. Masking must happen before data reaches the lower environment, and free-text fields (notes, comments, JSON blobs) are where personal data hides. Pseudonymised data is often still personal data under privacy law, so access to the result still needs controls.
</context>

<task>
Plan and script a test dataset from production.

Database: {{database}}

Purpose: {{purpose}}
{{#obligations}}

Obligations: {{obligations}}
{{/obligations}}

1. Read the schema, migrations or models. Classify every column: identifier, direct personal data (names, emails, phones, addresses, dates of birth, government ids), indirect or sensitive (health, location, free text, IP addresses), payment, secrets and tokens, external endpoints, business data. Flag free-text and JSON columns as needing inspection.
2. Design the subset: choose root entities and the sampling rule (random sample, plus deliberately included edge cases such as the largest accounts, oldest records, each status value), then follow foreign keys and implicit references (polymorphic ids, ids in JSON) so the subset is referentially complete. Exclude tables not needed for the purpose, such as audit logs.
3. Define masking per column: deterministic pseudonyms where joins or uniqueness depend on the value, format-preserving fake values, date shifting that keeps intervals, generalisation for sensitive values, and nulling or replacing secrets, tokens, webhook URLs and real contact details with non-routable test values (for example reserved example domains).
4. Write the pipeline: extract inside the production security boundary, mask there, and only then load to the target. Use the stack's tooling or SQL in the repository's style. Make it repeatable and idempotent, and keep masking keys or salts out of the repository.
5. Define checks before release: referential integrity, row counts, no value from a deny-list of real identifiers, regex scans for emails, phones and card numbers, a manual sample review of free-text fields, and confirmation that outbound integrations in the target environment are disabled or sandboxed.
6. List approvals and access controls needed under the stated obligations, without stating legal conclusions.
7. Do not run any extraction against production; deliver the plan and scripts for the user to review and run.
</task>

<constraints>
- Never move unmasked personal, payment or secret data out of the production boundary in the plan.
- Do not connect to or run queries against production yourself.
- No real data values, keys or connection strings in the output; use placeholders.
- Do not claim the result is anonymous or compliant; describe the residual re-identification risk and who must approve.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data classification
Table: table.column | class | treatment.

## Subset plan
Root entities, sampling rule, included edge cases and the reference graph followed.

## Masking rules
Table: column or pattern | technique | keeps (format, joins, distribution).

## Pipeline
Scripts or code, with where each step runs.

## Checks before release
Checklist.

## Approvals needed
Bullets.
</output_format>
