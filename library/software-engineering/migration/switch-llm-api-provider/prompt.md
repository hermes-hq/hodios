---
schema: 1
id: switch-llm-api-provider
kind: prompt
title: Switch an app to a different LLM API provider
description: Ports application code from one LLM API to another, mapping messages, system prompts, tool calls, streaming, structured output, token limits and errors, with an eval to prove parity.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [ml-engineer, backend-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [llm-api, vendor-switch, tool-calling, streaming, structured-output]
pairs_with:
  prompts: [port-prompt-between-models, add-llm-provider-fallback, plan-incremental-migration]
  personas: [migration-engineer]
args:
  - name: current
    description: The current provider, SDK and models, and where the calls live in the code.
    type: text
    required: true
  - name: target
    description: The target provider, SDK and model, and whether both must run side by side for a while.
    type: text
    required: true
  - name: features
    description: Features in use, such as tool calling, streaming, JSON or schema output, images, embeddings, batch, prompt caching or retries.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Call inventory, Feature mapping, Changes made, Parity eval, Open risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
LLM APIs look alike but differ in the details that break production code. The system prompt may be a message role or a separate top-level field. Some APIs require strictly alternating user and assistant turns, others do not. Tool calling differs in the schema wrapper, in how tool results are sent back (a tool role versus a content block tied to an id), in whether several tools can be called in one turn, and in how a forced or disabled tool choice is expressed. Streaming event shapes differ, so code that concatenates deltas or detects the end of a tool call needs rewriting. Structured output ranges from a strict JSON schema mode to "JSON only" instructions, so validation must stay on your side. Max output tokens may be required or optional, stop reasons have different names, token counting and context limits differ, and rate-limit and overload errors use different status codes and headers. Embeddings from different models are not comparable, so a vector index must be rebuilt. The cleanest migrations put a thin internal interface around calls first, then swap the implementation behind it and compare outputs on a fixed eval set; prompts usually need retuning too.
</context>

<task>
Current: {{current}}
Target: {{target}}
{{#features}}Features in use: {{features}}{{/features}}

1. Find every call site and wrapper: completions, streaming, tool loops, embeddings, retries, token counting, cost logging. If calls are scattered, propose a small internal interface first and route existing calls through it with no behaviour change.
2. Build a feature mapping from the target provider's current official API reference: message and system prompt format, tool definition and tool result format, tool choice, streaming events, structured output, stop reasons, limits, error codes and retry headers. Mark anything you could not confirm "to verify".
3. Implement the target adapter behind the interface, including streaming and the tool-call loop, error mapping into your own error types, and retry with backoff that respects the provider's rate-limit headers. Keep credentials in configuration.
4. Port the prompts with only the changes the new model needs, and keep the old prompts for comparison.
5. Build a parity eval: a fixed set of real inputs (including tool-using and long-context cases), run through both providers, with automated checks for schema validity and tool-call correctness plus a review of quality differences. Report latency and cost per request from measured runs.
6. Plan the switch: a configuration flag, a shadow or percentage rollout, and how to roll back. Note anything that cannot be switched by flag, such as embeddings that need re-indexing.
</task>

<constraints>
- Do not write API field names, model names, limits or prices from memory as fact; check the current reference and mark gaps.
- Do not remove the old provider path until the parity eval passes and the user agrees.
- Never put API keys in code, tests or logs.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Call inventory
Table: call site | feature used | notes.
## Feature mapping
Table: feature | current provider | target provider | adapter handling.
## Changes made
Interface, adapter, prompt changes, configuration flag.
## Parity eval
Cases, pass rates, differences found, measured latency and cost.
## Open risks
Bullets, including anything marked to verify.
</output_format>
