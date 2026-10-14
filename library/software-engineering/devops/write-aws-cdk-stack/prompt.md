---
schema: 1
id: write-aws-cdk-stack
kind: prompt
title: Write an AWS CDK app
description: Writes an AWS CDK app in TypeScript or Python with one stack per environment, L2 constructs, context-driven config, tagging, snapshot tests and cdk diff in CI.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, backend-engineer, software-engineer]
stack: [aws, typescript, python]
requires: [repo-read, file-write]
inputs: [spec, repo]
output: [code, tests, config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [iac, aws-cdk, cloudformation, snapshot-tests]
pairs_with:
  prompts: [review-iac-plan, write-least-privilege-iam-policy, design-cloud-account-structure]
args:
  - name: infrastructure
    description: What the app must provision, e.g. "Fargate service behind an ALB with an RDS Postgres database and an SQS queue".
    type: text
    required: true
  - name: language
    description: CDK language.
    type: enum
    enum: [typescript, python]
    default: typescript
  - name: environments
    description: Environments and their AWS accounts and regions, e.g. "dev in 111111111111 eu-west-1, prod in 222222222222 eu-west-1". Placeholders are fine.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Layout, Code, Tests, CI, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CDK is code that synthesises CloudFormation, and most CDK trouble comes from forgetting that. Logical IDs are derived from the construct path, so renaming or moving a construct replaces the resource, which deletes a database. Stateful resources default to `RemovalPolicy.DESTROY` in some constructs and `RETAIN` in others. `Stack.of(this).account` is a token unless the stack has an explicit `env`, so lookups (`Vpc.fromLookup`) fail or cache stale values in `cdk.context.json`, which must be committed. L1 (`Cfn*`) constructs give no secure defaults; L2 constructs do, and their `grant*` methods produce scoped IAM that hand-written policies rarely match. Mixing deploy-time environment variables into synthesis makes `cdk synth` non-deterministic, which breaks snapshot tests and code review of `cdk diff`.
</context>

<task>
Write an AWS CDK app in {{language}} that provisions:
{{infrastructure}}
{{#environments}}
Environments: {{environments}}
{{/environments}}

1. If a repository is available, read it first: existing `cdk.json`, `bin/` or `app.py`, stacks, `cdk.context.json`, package manager and test setup. Extend what exists; do not start a parallel app.
2. If the request leaves open a decision that changes the design (whether data must survive stack deletion, single or multi-account, VPC already exists or not), ask up to 3 questions and stop. Otherwise choose the safe default and record it.
3. Layout: one app entry point, one `Stage` or stack set per environment with explicit `env: {account, region}`, stateful resources (databases, buckets, queues with data) in their own stack so stateless stacks can be torn down freely.
4. Config: a typed per-environment config object (sizes, instance counts, domain names) selected by a context key such as `-c env=prod`. No `process.env` or `os.environ` reads inside constructs.
5. Constructs: prefer L2 constructs; use `grant*` methods for IAM instead of hand-written policies; encryption on, public access off, `removalPolicy: RETAIN` and deletion protection on stateful resources in prod. Wrap repeated patterns in a small custom construct only when used at least twice.
6. Apply tags at the app or stage level with `Tags.of(...)` (environment, service, owner, cost centre). Add `cdk-nag` (AwsSolutions pack) if the project allows a dependency, and suppress findings only with a written reason.
7. Tests: snapshot test of each synthesised stack plus fine-grained assertions (`Template.fromStack`) for the properties that matter: encryption, retention, public access, IAM scope.
8. CI: run tests and `cdk synth` on every pull request, post `cdk diff` against each environment, and deploy only from the main branch with an approval step for prod.
</task>

<constraints>
- Never rename a construct ID or move a construct between stacks for a stateful resource without saying it will replace the resource and how to avoid that.
- No hard-coded account IDs or ARNs in construct code; they come from the environment config.
- Use only constructs and properties that exist in `aws-cdk-lib` v2. If unsure a property exists, say so under Assumptions.
- Do not run `cdk deploy` or `cdk destroy`. Synth and tests only, and only if the toolchain is available.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Assumptions
Bullets, each default and why.
## Layout
The file tree with one line per file.
## Code
One fenced block per file, headed by its path.
## Tests
The test files, and what each assertion protects.
## CI
The pipeline steps (synth, test, diff, gated deploy) as config or a precise list.
## Verify
Commands run and their real result, or "not run" with the commands for the user: install, test, `cdk synth`, `cdk diff`.
</output_format>
