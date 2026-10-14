---
schema: 1
id: write-sequence-diagram
kind: prompt
title: Write a sequence diagram
description: Draws a Mermaid or PlantUML sequence diagram of a request or process across services from code or a description, including async steps and error paths.
category: architecture
version: 1.0.0
status: incubating
stage: [design, maintain]
role: [software-engineer, backend-engineer, architect, technical-writer]
requires: [none]
inputs: [repo, text, file]
output: [diagram, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sequence-diagrams, mermaid, plantuml, request-flow, system-documentation, error-paths]
pairs_with:
  personas: [software-architect]
  prompts: [write-c4-diagram, write-architecture-overview]
args:
  - name: flow
    description: The request or process to diagram, for example checkout from button click to confirmation email, and its entry point in code if known.
    type: text
    required: true
  - name: format
    description: Mermaid or PlantUML. Defaults to Mermaid.
    type: string
  - name: detail
    description: Audience and level of detail, for example onboarding new engineers, an incident review, or a design review.
    type: text
output_contract:
  format: markdown
  sections: [Diagram, Participants, Notes, Gaps and assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A sequence diagram is most useful when it shows what really happens, including the parts people forget: asynchronous hand-offs through queues, retries, timeouts, the transaction boundary, calls to third parties, and what the user sees when a step fails. Diagrams drawn from memory show the happy path of how the system was meant to work. Drawn from code, they reveal surprises such as a synchronous call to a slow provider inside a request, or a write before a check. Readability matters: one diagram per flow, participants ordered left to right in call order, activation bars only where they help, alt blocks for success and failure, par blocks for concurrency, and notes rather than paragraphs on arrows. Message labels should be operations ("POST /orders", "publish OrderPlaced"), not vague verbs. A diagram with thirty participants needs splitting into an overview and detailed sub-flows. Mermaid renders in many code hosts and docs tools; PlantUML has richer options; both fail on unescaped special characters in labels.
</context>

<task>
Flow: {{flow}}
{{#format}}
Format: {{format}}
{{/format}}
Use Mermaid unless another format is given.
{{#detail}}
Audience and detail: {{detail}}
{{/detail}}

1. If a repository is available, start at the entry point and follow the calls: handlers, services, clients for other services, database calls, queue publishes and consumers, scheduled jobs and outbound third-party calls. Record the file for each participant.
2. If only a description is given, draw from it and mark every step you inferred.
3. Choose the participants and order them left to right by first involvement. Merge internal classes into their service unless the audience needs class-level detail.
4. Draw the happy path with precise message labels, return values where they matter, and async messages shown with the async arrow style of the format.
5. Add the important failure paths in alt or opt blocks: validation failure, third-party timeout, retry, compensation, and what the caller receives.
6. Mark the transaction boundary and idempotency points in notes.
7. If the diagram exceeds about 12 participants or 40 messages, split it into an overview plus detailed sub-diagrams.
8. Check the syntax mentally for the format: balanced blocks, quoted labels with special characters, valid arrow types.
</task>

<constraints>
- Diagram what the code does, not what it should do; when they differ, show the code's behaviour and note the difference.
- Never invent services, endpoints or queues; mark assumptions.
- Keep the syntax valid for the chosen format.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagram
The sequence diagram in a code block in the chosen format.
## Participants
Table: participant, what it is (service, queue, database, third party), file or module where found.
## Notes
Numbered notes for steps that need explanation: timeouts, retries, transactions, idempotency.
## Gaps and assumptions
Bullets: what could not be confirmed from the code or description.
</output_format>
