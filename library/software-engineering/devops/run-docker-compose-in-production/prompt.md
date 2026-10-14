---
schema: 1
id: run-docker-compose-in-production
kind: prompt
title: Run Docker Compose in production
description: Hardens a Docker Compose setup for one production server with restart policies, health checks, resource limits, log rotation, secrets, backups and low-downtime updates.
category: devops
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [devops-engineer, backend-engineer, founder]
stack: [docker]
requires: [repo-read, file-write]
inputs: [config, repo]
output: [config, checklist, script]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [compose, single-host, restart-policy, log-rotation, self-hosting]
pairs_with:
  prompts: [write-docker-compose, deploy-to-vps, harden-linux-server]
args:
  - name: compose
    description: The current compose file or a description of the services (app, database, cache, proxy, workers) and how they are deployed and updated today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Production compose, Updates, Backups, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Compose on a single server is a sound choice for many small production systems, but files written for local development carry habits that hurt in production: bind-mounted source code, `build:` on the server, `latest` tags, database ports published to `0.0.0.0` (Docker bypasses host firewalls such as ufw), no restart policy, `depends_on` without health conditions so the app starts before the database is ready, the default json-file log driver with no size limit filling the disk, secrets in the compose file, and database data in an anonymous volume that is orphaned by `down` and replaced by an empty one on the next `up`. Updates done with `docker compose up -d` recreate containers and drop requests unless the proxy can wait for a healthy new container; Compose has no rolling update for replicas of one service (`deploy.update_config` is a Swarm feature), so near-zero downtime on one host needs two separately named app services behind the proxy, updated one at a time, or a blue-green pair the proxy switches between.
</context>

<task>
Make this Compose setup production-ready on a single server:
<compose>
{{compose}}
</compose>

1. Read the compose file(s), Dockerfiles, `.env` usage and any deploy scripts. List the development-only habits found, each with the risk.
2. Write a production compose file (or an override file) that: uses pinned image tags or digests built in CI, not `build:`; sets `restart: unless-stopped`; adds health checks to every long-running service; uses `depends_on` with `condition: service_healthy`; sets memory and CPU limits; configures log rotation (`max-size`, `max-file`) or a log driver; uses named volumes for data.
3. Network exposure: only the reverse proxy publishes 80 and 443; everything else stays on internal networks or binds to `127.0.0.1`. Explain the Docker and host firewall interaction.
4. Secrets: an env file outside the repo with mode 600 owned by the deploy user, or Compose secrets mounted as files; a template with placeholder values.
5. Updates: a deploy script that pulls the new tag, runs migrations once with a one-off container, then recreates the app; for low downtime, define two app services (for example `app-a` and `app-b`) behind the proxy with health-checked upstreams and recreate them one at a time with `docker compose up -d --no-deps <service>`, waiting for healthy in between, or explain the brief restart if one instance is accepted.
6. Backups: a scheduled database dump (not a copy of the live volume), stored off the server, with retention and a restore test command.
7. Validate with `docker compose config` if available, and report the result.
</task>

<constraints>
- Never suggest `docker compose down -v` or deleting volumes without a backup and explicit confirmation.
- Do not expose database or cache ports to the internet.
- Do not invent Compose keys; check against the Compose specification version in use and say when unsure.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Each development habit found and its production risk, as bullets.

## Production compose
The production compose file or override with path and full contents, plus the env template.

## Updates
The deploy script and what downtime to expect.

## Backups
Dump schedule, off-server copy, retention and the restore test.

## Verify
`docker compose config` output or "not run", and checks after the first deploy.

## Follow-ups
Monitoring, host hardening and when to outgrow a single host. "None" if empty.
</output_format>
