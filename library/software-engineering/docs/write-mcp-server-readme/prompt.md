---
schema: 1
id: write-mcp-server-readme
kind: prompt
title: Write an MCP server README
description: Writes the README for a Model Context Protocol server, with its tool and resource catalogue, install snippets for each client, required credentials, permissions and safety notes.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [software-engineer, developer-advocate, maintainer]
stack: [mcp]
requires: [repo-read, file-write]
inputs: [repo, file]
output: [docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [mcp-tools, client-config, ai-integration, readme]
pairs_with:
  prompts: [build-mcp-server, write-readme]
args:
  - name: server_path
    description: Path to the MCP server code, or a description of it if the code is not in the repo.
    type: string
    default: the repository root
  - name: clients
    description: MCP clients to give configuration for.
    type: string
    default: Claude Desktop, Claude Code, Cursor and VS Code
output_contract:
  format: markdown
  sections: [README written, Tools documented, Safety notes, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People evaluating an MCP server want to know in a minute what it lets the model do, what access it needs, and how to add it to their client. A good MCP README lists every tool with what it does, whether it reads or writes, and its key arguments, because users approve tool calls based on that. Install snippets fail in predictable ways: the wrong config file location, the wrong top-level key for that client, a command that only works when the package is installed globally, missing `env` entries for credentials, and Windows needing `cmd /c` or a full path for `npx`. Transport matters too (stdio versus streamable HTTP) and changes the snippet. Users also need to know the blast radius: which scopes the token needs, whether a tool can delete or send things, and what data leaves their machine.
</context>

<task>
Write or rewrite the README for the MCP server at `{{server_path}}`.

Clients to cover: {{clients}}.

1. Read the server code: transport(s), the launch command and package name, every registered tool, resource and prompt with its input schema, required environment variables and config, and what each tool reads or changes.
2. Write a one-paragraph summary: what system it connects to and what a model can do with it.
3. Write the tools table: name, what it does, read or write, key arguments. Add resources and prompts if registered.
4. Write "Requirements": runtime version, account, and the credentials with the minimum scopes each tool needs and how to create them.
5. Write install snippets for each client using the real command, args and env names, noting the client's config file or command and its top-level key. Mark config locations you are unsure of "to confirm" and point to the client's docs.
6. Write "Safety": which tools write, delete or send, recommended read-only setup, what data is sent where, and advice to review tool calls before approving.
7. Add local development (run, inspect with an MCP inspector if the project uses one, test), troubleshooting (server not appearing, auth errors, Windows `npx`), and license.
8. Run the server's start or build command if available and confirm the tool list matches what the code registers.
</task>

<constraints>
- The tools table must match the registered tools exactly; do not document planned tools.
- Use placeholders for tokens and never show a real-looking secret.
- Do not claim the server is safe or sandboxed beyond what the code enforces.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the README. Then reply with:
## README written
Path and sections.
## Tools documented
Each tool with read or write, as in the README.
## Safety notes
Write and destructive tools and minimum scopes.
## Questions for the owners
Facts to confirm (client config locations, scopes, data handling).
</output_format>
