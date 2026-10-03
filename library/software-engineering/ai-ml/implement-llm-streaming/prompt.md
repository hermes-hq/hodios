---
schema: 1
id: implement-llm-streaming
kind: prompt
title: Implement streaming LLM responses
description: Implements streaming LLM responses end to end, from provider stream to server-sent events to UI, with cancellation, timeouts and mid-stream errors. Use when replies feel slow to start.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, frontend-engineer, backend-engineer, ml-engineer]
stack: [llm-apps]
requires: [repo-read, file-write]
inputs: [repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [streaming, server-sent-events, cancellation, chat-ui]
pairs_with:
  prompts: [implement-llm-tool-calling, add-llm-output-guardrails]
args:
  - name: stack
    description: Server and client stack and where it runs, for example "Next.js app router on Vercel, React client" or "FastAPI behind nginx, Vue client".
    type: text
    required: true
  - name: provider_sdk
    description: The model provider SDK and version in use, for example "OpenAI Node SDK v5" or "Anthropic Python SDK".
    type: string
output_contract:
  format: markdown
  sections: [Design, Server, Client, Tests, Operational notes, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Streaming cuts the wait before the first words from many seconds to well under one, but it moves failure into the middle of a response. Common breakages: a proxy or platform buffers the stream so it arrives all at once; `EventSource` is used even though it cannot send a POST body or auth headers; the user clicks Stop or closes the tab and the server keeps paying for tokens because the upstream request is never aborted; an error after 300 tokens leaves a half answer with no indication; the client re-renders the whole Markdown document on every token and the page stutters; auto-scroll yanks the reader back down while they scroll up; and a screen reader announces every fragment.
</context>

<task>
Implement streaming responses for this stack: {{stack}}{{#provider_sdk}}, using {{provider_sdk}}{{/provider_sdk}}.

1. If you can read the repository, find the existing non-streaming call, its route and the UI that renders replies, and change those rather than adding parallel code. If the provider SDK is unknown and not in the repository, ask and stop.
2. **Protocol.** Server-sent events over a POST response (`Content-Type: text/event-stream`), with typed events: `delta` (text), optional `status` (for tool use or retrieval steps), `done` (finish reason and token usage) and `error` (a safe message and whether retrying makes sense). Send a comment heartbeat every 15 to 20 seconds during long pauses.
3. **Server.** Use the SDK's streaming interface, forward each delta as it arrives and flush. Disable buffering: response headers such as `Cache-Control: no-cache` and `X-Accel-Buffering: no`, plus any platform or proxy setting the stack needs. Detect client disconnect and abort the upstream request through the SDK's abort or cancel mechanism. Catch errors after the stream has started and send an `error` event instead of crashing the connection. Record usage from the final event for cost tracking.
4. **Client.** `fetch` with an `AbortController` and a `ReadableStream` reader that parses SSE frames correctly across chunk boundaries. Accumulate text and render at most once per animation frame. Render Markdown incrementally or on a throttle, and treat model output as untrusted (sanitise HTML). Show states: waiting for first token, streaming, done, stopped by user, error with partial text kept and a Retry action.
5. **Timeouts.** A first-token timeout and an idle timeout between chunks, both surfaced as recoverable errors.
6. **Interaction details.** A Stop button wired to the abort; auto-scroll only while the user is already at the bottom; an `aria-live="polite"` region that announces when a reply is complete, not each token; input disabled or queued while streaming, as the product prefers.
7. **Tests.** A server test with a fake provider stream (normal completion, error mid-stream, client abort that cancels upstream) and a client test for the SSE parser with frames split across chunks.
</task>

<constraints>
- Follow the SDK's current streaming API for the version in use. If unsure of an event name or method, say so and point to where to check rather than guessing.
- Note the platform's limits on response duration for streaming (serverless functions and edge runtimes differ) if the stack has them.
- No new state management or streaming libraries unless the project already uses one.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
The event types with example payloads, and the request lifecycle in five or six bullets.
## Server
Code blocks with file paths.
## Client
Code blocks with file paths.
## Tests
Code blocks with file paths, then the command and its real result, or a plain statement that tests were not run.
## Operational notes
Buffering settings per layer, timeouts, cost tracking.
## Open questions
Numbered, or "None".
</output_format>
