---
schema: 1
id: write-agent-environment-setup
kind: prompt
title: Write a cloud agent environment setup
description: Writes the setup for a cloud or container coding agent so it can install, build and test the repo unattended, with pinned versions, preinstalled dependencies, no secrets and a smoke check.
category: meta
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, devops-engineer]
stack: [bash, docker]
requires: [repo-read]
inputs: [repo, config, text]
output: [script, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, cloud-agents, reproducible-builds, setup-script]
pairs_with:
  prompts: [write-agents-md, design-agent-sandbox, audit-agent-permissions]
args:
  - name: repo_facts
    description: Languages and versions, package managers, services the tests need (database, cache, browser), and how a new developer sets up today. Or "read the repo".
    type: text
    required: true
  - name: limits
    description: What the agent environment allows, such as base image, network access during the session versus during setup, time limit for setup, and whether containers can run inside it.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Setup script, Environment variables, Smoke check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A cloud coding agent starts each task in a fresh container. When setup is missing or broken, the agent does not stop; it improvises: installs a different runtime version, skips the tests it cannot run and reports the task as done. Many environments allow network access only during setup, so everything the session needs (dependencies, test browsers, code generation output, language servers) must be installed then. Setup must be non-interactive and idempotent, and must not depend on services the container cannot run; a test database may need to be an in-container process or an embedded alternative. Secrets do not belong in the script; anything a test needs should be a fake or a variable set in the environment's settings.
</context>

<task>
Write the environment setup for this repository:
<repo_facts>
{{repo_facts}}
</repo_facts>
{{#limits}}
Environment limits:
<limits>
{{limits}}
</limits>
{{/limits}}

1. Read the repository's own sources of truth (version files, lockfiles, CI configuration, contributor docs) and list every tool and version the build and tests need. Use the CI job as the reference for what "tests pass" means.
2. Write a setup script that installs pinned runtime versions, installs dependencies from the lockfile without updating it, installs test browsers or other binaries the tests download at runtime, runs code generation, and prepares local services the tests need. Use non-interactive flags and make reruns safe.
3. If a service cannot run in the environment, propose the nearest working substitute the tests already support, or list which test groups the agent cannot run and how it should report that.
4. List the environment variables the session needs, with fake or test values only, and say where to set real ones if any are unavoidable.
5. End the script with a smoke check: one fast build or test command whose failure makes setup fail loudly.
6. Write a short block for the repository's instruction file telling the agent which commands to run and which test groups are unavailable in this environment.
</task>

<constraints>
- Never put tokens, passwords or private registry credentials in the script.
- Do not pipe a script downloaded from the network into a shell; use the platform's package manager or a pinned, checksummed release.
- Do not add or upgrade dependencies; install exactly what the lockfile says.
- Mark every command you inferred rather than found in the repository.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Base image, network model and anything inferred.
## Setup script
One fenced `bash` block, commented by section.
## Environment variables
Table: name, purpose, value to use (fake or where to set it).
## Smoke check
The command and what it proves, plus the instruction-file block.
## Gaps
Tests or tools that cannot run here and how the agent should report them.
</output_format>
