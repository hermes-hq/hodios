---
schema: 1
id: deploy-app-to-paas
kind: prompt
title: Deploy an app to a PaaS
description: Deploys an app to a platform such as Render, Fly.io, Railway or Heroku with build config, release-phase migrations, health checks, secrets, workers, scaling and a custom domain.
category: devops
version: 1.0.0
status: incubating
stage: [ship]
role: [fullstack-engineer, backend-engineer, founder]
stack: []
requires: [repo-read, file-write]
inputs: [repo, text]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [paas, deployment, release-phase, custom-domain, platform-config]
pairs_with:
  prompts: [choose-app-hosting, set-up-domain-and-https, run-migrations-in-deploy-pipeline]
args:
  - name: app
    description: The app (language, framework, how it starts, port), its database and background workers, and the platform chosen.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Plan, Config files, App changes, Steps, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Platforms as a service hide servers but not every operational decision, and first deploys fail on the same handful of things: the app listens on a hard-coded port instead of the `PORT` the platform injects, or binds to `127.0.0.1` instead of `0.0.0.0`; migrations run in the start command on every instance; the app has no health check, so broken releases receive traffic; files are written to the local disk, which is wiped on every deploy; workers and scheduled jobs are forgotten because only the web process was declared; and secrets sit in the repo's `.env`. Each platform declares this in its own file (`render.yaml`, `fly.toml`, `railway.json`, `Procfile` plus `app.json`), and features such as release phases, health checks and multiple process types differ between them.
</context>

<task>
Deploy this app to its platform:
<app>
{{app}}
</app>

1. If the platform is not chosen, ask and stop (or point to choosing hosting first). Read the repository: start command, port handling, build steps, Dockerfile if any, migrations, workers, scheduled jobs, file storage and environment variables used.
2. Fix what blocks the platform, as small app changes: read `PORT` from the environment, bind to `0.0.0.0`, add a health endpoint if none exists, and move local-disk uploads to object storage only if the app writes files that must persist (otherwise note it).
3. Write the platform's config file: build command or Dockerfile, start command per process type (web, worker), health check path, region, instance size, and the minimum instance count for the web process.
4. Run migrations in the platform's release or pre-deploy phase, not in the start command.
5. Declare the managed database and other add-ons, and wire their connection strings as environment variables. List every secret the user must set through the platform's dashboard or CLI.
6. Scheduled jobs: use the platform's cron feature or a worker with a scheduler, and say which.
7. Custom domain: the DNS records to create and how HTTPS certificates are issued on that platform.
8. Give the deploy steps in order and run any local build or config validation available.
</task>

<constraints>
- Do not invent platform config keys; if unsure of a key for the chosen platform, say so and point to its docs by name.
- Never commit secrets or a real `.env`; provide a template with placeholder values.
- Do not quote plan prices as facts.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Plan
Processes, database, release phase, scheduled jobs and domain, in bullets.

## Config files
Each file with path and full contents.

## App changes
Diffs for port, bind address, health check and any storage change.

## Steps
Numbered deploy steps including secrets to set and DNS records.

## Verify
What was checked locally and what to check after the first deploy (health check, logs, migration output).

## Follow-ups
Backups for the database, alerts and scaling settings to revisit. "None" if empty.
</output_format>
