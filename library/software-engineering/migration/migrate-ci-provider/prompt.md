---
schema: 1
id: migrate-ci-provider
kind: prompt
title: Migrate CI to another provider
description: Plans and writes the migration of CI pipelines from one provider to another, mapping jobs, caches, secrets, triggers and artifacts, with a parallel-run period and a cutover checklist.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [devops-engineer]
requires: [none]
inputs: [config]
output: [config, plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [pipelines, ci-migration, secrets-management, build-cache, oidc]
pairs_with:
  prompts: [plan-incremental-migration]
args:
  - name: current_config
    description: The current pipeline definitions (paste the files), plus anything configured outside them such as UI-defined variables, scheduled builds, required status checks or self-hosted runners.
    type: text
    required: true
  - name: target
    description: The CI provider to move to. Choose other and name it in constraints if it is not listed.
    type: enum
    enum: [github-actions, gitlab-ci, other]
    default: github-actions
  - name: constraints
    description: Anything that limits the plan, for example "no downtime in releases", "must use self-hosted runners in our VPC", "deadline end of quarter", "monorepo with 40 services".
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Mapping, Target pipelines, Secrets and access, Parallel run, Cutover checklist, Rollback, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A CI migration is not a syntax translation. Most breakage comes from what the old config never said explicitly: implicit checkout depth and submodules, default environment variables, cache keys and their invalidation, artifacts passed between stages, branch protection rules that name old status checks, secrets that lived in a UI, deploy credentials with long-lived keys, scheduled jobs, path filters in a monorepo, and concurrency behaviour that kept two deploys from racing. A good plan inventories all of that, maps each item, runs both systems side by side until results match, and only then switches the required checks.
</context>

<task>
Plan the move of the pipelines below to {{target}}.

<current_config>
{{current_config}}
</current_config>

{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Inventory everything the current CI does, explicit or implicit: triggers (push, pull request, tags, schedules, manual, path filters), jobs and their order or dependencies, matrices, runners and images, services (databases, browsers), caches and their keys, artifacts and how they move between jobs, test reports, secrets and variables, environments and approvals, deploy steps and their credentials, concurrency and cancellation, notifications, and branch protection checks that depend on job names.
2. Map each item to the target's equivalent, and mark anything with no direct equivalent and how you will handle it. For deploy credentials, prefer short-lived federated credentials (OIDC) over copying long-lived keys if the target and cloud support it.
3. Write the target pipeline configuration as complete, runnable files. Pin third-party actions, templates or images to a version (a full commit SHA for third-party actions where the target supports it), set least-privilege token permissions, and keep job names stable and meaningful because branch protection will reference them.
4. Plan a parallel run: both systems run on every pull request, the new one non-blocking, for a defined period or number of runs. Define how you will compare them (same pass or fail, same test counts, similar duration, identical artifacts) and the exit criteria.
5. Write the cutover checklist in order: move secrets, switch required status checks, disable old triggers, keep old config for a set time, update badges and docs, remove old credentials.
6. Write the rollback: how to re-enable the old system within minutes if the new one fails during the first releases.
7. Before answering, re-check that every inventoried item appears in the mapping and target files, that no secret value appears anywhere in your output, and that deploy jobs cannot run on pull requests from forks.

If the pasted config references templates, includes or shared libraries that are not shown, list them under Open questions and mark the affected jobs as incomplete instead of guessing their contents.
</task>

<constraints>
- Never put secret values in the output; refer to secrets by name only.
- Do not drop a job or check because it has no direct equivalent; say how it is replaced or ask.
- Keep the build behaviour the same; improvements (faster caching, new checks) go in a separate, clearly labelled list.
- Describe {{target}} features as they work in general; if a behaviour depends on a plan tier or version, say so instead of assuming.
</constraints>

<output_format>
## Inventory
| Item | Current behaviour | Explicit or implicit |

## Mapping
| Current | Target equivalent | Notes or gap |

## Target pipelines
Complete configuration files in fenced blocks, each with its path.

## Secrets and access
Each secret and variable by name, where it moves, and credentials to replace with short-lived ones.

## Parallel run
Duration, comparison method and exit criteria.

## Cutover checklist
Numbered steps with an owner placeholder.

## Rollback
Steps and the time they take.

## Open questions
Missing information, or "None".
</output_format>
