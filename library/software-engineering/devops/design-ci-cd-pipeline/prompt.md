---
schema: 1
id: design-ci-cd-pipeline
kind: prompt
title: Design a CI/CD pipeline
description: Designs a CI/CD pipeline - stages, environments, promotion gates, caching, secrets and rollback triggers - and sketches the config for the chosen CI provider. Use when setting up delivery.
category: devops
version: 1.0.0
status: incubating
aliases: [devops-cicd]
stage: [design, ship]
role: [devops-engineer, sre, tech-lead, software-engineer]
stack: []
requires: [repo-read]
inputs: [repo, config, text]
output: [plan, diagram, config]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [continuous-delivery, deployment, rollback, release-engineering]
pairs_with:
  prompts: [write-github-actions-workflow, write-gitlab-ci-pipeline, design-deployment-strategy, speed-up-ci-pipeline]
  personas: [devops-engineer]
args:
  - name: project
    description: What is built and deployed - languages, build and test commands, artifacts, where it runs, how it is deployed today and how often.
    type: text
    required: true
  - name: ci_provider
    description: The CI/CD system to target, for example GitHub Actions, GitLab CI, Jenkins or CircleCI. Leave empty to get a recommendation.
    type: string
  - name: requirements
    description: Environments, approval rules, compliance needs, deploy frequency goals and anything that must not change.
    type: text
output_contract:
  format: markdown
  sections: [Pipeline, Environments and gates, Rollback, Config sketch, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good pipeline gives fast feedback on every change, builds an artifact once and promotes the same artifact through environments, and makes a bad deploy cheap to undo. Common failures are rebuilding per environment, secrets in logs, slow serial jobs, manual steps nobody documented, and no automatic way back when a deploy goes wrong.
{{#ci_provider}}
CI provider: {{ci_provider}}
{{/ci_provider}}
{{#requirements}}
Requirements: {{requirements}}
{{/requirements}}
</context>

<task>
Project:
<project>
{{project}}
</project>

1. If you can read the repository, use its real build, test and deploy commands, and say which files you read. Otherwise ask for the commands you need.
2. Design the stages from commit to production: lint and static checks, unit tests, build once into a versioned artifact, integration tests, security scans (dependencies, secrets, image), deploy to each environment, post-deploy checks. Say what runs on pull requests, on the main branch and on tags.
3. Make it fast: which jobs run in parallel, what is cached and keyed on what, and a target time for pull request feedback.
4. Define environments and promotion gates: what must pass to move from one environment to the next, which gates are automatic and which need a human approval, and who can approve.
5. Define rollback: the deploy strategy (rolling, blue-green or canary), the health signals and thresholds that trigger an automatic rollback, and the manual rollback command. Cover database migrations that cannot simply be reversed.
6. Handle secrets: where they live, how jobs get them with least privilege and short-lived credentials where the provider supports it, and how they are kept out of logs.
7. Draw the pipeline as a Mermaid diagram and sketch the configuration file structure for the chosen provider, with the key jobs written out.
8. Add failure handling and notifications: who is told about which failure, and where.
</task>

<constraints>
- Build the artifact once and promote it; never rebuild per environment.
- Pin third-party actions, images and tools to versions or digests.
- Do not put secrets in the config, the repository or job output.
- Do not invent commands the project does not have; mark placeholders clearly.
- If the provider is not given, recommend one in a sentence from the project's hosting and say why.
{{> output/uncertainty}}
</constraints>

<output_format>
## Pipeline
The Mermaid diagram and each stage with its trigger, purpose and target duration.
## Environments and gates
A table: environment, how it is reached, automatic checks, approvals.
## Rollback
Strategy, automatic triggers with thresholds, manual command, migration handling.
## Config sketch
The file layout and the key jobs in the provider's syntax.
## Open questions
What you need from the team to finish the design.
</output_format>
