---
schema: 1
id: guard-against-hallucinated-packages
kind: prompt
title: Guard against hallucinated packages
description: Stops coding agents from installing hallucinated or typosquatted packages, using instruction rules, install approval, registry controls, lockfile review in CI and install script limits.
category: meta
version: 1.0.0
status: incubating
stage: [design, operate]
role: [security-engineer, devops-engineer, tech-lead]
requires: [none]
inputs: [config, text]
output: [config, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, slopsquatting, typosquatting, dependency-security, package-managers]
pairs_with:
  prompts: [vet-dependency, audit-agent-permissions, design-coding-agent-hooks]
  rules: [dependency-hygiene-rules]
args:
  - name: ecosystems
    description: The package managers in use (npm, pnpm, pip, uv, cargo, go modules, others), any internal registry or proxy, and the CI system.
    type: text
    required: true
  - name: agent_config
    description: How agents run today and their current permissions for install commands. Redact secrets.
    type: text
output_contract:
  format: markdown
  sections: [Threat, Controls, Config, CI check, Agent rules, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Models sometimes suggest package names that do not exist but sound right. Attackers watch for these names and register them with malicious code, a pattern called slopsquatting; classic typosquats (one letter off a popular name) work the same way. An agent with shell access runs the install immediately, and in many ecosystems installing alone runs code through install scripts, before anyone reads the diff. Defences work in layers: tell the agent not to add dependencies without asking and to check that a package exists, is the one intended and is maintained; require approval for install commands; route installs through a registry proxy or allowlist where the organisation has one; disable or restrict install scripts where the ecosystem allows; and flag every new dependency in the lockfile diff in CI so a human sees it before merge. No single control is enough, because instructions can be ignored and allowlists are often bypassed with direct URLs.
</context>

<task>
Design guards for these ecosystems.
<ecosystems>
{{ecosystems}}
</ecosystems>
{{#agent_config}}
<agent_config>
{{agent_config}}
</agent_config>
{{/agent_config}}

1. Threat: in two or three lines, how a hallucinated or typosquatted package would get in for this setup, and where code would first run.
2. Controls: list controls by layer (agent instructions, agent permissions, package manager settings, registry, CI, review), each with what it stops and what it misses.
3. Config: the concrete settings for each ecosystem named: requiring approval for install and add commands in the agent's permissions, package manager options that limit install scripts or enforce the lockfile in CI, registry or proxy settings if one exists. Mark exact option names you are not sure of with "check against the tool's documentation".
4. CI check: a job that lists dependencies added or changed in the lockfile diff and fails or requests review for new ones, using tools the CI already has where possible.
5. Agent rules: lines for the agent instruction file covering asking before adding a dependency, preferring the standard library and existing dependencies, verifying the exact name and publisher in the registry before proposing, and never installing from URLs or unpinned git refs.
6. Gaps: what remains (a real but malicious package the human approves, transitive dependencies) and the process control for it.
</task>

<constraints>
- Do not name specific commercial products as required; describe the capability and let the user pick.
- Do not recommend disabling lockfiles or verification to make installs pass.
{{> output/uncertainty}}
</constraints>

<output_format>
## Threat
Short paragraph.
## Controls
Table: layer, control, stops, misses.
## Config
One fenced block per ecosystem.
## CI check
Fenced job definition and what it reports.
## Agent rules
Fenced block.
## Gaps
Bullets.
</output_format>
