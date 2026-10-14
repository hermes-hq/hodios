---
schema: 1
id: harden-database-access
kind: prompt
title: Harden database access
description: Locks down who and what can reach a database, with least-privilege roles per app, separate migration credentials, network restrictions, enforced TLS, audit logging and a safe cutover.
category: security
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, dba, devops-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config, schema]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [least-privilege, database-roles, network-access, tls, audit-logging]
pairs_with:
  prompts: [write-row-level-security-policies, rotate-credentials-without-downtime, plan-secrets-management, review-cloud-iam-policy]
  personas: [security-auditor]
args:
  - name: database
    description: Engine and hosting (Postgres on RDS, MySQL on a VM, Cloud SQL, etc.), and every client that connects - apps, workers, migrations, BI tools, people.
    type: text
    required: true
  - name: current_access
    description: How clients connect today, e.g. "all use the master user from one env var, database has a public IP". Leave empty to detect what the repo shows.
    type: text
output_contract:
  format: markdown
  sections: [Access map, Target roles, Grants, Network and TLS, Audit, Cutover, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most production databases are reached with one superuser or owner account shared by the app, the migration tool, background jobs and people running ad-hoc queries. That makes SQL injection fatal (the attacker can drop tables, read every schema, or on Postgres run `COPY ... PROGRAM` as a superuser), makes audit logs useless because everything is the same user, and means rotating the password breaks everything at once. The fix is a role per client with only the grants it needs: the app gets DML on its tables but not DDL, migrations run with a separate owner role only during deploys, read-only roles for analytics point at a replica, and people get personal, logged access through a bastion or IAM authentication. Default privileges matter, or new tables created by migrations are invisible to the app role. Network exposure is the other half: a public IP protected only by a password is routinely brute-forced, and clients that do not verify the server certificate get encryption without protection from impersonation.
</context>

<task>
Harden access to: {{database}}
{{#current_access}}Current state: {{current_access}}{{/current_access}}

1. Read the repo for connection strings, env var names, ORM and migration config, worker and cron definitions, and infrastructure code for the database. Build an access map of every client, the user it connects as, and what it actually does (read, write, DDL).
2. Design target roles: app read-write, app read-only if useful, migration owner, analytics read-only (on a replica if one exists), and personal or break-glass access for people. Use group roles with login roles inheriting from them.
3. Write the grants as a migration or SQL script for the engine, including default privileges for future tables and sequences, revoking `CREATE` on the public schema where relevant, and no superuser for any app role.
4. Network: no public IP or an allowlist only; private networking, security groups or firewall rules limited to the app subnets; bastion or IAM-based access for people.
5. TLS: require TLS on the server and set clients to verify the certificate (`sslmode=verify-full` or the driver equivalent).
6. Audit: enable connection and DDL logging, and statement logging for privileged and personal roles, with a retention period.
7. Plan the cutover: create roles, deploy apps with new credentials one at a time, watch for permission errors, then lock or rotate the old shared account.
8. Test the grants in a local or staging database: the app role can run the app's tests, cannot run DDL, and the read-only role cannot write.
</task>

<constraints>
- Never run grant changes or password changes against production; give scripts for review.
- Never print credentials; refer to them by variable name.
- Do not lock or drop the shared account until every client is confirmed on its new role.
- Note engine and provider differences instead of assuming Postgres syntax works everywhere.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Access map
Table: client, current user, actions needed, network path.
## Target roles
Table: role, used by, privileges, login (yes or no).
## Grants
SQL in a code block.
## Network and TLS
Checklist of changes with exact settings.
## Audit
What is logged, where, and for how long.
## Cutover
Numbered steps with a check and rollback for each.
## Verification
Tests run in staging or locally and actual results.
</output_format>
