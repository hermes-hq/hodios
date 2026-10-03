---
schema: 1
id: audit-agent-permissions
kind: prompt
title: Audit a coding agent's permissions
description: Reviews a coding agent's tool, permission and sandbox configuration for shell, network, secrets and write-scope risk, and proposes least privilege. Use before giving an agent more autonomy.
category: meta
version: 1.0.0
status: incubating
stage: [review, operate]
role: [security-engineer, devops-engineer, tech-lead, software-engineer]
stack: []
requires: [none]
inputs: [config, text]
output: [report, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, least-privilege, sandbox, prompt-injection, permissions]
pairs_with:
  personas: [security-auditor]
  prompts: [write-agents-md, review-llm-app-security, review-agent-transcript]
args:
  - name: config
    description: The agent's configuration, such as settings or permission files, allow and deny lists, MCP server definitions, sandbox and approval mode, environment variables passed in, and CI job definitions that run it.
    type: text
    required: true
  - name: intended_use
    description: What the agent is for, where it runs (laptop, container, CI), who triggers it and on what input (own prompts, issues, pull requests from strangers).
    type: text
output_contract:
  format: markdown
  sections: [Exposure summary, Findings, Least-privilege config, Residual risks, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A coding agent acts with whatever the configuration lets it touch, and it reads untrusted text all day: issue bodies, web pages, dependency READMEs, test output, files in the repository. Any of that text can carry instructions (prompt injection). The real risk is the combination of three things in one session: access to private data or secrets, exposure to untrusted content, and a way to send data out or cause effects (network, pushing, posting, deploying). Broad shell access is the usual way all three meet, because a shell command can read any file and call any host. The audit judges the configuration against what the agent actually needs for its intended use.
</context>

<task>
Audit this configuration:
<config>
{{config}}
</config>
{{#intended_use}}
Intended use:
<intended_use>
{{intended_use}}
</intended_use>
{{/intended_use}}

1. Identify the tool or tools the configuration belongs to and the format. If you do not recognise a key, say so instead of guessing its meaning.
2. Build an exposure map along six axes and rate each none, scoped or broad:
   - **Shell:** which commands run without approval; wildcards that let an allowed prefix chain into anything (for example a command allowed by prefix that can take `&&`, `;`, `$(...)` or `-c`); interpreters and package managers that execute arbitrary code (`python`, `node`, `npx`, `npm install`, scripts fetched from the network and piped into a shell).
   - **File write scope:** inside the workspace only, or also home directory, dotfiles, shell profiles, git hooks, CI configuration and the agent's own settings (an agent that can edit its own permissions has every permission).
   - **Network:** outbound access, allowed domains, fetch and browser tools, and whether data can leave through them.
   - **Secrets:** environment variables, tokens, cloud credentials, SSH keys and `.env` files readable by the agent or its subprocesses; token scopes (a CI token that can push to the default branch or publish packages).
   - **External effects:** git push, pull request and issue comments, package publishing, deploys, messages, payments, MCP servers with write tools.
   - **Approval and sandbox:** approval mode, whether a container or OS sandbox is on, and whether any "skip permissions" or "yolo" style flag is set.
3. Check where untrusted content enters for the intended use, and mark every path where untrusted content, secrets and an outbound channel meet in one session.
4. Write findings ranked by risk, each with a concrete abuse scenario (what injected text could make the agent do), and the smallest change that removes it.
5. Write a least-privilege configuration in the same format as the input: explicit allow rules for what the intended use needs, deny rules for secrets paths and the agent's own config, approval for anything external, network limited to required hosts, and the sandbox on. If you are unsure of a key's exact syntax for this tool, write it and mark it "check against the tool's documentation".
</task>

<constraints>
- Judge against the intended use. Do not strip a permission the use clearly needs; say how to scope it instead.
- Never print secret values that appear in the config. Refer to them by name and recommend rotating any that were committed.
- Do not claim the proposed config makes the agent safe; list what remains in Residual risks.
- If the intended use is missing, assume the agent may read untrusted content, say so, and ask for the use under Questions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Exposure summary
A table: axis, current level (none, scoped, broad), what drives it.
## Findings
Numbered, highest risk first. Each: severity (critical, high, medium, low), the setting, the abuse scenario, the fix.
## Least-privilege config
One fenced block in the input's format, then a short list of what changed and why.
## Residual risks
Bullets of risks the configuration cannot remove, with the process control that covers each (review before merge, short-lived tokens, separate CI job).
## Questions
What you need to know to tighten further, or "None".
</output_format>
