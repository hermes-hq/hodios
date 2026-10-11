---
schema: 1
id: diagnose-agent-environment-failure
kind: prompt
title: Diagnose a failing agent environment
description: Diagnoses why a cloud or container coding agent cannot install, build or test the repo, from network egress, proxies and certificates to missing tools, secrets, architecture and limits.
category: meta
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [devops-engineer, software-engineer]
requires: [none]
inputs: [logs, config, text]
output: [checklist, config, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, cloud-agents, container-builds, network-egress, build-failures]
pairs_with:
  prompts: [write-agent-environment-setup, design-agent-sandbox, debug-mcp-server-connection]
args:
  - name: failure
    description: The failing step and the full error output (install, build, test, git fetch), redacted of secrets.
    type: text
    required: true
  - name: environment
    description: Where the agent runs (hosted cloud agent, your container, CI runner), the base image or setup script, network rules or proxy, and how secrets are provided.
    type: text
output_contract:
  format: markdown
  sections: [Category, Evidence, Checks, Fix, Prevent]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A repository that builds on a laptop often fails inside an agent's cloud or container environment for reasons unrelated to the code. Network: egress is limited to an allowlist, so a registry, a binary download in a postinstall script, a git submodule host or a telemetry call is blocked. Proxy: traffic goes through an HTTPS proxy with its own certificate, and each runtime has its own trust store (Node, Python requests, Java, curl and git can each need separate configuration), so one tool works while another fails with certificate errors. Credentials: private registries, submodules over SSH and cloud SDKs need tokens that are not present, often deliberately. Tooling: a missing system library, compiler or browser binary; a different language version from the one pinned. Platform: arm64 versus x86 binaries, no Docker daemon inside the container, read-only or small disks, memory limits killing the build, short timeouts. Reading the first real error, not the last line, usually identifies the category.
</context>

<task>
Diagnose this environment failure.
<failure>
{{failure}}
</failure>
{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. Find the first meaningful error in the output and quote it. Ignore follow-on errors it caused.
2. Category: network or egress, proxy or certificate, missing credential, missing tool or library, version mismatch, platform or architecture, resource limit, or repository bug. Give the evidence.
3. Checks: commands or settings to confirm the category, cheapest first (which host is contacted, whether it is allowed, which trust store the failing tool reads, the tool version, architecture, free disk and memory).
4. Fix: the change to the setup script, image or allowlist that removes the cause: add the host to the allowlist, point the specific runtime at the proxy's CA bundle through its own setting, provide a scoped read-only token through the platform's secret mechanism, preinstall the tool, pin the version, or vendor the asset. Mark exact setting names you are unsure of with "check against the documentation".
5. Prevent: a smoke check in the setup that fails early and clearly next time.
6. If the output is insufficient, ask for the specific missing log or command output and stop.
</task>

<constraints>
- Never recommend disabling TLS verification, unsetting the proxy, or giving the agent broad credentials as a fix.
- Never ask for secret values.
{{> output/uncertainty}}
</constraints>

<output_format>
## Category
One line.
## Evidence
The quoted first error and what it shows.
## Checks
Numbered commands or settings, with what each result means.
## Fix
Fenced setup changes, then what changed.
## Prevent
The smoke check.
</output_format>
