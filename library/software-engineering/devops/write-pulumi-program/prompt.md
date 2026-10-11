---
schema: 1
id: write-pulumi-program
kind: prompt
title: Write a Pulumi program
description: Writes a Pulumi program with per-stack config, encrypted secrets, component resources, stack references between projects and pulumi preview on every pull request.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre, software-engineer]
stack: [typescript, python, go]
requires: [repo-read, file-write]
inputs: [spec, repo]
output: [code, config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [iac, pulumi, component-resources, stack-config]
pairs_with:
  prompts: [review-iac-plan, structure-terraform-environments]
args:
  - name: infrastructure
    description: What the program must provision and on which cloud, e.g. "GKE Autopilot cluster, Cloud SQL Postgres and an Artifact Registry repo on GCP".
    type: text
    required: true
  - name: language
    description: Pulumi language.
    type: enum
    enum: [typescript, python, go]
    default: typescript
  - name: stacks
    description: Stacks (environments) and what differs between them, and the state backend in use (Pulumi Cloud, S3, GCS, Azure Blob).
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Layout, Code, Stack config, CI, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pulumi programs look like ordinary code, which invites ordinary-code mistakes that are expensive in infrastructure. Resource outputs are `Output<T>` values resolved at deploy time, so string concatenation or `if` on them silently produces `[object Object]` or wrong branches; `apply`, `pulumi.interpolate` and `all` are the correct tools. The resource name argument is part of the URN: changing it or moving a resource under a different parent replaces it unless an `aliases` entry is added. Secrets read with `config.require` instead of `config.requireSecret` end up in plain text in state. Reading environment variables or calling cloud APIs directly in the program makes `pulumi preview` non-repeatable. Splitting long-lived shared infrastructure (network, cluster) from fast-changing app stacks, joined by `StackReference`, keeps blast radius small.
</context>

<task>
Write a Pulumi program in {{language}} that provisions:
{{infrastructure}}
{{#stacks}}
Stacks and backend: {{stacks}}
{{/stacks}}

1. If a repository is available, read `Pulumi.yaml`, existing `Pulumi.<stack>.yaml` files, the program entry point and dependency manifest first, and extend them.
2. If a design-changing decision is open (one project or split network and app projects, which backend, whether data must survive `pulumi destroy`), ask up to 3 questions and stop. Otherwise default safely and record it.
3. Config: a typed config loader at the top of the program; required values with `config.require*`, secrets with `config.requireSecret`, and per-stack values in `Pulumi.<stack>.yaml`. Explain how to set a secret (`pulumi config set --secret`) without writing any secret value.
4. Wrap each reusable group of resources in a `ComponentResource` with typed args, passing `{ parent: this }` to children and registering outputs.
5. Handle outputs correctly: no string building from raw outputs; use `interpolate`/`apply`. Export only what other stacks or people need.
6. Stateful resources get `protect: true` in prod and `retainOnDelete` where data must outlive the stack. Encryption on, public access off, IAM scoped to named resources.
7. If shared infrastructure lives in another project, read it through a `StackReference` and say which outputs the other project must export.
8. CI: `pulumi preview --diff` on every pull request for each affected stack, `pulumi up` only from main, with an approval step for prod and the access token or cloud credentials from the CI secret store.
</task>

<constraints>
- Never change a resource's logical name or parent on existing infrastructure without adding `aliases`, and say so.
- No secret values, tokens or account IDs in code or committed stack files; secrets only as encrypted config.
- Use only resource types and arguments that exist in the current provider package; mark any you are unsure of.
- Do not run `pulumi up` or `pulumi destroy`. Preview only, and only with the user's credentials already configured.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Assumptions
Bullets, each default and why.
## Layout
File tree, one line per file.
## Code
One fenced block per file, headed by its path.
## Stack config
The `Pulumi.<stack>.yaml` files with placeholders, and the `pulumi config set` commands for secrets (names only).
## CI
Preview and gated deploy steps.
## Verify
Commands run and their real result, or "not run" plus the commands: install, type check, `pulumi preview` per stack.
</output_format>
