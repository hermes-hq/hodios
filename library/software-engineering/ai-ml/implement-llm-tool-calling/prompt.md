---
schema: 1
id: implement-llm-tool-calling
kind: prompt
title: Implement LLM tool calling
description: Implements tool calling in an LLM feature with tool schemas, a dispatch loop, argument validation, timeouts, limits and safe error handling. Use when wiring a model to functions or APIs.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, ml-engineer, software-engineer, fullstack-engineer]
stack: [llm-apps]
requires: [repo-read, file-write]
inputs: [text, spec, repo]
output: [code, tests]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [function-calling, tool-use, agent-loop, json-schema, prompt-injection]
pairs_with:
  personas: [ml-engineer]
  prompts: [design-tool-schema, review-llm-app-security, write-llm-eval-suite, build-mcp-server]
args:
  - name: tools_needed
    description: What the model must be able to do (for example look up an order, issue a refund), which existing functions or APIs back each action, and which actions change data or cost money.
    type: text
    required: true
  - name: stack
    description: Language, framework and model provider SDK in use, for example "TypeScript, Next.js, OpenAI SDK" or "Python, FastAPI, Anthropic SDK".
    type: string
output_contract:
  format: markdown
  sections: [Design, Code, Tests, Operational notes, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tool calling is a loop: send messages and tool definitions, the model returns zero or more tool calls, the application validates and runs them, appends the results with the matching call ids, and calls the model again until it answers or a limit is hit. Production failures come from the parts around the loop: no iteration cap, arguments trusted without validation, a tool that hangs, an exception that kills the request instead of being returned to the model, parallel calls whose results are appended in the wrong shape, and write actions triggered by text the model read from an untrusted document. Provider SDKs differ in field names and message shapes, so code must follow the SDK actually in use.
</context>

<task>
Implement tool calling for:
<tools_needed>
{{tools_needed}}
</tools_needed>
{{#stack}}
Stack: {{stack}}
{{/stack}}

1. If the language or provider SDK is unknown, ask once and stop. If you can read the repository, find the existing LLM client, config and the functions the tools will wrap, and reuse them.
2. **Tool definitions.** One tool per user-level action, not per endpoint. Clear names, descriptions that say when to use and when not to use each tool, and JSON Schema parameters with types, enums, formats and required fields. Use the provider's strict or structured mode for tool arguments where it exists.
3. **Dispatch loop.** Write it with:
   - a registry mapping tool name to handler and schema;
   - validation of every argument against the schema (a schema validation library for the language) before the handler runs;
   - support for several tool calls in one turn, with each result appended under its call id in the provider's required format;
   - a per-tool timeout and an overall deadline, and a maximum number of iterations (default 8) after which the loop stops and returns a clear message;
   - errors returned to the model as tool results with a short, actionable message (what was wrong, what to try), never stack traces or secrets; unexpected exceptions are logged with the call id.
4. **Safety.** Classify tools as read or write. Write and money-moving tools require explicit confirmation from the user (a confirmation step outside the model) and an idempotency key. Authorisation comes from the authenticated session, never from model-supplied arguments (a `user_id` argument must not let the model act for another user). Treat tool results and retrieved content as untrusted data. Truncate or summarise large results to a stated size limit.
5. **Observability.** Log each call with tool name, duration, outcome and token usage; redact sensitive arguments.
6. **Tests.** Unit tests with a fake model client that returns scripted tool calls: a single call, parallel calls, invalid arguments, a tool timeout, a handler exception, the iteration cap, and a write tool that is refused without confirmation.
</task>

<constraints>
- Use the SDK's current, documented tool-calling interface. If you are not sure of a field name or method in the SDK version in use, say so and point to where to check rather than guessing.
- Do not let the model choose credentials, tenants or users.
- Keep the loop small and readable; no agent framework unless the project already uses one.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Bullets: tools with read or write class, limits chosen, confirmation flow.
## Code
Code blocks with file paths: tool definitions, registry and validation, the loop, and the confirmation hook.
## Tests
Code blocks with file paths, then the command and its real result, or a plain statement that tests were not run.
## Operational notes
Timeouts, limits, logging and costs to watch.
## Open questions
Numbered, or "None".
</output_format>
