---
schema: 1
id: upgrade-database-major-version
kind: prompt
title: Upgrade a database major version
description: Plans a Postgres, MySQL or similar major version upgrade, covering breaking changes, extensions, in-place versus replication method, rehearsal, downtime, rollback and statistics.
category: migration
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [dba, backend-engineer, sre]
stack: [postgres, mysql]
requires: [none]
inputs: [text, config]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [version-upgrade, logical-replication, pg-upgrade, downtime-budget, rollback, end-of-life]
pairs_with:
  prompts: [migrate-database-engine, plan-zero-downtime-schema-change]
  personas: [database-administrator, migration-engineer]
args:
  - name: engine
    description: The database engine and how it is run (for example "PostgreSQL on a managed cloud service", "self-hosted MySQL with one replica").
    type: string
    required: true
  - name: from_version
    description: The exact current version.
    type: string
    required: true
  - name: to_version
    description: The target version.
    type: string
    required: true
  - name: constraints
    description: Optional. Database size, largest tables, extensions or plugins, replicas and other consumers (CDC, logical replication, BI tools), drivers and ORMs in use, allowed downtime and maintenance windows.
    type: text
output_contract:
  format: markdown
  sections: [Method choice, Breaking changes to check, Rehearsal, Cutover runbook, Rollback, After the upgrade, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A DBA or backend engineer must upgrade {{engine}} from {{from_version}} to {{to_version}}, often because the old version is reaching end of life. Major upgrades are rarely broken by the data copy itself. They are broken by an extension or plugin without a build for the new version, a removed setting in the configuration, changed defaults (authentication methods, SQL modes, collations, optimiser behaviour), a driver too old to connect, query plans that regress because statistics were not rebuilt, and a rollback plan that does not exist once writes have gone to the new version. The choice of method (in-place upgrade tool, dump and restore, logical replication or a managed blue-green feature) sets the downtime and the rollback options.
{{#constraints}}
Constraints:
{{constraints}}
{{/constraints}}
</context>

<task>
1. Method choice: compare the options that apply to this engine and hosting (in-place upgrade with a copy or link mode, dump and restore, replication to a new-version instance then switchover, or the provider's managed upgrade or blue-green feature). For each: expected downtime from the database size, rollback options, and prerequisites (for example primary keys on every table for logical replication). Recommend one.
2. Breaking changes: tell the user to read the release notes for every major version crossed, and list the categories to check against this system: removed or renamed configuration parameters, changed defaults, reserved words, removed functions or syntax, collation and character set changes that can corrupt index order, authentication changes, replication and CDC slot behaviour, and extension or plugin versions. For each, give the query or command to find usage. Do not assert specific changes you are not sure of.
3. Clients: driver, connector, ORM and tool versions that must support the new server, upgraded before the database where possible.
4. Rehearsal: restore a production-sized copy, run the chosen method end to end and time it, run the application test suite and a replay or sample of real queries, compare plans for the top queries by total time, and check extensions and permissions.
5. Cutover runbook: freeze schema changes, check backups and their restore, pause or drain consumers (CDC, jobs), steps with timings from the rehearsal, health checks, and a go or no-go point before writes resume on the new version.
6. Rollback: the last point where rollback is a simple switch back, and what rollback means after writes reach the new version (reverse replication, or accepting forward-fix only). Say this plainly.
7. After the upgrade: rebuild optimiser statistics before declaring done (in-place upgrades often do not carry them over), reindex where collations changed, re-enable consumers, watch slow-query logs and error rates for a week, update extensions, and record the new version in infrastructure code.
</task>

<constraints>
- Never state version-specific breaking changes, defaults or extension support as fact unless sure; point to the release notes and give a check.
- Every destructive or locking step names its effect and a rollback.
- If size, downtime budget, extensions or hosting are missing and change the method, ask, and mark assumptions as [X].
- Confirm the target is a released, supported version; if not, say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Method choice
Table: method | downtime estimate | rollback | prerequisites | fit. Then the recommendation.

## Breaking changes to check
Table: category | how to check here (query or command) | action.

## Rehearsal
Checklist with what to measure.

## Cutover runbook
Numbered steps with owner, expected duration and the go or no-go point.

## Rollback
The rollback window and procedure.

## After the upgrade
Checklist for day 0 and week 1.

## Open questions
Bullets.
</output_format>
