---
schema: 1
id: run-migrations-in-deploy-pipeline
kind: prompt
title: Run database migrations in the deploy pipeline
description: Decides where database migrations run during a deploy (pipeline job, release phase, init container or one-off task), with locking, ordering against the app rollout and failure handling.
category: devops
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [devops-engineer, backend-engineer, dba]
stack: []
requires: [repo-read, file-write]
inputs: [repo, config]
output: [plan, config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [database-migrations, deploy-pipeline, schema-changes, rollout-ordering]
pairs_with:
  prompts: [plan-zero-downtime-schema-change, review-database-migration, design-deployment-strategy]
args:
  - name: setup
    description: The app, its migration tool (Rails, Django, Alembic, Flyway, Liquibase, Prisma, golang-migrate), where it is deployed, how many instances run, and how migrations run today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Recommendation, Pipeline changes, Failure handling, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Run migrations on app start" is the default in many tutorials and the cause of many outages: with several replicas, every instance races to migrate at once; a long migration makes health checks fail so the orchestrator kills the pod mid-migration; and a failed migration leaves new code crash-looping. Migrations belong in exactly one place per deploy, run once, before the new code takes traffic, with a lock (most tools take an advisory lock or a lock table; some do not), a timeout, and credentials that can alter the schema while the app itself runs with less. The right place depends on the platform: a pipeline job or a one-off task (ECS run-task, Cloud Run job, Kubernetes Job or Helm pre-upgrade hook), or the platform's release phase on Heroku-style PaaS. Kubernetes init containers run per pod, so they need the tool's lock and are usually the weaker choice. Because migrations run before new code, every migration must be compatible with the code still running.
</context>

<task>
Decide and implement how migrations run in this deploy:
<setup>
{{setup}}
</setup>

1. Read the repository: migration tool and files, entrypoint or start scripts, Dockerfile, deploy manifests and CI/CD files. Find where migrations run today, including hidden calls in entrypoints.
2. Check whether the tool takes a lock to stop concurrent runs; say what it does by the tool's documented behaviour, and say if you are unsure.
3. Pick the place migrations run (pipeline job, release phase, one-off task or job, pre-upgrade hook) and give the reason in two or three sentences tied to the platform and the replica count.
4. Order the deploy: build image, run migrations with the new image and a timeout, then roll out the app only if migrations succeeded. Remove migration calls from app startup.
5. Give the migration step its own database role or credentials with schema-change rights, and keep the app's runtime credentials narrower where the database allows it.
6. Failure handling: the deploy stops and the old version keeps serving; describe what state the database may be in for this tool (transactional DDL or not) and how to recover. Do not rely on automatic down-migrations in production.
7. Add a rule for authors, as a short note: migrations must work with the code currently running (expand and contract), with destructive steps in a later release.
8. Make the pipeline and manifest changes and run the CI linter or a template render (`helm template`, `kubectl --dry-run=client`) if available.
</task>

<constraints>
- Do not run migrations against any real database while working; changes are to pipeline and deploy files only.
- Do not invent tool flags; check the repo's version of the tool and say when unsure.
- Do not propose automatic rollback of schema changes.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Recommendation
Where migrations run, why, and the deploy order.

## Pipeline changes
Each changed file with a diff or full contents.

## Failure handling
What happens when a migration fails or times out, and the recovery steps.

## Verify
What was checked (linter, render) and how to test on staging.

## Follow-ups
Credentials to create, the author rule to add to contributor docs, and long migrations that need a separate plan. "None" if empty.
</output_format>
