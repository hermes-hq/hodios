---
schema: 1
id: debug-mcp-server-connection
kind: prompt
title: Debug an MCP server connection
description: Diagnoses why a coding agent cannot connect to or use an MCP server, from config location, stdio or HTTP transport and env vars to auth, timeouts and logs.
category: meta
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [software-engineer, devops-engineer]
stack: [mcp]
requires: [none]
inputs: [config, logs, text]
output: [checklist, config, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [coding-agents, mcp-servers, connection-errors, agent-config]
pairs_with:
  prompts: [choose-mcp-servers-for-project, audit-agent-permissions, write-agent-environment-setup]
args:
  - name: symptom
    description: What happens, such as the server shows as failed or disconnected, it connects but no tools appear, or tools error when called. Include the exact error text.
    type: text
    required: true
  - name: config
    description: The MCP server entry from the agent's config (redact tokens), which agent and OS you use, and how you start the agent (terminal, IDE, desktop app).
    type: text
    required: true
  - name: logs
    description: Any agent or server log lines around the failure, and what happens when you run the server command by hand.
    type: text
output_contract:
  format: markdown
  sections: [Likely causes, Checks, Fix, If still broken]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most MCP failures are not bugs in the server. They fall into a few layers, and checking them in order saves hours. **Config:** the file is in the wrong place or scope (project, user, local), has a JSON or TOML syntax error, or the agent was not restarted after the edit. **Launch (stdio servers):** the agent starts the server as a child process with its own PATH and working directory, which often differ from your shell's; version managers (nvm, asdf, pyenv) and GUI-launched apps are the usual cause of "command not found". Relative paths resolve from an unexpected directory, environment variables in the config may not be expanded, and on Windows `npx` often needs a `cmd /c` wrapper. A stdio server must write only protocol messages to stdout; one stray `print` or log line on stdout corrupts the stream, so logs must go to stderr. A first `npx` or `uvx` run that downloads packages can exceed the startup timeout. **Transport (remote servers):** wrong URL path, a streamable HTTP versus older SSE mismatch, missing headers, an OAuth flow that never completed, a corporate proxy or TLS inspection. **Use:** the server connects but tools are hidden by permission rules, name collisions, a tool limit or a disabled toggle.
</context>

<task>
Diagnose this MCP problem.
<symptom>
{{symptom}}
</symptom>
<config>
{{config}}
</config>
{{#logs}}
<logs>
{{logs}}
</logs>
{{/logs}}

1. Classify the failure by layer (config, launch, transport, auth, use) from the symptom and logs. Say which evidence points there.
2. Read the config entry line by line: transport type, command and arguments, absolute or relative paths, environment variables and how they are referenced, URL and headers. Flag anything that would differ between the user's shell and the agent's child process.
3. List checks in order of cheapest first, each with what it rules in or out: validate the file syntax, confirm which config file and scope the agent actually loads, run the exact command by hand from a neutral directory, check that nothing but protocol messages reaches stdout, test the server alone with an MCP inspector tool, check the agent's MCP status or debug output.
4. Give the most likely fix as a corrected config entry, using absolute paths and explicit environment values where that removes ambiguity. Mark any key whose exact name for this agent you are not sure of with "check against the tool's documentation".
5. If the evidence is not enough to decide, stop after step 3 and ask for the one output that would settle it.
</task>

<constraints>
- Never ask the user to paste tokens or secrets. If they appear in the input, refer to them by name and recommend rotating them.
- Do not suggest disabling TLS verification or running the agent with all permissions bypassed as a fix.
- Do not invent agent-specific flags or file paths. If unsure, say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Likely causes
Ranked list, each with the layer and the evidence.
## Checks
Numbered checks with the command or action and what each result means.
## Fix
The corrected config in one fenced block, then what changed.
## If still broken
The next two things to collect and where to find them.
</output_format>
