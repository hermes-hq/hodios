---
schema: 1
id: move-app-off-heroku
kind: prompt
title: Move an app off Heroku to another platform
description: Moves an app from Heroku to another platform, mapping dynos, add-ons, config vars, release phase, scheduler and buildpacks, and moving the database with a planned cutover.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, operate]
role: [devops-engineer, backend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [plan, config, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [heroku, paas-migration, procfile, buildpacks, dns-cutover]
pairs_with:
  prompts: [deploy-app-to-paas, plan-cloud-migration, move-database-to-managed-service]
  personas: [migration-engineer]
args:
  - name: app
    description: Language and framework, Procfile, add-ons in use, dyno types and counts, database size, and custom domains.
    type: text
    required: true
  - name: target
    description: Target platform if chosen (another PaaS, containers on a cloud, a VM), or constraints such as budget and team skills.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Concept mapping, Data move, Deploy setup, Cutover plan, Rollback, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Heroku apps depend on platform behaviour that is easy to forget until it is gone. The Procfile defines process types; the `release` process runs migrations before each deploy; buildpacks decide the build, so moving usually means a Dockerfile or Cloud Native Buildpacks. The app must bind to `$PORT`, the filesystem is ephemeral, and the router enforces a 30 second request timeout that the new platform may not, or may make shorter. Config vars include values set by add-ons (`DATABASE_URL`, `REDIS_URL`), and Heroku Postgres credentials rotate, so copied values go stale. Heroku Redis uses TLS with certificates clients often had to skip verifying. Heroku Postgres gives no superuser, so the usual move is a dump and restore in a maintenance window; size decides the downtime, and a rehearsal measures it. Many add-ons (logging, email, monitoring) are accounts with third parties that can be kept and reconnected rather than replaced. Heroku Scheduler jobs, log drains, review apps and SSL certificates are separate items that need homes. DNS TTL should be lowered days before cutover.
</context>

<task>
App: {{app}}
{{#target}}Target: {{target}}{{/target}}

1. Read the Procfile, `app.json`, buildpack settings, framework config and code that reads environment variables. Ask for the add-on list and config var names (not values) if not in the repo.
2. If no target is chosen, recommend one or two that fit and say why. Then build the concept mapping for every process type, add-on and platform feature.
3. Set up the build and deploy on the target: container or buildpack build, release command for migrations, web and worker processes, scheduled jobs, health check and port binding.
4. Plan the data move: rehearse a database dump and restore to measure time, choose the window, move Redis data only if it is not cache, and move files if any were stored outside the dyno.
5. Write the cutover: lower DNS TTL in advance, enable maintenance mode, final dump and restore, switch config, smoke test on the new host, switch DNS, issue certificates, then watch errors and logs. Keep Heroku intact until the rollback window ends.
6. List what to cancel on Heroku afterwards and in which order, for the user to do.
</task>

<constraints>
- Do not ask for or print secret values; work with config var names.
- Do not shut down, scale down or delete anything on Heroku; give the user the steps and timing.
- Do not quote prices or plan limits as current without telling the user to confirm them.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Concept mapping
Table: Heroku piece (process type, add-on, config var, feature) | target equivalent | notes.
## Data move
Database, Redis and file data: method, expected downtime, verification.
## Deploy setup
Build method, release command, processes, scheduler, health check.
## Cutover plan
Ordered steps with maintenance mode, DNS, certificates and checks.
## Rollback
How to return to Heroku and until when that is possible.
## Remaining risks
Bullets, or "None".
</output_format>
