---
schema: 1
id: integrate-llm-api-with-retries
kind: prompt
title: Integrate an LLM API with retries and timeouts
description: Writes a production client wrapper for an LLM API call with timeouts, retries with backoff and jitter, rate-limit handling, token limits and typed errors, plus tests with a fake provider.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, ml-engineer, fullstack-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [retries, timeouts, rate-limits, exponential-backoff, error-handling]
pairs_with:
  prompts: [implement-llm-streaming, implement-llm-tool-calling, reduce-llm-costs]
args:
  - name: call_site
    description: Where the model is called today (file path or pasted code) and what the call does for the user, for example "summarise a ticket when an agent opens it".
    type: text
    required: true
  - name: provider_sdk
    description: The provider SDK or HTTP API and its version, for example "OpenAI Python SDK 1.x" or "Anthropic TypeScript SDK".
    type: string
    required: true
  - name: latency_budget
    description: How long the caller can wait in total, and whether the call is interactive or background work.
    type: string
output_contract:
  format: markdown
  sections: [Current call, Error policy, Code, Tests, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A bare LLM API call works in a demo and fails in production in predictable ways. Requests hang for minutes because no timeout was set, or the SDK's default timeout is ten minutes. Rate-limit (429) and overload (529 or 503) responses get retried immediately in a tight loop, which makes the overload worse, or get retried without honouring the `Retry-After` header. Errors that will never succeed on retry (400 invalid request, 401, 403, context length exceeded, content policy refusal) are retried anyway, burning money and time. The SDK's own built-in retries stack on top of a hand-written retry loop, so one user action becomes nine attempts. Long inputs overflow the context window because nobody counted tokens, and output is cut off at `max_tokens` without anyone checking the stop reason. Callers get a raw provider exception and cannot tell "try again later" from "your input is too long".
</context>

<task>
Make this model call production ready: {{call_site}}, using {{provider_sdk}}.{{#latency_budget}} Latency budget: {{latency_budget}}.{{/latency_budget}}

1. Read the call site, its callers and any existing HTTP or retry helpers in the repository. Reuse the project's existing retry, logging and config patterns instead of adding new ones. Check what retries and timeout the SDK already does by default for this version, and say so.
2. Write the error policy as a table before coding: each error class (connection error, timeout, 408, 409, 429, 500, 502, 503, 529 or the provider's overload code, 400, 401, 403, 404, context-length error, refusal or content filter), whether it is retried, and what the caller receives.
3. Implement one wrapper function used by the call site:
   - A per-attempt timeout and an overall deadline derived from the latency budget; never retry past the deadline.
   - Retries only for retryable errors, with exponential backoff and full jitter, a small maximum attempt count (3 or 4), and `Retry-After` honoured when present. Either disable the SDK's built-in retries or rely on them alone; never both.
   - Idempotency: if the call has side effects (tool calls that write, billing), say how duplicate attempts are avoided.
   - Input size: count or estimate tokens before sending, and fail fast with a clear error, or trim by a stated rule, when the input would exceed the context window minus the output reserve.
   - `max_tokens` set on purpose, and the stop reason checked: a truncated response is reported as truncated, not passed on as complete.
   - Typed errors for callers: retryable-exhausted, rate-limited, input-too-large, refused, invalid-request, auth or config error.
   - Logging per attempt: attempt number, status, latency, token usage and request id, with no prompt text or user data unless the project already logs it with redaction.
4. Write tests with a fake transport or stubbed client: success first try, 429 then success honouring `Retry-After`, 500 until exhausted, 400 not retried, timeout, deadline reached mid-backoff, truncated output, and input too large. Make backoff sleeps injectable so tests run instantly.
5. Run the tests and the type check or linter the project uses, and report results.
</task>

<constraints>
- Use the SDK's real exception types and fields for the stated version. If you are not sure a field or class exists, say so and show where to check rather than guessing.
- No new dependency for retries if the project already has one; if it has none, a small hand-written loop is fine.
- Do not log API keys, full prompts or user content.
- Never retry on authentication, permission or validation errors.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current call
What the code does today and what is missing, in bullets.
## Error policy
Table: error | retried? | backoff | what the caller gets.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Check
Commands run and their real results, or a plain statement that they were not run.
## Open questions
Numbered, or "None".
</output_format>
