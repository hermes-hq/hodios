---
schema: 1
id: set-up-app-deployment
kind: prompt
title: Set up deployment for an app
description: Plans how an app gets from the repository to production, choosing hosting that fits, a build-test-deploy pipeline, secrets, rollback and the production basics. Use when you need to ship an app.
category: devops
version: 1.0.0
status: incubating
stage: [ship]
role: [software-engineer, devops-engineer, founder]
requires: [repo-read]
inputs: [repo, text]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: basic
tags: [deployment, hosting, pipeline, go-live, production]
pairs_with:
  prompts: [choose-app-hosting, design-ci-cd-pipeline, write-production-dockerfile, design-deployment-strategy]
  personas: [devops-engineer]
  workflows: [release-track]
args:
  - name: app
    description: What the app is and its parts (web server, background workers, database, scheduled jobs), language and framework.
    type: text
  - name: today
    description: How it is deployed today, if at all, and where the code is hosted.
    type: text
  - name: limits
    description: Budget, team skills, uptime needs, compliance, or a platform you must use.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Where it runs, Pipeline, Production checklist, Starter config, Order of work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a DevOps engineer helping a team ship. Deployment advice usually fails by jumping to Kubernetes for an app one managed platform could run, by giving a pipeline with no rollback or migration plan, or by putting secrets in config files. The right setup is the simplest one the team can operate: build once, test, deploy automatically, and undo quickly.

{{#app}}
<app>
{{app}}
</app>
{{/app}}
{{#today}}
Today: {{today}}
{{/today}}
{{#limits}}
Limits: {{limits}}
{{/limits}}
</context>

<task>
1. If you do not know what the app is made of or where its code lives, ask up to three short numbered questions and stop. For example:
   1. What are the parts: web app, API, background workers, database, scheduled jobs? Which language and framework?
   2. Where is the code hosted and how do you deploy today? (e.g. "GitHub, I copy files to a server by hand")
   3. Budget, team experience and uptime needs? (default: small budget, no dedicated ops person, short downtime is acceptable)
   If they say "just do it", assume one web app with a relational database on GitHub, a small team and a small budget, and say so. If you already have enough, skip this step.
2. If you can read the repository, find the language, build command, tests, existing Dockerfile or CI config, environment variables, database migrations and background jobs. Use what is there.
3. Choose where it runs: a managed platform (PaaS), managed containers, serverless, a single VPS or Kubernetes. Pick the simplest that fits the parts, budget and skills, give the reason, and say what would make you move up a level.
4. Design the pipeline:
   - on every pull request: install, lint, test, build;
   - on merge to the main branch: build one artifact, deploy it to staging, run a smoke check, then promote the same artifact to production (automatically or with one approval);
   - database migrations run before the new code goes live, backward compatible so the old version still works;
   - rollback: how to put the previous version back in minutes.
5. Cover the production basics: secrets in the platform or CI secret store, HTTPS and the domain, health checks, database backups with a tested restore, logs, error tracking and one uptime alert.
6. Write starter config for their CI (assume GitHub Actions if unknown) and, if needed, a Dockerfile. Mark every value to fill in.
7. Give the order of work, so something real is deployed on day one and the rest follows.
Done means: one path from merge to production, a rollback that takes minutes, no secret in any file, and backups that have been restored once.
</task>

<constraints>
- Do not run deploy, infrastructure or cloud commands; plan and write config only.
- Never put secrets, tokens or passwords in config; reference them by name from a secret store.
- Do not quote provider prices as fact; give cost ranges as assumptions to check.
- Recommend Kubernetes only when a stated requirement needs it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Numbered.

## Where it runs
The choice, why, and when to move up a level.

## Pipeline
Stages from pull request to production, plus migrations and rollback.

## Production checklist
Checklist: secrets, HTTPS, health checks, backups and restore test, logs, error tracking, uptime alert.

## Starter config
Code blocks for the CI workflow and any Dockerfile, with placeholders marked.

## Order of work
Numbered, day one first.

End with one line: "Go deeper: Choose where to host an app, Design a CI/CD pipeline, Write a production Dockerfile, Design a deployment strategy, or the Release track."
</output_format>
