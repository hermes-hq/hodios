---
schema: 1
id: add-llm-output-guardrails
kind: prompt
title: Add guardrails to an LLM feature
description: Adds layered guardrails to an LLM feature with input checks, schema-validated output, content and grounding checks, refusal handling, fallbacks and monitoring. Use before real users see it.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, verify]
role: [ml-engineer, backend-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write]
inputs: [repo, text, spec]
output: [code, tests, report]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [guardrails, structured-output, prompt-injection, content-moderation, llm-monitoring]
pairs_with:
  personas: [ml-engineer]
  prompts: [review-llm-app-security, write-llm-eval-suite, build-structured-extraction]
args:
  - name: feature
    description: The LLM feature - what users send, what the model returns and where the output goes (shown to users, stored, parsed into actions, sent by email), the stack and provider SDK, and the existing prompt if you have it.
    type: text
    required: true
  - name: risks
    description: Risks you already worry about, for example made-up prices, leaking other customers' data, off-topic use, malformed JSON breaking the UI, or users steering the model into abuse.
    type: text
output_contract:
  format: markdown
  sections: [Risk map, Design, Code, Tests, Monitoring, Residual risk]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A system prompt that says "never do X" is a request, not a control. Guardrails are code around the model that decide what reaches it and what leaves it. They work in layers, each cheap enough for its position: limits and checks on input, constrained generation (structured output, tool schemas), validation of what came back, gates before any action, and monitoring that shows how often each guard fires. Typical failures: parsing free text with a regex when the provider offers schema-constrained output; retrying invalid output in an unbounded loop; treating a refusal as an error and retrying until the model complies; blocking with a classifier nobody measured, so legitimate users hit false positives; and auto-executing actions on output that was never validated.
</context>

<task>
Add guardrails to this feature:
<feature>
{{feature}}
</feature>
{{#risks}}
Known concerns:
{{risks}}
{{/risks}}

1. If you can read the repository, find the LLM call, its prompt and every place the output is used before designing anything. If where the output goes is unclear, ask and stop, because that decides which guards matter.
2. Build a risk map: each way this feature can harm a user, the business or a third party (wrong facts, unsafe content, data leakage across users, prompt injection through user or retrieved text, malformed output, cost abuse, off-topic use), with likelihood, impact and the layer that addresses it. Drop risks that do not apply rather than padding the list.
3. Input layer: length and rate limits, rejecting or trimming what the feature never needs, separating instructions from untrusted content (clear delimiters, untrusted text never in the system role), and redaction of personal data the model does not need.
4. Generation layer: the provider's structured output or JSON schema mode where output is parsed; a system prompt that states scope and what to do when a request is out of scope.
5. Output layer, in order of cost:
   - schema validation with a typed parser, and at most one repair retry before a fallback;
   - deterministic business checks (allowed values, price or number checks against source data, links restricted to allowed domains, no other user's identifiers);
   - grounding checks for retrieval features: every citation exists in the retrieved set, claims without a source are flagged;
   - a moderation or classifier check where the risk map calls for it, with its threshold and false-positive cost stated.
6. Refusals and failures: detect a model refusal or a blocked output and show a helpful, honest message; never loop to force compliance. Define a fallback for each failure (a non-LLM path, a human handoff, or a clear error).
7. Action gate: anything that changes data, sends messages or spends money needs validated output and, where the impact is high, user confirmation.
8. Monitoring: log each guard's decision with a reason code (no raw personal data), track trigger rates, alert on spikes, and sample blocked and passed outputs for human review.
9. Tests: unit tests per guard, plus adversarial cases (injection in user text and in retrieved documents, malformed output, out-of-scope requests) that can join the feature's eval suite.
</task>

<constraints>
- Run cheap deterministic checks synchronously; run expensive model-based checks only where the risk justifies the latency, or asynchronously on samples.
- Do not claim a guard prevents prompt injection; say it reduces impact, and rely on limiting what the model can do.
- Use the provider SDK features that exist in the version in use; if unsure of an API, say so instead of guessing.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Risk map
Table: risk, likelihood, impact, guard, layer.
## Design
A short flow from request to response, naming each guard.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths, then the command and its real result, or a plain statement that tests were not run.
## Monitoring
Table: signal, reason codes, alert threshold.
## Residual risk
Bullets: what these guards do not cover.
</output_format>
