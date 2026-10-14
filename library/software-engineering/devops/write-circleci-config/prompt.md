---
schema: 1
id: write-circleci-config
kind: prompt
title: Write a CircleCI config
description: Writes a CircleCI config.yml with executors, reusable commands, caching keyed on lockfiles, workspaces, test splitting, contexts for secrets and approval-gated deploy workflows.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, software-engineer]
stack: []
requires: [repo-read, file-write]
inputs: [repo, spec]
output: [config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [circleci, ci, test-splitting, workflows, contexts]
pairs_with:
  prompts: [design-ci-cd-pipeline, speed-up-ci-pipeline, migrate-ci-provider]
args:
  - name: goal
    description: What the pipeline must do, for example "run lint and tests on every push, deploy main to production after approval".
    type: text
    required: true
  - name: requirements
    description: Extra constraints such as runtime versions, services, resource class, orbs allowed or banned by the organisation, deploy target.
    type: text
output_contract:
  format: markdown
  sections: [Config, Decisions, Project settings, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CircleCI configs tend to grow into copy-pasted jobs with caches that never hit. The specifics that matter: cache keys must include a checksum of the lockfile with a fallback key prefix, and caches are immutable once saved, so a key that never changes saves once and is never updated; workspaces (`persist_to_workspace` and `attach_workspace`) pass build outputs between jobs in one workflow, while caches are for dependencies across runs. Parallelism plus `circleci tests split --split-by=timings` cuts test time only when test results are stored with `store_test_results`. Secrets belong in contexts, which can be restricted to security groups, and are not available to forked pull requests by default. Orbs save time but are third-party code; pin them to exact versions and prefer certified or partner orbs. Approval jobs (`type: approval`) gate deploys.
</context>

<task>
Write a CircleCI config that does this: {{goal}}
{{#requirements}}
Requirements: {{requirements}}
{{/requirements}}

1. Read the repository: languages, package manager and lockfile, build, lint and test commands, runtime version files, and any existing `.circleci/config.yml`.
2. Use `version: 2.1`. Define executors with pinned images (CircleCI convenience images matching the runtime version) and a resource class that fits the workload.
3. Write reusable `commands` for repeated steps such as install with cache restore and save, using cache keys built from a version prefix plus the CircleCI checksum template of the lockfile, with a fallback key.
4. Jobs: lint, test (with `parallelism` and timing-based splitting if the suite is slow, and `store_test_results` plus `store_artifacts`), build (persisting outputs to the workspace), deploy (attaching the workspace).
5. Workflows: filters so deploys run only on main or tags (tags need explicit tag filters on every upstream job), an approval job before production, and serialisation of deploys if the team needs it.
6. Secrets through contexts referenced by name, restricted to the deploy jobs. Prefer OIDC tokens to cloud roles over stored keys.
7. Orbs only when they clearly save work, pinned to exact versions, and listed with what each does.
8. Write the file and validate it with `circleci config validate` if the CLI is available.
</task>

<constraints>
- Do not invent orb names, orb commands or image tags; use plain `run` steps when unsure.
- Never put secrets in the config; reference contexts or project environment variables by name.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Config
The complete `.circleci/config.yml`.

## Decisions
One bullet each for executors, caching, workspaces, test splitting, filters and orbs.

## Project settings
Contexts, security group restrictions, environment variables and OIDC roles to create.

## Verify
`circleci config validate` output or "not run", and what to check on the first run.

## Follow-ups
Placeholders to fill and settings for forked pull requests. "None" if empty.
</output_format>
