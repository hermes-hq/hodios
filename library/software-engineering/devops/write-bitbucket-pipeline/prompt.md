---
schema: 1
id: write-bitbucket-pipeline
kind: prompt
title: Write a Bitbucket Pipelines config
description: Writes a bitbucket-pipelines.yml with branch and pull request pipelines, caches, parallel steps, services, artifacts, deployments with environment variables and OIDC to the cloud.
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
tags: [bitbucket-pipelines, ci, deployment-environments, pipeline-caching]
pairs_with:
  prompts: [design-ci-cd-pipeline, migrate-ci-provider, speed-up-ci-pipeline]
args:
  - name: goal
    description: What the pipeline must do, for example "test every pull request, deploy main to staging and tags to production".
    type: text
    required: true
  - name: requirements
    description: Extra constraints such as runtime versions, services (Postgres, Redis), deploy targets, or runner size.
    type: text
output_contract:
  format: markdown
  sections: [Pipeline, Decisions, Repository settings, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bitbucket Pipelines has its own model: each step runs in a fresh container from the step's image, so files must be passed between steps as `artifacts`; caches are per-repository and keyed by name (with optional file-based keys); services such as databases run as sidecar containers sharing memory with the step, which is why memory-heavy builds hit the step's limit unless `size: 2x` or larger is set. `pull-requests` pipelines run on the merge result, `branches` pipelines on pushes, and `tags` on tags; a branch pipeline and a pull request pipeline can both run for one push. Deployments use named environments (Test, Staging, Production) whose variables and permissions are set in repository settings, and `trigger: manual` adds a manual gate; deployment variables exist only in steps with that `deployment`, and one environment can be used by only one step per pipeline unless those steps are grouped in a `stage` that declares the deployment. Secured variables are masked in logs; OIDC lets steps assume cloud roles without stored keys.
</context>

<task>
Write a Bitbucket Pipelines configuration that does this: {{goal}}
{{#requirements}}
Requirements: {{requirements}}
{{/requirements}}

1. Read the repository: languages, package manager and lockfile, build, lint and test commands, runtime version files, Dockerfiles and any existing `bitbucket-pipelines.yml`.
2. Choose a pinned image per step matching the runtime version. Define reusable steps under `definitions` with YAML anchors to avoid repetition.
3. Pull request pipeline: lint and test, in `parallel` where independent; publish test reports in a folder Bitbucket detects; caches for the package manager (built-in caches or custom ones keyed on the lockfile).
4. Services: define databases or caches under `definitions.services` with pinned images and memory limits, and point tests at them through environment variables.
5. Branch and tag pipelines: build once, pass outputs as artifacts, and deploy with `deployment:` steps per environment; production with `trigger: manual` or on tags.
6. Credentials: secured repository or deployment variables referenced by name, or OIDC to the cloud provider with a role per environment. List every variable the user must create.
7. Set `max-time` on long steps and `size` where memory needs it, and explain the build-minute impact.
8. Write the file and say how to validate it (the Bitbucket pipeline validator in the UI, or a first run on a branch).
</task>

<constraints>
- Do not invent pipes, image names or keywords; use plain script steps when unsure a pipe exists.
- Never put secrets in the file; reference secured variables or OIDC.
- Do not change branch permissions or merge checks; list the ones to configure.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Pipeline
The complete `bitbucket-pipelines.yml`.

## Decisions
One bullet each for images, caching, parallelism, services and deployment gates.

## Repository settings
Variables, deployment environments, OIDC setup and merge checks to configure.

## Verify
How the file was or can be validated, and what to check on the first run.

## Follow-ups
Anything left as a placeholder. "None" if empty.
</output_format>
