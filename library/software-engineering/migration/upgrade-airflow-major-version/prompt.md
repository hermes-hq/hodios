---
schema: 1
id: upgrade-airflow-major-version
kind: prompt
title: Upgrade Apache Airflow to a new major version
description: Upgrades an Airflow deployment across a major version, covering removed DAG and operator APIs, provider packages, the metadata database migration, scheduler settings and a staged rollout.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [data-engineer, devops-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [airflow, workflow-orchestration, provider-packages, metadata-database, dag-compatibility]
pairs_with:
  prompts: [write-airflow-dag, upgrade-major-dependency, inventory-deprecated-api-usage]
  workflows: [runtime-upgrade-track]
  personas: [migration-engineer]
args:
  - name: deployment
    description: Current and target Airflow versions, how it runs (managed service, Helm chart, Docker Compose, VMs), executor, metadata database, number of DAGs and the providers in use.
    type: text
    required: true
  - name: dag_notes
    description: Anything unusual in the DAGs, such as custom operators or plugins, SubDAGs, direct database access, or heavy top-level code.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Breaking changes that apply, DAG and plugin fixes, Provider and dependency plan, Upgrade runbook, Verification, Rollback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Airflow major upgrades break in three places at once: DAG code, provider packages and the metadata database. DAG code breaks on removed imports and parameters (for example old operator paths moved into providers, `execution_date` giving way to logical dates and data intervals, `schedule_interval` replaced by `schedule`, SubDAGs and some context variables removed, and in Airflow 3 tasks no longer touching the metadata database directly). Providers are versioned separately and each has a minimum Airflow version, so the constraint files published for each release are the safe way to resolve the environment. The metadata database migration (`airflow db migrate`) is one-way, can take a long time on large task-instance and log tables, and needs a backup first; cleaning old rows (`airflow db clean`) before the upgrade shortens it. Managed services (such as Cloud Composer or MWAA) only allow specific version pairs and often require a new environment rather than an in-place upgrade. Experienced teams make DAGs pass on the old version with the new-style APIs first, using the upgrade checks and ruff's Airflow rules, so the actual upgrade day changes only the platform.
</context>

<task>
Deployment: {{deployment}}
{{#dag_notes}}DAG notes: {{dag_notes}}{{/dag_notes}}

1. Read the official release notes and upgrade guide for every major and minor version between current and target, and list only the breaking changes that apply to this deployment. Mark anything you could not confirm "to verify".
2. Scan the DAGs, plugins and custom operators for removed or deprecated usage (imports, parameters, context keys, direct database sessions, SubDAGs, top-level code). Use the available upgrade check tooling and linters where they exist and report what they found.
3. Fix DAG code so it is compatible with both versions where possible, in small commits, and run DAG import tests (every DAG parses with no import errors) plus any task unit tests.
4. Build the target environment from the official constraint file: list each provider's current and target version and any provider whose own breaking changes affect the DAGs.
5. Write the runbook: database backup and `db clean` of old rows, pause DAGs or drain the scheduler, run the database migration, deploy the new image or environment, unpause in batches starting with low-risk DAGs. For managed services, plan a new environment and cut over instead.
6. Define verification: import errors at zero, a set of canary DAGs run end to end, connections and variables resolve, sensors and deferrable operators behave, and backfills or catchup do not start unexpectedly.
</task>

<constraints>
- Never run the database migration or delete metadata without a confirmed backup and the user's go-ahead.
- Do not invent version numbers, removed APIs or provider versions; cite the release notes or mark them to verify.
- Watch for catchup: a changed schedule or start date after upgrade can trigger a flood of backfill runs; call it out per DAG.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Breaking changes that apply
Table: change | version | affected DAGs or files | fix.
## DAG and plugin fixes
What changed and how it was tested on the current version.
## Provider and dependency plan
Table: package | current | target | notes.
## Upgrade runbook
Numbered steps with owner and expected duration.
## Verification
Checklist from step 6.
## Rollback
How to restore the database backup and previous image, and the point after which rollback stops being simple.
</output_format>
