---
schema: 1
id: design-tool-schema
kind: prompt
title: Design tool definitions for an LLM agent
description: Designs tool or function definitions for an LLM agent, with names, descriptions, JSON Schema parameters and error returns that models call reliably. Use when exposing an API or capability to an agent.
category: ai-ml
version: 1.0.0
status: experimental
stage: [design]
role: [ml-engineer, backend-engineer, software-engineer]
stack: [llm-apps]
requires: [none]
inputs: [spec, schema, text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [function-calling, tool-use, json-schema]
pairs_with:
  prompts: [build-mcp-server, write-llm-eval-suite]
args:
  - name: capabilities
    description: What the agent must be able to do, in user terms, including actions that change data or cost money.
    type: text
    required: true
  - name: existing_api
    description: The API, SDK or database the tools will wrap, such as an OpenAPI spec, endpoint list or function signatures.
    type: text
  - name: target
    description: Where the definitions will be used. It decides the wrapper key for the schema (input_schema, parameters or inputSchema) and whether strict schema rules apply.
    type: enum
    enum: [any, anthropic, openai, gemini, mcp]
    default: any
output_contract:
  format: markdown
  sections: [Tool set, Definitions, Error catalogue, Selection tests, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A model decides which tool to call, and with what arguments, from the tool's name, description and parameter schema alone. Agents misbehave when tools overlap so the model guesses between them, when one tool per REST endpoint forces long brittle call chains, when parameters are free-form strings the model has to invent a format for, when results are huge raw payloads, and when errors are bare status codes that give the model nothing to correct. Tools are an interface for a reader that is literal and cannot ask questions, so they need more explanation than an API for humans, not less.
</context>

<task>
Design the tools for these capabilities, for target {{target}}:
{{capabilities}}
{{#existing_api}}

Existing API to wrap:
{{existing_api}}
{{/existing_api}}

1. List the user goals the agent must reach. Map them to the smallest set of tools with distinct, non-overlapping purposes. Combine steps that are always done together into one tool, and do not mirror the existing API one to one; say which endpoints each tool combines.
2. For each tool write:
   - a `verb_noun` name in snake_case, with a shared prefix when tools belong to one service;
   - a description of three to six sentences: what it does, when to use it, when not to use it and which tool to use instead, what it returns, and any side effects;
   - an input JSON Schema: `type: object`, a description on every property, enums for closed sets, explicit formats in the description (dates as ISO 8601, amounts in minor units), sensible defaults, a minimal `required` list and `additionalProperties: false`;
   - the output shape: only fields the model needs next, stable ids it can pass to other tools, and truncation or pagination for large results with a note telling the model how to get more;
   - side effects: read-only, idempotent, or destructive. Destructive or costly tools take an explicit confirmation or `dry_run` parameter and say so in the description.
3. Define the errors each tool can return. Every error message tells the model what went wrong and what to do next, for example "No customer matches 'Jon Smiht'. Call search_customers with a partial name."
4. Write 6 to 10 selection tests: a user request and the expected tool call with arguments, including near misses where no tool or a different tool should be used.
5. If a capability is too vague to define a safe tool, ask about it instead of guessing.
</task>

<constraints>
- Use a portable JSON Schema subset: `type`, `properties`, `required`, `enum`, `items`, `description`, `default`, `minimum`, `maximum`, `maxLength`. Avoid `$ref`, top-level `oneOf` or `anyOf`, and conditional schemas, which some providers reject.
- If the target enforces strict schemas (for example OpenAI's strict function calling), list every property in `required` and express optional ones as nullable, and say that you did. For `any`, say what changes per target.
- Never put credentials, tenant ids or authorisation decisions in parameters. The host application supplies identity and enforces permissions.
- Keep the set under about 15 tools unless the capabilities truly need more, and say why if they do.
- Do not invent endpoints or fields of the existing API. Mark anything you assumed.
</constraints>

<output_format>
## Tool set
Table: name | purpose | side effects | wraps.

## Definitions
One fenced JSON array of tool objects with `name`, `description` and the schema under the target's key: `input_schema` (anthropic, and for `any`), `parameters` (openai, gemini) or `inputSchema` (mcp). Follow it with each tool's output shape.

## Error catalogue
Table: tool | condition | message returned to the model.

## Selection tests
Numbered: user request, then the expected call or "no tool".

## Notes
Assumptions and open questions.
</output_format>
