---
schema: 1
id: design-tenant-provisioning
kind: prompt
title: Design tenant provisioning and offboarding
description: Designs automated tenant onboarding and offboarding for a SaaS, covering resources, schemas or databases, configuration, seed data, idempotent steps, retries, data export and verified teardown.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, devops-engineer, sre]
subject: [saas]
requires: [none]
inputs: [spec, text, config, repo]
output: [docs, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [tenant-lifecycle, onboarding-automation, offboarding, idempotency, data-deletion]
pairs_with:
  personas: [software-architect]
  prompts: [design-multi-tenancy, design-workflow-orchestration, audit-tenant-isolation, design-organization-account-model]
args:
  - name: tenancy
    description: The tenancy model (pooled, schema or database per tenant, dedicated stacks for some tiers) and what a new tenant needs (database objects, storage buckets, queues, DNS, keys, third-party accounts, seed data).
    type: text
    required: true
  - name: current_process
    description: How tenants are created and removed today (manual steps, scripts, tickets) and what goes wrong.
    type: text
  - name: requirements
    description: Time to provision, self-serve versus sales-led, tiers, data residency, retention and deletion commitments in contracts.
    type: text
output_contract:
  format: markdown
  sections: [Lifecycle states, Provisioning steps, Orchestration and failure handling, Tier and region variations, Offboarding and deletion, Verification and operations, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tenant provisioning starts as a runbook and a script someone runs after a sales deal, and fails in predictable ways: a step half-completes and the retry creates duplicates, a tenant is "live" before its search index exists, enterprise tenants on dedicated infrastructure are set up by hand and drift, and offboarding never really deletes anything, which becomes a contractual and privacy problem. The robust pattern treats a tenant as a resource with explicit lifecycle states (requested, provisioning, active, suspended, offboarding, deleted), and provisioning as an ordered list of idempotent steps run by a job or workflow engine, each step checking whether its resource already exists, recording progress, and having a matching teardown step. Long or external steps (DNS, certificates, third-party accounts) run asynchronously while the tenant waits in a provisioning state. Offboarding includes a grace period, data export, deletion across every store including backups by expiry, and evidence that deletion happened.
</context>

<task>
<tenancy>
{{tenancy}}
</tenancy>

{{#current_process}}
<current_process>
{{current_process}}
</current_process>
{{/current_process}}

{{#requirements}}
<requirements>
{{requirements}}
</requirements>
{{/requirements}}

1. If a repository is available, read the current provisioning scripts, infrastructure code and tenant model, and say what you read. Do not run any of them.
2. Define the tenant lifecycle states and allowed transitions, and what the product and the API allow in each state.
3. List the provisioning steps in order: each resource created, the step's idempotency check, its expected duration, its dependencies on earlier steps, and its matching teardown step.
4. Design orchestration and failure handling: the runner (job queue, workflow engine, infrastructure tool invoked by a controller), progress recording, retries with backoff, timeouts, manual intervention for stuck tenants, and how the user is shown progress.
5. Describe variations by tier and region: dedicated resources for higher tiers, data residency, and how configuration drift is prevented by provisioning everything from the same definitions.
6. Design offboarding and deletion: trigger (cancellation, non-payment), grace period and suspension, data export, deletion across databases, object storage, search, caches, logs, analytics and third parties, backup expiry, and a deletion record as evidence.
7. Define verification and operations: automated checks that a new tenant is fully working before it is marked active, an inventory reconciliation that finds orphaned or missing resources, metrics, and alerts.
</task>

<constraints>
- Every provisioning step must be safe to re-run.
- Deletion steps must be irreversible only after the grace period and explicit confirmation; never propose running destructive commands without approval and a verified target.
- Do not invent contractual retention periods; ask or label them as assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Lifecycle states
Mermaid state diagram plus rules per state.
## Provisioning steps
Table: order, step, resource, idempotency check, teardown, duration.
## Orchestration and failure handling
## Tier and region variations
## Offboarding and deletion
Numbered steps with timing.
## Verification and operations
## Open questions
Numbered.
</output_format>
