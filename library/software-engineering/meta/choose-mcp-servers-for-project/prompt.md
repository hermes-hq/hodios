---
schema: 1
id: choose-mcp-servers-for-project
kind: prompt
title: Choose MCP servers for a project
description: Picks which MCP servers a coding agent should connect for a project, with scope, read-only modes, credential handling, trust checks and the context cost of each server's tool list.
category: meta
version: 1.0.0
status: incubating
stage: [plan, design]
role: [software-engineer, tech-lead, security-engineer]
stack: [mcp]
requires: [none]
inputs: [text, config]
output: [plan, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, tool-selection, prompt-injection, least-privilege]
pairs_with:
  prompts: [audit-agent-permissions, build-mcp-server, cut-coding-agent-spend]
args:
  - name: needs
    description: What the agent needs to reach while working on this project (issue tracker, database, docs, browser, cloud console, design files) and for which tasks.
    type: text
    required: true
  - name: candidates
    description: Servers you are considering or already have configured, with where they come from.
    type: text
output_contract:
  format: markdown
  sections: [Decision table, Configuration, Trust checks, Not recommended, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every connected MCP server adds its tool definitions to the agent's context on every request, and dozens of overlapping tools make the agent pick the wrong one. A local server runs as code on the developer's machine with their credentials; a remote one sees whatever the agent sends it. Tool descriptions and tool results are untrusted text that can carry instructions, and a third-party server can change its tools after you approved it. Write tools (create issue, run query, merge) are external effects. Often the agent's shell plus an existing CLI the developer already trusts does the job with no new server at all. A config committed to the repository is shared with everyone who clones it, so it must reference secrets by environment variable, never contain them.
</context>

<task>
Choose servers for these needs:
<needs>
{{needs}}
</needs>
{{#candidates}}
Candidates:
<candidates>
{{candidates}}
</candidates>
{{/candidates}}

1. For each need, decide among: an MCP server, an existing CLI through the shell, a file the agent reads (exported docs, a schema dump), or nothing. Prefer the option with the fewest new permissions that still does the task.
2. For each server kept: where it comes from (the service's own vendor, a known open-source project, unknown), local or remote, read-only mode available or not, which tools to enable, and the credential it needs with the narrowest scope (read-only database user against a non-production copy, a token limited to one project).
3. Decide the scope: project-level (shared, committed, no secrets) or user-level (personal tokens), and per-task enabling for heavy servers used rarely.
4. Estimate context cost as the number of tools each adds, and flag overlapping tools between servers.
5. Write the configuration in the agent's MCP config format, with secrets as environment variable references and versions pinned where the launcher allows. Mark keys you are unsure of "check against the tool's documentation".
6. List trust checks before first use: read the source or vendor page, pin the version, review the tool list for unexpected write tools, and re-check on update.
</task>

<constraints>
- Do not invent server names, packages or features. If you are not sure an official server exists for a service, say "check whether the vendor publishes one".
- Never put a token, password or connection string with credentials in the configuration.
- Production databases and accounts get read-only access at most, and only if the user confirms the need.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision table
Need, choice (server, CLI, file, none), source, access level, credential scope, tools added.
## Configuration
One fenced block, then the environment variables each person must set.
## Trust checks
Checklist before first use and on each update.
## Not recommended
Candidates rejected and why.
## Questions
What would change the choice, or "None".
</output_format>
