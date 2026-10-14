---
schema: 1
id: build-ai-chat-interface
kind: prompt
title: Build an AI chat interface
description: Builds the frontend of an LLM chat feature - message model, composer, safe streaming Markdown, stop, retry, edit and regenerate, scroll behaviour, conversation list and error states.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [llm-apps]
requires: [repo-read, file-write]
inputs: [repo, text, image]
output: [code, tests]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [chat-ui, markdown-rendering, message-state, auto-scroll, regenerate]
pairs_with:
  prompts: [implement-llm-streaming, implement-chat-history-management, make-chat-interface-accessible, design-chat-interface]
args:
  - name: requirements
    description: What the chat is for, which features are in scope (conversation list, edit, regenerate, attachments, citations, feedback buttons), and any design or mockup.
    type: text
    required: true
  - name: stack
    description: Frontend framework and UI library, how the backend endpoint streams (SSE, WebSocket, the framework's AI SDK) and where conversations are stored.
    type: text
output_contract:
  format: markdown
  sections: [Message model, Components, Code, Tests, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A chat UI looks like a list and a text box, and most first versions break in the same places. Messages are stored as plain strings, so there is nowhere to record that a reply is still streaming, was stopped, or failed halfway, and the UI cannot show Retry in the right place. Enter sends the message while a Japanese or Chinese user is still composing characters with an input method editor, because the code ignores composition events. Double clicks send twice. Markdown is rendered with raw HTML enabled, so model output (which can echo user or retrieved content) becomes an XSS vector, and a half-streamed code fence turns the rest of the reply into code until it closes. Auto-scroll drags the reader back to the bottom while they scroll up to read. Regenerate and edit silently keep later messages that no longer follow from the changed turn. Errors such as rate limits, network drops and refusals all show the same generic message, and long conversations render thousands of nodes. These are UI problems; the streaming transport itself is a separate job.
</context>

<task>
Build the chat interface for:
<requirements>
{{requirements}}
</requirements>
{{#stack}}
<stack>
{{stack}}
</stack>
{{/stack}}

1. If you can read the repository, find the streaming endpoint or client, the existing UI components, design tokens and state patterns, and any chat code already started. Build with those. If there is no streaming endpoint yet, say so and build against a typed interface with a fake implementation.
2. Message model: each message has an id, role, content parts (text, attachments, citations, tool or status steps), status (`pending`, `streaming`, `complete`, `stopped`, `error`), error kind, and created time. Conversations hold an ordered list and a title.
3. Composer: Enter sends and Shift+Enter adds a line, except while IME composition is active (`isComposing` or composition events); trim empty input; disable send while a reply is pending or queue per the requirements; keep the draft if sending fails; autosize up to a maximum height; paste and drop for attachments if in scope.
4. Sending: add the user message optimistically, create the assistant message in `streaming`, append deltas, and finish with `complete`. Stop aborts the request and marks the message `stopped` with its partial text kept.
5. Rendering: render Markdown with raw HTML disabled or sanitised, safe link handling (no `javascript:` URLs, external links marked), code blocks with language label and a copy button, and tolerance for unclosed fences and lists while streaming. Throttle re-rendering to animation frames.
6. Scrolling: stick to the bottom only while the user is already at the bottom; show a "jump to latest" control otherwise; keep the scroll position stable when older messages load above.
7. Edit and regenerate: editing a user message or regenerating a reply removes or branches the messages after it (pick one and make it visible); regenerate reuses the same input.
8. Errors: distinct states and copy for network loss, rate limit (with when to retry if the server says), content refusal, and server error; Retry on the failed message only. Feedback controls and citations if in scope.
9. Conversation list if in scope: new chat, titles, rename, delete with confirmation, and loading older history page by page. Virtualise or paginate long conversations.
10. Accessibility and mobile: the log is a labelled region, completion (not every token) is announced politely, focus returns to the composer after sending, all controls work by keyboard, and the composer stays visible above the mobile keyboard.
11. Tests: composer key handling including IME, double-send prevention, stop keeping partial text, error then retry, Markdown sanitisation of a script tag and a `javascript:` link, and scroll stickiness logic.
</task>

<constraints>
- Do not add a state management, Markdown or chat UI library if the project already has one that fits; if you add a Markdown renderer, name it and configure it safely.
- Treat all model output as untrusted content.
- Keep the transport behind one interface so the UI does not depend on SSE or WebSocket details.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Message model
The types, and the status transitions as a short list.
## Components
Each component with its responsibility and props, in a short list.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths, then the command and its real result, or a plain statement that tests were not run.
## Open questions
Numbered, or "None".
</output_format>
