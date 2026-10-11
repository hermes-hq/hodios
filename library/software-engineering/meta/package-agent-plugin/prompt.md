---
schema: 1
id: package-agent-plugin
kind: prompt
title: Package an agent plugin
description: Packages a team's agent commands, skills, subagents, hooks and MCP config into a versioned plugin with a manifest, a marketplace entry, a security note and an install test.
category: meta
version: 1.0.0
status: incubating
stage: [build, ship]
role: [tech-lead, software-engineer, devops-engineer]
requires: [none]
inputs: [file, config, text]
output: [config, docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [coding-agents, agent-plugins, distribution, versioning, team-setup]
pairs_with:
  prompts: [write-agent-skill, write-agent-custom-command, design-coding-agent-hooks, define-specialist-subagent]
args:
  - name: components
    description: The commands, skills, subagents, hooks and MCP server entries to bundle, with their current files or a list of paths and what each does.
    type: text
    required: true
  - name: audience
    description: Who installs it (your team, the whole company, the public), which agent, and how they will get it (a git repository marketplace, an internal registry).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Bundle plan, Layout, Manifest, Marketplace entry, Security note, Release and test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A plugin bundles agent extensions so a team installs them in one step and gets updates by version instead of copying files around. The parts that go wrong are predictable. Paths hard-coded to one person's machine break for everyone else, so scripts must refer to the plugin's own root through whatever variable the agent provides. Command and skill names collide with other plugins unless they are namespaced. Hooks and MCP servers run code on every installer's machine, so they are the security-sensitive part and must be listed openly. Secrets never ship in the bundle; MCP entries reference environment variables the user sets. A marketplace is usually just a catalog file in a git repository that lists plugins and where to fetch them; version numbers in it are how users know an update changed something. Bundles that mix unrelated things become hard to adopt; one plugin per purpose is easier to trust.
</context>

<task>
Plan and write the plugin package.
<components>
{{components}}
</components>
<audience>
{{audience}}
</audience>

1. Bundle plan: group the components into one or more plugins by purpose. Drop anything personal or project-specific that would not make sense for the audience, and say why.
2. Layout: the directory tree with each component in the location the agent expects. Mark the exact directory names "check against the tool's documentation" if you are not sure for this agent.
3. Make every component portable: replace absolute paths with the plugin-root variable, replace secrets with environment variable references, namespace command and skill names, pin MCP server package versions.
4. Manifest: write it with name, version (start at 1.0.0 or bump by semantic versioning), description, author as a team name, and the component list.
5. Marketplace entry: the catalog entry pointing at the plugin source, plus how users add the marketplace and install.
6. Security note: list every hook and MCP server, what it executes or connects to, and what permissions it needs, so an installer can review it in one minute.
7. Release and test: a clean-machine install test (new user, no local files), a check that each command and skill loads and each hook fires once, a changelog line, and the rule for bumping major, minor and patch.
</task>

<constraints>
- Never include tokens, personal paths, emails or internal URLs in the bundle.
- Do not add hooks or MCP servers that were not in the components list.
- If the target agent does not support plugins, say so and propose the closest alternative (a shared config repository with an install script the user reads first).
{{> output/uncertainty}}
</constraints>

<output_format>
## Bundle plan
Plugins with their components, and what was left out.
## Layout
Directory tree in a fenced block.
## Manifest
Fenced block.
## Marketplace entry
Fenced block and the install steps.
## Security note
Table: component, runs or connects to, permissions, why it is needed.
## Release and test
Numbered checks and the versioning rule.
</output_format>
