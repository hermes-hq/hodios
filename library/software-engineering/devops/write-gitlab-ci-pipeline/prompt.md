---
schema: 1
id: write-gitlab-ci-pipeline
kind: prompt
title: Write a GitLab CI pipeline
description: Writes a .gitlab-ci.yml with stages, a needs graph, lockfile-keyed caching, rules, environments and secrets kept out of logs. Use when setting up or rebuilding CI/CD for a GitLab project.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, software-engineer, backend-engineer]
stack: [gitlab-ci]
requires: [repo-read, file-write]
inputs: [repo, text, config]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pipelines, merge-requests, environments, oidc]
pairs_with:
  personas: [devops-engineer]
  prompts: [speed-up-ci-pipeline, plan-secrets-management, design-deployment-strategy]
args:
  - name: project
    description: What the pipeline builds and checks - language, build and test commands, services needed in tests (database, cache), monorepo layout, and any existing pipeline to replace.
    type: text
    required: true
  - name: deploy_target
    description: Where and how it deploys, for example "Docker image to GitLab registry, then Helm to a Kubernetes cluster, staging on main, prod manual" or "static site to S3".
    type: string
output_contract:
  format: markdown
  sections: [Pipeline overview, .gitlab-ci.yml, Variables to create, Deploy flow, Validate it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GitLab CI pipelines usually go wrong in these places: duplicate pipelines for a branch and its merge request, because `workflow:rules` is missing; legacy `only` and `except` mixed with `rules`, so jobs run when they should not; caches keyed on the branch so every branch reinstalls dependencies; a strictly staged pipeline where `needs` would let jobs start earlier; long-lived cloud keys stored as variables when the runner could use OIDC ID tokens; secrets printed by `set -x` or debug output; two deploys to the same environment racing; and production deploys any developer can trigger from an unprotected branch.
</context>

<task>
Write a GitLab CI pipeline for:
<project>
{{project}}
</project>
{{#deploy_target}}Deploy target: {{deploy_target}}{{/deploy_target}}

1. If you can read the repository, take the real build, lint and test commands from it (package scripts, Makefile, existing CI) instead of guessing. If the commands are unknown, ask and stop.
2. `workflow:rules` so pipelines run for merge requests, the default branch and tags, without duplicate branch pipelines when a merge request is open.
3. Stages that read as the delivery flow (for example lint, test, build, deploy), with `needs` so independent jobs run as soon as their inputs exist. Mark non-deploy jobs `interruptible: true`.
4. Images pinned to a version, never `latest`. Shared setup goes in a hidden job used with `extends`, not copied.
5. Cache keyed on the lockfile (`cache:key:files`), with `pull` policy for jobs that only read it. Artifacts only for outputs later jobs need, each with `expire_in`. Test reports through `artifacts:reports:junit` and coverage through the coverage report so results show in the merge request.
6. Use `rules` with `changes` to skip unaffected work in a monorepo, if the layout calls for it.
7. Deploy jobs: an `environment` with a name and URL; `resource_group` so deploys to one environment never overlap; staging deploys automatically from the default branch; production is `when: manual` (or on tags) and the docs tell the user to make it a protected environment.
8. Secrets: masked and protected CI/CD variables for anything sensitive, used only in jobs on protected refs. For cloud access, prefer OIDC with `id_tokens` and a role that trusts the project and branch over stored keys. No `set -x` in jobs that touch secrets.
</task>

<constraints>
- Use current GitLab CI keywords only; do not use `only` or `except`.
- Do not invent commands, registry paths or cluster names; leave clearly named placeholders and list them.
- Keep the file readable top to bottom; split into `include`d files only if it passes about 200 lines.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Pipeline overview
Table: stage, job, runs when, needs, approximate duration.
## .gitlab-ci.yml
One fenced YAML block.
## Variables to create
Table: name, masked, protected, environment scope, used by. Never real values.
## Deploy flow
Numbered: what happens from merge to production, and how to roll back.
## Validate it
The pipeline editor or CI Lint (`glab ci lint`), and what a first green run should show.
</output_format>
