---
schema: 1
id: set-up-agent-dev-database
kind: prompt
title: Set up an isolated database for agents
description: Gives coding agents an isolated, seeded database per session or worktree so they can run migrations and data tests without touching shared or production databases.
category: meta
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, devops-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [config, code, docs]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, test-database, seed-data, isolation, worktrees]
pairs_with:
  prompts: [write-agent-environment-setup, plan-parallel-agent-worktrees, design-agent-sandbox]
args:
  - name: database
    description: The database engine and version, how developers run it locally today, and how migrations and seeds work.
    type: text
    required: true
  - name: agent_setup
    description: How agents run (local sessions, several worktrees in parallel, cloud containers) and what went wrong so far.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Files added, Guard, Trial run, Instructions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An agent that changes data code needs a database to prove the change: run the migration, run the query, run the integration test. If that database is shared, parallel agents corrupt each other's state, a migration half-applies for everyone, and one wrong connection string can reach staging or production. Isolation options, cheapest first: a file database copied per session (SQLite); a separate database per worktree on one local server, created quickly from a template database that already has migrations and seeds applied (PostgreSQL supports creating a database from a template); a container per worktree with a unique name and port; or a branching feature from a managed provider. Seed data must be synthetic and small, never a copy of production. A guard that refuses to run when the connection string points anywhere but the local isolated database is the most valuable single line.
</context>

<task>
Give agents an isolated database in this repository.
<database>
{{database}}
</database>
{{#agent_setup}}
<agent_setup>
{{agent_setup}}
</agent_setup>
{{/agent_setup}}

1. Read the repository's database config, migration tooling, seed scripts, test setup and any compose files. List how the connection string is chosen today.
2. Pick the approach from the options above that fits the engine and the agent setup, with the reason. Prefer what the repository already uses.
3. Implement it with existing tools: a script or task that creates the isolated database (named after the worktree or session), applies migrations and synthetic seeds, prints the connection string, and one that tears it down.
4. Add a guard in the test or dev setup that refuses to run if the connection host is not local or the database name does not match the isolated pattern.
5. Run the create, migrate, seed, a single data test, and teardown once. Report times and results.
6. Add short instructions to the agent instruction file: how to get a database, the rule never to change the connection string to another host, and how to reset.
</task>

<constraints>
- Never copy production or customer data into seeds.
- Do not drop or reset any database the script did not create; label teardown steps as destructive and scope them to the isolated name pattern.
- Do not add new services or dependencies without saying so.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
The chosen option and why, in a few lines.
## Files added
Paths and contents in fenced blocks.
## Guard
Where it is and what it checks.
## Trial run
Commands run, time, result.
## Instructions
The lines added to the instruction file.
</output_format>
