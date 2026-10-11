---
schema: 1
id: implement-chat-history-management
kind: prompt
title: Implement chat history and context management
description: Implements chat history storage and context-window assembly for an LLM chat feature, with token budgets, trimming, summarisation triggers, per-user isolation and retention rules.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, ml-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chat-history, context-window, token-budget, conversation-state, data-retention]
pairs_with:
  prompts: [compress-conversation-memory, implement-llm-streaming, reduce-llm-costs]
args:
  - name: feature
    description: The chat feature, the stack and database, the model and its context window, and how history is handled today (path or description).
    type: text
    required: true
  - name: retention_rules
    description: How long conversations must or may be kept, whether users can delete them, and any privacy rules that apply.
    type: text
output_contract:
  format: markdown
  sections: [Current behaviour, Data model, Context assembly, Code, Tests, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most chat features start by sending the whole conversation on every turn. That works until long conversations hit the context limit and the request fails, cost grows with the square of conversation length, and latency creeps up. The common quick fix, dropping the oldest messages, silently removes the user's original goal and constraints, or cuts between a tool call and its result so the provider rejects the request. Other recurring bugs: history keyed only by a conversation id the client sends, so one user can read another's chat; concurrent turns from two tabs interleaving; system prompt and retrieved documents counted against no budget; and summaries regenerated on every request instead of once when a threshold is crossed. Good context assembly treats the window as a budget split between fixed instructions, a running summary, recent turns kept verbatim and the reserve for the answer.
</context>

<task>
Implement history storage and context management for: {{feature}}
{{#retention_rules}}
Retention and privacy rules: {{retention_rules}}
{{/retention_rules}}

1. Read how messages are stored and how the request to the model is built today. Note the model's context window and current output limit, and the project's database and migration tooling.
2. Data model: conversations owned by a user id from the authenticated session, messages with role, content, tool-call and tool-result linkage, token count, created time and a soft-delete flag, plus a stored running summary with the id of the last message it covers. Add the migration with the project's tool.
3. Access: every read and write filters by the authenticated user (and tenant, if multi-tenant). Never trust a client-supplied user id.
4. Context assembly, as a pure function that is easy to test: a token budget = context window minus output reserve minus a safety margin; include system prompt and any retrieved context first and count them; then the running summary; then as many recent messages as fit, newest first, never splitting a tool call from its result and always keeping the latest user message whole.
5. Summarisation trigger: when unsummarised history exceeds a threshold, summarise the oldest unsummarised turns into the running summary in a background step or before the next turn, keeping goals, decisions, constraints and facts the user stated. Store it; do not recompute it per request.
6. Concurrency: serialise turns per conversation (a lock, a version check or a queue) so two tabs cannot interleave writes.
7. Retention and deletion: implement user-initiated delete, and retention expiry if rules were given, including the stored summary.
8. Tests: budget never exceeded across long synthetic conversations, tool call and result never split, user isolation (another user's id returns nothing), summary triggered once at the threshold, deletion removes summary too. Run them and report.
</task>

<constraints>
- Count tokens with the provider's tokenizer or token-counting method when one is available; otherwise use a stated conservative estimate and label it.
- Do not drop the system prompt or the first statement of the user's goal to make room; summarise instead.
- Do not store more personal data than the feature needs; flag anything that looks like it conflicts with the retention rules.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current behaviour
What happens to history today and where it breaks.
## Data model
Tables or collections with fields, and the migration.
## Context assembly
The budget arithmetic and the inclusion order, as a short numbered list.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Check
Commands run with real results, or a plain statement that they were not run.
## Open questions
Numbered, or "None".
</output_format>
