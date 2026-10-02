---
schema: 1
id: build-mcp-server
kind: prompt
title: Build an MCP server
description: Implements a Model Context Protocol server exposing the given tools and resources, with input validation, least privilege and error messages a model can act on. Use to connect a system to AI clients.
category: ai-ml
version: 1.0.0
status: experimental
stage: [build]
role: [software-engineer, backend-engineer, ml-engineer]
stack: [mcp]
requires: [file-write]
inputs: [spec, text]
output: [code, tests, docs]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [tool-use, least-privilege, input-validation]
pairs_with:
  prompts: [design-tool-schema]
args:
  - name: tools_spec
    description: The tools and resources to expose, what each does, the system it talks to (files, database, API) and the credentials it may use.
    type: text
    required: true
  - name: language
    description: Implementation language, using that language's official MCP SDK.
    type: enum
    enum: [typescript, python]
    default: typescript
  - name: transport
    description: stdio for a local server launched by the client; http for a server reached over the network (Streamable HTTP).
    type: enum
    enum: [stdio, http]
    default: stdio
output_contract:
  format: markdown
  sections: [Plan, Files, Run and test, Security notes, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An MCP server lets any MCP client (coding agents, chat apps, IDEs) call your tools and read your resources. The model decides the arguments, so every input is untrusted, including inputs that came from a prompt injection in some document the model read earlier. Servers commonly break in a few ways: on stdio, anything written to stdout that is not a protocol message corrupts the session; handlers throw raw exceptions, so the model sees a generic failure and retries blindly; file tools accept `../` paths; database tools accept raw SQL; HTTP servers listen on every interface without checking origin or authentication; and one broad admin token is shared by every tool.
</context>

<task>
Implement an MCP server in {{language}} over {{transport}} for:
{{tools_spec}}

1. Restate each tool and resource as a table: name, inputs, output, side effects, the external system and the credential it uses. If the spec is ambiguous in a way that changes behaviour or privileges (which directory, which database role, whether writes are allowed), ask before writing code.
2. Use the official MCP SDK for {{language}} at its current major version. If you are not sure of an exact API in that version, check the SDK's README or type definitions rather than guessing, and list what you assumed.
3. For every tool:
   - declare the input schema with types, enums, bounds and descriptions written for the model;
   - set the tool annotations honestly (read-only, destructive, idempotent, open-world);
   - validate beyond the schema in the handler: resolve paths and reject anything outside the allowed root, use parameterised queries, check identifiers against allowlists, and cap sizes and counts;
   - return results as concise text or structured content, truncating large outputs and saying how to get the rest;
   - on failure, return a tool result marked as an error, with a message that tells the model what to change, for example "path must be inside notes/; got ../etc/passwd". Never return stack traces, secrets or internal hostnames.
4. Expose resources with stable URIs if the spec includes read-only data.
5. Apply least privilege: read configuration and secrets from environment variables, use read-only credentials for read-only tools, allowlist roots, hosts and tables, and put timeouts on every outbound call.
6. Transport. stdio: write logs to stderr only. http: use Streamable HTTP, bind to 127.0.0.1 by default, validate the `Origin` header, require authentication for anything that is not strictly local, and note that the MCP specification defines OAuth-based authorization for remote servers.
7. Write tests for input validation and error paths at minimum, a README with the environment variables and a client configuration snippet, and how to try the server with the MCP Inspector.
8. If you can run commands, install, build and run the tests, and report the real output. If you cannot, say that nothing was run.
</task>

<constraints>
- Implement only the tools and resources in the spec. Suggest extra ones in one line under Assumptions.
- No shell execution with interpolated input. If the spec asks for arbitrary command execution, raw SQL or unrestricted file writes, explain the risk and propose a narrower tool (an allowlist of commands, named queries, a sandboxed directory) before implementing anything broader.
- Pin the SDK's major version in the manifest.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Plan
The tools and resources table, with the privilege each one needs.

## Files
Each file in its own fenced block, preceded by its path.

## Run and test
Commands to install, build, test and connect a client, plus the real test output or "Not run".

## Security notes
What each tool can reach, what the validation blocks, and the remaining risks.

## Assumptions
SDK details, spec interpretations and suggested additions.
</output_format>
