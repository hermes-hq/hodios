---
schema: 1
id: design-agent-sandbox
kind: prompt
title: Design a sandbox for coding agents
description: Designs an isolated container or VM for running coding agents with less supervision, covering mounts, network egress allowlist, credentials, resource limits and how work leaves the box.
category: meta
version: 1.0.0
status: incubating
stage: [design, operate]
role: [devops-engineer, security-engineer, software-engineer]
stack: [docker]
requires: [none]
inputs: [text, config]
output: [config, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [coding-agents, sandbox, isolation, least-privilege, devcontainer]
pairs_with:
  prompts: [audit-agent-permissions, write-agent-environment-setup, design-ci-agent-job]
args:
  - name: use
    description: How you want to run the agent (unattended for hours, many in parallel, on untrusted repositories) and what it must be able to do (install packages, run tests, push branches).
    type: text
    required: true
  - name: platform
    description: Host operating system, whether Docker or a VM tool is available, and any existing devcontainer or compose files.
    type: text
output_contract:
  format: markdown
  sections: [Threat summary, Design, Configuration, Daily workflow, Residual risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Approval prompts on every command lead to approval fatigue, and people then switch on "skip all permissions". A sandbox makes reduced supervision tolerable by shrinking what a mistaken or manipulated agent can reach. What matters: mount only the project, never the home directory, SSH keys, cloud credential folders or the container runtime socket (access to the Docker socket is root on the host). Block outbound network by default and allow only the package registries and git host the work needs, through a firewall or proxy. Give it short-lived credentials scoped to one repository and no production access. Work should leave as a pushed branch or a patch a human reviews. A container shares the host kernel, so for untrusted code or hostile repositories a VM is the stronger boundary. Allowed hosts remain an exfiltration path, which the design must admit.
</context>

<task>
Design a sandbox for:
<use>
{{use}}
</use>
{{#platform}}
Platform:
<platform>
{{platform}}
</platform>
{{/platform}}

1. Threat summary: what could go wrong for this use (destructive commands, credential theft, data exfiltration, prompt injection from repository content or web pages, runaway resource use) and which matter most.
2. Choose the boundary (container, devcontainer, VM, remote environment) and say why for this use.
3. Design each layer: filesystem (what is mounted, read-only or read-write, where caches live), network (default deny, the allowlist, how it is enforced), credentials (which, how injected, scope, lifetime), processes and resources (non-root user, CPU, memory, disk, time limits), and lifecycle (fresh per task or long-lived, how to reset).
4. Define how work leaves: push to a branch with a scoped token, or export a patch; never write access to the host repository's default branch.
5. Write the configuration (for example a devcontainer or compose file plus firewall or proxy rules). Mark syntax you are not certain of "check against the tool's documentation".
6. Describe the daily workflow: start, run the agent with its broader permissions inside, review, tear down.
</task>

<constraints>
- Never mount the container runtime socket, the home directory or credential folders into the sandbox.
- Do not call the result secure or escape-proof; state what it does and does not stop.
- Prefer the simplest design that fits the use; do not prescribe a VM fleet for one developer running one agent.
{{> output/uncertainty}}
</constraints>

<output_format>
## Threat summary
Ranked bullets.
## Design
Table: layer, choice, why.
## Configuration
Fenced blocks with file paths.
## Daily workflow
Numbered steps.
## Residual risks
What the sandbox does not stop and the process control for each.
</output_format>
