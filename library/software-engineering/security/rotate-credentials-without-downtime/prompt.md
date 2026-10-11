---
schema: 1
id: rotate-credentials-without-downtime
kind: prompt
title: Rotate a credential without downtime
description: Rotates a database password, API key or signing key with a dual-credential overlap so no request fails, with a check and a rollback at every step.
category: security
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [devops-engineer, sre, backend-engineer, security-engineer]
stack: []
requires: [repo-read, shell]
inputs: [repo, config]
output: [plan, checklist, code]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [credential-rotation, secret-rotation, zero-downtime, key-rotation, runbook]
pairs_with:
  prompts: [plan-secrets-management, respond-to-leaked-secret, sync-secrets-into-kubernetes, harden-jwt-validation]
args:
  - name: credential
    description: What is being rotated (database user password, third-party API key, JWT or webhook signing key, TLS key, cloud access key) and who issues it.
    type: text
    required: true
  - name: environment
    description: Where it is stored and how apps load it (secrets manager, env vars, Kubernetes secret, CI variable), which services and jobs use it, and how they are deployed.
    type: text
    required: true
  - name: urgency
    description: Routine rotation or suspected compromise. Optional; defaults to routine.
    type: text
output_contract:
  format: markdown
  sections: [Consumers, Overlap strategy, Runbook, Rollback, Code changes, After rotation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rotations cause outages for one reason: the old credential is revoked before every consumer has the new one. Long-running processes read secrets once at startup, cron jobs and workers on other hosts get forgotten, connection pools keep old sessions alive until they reconnect and then fail, and caches hold the value for hours. The fix is an overlap window where old and new are both valid. Each credential type has its own way to get one. Databases: create a second login (or a second user with the same grants) and swap between the pair, since most engines allow only one password per user (MySQL 8 dual passwords are an exception). API keys: most providers allow two active keys; add the new one, deploy, watch usage of the old one drop to zero, then revoke. Signing keys (JWT, webhooks): verifiers must accept both keys (a JWKS with two `kid`s, or a list of secrets) before signers switch, and the old key must stay for verification until the longest token lifetime has passed. Encryption keys need re-encryption or envelope keys and are a separate job. Under suspected compromise the overlap shrinks to minutes and some failed requests are an acceptable price.
</context>

<task>
Plan and prepare the rotation of {{credential}} in {{environment}}.
{{#urgency}}Situation: {{urgency}}{{/urgency}}

1. Find every consumer: search the repo, infrastructure code, CI config, deploy manifests and docs for the secret's name and the systems that use it. List services, workers, cron jobs, scripts, CI pipelines, local dev setups and third parties that hold it. Ask about consumers outside the repo.
2. Check how each consumer loads the secret (startup only, periodic reload, per request) and whether it needs a restart to pick up a new value.
3. Choose the overlap strategy for this credential type and confirm the issuer supports it (two active keys, dual users, JWKS with multiple keys). If it does not, say so and plan a short maintenance window instead.
4. Write the runbook as numbered steps, each with the command or console action, how to verify it worked (a health check, a login with the new value, a log or metric showing the old credential's use falling to zero), and the rollback for that step.
5. If code must change to accept two values (verifiers, connection config, reload on change), make the smallest change following existing patterns and add a test that both old and new values work during the overlap.
6. Define when it is safe to revoke the old credential: zero use for an agreed period, longer than the longest token lifetime or cache TTL.
7. Note follow-ups: automate the next rotation, shorten the lifetime, and record the date.
</task>

<constraints>
- Do not run rotation, revocation, restart or deploy commands yourself; present them for a person to run and confirm.
- Never print, log or commit secret values; use placeholders and references to the secrets manager.
- If compromise is suspected, put revocation speed first and say what will break.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Consumers
Table: consumer, where configured, how it loads the secret, restart needed.
## Overlap strategy
How old and new stay valid together, and for how long.
## Runbook
Numbered steps, each with action, verification and rollback.
## Rollback
How to return to the old credential at each stage.
## Code changes
Files changed and tests run, or "none needed".
## After rotation
Revocation criteria, cleanup and automation follow-ups.
</output_format>
